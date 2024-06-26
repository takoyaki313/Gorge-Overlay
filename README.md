# Gorge-Overlay4
Todo: 準備中

[ACT(Advanced Combat Tracker)](https://advancedcombattracker.com/home.php)の[ngld/OverlayPlugin](https://github.com/ngld/OverlayPlugin)を用いた、FLやRWで使えるOverlayスキン。
## <span style="color:red">注意</span>
<h3 style="color:">このオーバーレイで表示されるデータは参考値です。<br>また、告知なく機能の削除やデザインの変更があります。 </h3>

## 主な機能
- FLとRWにおいて、様々な情報を表示する。
- PvEとPvPでオーバーレイの表示を切り替える。
## 使い方
Todo: 準備中

</details>

## インストール
Overlayを追加し、CustomからMiniParceを選択し、表示するURLに以下をコピペしてください。
```
https://takoyaki313.github.io/Gorge-Overlay/v4
```
アップデートに関しての情報は[Release](https://github.com/takoyaki313/Gorge-Overlay/releases)より確認できます。

[旧バージョン：Gorge-Overlay](https://takoyaki313.github.io/Gorge-Overlay/old/)

[旧バージョン：Gorge-Overlay2](https://takoyaki313.github.io/Gorge-Overlay/old/Gorge-Overlay2)

## 前提Plugin
[ngld/OverlayPlugin](https://github.com/ngld/OverlayPlugin)

[ravahn/FFXIV_ACT_Plugin](https://github.com/ravahn/FFXIV_ACT_Plugin)

## 仕様
- 試合終了後のリザルトとオーバーレイのデータが完全に一致しない。
- 一人に対して複数人がカルディアを付けると無視される。
- メモリの使用量が多い (最大で500MBほど)
- クリコンで拾ったポーションが計算されない。
- 遠方の味方が敵を殴った場合、ロボ/タワーの判別ができない。（PCの場合人、NPCの場合、10000ダメージ以下はマトン側に計算されます。）

## 既知のバグ
- 試合終了後のリザルトとオーバーレイのデータが完全に一致しない。
- 刃の舞い【終】が反映されない。
- 一部バフ/デバフ（スタック制のバフ/デバフ効果（連続剣）等）が適用されていない。
- 7.0での影響は調査中です。

## Q&A
試合終了後のリザルト/ACTのデータと合わない。
- 100%合わせるのは私には無理です。

プレイヤー情報の更新があったデータとはなんですか。
- ユーザが使用したアクションはサーバーから、アクション実行のロックインが行われます。
その後、一定時間後（アクションによって異なる）に実際にアクションの実行がプレイヤーに反映されます。
これをプレイヤー情報の更新があったデータと言っています。
- DPSとHPSはロックインされた値を利用。
- 被ダメと被ヒールはプレイヤー情報の更新があった値を利用。

サーバーに戦闘データが送信されることはありますか。
- 通信はソースファイルとライブラリのダウンロードのみで、アップロードされることはありません。

PvEのデータもOverlayで計算していますか。
- PvEはACTからのDPSをそのまま使用しています。


## Copyright
画像は、[XIVAPI](https://xivapi.com/)を用いて表示しています。

本アプリケーションで使用される一部画像、音声は、スクウェア・エニックスの著作物です。  
(C) SQUARE ENIX CO., LTD. All Rights Reserved.
