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

以下のコマンドを実行して、グローバルパッケージの更新をチェックします：cat << 'EOF' > LICENSE
MIT License

Copyright (c) [year] [fullname]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
