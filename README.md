# Gorge-Overlay
![image](https://user-images.githubusercontent.com/40759792/130110429-12ca66b8-f797-4673-994d-1ba54e557bfa.png)
## ！！注意！！
このオーバーレイはあくまで参考です。100％正確ではないので、注意してください。  
また、アップデートにより、一部機能の削除やデザインの変更があります。

## 主な機能
- ライバルウィングスでのロボット搭乗履歴をOverlayに表示する。  
- ライバルウィングスでのOverlay上のキル数をプレイヤーのみに限定する。(マトンを除外する)
- FL・RW/PvEエリアでの戦闘に応じてクリティカル等の表示とキルデス表示を自動で切り替える。
- ゴージ内において、オーバーレイのデータをDPS順、アライアンス順、キル順、デス順と並び替える
- (試験中)テンション20以降の味方のキルに効果音を追加する。
- ゴージ内でアライアンスのチームごとに色を左側に表示する。（24人そろってる場合に表示）
 
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
Overlayを追加（Custom : MiniParce）し、表示するURLに以下をコピペしてください。
```
https://takoyaki313.github.io/Gorge-Overlay/Gorge-Overlay.html
```
もし、ACT側のDefault character nameを変更している場合は初期値に戻す、もしくはGorge-Onerlay.htmlのACTNameを書き換えてください。  
その場合ダウンロードはGorge-Onerlay.htmlのみで大丈夫です。  
## 動作例
プライバシー保護のため、この画像では名前を途中まで表示させています。  
RWでの表示の例  
![image](https://user-images.githubusercontent.com/40759792/131143834-ffc006a2-26bc-4379-9126-54e8e27b4187.png)
FLでの表示例  
![image](https://user-images.githubusercontent.com/40759792/131143823-eea9f374-12af-4610-a7cb-5623fc6bc43c.png)
PvEエリアでの表示例  
![](https://user-images.githubusercontent.com/40759792/130108442-c10fe405-ad29-4617-b163-25b3a61d6920.png)


## 参考にさせていただいたもの
[billyvg/OverlayPlugin-themes](https://github.com/billyvg/OverlayPlugin-themes)　より、[xephero.html](https://github.com/billyvg/OverlayPlugin-themes/blob/master/xephero.html)　を編集させていただきました。

## 前提Plugin
[ngld/OverlayPlugin](https://github.com/ngld/OverlayPlugin)

[ravahn/FFXIV_ACT_Plugin](https://github.com/ravahn/FFXIV_ACT_Plugin)


## 仕様
コンソールログが出力される。（デバッグ用で一部残してます。）

周囲で起きた状況しかOverlayに表示されない（一定以上離れるとログが来ない）

アライアンス表示がされない。（24人以下では動作しないようになっています。補充されたら反映されます。）

中央ラノシアに行くと表示が変わる。（ダミーデータが読み込まれます。HUD調整などにどうぞ。）

Overlayが4人までしか表示されない。  
[ravahn/FFXIV_ACT_Plugin](https://github.com/ravahn/FFXIV_ACT_Plugin)　の[FFXIV Setting]→[Option]内、[Parse Filter]が[Party]になっていませんか。  
(中の人の設定は[Aliance]です。）

コンテンツ退出してから40秒後にKill数とロボの表示だけが消えた！  
40秒後にデータが消えるようになっています。ACT側の設定を40秒未満にしてください。（こちらは、30秒で確認しています。） 

オプレッサーのDPSが合計されない。  
下に+〇〇としているのがオプレッサーで「ミサイル」を打った時のDPSです。これにはオブジェクトはもちろん、対人ミサイルも含まれます。

キルサウンドがダサい。  
気になるのであれば個人で変更してください。

## 既知のバグ
- ロボに搭乗した際、うまくOverlayに反映されないときがある。  
- ロボとプレイヤーのデータが結合されない時がある。
- 砕氷戦での氷破壊がキルに含まれる。    
- 日本語以外で動かない

## 追加するかもしれない機能
- 完全なロボのみのDPSを表示する。（行き詰ったので後回しになっています。）
- FLでのアライアンス表示の実装
