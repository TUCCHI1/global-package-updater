# Global Package Updater

This tool checks for updates in globally installed packages across multiple package managers (npm, yarn, pnpm, and bun).

## Prerequisites

- Deno 1.31.0 or later

## Installation

1. Clone this repository:
   \`\`\`
   git clone https://github.com/yourusername/global-package-updater.git
   cd global-package-updater
   \`\`\`

2. Run the script:
   \`\`\`
   deno task start
   \`\`\`

## Usage

To check for updates:
\`\`\`
deno task start
\`\`\`

To run in cron mode (writes output to a file):
\`\`\`
deno task start --cron
\`\`\`

## Setting up Cron Job

To set up a cron job to run this script daily:

1. Open your crontab file:
   \`\`\`
   crontab -e
   \`\`\`

2. Add the following line (adjust the paths as necessary):
   \`\`\`
   0 9 * * * /path/to/deno run --allow-run --allow-write /path/to/global-package-updater/src/main.ts --cron
   \`\`\`

This will run the script every day at 9:00 AM.

## Running Tests

To run the tests:
\`\`\`
deno task test
\`\`\`

## License

[MIT](LICENSE)
cat << 'EOF' > README.md
# グローバルパッケージアップデーター

このツールは、複数のパッケージマネージャー（npm、yarn、pnpm、bun）でグローバルにインストールされたパッケージの更新をチェックします。

## 前提条件

- Deno 1.31.0 以降

## インストール

1. このリポジトリをクローンします：
   ```bash
   git clone https://github.com/yourusername/global-package-updater.git
   cd global-package-updater
   ```

2. 依存関係をインストールします（必要な場合）：
   ```bash
   deno cache --reload src/main.ts
   ```

## 使用方法

### 更新をチェックする

以下のコマンドを実行して、グローバルパッケージの更新をチェックします
```bash
deno task start
```
このコマンドは、インストールされているすべてのパッケージマネージャー（npm、yarn、pnpm、bun）のグローバルパッケージをチェックし、利用可能な更新がある場合はそれを表示します。

### クロンモードで実行する

結果をファイルに書き込むCronモードで実行するには：
```bash
deno task start --cron
```

このモードでは、更新情報が`update_log.txt`ファイルに書き込まれます。

## Cronジョブの設定

このスクリプトを毎日実行するCronジョブを設定するには：

1. Crontabファイルを開きます：
   ```bash
   crontab -e
   ```

2. 以下の行を追加します（パスを適宜調整してください）：
   ```
   0 9 * * * /path/to/deno run --allow-run --allow-write /path/to/global-package-updater/src/main.ts --cron
   ```

   これにより、スクリプトは毎日午前9時に実行されます。

## 開発

### テストの実行

テストを実行するには：
```bash
deno task test
```

### リンティング

コードのリンティングを行うには：
```bash
deno lint
```

### フォーマット

コードのフォーマットを行うには：
```bash
deno fmt
```

## 貢献
1. このリポジトリをフォークします
2. 機能ブランチを作成します (`git checkout -b feature/AmazingFeature`)
3. 変更をコミットします (`git commit -m 'Add some AmazingFeature'`)
4. ブランチにプッシュします (`git push origin feature/AmazingFeature`)
5. プルリクエストを作成します

## ライセンス

[MIT](LICENSE)ライセンスの下で配布されています。詳細については`LICENSE`ファイルを参照してください。
