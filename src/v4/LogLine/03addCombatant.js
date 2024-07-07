import { null_check, timestamp_change } from "./logline_other.js";
import { Field_ID } from "./loglineGlobal.js";
import { update_maindata, read_maindata } from "../maindataEdit.js";
import { owner_id_list_add } from "./loglineGlobal.js";
import { job_to_role } from "../../role.js";
import { battleEvent } from "../../index.js";
import { serverList } from "../xivapi/api.js";
import { damage_revise, jobID_to_string } from "../../jobs.js";

export const addcombatant = async (log) => {
    let nameID = log[2].toUpperCase();
    let name = null_check(log[3]);
    let job = jobID_to_string(log[4]);
    let server = null_check(log[8]);
    let owner_id = log[6].toUpperCase();
    //let currenthp = Number(log[9]);
    //let maxhp = Number(log[10]);
    let battle = true;
    let lastupdate = log[1];
    let time_ms = await timestamp_change(lastupdate);
    if (owner_id.length === 8) {
        await owner_id_list_add(owner_id, nameID, name);
        return null;
    }
    else {
        owner_id = null;
    }
    if (nameID !== Field_ID) {
        if (battleEvent.Engage) {
            let readed_data = await read_maindata('Player_data', 'nameID', nameID, 'job');
            if (typeof readed_data.job === 'string') {
                if (job !== readed_data.job) {//違うので保存する
                    await update_maindata('Player_data', 'nameID', nameID, ['name', name, true], ['job', job, true], ['jobhistory', { job: readed_data.job, role: job_to_role(readed_data.job), to: job, torole: job_to_role(job), time: Math.round((time_ms - battleEvent.timer.Get_BattleStart) / 1000), lasttime: time_ms, stamp: lastupdate }, false], ['server', server, true], ['battle', battle, true], ['add_combatant_time', { battle: true, time: time_ms, stamp: lastupdate }, false], ['ownerID', owner_id, true], ['lastupdate', lastupdate, true]);
                }
                else {
                    await update_maindata('Player_data', 'nameID', nameID, ['name', name, true], ['job', job, true], ['server', server, true], ['battle', battle, true], ['add_combatant_time', { battle: true, time: time_ms, stamp: lastupdate }, false], ['ownerID', owner_id, true], ['lastupdate', lastupdate, true]);
                }
            } else {//Not Found 
                let dc = "";
                if (server !== "") {
                    if (typeof (serverList[server]) !== 'undefined') {
                        dc = serverList[server].dc;
                    }
                }
                await update_maindata('Player_data', 'nameID', nameID, ['name', name, true], ['job', job, true], ['server', server, true], ['battle', battle, true], ['add_combatant_time', { battle: true, time: time_ms, stamp: lastupdate }, false], ["dc_server", dc, true], ['ownerID', owner_id, true], ['lastupdate', lastupdate, true]);
            }
        } else {
            //Before Engage
            let dc = "";
            if (server !== "") {
                if (typeof (serverList[server]) !== 'undefined') {
                    dc = serverList[server].dc;
                }
            }
            await update_maindata('Player_data', 'nameID', nameID, ['name', name, true], ['job', job, true], ['server', server, true], ['battle', battle, true], ['add_combatant_time', { battle: true, time: time_ms, stamp: lastupdate }, false], ["dc_server", dc, true], ['ownerID', owner_id, true], ['lastupdate', lastupdate, true]);
        }
    }
    if (job !== null) {
        await damage_revise(nameID, job, lastupdate);
    }
    await update_maindata('Player_hp', 'nameID', nameID, ['attacker', [], true]);
}