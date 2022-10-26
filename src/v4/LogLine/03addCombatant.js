import { null_check, timestamp_change } from "./logline_other.js";
import { Field_ID } from "./loglineGrobal.js";
import { update_maindata,read_maindata } from "../maindataEdit.js";
import { owner_id_list_add } from "./loglineGrobal.js";

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
        if (window.BATTLE_EVENT.Engage) {
            let readed_data = await read_maindata('Player_data', 'nameID', nameID, 'job');
            if (typeof readed_data.job === 'string') {
                if (job !== readed_data.job) {//違うので保存する
                    await update_maindata('Player_data', 'nameID', nameID, ['name', name, true], ['job', job, true], ['jobhistory', { job: readed_data.job, to: job, time: Math.round((time_ms - window.BATTLE_EVENT.Battle_Start_Time) / 1000), lasttime: time_ms, stamp: lastupdate }, false], ['server', server, true], ['battle', battle, true], ['add_combatant_time', { battle: true, time: time_ms, stamp: lastupdate }, false], ['ownerID', owner_id, true], ['lastupdate', lastupdate, true]);
                }
                else {
                    await update_maindata('Player_data', 'nameID', nameID, ['name', name, true], ['job', job, true], ['server', server, true], ['battle', battle, true], ['add_combatant_time', { battle: true, time: time_ms, stamp: lastupdate }, false], ['ownerID', owner_id, true], ['lastupdate', lastupdate, true]);
                }
            } else {//
                await update_maindata('Player_data', 'nameID', nameID, ['name', name, true], ['job', job, true], ['server', server, true], ['battle', battle, true], ['add_combatant_time', { battle: true, time: time_ms, stamp: lastupdate }, false], ['ownerID', owner_id, true], ['lastupdate', lastupdate, true]);
            }
        } else {
            await update_maindata('Player_data', 'nameID', nameID, ['name', name, true], ['job', job, true], ['server', server, true], ['battle', battle, true], ['add_combatant_time', { battle: true, time: time_ms, stamp: lastupdate }, false], ['ownerID', owner_id, true], ['lastupdate', lastupdate, true]);
        }
    }
    if (job !== null) {
        await damage_revise(nameID, job, lastupdate);
    }
    await update_maindata('Player_hp', 'nameID', nameID, ['attacker', [], true]);
    /*if (nameID.substring(0, 2) === '10') {
        if (name !== '' && job !== '') {
            NameID_Name_JobList[nameID] = { name: name, job: job, server: server, owner: owner_id };
        }
    }*/
}

const damage_revise = async (nameID, job, lastupdate) => {
    if (window.Area.Type === 1 || window.Area.Type === 3) {//FL
        let class_A = ['pld', 'war', 'drk', 'gnb', 'mnk', 'sam', 'rpr', 'drg', 'nin'];
        let class_B = ['whm', 'sch', 'smn'];
        //let class_C = ['rdm'];
        if (class_A.indexOf(job) !== -1) {
            await update_maindata('Player_hp', 'nameID', nameID, ['revise', { damage: 1, income: 0.4 }, true], ['lastupdate', lastupdate, true]);
        }
        else if (class_B.indexOf(job) !== -1) {
            await update_maindata('Player_hp', 'nameID', nameID, ['revise', { damage: 0.9, income: 0.7 }, true], ['lastupdate', lastupdate, true]);
        }/*
        else if (class_C.indexOf(job) !== -1) {
            await update_maindata('Player_hp','nameID',nameID,['revise',{damage:1,income:0.8},true],['lastupdate',lastupdate,true]);
        }*/
        else {
            await update_maindata('Player_hp', 'nameID', nameID, ['revise', { damage: 1, income: 0.7 }, true], ['lastupdate', lastupdate, true]);
        }
    }
    else if (window.Area.Type === 2) {//Gorge
        let class_A = ['pld', 'war', 'drk', 'gnb', 'mnk', 'sam', 'rpr', 'drg', 'nin'];
        //let class_B = ['drg', 'nin'];
        //let class_C = ['rdm'];
        if (class_A.indexOf(job) !== -1) {
            await update_maindata('Player_hp', 'nameID', nameID, ['revise', { damage: 1, income: 0.7 }, true], ['lastupdate', lastupdate, true]);
        }/*
        else if (class_B.indexOf(job) !== -1) {
            await update_maindata('Player_hp', 'nameID', nameID, ['revise', { damage: 1, income: 0.85 }, true], ['lastupdate', lastupdate, true]);
        }
        else if (class_C.indexOf(job) !== -1) {
            await update_maindata('Player_hp', 'nameID', nameID, ['revise', { damage: 1, income: 0.9 }, true], ['lastupdate', lastupdate, true]);
        }*/
        else {
            await update_maindata('Player_hp', 'nameID', nameID, ['revise', { damage: 1, income: 0.85 }, true], ['lastupdate', lastupdate, true]);
        }
    }
    else {
        await update_maindata('Player_hp', 'nameID', nameID, ['revise', { damage: 1, income: 1 }, true], ['lastupdate', lastupdate, true]);
    }
}

const  jobID_to_string = (id) => {
    if (typeof id === 'string') {
        id = parseInt(id, 16);
    }
    let job = null;
    switch (id) {
        case 0:
            job = null;
            break;
        case 1:
            job = 'gla';
            break;
        case 2:
            job = 'pgl';
            break;
        case 3:
            job = 'mrd';
            break;
        case 4:
            job = 'lnc';
            break;
        case 5:
            job = 'arc';
            break;
        case 6:
            job = 'cnj';
            break;
        case 7:
            job = 'thm';
            break;
        case 8:
            job = 'crp';
            break;
        case 9:
            job = 'bsm';
            break;
        case 10:
            job = 'arm';
            break;
        case 11:
            job = 'gsm';
            break;
        case 12:
            job = 'ltw';
            break;
        case 13:
            job = 'wvr';
            break;
        case 14:
            job = 'alc';
            break;
        case 15:
            job = 'cul';
            break;
        case 16:
            job = 'nin';
            break;
        case 17:
            job = 'btn';
            break;
        case 18:
            job = 'fsh';
            break;
        case 19:
            job = 'pld';
            break;
        case 20:
            job = 'mnk';
            break;
        case 21:
            job = 'war';
            break;
        case 22:
            job = 'drg';
            break;
        case 23:
            job = 'brd';
            break;
        case 24:
            job = 'whm';
            break;
        case 25:
            job = 'blm';
            break;
        case 26:
            job = 'acn';
            break;
        case 27:
            job = 'smn';
            break;
        case 28:
            job = 'sch';
            break;
        case 29:
            job = 'rog';
            break;
        case 30:
            job = 'nin';
            break;
        case 31:
            job = 'mch';
            break;
        case 32:
            job = 'drk';
            break;
        case 33:
            job = 'ast';
            break;
        case 34:
            job = 'sam';
            break;
        case 35:
            job = 'rdm';
            break;
        case 36:
            job = 'bdm';
            break;
        case 37:
            job = 'gnb';
            break;
        case 38:
            job = 'dnc';
            break;
        case 39:
            job = 'rpr';
            break;
        case 40:
            job = 'sge';
            break;
        case 50:
            job = 'opp';
            break;
        case 51:
            job = 'che';
            break;
        case 52:
            job = 'jas';
            break;
        default:
            job = null;
    }
    return job;
}