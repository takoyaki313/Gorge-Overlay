/*self.addEventListener("message", (e) => {
  const param = e.data;  // これでメインスレッドからの情報を受け取れる

  //----------------------------------
  // このあたりにWorkerにさせたい処理を書く
  // (途中経過のメッセージを送信するのもあり)
  //----------------------------------

  // メインスレッドへメッセージを送信
  self.postMessage("Nice to meet you");
});/*
const db = new Dexie('MAIN_DB');

db.version(1).stores({
  Player_Data: "++id, nameID, name, job, aliance, damage, heal, skill, hp,"

});

*/
//////////////////////////////////////////////
//Timer
//////////////////////////////////////////////
var PvE_Timer_DownCount = true;
var Battle_Timer_interval = null;
var Battle_Current_Time = 0;
//////////////////////////////////////////////
async function battle_counter(time){
  if(LOGLINE_ENCOUNTER.Engage||LOGLINE_ENCOUNTER.Result_Page){
    if(DEBUG_LOG){
      console.log('already start');
      //既にスタートしているならなにもしない
    }
  }
  else{
    if(DEBUG_LOG){
      console.log('Start Timer');
    }
    LOGLINE_ENCOUNTER.Timer_Start = true;
    LOGLINE_ENCOUNTER.Timer_Start_Time = Date.now();
    Battle_Current_Time = 0;
    Battle_Timer_interval = setInterval(countUp,1000);
  }
}
function stop_timer(){
  if(DEBUG_LOG){
    console.log('Stop Timer');
  }
  LOGLINE_ENCOUNTER.Timer_Start_Time = 0;
  LOGLINE_ENCOUNTER.Timer_Start = false;
  clearInterval(Battle_Timer_interval);
  header_update_timer_pvp();
}
function countUp(){
  if(Battle_Current_Time > LOGLINE_ENCOUNTER.Battle_Max_Time){
    stop_timer();
  }
  else if(AREA.Area_Type !== 0){
    let nowtime = Date.now();
    //Timer_Start_Time
    let current_time_ms = nowtime - LOGLINE_ENCOUNTER.Timer_Start_Time;
    Battle_Current_Time = Math.ceil(current_time_ms/1000);
    //console.log('Timer->'+Battle_Current_Time);
  }
  header_update_timer_pvp();
}
function header_update_timer_pvp(){
  let timer = time_change(LOGLINE_ENCOUNTER.Battle_Max_Time,Battle_Current_Time);

  if(timer[0] >= 0||timer[1] >= 0){
    header_timer_update(timer[0],timer[1]);
  }
  else {
    if(DEBUG_LOG){
      console.warn('Error :Timer is minus ->' + timer[0] + ':' +timer[1]);
    }
    header_timer_update(min,sec);
  }
}
function time_change(set_time,current_time){
  let division_time = [0,0];

  if(PvE_Timer_DownCount){
    time = set_time - current_time;
  }
  else {
     time = current_time;
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
