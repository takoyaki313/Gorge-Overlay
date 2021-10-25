# Gorge-Overlay2
![3](https://user-images.githubusercontent.com/40759792/137857172-3a46d9ab-6725-4ac9-a83c-2c6ed02a91cd.PNG)


## ！！注意！！
このオーバーレイで表示されるデータは参考です。  
また、告知なく一部機能の削除やデザインの変更があります。  

## 主な機能
- RWでのロボット搭乗履歴をOverlayに表示する。  
- Overlay上のキル数をプレイヤーのみに限定する。(マトンや氷、ドローンを除外する)
- RWにおいて、対人ダメージと対ロボダメージ、対物ダメージと対タワーダメージを分割する。
- FL・RW/PvEエリアでの戦闘に応じてクリティカル等の表示とキルデス表示を自動で切り替える。
- RWとFLにおいて、アライアンスのチームごとに色を左側に表示する。（24人そろってる場合に表示）
- テンションマックス以降のキルサウンドを再生する。
- 一定回数以上死んだ人をオーバーレイ上で強調表示する。
- HoTやバリアを除いたHPSを表示する。
- ジャスティスに搭乗した際に、ジャスパンの回数と命中率を表示する。


## 説明
FLやRWで使えるOverlay。  
1試合に何回ロボに搭乗したか覚えてない私のために制作しました。  
FLでも使えるはずですが、まだテストが終わっていません。  

中の人がこれ1つでPvEコンテンツも行こうとしているので、PvEエリアだと表示が少し変わります。  
表示は左から「Crit%」「Direct%」「CritDirect%」です。  

![image](https://user-images.githubusercontent.com/40759792/138678745-726984ef-8395-4284-905e-67a8e9ba8cde.png)

## インストール
Overlayを追加し、CustomからMiniParceを選択し、表示するURLに以下をコピペしてください。
```
https://takoyaki313.github.io/Gorge-Overlay/Gorge-Overlay2.html
```
[旧バージョン：Gorge-Overlay](https://takoyaki313.github.io/Gorge-Overlay/old/)
## 前提Plugin
[ngld/OverlayPlugin](https://github.com/ngld/OverlayPlugin)

[ravahn/FFXIV_ACT_Plugin](https://github.com/ravahn/FFXIV_ACT_Plugin)


## 仕様
試合中にオーバーレイが短くなった。  
戦闘が起きない時間が続くとACT側が戦闘を区切るからです。  
ゴージでは強制的に最大表示行数に固定するボタンがあります。（デフォルトオン）

自分の名前に色がつかない  
ACTの名前を設定画面から入力してください。

試合終了後のリザルトとデータが完全に一致しない。  

対物ダメージの計算が合わない。  
爆発したマトン等があるとダメージが変わるっぽい？です。
また、DoTやHoTはダメージ計算されないため、低く表示されます。
あくまで参考程度と捉えておいて下さい。

キル数が合わない。  
DoT死した敵は誰に殺されたかログに出てこないため、計算されません。  

他人のDPSが著しく低い  
遠くにいるアライアンスメンバーの戦闘データは届かないからです。  
一緒に行動しているのであればそこまで大きな差はないはずです。  

アライアンス表示がされない。（24人以下では動作しないようになっています。補充されたら反映されます。）

Overlayが4人までしか表示されない。  
[ravahn/FFXIV_ACT_Plugin](https://github.com/ravahn/FFXIV_ACT_Plugin)　の[FFXIV Setting]→[Option]内、[Parse Filter]が[Party]になっていませんか。  
(中の人の設定は[Aliance]です。）

タワーへのDPSがTotalDPSに含まれていない。  
ロボで攻撃した時のダメージが大きい（15万とか）ため、含まないようにしました。  

PvEコンテンツでパーティメンバーの優先表示が行われない。  
FL(オーバーレイで計算したDPSを使用にした場合)とRW以外で動作しないようになってます。  

K/Dの計算方法  
0除算を避けるためにKill，death共に1足してから計算しています。  

ダブルロケットパンチを1回しか撃っていないのに2回分換算された。  
2人に当たれば2回分として計算されます。  
マトンを含む、何かにHitすればMissとして計算されませんが、何も当たってない場合はMissとして計算されます。

試合が終わってからタイマーが停止するまでタイムラグがある。  

重い。  
通常のオーバーレイスキンとは違い、ログを一から計算しています。ちょっと重いかもしれないですが、作者のパソコンでは特に違和感なく動いています。

## 既知のバグ
- 途中参加したときはタイマーがスタートしない。
- FLやPvEでのDPSバーが少しはみ出し気味である。
- 謎のパーティーメンバー（DPS等が0のキャラ）が居る。
- ロボの搭乗回数がおかしいときがある。
