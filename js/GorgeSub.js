$(document).on("click", "#button-4", function(){
  $('body').css('background-color','black');
  $('#overlay').css('display','none');
  $('.header').css('display','none');
  $('.set-data').css('display','flex');
  localstorage_restore();
});//click button-4 end (setting-button)
//click button-5 start (setting-button-close)
$(document).on("click", "#button-5", function(){
  $('body').css('background-color','transparent');
  $('#overlay').css('display','flex');
  $('.header').css('display','flex');
  $('.set-data').css('display','none');
  localstorage_save();
});//click button-5 end (setting-button-close)
//  DispMax= $('#p-max').val();
//Disappearance//$("#setting-item-3").prop("checked") == true
//click button-5 start (setting-button-close)
//$('#p-max').val(Number(DispMax));
$(document).on("click", "#button-2", function(){
  //timet button
  console.log('button2');
  battle_counter();
});//click button-2 end (timer button )
$(document).on("click", "#setting-item-9", function(){
  localstorage_defalt();
  });//click button-5 end (setting-button-close)
$(document).on("click", "#setting-item-8-2", function(){
  localstorage_save();
  dammy();
  gorge_overlay_update_process();
  });//click button-5 end (setting-button-close)
//////////////////////////////////////////////////////////
//localStorage////////////////////////////////////////////
//////////////////////////////////////////////////////////

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
  if ($("#setting-item-107").prop("checked") === true){
    data.COMBATANT_ONLY = true;
  }
  else {
    data.COMBATANT_ONLY = false;
  }
  if ($("#setting-item-108").prop("checked") === true){
    data.ENCOUNTER_TIME = true;
  }
  else {
    data.ENCOUNTER_TIME = false;
  }
  ///number  or  strings
  data.MAX_ROW= $('#setting-item-100').val();
  data.FL_MAX_ROW= $('#setting-item-100-2').val();
  data.PVE_MAX_ROW= $('#setting-item-100-3').val();
  data.FONT_SIZE= $('#setting-item-105').val();
  data.ACT_NAME= $('#setting-item-106').val();
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
    HEADER : true,
    PVE_HEADER : true,
    DECIMAL_POINT_DISPLAY : true,
    PARTY_PRIORITY : true,
    COMBATANT_ONLY : true,
    ENCOUNTER_TIME : false,
    VERSION : 'Gorge-overlay2 1.0.0'
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
  if(data.COMBATANT_ONLY){
    $('#setting-item-107').prop('checked',true);
  }
  else{
    $('#setting-item-107').prop('checked',false);
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
  $(".version").text(data.VERSION);
}
function localstorage_to_grobal(data){
  let string = Object.keys(data);
  for(let i = 0 ; i < string.length ; i++){
    window[string[i]] = data[string[i]];
  }
  font_size_change();
  gorge_overlay_decimal_point();
}
function font_size_change(){
  $('html').css('font-size',FONT_SIZE +'px');
}
function gorge_overlay_decimal_point(){
  if(DECIMAL_POINT_DISPLAY){
    $('.g-dps-area').css('min-width','5.8rem');
    $('.g-name').css('min-width','calc(100vw - 17rem)');
    $('.g-name').css('min-width','calc(100vw - 17rem)');
    $('.g-line').css('width','calc(100vw - 7.4rem)');
    $('.g-damage-div').css('width','calc(25vw - 3.45rem)');
  }
  else{
    $('.g-dps-area').css('min-width','5.2rem');
    $('.g-name').css('min-width','calc(100vw - 15.6rem)');
    $('.g-name').css('min-width','calc(100vw - 15.6rem)');
    $('.g-line').css('width','calc(100vw - 6rem)');
    $('.g-damage-div').css('width','calc(25vw - 3.3rem)');
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
  console.log(Battle_start);
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
