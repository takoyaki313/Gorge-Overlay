//////////////////////////////////////////////////////////
//localStorage////////////////////////////////////////////
//////////////////////////////////////////////////////////
function version_check(){
  if(localStorage.getItem('Gorge-Overlay2') === null){
    localstorage_defalt();
  }
  else{
    let saved = JSON.parse(localStorage.getItem('Gorge-Overlay2'));
    let saved_array = Object.keys(saved);
    let default_localstrage = localstorage_data();
    let default_localstrage_array = Object.keys(default_localstrage);
    if(saved['VERSION'] === default_localstrage['VERSION']){
      console.log('Version match!');
          localstorage_restore();
    }
    else{
      console.log('New update');
      for(let i = 0 ; i < default_localstrage_array.length ; i++){
        if(saved_array.indexOf(default_localstrage_array[i]) === -1){
          saved[default_localstrage_array[i]] = default_localstrage[default_localstrage_array[i]];
        }
      }
      saved['VERSION'] = default_localstrage['VERSION'];
      //save
      let json = JSON.stringify(saved);
      localStorage.setItem('Gorge-Overlay2',json);
      localstorage_restore();
    }
  }
}
function localstorage_save(){
  //setting display data get
  let data = localstorage_data();
  //get setting data from overlay
  if ($("#setting-item-2-1").prop("checked") === true){
    data.HEADER = true;
  }
  else {
    data.HEADER = false;
  }
  if ($("#setting-item-2-2").prop("checked") === true){
    data.PVE_HEADER = true;
  }
  else {
    data.PVE_HEADER = false;
  }
  if ($("#setting-item-103-1").prop("checked") === true){
    data.DECIMAL_POINT_DISPLAY = true;
  }
  else {
    data.DECIMAL_POINT_DISPLAY = false;
  }
  if ($("#setting-item-104").prop("checked") === true){
    data.PARTY_PRIORITY = true;
  }
  else {
    data.PARTY_PRIORITY = false;
  }
  if ($("#setting-item-108").prop("checked") === true){
    data.ENCOUNTER_TIME = true;
  }
  else {
    data.ENCOUNTER_TIME = false;
  }
  if ($("#setting-item-110").prop("checked") === true){
    data.KILLSOUND = true;
  }
  else {
    data.KILLSOUND = false;
  }
  if ($("#setting-item-110-3").prop("checked") === true){
    data.FAST_KILLSOUND = true;
  }
  else {
    data.FAST_KILLSOUND = false;
  }
  if ($("#setting-item-111").prop("checked") === true){
    data.JUSTICE_PUNTCH = true;
  }
  else {
    data.JUSTICE_PUNTCH = false;
  }
  if ($("#setting-item-112").prop("checked") === true){
    data.AROUND_MEMBER_ONLY = true;
  }
  else {
    data.AROUND_MEMBER_ONLY = false;
  }
  if ($("#setting-item-113").prop("checked") === true){
    data.SPENT_NEARBY_TIME = true;
  }
  else {
    data.SPENT_NEARBY_TIME = false;
  }
  if ($("#setting-item-114").prop("checked") === true){
    data.IGNORE_MAX_AFTER_BATTLE = true;
  }
  else {
    data.IGNORE_MAX_AFTER_BATTLE = false;
  }
  ///number  or  strings
  data.MAX_ROW = Number($('#setting-item-100').val());
  data.FL_MAX_ROW= Number($('#setting-item-100-2').val());
  data.PVE_MAX_ROW= Number($('#setting-item-100-3').val());
  data.FONT_SIZE= Number($('#setting-item-105').val());
  data.ACT_NAME= $('#setting-item-106').val();
  data.DEATH_TOO_MUCH= Number($('#setting-item-109').val());
  data.KILLSOUND_PATH= $('#setting-item-110-1').val();
  data.KILLSOUND_VOLUME = Number($('#setting-item-110-2').val());
  data.RAINBOW_DPS = Number($('#setting-item-115').val());
  data.RAINBOW_DAMAGE_TOWER = Number($('#setting-item-115-2').val());
  //save
  let json = JSON.stringify(data);
  localStorage.setItem('Gorge-Overlay2',json);
  //console.log(data);
  localstorage_to_grobal(data);
}
function localstorage_data(){
  let data = {
    ACT_NAME : 'YOU',
    MAX_ROW : 16,
    PVE_MAX_ROW : 10,
    FL_MAX_ROW : 24,
    FONT_SIZE : 16,
    DEATH_TOO_MUCH : 8,
    HEADER : true,
    PVE_HEADER : true,
    KILLSOUND : false,
    KILLSOUND_PATH : 'https://takoyaki313.github.io/Gorge-Overlay/sound/soundeffect-lab-金額表示.mp3',
    DECIMAL_POINT_DISPLAY : true,
    PARTY_PRIORITY : true,
    ENCOUNTER_TIME : false,
    JUSTICE_PUNTCH : true,
    AROUND_MEMBER_ONLY : false,
    SPENT_NEARBY_TIME : false,
    IGNORE_MAX_AFTER_BATTLE : false,
    KILLSOUND_VOLUME : 100,
    FAST_KILLSOUND : false,
    RAINBOW_DPS : 2000,
    RAINBOW_DAMAGE_TOWER : 1000000,
    VERSION : 'Gorge-overlay2 1.5.1'
  };
  return data;
}
function localstorage_defalt(){
  let data = localstorage_data();
  //save
  let json = JSON.stringify(data);
  localStorage.setItem('Gorge-Overlay2',json);
  localstorage_to_settingdisp(data);
}
function localstorage_restore(){
  let data = JSON.parse(localStorage.getItem('Gorge-Overlay2'));
  localstorage_to_settingdisp(data);
  localstorage_to_grobal(data);
}
function localstorage_to_settingdisp(data){
  $('#setting-item-100').val(data.MAX_ROW);
  $('#setting-item-100-2').val(data.FL_MAX_ROW);
  $('#setting-item-100-3').val(data.PVE_MAX_ROW);
  $('#setting-item-105').val(data.FONT_SIZE);
  $('#setting-item-106').val(data.ACT_NAME);
  $('#setting-item-109').val(data.DEATH_TOO_MUCH);
  $('#setting-item-110-1').val(data.KILLSOUND_PATH);
  $('#setting-item-110-2').val(data.KILLSOUND_VOLUME);
  $('#setting-item-115').val(data.RAINBOW_DPS);
  $('#setting-item-115-2').val(data.RAINBOW_DAMAGE_TOWER);
  if(data.HEADER){
    $('#setting-item-2-1').prop('checked',true);
  }
  else{
    $('#setting-item-2-1').prop('checked',false);
  }
  if(data.PVE_HEADER){
    $('#setting-item-2-2').prop('checked',true);
  }
  else{
    $('#setting-item-2-2').prop('checked',false);
  }
  if(data.DECIMAL_POINT_DISPLAY){
    $('#setting-item-103-1').prop('checked',true);
  }
  else{
    $('#setting-item-103-1').prop('checked',false);
  }
  if(data.ENCOUNTER_TIME){
    $('#setting-item-108').prop('checked',true);
  }
  else{
    $('#setting-item-108').prop('checked',false);
  }
  if(data.PARTY_PRIORITY){
    $('#setting-item-104').prop('checked',true);
  }
  else{
    $('#setting-item-104').prop('checked',false);
  }
  if(data.KILLSOUND){
    $('#setting-item-110').prop('checked',true);
  }
  else{
    $('#setting-item-110').prop('checked',false);
  }
  if(data.FAST_KILLSOUND){
    $('#setting-item-110-3').prop('checked',true);
  }
  else{
    $('#setting-item-110-3').prop('checked',false);
  }
  if(data.JUSTICE_PUNTCH){
    $('#setting-item-111').prop('checked',true);
  }
  else{
    $('#setting-item-111').prop('checked',false);
  }
  if(data.AROUND_MEMBER_ONLY){
    $('#setting-item-112').prop('checked',true);
  }
  else{
    $('#setting-item-112').prop('checked',false);
  }
  if(data.SPENT_NEARBY_TIME){
    $('#setting-item-113').prop('checked',true);
  }
  else{
    $('#setting-item-113').prop('checked',false);
  }
  if(data.IGNORE_MAX_AFTER_BATTLE){
    $('#setting-item-114').prop('checked',true);
  }
  else{
    $('#setting-item-114').prop('checked',false);
  }
  $(".version").text(data.VERSION);
}
function localstorage_to_grobal(data){
  let string = Object.keys(data);
  for(let i = 0 ; i < string.length ; i++){
    window[string[i]] = data[string[i]];
  }
  font_size_change();
  audio_load();
  gorge_overlay_decimal_point();
}
function font_size_change(){
  $('html').css('font-size',FONT_SIZE +'px');
}
function audio_load(){
  KILLSOUND_PLAY = new Audio(KILLSOUND_PATH);
  KILLSOUND_PLAY.volume = KILLSOUND_VOLUME/100;
}
function gorge_overlay_decimal_point(){
  if(DECIMAL_POINT_DISPLAY){
    $('.g-dps-area').css('min-width','5.8rem');
  }
  else{
    $('.g-dps-area').css('min-width','5.2rem');
  }
}

//////////////////////////////////////////////
//Header Disp
//////////////////////////////////////////////
var HEADER = true;
var PVE_HEADER = true;
//////////////////////////////////////////////
var HEADER_TEMP = 0;
//////////////////////////////////////////////

//////////////////////////////////////////////
//Timer
//////////////////////////////////////////////
var Battle_start = false;
var Battle_Timer_interval = null;
var Battle_Start_Time = null;
var Battle_Current_Time = 0;
//////////////////////////////////////////////
function battle_counter(time){
  if(time > 0){
    SET_BATTLE_TIME = time;
  }
  if(Battle_start){
    if(TEST_MODE){
      console.log('already start');
      //既にスタートしているならなにもしない
    }
  }
  else{
    console.log('Start Timer');
    Battle_start = true;
    Battle_Start_Time = Date.now();
    Battle_Current_Time = 0;
    Battle_Timer_interval = setInterval(countUp,1000);
  }
}
function countUp(){
  if(Battle_Current_Time > SET_BATTLE_TIME){
    console.log('Stop Timer');
    Battle_Current_Time = 0;
    Battle_start = false;
    clearInterval(Battle_Timer_interval);
  }
  else if(NOW_AREA !== 0){
    let nowtime = Date.now();
    //Battle_Start_Time
    let current_time_ms = nowtime - Battle_Start_Time;
    Battle_Current_Time = Math.floor(current_time_ms/1000);
    //console.log('Timer->'+Battle_Current_Time);
  }
  header_update_timer();
}
function time_change(set_time,current_time){
  var division_time = [0,0];

  if(2 == 2){
    var time = set_time - current_time;
  }
  else {
    var time = current_time;
  }
  if(time < 0){
    time = 0;
  }
  division_time[0] = Math.trunc(time / 60);
  const temp = division_time[0] * 60;
  division_time[1] = time - temp;
  if (division_time[1] < 10) {
    division_time[1] = "0" + division_time[1];
  }
  return division_time;
}
//////////////////////////////////////////////
//Job
//////////////////////////////////////////////
function jobID_to_string(id){
  id = parseInt(id,16);
  let job = null;
  switch (id) {
    case 0:
      job = null;
      break;
    case 1:
      job = 'gla';
      break;
    case 2:
      job = 'pgl';
      break;
    case 3:
      job = 'mrd';
      break;
    case 4:
      job = 'lnc';
      break;
    case 5:
      job = 'arc';
      break;
    case 6:
      job = 'cnj';
      break;
    case 7:
      job = 'thm';
      break;
    case 8:
      job = 'crp';
      break;
    case 9:
      job = 'bsm';
      break;
    case 10:
      job = 'arm';
      break;
    case 11:
      job = 'gsm';
      break;
    case 12:
      job = 'ltw';
      break;
    case 13:
      job = 'wvr';
      break;
    case 14:
      job = 'alc';
      break;
    case 15:
      job = 'cul';
      break;
    case 16:
      job = 'nin';
      break;
    case 17:
      job = 'btn';
      break;
    case 18:
      job = 'fsh';
      break;
    case 19:
      job = 'pld';
      break;
    case 20:
      job = 'mnk';
      break;
    case 21:
      job = 'war';
      break;
    case 22:
      job = 'drg';
      break;
    case 23:
      job = 'brd';
      break;
    case 24:
      job = 'whm';
      break;
    case 25:
      job = 'blm';
      break;
    case 26:
      job = 'acn';
      break;
    case 27:
      job = 'smn';
      break;
    case 28:
      job = 'sch';
      break;
    case 29:
      job = 'rog';
      break;
    case 30:
      job = 'nin';
      break;
    case 31:
      job = 'mch';
      break;
    case 32:
      job = 'drk';
      break;
    case 33:
      job = 'ast';
      break;
    case 34:
      job = 'sam';
      break;
    case 35:
      job = 'rdm';
      break;
    case 36:
      job = 'bdm';
      break;
    case 37:
      job = 'gnb';
      break;
    case 38:
      job = 'dnc';
      break;
    case 50:
      job = 'opp';
      break;
    case 51:
      job = 'che';
      break;
    case 52:
      job = 'jas';
      break;
    default:
      job = null;
  }
  return job;
}
