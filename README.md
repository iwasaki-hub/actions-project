# GitHub Actions 練習プロジェクト

小さな Node.js プロジェクトを題材に、GitHub Actions を段階的に学ぶための教材です。
外部ライブラリは不要（`npm install` なしで動きます）。

## 使い方

1. GitHub で新しいリポジトリを作る（Public でも Private でも可）
2. このフォルダの中身をそのままリポジトリに push する
   ```bash
   git init
   git add .
   git commit -m "first commit"
   git branch -M main
   git remote add origin https://github.com/<ユーザー名>/<リポジトリ名>.git
   git push -u origin main
   ```
3. GitHub の **Actions タブ**で実行結果を確認する

ローカルでの動作確認:

```bash
npm test
npm run lint
npm run build
```

## 学習ステップ

| ファイル | 学べること |
|---|---|
| `01-hello.yml` | `on` / `jobs` / `steps` の基本、`run`、デフォルト環境変数、手動実行 |
| `02-ci.yml` | `uses`（checkout, setup-node）、`matrix`、Pull Request での自動テスト |
| `03-jobs-artifact.yml` | `needs`（ジョブの順序）、`if`、artifact の受け渡し、`env` |
| `04-manual-schedule.yml` | `workflow_dispatch` の inputs、`schedule`（cron）、Secrets / Variables |
| `05-release.yml` | タグ起動、`permissions`、`GITHUB_TOKEN`、`gh` CLI でリリース作成 |

## 練習課題

1. **わざとテストを失敗させる**: `src/calc.js` の `add` を `a - b` に変えて push → 赤いバツを確認して直す
2. **Pull Request で動かす**: ブランチを切って変更 → PR を作ると `02 CI` が走る。Branch protection で「CI 通過必須」にしてみる
3. **キャッシュ**: 何かライブラリを入れてから、`actions/setup-node` に `cache: npm` を足す
4. **Secret を登録**: Settings → Secrets and variables → Actions で `MY_SECRET` を登録し、`04` を手動実行してログを見る
5. **Variable を登録**: 同じ画面の Variables に `MY_VAR` を登録して表示させる
6. **リリース**: `git tag v1.0.0 && git push origin v1.0.0` で `05` を動かす
7. **自作 workflow**: コミットメッセージに `[skip ci]` を入れたらどうなるか試す／`paths:` フィルタで `src/` 変更時だけ動かす

## チートシート

```yaml
on:
  push:
    branches: [main]
    paths: ['src/**']
  pull_request:
  workflow_dispatch:
  schedule:
    - cron: '0 0 * * *'   # UTC

jobs:
  job-id:
    runs-on: ubuntu-latest
    needs: other-job
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v4
      - run: echo "hello"
```

- `${{ ... }}` が「式」。`github.*`, `secrets.*`, `vars.*`, `matrix.*`, `env.*` などが使える
- Secret はログに出ても `***` にマスクされる
- 失敗したら Actions タブ → 該当 run → 失敗したステップを開いてログを読む
