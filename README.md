# Task Time Tracker

## 概要
Mac用のタスク時間記録アプリ。カテゴリを選んでタイマーを開始し、作業時間を自動記録する。
Electron + React + TypeScript で構築、macOS ネイティブアプリとして動作。

## 開発履歴

### 2026-02-14
- 基本的なタイマー機能実装（Electron + React + Tailwind CSS）
- UI洗練化（macOS Big Sur風デザイン、ダークモード対応）

### 2026-02-15
- カテゴリ管理機能（設定モーダルで追加・編集・削除・並び替え）
- アプリアイコン設定 + macOS ビルド対応（.app / .dmg）

## 実装済み機能
- [x] カテゴリボタンでタイマー開始/停止/切替
- [x] 今日のタスク履歴表示（合計時間付き）
- [x] データのローカル保存（electron-store）
- [x] ダークモード対応（system / light / dark 切替）
- [x] カテゴリの追加・編集・削除（設定モーダル）
- [x] ドラッグ＆ドロップでカテゴリ並び替え
- [x] 20種アイコン × 10種グラデーションのカスタマイズ
- [x] カスタムアプリアイコン
- [x] macOS .app / .dmg ビルド

## 今後の予定
- [ ] Markdown形式でエクスポート（Obsidian連携）
- [ ] 週間・月間の統計・レポート機能
- [ ] タスクへのメモ・コメント機能

## 技術スタック
| 技術 | バージョン | 用途 |
|---|---|---|
| Electron | ^33.0.0 | デスクトップアプリ基盤 |
| React | ^19.0.0 | UI フレームワーク |
| TypeScript | ^5.7.0 | 型安全 |
| Tailwind CSS | ^4.0.0 | スタイリング |
| electron-vite | ^2.3.0 | ビルドツール |
| electron-builder | ^26.0.0 | パッケージング |
| electron-store | ^11.0.0 | データ永続化 |
| lucide-react | ^0.564.0 | アイコン |

## セットアップ
```bash
npm install
npm run dev
```

## ビルド
```bash
# electron-vite プロダクションビルド
npm run build

# macOS .app + .dmg 生成
npm run build:mac
```

ビルド成果物は `dist/` に出力される:
- `dist/mac-arm64/Task Time Tracker.app`
- `dist/task-time-traker-1.0.0.dmg`

## ファイル構成
```
src/
├── main/
│   ├── index.ts                  # Electron メインプロセス
│   └── store.ts                  # electron-store（タスク・カテゴリ永続化、IPC）
├── preload/
│   ├── index.ts                  # contextBridge API
│   └── index.d.ts                # 型宣言
└── renderer/src/
    ├── App.tsx                   # メインコンポーネント（状態管理・画面構成）
    ├── app.css                   # デザインシステムトークン・ダークモード
    ├── types.ts                  # CategoryConfig / TaskRecord 型定義
    ├── hooks/
    │   └── useTimer.ts           # タイマーフック
    ├── constants/
    │   ├── icons.ts              # アイコンマップ（20種）
    │   └── gradients.ts          # グラデーションプリセット（10種）
    └── components/
        ├── TimerDisplay.tsx      # タイマー表示（H:M:S）
        ├── CategoryGrid.tsx      # カテゴリボタングリッド
        ├── CategoryButton.tsx    # カテゴリボタン（グラデーション）
        ├── TaskHistory.tsx       # 今日のタスク履歴
        ├── ThemeToggle.tsx       # テーマ切替ボタン
        ├── SettingsModal.tsx     # カテゴリ設定モーダル（D&D対応）
        ├── CategoryForm.tsx      # カテゴリ追加/編集フォーム
        ├── IconPicker.tsx        # アイコン選択グリッド
        └── GradientPicker.tsx    # グラデーション選択グリッド

build/
├── icon.svg                      # アイコンソース
├── icon.png                      # 1024x1024 PNG
└── icon.icns                     # macOS 用アイコン

electron-builder.yml              # electron-builder 設定
electron.vite.config.ts           # electron-vite 設定
```
