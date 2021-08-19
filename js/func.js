        function AreaCheck(encounter){
          if(encounter.CurrentZoneName.indexOf('Crystal Tower Training Grounds')!== -1
          ||encounter.CurrentZoneName.indexOf('Lichenweed')!== -1
          ||encounter.CurrentZoneName.indexOf('Astragalos')!== -1
          ||encounter.CurrentZoneName.indexOf('Hidden Gorge')!== -1
          ||encounter.CurrentZoneName.indexOf('Wolves')!== -1
          ||encounter.CurrentZoneName.indexOf('Bourderland Ruins')!== -1
          ||encounter.CurrentZoneName.indexOf('Seal Rock')!== -1
          ||encounter.CurrentZoneName.indexOf('Fields Of Glory')!== -1
          ||encounter.CurrentZoneName.indexOf('Onsal Hakair')!== -1){
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
              GorgeData[0] = [combatant.name,Number(combatant.encdps),combatant.Job,Number(combatant.kills),Number(combatant.deaths),0,''];
              //GorgeData[0] = ['Justice Suzuki',Number(combatant.encdps),combatant.Job,Number(combatant.kills),Number(combatant.deaths),0,''];
              //console.log('初期設定');
            }
            else{
              for(var k = 0; k < GorgeData.length; k++){
                //console.log('k :'+ k + 'GorgeData.length :'+GorgeData.length);
                if(GorgeData[k][0].indexOf(combatant.name) !== -1){//配列にロボットのデータが存在する
                  //console.log('Marge配列にロボットのデータが存在する');
                  var total =Number(GorgeData[k][1]) + Number(combatant.encdps);
                  total = Math.round(total * 100) / 100;
                  GorgeData[k] = [combatant.name,total,combatant.Job,GorgeData[k][3] + Number(combatant.kills),GorgeData[k][4] + Number(combatant.deaths),0,''];
                  k = 100;
                }
                else{
                  if(combatant.name.indexOf(GorgeData[k][0]) !== -1){//配列にプレイヤー本体のデータが存在する
                    //console.log('Marge配列にプレイヤー本体のデータが存在する');
                    var total =Number(GorgeData[k][1]) + Number(combatant.encdps);
                    total = Math.round(total * 100) / 100;
                    //console.log(Number(GorgeData[k][1]) +' + '+ Number(combatant.encdps)+' = '+total);
                    GorgeData[k] = [GorgeData[k][0],total,GorgeData[k][2],GorgeData[k][3] + Number(combatant.kills),GorgeData[k][4] + Number(combatant.deaths),0,''];
                    k = 100;
                  }
                }
                if(k == GorgeData.length -1){
                  //console.log('存在しないため、追加');
                  GorgeData[GorgeData.length] = [combatant.name,Number(combatant.encdps),combatant.Job,Number(combatant.kills),Number(combatant.deaths),0,''];
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
          //console.log(GorgeData);
          //test用データ
          /*
          GorgeData[1] = ['Justice Suzuki',8752.66,'Rdm',3,4,6,'cheoppche'];
          GorgeData[2] = ['Oppresor Tanaka',6812.76,'Sam',3,4,8,'oppoppche'];
          GorgeData[3] = ['Chaiser Satou',3812.7,'Blm',3,4,8,'jasjasjas'];
          */
          GorgeData.sort((a,b) => {
              return(b[1] - a[1])
          })
          return GorgeData;
        }

        function RoborImage(low){
          var data = '';
          var num = low.length/3;
          var che = '<img src="images/glow/che.png"  height="15px" hspace="1px"> ';
          var jas = '<img src="images/glow/jas.png"  height="15px" hspace="1px"> ';
          var opp = '<img src="images/glow/opp.png"  height="15px" hspace="1px"> ';

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
