import { fileURLToPath } from 'node:url';
import path from 'path';
import { spawn } from 'child_process';
import { readdirSync, readFileSync } from 'fs';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const workspaces = ['apps'];
const scriptName = process.env['NODEMON_SCRIPT'] || 'exec-dev';
let projects = [];
workspaces.forEach((workspace) => {
    const rootPath = path.join(__dirname, workspace);
    projects = projects.concat(getFiles(rootPath));
});
console.log('===== Start apps =====');
projects.forEach((projectFolder) => {
    spawn('yarn', [scriptName], {
        cwd: projectFolder,
        detached: false,
        stdio: 'inherit',
        shell: true,
    });
});

function getFiles(fullpath) {
    let projects = [];
    const files = readdirSync(fullpath, { withFileTypes: true });
    if (files.find((f) => f.name === 'package.json')) {
        var jsonFile = JSON.parse(readFileSync(path.join(fullpath, 'package.json'), 'utf8'))
        if (jsonFile?.scripts?.[scriptName]) {
            return fullpath;
        }
        return null;
    }
    files.forEach((f) => {
        if (!f.isDirectory()) {
            return;
        }
        const p = getFiles(path.join(fullpath, f.name));
        if (p) {
            projects = projects.concat(p);
        }
    });
    return projects;
}