function dammy_name_array(){
  let dammy_array = [];
  dammy_array[0] = [ACT_NAME,5641.21,'blm',5,5,5,'cheoppjasoppjasche',1,777.77,7];
  dammy_array[1] = ['Justice Suzuki',8752.66,'Rdm',77,4,6,'cheoppchejasjasjasjasjascheche',1,35.12,5];
  dammy_array[2] = ['Oppresor Tanaka',6812.76,'Sam',5,4,8,'oppoppche',5,3542.84,3];
  dammy_array[3] = ['Chaiser Satou',3812.7,'Blm',0,4,14,'jasjasjas',2,0,3];
  dammy_array[4] = ['Daniel Tepesh',2315.25,'Whm',1,0,3,'',1,0,2];
  dammy_array[5] = ['Michael Twining',4415.78,'Pld',5,5,2,'',6,0,4];
  dammy_array[6] = ['Samuel Takano',3156.25,'War',1,2,2,'',2,0,3];
  dammy_array[7] = ['Gabriel Tepes',3351.42,'Drk',3,1,6,'oppoppopp',3,251.54,3];
  dammy_array[8] = ['Nathaniel Tamwood',1201.12,'Sch',4,3,7,'cheoppcheche',4,6421.21,3];
  dammy_array[9] = ['Maxsizeno Namenoohito',5261.21,'Sam',6,2,13,'',3,0,3];
  dammy_array[10] = ['Raphael Tachibana',750.68,'Brd',7,1,4,'',1,0,3];
  dammy_array[11] = ['Carl Tanner',952.12,'Nin',3,2,5,'',4,0,3];
  dammy_array[12] = ['Ansel Tod',1514.68,'Gnb',20,3,9,'',5,0,2];
  dammy_array[13] = ['Angel Twist',6742.36,'Nin',10,6,10,'',2,0,2];
  dammy_array[14] = ['Carmel Tae-yeon',3452.12,'Nin',4,9,2,'',2,0,2];
  dammy_array[15] = ['Karl Touya',6984.45,'Mch',1,6,1,'',3,0,2];
  dammy_array[16] = ['Mendel Thornton',3541.51,'Sam',6,7,0,'',6,0,2];
  dammy_array[17] = ['Saul Todman',3154.12,'Mch',8,4,3,'',5,0,1];
  dammy_array[18] = ['Paul Talos',3514.98,'Brd',5,4,2,'',6,0,1];
  dammy_array[19] = ['Maxwell Tudor',2235.14,'Drg',6,3,6,'',4,0,1];
  dammy_array[20] = ['Abdul Trenton',2645.84,'Drg',7,7,1,'',3,0,1];
  dammy_array[21] = ['Joel Toussaint',2874.26,'Drg',0,4,2,'cheoppcheoppoppoppopp',6,1741.36,1];
  dammy_array[22] = ['Niall Talbot',547.45,'Drg',3,2,1,'jas',5,0,1];
  dammy_array[23] = ['Nicolas Gutchi',4215.23,'Drg',12,9,1,'',4,0,1];
  return dammy_array;
}
function dammy(){
  PVP_DURATION = 900;
  let dammy_array = dammy_name_array();
  LIMITED_DATA = [];
  for(let i = 0 ; i < 24 ; i++){
    let temp = main_data_format('sample');
    temp.name = dammy_array[i][0];
    temp.combatantjob = dammy_array[i][2].toLowerCase();
    temp.kills = Math.floor( Math.random() * 4.5 * dammy_array[i][9]);
    temp.death = Math.max(Math.floor( Math.random() * 3.3 * (5-dammy_array[i][9])),0);
    temp.robhistory = dammy_array[i][6];
    temp.aliance = dammy_array[i][7];
    ////////////////////////////////////////////////
    temp.actualtowerdamage = Math.floor( Math.random() * 100000 * dammy_array[i][9]);
    temp.actualobjectdamage = Math.floor( Math.random() * 80000 * dammy_array[i][9]);
    temp.actualpersondamage= Math.floor( Math.random() * 250000 * dammy_array[i][9]);
    temp.actualToRobotdamage = Math.floor( Math.random() * 120000 * dammy_array[i][9]);
    //////////
    temp.currentjob = Math.floor( Math.random() * 19 + 19,16).toString(16);
    /////////
    let healer_offset = 1;
    if(temp.currentjob === '18'||temp.currentjob === '1c'||temp.currentjob === '21'){
      healer_offset = 5;
    }
    temp.actualheal = Math.floor( Math.random() * 200000 * healer_offset);
    temp.actualoverheal = Math.floor( Math.random() * 100000 * healer_offset);
    temp.actualselfheal = Math.floor( Math.random() * 20000 * healer_offset);
    temp.actualobjectheal = Math.floor( Math.random() * 20000 * healer_offset);
    if(temp.robhistory.indexOf('jas') !== -1){
      temp.rocketpuntchhit = Math.floor( Math.random() * 30 * dammy_array[i][9]);
      temp.rocketpuntchmiss = Math.floor( Math.random() * 20 * dammy_array[i][9]);
    }
    if(temp.aliance === 1){
      temp.battle = true;
      temp.totalbattletime = PVP_DURATION;
    }
    else{
      if(Math.random().toFixed(0) === '0'){
        temp.battle = false;
      }
      else{
        temp.battle = true;
      }
      temp.totalbattletime = 900 - (Math.floor( Math.random() * (PVP_DURATION / ((dammy_array[i][9] + 1)) - (100 * dammy_array[i][9]))) + (100 * dammy_array[i][9]));
    }
    LIMITED_DATA.push(temp);
  }
  total_damage_calc();
}
function total_damage_calc(){
  for(let i = 0 ; i < LIMITED_DATA.length ; i++){
    LIMITED_DATA[i].totaloutdamage = LIMITED_DATA[i].actualToRobotdamage + LIMITED_DATA[i].actualpersondamage + LIMITED_DATA[i].actualobjectdamage;
    LIMITED_DATA[i].combatantdps = damage_to_dps(LIMITED_DATA[i].totaloutdamage,LIMITED_DATA[i].totalbattletime);
    LIMITED_DATA[i].totaloutdps = LIMITED_DATA[i].combatantdps;
  }
}
function job_to_role(job){
  let tank = ['pld','gla','war','mrd','drk','gnb'];
  let healer = ['whm','sch','ast','cnj'];
  let melee = ['mnk','drg','nin','sam','pgl','lnc','rog'];
  let physical = ['brd','mch','dnc','arc'];
  let magical = ['blm','smn','rdm','thm','acn'];
  if(tank.indexOf(job) !== -1){
    return 'tank';
  }
  else if (healer.indexOf(job) !== -1) {
    return 'healer';
  }
  else if (melee.indexOf(job) !== -1) {
    return 'melee';
  }
  else if (physical.indexOf(job) !== -1) {
    return 'physical';
  }
  else if (magical.indexOf(job) !== -1) {
    return 'magical';
  }
  else {
    return 'general';
  }
}
