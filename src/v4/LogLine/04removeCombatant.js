import { update_maindata } from "../maindataEdit.js";
import { timestamp_change } from "./logline_other.js";
import { Field_ID } from "./loglineGrobal.js";

export const removecombatant = async (log) => {
    let nameID = log[2].toUpperCase();
    //let name = null_check(log[3]);
    //let job = jobID_to_string(log[4]);
    //let server = null_check(log[8]);
    let owner_id = log[6].toUpperCase();
    //let currenthp = Number(log[9]);
    //let maxhp = Number(log[10]);
    let battle = false;
    let lastupdate = log[1];
    let time_ms = await timestamp_change(lastupdate);
    if (owner_id !== '0000') {
        return null;
        //owner_id_list_add(owner_id,nameID,name);
    }
    if (nameID !== Field_ID) {
        await update_maindata('Player_data', 'nameID', nameID, ['battle', battle, true], ['add_combatant_time', { battle: false, time: time_ms, stamp: lastupdate }, false], ['lastupdate', lastupdate, true]);
    }
    await update_maindata('Player_hp', 'nameID', nameID, ['attacker', [], true]);
}