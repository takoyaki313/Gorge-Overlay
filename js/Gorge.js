        var Aliance = [];
        var PTMAX = 0;
        var Robots = [];
        var T_Kills = [];
        var pvpzone = 0;
        var Log_listen = 0;
        var Tensyon = 0;
        var sort_rule = 0;
        var rows = 40;
        var myname = '';
        var rdps_max = 0;
        var team = [];
        var backup;
        var marged_data;

        $(document).on("click", "#obj1", function(){
          if(sort_rule == 0){
            sort_rule = 1;
          }
          else if(sort_rule == 1){
            sort_rule = 2;
          }
          else if(sort_rule == 2){
            sort_rule = 3;
          }
          else{
            sort_rule = 0;
          }
          if(backup.Encounter.CurrentZoneName == 'Hidden Gorge'||backup.Encounter.CurrentZoneName == 'The Goblet'){
            click_refresh(marged_data,backup);
          }
          else{
            update(backup);
          }
        });

        $(function() {

        "use strict";



        addOverlayListener("CombatData", (e) => update(e));
        addOverlayListener("ChangePrimaryPlayer",(MyName) =>{
          myname = MyName.charName;
        });
        addOverlayListener('PartyChanged', (p) => {
          //console.warn(p);
          if(p.party.length == 24){
            $(document).ready(function(){setTimeout(function(){
              var aliance = 1;
              for(var z = 0;z < 24; z++){
                if(z > 3){
                  if(z % 4 == 0){
                    aliance++;
                  }
                }
                Aliance[z] =  [p.party[z].name,aliance];
              }
              //console.log(Aliance);

            }, 10000);
            });

          }
          if(p.party.length > 7){
            team = [];
            //console.log(CurrentPartyNum);
            for (var n = 0; n < 8; n++) {
              if(p.party[n].inParty){
                team[n] = p.party[n].name;
              }
              //console.log(test);
            }
              //console.warn(team);
          }
        });
        addOverlayListener("ChangeZone",(Area) => {
          console.log(Area);
          if(Area.zoneName == 'Hidden Gorge'
        ||Area.zoneName == 'Middle La Noscea'){
            Log_listen = 1;
          }
          else{
            Log_listen = 0;
          }
          if(Area.zoneName == 'Hidden Gorge'){//戦闘が始まる前に戦闘データを初期化する
            Aliance = [];
            $(document).ready(function(){setTimeout(function(){
              Robots = [];
              T_Kills = [];
            }, 40000);
            });
          }
          else if(Area.zoneName.indexOf('Bourderland Ruins')!== -1
          ||Area.zoneName.indexOf('Seal Rock')!== -1
          ||Area.zoneName.indexOf('Fields Of Glory')!== -1
          ||Area.zoneName.indexOf('Onsal Hakair')!== -1){
            Aliance = [];
          }
          Tensyon = 0;
          /*
          $(document).ready(function(){setTimeout(function(){
            console.log('40sReset');
            console.log(Aliance);
            console.log(Robots);
            console.log(T_Kills);
            console.log('40sReset');

          }, 40000);
          });
          */
        });

        addOverlayListener("LogLine", (log) => {
          //const startTime = performance.now(); // 開始時間
          if(Log_listen == 1){//本番環境では　＝＝　1 にすること
            //console.warn(log);
            if(log.line.length == 14){
              if(log.line[3] == 'テンションマックス'){
                if(log.line[8] == myname){
                  Tensyon = 1;
                }
              }
            }

            if(log.line.length == 6){
              //console.warn(log);
              if(log.line[0] == '00'){
                if(log.line[2] !== '0'){
                  if(log.line[4].indexOf('を倒した') !== -1){

                    //console.log(log);
                    if(log.line[4].indexOf('マグス')!== -1
                    ||log.line[4].indexOf('バイキング')!== -1
                    ||log.line[4].indexOf('マーシナリー')!== -1
                    ||log.line[4].indexOf('タンク')!== -1
                  ){//オブジェクトを破壊した場合
                    //なにもしない
                    }
                    else{//プレイヤーを倒した場合
                      //audio.play();
                      if(T_Kills.length == 0){
                        T_Kills[0] = [log.line[4].substr(0 ,log.line[4].indexOf('は、')),1];
                        //console.log(T_Kills);
                        KillAudio(Tensyon,team,T_Kills[0][0]);
                      }
                      else{
                        for(var z = 0; z < T_Kills.length; z++ ){
                            if(log.line[4].substr(0 ,log.line[4].indexOf('は、')) == T_Kills[z][0]){
                              T_Kills[z][1] = T_Kills[z][1] + 1;
                              //console.log(T_Kills[z][0] + 'が1kill');
                              KillAudio(Tensyon,team,T_Kills[z][0]);
                              z = T_Kills.length;
                              //console.log(T_Kills);
                            }
                            else{
                              if(z == T_Kills.length - 1){
                                T_Kills[T_Kills.length] = [log.line[4].substr(0 ,log.line[4].indexOf('は、')), 1];
                                //console.log('新規追加T_Kills');
                                //console.log(T_Kills);
                                z = T_Kills.length;
                                KillAudio(Tensyon,team,T_Kills[T_Kills.length - 1 ][0]);
                              }
                            }
                          }
                        }
                      }//プレイヤー倒しここまで
                    }//~を倒した
                  }//logline 2
                }//logline 0

              }//logline length6

　            //console.log(log.line);
            if(log.line.length >= 17){
              //console.warn(log.line);
              if(log.line[6] !== '1E5'){
                if(log.line[6] == 50000){//チェイサー
                  if(Robots.length == 0){
                    //console.log('新規ロボ乗り' + log.line[3] +'がMaxHp '+ log.line[6]+'になりました');
                    Robots[0] = [log.line[3],log.line[5],log.line[6]];
                    Robots[0][3] = 'che';
                    //console.log(Robots);
                  }
                  else{
                    for(var q = 0; q < Robots.length; q++){
                      if(log.line[3] == Robots[q][0]){//もし名前が一緒なら

                        if(Number(log.line[6]) !== Number(Robots[q][2])){//もし最大HPが異なるなら

                          var ten = Robots[q][3] + 'che';//オプレッサーに新しく乗ったと判定
                          //console.log('最大HPの変化' + log.line[3] +'が'+Robots[q][2]+'→'+log.line[6]+'になりました');
                          Robots[q] = [log.line[3],log.line[5],log.line[6],ten];
                          //console.log(Robots);
                        }
                        else{//もし最大HPが同じ場合
                          if(Number(Robots[q][1]) < Number(log.line[5])){//HPが増えたかどうかをチェック
                            var ten = Robots[q][3] + 'che';//オプレッサーに新しく乗ったと判定
                            //console.log('同一ロボHPの増加' + log.line[3] +'が'+Robots[q][1]+'→'+log.line[5]+'になりました');
                            Robots[q] = [log.line[3],log.line[5],log.line[6],ten];
                            //console.log(Robots);
                          }
                          else{//HPが増えてないときの現在HPの更新
                            Robots[q] = [Robots[q][0],log.line[5],Robots[q][2],Robots[q][3]];
                          }
                        }
                        q = Robots.length;//ループ抜け用

                      }

                      else{//同じ名前が見つからないとき
                        if(q == Robots.length - 1){//同じ名前が見つからずループを終わるとき
                          //console.log('新規ロボ乗り' + log.line[3] +'がMaxHp '+ log.line[6]+'になりました');
                          Robots[Robots.length] = [log.line[3],log.line[5],log.line[6],'che'];
                          q = Robots.length;//ループ抜け用
                          //console.log(Robots);
                        }
                      }
                    }
                  }
                }
                if(log.line[6] == 75000){//ジャスティス
                  if(Robots.length == 0){
                    //console.log('新規ロボ乗り' + log.line[3] +'がMaxHp '+ log.line[6]+'になりました');
                    Robots[0] = [log.line[3],log.line[5],log.line[6]];
                    Robots[0][3] = 'jas';
                    //console.log(Robots);
                  }
                  else{
                    for(var q = 0; q < Robots.length; q++){
                      if(log.line[3] == Robots[q][0]){//もし名前が一緒なら

                        if(Number(log.line[6]) !== Number(Robots[q][2])){//もし最大HPが異なるなら

                          var ten = Robots[q][3] + 'jas';//オプレッサーに新しく乗ったと判定
                          //console.log('最大HPの変化' + log.line[3] +'が'+Robots[q][2]+'→'+log.line[6]+'になりました');
                          Robots[q] = [log.line[3],log.line[5],log.line[6],ten];
                          //console.log(Robots);
                        }
                        else{//もし最大HPが同じ場合
                          if(Number(Robots[q][1]) < Number(log.line[5])){//HPが増えたかどうかをチェック
                            var ten = Robots[q][3] + 'jas';//オプレッサーに新しく乗ったと判定
                            //console.log('同一ロボHPの増加' + log.line[3] +'が'+Robots[q][1]+'→'+log.line[5]+'になりました');
                            Robots[q] = [log.line[3],log.line[5],log.line[6],ten];
                            //console.log(Robots);
                          }
                          else{//HPが増えてないときの現在HPの更新
                            Robots[q] = [Robots[q][0],log.line[5],Robots[q][2],Robots[q][3]];
                          }
                        }
                        q = Robots.length;//ループ抜け用

                      }

                      else{//同じ名前が見つからないとき
                        if(q == Robots.length - 1){//同じ名前が見つからずループを終わるとき
                          //console.log('新規ロボ乗り' + log.line[3] +'がMaxHp '+ log.line[6]+'になりました');
                          Robots[Robots.length] = [log.line[3],log.line[5],log.line[6],'jas'];
                          q = Robots.length;//ループ抜け用
                          //console.log(Robots);
                        }
                      }
                    }
                  }
                }
                if(log.line[6] == 100000){//オプレッサー
                  if(Robots.length == 0){
                    //console.log('新規ロボ乗り' + log.line[3] +'がMaxHp '+ log.line[6]+'になりました');
                    Robots[0] = [log.line[3],log.line[5],log.line[6]];
                    Robots[0][3] = 'opp';
                    //console.log(Robots);
                  }
                  else{
                    for(var q = 0; q < Robots.length; q++){
                      if(log.line[3] == Robots[q][0]){//もし名前が一緒なら

                        if(Number(log.line[6]) !== Number(Robots[q][2])){//もし最大HPが異なるなら
                          //console.log('最大HPの変化' + log.line[3] +'が'+Robots[q][2]+'→'+log.line[6]+'になりました');
                          var ten = Robots[q][3] + 'opp';//オプレッサーに新しく乗ったと判定

                          Robots[q] = [log.line[3],log.line[5],log.line[6],ten];
                          //console.log(Robots);
                        }
                        else{//もし最大HPが同じ場合
                          if(Number(Robots[q][1]) < Number(log.line[5])){//HPが増えたかどうかをチェック
                            //console.log('同一ロボHPの増加' + log.line[3] +'が'+Robots[q][1]+'→'+log.line[5]+'になりました');
                            var ten = Robots[q][3] + 'opp';//オプレッサーに新しく乗ったと判定
                            Robots[q] = [log.line[3],log.line[5],log.line[6],ten];
                            //console.log(Robots);
                          }
                          else{//HPが増えてないときの現在HPの更新
                            Robots[q] = [Robots[q][0],log.line[5],Robots[q][2],Robots[q][3]];
                          }
                        }
                        q = Robots.length;//ループ抜け用

                      }

                      else{//同じ名前が見つからないとき
                        if(q == Robots.length - 1){//同じ名前が見つからずループを終わるとき
                          //console.log('新規ロボ乗り' + log.line[3] +'がMaxHp '+ log.line[6]+'になりました');
                          Robots[Robots.length] = [log.line[3],log.line[5],log.line[6],'opp'];
                          q = Robots.length;//ループ抜け用
                          //console.log(Robots);
                        }
                      }
                    }
                  }
                }
              }

            }
            if(log.line.length == 16){//非戦闘時
              //console.warn(log.line);

                if(log.line[5] == 50000){//チェイサー
                  if(Robots.length == 0){
                    //console.log('新規ロボ乗り(16)' + log.line[3] +'がMaxHp '+ log.line[5]+'になりました');
                    Robots[0] = log.line.slice(3,6);
                    Robots[0][3] = 'che';
                    //console.log(Robots);
                  }
                  else{
                    for(var q = 0; q < Robots.length; q++){
                      if(log.line[3] == Robots[q][0]){//もし名前が一緒なら

                        if(Number(log.line[5]) !== Number(Robots[q][2])){//もし最大HPが異なるなら
                          //console.log('最大HPの変化(16)' + log.line[3] +'が'+Robots[q][2]+'→'+log.line[5]+'になりました');
                          var ten = Robots[q][3] + 'che';//オプレッサーに新しく乗ったと判定
                          Robots[q] = [log.line[3],log.line[4],log.line[5],ten];
                          //console.log(Robots);
                        }
                        else{//もし最大HPが同じ場合
                          if(Number(Robots[q][1]) < Number(log.line[4])){//HPが増えたかどうかをチェック
                            //console.log('同一ロボHPの増加(16)' + log.line[3] +'が'+Robots[q][1]+'→'+log.line[5]+'になりました');
                            var ten = Robots[q][3] + 'che';//オプレッサーに新しく乗ったと判定
                            Robots[q] = [log.line[3],log.line[4],log.line[5],ten];
                            //console.log(Robots);
                          }
                          else{//HPが増えてないときの現在HPの更新
                            Robots[q] = [Robots[q][0],log.line[4],Robots[q][2],Robots[q][3]];
                          }
                        }
                        q = Robots.length;//ループ抜け用
                      }

                      else{//同じ名前が見つからないとき
                        if(q == Robots.length - 1){//同じ名前が見つからずループを終わるとき
                          //console.log('新規ロボ乗り(16)' + log.line[3] +'がMaxHp '+ log.line[5]+'になりました');
                          Robots[Robots.length] = [log.line[3],log.line[4],log.line[5],'che'];
                          q = Robots.length;//ループ抜け用
                          //console.log(Robots);
                        }
                      }
                    }
                  }
                }
                else if(log.line[5] == 75000){//ジャスティス
                  if(Robots.length == 0){
                    //console.log('新規ロボ乗り(16)' + log.line[3] +'がMaxHp '+ log.line[5]+'になりました');
                    Robots[0] = log.line.slice(3,6);
                    Robots[0][3] = 'jas';
                    //console.log(Robots);
                  }
                  else{
                    for(var q = 0; q < Robots.length; q++){
                      if(log.line[3] == Robots[q][0]){//もし名前が一緒なら

                        if(Number(log.line[5]) !== Number(Robots[q][2])){//もし最大HPが異なるなら
                          //console.log('最大HPの変化(16)' + log.line[3] +'が'+Robots[q][2]+'→'+log.line[5]+'になりました');
                          var ten = Robots[q][3] + 'jas';//オプレッサーに新しく乗ったと判定
                          Robots[q] = [log.line[3],log.line[4],log.line[5],ten];
                          //console.log(Robots);
                        }
                        else{//もし最大HPが同じ場合
                          if(Number(Robots[q][1]) < Number(log.line[4])){//HPが増えたかどうかをチェック
                            //console.log('同一ロボHPの増加(16)' + log.line[3] +'が'+Robots[q][1]+'→'+log.line[5]+'になりました');
                            var ten = Robots[q][3] + 'jas';//オプレッサーに新しく乗ったと判定
                            Robots[q] = [log.line[3],log.line[4],log.line[5],ten];
                            //console.log(Robots);
                          }
                          else{//HPが増えてないときの現在HPの更新
                            Robots[q] = [Robots[q][0],log.line[4],Robots[q][2],Robots[q][3]];
                          }
                        }
                        q = Robots.length;//ループ抜け用
                      }

                      else{//同じ名前が見つからないとき
                        if(q == Robots.length - 1){//同じ名前が見つからずループを終わるとき
                          //console.log('新規ロボ乗り(16)' + log.line[3] +'がMaxHp '+ log.line[5]+'になりました');
                          Robots[Robots.length] = [log.line[3],log.line[4],log.line[5],'jas'];
                          q = Robots.length;//ループ抜け用
                          //console.log(Robots);
                        }
                      }
                    }
                  }
                }
                else if(log.line[5] == 100000){//オプレッサー
                  if(Robots.length == 0){
                    //console.log('新規ロボ乗り(16)' + log.line[3] +'がMaxHp '+ log.line[5]+'になりました');
                    Robots[0] = log.line.slice(3,6);
                    Robots[0][3] = 'opp';
                    //console.log(Robots);
                  }
                  else{
                    for(var q = 0; q < Robots.length; q++){
                      if(log.line[3] == Robots[q][0]){//もし名前が一緒なら

                        if(Number(log.line[5]) !== Number(Robots[q][2])){//もし最大HPが異なるなら
                          //console.log('最大HPの変化(16)' + log.line[3] +'が'+Robots[q][2]+'→'+log.line[5]+'になりました');
                          var ten = Robots[q][3] + 'opp';//オプレッサーに新しく乗ったと判定
                          Robots[q] = [log.line[3],log.line[4],log.line[5],ten];
                          //console.log(Robots);
                        }
                        else{//もし最大HPが同じ場合
                          if(Number(Robots[q][1]) < Number(log.line[4])){//HPが増えたかどうかをチェック
                            //console.log('同一ロボHPの増加(16)' + log.line[3] +'が'+Robots[q][1]+'→'+log.line[5]+'になりました');
                            var ten = Robots[q][3] + 'opp';//オプレッサーに新しく乗ったと判定
                            Robots[q] = [log.line[3],log.line[4],log.line[5],ten];
                            //console.log(Robots);
                          }
                          else{//HPが増えてないときの現在HPの更新
                            Robots[q] = [Robots[q][0],log.line[4],Robots[q][2],Robots[q][3]];4
                          }
                        }
                        q = Robots.length;//ループ抜け用
                      }

                      else{//同じ名前が見つからないとき
                        if(q == Robots.length - 1){//同じ名前が見つからずループを終わるとき
                          //console.log('新規ロボ乗り(16)' + log.line[3] +'がMaxHp '+ log.line[5]+'になりました');
                          Robots[Robots.length] = [log.line[3],log.line[4],log.line[5],'opp'];
                          q = Robots.length;//ループ抜け用
                          //console.log(Robots);
                        }
                      }
                    }
                  }
                  //console.log(Robots)
                }
            }
          }
          //const endTime = performance.now(); // 終了時間
          //console.warn(endTime - startTime + ' ms');

        });
        startOverlayEvents();
      });
