import { Special_Barrier_ID_Array_Dot, Special_Barrier_ID } from "./resource/barrierID.js";
import { read_maindata, update_maindata } from "../maindataEdit.js";
import { potencial_to_damage_calc_effect, effectdata_force4 } from "./21_22_networkActionSync.js";
import { new_change_accept_damage } from "./24networkDoT.js";
import { timestamp_change } from "./logline_other.js";
import { Stack_buff } from "./loglineGrobal.js";

export const player_buff_add_26 = async (log) => {
    let data = { buffID: await buffID_cordinate(log[2]), attacker: log[5], victim: log[7], buff: log[3], time: Number(log[4]), time_ms: await timestamp_change(log[1]), lastupdate: log[1] };
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
            if (window.devMode.logLevel > 1) {
                console.warn('26:VICTIM DUMMY_HP APPLY');
            }
        }
        //let attacker = await read_maindata('Player_hp','nameID',data.attacker,data.buffID,'currenthp','maxhp');
        let barrier = await potencial_to_damage_calc_effect(data.attacker, data.victim, Special_Barrier_ID[special].potencial, 'HoT');
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
}

export const buffID_cordinate = async (id) => {
    if (id.length > 4) {
        return id.substring(id.length - 4, id.length);
    } else if (id.length < 4) {
        return await effectdata_force4(id);
    }
    else if (id.length === 4) {
        return id;
    }
}