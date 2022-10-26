import { timestamp_change } from "./LogLine/logline_other";

export const Kind = ['damage_kind', 'heal_kind', 'accept_income_heal_kind', 'accept_income_damage_kind'];//重複を許可しない.要素は文字列だけ

export const insert_maindata = async (target, keyname, key, ...data) => {//データの新規追加ONLY
    let input = { [keyname]: key };
    for (let i = 0; i < data.length; i++) {
        input[data[i][0]] = data[i][1];
    }
    window.TBD[target].push(input);
}

export const insert_maindata_object = async (target, obj) => {//データの新規追加ONLY 連想配列をそのまま
    window.TBD[target].push(obj);
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
        window.TBD[target].push({ [keyname]: key });
        position = await searched_maindata(target, keyname, key);
        if (position === -1) {
            console.error('Error : New Data create failed... [keyname]->' + key);
            console.error(data);
            return null;
        }
    }
    for (let i = 0; i < data.length; i++) {
        if (data[i][2]) {//replace
            window.TBD[target][position][data[i][0]] = data[i][1];
        }
        else {//add
            //console.log(typeof db_data[data[i][0]]);
            if (typeof window.TBD[target][position][data[i][0]] === 'undefined') {
                if (typeof data[i][1] === 'number') {
                    window.TBD[target][position][data[i][0]] = 0;
                }
                else if (typeof data[i][1] === 'string') {
                    //db_data[data[i][0]] = '' ;
                    window.TBD[target][position][data[i][0]] = [];
                }
                else if (data[i][1] instanceof Object) {
                    window.TBD[target][position][data[i][0]] = [];
                }
            }
            if (typeof data[i][1] === 'number') {
                window.TBD[target][position][data[i][0]] += data[i][1];
            }
            else if (typeof data[i][1] === 'string') {
                //db_data[data[i][0]] += data[i][1];
                window.TBD[target][position][data[i][0]].push(data[i][1]);
            }
            else if (data[i][1] instanceof Object) {
                if (data[i][1] instanceof Array) {
                    if (Kind.indexOf(data[i][0] !== -1)) {
                        window.TBD[target][position][data[i][0]] = window.TBD[target][position][data[i][0]].concat(data[i][1]);
                    } else {
                        window.TBD[target][position][data[i][0]].push(data[i][1]);
                    }
                } else {
                    window.TBD[target][position][data[i][0]].push(data[i][1]);
                }
            }
            else {
                console.error('Error : Input Data is typeof Unknown ->' + typeof data[i][1] + ':' + data[i][1] + 'i = ' + i);
                console.error(data);
            }
        }
    }
    //robot data を詳細にするためのもの
    if (window.Area.Type === 2) {//Hidden Gorge
        if (target === 'Player_data') {
            if (typeof window.TBD[target][position].robot === 'boolean') {
                if (window.TBD[target][position].robot) {//ロボ中のとき
                    //input
                    let data_robot = window.TBD[target][position].robot_data[window.TBD[target][position].robot_data.length - 1].data;
                    for (let i = 0; i < data.length; i++) {
                        if (data[i][2]) {//replace
                            //TBD[target][position].robot_data[TBD[target][position].robot_data.length - 1].data[data[i][0]] = data[i][1];
                        }
                        else if (data[i][0] === 'robot_data') {
                            //Circular reference
                        }
                        else {//add
                            if (typeof data_robot[data[i][0]] === 'undefined') {
                                if (typeof data[i][1] === 'number') {
                                    data_robot[data[i][0]] = 0;
                                }
                                else if (typeof data[i][1] === 'string') {
                                    //db_data[data[i][0]] = '' ;
                                    data_robot[data[i][0]] = [];
                                }
                                else if (data[i][1] instanceof Object) {
                                    data_robot[data[i][0]] = [];
                                }
                            }
                            if (typeof data[i][1] === 'number') {
                                data_robot[data[i][0]] += data[i][1];
                            }
                            else if (typeof data[i][1] === 'string') {
                                //db_data[data[i][0]] += data[i][1];
                                data_robot[data[i][0]].push(data[i][1]);
                            }
                            else if (data[i][1] instanceof Object) {
                                if (data[i][1] instanceof Array) {
                                    if (Kind.indexOf(data[i][0] !== -1)) {
                                        window.TBD[target][position][data[i][0]] = window.TBD[target][position][data[i][0]].concat(data[i][1]);
                                    } else {
                                        window.TBD[target][position][data[i][0]].push(data[i][1]);
                                    }
                                } else {
                                    window.TBD[target][position][data[i][0]].push(data[i][1]);
                                }
                            }
                            else {
                                console.error('Error : Input Data is typeof Unknown ->' + typeof data[i][1] + ':' + data[i][1]);
                                console.error(data);
                            }
                        }
                    }
                }
            }
        }
    }
}

export const actionSplice = async (target, potision) => {
    return window.TBD[target].splice(potision, 1);
}

export const action_Search = async (target, searchkey, searchdata, part) => {
    for (let i = window.TBD[target].length - 1; i > 0; i--) {
        if (part) {
            if (window.TBD[target][i][searchkey].substring(0, searchdata.length) === searchdata) {
                return i;
            }
        } else {
            if (window.TBD[target][i][searchkey] === searchdata) {
                return i;
            }
        }
    }
    return -1;
}

export const searched_maindata = async (target, keyname, key) =>{
    for (let i = window.TBD[target].length - 1; i >= 0; i--) {
        if (window.TBD[target][i][keyname] === key) {
            return i;
        }
    }
    return -1;
}

export const aliance_dunamis_update = async (nameID, dunamis, time) => {
    if (nameID.substring(0, 2) === '10') {
        let read_data = await read_maindata('Player_data', 'nameID', nameID, 'aliance');
        if (typeof read_data.aliance === 'number') {
            var number = read_data.aliance;
        } else {
            return null;
        }
        if (number > 0 && number < 7) {

        } else {
            return null;
        }
        if (window.Area.Type === 2 && window.BATTLE_EVENT.Engage) {
            if (window.TBD.Aliance[number].dunamis !== dunamis) {
                if (dunamis === 20 && number === 1) {
                    window.BATTLE_EVENT.TenSyonMax_Me = true;
                }
                window.TBD.Aliance[number].history.push({ from: window.TBD.Aliance[number].dunamis, to: dunamis, time: Math.round((await timestamp_change(time) - window.BATTLE_EVENT.Battle_Start_Time) / 1000) });
                window.TBD.Aliance[number].dunamis = dunamis;
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
    if (typeof window.TBD[target][position] !== 'undefined') {
        for (let i = 0; i < data.length; i++) {
            return_data[data[i]] = window.TBD[target][position][data[i]];
        }
    }
    return return_data;
}