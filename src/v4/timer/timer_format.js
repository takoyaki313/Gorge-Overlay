import { owner_id_list_reset } from "../LogLine/loglineGrobal";

export const time_change = (time_sec) => {
    let division_time = [0, 0];

    if(time_sec < 0){
        return division_time;
    }

    division_time[0] = Math.trunc(time_sec / 60);
    const temp = division_time[0] * 60;
    division_time[1] = time_sec - temp;
    if (division_time[1] < 10) {
        division_time[1] = "0" + division_time[1];
    }
    return division_time;
}

export class battle_event {
    constructor() {
        this.Engage = false;
        this.Result_Page = false;
        this.Timer_Start = false;
        this.Battle_Start_Time = 0; //Important
        this.Alliance_Data_24 = false;
        this.TenSyonMax_Me = false;
        this.encounterStart = false;
        this.timer = new timer();
    }

    set reset(run) {
        if (run) {
            this.Engage = false;
            this.Result_Page = false;
            this.Timer_Start = false;
            this.Battle_Start_Time = 0;
            this.Alliance_Data_24 = false;
            this.TenSyonMax_Me = false;
            this.encounterStart = false;
            owner_id_list_reset();

            this.timer.reset();
        }
    }

}

class timer {
    constructor() {
        this.time = 0;
        this.BattleStartTime = 0;
        this.Result_in_time = 0;
        this.Battle_Max_Time_num = 0;
        this.LastAdjustCurrentTime = {time:0,ref:0};
    }
    set reset(bool) {
        this.time = 0;
        this.BattleStartTime = 0;
        this.Result_in_time = 0;
        this.Battle_Max_Time_num = 0;
        this.LastAdjustCurrentTime = {time:0,ref:0};
    }
    
    set Set_BattleStart(time_ms) {
        if (this.Result_in_time === 0) {
            this.BattleStartTime = time_ms;
        }
        else {
            console.error('Timer StartTime Error->', time_ms);
        }
    }
    
    get Get_BattleStart() {
        return (this.BattleStartTime);
    }

    set Set_ResultIn(time_ms) {
        if (this.BattleStartTime < time_ms) {
            this.Result_in_time = time_ms;
        }
        else {
            console.error('Timer Result_in_time Error->', time_ms);
        }
    }
    
    get Get_ResultIn() {
        return (this.Result_in_time);
    }
    get Get_EncTime() {
        return (encTime(this));
    }

    get Get_RemainTime() {
        if (this.LastAdjustCurrentTime.time > 0){
            return(this.LastAdjustCurrentTime.time - Math.floor((Date.now() - timer.LastAdjustCurrentTime.ref)/1000))
        } else if (this.Battle_Max_Time_num > 0) {
            return(this.Battle_Max_Time_num - Math.floor((Date.now() - timer.BattleStartTime)/1000))
        } else {
            //Unknown 
            return (encTime(this));
        }
    }
    set Set_BattleMaxTime(time) {
        this.Battle_Max_Time_num = time;
    }
    set Set_AdjustTime(time) {
        this.LastAdjustCurrentTime = { time: time.time, ref: time.ref };
    }
    set Set_Time(add) {
        this.time += add;
    }
    get Get_Time() {
        return (this.time);
    }
}

const encTime = (timer) => {
    if (timer.BattleStartTime === 0) {
        return (1);
    }
    if (timer.Result_in_time === 0) {
        return(Math.ceil((Date.now() - timer.BattleStartTime)/1000))
    }
    return(Math.ceil((timer.Result_in_time - timer.BattleStartTime)/1000))
}