import { timestamp_change } from "./logline_other.js";
//////////////////////////////////////////////////////////////
const Battle_Start_Envioroment_ID = '40000001';
const Battle_End_Envioroment_ID = '40000002';
//////////////////////////////////////////////////////////////

export const logline_battle_start_check = async (log) => {
    console.log(log);
    if (log[3] === Battle_Start_Envioroment_ID) {
        let time = parseInt(log[4], 16);
        window.BATTLE_EVENT.Battle_Max_Time = time;
        window.BATTLE_EVENT.Battle_Start_Time = await timestamp_change(log[1]);
        //YET  await battle_counter(time);
        window.BATTLE_EVENT.Engage = true;
    }
    else if (log[3] === Battle_End_Envioroment_ID) {
        window.BATTLE_EVENT.Engage = false;
        window.BATTLE_EVENT.Result_Page = true;
        window.BATTLE_EVENT.Result_in_time = await timestamp_change(log[1]);
        //YET  stop_timer();
    }
}