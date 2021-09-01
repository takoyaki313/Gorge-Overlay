function update(e) {
  backup = e;
  //const startTime = performance.now(); // 開始時間
  pvpzone = AreaCheck(e.Encounter);
  if(e.Encounter.CurrentZoneName == 'Hidden Gorge'||e.Encounter.CurrentZoneName == 'The Goblet'||e.Encounter.CurrentZoneName.indexOf('Middle La Noscea') !== -1 ){//ゴージエリア内の場合
    Area_Gorge(e);
  }
  else if(pvpzone !== 0){//FLエリアの場合
    Area_FL(e);
  }
  else{
    Area_PvE(e);
  }
  //const endTime = performance.now(); // 開始時間
  //console.log(endTime - startTime +'ms');
}

function AreaCheck(encounter){
  if(encounter.CurrentZoneName.indexOf('Crystal Tower Training Grounds')!== -1
  ||encounter.CurrentZoneName.indexOf('Lichenweed')!== -1
  ||encounter.CurrentZoneName.indexOf('Astragalos')!== -1
  ||encounter.CurrentZoneName.indexOf('Wolves')!== -1
  ||encounter.CurrentZoneName.indexOf('The Borderland Ruins')!== -1
  ||encounter.CurrentZoneName.indexOf('Seal Rock')!== -1
  ||encounter.CurrentZoneName.indexOf('Fields Of Glory')!== -1
  ||encounter.CurrentZoneName.indexOf('Onsal Hakair')!== -1){
    if(encounter.CurrentZoneName.indexOf('The Borderland Ruins')!== -1
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
      for(var l = 0;l < team.length ;l++){
        if(killname.indexOf(team[l]) !== -1){
          KillSound.play();
        }
      }
    }
  }
}

function fl_alliance(GorgeData){
  for(var i = 0; i < GorgeData.length; i++){
    if(GorgeData[i][7] == 2){
      GorgeData[i][7] = 1;
    }
    else if(GorgeData[i][7] == 4){
      GorgeData[i][7] = 3;
    }
    else if(GorgeData[i][7] == 6){
      GorgeData[i][7] = 5;
    }
  }
  return GorgeData;
}

function margedata(c,maxrow,myname){
  var GorgeData =[];
  //console.log(maxrow.length);
  for(var i = 0; i < maxrow.length; i++){
    var combatant = c[maxrow[i]];
    var yourRobot = 0;

    if(combatant.name == ACTName){
      combatant.name = myname;
    }
    if(combatant.name.indexOf('ファルコン・チェイサ')!== -1){
        combatant.name = combatant.name.substring(13, combatant.name.length - 1);
        yourRobot = 1;
    }
    if(combatant.name.indexOf('ファルコン・オプレッサ')!== -1){
        combatant.name = combatant.name.substring(14, combatant.name.length - 1);
        yourRobot = 2;
    }
    if(combatant.name.indexOf('レイヴン・チェイサ')!== -1){
        combatant.name = combatant.name.substring(12, combatant.name.length - 1);
        yourRobot = 1;
    }
    if(combatant.name.indexOf('レイヴン・オプレッサ')!== -1){
        combatant.name = combatant.name.substring(13, combatant.name.length - 1);
        yourRobot = 2;
    }
    //console.log(combatant);
    if(GorgeData.length == 0 && yourRobot == 2){//オプレッサーの場合
      GorgeData[0] = [combatant.name,0,combatant.Job,Number(combatant.kills),Number(combatant.deaths),0,'',-1,Number(combatant.encdps)];
    }
    if(GorgeData.length == 0){
      GorgeData[0] = [combatant.name,Number(combatant.encdps),combatant.Job,Number(combatant.kills),Number(combatant.deaths),0,'',-1,0];
      //GorgeData[0] = ['Justice Suzuki',Number(combatant.encdps),combatant.Job,Number(combatant.kills),Number(combatant.deaths),0,'',];
      //console.log('初期設定');
    }
    else{
      for(var k = 0; k < GorgeData.length; k++){
        //console.log('k :'+ k + 'GorgeData.length :'+GorgeData.length);
        if(GorgeData[k][0].indexOf(combatant.name) !== -1 && yourRobot == 0){//ロボのデータでない場合
          var total =Number(GorgeData[k][1]) + Number(combatant.encdps);
          total = Math.round(total * 100) / 100;
          GorgeData[k] = [combatant.name,total,combatant.Job,GorgeData[k][3] + Number(combatant.kills),GorgeData[k][4] + Number(combatant.deaths),0,'',-1,GorgeData[k][8]];
          k = 100;
        }
        else{
          if(combatant.name.indexOf(GorgeData[k][0]) !== -1 && yourRobot == 1){//ロボのデータの場合
            var total =Number(GorgeData[k][1]) + Number(combatant.encdps);
            total = Math.round(total * 100) / 100;
            //console.log(Number(GorgeData[k][1]) +' + '+ Number(combatant.encdps)+' = '+total);
            GorgeData[k] = [combatant.name,total,GorgeData[k][2],GorgeData[k][3] + Number(combatant.kills),GorgeData[k][4] + Number(combatant.deaths),0,'',-1,GorgeData[k][8]];
            k = 100;
          }
          else{
            if(combatant.name.indexOf(GorgeData[k][0]) !== -1 && yourRobot == 2){//オプの場合
              //console.log(Number(GorgeData[k][1]) +' + '+ Number(combatant.encdps)+' = '+total);
              GorgeData[k] = [combatant.name,GorgeData[k][1],GorgeData[k][2],GorgeData[k][3] + Number(combatant.kills),GorgeData[k][4] + Number(combatant.deaths),0,'',-1,Number(combatant.encdps)];
              k = 100;
            }
          }
        }
        if(k == GorgeData.length -1){
          if(yourRobot == 2){//データが存在せず、到着データがオプのとき
            GorgeData[GorgeData.length] = [combatant.name,0,combatant.Job,Number(combatant.kills),Number(combatant.deaths),0,'',-1,Number(combatant.encdps)];
            k = GorgeData.length;
          }
          else{//データが存在せず、到着データがオプ以外のとき
            GorgeData[GorgeData.length] = [combatant.name,Number(combatant.encdps),combatant.Job,Number(combatant.kills),Number(combatant.deaths),0,'',-1,0];
            k = GorgeData.length;
          }
          //console.log('存在しないため、追加');

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
  //console.log('結合済みデータ');
  //console.log(GorgeData);
  //test用データ


  return GorgeData;
}
function DammyData(data){
  var GorgeData = [];
  GorgeData[0] = [data[0][0],data[0][1],data[0][2],data[0][3],data[0][4],data[0][5],'cheoppjasoppjasche',1,777.77];
  GorgeData[1] = ['Justice Suzuki',8752.66,'Rdm',77,4,6,'cheoppchejasjasjasjasjascheche',1,35.12];
  GorgeData[2] = ['Oppresor Tanaka',6812.76,'Sam',5,4,8,'oppoppche',5,3542.84];
  GorgeData[3] = ['Chaiser Satou',3812.7,'Blm',0,4,14,'jasjasjas',2,0];
  GorgeData[4] = ['Daniel Tepesh',2315.25,'Whm',1,0,3,'',1,0];
  GorgeData[5] = ['Michael Twining',4415.78,'Pld',5,5,2,'',6,0];
  GorgeData[6] = ['Samuel Takano',3156.25,'War',1,2,2,'',2,0];
  GorgeData[7] = ['Gabriel Tepes',3351.42,'Drk',3,1,6,'oppoppopp',3,251.54];
  GorgeData[8] = ['Nathaniel Tamwood',1201.12,'Sch',4,3,7,'cheoppcheche',4,6421.21];
  GorgeData[9] = ['Maxsizeno Namenoohito',5261.21,'Sam',6,2,13,'',3,0];
  GorgeData[10] = ['Raphael Tachibana',750.68,'Brd',7,1,4,'',1,0];
  GorgeData[11] = ['Carl Tanner',952.12,'Nin',3,2,5,'',4,0];
  GorgeData[12] = ['Ansel Tod',1514.68,'Gnb',20,3,9,'',5,0];
  GorgeData[13] = ['Angel Twist',6742.36,'Nin',10,6,10,'',2,0];
  GorgeData[14] = ['Carmel Tae-yeon',3452.12,'Nin',4,9,2,'',2,0];
  GorgeData[15] = ['Karl Touya',6984.45,'Mch',1,6,1,'',3,0];
  GorgeData[16] = ['Mendel Thornton',3541.51,'Sam',6,7,0,'',6,0];
  GorgeData[17] = ['Saul Todman',3154.12,'Mch',8,4,3,'',5,0];
  GorgeData[18] = ['Paul Talos',3514.98,'Brd',5,4,2,'',6,0];
  GorgeData[19] = ['Maxwell Tudor',2235.14,'Drg',6,3,6,'',4,0];
  GorgeData[20] = ['Abdul Trenton',2645.84,'Drg',7,7,1,'',3,0];
  GorgeData[21] = ['Joel Toussaint',2874.26,'Drg',0,4,2,'cheoppcheoppoppoppopp',6,1741.36];
  GorgeData[22] = ['Niall Talbot',547.45,'Drg',3,2,1,'',5,0];
  GorgeData[23] = ['Nicolas Gutchi',4215.23,'Drg',12,9,1,'',4,0];

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
