import { execSync } from 'node:child_process';
import { resolve } from 'node:path';
import type { Plugin } from 'vite';

export type VersionPluginOptions = {
  rootDir?: string;
};

const execCommand = (command: string): string => {
  return execSync(command, { encoding: 'utf8' }).trim();
};

const generateVersionInfo = () => {
  const sha = execCommand('git rev-parse HEAD');
  const shortSha = sha.substring(0, 7);
  return {
    buildDate: new Date().toISOString(),
    branch: execCommand('git rev-parse --abbrev-ref HEAD'),
    sha,
    shortSha,
    commitDate: execCommand('git log -1 --format=%cI'),
    version: execCommand('gitversion -showvariable SemVer'),
  };
};

const getRootDir = () => {
  return resolve(__dirname, '../../..');
};

export function versionPlugin(options?: VersionPluginOptions): Plugin {
  const rootDir = options?.rootDir ?? getRootDir();
  const versionFilePath = resolve(rootDir, 'version.json');

  return {
    name: 'virtual:version-json',
    load(id) {
      if (id === versionFilePath) {
        const versionInfo = generateVersionInfo();
        return JSON.stringify(versionInfo, null, 2);
      }
    },
  };
}
