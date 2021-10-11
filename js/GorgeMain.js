
var MAIN_DATA = [];
var LIMITED_DATA = [];
var ABILITY_TEMP = [];
var ACTION_ROBOT_ID = [];
var PROMISE_ARRAY = [];
var LOG_ARRAY = [];
var LOG_PROCESS = true;
var TEST_MODE = false;
var ALIANCE_DATA = false;
var MYCHARACTOR_ID = '';
var MYCHARACTOR_NAME = '';
var NOW_AREA = 0;
//DATA//////////////////////////////////
const Oppresor_HP = 100000;
const Justice_HP = 75000;
const Chaiser_HP = 50000;
////////////////////////////////////////
$(function() {
"use strict";
  addOverlayListener('ChangeZone', (zone) => area_check(zone));
  addOverlayListener("LogLine", (log) => logline_start(log.line));
  if(TEST_MODE){
    addOverlayListener("ImportedLogLines", (log) => import_log_division(log.logLines));
  }
  addOverlayListener("ChangePrimaryPlayer",(MyName) =>{
    MYCHARACTOR_ID = MyName.charID.toString(16);
    MYCHARACTOR_NAME = MyName.charName;
    let party_data = ['300',MYCHARACTOR_ID,MYCHARACTOR_NAME,1];
    if(TEST_MODE){
      console.log(MyName);
    }
    logline_start(party_data);
  });
  addOverlayListener('PartyChanged', (p) => party(p.party));
  addOverlayListener("CombatData", (e) => overlay_update_start(e));
  startOverlayEvents();
  setInterval(calc,1000);
  //sample_data();
  //let array_data = ['Takoyaki',3,1];
  //let array_object = ['name','kills','death'];
  //main_data_push_update('nameID','101020AF',array_object,array_data);
  dammy();
  gorge_overlay_update_process();
});
function area_check(area){
  if(TEST_MODE){
    console.log(area);
  }
  if(area.zoneName === 'Hidden Gorge'){
    NOW_AREA = 1;//Hiddengorge
    LOG_PROCESS = false;
  }
  else if (area.zoneID == 376
  ||area.zoneName.indexOf('Seal Rock')!== -1
  ||area.zoneID == 554
  ||area.zoneName.indexOf('Onsal Hakair')!== -1) {
    NOW_AREA = 2;//FL
    LOG_PROCESS = false;
  }
  else if (area.zoneName.indexOf('Middle La Noscea')!== -1){
    NOW_AREA = 3;//Test Area_FL
    LOG_PROCESS = false;
  }
  else {
    NOW_AREA = 0;
  }
}
function overlay_update_start(e){
  if(NOW_AREA === 255||true){//Gorge no ID ga nazo
    gorge_overlay_update(e);
  }
}
function gorge_overlay_update(e){
  var encounter = e.Encounter;
  var combatants = e.Combatant;
  limited_data_combatant_marge(combatants,encounter.DURATION);

  gorge_overlay_update_process();
}
function gorge_overlay_update_process(){
    LIMITED_DATA.sort(function (a,b) {
      return b.combatantdps - a.combatantdps ;
    });
    var template = $('#gorge-source li');
    var container = $('#overlay').clone();
    container.html('');
    let maxrow = LIMITED_DATA.length;
    if(maxrow > MAX_ROW){
      maxrow = MAX_ROW;
    }
    for(let i = 0 ; i < maxrow ; i++){
      if (LIMITED_DATA[i].combatantjob !== null){
        var row = template.clone();
        row.find('.g-total-dps-number').text(damage_to_dps(LIMITED_DATA[i].combatantdamage,LIMITED_DATA[i].combatantDuration));
        row.find('.g-total-hps-number').text(damage_to_dps(LIMITED_DATA[i].combatantheal,LIMITED_DATA[i].combatantDuration));
        row.find('.g-job-icon').addClass('icon-' + LIMITED_DATA[i].combatantjob);
        row.find('.g-name').text(LIMITED_DATA[i].name);
        row.find('.g-kill-number').text(LIMITED_DATA[i].kills);
        row.find('.g-death-number').text(LIMITED_DATA[i].death);
        row.find('.g-player-number').text(damage_to_dps(LIMITED_DATA[i].actualpersondamage,LIMITED_DATA[i].combatantDuration));
        row.find('.g-torobot-number').text(damage_to_dps(LIMITED_DATA[i].actualToRobotdamage,LIMITED_DATA[i].combatantDuration));
        row.find('.g-object-number').text(damage_to_dps(LIMITED_DATA[i].actualobjectdamage,LIMITED_DATA[i].combatantDuration));
        function robot_history_fonts(robhistory){
          let data = '';
          if(robhistory === null){
            return '';
          }
          else {
            let num = robhistory.length / 3;
            for(let i = 0 ; i < num ; i++){
              if('jas' === robhistory.substr(0,3)){
                data = data + String.fromCodePoint(0xe90d);
                robhistory = robhistory.substr(3,robhistory.length);
              }
              else if ('che' === robhistory.substr(0,3)) {
                data = data + String.fromCodePoint(0xe908);
                robhistory = robhistory.substr(3,robhistory.length);
              }
              else if ('opp' === robhistory.substr(0,3)) {
                data = data + String.fromCodePoint(0xe914);
                robhistory = robhistory.substr(3,robhistory.length);
              }
            }
            return data;
          }
        }
        if(LIMITED_DATA[i].robhistory !== null){
          row.find('.icon-robots').text(robot_history_fonts(LIMITED_DATA[i].robhistory));
          row.find('.g-damage-block').css('display','none');
        }
        else{
          let reject_damage = LIMITED_DATA[i].realobjectdamage + LIMITED_DATA[i].realpersondamage + LIMITED_DATA[i].realToRobotdamage;
          reject_damage = LIMITED_DATA[i].totaloutdamage - reject_damage;
          row.find('.g-block-number').text(damage_to_dps(reject_damage,LIMITED_DATA[i].combatantDuration));
        }
        container.append(row);
      }
    }
    $('#overlay').replaceWith(container);
}
function damage_to_dps(damage,time){
  damage = Number(damage);
  time = Number(time);
  let dps = 0;
  if(time === 0) {
    time = 1;
  }
  else {
    dps = damage / time ;
  }
  dps = dps_round(dps);
  return dps;
}
function dps_round(dps){
  if (dps.toFixed(0).length <= 3) {
    dps = dps.toFixed(2);
  }
  else if (dps.toFixed(0).length === 4){
    dps = dps.toFixed(1);
  }
  else if (dps.toFixed(0).length >= 5) {
    dps = dps.toFixed(0);
  }
  return dps;
}
function limited_data_combatant_marge(e,time){
  //combatantDuration: 0,
  //combatantdamage: 0,
  //combatantjob: null,
  time = Number(time);
  let position = LIMITED_DATA.findIndex(({name}) => name == MYCHARACTOR_NAME);
  if(position !== -1){
    LIMITED_DATA[position].name = ACT_NAME;
  }
  if(TEST_MODE){
    console.debug(LIMITED_DATA);
  }
  let combatants_names = Object.keys(e);
  for(let i = 0 ; i < LIMITED_DATA.length ; i++){
    if(LIMITED_DATA[i].aliance === 0){
      if(TEST_MODE){
        console.warn('Error :'  + LIMITED_DATA[i].aliance + 'has LIMITED_DATA');
        console.warn(LIMITED_DATA[i]);
      }
    }
    else{

      for(let p = 0 ; p < combatants_names.length ; p++){
        let combatants_name = combatants_names[p];
        if(e[combatants_name].name === LIMITED_DATA[i].name){
          LIMITED_DATA[i].combatantjob = e[combatants_name].Job.toLowerCase();
          LIMITED_DATA[i].combatantdamage = e[combatants_name].damage;
          LIMITED_DATA[i].combatantDuration = time;
          LIMITED_DATA[i].combatantheal = e[combatants_name].healed;
          LIMITED_DATA[i].totaloutdamage = LIMITED_DATA[i].actualToRobotdamage + LIMITED_DATA[i].actualpersondamage + LIMITED_DATA[i].actualobjectdamage;
          LIMITED_DATA[i].combatantdps = damage_to_dps(LIMITED_DATA[i].totaloutdamage,time);
          break;
        }
      }
    }
  }
}

function party(p){
  if(TEST_MODE){
    console.log(p);
  }
  //party_data= ['300','nameID','name','aliance'];
  if(p.length === 24){
    ALIANCE_DATA = true;
    let aliance = 1;
    for(let i = 0 ; i < p.length ; p++){
      if(i > 3){
        if(i % 4 == 0){
          aliance++;
        }
      }
      let party_data = ['300',p[i].id,p[i].name,aliance];
      logline_start(party_data);
    }
  }
  else if (p.length > 4 && ALIANCE_DATA === false) {
    for(let i = 0 ; i < p.length ; i++){
      let party_data = [];
      if(p[i].inParty === true){//Party member
        party_data = ['300',p[i].id,p[i].name,1];
      }
      else {//other aliance member
        party_data = ['300',p[i].id,p[i].name,10];
      }
      logline_start(party_data);
    }
  }
}
function import_log_division(log){
  console.log(log);
  for(let i = 0 ;i < log.length;i++){
    let data = log[i].split('|');
    console.log(data);
    logline_start(data);
  }
}
function dammy(){
  LIMITED_DATA = [{
    nameID: 'SAMPLE',
    name: 'Justice Suzuki',
    ownerID: null,
    battle:null,
    currentHP: 0,
    maxHP: 0,
    currentEP: 10000,
    currentjob: 20,
    aliance: 1,
    robhistory: null,
    totaloutdamage: 0,
    realobjectdamage: 5211,
    realpersondamage: 78103,
    realToRobotdamage: 4521,
    realRobotdamage: 0,
    actualobjectdamage: 78441,
    actualpersondamage: 984212,
    actualToRobotdamage: 134583,
    actualRobotdamage: 0,
    kills: 15,
    death: 2,
    totalheal: 0,
    selfheal: 0,
    totalincomedamage: 0,
    combatantDuration: 500,
    combatantdps:2394.5,
    combatantdamage: 1197236,
    combatantheal:4511,
    combatantjob: 'rdm',
  },{
    nameID: 'SAMPLE',
    name: 'Oppresor Tanaka',
    ownerID: null,
    battle:null,
    currentHP: 0,
    maxHP: 0,
    currentEP: 10000,
    currentjob: 20,
    aliance: 1,
    robhistory: 'oppoppoppoppoppoppoppoppoppopp',
    totaloutdamage: 0,
    realobjectdamage: 5211,
    realpersondamage: 78103,
    realToRobotdamage: 4521,
    realRobotdamage: 0,
    actualobjectdamage: 7841,
    actualpersondamage: 98412,
    actualToRobotdamage: 4583,
    actualRobotdamage: 0,
    kills: 5,
    death: 2,
    totalheal: 0,
    selfheal: 0,
    totalincomedamage: 0,
    combatantDuration: 45,
    combatantdps:3507.6,
    combatantdamage: 157841,
    combatantheal:4511,
    combatantjob: 'pld',
  },{
    nameID: 'SAMPLE',
    name: 'Chaiser Satou',
    ownerID: null,
    battle:null,
    currentHP: 0,
    maxHP: 0,
    currentEP: 10000,
    currentjob: 20,
    aliance: 1,
    robhistory: 'cheoppchejasjasjasjasjascheche',
    totaloutdamage: 0,
    realobjectdamage: 5211,
    realpersondamage: 78103,
    realToRobotdamage: 4521,
    realRobotdamage: 0,
    actualobjectdamage: 7841,
    actualpersondamage: 98412,
    actualToRobotdamage: 4583,
    actualRobotdamage: 0,
    kills: 9,
    death: 10,
    totalheal: 0,
    selfheal: 0,
    totalincomedamage: 0,
    combatantDuration: 45,
    combatantdps:5729.8,
    combatantdamage: 257841,
    combatantheal:4511,
    combatantjob: 'blm',
  },{
    nameID: 'SAMPLE',
    name: 'Daniel Tepesh',
    ownerID: null,
    battle:null,
    currentHP: 0,
    maxHP: 0,
    currentEP: 10000,
    currentjob: 20,
    aliance: 1,
    robhistory: 'checheopp',
    totaloutdamage: 0,
    realobjectdamage: 15141,
    realpersondamage: 178103,
    realToRobotdamage: 12521,
    realRobotdamage: 0,
    actualobjectdamage: 7841,
    actualpersondamage: 98412,
    actualToRobotdamage: 4583,
    actualRobotdamage: 0,
    kills: 9,
    death: 10,
    totalheal: 0,
    selfheal: 0,
    totalincomedamage: 0,
    combatantDuration: 45,
    combatantdps:4840.9,
    combatantdamage: 217841,
    combatantheal:154101,
    combatantjob: 'ast',
  }];
}
