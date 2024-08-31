# Global Package Updater

This tool checks for updates of globally installed packages across multiple package managers (npm, yarn, pnpm, bun).

## Prerequisites

- Deno 1.31.0 or later

## Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/TUCCHI1/global-package-updater.git
   cd global-package-updater
   ```

2. Run the script:

   ```bash
   deno task start
   ```

## Usage

### Check for Updates

Run the following command to check for updates of global packages:

```bash
deno task start
```

This command will check global packages for all installed package managers (npm, yarn, pnpm, bun) and display available updates if any.

### Run in Cron Mode

To run in cron mode, which writes results to a file:

```bash
deno task start --cron
```

In this mode, update information will be written to the update_log.txt file.

### Setting up a Cron Job

To set up a cron job to run this script daily:

1. Open the crontab file:

```bash
crontab -e
```

2. Add the following line (adjust the paths as necessary):

```bash
0 9 * * * /path/to/deno run --allow-run --allow-write /path/to/global-package-updater/src/main.ts --cron
```

This will run the script every day at 9 AM.

## Development

### Run Tests

To run tests:

```bash
deno task test
```

### Compiling

To compile the project:

```bash
deno task compile
```

### Linting

To lint the code (using Deno's standard command):

```bash
deno lint
```

### Formatting

To format the code (using Deno's standard command):

```bash
deno fmt
```

## Contributing

1. Fork this repository
2. Create a feature branch (git checkout -b feature/AmazingFeature)
3. Commit your changes (git commit -m 'Add some AmazingFeature')
4. Push to the branch (git push origin feature/AmazingFeature)
5. Create a Pull Request

## License

Distributed under the MIT License. See LICENSE file for more information.
