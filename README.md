# Gorge-Overlay
![image](https://user-images.githubusercontent.com/40759792/130110429-12ca66b8-f797-4673-994d-1ba54e557bfa.png)
## ！！注意！！
このオーバーレイはあくまで参考です。100％正確ではないので、注意してください。

## 主な機能
- ライバルウィングスでのロボット搭乗履歴をOverlayに表示する。  
- ライバルウィングスでのOverlay上のキル数をプレイヤーのみに限定する。(マトンを除外する)
- FL・RW/PvEエリアでの戦闘に応じてクリティカル等の表示とキルデス表示を自動で切り替える。
 
## 説明
ゴージ好きのためのOverlay。  
個人で使用するために作成しました。  
FLでも使えるはずですが、テストしていないため動かない気もします。  

中の人がこれ1つでPvEコンテンツも行こうとしているので、PvEエリアだと表示が少し変わります。  
表示は左から「Crit%」「Direct%」「CritDirect%」です。  
詳細は動作例を確認してください。

OverlayPlugin製作初心者のため、冗長なコードとなっています。  
また、少し重たいかもしれません。  
バグだらけですが、大目に見てください。
## インストール
Zip形式でダウンロードしたものを展開し、OverlayPluginにGorge-Onerlay.htmlを読み込ませてください。  
もし、ACT側のDefault character nameを変更している場合は初期値に戻す、もしくはGorge-Onerlay.htmlのACTNameを書き換えてください。
## 動作例
プライバシー保護のため、この画像では名前を途中まで表示させています。
![image](https://user-images.githubusercontent.com/40759792/130108442-c10fe405-ad29-4617-b163-25b3a61d6920.png)
![image](https://user-images.githubusercontent.com/40759792/130108457-cfc556e9-ae12-43d8-b567-45e0d92448b1.png)

## 参考にさせていただいたもの
[billyvg/OverlayPlugin-themes](https://github.com/billyvg/OverlayPlugin-themes)　より、[xephero.html](https://github.com/billyvg/OverlayPlugin-themes/blob/master/xephero.html)　を編集させていただきました。

## 前提Plugin
[ngld/OverlayPlugin](https://github.com/ngld/OverlayPlugin)

[ravahn/FFXIV_ACT_Plugin](https://github.com/ravahn/FFXIV_ACT_Plugin)

## 追加するかもしれない機能
- ロボのEPが一定値を下回ったら音を出す。
- テンション20以降のキル音を疑似的に表現する。
- 完全なロボのみのDPSを表示する。
## 仕様
コンソールログが出力される。（デバッグ用で一部残してます。）

MargeをFalseにした状態のロボットのDPSがおかしい  
チェイサーは照準のDPSのみ、オプレッサーはミサイルのDPSのみがそこに表示されるためです。

コンテンツ退出してから40秒後にKill数とロボの表示だけが消えた！  
40秒後にデータが消えるようになっています。ACT側の設定を40秒未満にしてください。（こちらは、30秒で確認しています。） 

## 既知のバグ
ロボに搭乗した際、うまくOverlayに反映されないときがある。  
周囲で起きた状況しかOverlayに表示されない（一定以上離れるとログが来ない）  
砕氷戦での氷破壊がキルに含まれる。    
日本語以外で動かない
