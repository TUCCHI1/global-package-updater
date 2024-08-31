import { parseArgs } from "std/cli/parse_args.ts";
import { packageManagers } from "./config/packageManagers.ts";
import { checkUpdatesForManager } from "./services/packageManager.ts";

async function checkUpdates(): Promise<string> {
  const updateLogs = await Promise.all(packageManagers.map(checkUpdatesForManager));
  return updateLogs.join("");
}

if (import.meta.main) {
  try {
    const args = parseArgs(Deno.args);
    const result = await checkUpdates();
    if (args.cron && result) {
      await Deno.writeTextFile("update_log.txt", result);
      console.log("Update log written to update_log.txt");
    } else if (!result) {
      console.log("No updates found");
    }
  } catch (error) {
    console.error(`An unexpected error occurred: ${error.message}`);
    Deno.exit(1);
  }
}
