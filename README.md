# Gorge-Overlay3

![image](https://user-images.githubusercontent.com/40759792/158027337-0b159ed7-e8d8-432c-9cd5-5a73f7ff9380.png)

[ACT(Advanced Combat Tracker)](https://advancedcombattracker.com/home.php)の[ngld/OverlayPlugin](https://github.com/ngld/OverlayPlugin)を用いた、FLやRWで使えるOverlayスキン。
## <span style="color:yellow">注意</span>
<h3 style="color:">このオーバーレイで表示されるデータは参考値です。<br>また、告知なく一部機能の削除やデザインの変更があります。 </h3>

## 主な機能
- FLとRWにおいて、様々な情報を表示する。
- PvEとPvPでオーバーレイの表示を切り替える。

## 説明

準備中

## インストール
Overlayを追加し、CustomからMiniParceを選択し、表示するURLに以下をコピペしてください。
```
https://takoyaki313.github.io/Gorge-Overlay/Gorge-Overlay3.html
```
[旧バージョン：Gorge-Overlay](https://takoyaki313.github.io/Gorge-Overlay/old/)

[旧バージョン：Gorge-Overlay2](https://takoyaki313.github.io/Gorge-Overlay/old/Gorge-Overlay2)
## 前提Plugin
[ngld/OverlayPlugin](https://github.com/ngld/OverlayPlugin)

[ravahn/FFXIV_ACT_Plugin](https://github.com/ravahn/FFXIV_ACT_Plugin)

## 仕様
- 試合終了後のリザルトとオーバーレイのデータが完全に一致しない。
- カルディアのHoTが計算されない。
- パーティメンバーが受けた猛りがHPSに計算されない。
- 全てのバリアヒール分が計算されない。
- メモリの使用量が多い (最大で500MBほど)
- 遠方の味方が敵を殴った場合、ロボ/タワーの判別ができない。（PCの場合人、NPCの場合、10000ダメージ以下はマトン側に計算されます。）
## 既知のバグ
- 試合終了後のリザルトとオーバーレイのデータが完全に一致しない。
- コンソールに'Critical Error : Log_Calc_failed... log queue reset'と出る場合がある。
- ロボを降りた/殺された後に着弾したミサイル/照準がロボのDPSに反映されない場合がある。
