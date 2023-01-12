//var DB = new Dexie('MAIN_DB');
//var DB_BACKUP = new Dexie('Battled');
//var DB_WORKSPACE = new Dexie('Workspace');
var OWNER_LIST = [];
var FORCE_LOG_OFF = false;
var DEBUG_LOG = false;
let DoT_Simulate_Debug_massage = false;
let WolvesReset = false;

/*
inputdata format
let data = [
  key name     data  replace
[totaldamage,150000,false],
[torobotdamage,45000,false],
];
*/
function encounter_already_start_check() {
  if (AREA.Area_Type > 0) {//PvP Area
    if (!LOGLINE_ENCOUNTER.Engage) {
      if (!LOGLINE_ENCOUNTER.Result_Page) {
        LOGLINE_ENCOUNTER.Engage = true;
        console.log('Force Log Calc Start');
      }
    }
  }
}
function overlay_update_start(e) {
  if (e.isActive === 'false' && e.Encounter.CurrentZoneName === "Wolves' Den Pier") {
    if (AREA.Area_Type === 4 && WolvesReset) {//簡易リセット
      WolvesReset = false;
      part_reset_TBD();
    }
  }
  if (e.isActive === 'true' && Object.keys(e.Combatant).length > 0) {
    encounter_already_start_check();
    if (e.Encounter.CurrentZoneName.toLowerCase() === 'hidden gorge') {
      gorge_start(e);
    }
    else if (
      e.Encounter.CurrentZoneName.toLowerCase() === 'the borderland ruins (secure)' ||
      e.Encounter.CurrentZoneName.toLowerCase() === 'seal rock (seize)' ||
      e.Encounter.CurrentZoneName.toLowerCase() === 'the fields of glory (shatter)' ||
      e.Encounter.CurrentZoneName.toLowerCase() === 'onsal hakair (danshig naadam)'
    ) {
      fl_start(e);
    }
    else if (/*e.Encounter.CurrentZoneName === 'Middle La Noscea'||*/
      e.Encounter.CurrentZoneName === "Wolves' Den Pier"/*||
    e.Encounter.CurrentZoneName === 'The Goblet'*/) {
      WolvesReset = true;
      wolves_start(e);
    }
    else if (e.Encounter.CurrentZoneName.toLowerCase() === 'the palaistra' ||
      e.Encounter.CurrentZoneName.toLowerCase() === 'the volcanic heart' ||
      e.Encounter.CurrentZoneName.toLowerCase() === 'cloud nine'||
      e.Encounter.CurrentZoneName.toLowerCase() === 'the clockwork castletown'){
      cc_start();
    }
    else {
      timer_encounter(e);
      pve_start(e);
    }
  }
}
function party_data_exchange(party) {
  if (LOGLINE_ENCOUNTER.Aliance_Data_24) {
    //no change
  }
  else if (party.length === 24) {//full member
    LOGLINE_ENCOUNTER.Aliance_Data_24 = true;
    let aliance = 1;
    let party_length = 8;
    if (AREA.Area_Type === 2) {//Gorge
      party_length = 4;
    }
    for (let i = 0; i < party.length; i++) {
      if (party.inParty) {
        log_queue_unshift(['102', null, party[i].id, party[i].name, 1, jobID_to_string(party[i].job)]);
      }
      else if (i > 3) {
        if (i % party_length == 0) {
          aliance++;
        }
        log_queue_unshift(['102', null, party[i].id, party[i].name, aliance, jobID_to_string(party[i].job)]);
      }
    }
  }
  else {
    for (let i = 0; i < party.length; i++) {
      if (party[i].inParty) {
        log_queue_unshift(['102', null, party[i].id, party[i].name, 1, jobID_to_string(party[i].job)]);
      }
      else {
        log_queue_unshift(['102', null, party[i].id, party[i].name, 10, jobID_to_string(party[i].job)]);
      }
    }
  }
}
function timer_encounter(e) {
  let time = e.Encounter.duration;
  let min = time.substring(0, time.indexOf(':'));
  let sec = time.substring(time.indexOf(':') + 1,);
  losstime_timer_color(false);
  header_timer_update(min, sec);
}
function header_timer_update(min, sec) {
  $('#header_space').find('.time-min').text(min);
  $('#header_space').find('.time-sec').text(sec);
}
function primary_player(player) {
  PRIMARY_PLAYER.nameID = player.charID.toString(16).toUpperCase();
  PRIMARY_PLAYER.name = player.charName;
  log_queue_insert(['101', null, PRIMARY_PLAYER.nameID, PRIMARY_PLAYER.name]);
}
let BC_Channel_Active = false;
async function broadcast_Check(){
  if (AREA.Area_Type === 0) {
    if(AREA.Last_Area_type !== -1&&BC_Channel_Active){
      sendBC("general",{source:"GorgeOverlay",message:"Disconnect"});
      connectBC(false);
      BC_Channel_Active = false;
    }else if(AREA.Last_Area_type === -1){
      await connectBC(true);
      sendBC("general",{source:"GorgeOverlay",message:"Disconnect"});
      connectBC(false);
      BC_Channel_Active = false;
    }
  }else{
    BC_Channel_Active = true;
    connectBC(true);
    sendBC("general",{source:"GorgeOverlay",message:"Connect"});
  }  
}
let PRIMARY_PLAYER = { ACT_NAME: 'YOU', nameID: null, name: null };
let AREA = { Area_Type: -1, Last_Area_type: null };
async function area_check(zone) {
  $('#header_space').find('.header-areaname').text(zone.zoneName.toUpperCase());
  let zoneID = zone.zoneID;
  AREA.Last_Area_type = AREA.Area_Type;
  /*if(Dev_mode){
    console.log(zone);
  }*/
  await area_type_set(zoneID);
  broadcast_Check();
  ///
  //エリア移動によるイベント
  //console.warn('エリア移動 Last: '+ AREA.Last_Area_type + ' Now: ' + AREA.Area_Type);
  if (AREA.Last_Area_type === -1) {//初回
    //console.log('初回');
  }
  else if (AREA.Last_Area_type === -1 && AREA.Area_Type === 0) {//初回起動後からPvEエリアへの移動
    //console.log('初回起動後からPvEエリアへの移動');
    if (Logline_add_mode) {
      console.log(JSON.stringify(Logline_Add_Tool_Temp));
      Logline_Add_Tool_Temp = [];
    }
  }
  else if (AREA.Last_Area_type === -1 && AREA.Area_Type > 0) {//初回起動後からPvPエリアへの移動
    //console.log('初回起動後からPvPエリアへの移動');
    battle_data_reset();
  }
  else if (AREA.Last_Area_type === 0 && AREA.Area_Type === 0) {//PvEエリア内の移動
    //console.log('PvEエリア内の移動');
  }
  else if (AREA.Last_Area_type > 0 && AREA.Area_Type === 0) {//PvPエリアからPvEエリアへの移動
    //console.log('PvPエリアからPvEエリアへの移動');
    if (Logline_add_mode) {
      console.log(JSON.stringify(Logline_Add_Tool_Temp));
      Logline_Add_Tool_Temp = [];
    }
  }
  else if (AREA.Last_Area_type === 0 && AREA.Area_Type > 0) {//PvEエリアからPvPエリアへの移動
    // console.log('PvEエリアからPvPエリアへの移動');
    battle_data_reset();
  }
  else if (AREA.Last_Area_type === AREA.Area_Type) {//PvPエリア内の移動。恐らく回線落ち
    //console.log('PvPエリア内の移動。恐らく回線落ち等。');
  }
  else if (AREA.Last_Area_type !== AREA.Area_Type) {//PvPエリア内の移動。ウルヴズとか？
    //console.log('PvPエリア内の移動。異なるPvPモード');
    battle_data_reset();
  }
  else {
    //console.error('エリア移動の例外：' + AREA.Area_Type + '<-' + AREA.Last_Area_type);
  }
}
async function area_type_set(zoneID) {
  switch (zoneID) {
    case 791://Hidden Gorge
      AREA.Area_Type = 2;
      LOGLINE_ENCOUNTER.Battle_Max_Time = Gorge_BattleTime;
      break;
    case 376://The Border land Ruins Secure
      AREA.Area_Type = 3;
      LOGLINE_ENCOUNTER.Battle_Max_Time = Fl_BattleTime;
      break;
    case 431://Seal Rock Seize
      AREA.Area_Type = 1;
      LOGLINE_ENCOUNTER.Battle_Max_Time = Fl_BattleTime;
      break;
    case 554://The Fields Of Glory Shatter
      AREA.Area_Type = 3;
      LOGLINE_ENCOUNTER.Battle_Max_Time = Fl_BattleTime;
      break;
    case 888://Onsal Hakair Danshig Naadam
      AREA.Area_Type = 1;
      LOGLINE_ENCOUNTER.Battle_Max_Time = Fl_BattleTime;
      break;

    case 1032://Crystal Conflict The Palaistra
      AREA.Area_Type = 5;
      LOGLINE_ENCOUNTER.Battle_Max_Time = CC_BattleTime;
      break;
    case 1033://Crystal Conflict The Volcanic Heart
      AREA.Area_Type = 5;
      LOGLINE_ENCOUNTER.Battle_Max_Time = CC_BattleTime;
      break;
    case 1034://Crystal Conflict Cloud Nine
      AREA.Area_Type = 5;
      LOGLINE_ENCOUNTER.Battle_Max_Time = CC_BattleTime;
      break;
    case 1116://Crystal Conflict  the Clockwork Castletown_1
      AREA.Area_Type = 5;
      LOGLINE_ENCOUNTER.Battle_Max_Time = CC_BattleTime;
      break;
    case 1117://Crystal Conflict  the Clockwork Castletown_2
      AREA.Area_Type = 5;
      LOGLINE_ENCOUNTER.Battle_Max_Time = CC_BattleTime;
      break;

    case 250://Wolves Den Pier
      AREA.Area_Type = 4;
      LOGLINE_ENCOUNTER.Battle_Max_Time = Test_BattleTime;
      WolvesReset = false;
      break;
    /*case 341://The Goblet
      AREA.Area_Type = 10;
      LOGLINE_ENCOUNTER.Battle_Max_Time = Test_BattleTime;
      break;*/
    default:
      AREA.Area_Type = 0;
      LOGLINE_ENCOUNTER.Battle_Max_Time = 0;
  }
}
function losstime_timer_color(type) {
  if (type) {
    $('#header_space').find('.header-time').addClass('losstime');
  } else {
    $('#header_space').find('.header-time').removeClass('losstime');
  }
}
async function sample_gorge_data_calc(type) {
  let data;
  if (type === 1) {
    data = await sample_gorge();
  } else if (type === 3) {
    data = await gorge3_sample();
  }else if (type === 4){
    data = await newgorge_sample();
  }
  AREA.Area_Type = 2;
  for (let i = 0; i < data.length; i++) {
    log_queue_insert(data[i]);
  }
  console.error('LOG_END');
}
function battle_time_set() {
  for (let i = 0; i < TBD.Player_data.length; i++) {
    TBD.Player_data[i].battle_time = 600;
  }
}
async function sample_crystal_data_calc(type) {
  let data = "";
  if (type === 1) {
    data = await crystal_sample();
  } else if (type === 2) {
    data = await crystal2_sample();
  }

  AREA.Area_Type = 5;
  for (let i = 0; i < data.length; i++) {
    //logline_firststep(data[i]);
    log_queue_insert(data[i]);
  }
  console.error('LOG_END');
}
async function sample_onsal_data_calc() {
  let data = await onsal_sample();
  AREA.Area_Type = 1;
  for (let i = 0; i < data.length; i++) {
    //logline_firststep(data[i]);
    log_queue_insert(data[i]);
  }
  console.error('LOG_END');
}
let data_array = [];
function import_log_division(log) {
  for (let i = 0; i < log.length; i++) {
    let data = log[i].split('|');
    data_array.push(data);
  }
  //console.log(JSON.stringify(data_array));
}
function damage_to_dps(damage, time) {
  if (typeof damage !== 'number') {
    damage = 0;
  }
  if (time <= 0) {
    return 0;
  } else {
    return damage / time;
  }
}
