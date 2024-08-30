import { assertEquals } from "https://deno.land/std@0.181.0/testing/asserts.ts";
import { isPackageManagerInstalled, getLatestVersion } from "../src/main.ts";

Deno.test("isPackageManagerInstalled returns boolean", async () => {
  const result = await isPackageManagerInstalled({ name: "npm", checkCommand: [], parseOutput: () => [] });
  assertEquals(typeof result, "boolean");
});

Deno.test("getLatestVersion returns a version string", async () => {
  const version = await getLatestVersion("deno");
  assertEquals(typeof version, "string");
  assert(version.match(/^\d+\.\d+\.\d+$/));
});
