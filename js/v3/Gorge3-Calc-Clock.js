var Process_time_console = false;
var Process_time = {start:0,end:0};
function calc(){
  if(!LOG_PROCESS && LOG_QUEUE.length > 0){
    LOG_PROCESS = true;
    PROMISE_ARRAY = [];
    if(Process_time_console){
      Process_time.start = performance.now();
    }
    let promise = Promise.resolve();
    let log_num = LOG_QUEUE.length;
    //console.log('START->'+log_num);
    for(let i = 0 ; i < log_num; i++) {
      promise = promise.then(() => logline_firststep(LOG_QUEUE.shift()));
      PROMISE_ARRAY.push(promise);
    }
    promise = promise.then(async () => {
      if(Process_time_console){
        Process_time.end = performance.now();
        let time = Process_time.end - Process_time.start;
        console.debug('CLOCK_Sucsessed->' + time + 'ms');
      }
      await log_battle_time();
    });
    PROMISE_ARRAY.push(promise);
    Promise.all(PROMISE_ARRAY).then(() => LOG_PROCESS = false);
  }
  else{
    if(LOG_PROCESS){
      console.error('LOG_PROCESS WORKING...->' + LOG_QUEUE.length);
    }
  }
}
let LOG_PROCESS = false;
let LOG_QUEUE = [];
let PROMISE_ARRAY = [];
async function log_battle_time(){
  if(LOGLINE_ENCOUNTER.Engage){
    for(let i = 0 ; i < TBD.Player_data.length ; i++){
      if(TBD.Player_data[i].battle){
        if(typeof TBD.Player_data[i].battle_time === 'number'){
          TBD.Player_data[i].battle_time++;
        }
        else {
          TBD.Player_data[i].battle_time = 0;
        }
      }
      else {
        //no action
      }
    }
  }
}
function log_queue_insert(log){
  LOG_QUEUE.push(log);
}
function log_queue_unshift(log){
  LOG_QUEUE.unshift(log);
}
let start = 0;

function maindata_export(type){
  let return_data = [];
  if(type === 'ally'){
    let battle_data = TBD.Player_data;
    for(let i = 0 ; i < battle_data.length ; i++){
      if(battle_data[i].aliance > 0){
        return_data.push(battle_data[i]);
      }
    }
  }
  else if (type === 'player'){
    let battle_data = TBD.Player_data;
    for(let i = 0 ; i < battle_data.length ; i++){
      if(battle_data[i].nameID.substring(0,2) === '10'){
        return_data.push(battle_data[i]);
      }
    }
  }
  else if (type === 'party') {
    let battle_data = TBD.Player_data;
    for(let i = 0 ; i < battle_data.length ; i++){
      if(battle_data[i].aliance === 1){
        return_data.push(battle_data[i]);
      }
    }
  }
  else if (type === 'ally-other') {
    let battle_data = TBD.Player_data;
    for(let i = 0 ; i < battle_data.length ; i++){
      if(battle_data[i].aliance > 1){
        return_data.push(battle_data[i]);
      }
    }
  }
  return return_data;
}
