export interface PackageManager {
  name: string;
  checkCommand: string[];
  parseOutput: (output: string) => Package[];
}

export interface Package {
  name: string;
  currentVersion: string;
  latestVersion: string;
}
