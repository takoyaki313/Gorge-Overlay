import { timestamp_change } from "./logline_other.js";
import { battleStart,battleStop,adjustTimer } from "../timer/timer_event.js";
//////////////////////////////////////////////////////////////
const Battle_Start_Envioroment_ID = '40000001';
const Battle_End_Envioroment_ID = '40000002';
const Battle_Time_Adjust_ID = '80000004';
//////////////////////////////////////////////////////////////

export const logline_battle_start_check = async (log) => {
    if (log[3] === Battle_Start_Envioroment_ID) {
        let time = parseInt(log[4], 16);
        await battleStart(time, log[1]);
    }
    else if (log[3] === Battle_End_Envioroment_ID) {
        await battleStop(log[1]);
    } else if (log[3] === Battle_Time_Adjust_ID) {
        let time = parseInt(log[4], 16);
        await adjustTimer(time, log[1]);
    }  
}