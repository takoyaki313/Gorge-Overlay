# Gorge-Overlay
## !!未完成です!!

ゴージ好きのためのOverlay。  
個人で使用するために作成しました。

FLでも使えるはずですが、テストしていないため動かない気もします。  
余裕があるときに直すかも。

中の人がこれ1つでPvEコンテンツも行こうとしているので、PvEエリアだと表示が少し変わります。  
詳細は動作例を確認してください。

OverlayPlugin製作初心者のため、冗長なコードとなっています。  
また、少し重たいかもしれません。  
バグだらけですが、大目に見てください。

## 動作例
プライバシー保護のため、この画像では名前を途中まで表示させています。

![image](https://user-images.githubusercontent.com/40759792/129853509-e9a02321-67c3-4bde-a67a-8db9ce9ff479.png)

## 動作確認環境
ゲーム言語:日本語

## 参考にさせていただいたもの
[billyvg/OverlayPlugin-themes](https://github.com/billyvg/OverlayPlugin-themes)　より、[xephero.html](https://github.com/billyvg/OverlayPlugin-themes/blob/master/xephero.html)　を編集させていただきました。

## 前提Plugin
[ngld/OverlayPlugin](https://github.com/ngld/OverlayPlugin)

[ravahn/FFXIV_ACT_Plugin](https://github.com/ravahn/FFXIV_ACT_Plugin)

## これからの予定
ロボ自体のDPSを表示する？

## 仕様
コンソールログが出力される。（デバッグ用で一部残してます。）

MargeをFalseにした状態のロボットのDPSがおかしい  
チェイサーは照準のDPSのみ、オプレッサーはミサイルのDPSのみがそこに表示されるためです。

コンテンツ退出してから40秒後にKill数とロボの表示だけが消えた！  
40秒後にデータが消えるようになっています。ACT側の設定を40秒未満にしてください。（こちらは、30秒で確認しています。） 

## 既知のバグ
ロボに搭乗した際、うまくOverlayに反映されないときがある。  
周囲で起きた状況しかOverlayに表示されない（一定以上離れるとログが来ない）
