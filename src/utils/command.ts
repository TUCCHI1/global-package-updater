export async function runCommand(command: string, args: string[]): Promise<string> {
  const cmd = new Deno.Command(command, { args });
  const { stdout } = await cmd.output();
  return new TextDecoder().decode(stdout).trim();
}
