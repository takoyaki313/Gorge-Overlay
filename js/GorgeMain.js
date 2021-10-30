
var MAIN_DATA = [];
var LIMITED_DATA = [];
var ABILITY_TEMP = [];
var KILL_DATA = [];
var SKILL_KILL_DATA = [];
var PROMISE_ARRAY = [];
var LOG_ARRAY = [];
var LOG_PROCESS = true;
var TEST_MODE = false;
var FORCE_LOG_LISTEN = false;
var ALIANCE_DATA = false;
var MYCHARACTOR_ID = '';
var MYCHARACTOR_NAME = '';
var NOW_AREA = 0;
var SET_BATTLE_TIME = 0;
var ENCOUNTER_START = false;
var ENCOUNTER_START_TIME = 0;
var PVP_DURATION = 0;
var TENSYON_MAX = false;
var KILLSOUND_PLAY = new Audio('');
//Setting///////////////////////////////
var ACT_NAME = 'YOU';
var MAX_ROW = 30;
var PVE_MAX_ROW = 10;
var FL_MAX_ROW = 24;
var FONT_SIZE = 16;
var DEATH_TOO_MUCH = 8;
var KILLSOUND_VOLUME = 100;
////////////////////////////////////////
var DECIMAL_POINT_DISPLAY = true;
var KILLSOUND = false;
var KILLSOUND_PATH = 'https://takoyaki313.github.io/Gorge-Overlay/sound/soundeffect-lab-金額表示.mp3';
var PARTY_PRIORITY = true;
var AROUND_MEMBER_ONLY = false;
var SPENT_NEARBY_TIME = false;
var IGNORE_MAX_AFTER_BATTLE = false;
var ENCOUNTER_TIME = false;//true is battletime = encounter time
var JUSTICE_PUNTCH = true;
var FAST_KILLSOUND = false;
var VERSION = 'Gorge-overlay2 xxx'
////////////////////////////////////////
//DATA//////////////////////////////////
const Oppresor_HP = 100000;
const Justice_HP = 75000;
const Chaiser_HP = 50000;
////////////////////////////////////////
$(function() {
"use strict";
  version_check();

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
});
function area_check(area){
  header_update_zone(area.zoneName);
  if(TEST_MODE){
    console.log(area);
  }
  if(area.zoneName === 'Hidden Gorge'){
    NOW_AREA = 1;//Hiddengorge
    SET_BATTLE_TIME = 900;//15min
    LOG_PROCESS = false;
    KILL_DATA = [];
    SKILL_KILL_DATA = [];
    header_update_timer();
  }
  else if (area.zoneID == 376
  ||area.zoneName.indexOf('Seal Rock')!== -1
  ||area.zoneID == 554
  ||area.zoneName.indexOf('Onsal Hakair')!== -1) {
    NOW_AREA = 2;//FL
    SET_BATTLE_TIME = 1200;//20min
    LOG_PROCESS = false;
    KILL_DATA = [];
    SKILL_KILL_DATA = [];
    header_update_timer();
  }/*
  else if (TEST_MODE && area.zoneName.indexOf('Middle La Noscea')!== -1||area.zoneName.indexOf("Wolves' Den Pier")!== -1||area.zoneName.indexOf('The Goblet')!== -1){
    NOW_AREA = 3;//Test Area_FL
    SET_BATTLE_TIME = 300;//test
    LOG_PROCESS = false;
    KILL_DATA = [];
    SKILL_KILL_DATA = [];
    header_update_timer();
  }*/
  else {
    NOW_AREA = 0;
    TENSYON_MAX = false;
    ENCOUNTER_START = false;
    SET_BATTLE_TIME = 0;
    ALIANCE_DATA = false;
  }
  if(HEADER_TEMP === 0){//First start up
    header_disp(true);
    HEADER_TEMP = 1;
  }
  else{//second or later
    if(PVE_HEADER){//Disp anytime
      header_disp(true);
    }
    else if (NOW_AREA > 0 && !PVE_HEADER) {//PvPArea
      header_disp(true);
      HEADER_TEMP = 0;
    }
    else{
      header_disp(false);
    }
  }
}
function header_disp(disp){
  if(disp){
    $("#header_space").css('display','flex');
  }
  else{
    $("#header_space").css('display','none');
  }
}
function header_update_zone(area_name){
  $('.areaname').text(area_name);
}
function header_update_timer(){
  let timer = time_change(SET_BATTLE_TIME,Battle_Current_Time);

  if(timer[0] >= 0||timer[1] >= 0){
    $('.time-min').text(timer[0]);
    $('.time-sec').text(timer[1]);
  }
  else {
    if(TEST_MODE){
      console.warn('Error :Timer is minus ->' + timer[0] + ':' +timer[1]);
    }
    $('.time-min').text(0);
    $('.time-sec').text(0);
  }
}
function header_update_battle_data(e){
  var header = $('#header-data');
  let total_death = 0;
  let total_kill = 0;
  let min_death = 0;
  let min_kill = 0;
  let now = Date.now();
  for(let i = 0 ; i < KILL_DATA.length ; i++){
    if(KILL_DATA[i].attackeraliance !== 0){
      total_kill++;
      if(now - KILL_DATA[i].time < 60000){
        min_kill++;
      }
    }
    if(KILL_DATA[i].victimaliance !== 0){
      total_death++;
      if(now - KILL_DATA[i].time < 60000){
        min_death++;
      }
    }
  }
  let kd_rate_kill = total_kill + 1;
  let kd_rate_death = total_death + 1;
  let kd_rate = kd_rate_kill / kd_rate_death ;
  header.find('.what-header-data').text('Total : '+ e.DPS);
  header.find('.kill-num').text('K : '+total_kill+' ['+min_kill+']');
  header.find('.death-num').text('D : '+total_death+' ['+min_death+']');
  header.find('.all-kd-percent').text('K/D : '+kd_rate.toFixed(2));
}
function overlay_update_start(e){
  if(e.isActive){
    header_update_battle_data(e.Encounter);
  }
  if(e.Encounter.CurrentZoneName === 'Hidden Gorge'){
    if(!ENCOUNTER_START && NOW_AREA !== 0){
      ENCOUNTER_START_TIME = Date.now();
      ENCOUNTER_START = true;
    }
    gorge_overlay_update(e);
  }
  else if (
    e.Encounter.CurrentZoneName === 'The Borderland Ruins (Secure)'||
    e.Encounter.CurrentZoneName === 'Seal Rock (Seize)'||
    e.Encounter.CurrentZoneName === 'The Fields Of Glory (Shatter)'||
    e.Encounter.CurrentZoneName === 'Onsal Hakair (Danshig Naadam)'
    ) {
      if(!ENCOUNTER_START && NOW_AREA !== 0){
        ENCOUNTER_START_TIME = Date.now();
        ENCOUNTER_START = true;
      }
      fl_overlay_update(e);
  }/*
  else if(e.Encounter.CurrentZoneName === 'Middle La Noscea'||e.Encounter.CurrentZoneName === "Wolves' Den Pier"||e.Encounter.CurrentZoneName === 'The Goblet'){
    if(!ENCOUNTER_START && NOW_AREA !== 0){
      ENCOUNTER_START_TIME = Date.now();
      ENCOUNTER_START = true;
    }
    gorge_overlay_update(e);
  }*/
  else {
    pve_overlay_update(e);
  }
}
function pve_overlay_update(e){
  var encounter = e.Encounter;
  var combatants = e.Combatant;
  var template = $('#pve-source li');
  var container = $('#overlay').clone();
  var maxdps = 0;
  container.html('');
  var names = Object.keys(combatants).slice(0,PVE_MAX_ROW);
  if (!e.isActive) {
    rdps_max = 0;
    $('body').addClass('inactive');
  } else {
    $('body').removeClass('inactive');
  }
  var limit = Math.min(names.length,PVE_MAX_ROW);
  for(let i = 0 ; i < limit ; i++){
    var combatant = combatants[names[i]];
    var row = template.clone();
    if (!maxdps) {
    maxdps = parseFloat(combatant.encdps);
    }
    if (combatant.name === ACT_NAME) {
      //addclass me
    }
    let dps = Number(combatant.encdps);
    if(DECIMAL_POINT_DISPLAY){
      if(combatant.encdps.length >= 9){//100,000
        row.find('.n-dps').text(dps.toFixed(0));
      }
      else if (combatant.encdps.length === 8){//10,000
        row.find('.n-dps').text(dps.toFixed(1));
      }
      else{
        row.find('.n-dps').text(dps.toFixed(2));
      }
    }
    else{
      row.find('.n-dps').text(dps.toFixed(0));
    }
    row.find('.n-job').addClass('icon-' + combatant.Job.toLowerCase());
    ///////////////////////////title
    row.find('.n-name').text(combatant.name);
    row.find('.n-crit').text(combatant['crithit%']);
    row.find('.n-direct').text(combatant.DirectHitPct);
    row.find('.n-cridirect').text(combatant.CritDirectHitPct);
    row.find('.n-bar').css('width', ((parseFloat(combatant.encdps) / maxdps) * 100) + '%');
    if(ACT_NAME === combatant.name){
      row.addClass('me');
    }
    container.append(row);
  }
  $('#overlay').replaceWith(container);
}
function fl_overlay_update(e){
  var encounter = e.Encounter;
  var combatants = e.Combatant;
  var template = $('#fl-source li');
  var container = $('#overlay').clone();
  var maxdps = 0;
  container.html('');
  var names = Object.keys(combatants).slice(0,FL_MAX_ROW);
  var limit = Math.min(names.length,FL_MAX_ROW);
  fl_alliance();
  if(ENCOUNTER_TIME){//use LIMITED_DATA
    limited_data_combatant_marge(combatants,encounter.DURATION,'fl');
    LIMITED_DATA.sort(function (a,b) {
      return b.totaloutdamage - a.totaloutdamage ;
    });
    limited_data_party_cut(FL_MAX_ROW);
    for(let i = 0 ; i < limit ; i++){
      var row = template.clone();
      if (!maxdps) {
      maxdps = parseFloat(damage_to_dps(LIMITED_DATA[i].totaloutdamage,PVP_DURATION));
      }
      let dps = damage_to_dps(LIMITED_DATA[i].totaloutdamage,PVP_DURATION);
      row.find('.f-dps').text(dps);
      let job = jobID_to_string(LIMITED_DATA[i].currentjob);
      if(job !== null){
        row.find('.f-job').addClass('icon-' + job);
      }
      else{
        row.find('.f-job').addClass('icon-' + LIMITED_DATA[i].combatantjob);
      }
      ///////////////////////////title
      row.find('.f-name').text(LIMITED_DATA[i].name);
      row.find('.f-kill-number').text(LIMITED_DATA[i].kills);
      row.find('.f-death-number').text(LIMITED_DATA[i].death);

      row.find('.f-bar').css('width', ((dps / maxdps) * 100) + '%');
      if(LIMITED_DATA[i].aliance !== 10){

        row.addClass('aliance-bar-' + LIMITED_DATA[i].aliance);
      }
      if(LIMITED_DATA[i].death >= DEATH_TOO_MUCH){
        row.addClass('death-too-much');
      }
      if(ACT_NAME === LIMITED_DATA[i].name){
        row.addClass('me');
      }
      container.append(row);
    }
  }else{
    for(let i = 0 ; i < limit ; i++){
      var combatant = combatants[names[i]];
      var row = template.clone();
      if (!maxdps) {
      maxdps = parseFloat(combatant.encdps);
      }
      let dps = Number(combatant.encdps);
      if(DECIMAL_POINT_DISPLAY){
        if(combatant.encdps.length >= 7){//100,000.25
          row.find('.f-dps').text(dps.toFixed(0));
        }
        else if (combatant.encdps.length === 6){//10,000
          row.find('.f-dps').text(dps.toFixed(1));
        }
        else{
          row.find('.f-dps').text(dps.toFixed(2));
        }
      }
      else{
        row.find('.f-dps').text(dps.toFixed(0));
      }
      row.find('.f-job').addClass('icon-' + combatant.Job.toLowerCase());
      ///////////////////////////title
      row.find('.f-name').text(combatant.name);
      let position = 0;
      if(ACT_NAME === combatant.name){
        position = LIMITED_DATA.findIndex(({name}) => name == MYCHARACTOR_NAME);
      }
      else{
        position = LIMITED_DATA.findIndex(({name}) => name == combatant.name);
      }
      if(position === -1){
        row.find('.f-kill-number').text(combatant.kills);
        row.find('.f-death-number').text(combatant.deaths);
      }
      else{
        row.find('.f-kill-number').text(LIMITED_DATA[position].kills);
        row.find('.f-death-number').text(LIMITED_DATA[position].death);
        if(LIMITED_DATA[i].aliance !== 10){
          row.addClass('aliance-bar-' + LIMITED_DATA[position].aliance);
        }
      }
      row.find('.f-bar').css('width', ((parseFloat(combatant.encdps) / maxdps) * 100) + '%');
      if(LIMITED_DATA[i].death >= DEATH_TOO_MUCH){
        row.addClass('death-too-much');
      }
      if(ACT_NAME === combatant.name){
        row.addClass('me');
      }
      container.append(row);
    }
  }

  $('#overlay').replaceWith(container);
}
function gorge_overlay_update(e){
  var encounter = e.Encounter;
  var combatants = e.Combatant;
  limited_data_combatant_marge(combatants,encounter.DURATION,'rw');

  gorge_overlay_update_process();
}
function gorge_overlay_update_process(){
    total_damage_calc();
    if(SPENT_NEARBY_TIME){
      LIMITED_DATA.sort(function (a,b) {
        return b.totaloutdps - a.totaloutdps ;
      });
    }
    else{
      LIMITED_DATA.sort(function (a,b) {
        return b.totaloutdamage - a.totaloutdamage ;
      });
    }
    var template = $('#gorge-source li');
    var container = $('#overlay').clone();
    container.html('');
    if(Battle_start){
      limited_data_party_cut(MAX_ROW);
    }
    else if (!IGNORE_MAX_AFTER_BATTLE) {
      limited_data_party_cut(MAX_ROW);
    }
    let maxrow = LIMITED_DATA.length;
    if(maxrow > MAX_ROW){
      maxrow = MAX_ROW;
    }
    if(!Battle_start && IGNORE_MAX_AFTER_BATTLE){
      maxrow = LIMITED_DATA.length;
    }
    for(let i = 0 ; i < maxrow ; i++){
      let base_time = 0;
      if(SPENT_NEARBY_TIME){
        base_time = LIMITED_DATA[i].totalbattletime;
      }
      else{
        base_time = PVP_DURATION;
      }
      if(Battle_start){//Timerが動いている時。
        let row = gorge_row_create(template.clone(),i,base_time);
        container.append(row);
      }
      else{//Timerが止まってるとき。
        let row = gorge_row_create(template.clone(),i,base_time);
        container.append(row);
      }
    }
    $('#overlay').replaceWith(container);
}
function gorge_row_create(row,i,base_time){
  row.find('.g-total-dps-number').text(damage_to_dps(LIMITED_DATA[i].totaloutdamage,base_time));
  row.find('.g-total-hps-number').text(damage_to_dps(LIMITED_DATA[i].actualheal,base_time));
  let job = jobID_to_string(LIMITED_DATA[i].currentjob);
  if(job !== null){
    row.find('.g-job-icon').addClass('icon-' + job);
  }
  else{
    row.find('.g-job-icon').addClass('icon-' + LIMITED_DATA[i].combatantjob);
  }

  row.find('.g-name').text(LIMITED_DATA[i].name);
  row.find('.g-kill-number').text(LIMITED_DATA[i].kills);
  row.find('.g-death-number').text(LIMITED_DATA[i].death);
  row.find('.g-player-number').text(damage_to_dps(LIMITED_DATA[i].actualpersondamage,base_time));
  row.find('.g-torobot-number').text(damage_to_dps(LIMITED_DATA[i].actualToRobotdamage,base_time));
  row.find('.g-object-number').text(damage_to_dps(LIMITED_DATA[i].actualobjectdamage,base_time));
  row.find('.g-tower-number').text(damage_to_dps(LIMITED_DATA[i].actualtowerdamage,base_time));

  if(LIMITED_DATA[i].robhistory === null||LIMITED_DATA[i].robhistory === ''){
    //let reject_damage = LIMITED_DATA[i].realobjectdamage + LIMITED_DATA[i].realpersondamage + LIMITED_DATA[i].realToRobotdamage;
    //reject_damage = LIMITED_DATA[i].totaloutdamage - reject_damage;
    row.find('.g-robot-history').css('display','none');
    row.find('.g-name').css('max-width','100%');
  }
  else{
    row.find('.icon-robots').text(robot_history_fonts(LIMITED_DATA[i].robhistory));
    if(LIMITED_DATA[i].robhistory.indexOf('jas') !== -1 && JUSTICE_PUNTCH){
      let hit = LIMITED_DATA[i].rocketpuntchhit;
      let miss = LIMITED_DATA[i].rocketpuntchmiss;
      let total = hit + miss;
      let percent = hit / total;
      if(isNaN(percent)){
        percent = 0;
      }
      percent = percent*100;
      row.find('.g-total-hps-number').text(total + '/'+ percent.toFixed(0) +'%');
    }
  }
  if(LIMITED_DATA[i].aliance !== 10){
    row.addClass('aliance-bar-' + LIMITED_DATA[i].aliance);
  }
  if(LIMITED_DATA[i].death >= DEATH_TOO_MUCH){
    row.addClass('death-too-much');
  }
  if(LIMITED_DATA[i].aliance === 1){
    row.addClass('party');
  }
  if(ACT_NAME === LIMITED_DATA[i].name){
    row.addClass('me');
  }
  return row;
}
function robot_history_fonts(robhistory){
  //   outline  fill
  //jas 0xe90d 0xe92e
  //opp 0xe914 0xe933
  //che 0xe908 0xe927
  let data = '';
  if(robhistory === null){
    return '';
  }
  else {
    let num = robhistory.length / 3;
    for(let i = 0 ; i < num ; i++){
      if('jas' === robhistory.substr(0,3)){
        data = data + String.fromCodePoint(0xe92e);
        robhistory = robhistory.substr(3,robhistory.length);
      }
      else if ('che' === robhistory.substr(0,3)) {
        data = data + String.fromCodePoint(0xe927);
        robhistory = robhistory.substr(3,robhistory.length);
      }
      else if ('opp' === robhistory.substr(0,3)) {
        data = data + String.fromCodePoint(0xe933);
        robhistory = robhistory.substr(3,robhistory.length);
      }
    }
    return data;
  }
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
  if(DECIMAL_POINT_DISPLAY){
    if (dps.toFixed(0).length <= 2) {
      dps = dps.toFixed(2);
    }
    else if (dps.toFixed(0).length === 3){
      dps = dps.toFixed(1);
    }
    else if (dps.toFixed(0).length >= 4) {
      dps = dps.toFixed(0);
    }
    return dps;
  }
else{
  return dps.toFixed(0);
}
}
function limited_data_combatant_marge(e,time,area){
  //combatantDuration: 0,
  //combatantdamage: 0,
  //combatantjob: null,
  let time_now = Date.now();
  let combatant_time_ms = time_now - ENCOUNTER_START_TIME;
  let caluc_time = Math.floor(combatant_time_ms/1000);
  time = Number(time);
  if(time >= caluc_time){
    //nothing
  }
  else if (time < caluc_time) {
    time = caluc_time;
  }

  PVP_DURATION = time;
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
          if(area === 'rw'){
            LIMITED_DATA[i].totaloutdamage = LIMITED_DATA[i].actualToRobotdamage + LIMITED_DATA[i].actualpersondamage + LIMITED_DATA[i].actualobjectdamage;
          }
          else if (area === 'fl') {
            LIMITED_DATA[i].totaloutdamage = LIMITED_DATA[i].actualToRobotdamage + LIMITED_DATA[i].actualpersondamage + LIMITED_DATA[i].actualobjectdamage + LIMITED_DATA[i].actualtowerdamage;
          }
          LIMITED_DATA[i].combatantdps = damage_to_dps(LIMITED_DATA[i].totaloutdamage,time);
          break;
        }
      }
    }
  }
}
function fl_alliance(){
  for(var i = 0; i < LIMITED_DATA.length; i++){
    if(LIMITED_DATA[i].aliance === 2){
      LIMITED_DATA[i].aliance = 1;
    }
    else if(LIMITED_DATA[i].aliance === 4){
      LIMITED_DATA[i].aliance = 3;
    }
    else if(LIMITED_DATA[i].aliance === 6){
      LIMITED_DATA[i].aliance = 5;
    }
  }
}
function limited_data_party_cut(cut){
  let replace_data = [];
  let party_member_position = [];
  if(AROUND_MEMBER_ONLY){
    let around_ally = [];
    for(let i = 0 ; i < LIMITED_DATA.length ; i++){
      if(LIMITED_DATA[i].battle){
        around_ally.push(LIMITED_DATA[i]);
      }
    }
    LIMITED_DATA = around_ally;
  }
  if(PARTY_PRIORITY){
    if(LIMITED_DATA.length >= cut){
      for(let i = 0 ; i < LIMITED_DATA.length ; i++){
        if(LIMITED_DATA[i].aliance === 1) {
          party_member_position.push(i);
          replace_data.push(LIMITED_DATA[i]);
        }
      }
      for(let i = 0;i < LIMITED_DATA.length && replace_data.length < cut ;i++){
        let noparty = 0;
        for(let p = 0; p < party_member_position.length;p++){
          if(i == party_member_position[p]){
            noparty = 1;
          }
        }
        if(noparty == 0){//パーティメンバーのデータでないとき
          replace_data.push(LIMITED_DATA[i]);
        }
      }
      LIMITED_DATA = replace_data;
      LIMITED_DATA.sort(function (a,b) {
        return b.totaloutdamage - a.totaloutdamage ;
      });
    }
  }
}
function party(p){
  if(TEST_MODE){
    console.warn(p);
  }
  //party_data= ['300','nameID','name','aliance'];
  if(p.length === 24){
    ALIANCE_DATA = true;
    let aliance = 1;
    for(let i = 0 ; i < p.length ; i++){
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
    logline_start(data);
  }
}
