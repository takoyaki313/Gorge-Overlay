import { Unique_DoT, Unique_DoT_ID_Array } from "./resource/dotID.js";
import { read_maindata, update_maindata } from "../maindataEdit.js";
import { new_change_accept_damage } from "./24networkDoT.js";
import { timestamp_change } from "./logline_other.js";

const UniqueID_end = 3;
const AcceptMarginTime = 100;

export const network_buff_removerd_30 = async (log) => {
    //Calc Target ID ->52B Wild Fire
    //
    for (let i = UniqueID_end; i < Unique_DoT_ID_Array.length; i++) {
        if (log[2] === Unique_DoT[i].id && log[2] !== 'C67') {//Meteor Drive Exclude
            await unique_buff_remove_action(log, Unique_DoT[i].id, 17500);
        }
    }
}

const unique_buff_remove_action = async (log, dot_name) => {
    let attackerID = log[5];
    let victimID = log[7];
    let lastupdate = log[1];
    let victimhp = 0;
    let victimmaxhp = 48000;
    let read_data = await read_maindata('Player_hp', 'nameID', victimID, dot_name, 'currenthp', 'maxhp');
    if (Object.keys(read_data).length === 0) {
        if (window.devMode.logLevel > 6) {
            console.warn(dot_name + ' Data Not Found');
            console.warn(log);
        }
        return null;
    }
    if (read_data[dot_name] === undefined) {
        if (window.devMode.logLevel > 6) {
            console.log(dot_name + ' Data Not Found [undefined]');
            console.log(log);
        }
        return null;
    }
    if (read_data[dot_name].length === 0) {
        if (window.devMode.logLevel > 6) {
            console.log(dot_name + ' Data Not Found [length = 0]');
            console.log(log);
        }
        return null;
    }
    if (read_data.currenthp !== undefined) {
        victimhp = read_data.currenthp;
    }
    if (read_data.maxhp !== undefined) {
        victimmaxhp = read_data.maxhp;
    }
    let dot_data = read_data[dot_name];
    for (let i = 0; i < dot_data.length; i++) {
        if (lastupdate === dot_data[i].time) {
            let new_data = dot_data.slice(0, i);
            new_data.concat(dot_data.slice(i + 1,));
            await new_change_accept_damage(attackerID, victimID, victimhp, victimmaxhp, dot_data[i].damage, dot_data[i].damage_type, dot_data[i].uniqueID, lastupdate);
            //await change_accept_damage(attackerID,victimID,dot_data[i].victimmaxhp,dot_data[i].damage,dot_data[i].overdamage,attckermaxhp,dot_data[i].damage_type,dot_data[i].uniqueID,lastupdate);
            //await update_maindata('Player_hp','nameID',victimID,[dot_name,new_data,true]);
            return null;
        }
    }
    let now = await timestamp_change(log[1]);
    if (now - dot_data[dot_data.length - 1].time_ms < AcceptMarginTime) {
        now = now - dot_data[dot_data.length - 1].time_ms;
        //console.warn( now +' :Time_recent->' + dot_name);
        await new_change_accept_damage(attackerID, victimID, victimhp, victimmaxhp, dot_data[dot_data.length - 1].damage, dot_data[dot_data.length - 1].damage_type, dot_data[dot_data.length - 1].uniqueID, lastupdate);
        //await change_accept_damage(attackerID,victimID,dot_data[dot_data.length -1].victimmaxhp,dot_data[dot_data.length -1].damage,dot_data[dot_data.length -1].overdamage,attckermaxhp,dot_data[dot_data.length -1].damage_type,dot_data[dot_data.length -1].uniqueID,lastupdate);
        await update_maindata('Player_hp', 'nameID', victimID, [dot_name, dot_data.slice(0, -1), true]);
    }
    else {
        now = now - dot_data[dot_data.length - 1].time_ms;
        if (window.devMode.logLevel > 6) {
            console.warn(dot_name + ':Accept Action Time Not Found->' + now);
            console.warn(log);
        }
    }
}