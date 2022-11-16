import { read_maindata, update_maindata_change_array, update_maindata } from "../maindataEdit.js";
import { assist_main } from "./assistSimulation.js";
import { EFFECT_ID, EFFECT_ID_LIST } from "./resource/effectID.js";
import { Chaiser_HP, Oppresor_HP, Justice_HP, EXCLUDE_BUFF } from "./loglineGrobal.js";

import { simulationKDA } from "../maindataFormat.js";

const Assist_Debuff_Reset = false;
const HP_Update_duplite_data = true;
const HP_Update_duplite_robride_process = false;

export const hpdata_add = async (nameID, player_data, attackerID) => {
    let dataname = [];
    let datavalue = [];
    let datareplace = [];
    if (player_data.currenthp === undefined) {
        if (window.devMode.logLevel > 12) {
            console.error('Hp Data is undefined');
            console.error(player_data);
        }
        return null;
    }
    if (player_data.maxhp === 0) {
        dataname = ['currenthp', 'lastupdate', 'time_number'];
        datavalue = [player_data.currenthp, player_data.lastupdate, player_data.time_number];
        datareplace = [true, true, true];
    }
    else {
        dataname = ['currenthp', 'maxhp', 'lastupdate', 'time_number'];
        datavalue = [player_data.currenthp, player_data.maxhp, player_data.lastupdate, player_data.time_number];
        datareplace = [true, true, true, true];
    }
    if (attackerID === undefined || attackerID === ' log_38 ' || attackerID === 'unknown ' || attackerID === null || attackerID === ' 37_heal' || attackerID === nameID) {
    }
    else {
        dataname.push('attacker');
        datavalue.push({ attacker: attackerID, type: 'action' });
        datareplace.push(false);
    }
    //let position = await hp_data_db_add(player_data);
    //await update_maindata('Player_data','nameID',nameID,['hphistory',position.toString(),false],['lastupdate',player_data.lastupdate,true]);
    let readed_data = await read_maindata('Player_hp', 'nameID', nameID, 'nameID', 'currenthp', 'maxhp', 'time_number', 'effect', 'attacker');
    if (Object.keys(readed_data).length === 0) {
        //new create :data not found
        await update_maindata_change_array('Player_hp', 'nameID', nameID, dataname, datavalue, datareplace);
    } else {
        let apply_hpupdate = false;
        let temp_time = player_data.time_number - readed_data.time_number;
        if (temp_time > 0) {//timestamp OK
            apply_hpupdate = true;
        } else if (temp_time === 0) {//timestamp duplite
            if (HP_Update_duplite_data) {
                apply_hpupdate = true;
            }
        }
        else {//old data
            //no action
        }
        ////

        if (apply_hpupdate) {
            if (player_data.currenthp === player_data.maxhp) {//HPMax時のアシスト リセット
                //デバフがかかった人はアシストのリストをリセットしない
                let debuff_list = await what_include_buff(readed_data.effect, 'debuff');

                if (debuff_list.length === 0) {
                    dataname.push('attacker');
                    datavalue.push([]);
                    datareplace.push(true);
                }
                else if (Assist_Debuff_Reset) {
                    dataname.push('attacker');
                    datavalue.push([]);
                    datareplace.push(true);
                }
                else {
                    //console.error('デバフがかかっているのでリセットしない');
                }
            }

            await update_maindata_change_array('Player_hp', 'nameID', nameID, dataname, datavalue, datareplace);
            //////////////////////////////////
            ////
            ////////////////
            if (player_data.currenthp === 0) {
                if (readed_data.currenthp === 0) {
                    //既にHPが0になっている
                }
                else {
                    let victim_name = await read_maindata('Player_data', 'nameID', player_data.nameID, 'alliance', 'name', 'job', 'robot', 'robot_data');
                    let victim_job = await robot_replace_job(victim_name);
                    let attacker_job = '';
                    let attacker_name = {};
                    if (player_data.nameID.substring(0, 2) === '10') {//死んだ人がプレイヤー
                        let simulationdata = null;
                        if (attackerID.substring(0, 2) === '10') {//キルした人がプレイヤー
                            attacker_name = await read_maindata('Player_data', 'nameID', attackerID, 'alliance', 'name', 'job', 'robot', 'robot_data');
                            attacker_job = await robot_replace_job(attacker_name);
                            simulationdata = await assist_main(attackerID, player_data.nameID, readed_data.attacker, player_data.lastupdate, player_data.time_number, victim_name.name, attacker_name.alliance, victim_job, attacker_job, attacker_name.name,victim_name.alliance);
                        }
                        else if (attackerID.substring(0, 2) === '40') {//キルした人がNPC
                            if (readed_data.attacker.length > 0) {
                                for (let i = 1; i < readed_data.attacker.length + 1; i++) {
                                    if (readed_data.attacker.slice(i * -1)[0].attacker.substring(0, 2) === '10') {
                                        attackerID = readed_data.attacker.slice(i * -1)[0].attacker;
                                        break;
                                    }
                                    else {
                                        if (readed_data.attacker.length === i) {
                                            if (window.devMode.logLevel > 12) {
                                                console.log('attacker is NPC? ->' + attackerID);
                                            }
                                        }
                                    }
                                }
                            }
                            attacker_name = await read_maindata('Player_data', 'nameID', attackerID, 'alliance', 'name', 'job', 'robot', 'robot_data');
                            attacker_job = await robot_replace_job(attacker_name);
                            simulationdata = await assist_main(attackerID, player_data.nameID, readed_data.attacker, player_data.lastupdate, player_data.time_number, victim_name.name, attacker_name.alliance, victim_job, attacker_job, attacker_name.name,victim_name.alliance);
                        }
                        else if (attackerID === ' log_38 ') {
                            if (readed_data.attacker.length > 0) {
                                for (let i = 1; i < readed_data.attacker.length + 1; i++) {
                                    if (readed_data.attacker.slice(i * -1)[0].attacker.substring(0, 2) === '10') {
                                        attackerID = readed_data.attacker.slice(i * -1)[0].attacker;
                                        break;
                                    }
                                    else {
                                        if (readed_data.attacker.length === i) {
                                            if (window.devMode.logLevel > 12) {
                                                console.log('attacker is NPC? ->' + attackerID);
                                            }
                                        }
                                    }
                                }
                                attacker_name = await read_maindata('Player_data', 'nameID', attackerID, 'alliance', 'name', 'job', 'robot', 'robot_data');
                                attacker_job = await robot_replace_job(attacker_name);
                                simulationdata =  await assist_main(attackerID, player_data.nameID, readed_data.attacker, player_data.lastupdate, player_data.time_number, victim_name.name, attacker_name.alliance, victim_job, attacker_job, attacker_name.name,victim_name.alliance);
                            } else {
                                if (window.devMode.logLevel > 12) {
                                    console.warn('Warn : Kill Player Unknown->' + attackerID + '->' + player_data.nameID);
                                }
                            }
                        }
                        else {
                            if (window.devMode.logLevel > 12) {
                                console.warn('Warn : Kill Player Unknown->' + attackerID + '->' + player_data.nameID);
                            }
                        }
                        if (simulationdata === null) {
                            simulationdata = new simulationKDA(
                                attackerID, attacker_name.name, attacker_job, attacker_name.alliance,
                                player_data.nameID, victim_name.name, victim_job, victim_name.alliance,
                                [],player_data.time_number,Math.round((player_data.time_number - window.BATTLE_EVENT.timer.Get_BattleStart) / 1000)
                            );
                        }
                        await update_maindata('Player_data', 'nameID', player_data.nameID, ['s_death', 1, false], ['s-death-name',simulationdata, false], ['lastupdate', player_data.lastupdate, true]);
                    }
                }
            }
            if (window.Area.Type === 2) {//Hidden Gorge
                if (temp_time > 0 || HP_Update_duplite_robride_process) {//duplite Hpdata exclude
                    if (window.BATTLE_EVENT.Engage) {
                        await rob_ride_check(nameID, readed_data, player_data);
                    }
                }
                //readed_data
                //player_data
            }
            /////
            /////
            /////   Rob ride process
            /////
            /////
        }
        else if (temp_time === 0) {
            //同一データ?
            if (readed_data.currenthp !== player_data.currenthp || readed_data.maxhp !== player_data.maxhp) {
                if (window.devMode.logLevel > 12) {
                    console.warn('This Data is duplite...?,Not Applied' + attackerID);
                    console.warn(readed_data);
                    console.warn(player_data);
                }
            }
        }
        else if (readed_data.currenthp === undefined) {
            //new create HP Data 未登録
            if (player_data.currenthp === player_data.maxhp) {//HPMax時のアシスト リセット
                //デバフがかかった人はアシストのリストをリセットしない
                let debuff_list = await what_include_buff(readed_data.effect, 'debuff');

                if (debuff_list.length === 0) {
                    dataname.push('attacker');
                    datavalue.push([]);
                    datareplace.push(true);
                }
                else if (Assist_Debuff_Reset) {
                    dataname.push('attacker');
                    datavalue.push([]);
                    datareplace.push(true);
                }
                else {
                    //console.error('デバフがかかっているのでリセットしない');
                }
            }
            await update_maindata_change_array('Player_hp', 'nameID', nameID, dataname, datavalue, datareplace);
        }
        else {
            if (window.devMode.logLevel > 12) {
                console.error('This data is probably old->' + nameID);
                console.log(readed_data);
                console.log(player_data);
            }
        }
    }
}

export const what_include_buff = async (effect, buff_type) => {
    let search_type = true;
    if (effect === undefined) {
        return [];
    }
    if (buff_type === 'buff') {

    } else if (buff_type === 'debuff') {
        search_type = false;
    } else {
        if (window.devMode.logLevel > 12) {
            console.error('Buff_type unknown ->' + buff_type);
        }
        return [];
    }
    if (Object.keys(effect).length > 0) {
        let return_data = [];
        for (let i = 0; i < effect.length; i++) {
            if (effect[i].attacker === '0' || effect[i].attacker === 'E0000000' || EXCLUDE_BUFF.indexOf(effect[i].buffID) !== -1) {

            } else {
                let position = EFFECT_ID_LIST.indexOf(effect[i].buffID);
                if (position !== -1) {
                    if (EFFECT_ID[effect[i].buffID].type[4] === search_type) {
                        return_data.push(effect[i].attacker);
                    }
                }
            }
        }
        return return_data;
    } else {
        return [];
    }
}

const rob_ride_check = async (nameID, old, now) => {
    if (now.maxhp === 0 || nameID.substring(0, 2) === '40') {
        return null;
    }
    let now_joutai = await rob_checker(now.maxhp);
    if (old.maxhp !== now.maxhp) {//undefined wo hukumu
        if (now_joutai !== 'person') {//新規搭乗（最大HPの変更）
            //console.log('Ride Robot->' + now_joutai + ':' + nameID);
            await rob_ride_time_calc(nameID, now, now_joutai, true);
        }
        else {
            let old_joutai = await rob_checker(old.maxhp);
            if (old_joutai !== 'person') {//降りる　
                //console.log('Get off the Robot->' + old_joutai + ':' + nameID);
                await rob_ride_time_calc(nameID, now, now_joutai, true);
            }
        }
    }
    else if (now_joutai !== 'person') {//HP Regen received. probably changed robot
        if (old.currenthp - now.currenthp < 0) {
            //console.log('HP_Regen->' + now_joutai + ':' + nameID + '  ' + old.currenthp + '->' + now.currenthp);
            await rob_ride_time_calc(nameID, now, now_joutai, true);
        }
    }
}
const rob_ride_time_calc = async (nameID, now, now_joutai, ride) => {
    let searched = await read_maindata('Player_data', 'nameID', nameID, 'robot_data');
    if (typeof searched.robot_data !== 'undefined') {
        let edit = searched.robot_data.length - 1;
        searched.robot_data[edit].getoff = now.time_number;
        searched.robot_data[edit].time = now.time_number - searched.robot_data[edit].ridetime;
        searched.robot_data[edit + 1] = { ridetime: now.time_number, ride_type: now_joutai, getoff: 0, time: 0, data: {} };
        await update_maindata('Player_data', 'nameID', nameID, ['robot', ride, true], ['robot_data', searched.robot_data, true], ['lastupdate', now.lastupdate, true]);
    }
    else {
        await update_maindata('Player_data', 'nameID', nameID, ['robot', ride, true], ['robot_data', { ridetime: now.time_number, ride_type: now_joutai, getoff: 0, time: 0, data: {} }, false], ['lastupdate', now.lastupdate, true]);
    }
}
const rob_checker = async (maxhp) => {
    switch (maxhp) {
        case Chaiser_HP:
            return 'che';
        case Oppresor_HP:
            return 'opp';
        case Justice_HP:
            return 'jas';
        default:
            return 'person';
    }
}
const robot_replace_job = async (data) => {
    if (typeof data.robot !== 'boolean') {
        return data.job;
    } else {
        if (data.robot_data.slice(-1)[0].ride_type === 'person') {
            return data.job;
        }
        else {
            return data.robot_data.slice(-1)[0].ride_type;
        }
    }
}