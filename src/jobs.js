import { update_maindata } from "./v4/maindataEdit";
import { AreaData } from ".";

export const damage_revise = async (nameID, job, lastupdate) => {
    if (nameID.substring(0, 2) !== '10') {
        await update_maindata('Player_hp', 'nameID', nameID, ['revise', { damage: 1, income: 1 }, true], ['lastupdate', lastupdate, true]);
        return;
    }
    if (AreaData.Type === 1 || AreaData.Type === 3) {//FL
        let class_A = ['pld', 'drg'];// 20-50
        let class_B = ['mnk','nin','rpr','vpr'];//0-50
        let class_C = ['war', 'gnb', 'sam'];//10-50
        let class_D = ['drk'];//20-40
        //
        let class_E = ['smn','pct','whm','sch','ast'];//10-30
        let class_F = ['brd','mch','dnc','blm','rdm','sge'];//0-30
        if (class_A.indexOf(job) !== -1) {
            await update_maindata('Player_hp', 'nameID', nameID, ['revise', { damage: 0.8, income: 0.5 }, true], ['lastupdate', lastupdate, true]);
        }
        else if (class_B.indexOf(job) !== -1) {
            await update_maindata('Player_hp', 'nameID', nameID, ['revise', { damage: 1, income: 0.5 }, true], ['lastupdate', lastupdate, true]);
        }
        else if (class_C.indexOf(job) !== -1) {
            await update_maindata('Player_hp', 'nameID', nameID, ['revise', { damage: 0.9, income: 0.5 }, true], ['lastupdate', lastupdate, true]);
        }
        else if (class_D.indexOf(job) !== -1) {
            await update_maindata('Player_hp', 'nameID', nameID, ['revise', { damage: 0.8, income: 0.6 }, true], ['lastupdate', lastupdate, true]);
        }
        else if (class_E.indexOf(job) !== -1) {
            await update_maindata('Player_hp', 'nameID', nameID, ['revise', { damage: 0.9, income: 0.7 }, true], ['lastupdate', lastupdate, true]);
        }
        else if (class_F.indexOf(job) !== -1) {
            await update_maindata('Player_hp', 'nameID', nameID, ['revise', { damage: 1, income: 0.7}, true], ['lastupdate', lastupdate, true]);
        }
        else {
            await update_maindata('Player_hp', 'nameID', nameID, ['revise', { damage: 1, income: 1 }, true], ['lastupdate', lastupdate, true]);
        }
    }
    else if (AreaData.Type === 2) {//Gorge
        let class_A = ['pld', 'war', 'drk', 'gnb', 'mnk', 'drg', 'nin', 'sam', 'rpr', 'vpr'];
        //let class_B = ['drg', 'nin'];
        //let class_C = ['rdm'];
        if (class_A.indexOf(job) !== -1) {
            await update_maindata('Player_hp', 'nameID', nameID, ['revise', { damage: 1, income: 0.8 }, true], ['lastupdate', lastupdate, true]);
        }/*
        else if (class_B.indexOf(job) !== -1) {
            await update_maindata('Player_hp', 'nameID', nameID, ['revise', { damage: 1, income: 0.85 }, true], ['lastupdate', lastupdate, true]);
        }
        else if (class_C.indexOf(job) !== -1) {
            await update_maindata('Player_hp', 'nameID', nameID, ['revise', { damage: 1, income: 0.9 }, true], ['lastupdate', lastupdate, true]);
        }*/
        else {
            await update_maindata('Player_hp', 'nameID', nameID, ['revise', { damage: 1, income: 0.9 }, true], ['lastupdate', lastupdate, true]);
        }
    }
    else {
        await update_maindata('Player_hp', 'nameID', nameID, ['revise', { damage: 1, income: 1 }, true], ['lastupdate', lastupdate, true]);
    }
}

export const jobID_to_string = (id) => {
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
        case 41:
            job = 'vpr';
            break;
        case 42:
            job = 'pct';
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