$(document).on("click", "#button-4", function(){
  $('body').css('background-color','black');
  $('#overlay').css('display','none');
  $('.header').css('display','none');
  $('.set-data').css('display','flex');
});//click button-4 end (setting-button)
//click button-5 start (setting-button-close)
$(document).on("click", "#button-5", function(){
  $('body').css('background-color','transparent');
  $('#overlay').css('display','flex');
  $('.header').css('display','flex');
  $('.set-data').css('display','none');
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

  });//click button-5 end (setting-button-close)
$(document).on("click", "#setting-item-8-2", function(){


  });//click button-5 end (setting-button-close)

//////////////////////////////////////////////
//Timer
//////////////////////////////////////////////
var Battle_start = false;
var Battle_Timer_interval = null;
var Battle_Start_Time = null;
var Battle_Current_Time = 0;
//////////////////////////////////////////////
function battle_counter(){
  console.log(Battle_start);
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
    console.log('Timer->'+Battle_Current_Time);
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
