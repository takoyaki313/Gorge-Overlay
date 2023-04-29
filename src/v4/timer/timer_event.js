import { timestamp_change } from "../LogLine/logline_other"

export const battleStart = async (time, timestamp) => {

    if (!window.BATTLE_EVENT.Engage) {
        if (timestamp === '') {
            window.BATTLE_EVENT.timer.Set_BattleStart = Date.now();
        } else {
            window.BATTLE_EVENT.timer.Set_BattleStart = await timestamp_change(timestamp);
        }
        if (time === 0) {
            window.BATTLE_EVENT.timer.Set_BattleMaxTime = Date.now();
        } else {
            window.BATTLE_EVENT.timer.Set_BattleMaxTime = time;
        }
    }
    else {
        //Adjust
        window.BATTLE_EVENT.timer.Set_AdjustTime = { time: time, ref: await timestamp_change(timestamp) };
    }
    window.BATTLE_EVENT.Engage = true;
    //timer Start 
    console.log('timer start', time, timestamp);
    timerStart(time);
}

export const battleStop = async (timestamp) => {
    window.BATTLE_EVENT.Engage = false;
    if (timestamp === '') {
        //Force OFF
        //window.BATTLE_EVENT.Result_in_time = Date.now();
    } else if(timestamp === 'PART'){
        window.BATTLE_EVENT.Result_Page = true;
        window.BATTLE_EVENT.timer.Set_ResultIn = Date.now();
        Timer_OverlayChangeEvent();
    }    
    else {
        window.BATTLE_EVENT.Result_Page = true;
        window.BATTLE_EVENT.timer.Set_ResultIn = await timestamp_change(timestamp);
        Timer_OverlayChangeEvent();
    }
    console.log('timer end');
    timerStop();
}

export const adjustTimer = async (time, timestamp) => {
    /*
    if (!window.BATTLE_EVENT.Result_Page) {
        await battleStart(time, timestamp);
    }
    else {
        //not Adjust
    }*/
}

window.TimerEvent = null;
let OverlayClockTime = 1000;
let CountDown = true;

const timerStart = async (time) => {
    clearInterval(window.TimerEvent);
    window.TimerEvent = time;

    window.TimerEvent = setInterval(Timer_OverlayChangeEvent,OverlayClockTime);
}
const timerStop = async () => {
    clearInterval(window.TimerEvent);
}

const Timer_OverlayChangeEvent = () => {
    if (window.BATTLE_EVENT.timer.Battle_Max_Time > 0 && CountDown) {
        window.changeTime_Event(window.BATTLE_EVENT.timer.Get_RemainTime);
    } else {
        window.changeTime_Event(window.BATTLE_EVENT.timer.Get_Time);
    }
    window.BATTLE_EVENT.timer.Set_Time = 1;
    window.TBDState(window.BATTLE_EVENT.timer.Get_Time);
}