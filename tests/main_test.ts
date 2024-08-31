// tests/main_test.ts

import { assertStrictEquals, assertMatch, assertRejects, assertFalse } from "std/assert/mod.ts";
import { isPackageManagerInstalled, checkUpdatesForManager, getGlobalPackages } from "../src/services/packageManager.ts";
import { getLatestVersion } from "../src/utils/version.ts";
import { packageManagers } from "../src/config/packageManagers.ts";
import { PackageManager, Package } from "../src/types/index.ts";

// 既存のテストケース
Deno.test("isPackageManagerInstalled returns boolean for npm", async () => {
  const result = await isPackageManagerInstalled({
    name: "npm",
    checkCommand: [],
    parseOutput: () => [],
  });
  assertStrictEquals(typeof result, "boolean");
});

Deno.test("isPackageManagerInstalled returns boolean for non-existent package manager", async () => {
  const result = await isPackageManagerInstalled({
    name: "non-existent-pm",
    checkCommand: [],
    parseOutput: () => [],
  });
  assertFalse(result);
});

Deno.test("getLatestVersion returns a version string for deno", async () => {
  const version = await getLatestVersion("deno");
  assertStrictEquals(typeof version, "string");
  if (version !== "") {
    assertMatch(version, /^\d+\.\d+\.\d+$/);
  }
});

Deno.test("getLatestVersion returns empty string for non-existent package", async () => {
  const version = await getLatestVersion("non-existent-package-12345");
  assertStrictEquals(version, "");
});

Deno.test("getLatestVersion throws error for empty package name", async () => {
  await assertRejects(
    () => getLatestVersion(""),
    Error,
    "Invalid package name"
  );
});

Deno.test("getLatestVersion throws error for null package name", async () => {
  await assertRejects(
    () => getLatestVersion(null as unknown as string),
    Error,
    "Invalid package name"
  );
});

Deno.test("getLatestVersion throws error for undefined package name", async () => {
  await assertRejects(
    () => getLatestVersion(undefined as unknown as string),
    Error,
    "Invalid package name"
  );
});

Deno.test("isPackageManagerInstalled handles invalid input", async () => {
  const result = await isPackageManagerInstalled({
    name: "",
    checkCommand: [],
    parseOutput: () => [],
  });
  assertFalse(result);
});

Deno.test("getLatestVersion handles package with no releases", async () => {
  const version = await getLatestVersion("package-with-no-releases");
  assertStrictEquals(version, "");
});

Deno.test("pnpm parseOutput handles empty input", () => {
  const pnpmConfig = packageManagers.find(pm => pm.name === "pnpm");
  if (pnpmConfig) {
    const result = pnpmConfig.parseOutput("[]");
    assertStrictEquals(result.length, 0);
  }
});

Deno.test("pnpm parseOutput filters out pnpm itself", () => {
  const pnpmConfig = packageManagers.find(pm => pm.name === "pnpm");
  if (pnpmConfig) {
    const input = JSON.stringify([
      { name: "pnpm", version: "1.0.0" },
      { name: "other-package", version: "2.0.0" }
    ]);
    const result = pnpmConfig.parseOutput(input);
    assertStrictEquals(result.length, 1);
    assertStrictEquals(result[0].name, "other-package");
  }
});

Deno.test("getGlobalPackages handles command execution error", async () => {
  const mockPm: PackageManager = {
    name: "error-pm",
    checkCommand: ["non-existent-command"],
    parseOutput: () => [],
  };
  const result = await getGlobalPackages(mockPm);
  assertStrictEquals(result.length, 0);
});

Deno.test("updatePackageVersions handles error for individual package", async () => {
  const packages: Package[] = [
    { name: "valid-package", currentVersion: "1.0.0", latestVersion: "" },
    { name: "error-package", currentVersion: "1.0.0", latestVersion: "" },
  ];
  const updatePackageVersions = (await import("../src/services/packageManager.ts")).updatePackageVersions;
  const result = await updatePackageVersions(packages);
  assertStrictEquals(result.length, 2);
  assertStrictEquals(result[1].name, "error-package");
  assertStrictEquals(result[1].latestVersion, "");
});
