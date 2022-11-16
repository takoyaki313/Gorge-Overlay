import { timestamp_change } from "./logline_other.js";
import { action_Search, actionSplice, insert_maindata_object, update_maindata_change_array } from "../maindataEdit.js";
import { hpdata_add } from "./hpdata.js";
import { Send_Action } from "./loglineGrobal.js";


export const networkAbility_receve = async (log) => {
    let data = {
        nameID: log[2],
        packetID: log[4],
        currenthp: Number(log[5]),
        maxhp: Number(log[6]),
        x_position: log[11],
        y_position: log[12],
        z_position: log[13],
        rotate: log[14],
        lastupdate: log[1],
        time_number: await timestamp_change(log[1])
    };
    let uniqueID = data.packetID + data.nameID;
    if (uniqueID.length !== 16) {
        console.error('37:networkAbility_receve Search_ID Length Error');
        console.error(data);
        return null;
    }
    let db_position = await action_Search('Action_Sync_data', 'uniqueID', uniqueID, true);
    let db_data = null;
    let attackerID = '37_Unknown';
    if (db_position === -1) {
        //console.warn(log);
        await hpdata_add(data.nameID, data, attackerID);
        return null;
    } else {
        db_data = await actionSplice('Action_Sync_data', db_position);
        db_data = db_data[0];
        db_data.time_accept = data.lastupdate;
        insert_maindata_object('Action_Synced_data', db_data);
    }
    //--income damage / heal
    if (db_data.inputname === null) {
        return null;
    }
    let income = await add_accept_target(db_data.inputname, db_data.inputdata, 'income');
    update_maindata_change_array('Player_data', 'nameID', db_data.victimID, income.target, income.data, income.replace);
    let counter = db_data.inputname.indexOf('counter');
    if (counter !== -1) {
        //counter damage include
        let income = await add_accept_target(db_data.inputdata[counter].target, db_data.inputdata[counter].data, 'income');
        update_maindata_change_array('Player_data', 'nameID', db_data.attackerID, income.target, income.data, income.replace);
        attackerID = db_data.C_attackerID
    } else {
        attackerID = db_data.attackerID;
    }
    if (Send_Action) {
        let send = await add_accept_target(db_data.inputname, db_data.inputdata, 'send');
        update_maindata_change_array('Player_data', 'nameID', db_data.attackerID, send.target, send.data, send.replace);
    }
    await hpdata_add(data.nameID, data, attackerID);
}

const  add_accept_target = async (name, data, income) => {
    let rtn = { target: [], data: [], replace: [] };
    let input_str = 'accept_' + income + '_';
    for (let i = 0; i < name.length; i++) {
        if (name[i] !== 'counter'&&name[i] !== 'lastupdate') {
            rtn.target.push(input_str + name[i]);
            rtn.data.push(data[i]);
            rtn.replace.push(false);
        }
    }
    return rtn;
}