import { Injectable, BadRequestException } from '@nestjs/common';
import { promises as fs } from 'fs';
import { join } from 'path';
import * as crypto from 'crypto';
import { FilePreviewDto } from './dto/file-preview.dto';

interface UploadedFile {
  fileId: string;
  name: string;
  originalName: string;
  type: string;
  size: number;
  path: string;
  uploadedAt: Date;
}

@Injectable()
export class FileUploadService {
  private readonly uploadDir = join(process.cwd(), 'uploads');
  private readonly uploadedFiles: Map<string, UploadedFile> = new Map();

  constructor() {
    // Ensure upload directory exists
    this.ensureUploadDir();
  }

  private async ensureUploadDir() {
    try {
      await fs.mkdir(this.uploadDir, { recursive: true });
    } catch (error) {
      console.error('Error creating upload directory:', error);
    }
  }

  async uploadFile(
    file: Express.Multer.File,
    type: string,
    customName?: string,
  ): Promise<UploadedFile> {
    if (!file) {
      throw new BadRequestException('No file provided');
    }

    // Validate file type
    this.validateFileType(file, type);

    // Generate a unique file ID
    const fileId = `file-${crypto.randomBytes(8).toString('hex')}`;
    
    // Create a unique filename
    const filename = `${fileId}-${Date.now()}-${file.originalname.replace(/\s+/g, '_')}`;
    const filePath = join(this.uploadDir, filename);

    // Save the file
    await fs.writeFile(filePath, file.buffer);

    // Create file metadata
    const uploadedFile: UploadedFile = {
      fileId,
      name: customName || file.originalname,
      originalName: file.originalname,
      type,
      size: file.size,
      path: filePath,
      uploadedAt: new Date(),
    };

    // Store file metadata
    this.uploadedFiles.set(fileId, uploadedFile);

    return {
      ...uploadedFile,
      path: undefined, // Don't expose the file path in the response
    };
  }

  async getFilePreview(fileId: string, options: FilePreviewDto = {}) {
    const file = this.uploadedFiles.get(fileId);
    if (!file) {
      throw new BadRequestException(`File with ID ${fileId} not found`);
    }

    const rows = options.rows || 10;

    // In a real implementation, this would read and parse the file based on its type
    // For this example, we'll return simulated preview data
    return this.simulateFilePreview(file, rows);
  }

  private validateFileType(file: Express.Multer.File, type: string) {
    // Map of allowed MIME types for each file type
    const allowedMimeTypes = {
      csv: ['text/csv', 'application/csv'],
      excel: [
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      ],
      json: ['application/json'],
    };

    // Check if the file type is supported
    if (!allowedMimeTypes[type]) {
      throw new BadRequestException(`Unsupported file type: ${type}`);
    }

    // Check if the file's MIME type is allowed for the specified type
    if (!allowedMimeTypes[type].includes(file.mimetype)) {
      throw new BadRequestException(
        `Invalid file format. Expected ${type} but got ${file.mimetype}`,
      );
    }
  }

  private simulateFilePreview(file: UploadedFile, rows: number) {
    // In a real implementation, this would read and parse the actual file
    // For this example, we'll return simulated data based on the file type
    
    let columns = [];
    let data = [];
    
    switch (file.type) {
      case 'csv':
      case 'excel':
        columns = [
          { name: 'id', type: 'integer' },
          { name: 'name', type: 'string' },
          { name: 'email', type: 'string' },
          { name: 'signup_date', type: 'date' },
          { name: 'last_purchase', type: 'date' },
        ];
        
        for (let i = 0; i < rows; i++) {
          data.push({
            id: i + 1,
            name: `User ${i + 1}`,
            email: `user${i + 1}@example.com`,
            signup_date: new Date(2022, 0, i + 1).toISOString().split('T')[0],
            last_purchase: new Date(2023, 2, i + 1).toISOString().split('T')[0],
          });
        }
        break;
        
      case 'json':
        columns = [
          { name: 'id', type: 'integer' },
          { name: 'title', type: 'string' },
          { name: 'completed', type: 'boolean' },
          { name: 'created_at', type: 'date' },
        ];
        
        for (let i = 0; i < rows; i++) {
          data.push({
            id: i + 1,
            title: `Task ${i + 1}`,
            completed: i % 2 === 0,
            created_at: new Date(2023, 0, i + 1).toISOString().split('T')[0],
          });
        }
        break;
        
      default:
        throw new BadRequestException(`Unsupported file type: ${file.type}`);
    }
    
    return {
      fileId: file.fileId,
      name: file.name,
      type: file.type,
      columns,
      data,
      totalRows: 5000, // Simulated total row count
    };
  }
}
