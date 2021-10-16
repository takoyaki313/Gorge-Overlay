# Gorge-Overlay
![image](https://user-images.githubusercontent.com/40759792/131285213-e1d75cc5-020a-4cc1-bc20-de317ff3c85b.png)
## ！！注意！！
このオーバーレイはあくまで参考です。100％正確ではないので、注意してください。  
また、アップデートにより、告知なく一部機能の削除やデザインの変更があります。  

## 主な機能
- RWでのロボット搭乗履歴をOverlayに表示する。  
- RWでのOverlay上のキル数をプレイヤーのみに限定する。(マトンを除外する)
- RWでの照準のDPSを自身のDPSと合計し、オプレッサーのミサイルによるDPSを別で表示する。
- FL・RW/PvEエリアでの戦闘に応じてクリティカル等の表示とキルデス表示を自動で切り替える。
- RWとFLにおいて、オーバーレイのデータをDPS順、アライアンス順、キル順、デス順と総DPS表記部分をクリックで並び替える。
- RWとFLにおいて、アライアンスのチームごとに色を左側に表示する。（24人そろってる場合に表示）
- (試験中)テンション20以降の味方のキルに効果音を追加する。(デフォルトでオフ)  


## 説明
ゴージで使えるOverlay。  
1試合に何回ロボに搭乗したか覚えてない私のために制作しました。  
FLでも使えるはずですが、一部でしかテストしていないため動かない気もします。  

FLとRWエリアでのデータは、総DPSが表示されている部分をクリックするごとに並び替えが行われます。  
クリックごとに、「DPS順」→「アライアンス順」→「キル数順」→「デス数順」と切り替わります。

中の人がこれ1つでPvEコンテンツも行こうとしているので、PvEエリアだと表示が少し変わります。  
表示は左から「Crit%」「Direct%」「CritDirect%」です。  
詳細は動作例を確認してください。
  
バグだらけですが、大目に見てください。  
オーバーレイにあるボタン  
![image](https://user-images.githubusercontent.com/40759792/132099616-ad0d6813-233a-433e-aa28-10e70ef82ae2.png)  
設定画面  
![image](https://user-images.githubusercontent.com/40759792/133138681-3adcd317-67db-4d66-b869-75d7a9fa7af8.PNG)
## インストール
Overlayを追加し、CustomからMiniParceを選択し、表示するURLに以下をコピペしてください。
```
https://takoyaki313.github.io/Gorge-Overlay/Gorge-Overlay.html
```

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
試合中にオーバーレイのデータがリセットされた。  
戦闘が起きない時間が続くとACT側が戦闘を区切るからです。  

自分の名前に色がつかない  
ACTの名前を設定画面から入力してください。

試合終了後のリザルトとデータが一致しない。  
周囲で起きた状況しかOverlayに表示されないためです。（一定以上離れるとログが来ないため）  
あくまで参考程度と捉えておいて下さい。

アライアンス表示がされない。（24人以下では動作しないようになっています。補充されたら反映されます。）

中央ラノシアやゴブで戦闘するとと表示が変わる。（ダミーデータが読み込まれます。HUD調整などにどうぞ。）

Overlayが4人までしか表示されない。  
[ravahn/FFXIV_ACT_Plugin](https://github.com/ravahn/FFXIV_ACT_Plugin)　の[FFXIV Setting]→[Option]内、[Parse Filter]が[Party]になっていませんか。  
(中の人の設定は[Aliance]です。）

FLやRWエリアに入ってから並び替えをするとアライアンス表示が消えた。  
突入してからゲートが開く間に関数のリセットが行われるようになっているためです。次の試合に備えましょう。

オプレッサーのDPSが合計されない。  
下に+〇〇としているのがオプレッサーで「ミサイル」を打った時のDPSです。これにはタワーやコア、マグス等はもちろん、対人ミサイルも含まれます。  
ただし、蒸気噴射で得たDPSは含まれず自身のDPS側に加算されます。

最大表示人数を24人以下にしたときのPT順ソートが無意味  

PvEコンテンツでパーティメンバーの優先表示が行われない。  
FLとRW以外で動作しないようになってます。

キルサウンドがダサい。  
気になるのであれば個人で変更してください。  
ローカルの場所を指定すると権限がないと言われるらしいので注意です。

## 既知のバグ
- ロボに搭乗した際、うまくOverlayに反映されないときがある。  
- 砕氷戦での氷破壊がキルに含まれる。    
- 日本語以外で動かない
- 謎のLimitBreakが表示される。
- 分身が倒したプレイヤーが自身のキルにカウントされない？（要確認
