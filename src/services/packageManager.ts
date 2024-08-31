import { Package, PackageManager } from '../types/index.ts';
import { runCommand } from '../utils/command.ts';
import { getLatestVersion } from '../utils/version.ts';

export async function isPackageManagerInstalled(pm: PackageManager): Promise<boolean> {
  try {
    await runCommand(pm.name, ['--version']);
    return true;
  } catch {
    return false;
  }
}

export async function getGlobalPackages(pm: PackageManager): Promise<Package[]> {
  try {
    console.log(`Running command: ${pm.checkCommand.join(' ')}`);
    const output = await runCommand(pm.checkCommand[0], pm.checkCommand.slice(1));
    console.log(`Raw output: ${output}`);
    const packages = pm.parseOutput(output);
    console.log(`Parsed packages: ${JSON.stringify(packages)}`);
    return packages;
  } catch (error) {
    console.error(`Error in getGlobalPackages for ${pm.name}: ${error}`);
    return [];
  }
}

export function updatePackageVersions(packages: Package[]): Promise<Package[]> {
  return Promise.all(
    packages.map(async (pkg) => {
      try {
        const latestVersion = await getLatestVersion(pkg.name);
        return { ...pkg, latestVersion };
      } catch (error) {
        console.error(`Error updating version for ${pkg.name}: ${error}`);
        return pkg;
      }
    }),
  );
}

function logUpdates(pm: string, packages: Package[]): string {
  let log = `Checking ${pm} global packages:\n`;
  if (packages.length === 0) {
    log += 'No global packages found.\n';
  } else {
    packages.forEach((pkg) => {
      if (pkg.currentVersion !== pkg.latestVersion) {
        const message = `${pkg.name}: ${pkg.currentVersion} -> ${pkg.latestVersion}`;
        console.log(message);
        log += message + '\n';
      }
    });
  }
  return log + '\n';
}

export async function checkUpdatesForManager(pm: PackageManager): Promise<string> {
  if (!(await isPackageManagerInstalled(pm))) {
    console.log(`${pm.name} is not installed.`);
    return '';
  }
  console.log(`Checking ${pm.name} global packages...`);
  const packages = await getGlobalPackages(pm);
  if (packages.length === 0) {
    console.log(`No global packages found for ${pm.name}`);
    return `No global packages found for ${pm.name}\n`;
  }
  const updatedPackages = await updatePackageVersions(packages);
  return logUpdates(pm.name, updatedPackages);
}
