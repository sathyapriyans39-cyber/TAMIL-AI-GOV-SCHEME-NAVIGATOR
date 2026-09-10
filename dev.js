import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isWindows = process.platform === 'win32';
const npmCmd = isWindows ? 'npm.cmd' : 'npm';
const npxCmd = isWindows ? 'npx.cmd' : 'npx';

console.log('\x1b[36m====================================================\x1b[0m');
console.log('\x1b[32m🏛️  Tamil AI Government Scheme Navigator Launcher\x1b[0m');
console.log('\x1b[36m====================================================\x1b[0m\n');

// 1. Start Server
console.log('\x1b[34m[SERVER]\x1b[0m Starting Backend on http://localhost:5000...');
const serverProcess = spawn('node', ['src/index.js'], {
  cwd: path.join(__dirname, 'server'),
  stdio: 'inherit',
  shell: true,
});

// 2. Start Client
console.log('\x1b[35m[CLIENT]\x1b[0m Starting Frontend on http://localhost:5173...');
const clientProcess = spawn(npmCmd, ['run', 'dev'], {
  cwd: path.join(__dirname, 'client'),
  stdio: 'inherit',
  shell: true,
});

// Handle graceful exit
function cleanExit() {
  console.log('\n\x1b[33mShutting down servers...\x1b[0m');
  try {
    if (serverProcess && !serverProcess.killed) {
      if (isWindows && serverProcess.pid) {
        spawn('taskkill', ['/pid', serverProcess.pid.toString(), '/f', '/t']);
      } else {
        serverProcess.kill('SIGINT');
      }
    }
    if (clientProcess && !clientProcess.killed) {
      if (isWindows && clientProcess.pid) {
        spawn('taskkill', ['/pid', clientProcess.pid.toString(), '/f', '/t']);
      } else {
        clientProcess.kill('SIGINT');
      }
    }
  } catch (e) {
    // ignore
  }
  process.exit(0);
}

process.on('SIGINT', cleanExit);
process.on('SIGTERM', cleanExit);
