import { battleEvent, AreaData } from "..";

import { timestamp_change } from "./LogLine/logline_other";
import { TBD } from "./maindataFormat";

//export const Kind = ['damage_kind', 'heal_kind', 'accept_income_heal_kind', 'accept_income_damage_kind'];//重複を許可しない.要素は文字列だけ

export const insert_maindata = async (target, keyname, key, ...data) => {//データの新規追加ONLY
    let input = { [keyname]: key };
    for (let i = 0; i < data.length; i++) {
        input[data[i][0]] = data[i][1];
    }
    TBD[target].push(input);
}

export const insert_maindata_object = async (target, obj) => {//データの新規追加ONLY 連想配列をそのまま
    TBD[target].push(obj);
}
//////////////////
export const update_maindata = async (target, keyname, key, ...data) => {
    await New_update_maindata(target, keyname, key, data);
}

export const update_maindata_change_array = async (target, keyname, key, name, data, replace) => {
    let rtn = [];
    for (let i = 0; i < name.length; i++) {
        if (data[i] !== undefined) {
            if (typeof data[i] === 'number') {
                if (isNaN(data[i])) {
                    console.error('DataSpace include "NaN"');
                    console.error(name);
                    console.error(data);
                    console.error(replace);
                    //console.error(Log);
                    return null;
                }
            }
            rtn.push([name[i], data[i], replace[i]]);
        } else {
            console.error('DataSpace undefined Include');
            console.error(name);
            console.error(data);
            console.error(replace);
            return null;
        }
    }
    await New_update_maindata(target, keyname, key, rtn);
}

export const New_update_maindata = async (target, keyname, key, data) => {//データの更新含む
    //let position = TBD[target].findIndex(({nameID}) => nameID === key);
    let position = await searched_maindata(target, keyname, key);
    if (position === -1) {//存在しないとき
        TBD[target].push({ [keyname]: key, AreaType: AreaData.battleType });
        position = await searched_maindata(target, keyname, key);
        if (position === -1) {
            console.error('Error : New Data create failed... [keyname]->' + key);
            console.error(data);
            return null;
        }
    }
    let target_playerData = TBD[target][position];
    await New_update_maindata_process(target_playerData, data);

    //robot data 
    if (AreaData.Type === 2) {//Hidden Gorge
        if (target === 'Player_data') {
            if (typeof target_playerData.robot === 'boolean') {
                if (target_playerData.robot) {
                    let data_robot = target_playerData.robot_data[target_playerData.robot_data.length - 1].data;
                    await New_update_maindata_process(data_robot, data, true);
                }
            }
        }
    }
}

const New_update_maindata_process = async (update_target, data, isRobot = false) => {
    for (let i = 0; i < data.length; i++) {
        if (data[i][0] === 'robot_data' && isRobot) {
            //skip
        }
        else if (data[i][2]) {//replace
            update_target[data[i][0]] = data[i][1];
        }
        else {//add
            if (typeof update_target[data[i][0]] === 'undefined') {
                if (typeof data[i][1] === 'number') {
                    update_target[data[i][0]] = 0;
                }
                else if (typeof data[i][1] === 'string') {
                    //db_data[data[i][0]] = '' ;
                    update_target[data[i][0]] = [];
                }
                else if (data[i][1] instanceof Object) {
                    update_target[data[i][0]] = [];
                }
            }
            if (typeof data[i][1] === 'number') {
                update_target[data[i][0]] += data[i][1];
            }
            else if (typeof data[i][1] === 'string') {
                update_target[data[i][0]].push(data[i][1]);
            }
            else if (data[i][1] instanceof Object) {
                update_target[data[i][0]].push(data[i][1]);
            }
            else {
                console.error('Error : Input Data is typeof Unknown ->' + typeof data[i][1] + ':' + data[i][1] + 'i = ' + i);
                console.error(data);
            }
        }
    }
}

export const actionSplice = async (target, position) => {
    return TBD[target].splice(position, 1);
}

export const action_Search = async (target, searchkey, searchdata, part) => {
    for (let i = TBD[target].length - 1; i > 0; i--) {
        if (part) {
            if (TBD[target][i][searchkey].substring(0, searchdata.length) === searchdata) {
                return i;
            }
        } else {
            if (TBD[target][i][searchkey] === searchdata) {
                return i;
            }
        }
    }
    return -1;
}

export const searched_maindata = async (target, keyname, key) => {
    for (let i = TBD[target].length - 1; i >= 0; i--) {
        if (TBD[target][i][keyname] === key) {
            return i;
        }
    }
    return -1;
}

export const alliance_dynamis_update = async (nameID, dynamis, time) => {
    if (nameID.substring(0, 2) === '10') {
        let read_data = await read_maindata('Player_data', 'nameID', nameID, 'alliance');
        if (typeof read_data.alliance === 'number') {
            var number = read_data.alliance;
        } else {
            return null;
        }
        if (number > 0 && number < 7) {

        } else {
            return null;
        }
        if (AreaData.Type === 2 && battleEvent.Engage) {
            if (TBD.Alliance[number].dynamis !== dynamis) {
                if (dynamis === 20 && number === 1) {
                    battleEvent.TenSyonMax_Me = true;
                }
                TBD.Alliance[number].history.push({ from: TBD.Alliance[number].dynamis, to: dynamis, time: Math.round((await timestamp_change(time) - battleEvent.timer.Get_BattleStart) / 1000) });
                TBD.Alliance[number].dynamis = dynamis;
            }
        }
    }
}

export const read_maindata = async (target, keyname, key, ...data) => {
    let return_data = {};
    let position = await searched_maindata(target, keyname, key);
    if (position === -1) {
        return {};
    }
    if (typeof TBD[target][position] !== 'undefined') {
        for (let i = 0; i < data.length; i++) {
            return_data[data[i]] = TBD[target][position][data[i]];
        }
    }
    return return_data;
}