#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');

console.log('🚀 Starting Task Manager Development Environment...\n');

// Start the backend server
const serverProcess = spawn('npm', ['run', 'dev'], {
  cwd: path.join(__dirname, '../server'),
  stdio: 'inherit',
  shell: true
});

// Start the frontend server
const clientProcess = spawn('npm', ['start'], {
  cwd: path.join(__dirname, '../client'),
  stdio: 'inherit',
  shell: true
});

// Handle process termination
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down development servers...');
  
  if (serverProcess) {
    serverProcess.kill('SIGINT');
  }
  
  if (clientProcess) {
    clientProcess.kill('SIGINT');
  }
  
  process.exit(0);
});

// Handle server process exit
serverProcess.on('exit', (code) => {
  if (code !== 0) {
    console.log(`❌ Server process exited with code ${code}`);
  }
});

// Handle client process exit
clientProcess.on('exit', (code) => {
  if (code !== 0) {
    console.log(`❌ Client process exited with code ${code}`);
  }
});

console.log('✅ Development servers started!');
console.log('📱 Frontend: http://localhost:3000');
console.log('🔧 Backend: http://localhost:5000');
console.log('\nPress Ctrl+C to stop all servers');