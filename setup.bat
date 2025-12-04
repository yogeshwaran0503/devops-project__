@echo off
echo Installing dependencies...

echo Installing root dependencies...
call npm install

echo Installing backend dependencies...
cd backend
call npm install
cd ..

echo Installing frontend dependencies...
cd frontend
call npm install
cd ..

echo Setup complete!
echo Run 'npm run dev' to start the application