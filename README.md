# Gorge-Overlay3

![image](https://user-images.githubusercontent.com/40759792/158027337-0b159ed7-e8d8-432c-9cd5-5a73f7ff9380.png)

[ACT(Advanced Combat Tracker)](https://advancedcombattracker.com/home.php)の[ngld/OverlayPlugin](https://github.com/ngld/OverlayPlugin)を用いた、FLやRWで使えるOverlayスキン。
## <span style="color:yellow">注意</span>
<h3 style="color:">このオーバーレイで表示されるデータは参考値です。<br>また、告知なく一部機能の削除やデザインの変更があります。 </h3>

## 主な機能
- FLとRWにおいて、様々な情報を表示する。
- PvEとPvPでオーバーレイの表示を切り替える。
## 使い方
オーバーレイのデータ上にマウスカーソルを合わせると詳細データが表示されます。
![Gorge3](https://user-images.githubusercontent.com/40759792/158070864-079d42a8-9adf-4f33-9052-ea95d9531b98.gif)
## 説明

準備中
![image](https://user-images.githubusercontent.com/40759792/161756645-8fb1cdd9-6837-46b6-a9c7-66457de7a439.png)
![image](https://user-images.githubusercontent.com/40759792/162555713-9a69259f-8d1a-4e00-9f14-a43179bc5252.png)
## インストール
Overlayを追加し、CustomからMiniParceを選択し、表示するURLに以下をコピペしてください。
```
https://takoyaki313.github.io/Gorge-Overlay/Gorge-Overlay3.html
```
アップデートに関しての情報は[Release](https://github.com/takoyaki313/Gorge-Overlay/releases)より確認できます。

[旧バージョン：Gorge-Overlay](https://takoyaki313.github.io/Gorge-Overlay/old/)

[旧バージョン：Gorge-Overlay2](https://takoyaki313.github.io/Gorge-Overlay/old/Gorge-Overlay2)
## 前提Plugin
[ngld/OverlayPlugin](https://github.com/ngld/OverlayPlugin)

[ravahn/FFXIV_ACT_Plugin](https://github.com/ravahn/FFXIV_ACT_Plugin)


## 仕様
- 試合終了後のリザルトとオーバーレイのデータが完全に一致しない。
- カルディアのHoTが計算されない。
- パーティメンバーが受けた猛りがHPSに計算されない。
- 一部バリアが計算されない
- メモリの使用量が多い (最大で500MBほど)
- 遠方の味方が敵を殴った場合、ロボ/タワーの判別ができない。（PCの場合人、NPCの場合、10000ダメージ以下はマトン側に計算されます。）
## 既知のバグ
- 試合終了後のリザルトとオーバーレイのデータが完全に一致しない。
- コンソールに'Critical Error : Log_Calc_failed... log queue reset'と出る場合がある。
- ロボを降りた/殺された後に着弾したミサイル/照準がロボのDPSに反映されない場合がある。
- ロボが重なって表示される場合がある。
- 搭乗時間がマイナスになるときがある。
## Q&A
試合終了後のリザルト/ACTのデータと合わない。
- 100%合わせるのは私には無理です。

DPSのツールチップに出てくるA-〇〇〇〇はなんですか。
- プレイヤー情報（HP等）の更新があったデータのみの合計ダメージです。

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

ロボ登場時間の「∶」が点滅している。
- 搭乗判定されている間は点滅します。
戦闘終了時点で搭乗判定されていればそのまま点滅します。

## Copyright
画像は、[XIVAPI](https://xivapi.com/)を用いて表示しています。

本アプリケーションで使用される一部画像、音声は、スクウェア・エニックスの著作物です。
(C) SQUARE ENIX CO., LTD. All Rights Reserved.
