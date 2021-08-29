# Gorge-Overlay
![image](https://user-images.githubusercontent.com/40759792/130110429-12ca66b8-f797-4673-994d-1ba54e557bfa.png)
## ！！注意！！
このオーバーレイはあくまで参考です。100％正確ではないので、注意してください。  
また、アップデートにより、告知なく一部機能の削除やデザインの変更があります。  
何か質問等ございましたらIssuesにお願いします。  

## 主な機能
- RWでのロボット搭乗履歴をOverlayに表示する。  
- RWでのOverlay上のキル数をプレイヤーのみに限定する。(マトンを除外する)
- RWでの照準のDPSを自身のDPSと合計し、オプレッサーのミサイルによるDPSを別で表示する。
- FL・RW/PvEエリアでの戦闘に応じてクリティカル等の表示とキルデス表示を自動で切り替える。
- RWとFLにおいて、オーバーレイのデータをDPS順、アライアンス順、キル順、デス順と総DPS表記部分をクリックで並び替える。
- RWとFLにおいて、アライアンスのチームごとに色を左側に表示する。（24人そろってる場合に表示）
- (試験中)テンション20以降の味方のキルに効果音を追加する。
## 説明
ゴージ好きのためのOverlay。  
1試合に何回ロボに搭乗したか覚えてない私のために制作しました。  
FLでも使えるはずですが、一部でしかテストしていないため動かない気もします。  

FLとRWエリアでのデータは、総DPSが表示されている部分をクリックするごとに並び替えが行われます。  
クリックごとに、「DPS順」→「アライアンス順」→「キル数順」→「デス数順」と切り替わります。

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
もし、ACT側のDefault character nameを変更している場合は初期値「YOU」に戻す、もしくはGorge-Onerlay.htmlのACTNameを書き換えてください。  
その場合ダウンロードはGorge-Onerlay.htmlのみで大丈夫です。  
## 動作例
プライバシー保護のため、この画像では名前を途中まで表示させています。  
RWでの表示の例（DPS順・アライアンス順・キル数順・デス数順）  
![image](https://user-images.githubusercontent.com/40759792/131143834-ffc006a2-26bc-4379-9126-54e8e27b4187.png)
FLでの表示例（DPS順・アライアンス順・キル数順・デス数順）  
![image](https://user-images.githubusercontent.com/40759792/131143823-eea9f374-12af-4610-a7cb-5623fc6bc43c.png)
PvEエリアでの表示例（並び替え不可）  
![](https://user-images.githubusercontent.com/40759792/130108442-c10fe405-ad29-4617-b163-25b3a61d6920.png)


## 参考にさせていただいたもの
[billyvg/OverlayPlugin-themes](https://github.com/billyvg/OverlayPlugin-themes)　より、[xephero.html](https://github.com/billyvg/OverlayPlugin-themes/blob/master/xephero.html)　を編集させていただきました。

## 前提Plugin
[ngld/OverlayPlugin](https://github.com/ngld/OverlayPlugin)

[ravahn/FFXIV_ACT_Plugin](https://github.com/ravahn/FFXIV_ACT_Plugin)


## 仕様
コンソールログが出力される。（デバッグ用で一部残してます。）

試合終了後のリザルトとデータが一致しない。  
周囲で起きた状況しかOverlayに表示されないためです。（一定以上離れるとログが来ないため）

アライアンス表示がされない。（24人以下では動作しないようになっています。補充されたら反映されます。）

中央ラノシアに行くと表示が変わる。（ダミーデータが読み込まれます。HUD調整などにどうぞ。）

Overlayが4人までしか表示されない。  
[ravahn/FFXIV_ACT_Plugin](https://github.com/ravahn/FFXIV_ACT_Plugin)　の[FFXIV Setting]→[Option]内、[Parse Filter]が[Party]になっていませんか。  
(中の人の設定は[Aliance]です。）

FLやRWエリアに入ってから並び替えをするとアライアンス表示が消えた。  
突入してからゲートが開く間に関数のリセットが行われるようになっているためです。次の試合に備えましょう。

オプレッサーのDPSが合計されない。  
下に+〇〇としているのがオプレッサーで「ミサイル」を打った時のDPSです。これにはタワーやコア、マグス等はもちろん、対人ミサイルも含まれます。  
ただし、蒸気噴射で得たDPSは含まれず自身のDPS側に加算されます。

キルサウンドがダサい。  
気になるのであれば個人で変更してください。

## 既知のバグ
- ロボに搭乗した際、うまくOverlayに反映されないときがある。  
- 砕氷戦での氷破壊がキルに含まれる。    
- 日本語以外で動かない
- アライアンス表示されない/ジョブがない味方？が居る場合がある。
- 分身が倒したプレイヤーが自身のキルにカウントされない？（要確認
