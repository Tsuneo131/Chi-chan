# Instagram運用サポート LP

黒田香織（Instagram運用ディレクター / SNS導線設計サポート）のランディングページ

## 🎯 プロジェクト概要

「売り込まないSNSで、ちゃんと選ばれる。」をコンセプトに、Instagram運用サポートサービスを提供するためのシングルページWebサイト。

## ✨ 主な機能

### 実装済み機能

1. **ヒーローセクション**
   - 背景画像付き
   - グラデーションテキスト
   - レスポンシブ対応（PC/タブレット/スマホ）
   - 2行固定レイアウト

2. **プロフィールセクション**
   - 写真付き自己紹介
   - フォロワー数表示（1.2万人）
   - スマホ用改行最適化

3. **共感セクション（Sympathy）**
   - お悩み3項目
   - 解決策の提示
   - スマホ最適化レイアウト

4. **About セクション**
   - 詳細なプロフィール
   - 写真2枚掲載
   - 信頼性重視の構成

5. **価値観セクション（Values）**
   - アイコン付きリスト
   - 3つの価値観表示

6. **理念セクション（Philosophy）**
   - 「しないこと」と「大切にすること」の対比表示
   - ✓/× アイコン使用

7. **Fit セクション**
   - 「一緒に歩める方」「難しい方」の明確化
   - チェックリスト形式

8. **実績セクション（Results）**
   - 4つのアカウント事例
   - カテゴリバッジ付き
   - 数値成果表示

9. **サービス内容セクション**
   - 4つのサービスカード
   - アイコン付き
   - 詳細説明

10. **お問い合わせセクション（Contact）**
    - Instagram DM誘導
    - プロフィール写真付き

11. **最終メッセージセクション**
    - グラデーション背景
    - 署名入り

## 📱 レスポンシブ対応

### ブレークポイント

- **PC**: > 1024px
- **タブレット**: 768px - 1024px
- **スマホ標準**: ≤ 768px
- **スマホ小型**: ≤ 480px
- **スマホ極小**: ≤ 375px

### デバイス別最適化

#### スマホ表示の特徴
- 1カラムレイアウト
- フォントサイズ縮小
- パディング調整
- `<br class="sp-only">` による改行最適化
- タッチ操作に適したボタンサイズ

#### タブレット表示の特徴
- 2カラムグリッド（一部セクション）
- 中間サイズのフォント
- 適度な余白

## 🎨 デザインシステム

### カラーパレット

```css
--primary-color: #E1306C;     /* Instagram ピンク */
--secondary-color: #833AB4;   /* Instagram パープル */
--text-dark: #333;
--text-light: #666;
--bg-white: #FFFFFF;
--bg-light: #F9F9F9;
--border-color: #E0E0E0;
--success-color: #4CAF50;
```

### フォント

- **メイン**: Noto Sans JP
- **見出し**: M PLUS Rounded 1c
- **アイコン**: Font Awesome 6.4.0

## 📂 ファイル構成

```
/
├── index.html                          # メインHTML
├── css/
│   ├── style.css                       # ベーススタイル (v16.0)
│   ├── style-hero-with-image.css       # ヒーローセクション (v22.0)
│   ├── style-tablet-optimized.css      # タブレット用 (v9.0)
│   ├── style-mobile-optimized.css      # スマホ用 (v20.0)
│   └── style-new-sections.css          # 追加セクション (v4.0)
└── README.md                           # このファイル
```

## 🔧 技術スタック

- **HTML5**: セマンティックマークアップ
- **CSS3**: Flexbox, Grid, Media Queries
- **JavaScript**: フェードインアニメーション、スムーススクロール
- **Font Awesome**: アイコン
- **Google Fonts**: Webフォント

## 🐛 既知の問題と解決策

### iPhone表示の問題（解決済み）

#### 問題
- iPhoneでPC表示になる
- モバイルCSSが適用されない
- カードのフォントサイズが大きすぎる

#### 原因
1. **CSS読み込み順序の問題**: `style-new-sections.css` が `style-mobile-optimized.css` より後に読み込まれ、モバイルスタイルを上書きしていた
2. **構文エラー**: `style-new-sections.css` 350行目に余計な閉じカッコ `}` があり、メディアクエリが壊れていた
3. **CSS優先度不足**: `!important` が不足していた

#### 解決策
1. CSS読み込み順序を変更（モバイルCSSを最後に）
2. 構文エラーを修正
3. 重要なモバイルスタイルに `!important` を追加
4. キャッシュ制御metaタグを追加
5. メディアクエリに `only screen and` を明示

```html
<!-- 正しいCSS読み込み順序 -->
<link rel="stylesheet" href="css/style-hero-with-image.css?v=22.0">
<link rel="stylesheet" href="css/style.css?v=16.0">
<link rel="stylesheet" href="css/style-new-sections.css?v=4.0">
<link rel="stylesheet" href="css/style-tablet-optimized.css?v=9.0">
<link rel="stylesheet" href="css/style-mobile-optimized.css?v=20.0">  <!-- 最後 -->
```

### テキスト折り返しの最適化

全ての日本語テキスト要素に以下を適用：

```css
word-break: keep-all;        /* 日本語の単語を途中で切らない */
overflow-wrap: break-word;   /* 長い単語は折り返す */
```

## 📋 今後の改善予定

### 優先度: 高
- [ ] iPhone実機での表示確認とデバッグ
- [ ] ブラウザキャッシュの完全クリア確認
- [ ] パフォーマンス最適化（画像圧縮、CSS最小化）

### 優先度: 中
- [ ] アクセシビリティ向上（ARIA属性追加）
- [ ] SEO最適化（構造化データ追加）
- [ ] フォーム実装（問い合わせ用）

### 優先度: 低
- [ ] ダークモード対応
- [ ] 多言語対応
- [ ] アニメーション追加

## 🚀 デプロイ手順

1. **Publishタブを使用**してワンクリックデプロイ
2. デプロイ後、実機（iPhone/Android）で確認
3. 必要に応じてキャッシュクリア

## 📊 パフォーマンス

- **初回読み込み**: 約8秒
- **CSSファイル**: 5ファイル
- **外部フォント**: Google Fonts (2フォントファミリー)
- **外部ライブラリ**: Font Awesome CDN

## 🔗 公開URL

- **Production**: Publishタブで確認
- **Instagram**: [@haru.renai14](https://www.instagram.com/haru.renai14/)

## 👤 作成者

**黒田 香織**  
Instagram運用ディレクター / SNS導線設計サポート  
フォロワー: 1.2万人

---

最終更新: 2026-03-04
バージョン: 2.0
