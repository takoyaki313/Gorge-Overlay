import { timestamp_change } from "./logline_other.js";
import { pet_replace } from "./loglineGlobal.js";
import { update_maindata } from "../maindataEdit.js";
import { battleEvent } from "../../index.js";

export const kill_death_main_25 = async (log) => {
    let pertcheck = await pet_replace(log[4],log[5]);
    let data = {
        attackerID: pertcheck.nameID,
        attacker: pertcheck.name,
        attacker_type: log[4].substring(0, 2) === '10' ? 'player' : 'npc',
        victimID: log[2],
        victim: log[3],
        victim_type: log[2].substring(0, 2) === '10' ? 'player' : 'npc',
        lastupdate: log[1]
    };
    /*
    if (data.attacker_type === 'npc') {//もしペットIDならIDと名前を本人に入れ替える。
        let searched = await owner_id_list_search(data.attackerID);
        if (searched !== null) {
            data.attackerID = searched;
            data.attacker_type = await npc_check_nameID(searched);
            let db = await read_maindata('Player_data', 'nameID', data.attackerID, 'name');
            if (db !== null) {
                data.attacker = db.name;
            }
        }
        else if (data.attacker.indexOf('チェイサー') !== -1 || data.attacker.indexOf('オプレッサー') !== -1 || data.attacker.indexOf('分身') !== -1) {
            if (devMode.logLevel > 1) {
                console.warn('Warn : ペットの情報がマージされませんでした。' + data.attacker + ':' + data.attackerID);
                console.warn(log);
            }
        }
    }
    */
    if (data.victim_type === 'player') {
        let time_number = await timestamp_change(data.lastupdate);
        let time = Math.round((time_number - battleEvent.timer.Get_BattleStart) / 1000);
        await update_maindata('Player_data', 'nameID', data.attackerID, ['kill', 1, false], ['kill_name', { toID: data.victimID, name: data.victim, lastupdate: data.lastupdate, time_number: time_number, time: time }, false], ['lastupdate', data.lastupdate, true]);
        await update_maindata('Player_data', 'nameID', data.victimID, ['death', 1, false], ['death_name', { fromID: data.attackerID, name: data.attacker, lastupdate: data.lastupdate, time_number: time_number, time: time }, false], ['lastupdate', data.lastupdate, true]);
    }
}