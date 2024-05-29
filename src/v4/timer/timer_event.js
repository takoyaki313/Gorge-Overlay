import { timestamp_change } from "../LogLine/logline_other"
import { battleEvent, devMode } from "../..";
import { saveHistory } from "../maindataFormat";

export const battleStart = async (time, timestamp) => {
    if (!battleEvent.Engage) {
        if (timestamp === '') {
            battleEvent.timer.Set_BattleStart = Date.now();
        } else {
            battleEvent.timer.Set_BattleStart = await timestamp_change(timestamp);
        }
        if (time === 0) {
            battleEvent.timer.Set_BattleMaxTime = Date.now();
        } else {
            battleEvent.timer.Set_BattleMaxTime = time;
        }
        //timer Start 
        //console.log('timer start', time, timestamp);
        timerStart(time);
    }
    else {
        //Adjust
        //battleEvent.timer.Set_AdjustTime = { time: time, ref: await timestamp_change(timestamp) };
    }
    battleEvent.Engage = true;

}

export const battleStop = async (timestamp) => {
    battleEvent.Engage = false;
    if (timestamp === '') {
        //Force OFF
        //battleEvent.Result_in_time = Date.now();
    } else if (timestamp === 'PART') {
        battleEvent.Result_Page = true;
        battleEvent.timer.Set_ResultIn = Date.now();
        Timer_OverlayChangeEvent();
    }
    else {
        battleEvent.Result_Page = true;
        battleEvent.timer.Set_ResultIn = await timestamp_change(timestamp);
        Timer_OverlayChangeEvent();
    }
    console.log('timer end');
    timerStop();
    saveHistory();
}

export const adjustTimer = async (time, timestamp) => {
    /*
    if (!battleEvent.Result_Page) {
        await battleStart(time, timestamp);
    }
    else {
        //not Adjust
    }*/
}

window.TimerEvent = null;
let OverlayClockTime = 1000;
let CountDown = false;

const timerStart = async (time) => {
    clearInterval(window.TimerEvent);
    window.TimerEvent = time;

    window.TimerEvent = setInterval(Timer_OverlayChangeEvent, OverlayClockTime);
}
export const timerStop = async () => {
    clearInterval(window.TimerEvent);
}

const Timer_OverlayChangeEvent = () => {
    if (battleEvent.timer.Battle_Max_Time > 0 && CountDown) {
        window.changeTime_Event(battleEvent.timer.Get_RemainTime);
    } else {
        window.changeTime_Event(battleEvent.timer.Get_Time);
    }
    battleEvent.timer.Set_Time = 1;
    if (battleEvent.encounterStart || devMode.sampleType !== -1) {
        window.TBDState(battleEvent.timer.Get_Time);
    }
}