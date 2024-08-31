import { parseArgs } from "std/cli/parse_args.ts";

interface PackageManager {
  name: string;
  checkCommand: string[];
  parseOutput: (output: string) => Package[];
}

interface Package {
  name: string;
  currentVersion: string;
  latestVersion: string;
}

const packageManagers: PackageManager[] = [
  {
    name: "npm",
    checkCommand: ["npm", "list", "-g", "--depth=0", "--json"],
    parseOutput: (output: string) => {
      const json = JSON.parse(output) as { dependencies: Record<string, { version: string }> };
      return Object.entries(json.dependencies).map(([name, info]) => ({
        name,
        currentVersion: info.version,
        latestVersion: "",
      }));
    },
  },
  {
    name: "yarn",
    checkCommand: ["yarn", "global", "list", "--depth=0", "--json"],
    parseOutput: (output: string) => {
      const lines = output.split("\n").filter((line) => line.startsWith("{"));
      return lines.map((line) => {
        const json = JSON.parse(line);
        return {
          name: json.name,
          currentVersion: json.version,
          latestVersion: "",
        };
      });
    },
  },
  {
    name: "pnpm",
    checkCommand: ["pnpm", "list", "-g", "--depth=0", "--json"],
    parseOutput: (output: string) => {
      const json = JSON.parse(output) as Array<{ name: string; version: string }>;
      return json.map((pkg) => ({
        name: pkg.name,
        currentVersion: pkg.version,
        latestVersion: "",
      }));
    },
  },
  {
    name: "bun",
    checkCommand: ["bun", "pm", "ls", "--global"],
    parseOutput: (output: string) => {
      const lines = output.split("\n").slice(1); // Skip the header
      return lines.filter(Boolean).map((line) => {
        const [name, version] = line.trim().split(/\s+/);
        return {
          name,
          currentVersion: version,
          latestVersion: "",
        };
      });
    },
  },
];

/**
 * Checks if a package manager is installed on the system.
 * @param pm - The package manager to check.
 * @returns A promise that resolves to true if the package manager is installed, false otherwise.
 */
async function isPackageManagerInstalled(pm: PackageManager): Promise<boolean> {
  try {
    const command = new Deno.Command(pm.name, { args: ["--version"] });
    const { success } = await command.output();
    return success;
  } catch {
    return false;
  }
}

/**
 * Retrieves the list of globally installed packages for a given package manager.
 * @param pm - The package manager to check.
 * @returns A promise that resolves to an array of Package objects.
 */
async function getGlobalPackages(pm: PackageManager): Promise<Package[]> {
  const command = new Deno.Command(pm.checkCommand[0], { args: pm.checkCommand.slice(1) });
  const { stdout } = await command.output();
  return pm.parseOutput(new TextDecoder().decode(stdout));
}

/**
 * Retrieves the latest version of a package from npm registry.
 * @param packageName - The name of the package to check.
 * @returns A promise that resolves to the latest version string.
 */
async function getLatestVersion(packageName: string): Promise<string> {
  const command = new Deno.Command("npm", { args: ["view", packageName, "version"] });
  const { stdout } = await command.output();
  return new TextDecoder().decode(stdout).trim();
}

/**
 * Checks for updates in globally installed packages across all supported package managers.
 * @returns A promise that resolves to a string containing the update log.
 */
async function checkUpdates(): Promise<string> {
  let updateLog = "";
  for (const pm of packageManagers) {
    if (await isPackageManagerInstalled(pm)) {
      console.log(`Checking ${pm.name} global packages...`);
      updateLog += `Checking ${pm.name} global packages:\n`;
      const packages = await getGlobalPackages(pm);
      for (const pkg of packages) {
        pkg.latestVersion = await getLatestVersion(pkg.name);
        if (pkg.currentVersion !== pkg.latestVersion) {
          const message = `${pkg.name}: ${pkg.currentVersion} -> ${pkg.latestVersion}`;
          console.log(message);
          updateLog += message + "\n";
        }
      }
      updateLog += "\n";
    }
  }
  return updateLog;
}

if (import.meta.main) {
  const args = parseArgs(Deno.args);
  if (args.cron) {
    const result = await checkUpdates();
    if (result) {
      await Deno.writeTextFile("update_log.txt", result);
    }
  } else {
    await checkUpdates();
  }
}
