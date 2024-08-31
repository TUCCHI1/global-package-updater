import { runCommand } from "./command.ts";

export async function getLatestVersion(packageName: string): Promise<string> {
  if (!packageName) {
    throw new Error("Invalid package name");
  }
  try {
    return await runCommand("npm", ["view", packageName, "version"]);
  } catch (error) {
    console.error(`Error getting latest version for ${packageName}: ${error.message}`);
    return "";
  }
}
