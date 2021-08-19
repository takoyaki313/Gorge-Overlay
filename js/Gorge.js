        var PTmember;
        var PTMAX = 0;
        var Robots = [];
        var T_Kills = [];
        var pvpzone = 0;
        var Log_listen = 0;


        $(function() {
        "use strict";
        var rows = 35;
        var myname = '';
        var rdps_max = 0;
        var team = [];
        var audio = new Audio('sound/rin.wav');
        addOverlayListener("CombatData", (e) => update(e));
        addOverlayListener("ChangePrimaryPlayer",(MyName) =>{
          myname = MyName.charName;
        })
        addOverlayListener("ChangeZone",(Area) => {
          console.log(Area);
          if(Area.zoneName == 'Hidden Gorge'){
            Log_listen = 1;
          }
          else{
            Log_listen = 0;
          }
          $(document).ready(function(){setTimeout(function(){
            console.log('40sReset');
            console.log(Robots);
            console.log(T_Kills);
            console.log('40sReset');
            Robots = [];
            T_Kills = [];
          }, 40000);
          });

        })

        addOverlayListener("LogLine", (log) => {

          if(Log_listen == 1){//本番環境では　＝＝　1 にすること

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
                      }
                      else{
                        for(var z = 0; z < T_Kills.length; z++ ){
                            if(log.line[4].substr(0 ,log.line[4].indexOf('は、')) == T_Kills[z][0]){
                              T_Kills[z][1] = T_Kills[z][1] + 1;
                              //console.log(T_Kills[z][0] + 'が1kill');
                              z = T_Kills.length;
                              //console.log(T_Kills);
                            }
                            else{
                              if(z == T_Kills.length - 1){
                                T_Kills[T_Kills.length] = [log.line[4].substr(0 ,log.line[4].indexOf('は、')), 1];
                                //console.log('新規追加T_Kills');
                                //console.log(T_Kills);
                                z = T_Kills.length;
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

                        if(log.line[6] !== Robots[q][2]){//もし最大HPが異なるなら

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

                        if(log.line[6] !== Robots[q][2]){//もし最大HPが異なるなら

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

                        if(log.line[6] !== Robots[q][2]){//もし最大HPが異なるなら
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

                        if(log.line[5] !== Robots[q][2]){//もし最大HPが異なるなら
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

                        if(log.line[5] !== Robots[q][2]){//もし最大HPが異なるなら
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

                        if(log.line[5] !== Robots[q][2]){//もし最大HPが異なるなら
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
        });


        addOverlayListener('PartyChanged', (p) => {
          if(p.party.length > 7){
            team = [];
            PTmember = p.party.slice(0,8);

            //console.log(CurrentPartyNum);

            for (var n = 0; n < 8; n++) {
              var temp = PTmember[n].name;
              team.push(temp);
              //console.log(test);
            }
              console.log(team);
          }
        });

        startOverlayEvents();


        function update(e) {
        var encounter = e.Encounter;
        var combatants = e.Combatant;
        var template = $('#source li');
        var container = $('#overlay').clone();
        //console.log(PTmember.party);
        //console.log(Robots);

        container.html('');

        var rdps = parseFloat(encounter.encdps);

        // sanity check
        if (!isNaN(rdps) && rdps != Infinity) {
        rdps_max = Math.max(rdps_max, rdps);
        }

        var header = template.clone();
        if (encounter.encdps.length <= 7) {
        header.find('.dps').text(encounter.encdps);
        } else {
        header.find('.dps').text(encounter.ENCDPS);
        }
        pvpzone = AreaCheck(encounter);
        if(pvpzone !== 0){
            header.find('.job-icon').html('<img src="images/glow/pvp.png" width="20px" height="20px" hspace="1px">')
            header.find('.name').text(encounter.CurrentZoneName);
        }
        else{
          header.find('.job-icon').html('<img src="images/glow/empty.png" width="20px" height="20px" hspace="1px">')
          header.find('.name').text(encounter.title);
        }
        header.find('.data3').text(encounter.duration);
        header.find('.bar').css('width', ((rdps / rdps_max) * 100) + '%');

        // set inactive
        if (!e.isActive) {
        rdps_max = 0;
        $('body').addClass('inactive');
        } else {
        $('body').removeClass('inactive');
        }

        container.append(header);

        var limit = Math.max(combatants.length, rows);
        var names = Object.keys(combatants).slice(0,rows-1);
        var PTmax = pvpzone;
        var maxdps = false;

        //||encounter.CurrentZoneName.indexOf('The Goblet') !== -1
        if(encounter.CurrentZoneName.indexOf('Hidden Gorge') !== -1 && MargeRobots == 'True'){
          var e_sonomama = combatants;
          var GorgeData = margedata(e_sonomama,names,myname);
          maxdps = GorgeData[0][1];


          for(var i = 0; i < GorgeData.length; i++){
            var row = template.clone();
            var Dps = GorgeData[i][1];

            if(pvpzone != 0){
              //PTメンバーに色をつける。
              for (var q = 0; q < 4 && q < team.length; q++) {
                if(GorgeData[i][0] == team [q]){
                  row.addClass('party');
                }
              }
            }
            if (GorgeData[i][0] == 'YOU'||GorgeData[i][0] == ACTName) {
            row.addClass('me');
            }

            row.find('.dps').text(Dps.toFixed(2));
            row.find('.name').text(GorgeData[i][0]);
            row.find('.job-icon').html('<img src="images/glow/' + GorgeData[i][2].toUpperCase() + '.png"  height="20px" hspace="1px" onerror="$(this).attr(\'src\', \'images/error.png\');">');
            row.find('.data1').css('width', 0);
            row.find('.number').css('width', 70);
            row.find('.data2').css('font-size', 15);
            row.find('.data3').css('font-size', 15);
            row.find('.data2').text('K:'+ GorgeData[i][5]);
            row.find('.data3').text('D:'+ GorgeData[i][4]);
            row.find('.bar').css('width', ((parseFloat(GorgeData[i][1]) / maxdps) * 100) + '%');
            row.find('.Robot').css('height',0);
            if(GorgeData[i][6].length > 0){
              row.find('.bar').css('width',0);
              row.find('.bar').css('height',18);
              row.find('.Robot').css('height',18);
              row.find('.Robot').css('width',GorgeData[i][6].length * 12);
              row.find('.Robot').html(RoborImage(GorgeData[i][6]));
            }
            //console.log(GorgeData);
            container.append(row);
          }

        }
        else{
          for (var i = 0; i < names.length; i++) {
          var combatant = combatants[names[i]];
          var icon =0;
          var row = template.clone();

          if (!maxdps) {
          maxdps = parseFloat(combatant.encdps);
          }



          //ここからPVPエリア専用判別式
          if(pvpzone !== 0){
            //PTメンバーに色をつける。
          for (var q = 0; q < PTmax && q < team.length; q++) {
            if(combatant.name == team [q]){
              row.addClass('party');
            }
          }

          //ロボ専用判別式

          if(combatant.name.indexOf('ファルコン・チェイサ')!== -1){
              combatant.name = combatant.name.substr( 6 );
              row.find('.bar').css('background', 'rgba(101,113,157,0.8)');
              icon = 1;
              //console.log('ファルコン・チェイサ');
              row.addClass('robot');
          }
          if(combatant.name.indexOf('ファルコン・オプレッサ')!== -1){
              icon = 2;
              //console.log('ファルコン・オプレッサ');
              combatant.name = combatant.name.substr( 6 );
              row.find('.bar').css('background', 'rgba(101,113,157,0.8)');
              row.addClass('robot');
          }
          if(combatant.name.indexOf('レイヴン・チェイサ')!== -1){
              icon = 1;
              //console.log('レイヴン・チェイサ');
              combatant.name = combatant.name.substr( 5 );
              row.find('.bar').css('background', 'rgba(157,101,113,0.8)');
              row.addClass('robot');
          }
          if(combatant.name.indexOf('レイヴン・オプレッサ')!== -1){
              icon = 2;
              //console.log('レイヴン・オプレッサ');
              combatant.name = combatant.name.substr( 5 );
              row.find('.bar').css('background', 'rgba(157,101,113,0.8)');
              row.addClass('robot');
          }

          if(combatant.name.indexOf('Takobo')!== -1){
            combatant.name = combatant.name.substring(13,combatant.name.length-1);
            row.find('.bar').css('background', 'rgba(157,101,113,0.8)');
            row.addClass('robot');
            combatant.name = 'ChocoboNosuke'
            combatant.Job = "Opp";
          }
          if(combatant.name.indexOf('青燐機関車')!== -1){
            icon = 3;
          }
          //表示テスト用
          //combatant.kills = 78;
          //combatant.deaths = 56;

  //ここまでPvPエリアのみ動作する部分

        }else{
          //クリティカルの表示用
            var crit;
            crit = combatant.crithits / combatant.hits;
            crit = Math.round(crit*100);
            if(crit == 'NaN'){
              crit = 0;
            }
        }


          if (combatant.name == 'YOU'||combatant.name == ACTName) {
          row.addClass('me');
          }
          //Limit Break
          if (combatant.name == 'Limit Break') {
          icon = 4;
          }

          if (combatant.damage.length > 6) {
          combatant.damage = combatant.damage.substring(0,combatant.damage.length-3) + 'K';
          }
          if (combatant.encdps.length > 7) {
          combatant.encdps = combatant.encdps.substring(0,combatant.encdps.length-1);
          }
          //ジョブアイコンが無いやつら

          row.find('.dps').text(combatant.encdps);
          //名前を1文字だけにする（配信等用）
          //combatant.name = combatant.name.slice(0,1);
          row.find('.name').text(combatant.name);

          if(pvpzone !== 0){
            if(icon == 0){
              row.find('.job-icon').html('<img src="images/glow/' + combatant.Job.toUpperCase() + '.png"  height="20px" hspace="1px" onerror="$(this).attr(\'src\', \'images/error.png\');">');
            }
            else if(icon == 1){
              row.find('.job-icon').html('<img src="images/glow/che.png"  height="20px" hspace="1px" onerror="$(this).attr(\'src\', \'images/error.png\');">');
            }
            else if(icon == 2){
              row.find('.job-icon').html('<img src="images/glow/opp.png"  height="20px" hspace="1px" onerror="$(this).attr(\'src\', \'images/error.png\');">');
            }

              row.find('.data1').css('width', 0);
              row.find('.number').css('width', 70);
              row.find('.data2').css('font-size', 15);
              row.find('.data3').css('font-size', 15);
              //row.find('.data3').css('width', 40);
              row.find('.data2').text('K:'+ combatant.kills);
              row.find('.data3').text('D:'+ combatant.deaths);
          }
          else{
            row.find('.data1').text(crit + '%');
            row.find('.data2').text(combatant.DirectHitPct);
            row.find('.data3').text(combatant.CritDirectHitPct);
          }
          //ジョブアイコン
          if(icon == 0){
            row.find('.job-icon').html('<img src="images/glow/' + combatant.Job.toUpperCase() + '.png"  height="20px" hspace="1px" onerror="$(this).attr(\'src\', \'images/error.png\');">');
          }
          else if(icon == 1){
            row.find('.job-icon').html('<img src="images/glow/che.png"  height="20px" hspace="1px" onerror="$(this).attr(\'src\', \'images/error.png\');">');
          }
          else if(icon == 4){
              row.find('.job-icon').html('<img src="images/glow/lib.png"  height="20px" hspace="1px" onerror="$(this).attr(\'src\', \'images/error.png\');">');
          }
          if(encounter.CurrentZoneName.indexOf('Hidden Gorge')!== -1
          ){

            row.find('.bar').css('width', ((parseFloat(combatant.encdps) / maxdps) * 100) + '%');
            row.find('.Robot').css('height',0);
            for(var t = 0; t < Robots.length ; t++){
              if(Robots[t][0].indexOf(combatant.name)!== -1){
                row.find('.bar').css('width',0);
                row.find('.bar').css('height',18);
                row.find('.Robot').css('height',18);
                row.find('.Robot').css('width',Robots[t][3].length * 12);
                row.find('.Robot').html(RoborImage(Robots[t][3]));
                t = Robots.length;
              }
              else{
              }
            }
          }
          else{//ゴージ以外

            row.find('.Robot').css('height',0);
            row.find('.bar').css('width', ((parseFloat(combatant.encdps) / maxdps) * 100) + '%');
          }
          container.append(row);
          }
        }

        $('#overlay').replaceWith(container);
        }
      });
