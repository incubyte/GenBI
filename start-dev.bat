@echo off
echo Starting GenBI development environment...

start cmd /k "cd server && npm run start:dev"
start cmd /k "cd client && npm run dev"

echo Both client and server are starting...
echo Client will be available at: http://localhost:8080
echo Server will be available at: http://localhost:3000
echo API documentation will be available at: http://localhost:3000/docs
