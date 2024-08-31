import { PackageManager } from '../types/index.ts';

export const packageManagers: PackageManager[] = [
  {
    name: 'npm',
    checkCommand: ['npm', 'list', '-g', '--depth=0', '--json'],
    parseOutput: (output: string) => {
      const json = JSON.parse(output) as { dependencies: Record<string, { version: string }> };
      return Object.entries(json.dependencies).map(([name, info]) => ({
        name,
        currentVersion: info.version,
        latestVersion: '',
      }));
    },
  },
  {
    name: 'yarn',
    checkCommand: ['yarn', 'global', 'list', '--depth=0', '--json'],
    parseOutput: (output: string) => {
      const lines = output.split('\n').filter((line) => line.startsWith('{'));
      return lines.map((line) => {
        const json = JSON.parse(line);
        return {
          name: json.name,
          currentVersion: json.version,
          latestVersion: '',
        };
      });
    },
  },
  {
    name: 'pnpm',
    checkCommand: ['pnpm', 'list', '-g', '--depth=0', '--json'],
    parseOutput: (output: string) => {
      try {
        const json = JSON.parse(output) as Array<{ name: string; version: string }>;
        return json
          .filter((pkg) => pkg.name !== 'pnpm')
          .map((pkg) => ({
            name: pkg.name,
            currentVersion: pkg.version,
            latestVersion: '',
          }));
      } catch (error) {
        console.error(`Error parsing pnpm output: ${error}`);
        return [];
      }
    },
  },
  {
    name: 'bun',
    checkCommand: ['bun', 'pm', 'ls', '--global'],
    parseOutput: (output: string) => {
      const lines = output.split('\n').slice(1);
      return lines.filter(Boolean).map((line) => {
        const [name, version] = line.trim().split(/\s+/);
        return {
          name,
          currentVersion: version,
          latestVersion: '',
        };
      });
    },
  },
];
