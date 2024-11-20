import { Special_Barrier_ID_Array_Dot, Special_Barrier_ID } from "./resource/barrierID.js";
import { read_maindata, update_maindata } from "../maindataEdit.js";
import { potential_to_damage_calc_effect, effectdata_force4 } from "./21_22_networkActionSync.js";
import { new_change_accept_damage } from "./24networkDoT.js";
import { timestamp_change } from "./logline_other.js";
import { Stack_buff, TensyonID, TensyonMax } from "./loglineGlobal.js";
import { devMode } from "../../index.js";
import { AreaData } from "../../index.js";
import { enemyPartyQueue_Push } from "./loglineClock.js";
import { EFFECT_ID_LIST, EFFECT_ID } from "./resource/effectID.js";

export const player_buff_add_26 = async (log) => {
    let data = { buffID: await buffID_coordinate(log[2]), attacker: log[5], victim: log[7], buff: log[3], time: Number(log[4]), time_ms: await timestamp_change(log[1]), lastupdate: log[1], alliance: 0 };
    if (Stack_buff.indexOf(data.buffID) !== -1) {
        data.buffID = log[9] + data.buffID;
    }
    let special = Special_Barrier_ID_Array_Dot.indexOf(data.buffID);
    if (special !== -1) {
        let player_effect = await read_maindata('Player_hp', 'nameID', data.victim, 'effect', 'currenthp', 'maxhp');
        let victim = { currenthp: player_effect.currenthp, maxhp: player_effect.maxhp, nameID: data.victim };
        if (typeof victim.maxhp !== 'number') {
            victim.currenthp = 33333;
            victim.maxhp = 11111;
            //DUMMY
            if (devMode.logLevel > 1) {
                console.warn('26:VICTIM DUMMY_HP APPLY');
            }
        }
        //let attacker = await read_maindata('Player_hp','nameID',data.attacker,data.buffID,'currenthp','maxhp');
        let barrier = await potential_to_damage_calc_effect(data.attacker, data.victim, Special_Barrier_ID[special].potential, 'HoT');
        await new_change_accept_damage(data.attacker, data.victim, victim.currenthp, victim.maxhp, barrier, 'Kardia-barrier', data.buffID + data.lastupdate + data.attacker + data.victim, data.lastupdate);
    }
    //Meteor Drive
    if (data.buffID === '0C67') {
        data.hit = 3;
        await update_maindata('Player_hp', 'nameID', log[7], ['effect', data, false], [data.buffID, data, false], ['lastupdate', log[1], true]);
    }
    else {
        await update_maindata('Player_hp', 'nameID', log[7], ['effect', data, false], ['lastupdate', log[1], true]);
    }
    //simulation enemy party
    if (AreaData.Type === 2) {//gorge
        if (data.buffID.indexOf(TensyonID) !== -1 || data.buffID.indexOf(TensyonMax) !== -1) {
            let read_data = await read_maindata('Player_data', 'nameID', data.victim, 'alliance');
            if (typeof read_data.alliance === 'number') {
                data.alliance = read_data.alliance;
            }
            if (data.alliance <= 0) {
                enemyPartyQueue_Push(data);
            }
        }
    }
    if (devMode.buffRegisterMode) {
        await buff_RegisterSampleCreate(log);
    }
}

export const buffID_coordinate = async (id) => {
    if (id.length > 4) {
        return id.substring(id.length - 4, id.length);
    } else if (id.length < 4) {
        return await effectdata_force4(id);
    }
    else if (id.length === 4) {
        return id;
    }
}

const buff_RegisterSampleCreate = async (log) => {
    let buff_detail = { buff: log[3], buffID: log[2], buffID_cordinate: await buffID_coordinate(log[2],), job: "", name: log[6] }
    let playerJob = await read_maindata('Player_data', 'nameID', log[5], 'job');
    if (typeof playerJob.job === 'string') {
        buff_detail.job = playerJob.job;
    }
    if (!Buff_ID_LIST.data.has(buff_detail.buffID)) {
        console.log(log);
        Buff_ID_LIST.data.set(buff_detail.buffID, buff_detail)
    }
}

class BUFF_ID_LIST_ROOT {
    constructor() {
        this.data = new Map();
    }
    Export = async () => {
        try {
            const fileHandle = await window.showSaveFilePicker({
                suggestedName: "BUFF_ID_LIST" + "_" + Date.now() + ".csv",
            });

            const writableStream = await fileHandle.createWritable();

            let writeData = [["buffID", "buff", "cordinateID", "job", "name", "list"]];
            for (const val of this.data.values()) {
                let row = [];
                row.push(val.buffID);
                row.push(val.buff);
                row.push(val.buffID_cordinate);
                row.push(val.job);
                row.push(val.name);
                if (EFFECT_ID_LIST.indexOf(val.buffID_cordinate) !== -1) {
                    let id_detail = EFFECT_ID[val.buffID_cordinate];
                    row.push(id_detail.name);
                }
                writeData.push(row.join(','));
            }
            await writableStream.write(writeData.join('\n'));
            await writableStream.close();

            console.log("CSV-Save-OK");
        } catch (error) {
            console.error("CSV-Save-Error: " + error.message);
        }
    }
}

const Buff_ID_LIST = new BUFF_ID_LIST_ROOT();
window.BUFF_ID_LIST = Buff_ID_LIST;