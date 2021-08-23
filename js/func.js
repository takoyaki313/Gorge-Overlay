        function AreaCheck(encounter){
          if(encounter.CurrentZoneName.indexOf('Crystal Tower Training Grounds')!== -1
          ||encounter.CurrentZoneName.indexOf('Lichenweed')!== -1
          ||encounter.CurrentZoneName.indexOf('Astragalos')!== -1
          ||encounter.CurrentZoneName.indexOf('Hidden Gorge')!== -1
          ||encounter.CurrentZoneName.indexOf('Wolves')!== -1
          ||encounter.CurrentZoneName.indexOf('Bourderland Ruins')!== -1
          ||encounter.CurrentZoneName.indexOf('Seal Rock')!== -1
          ||encounter.CurrentZoneName.indexOf('Fields Of Glory')!== -1
          ||encounter.CurrentZoneName.indexOf('Onsal Hakair')!== -1
          ||encounter.CurrentZoneName.indexOf('Middle La Noscea') !== -1){
            if(encounter.CurrentZoneName.indexOf('Bourderland Ruins')!== -1
            ||encounter.CurrentZoneName.indexOf('Seal Rock')!== -1
            ||encounter.CurrentZoneName.indexOf('Fields Of Glory')!== -1
            ||encounter.CurrentZoneName.indexOf('Onsal Hakair')!== -1){
              pvpzone = 8;
            }
            else{
              pvpzone = 4;
            }

          }
          else{
            pvpzone = 0;
          }
          return pvpzone;
        }
        function KillAudio(check,team,killname){
          //console.log('Killsound');
          //console.log(check + team + killname);
          if(Zyaki == 'True'){
            if(check == 1){
              for(var l = 0;l < 4;l++){
                if(killname.indexOf(team[l]) !== -1){
                  KillSound.play();
                }
              }
            }
          }
        }

        function margedata(c,maxrow,myname){
          var GorgeData =[];
          //console.log(maxrow.length);
          for(var i = 0; i < maxrow.length; i++){
            var combatant = c[maxrow[i]];
            if(combatant.name == ACTName || combatant.name == 'YOU'){
              combatant.name = myname;
            }
            //console.log(combatant);
            if(GorgeData.length == 0){
              GorgeData[0] = [combatant.name,Number(combatant.encdps),combatant.Job,Number(combatant.kills),Number(combatant.deaths),0,'',];
              //GorgeData[0] = ['Justice Suzuki',Number(combatant.encdps),combatant.Job,Number(combatant.kills),Number(combatant.deaths),0,'',];
              //console.log('初期設定');
            }
            else{
              for(var k = 0; k < GorgeData.length; k++){
                //console.log('k :'+ k + 'GorgeData.length :'+GorgeData.length);
                if(GorgeData[k][0].indexOf(combatant.name) !== -1){//配列にロボットのデータが存在する
                  //console.log('Marge配列にロボットのデータが存在する');
                  var total =Number(GorgeData[k][1]) + Number(combatant.encdps);
                  total = Math.round(total * 100) / 100;
                  GorgeData[k] = [combatant.name,total,combatant.Job,GorgeData[k][3] + Number(combatant.kills),GorgeData[k][4] + Number(combatant.deaths),0,'',];
                  k = 100;
                }
                else{
                  if(combatant.name.indexOf(GorgeData[k][0]) !== -1){//配列にプレイヤー本体のデータが存在する
                    //console.log('Marge配列にプレイヤー本体のデータが存在する');
                    var total =Number(GorgeData[k][1]) + Number(combatant.encdps);
                    total = Math.round(total * 100) / 100;
                    //console.log(Number(GorgeData[k][1]) +' + '+ Number(combatant.encdps)+' = '+total);
                    GorgeData[k] = [GorgeData[k][0],total,GorgeData[k][2],GorgeData[k][3] + Number(combatant.kills),GorgeData[k][4] + Number(combatant.deaths),0,'',];
                    k = 100;
                  }
                }
                if(k == GorgeData.length -1){
                  //console.log('存在しないため、追加');
                  GorgeData[GorgeData.length] = [combatant.name,Number(combatant.encdps),combatant.Job,Number(combatant.kills),Number(combatant.deaths),0,'',];
                  k = GorgeData.length;
                }
              }
            }

            //GorgeData[i] = [combatant.name,combatant.encdps,combatant.Job,combatant.kills,combatant.deaths,'',''];
          }//combatantのデータコピー部分

          var killroop = T_Kills.length;
          for(var i = 0; i < GorgeData.length; i++){//マトン等以外のキルを表示するための部分
            //console.log('キルi :'+i);
            //console.log('GorgeData.length :'+GorgeData.length);
            for(var k = 0; k < killroop; k++){
              //console.log('キルk :'+k);
              if(T_Kills[k][0].indexOf(GorgeData[i][0]) !== -1){
                GorgeData[i][5] = Number(GorgeData[i][5]) + Number(T_Kills[k][1]);
                //console.log('DATA ADD');
                //console.log(GorgeData);
              }
            }
          }
          for(var i = 0; i < GorgeData.length; i++){//ロボ搭乗状況の表示用
            //console.log('ロボi :'+i);
            for(var k = 0; k < Robots.length; k++){
              //console.log('ロボk :'+k);
              if(Robots[k][0].indexOf(GorgeData[i][0]) !== -1){
                GorgeData[i][6] = Robots[k][3];
                //console.log('DATA ADD');
                //console.log(GorgeData);
                k = Robots.length;
              }
            }
          }
          for(var i = 0; i < GorgeData.length; i++){//アライアンス表示

            for(var k = 0; k < Aliance.length; k++){

              if(Aliance[k][0].indexOf(GorgeData[i][0]) !== -1){
                GorgeData[i][7] = Aliance[k][1];

                k = Aliance.length;
              }
            }
          }
          //console.log(GorgeData);
          //test用データ


          return GorgeData;
        }
        function DammyData(data){
          var GorgeData = [];
          GorgeData[0] = [data[0][0],data[0][1],data[0][2],data[0][3],data[0][4],data[0][5],'cheoppjasoppjasche',1];
          GorgeData[1] = ['Justice Suzuki',8752.66,'Rdm',3,4,6,'cheoppchejasjasjasjasjascheche',1];
          GorgeData[2] = ['Oppresor Tanaka',6812.76,'Sam',3,4,8,'oppoppche',5];
          GorgeData[3] = ['Chaiser Satou',3812.7,'Blm',3,4,8,'jasjasjas',2];
          GorgeData[4] = ['Daniel Tepesh',2315.25,'Whm',2,0,3,'',1];
          GorgeData[5] = ['Michael Twining',4415.78,'Pld',2,5,2,'',6];
          GorgeData[6] = ['Samuel Takano',3156.25,'War',2,2,2,'',2];
          GorgeData[7] = ['Gabriel Tepeş',3351.42,'Drk',2,1,6,'oppoppopp',3];
          GorgeData[8] = ['Nathaniel Tamwood',1201.12,'Sch',2,3,7,'cheoppcheche',4];
          GorgeData[9] = ['Pearl The',5261.21,'Sam',2,2,13,'',3];
          GorgeData[10] = ['Raphael Tachibana',750.68,'Brd',2,1,4,'',1];
          GorgeData[11] = ['Carl Tanner',3152.12,'Nin',2,2,5,'',4];
          GorgeData[12] = ['Ansel Tod',1514.68,'Gnb',2,3,9,'',5];
          GorgeData[13] = ['Angel Twist',6742.36,'Nin',2,6,10,'',2];
          GorgeData[14] = ['Carmel Tae-yeon',3452.12,'Nin',2,9,2,'',2];
          GorgeData[15] = ['Karl Touya',6984.45,'Mch',2,6,1,'',3];
          GorgeData[16] = ['Mendel Thornton',3541.51,'Sam',2,7,0,'',6];
          GorgeData[17] = ['Saul Todman',3154.12,'Mch',2,4,3,'',5];
          GorgeData[18] = ['Paul Talos',3514.98,'Brd',2,4,2,'',6];
          GorgeData[19] = ['Maxwell Tudor',2235.14,'Drg',2,3,6,'',4];
          GorgeData[20] = ['Abdul Trenton',2645.84,'Drg',2,7,1,'',3];
          GorgeData[21] = ['Joel Toussaint',2874.26,'Drg',2,4,2,'cheoppcheoppoppoppopp',6];
          GorgeData[22] = ['Niall Talbot',3547.45,'Drg',2,2,1,'',5];
          GorgeData[23] = ['Nicolas Gutchi',4215.23,'Drg',2,9,1,'',4];

          return GorgeData;
        }
        function RoborImage(low){
          var data = '';
          var num = low.length/3;
          var che = '<img src="https://takoyaki313.github.io/Gorge-Overlay/images/glow/che.png"  height="15px" hspace="1px"> ';
          var jas = '<img src="https://takoyaki313.github.io/Gorge-Overlay/images/glow/jas.png"  height="15px" hspace="1px"> ';
          var opp = '<img src="https://takoyaki313.github.io/Gorge-Overlay/images/glow/opp.png"  height="15px" hspace="1px"> ';

          //console.log(num);
          for(var c = 0;c < num; c++){
            if('che' == low.substr(0,3)){
              //console.log('che');
              data = data + che;
              //console.log(data);
              low = low.substr(3,low.length);
            }
            if('jas' == low.substr(0,3)){
              //console.log('jas');
              data = data + jas;
              //console.log(data);
              low = low.substr(3,low.length);
            }
            if('opp' == low.substr(0,3)){
              //console.log('opp');
              data = data + opp;
              //console.log(data);
              low = low.substr(3,low.length);
            }
          }
          //console.log('RoborImage →' + data);
          return data;
        }
