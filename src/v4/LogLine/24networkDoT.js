import { read_maindata, insert_maindata, update_maindata, update_maindata_change_array } from '../maindataEdit.js';
import { timestamp_change } from './logline_other.js';
import { DoT_ID, DoT_ID_Array, Unique_DoT_ID_Array } from "./resource/dotID.js";
import { general_input_type, damage_heal_input_type } from "./21_22_networkActionSync.js"
import { Send_Action, pet_replace } from "./loglineGlobal.js";

let check = null;
let check_2 = null;

const AcceptMarginTime_mag = 1.1;

export const networkDoT_24 = async (log) => {
    let data = {
        victimID: log[2],
        victim: log[3],
        victimmaxhp: Number(log[8]),
        DoTType: log[4],
        effectID: log[5],
        damage: parseInt(log[6], 16),
        lastupdate: log[1],
        victimCurrenthp: Number(log[7]),
        uniqueID: null,
    };
    let uniqueID = data.effectID + data.lastupdate + data.victimID + data.DoTType;
    data.uniqueID = uniqueID;
    let damage_type = null;
    if (data.DoTType === 'DoT') {
        damage_type = 'normal-damage';
        //await update_maindata('Player_data','nameID',data.victimID,['incomeDoT',data.damage,false],['totalincomedamage',data.damage,false],['lastupdate',data.lastupdate,true]);
    }
    else if (data.DoTType === 'HoT') {
        damage_type = 'heal';
        //await update_maindata('Player_data','nameID',data.victimID,['incomeHoT',data.damage,false],['totalincomeheal',data.damage,false],['lastupdate',data.lastupdate,true]);
    }
    else {
        if (window.devMode.logLevel > 4) {
            console.error('Eroor : This log Dot type unknown->' + data.DoTType);
        }
    }
    data.overdamage = await over_damage(damage_type, data.damage, Number(log[7]), data.victimmaxhp);
    if (check !== uniqueID) {
        check = uniqueID;
        check_2 = log;
    }
    else {
        if (window.devMode.logLevel > 4) {
            console.error('This ID is Not Unique->' + uniqueID);
            console.error(log);
            console.error(check_2);
        }
    }
    if (data.effectID === '0') {
        let effect = await read_maindata('Player_hp', 'nameID', data.victimID, 'effect', 'dot_potencial');
        if (effect.effect === undefined) {
            if (window.devMode.logLevel > 4) {
                console.warn('DoT Simulation failed...');
                console.warn(log);
            }
            return null;
        }
        let effect_position = [];
        let potencial = 0;
        for (let i = 0; i < effect.effect.length; i++) {
            let dot_id_position = DoT_ID_Array.indexOf(effect.effect[i].buffID);
            if (dot_id_position !== -1) {
                //console.warn('Found->' + effect.effect[i].buffID + '('+ dot_id_position+ ')');
                //console.warn('Type Check->' + data.DoTType + '===' + DoT_ID[dot_id_position].type);
                if (data.DoTType === DoT_ID[dot_id_position].type) {
                    let default_potencial = DoT_ID[dot_id_position].potencial;
                    potencial = default_potencial;
                    if (effect.dot_potencial !== undefined) {
                        let lastupdate_ms = await timestamp_change(data.lastupdate);
                        for (let p = effect.dot_potencial.length - 1; p >= 0; p--) {
                            if (effect.dot_potencial[p].dotID === effect.effect[i].buffID) {
                                let effect_time = effect.dot_potencial[p].time_ms + (effect.dot_potencial[p].dot_time * 1000) + 2000;
                                if (effect_time > lastupdate_ms) {
                                    potencial = effect.dot_potencial[p].potencial;
                                    break;
                                }
                                else {
                                    //console.error('有効でないPotencialデータ（効果時間を過ぎた）');
                                    //console.error(effect_time +'>'+lastupdate_ms);
                                    //console.error(log);
                                    //console.error(DoT_ID[dot_id_position]);
                                }
                            }
                        }
                    }
                    else {
                    }
                    effect_position.push({ player: effect.effect[i].attacker, potencial: potencial, default: default_potencial });
                }
            }
        }

        if (effect_position.length === 0) {
            if (window.devMode.logLevel > 4) {
                console.warn(data.DoTType + '-Unknown :effectID not include Player_Hp');
                console.warn(log);
                console.warn(effect);
            }
            return null;
        }

        let sum = 0;
        for (let i = 0; i < effect_position.length; i++) {
            sum += effect_position[i].potencial;
        }
        if (sum === 0) {
            for (let i = 0; i < effect_position.length; i++) {
                effect_position[i].potencial = effect_position[i].default;
            }
            for (let i = 0; i < effect_position.length; i++) {
                sum += effect_position[i].potencial;
            }
        }
        if (sum === 0) {
            if (window.devMode.logLevel > 4) {
                console.error('sum === ' + sum + ': dot distribution failed');
            }
            return null;
        }
        let simulation_data = await dot_damage_distribution(effect_position, sum, data.damage, data.overdamage);
        await new_dot_damage_cut(simulation_data, data.victimID, data.victimCurrenthp, data.victimmaxhp, data.DoTType, data.lastupdate, uniqueID);
        //await dot_damage_cut(simulation_data,data.victimID,data.victimmaxhp,damage_type,data.lastupdate,uniqueID);
        await insert_maindata('DoT_data', 'ID', uniqueID, ['victimID', data.victimID, true], ['victim', data.victim, true],
            ['victimmaxhp', data.victimmaxhp, true], ['DoTType', data.DoTType, true], ['effectID', data.effectID, true], ['damage_type', damage_type, true], ['damage', data.damage, true], ['overdamage', data.overdamage, true], ['Simulation_data', simulation_data, true], ['lastupdate', data.lastupdate, true]);
    } else if (Unique_DoT_ID_Array.indexOf(data.effectID) !== -1) {
        await insert_maindata('DoT_data', 'ID', uniqueID, ['victimID', data.victimID, true], ['victim', data.victim, true],
            ['victimmaxhp', data.victimmaxhp, true], ['DoTType', data.DoTType, true], ['effectID', data.effectID, true], ['damage_type', damage_type, true], ['damage', data.damage, true], ['overdamage', data.overdamage, true], ['Simulation_data', null, true], ['lastupdate', data.lastupdate, true]);
        if (data.effectID === '51A') {//ソウルサバイバー
            await new_change_accept_damage(data.victimID, data.victimID, data.victimCurrenthp, data.victimmaxhp, data.damage, 'HoT', uniqueID, data.lastupdate)
            //await change_accept_damage(data.victimID,data.victimID,data.victimmaxhp,data.damage,data.overdamage,data.victimmaxhp,'normal-damage',uniqueID,data.lastupdate);
        } else if (data.effectID === 'C67') {
            //Meteor Drive
            await meteor_drive(data);
        } else if (data.effectID === 'A2C') {
            //Kardia Heal
            await kardia_heal(data);
        }
        else {
            await unique_dot_player_hp_add(data, data.effectID, uniqueID, damage_type);
        }

        /*
        if(data.effectID === 'B34'){//プネウマ
          await puneuma_calc(data,uniqueID,log);
        }else if(data.effectID === '52B'){
          await unique_dot_player_hp_add(data,'wild_fire',uniqueID,damage_type);
        }
        else if (data.effectID === '886') {
          await unique_dot_player_hp_add(data,'sinbou',uniqueID,damage_type);
        }
        else if (data.effectID === 'B36') {
          await unique_dot_player_hp_add(data,'haimano-inn',uniqueID,damage_type);
        }*/

    } else {
        if (window.devMode.logLevel > 4) {
            console.error('Warn : DoT EffectID Unknown ->' + data.effectID);
            console.error(log);
        }
    }
}

const dot_damage_distribution = async (data, sum, totaldamage, totaloverdamage) => {
    let added_data = [];
    let damage = 0;
    let overdamage = 0;
    for (let i = 0; i < data.length; i++) {
        if (totaldamage === 0) {
            damage = 0;
            overdamage = 0;
        }
        else {
            damage = totaldamage * (data[i].potencial / sum);
            overdamage = totaloverdamage * (data[i].potencial / sum);
            /*
            if(damage > 10000){
              if(window.devMode.logLevel > 4){
                console.error('total->' + totaldamage + ' sum->' + sum);
                console.error(damage);
                console.error(data);
              }
            }*/
        }
        //console.log('Simulation Damage->'+damage.toFixed(0)+':'+ overdamage.toFixed(0) + '(' + data[i].potencial / sum +'):'+data[i].player);
        added_data.push({ player: data[i].player, damage: Math.round(damage), overdamage: Math.round(overdamage) });
    }
    return added_data;
}

const meteor_drive = async (data) => {
    let id = '0C67';
    let read_data = await read_maindata('Player_hp', 'nameID', data.victimID, id);
    let now_time = await timestamp_change(data.lastupdate);
    let calc = false;
    if (Object.keys(read_data).length === 1) {//include
        if (typeof read_data[id] === 'object') {
            let attacker = null;//適当
            for (let i = 0; i < read_data[id].length; i++) {
                if ((now_time - read_data[id][i].time_ms) < (read_data[id][i].time * (1000 * AcceptMarginTime_mag))) {
                    if (read_data[id][i].hit > 0) {
                        if (!calc) {
                            calc = true;
                            //MATCH
                            read_data[id][i].hit--;
                            attacker = read_data[id][i].attacker;
                        }
                    }
                }
            }
            //------------
            if (attacker === null) {
                if (window.devMode.logLevel > 4) {
                    console.warn('Meteor Drive effect not include->');
                    console.warn(read_data);
                    console.warn(data);
                }
            } else {
                await new_change_accept_damage(attacker, data.victimID, data.victimCurrenthp, data.victimmaxhp, data.damage, data.DoTType, data.uniqueID, data.lastupdate);
            }
        }
    }
}

const kardia_heal = async (data) => {
    let read_data = await read_maindata('Player_hp', 'nameID', data.victimID, 'effect');
    if (Object.keys(read_data).length === 1) {//include
        if (typeof read_data.effect === 'object') {
            let attacker = null;//適当
            for (let i = 0; i < read_data.effect.length; i++) {
                if (read_data.effect[i].buffID === '0B38') {//カルディア被
                    if (attacker === null) {
                        attacker = read_data.effect[i].attacker;
                    } else {
                        if (window.devMode.logLevel > 4) {
                            console.warn('Warn : 複数人からカルディアを受けている。');
                            console.warn(read_data);
                        }
                        return null;
                    }
                }
            }
            if (attacker === null) {
                if (window.devMode.logLevel > 4) {
                    console.warn('Kardia effect not include->' + data.victimID);
                }
            } else {
                await new_change_accept_damage(attacker, data.victimID, data.victimCurrenthp, data.victimmaxhp, data.damage, 'kardia-heal', data.uniqueID, data.lastupdate);
            }
            //-------------
        }
    }
}

const new_dot_damage_cut = async (simulation_data, victimID, victimCurrenthp, victimmaxhp, damage_type, lastupdate, uniqueID) => {
    for (let i = 0; i < simulation_data.length; i++) {
        let sim = simulation_data[i];
        let a_replaceID = await pet_replace(sim.player, "");
        let v_replaceID = await pet_replace(victimID, "");
        let victim = { nameID: v_replaceID.nameID, name: v_replaceID.name, maxhp: victimmaxhp, currentHp: victimCurrenthp };
        let attacker = null;

        if (a_replaceID.nameID === victimID) {
            attacker = victim;
        } else {
            let db_data = await read_maindata('Player_hp', 'nameID', a_replaceID.nameID, 'maxhp', 'currenthp');
            if (Object.keys(db_data).length === 2) {//include maxhp
                attacker = { nameID: a_replaceID.nameID, name: a_replaceID.name, maxhp: db_data.maxhp, currentHp: db_data.currenthp };
            } else {//Kari data
                attacker = { nameID: a_replaceID.nameID, name: a_replaceID.name, maxhp: 33333, currentHp: 5000 };
            }
        }
        //damage add / heal add
        let type = 'heal';
        if (damage_type === 'DoT') {
            type = 'damage';
            //38を受けてないが、ダメージ/ヒールを受けたとして処理
            await update_maindata('Player_hp', 'nameID', victim.nameID, ['attacker', { attacker: attacker.nameID, type: 'DoT-damage' }, false]);
        } else {
            //await update_maindata('Player_hp','nameID',victim.nameID,['attacker',{attacker:attacker.nameID,type:'HoT-heal'},false]);
        }
        let input_data = await damage_heal_input_type(uniqueID, attacker.nameID, victim.nameID, attacker.maxhp, attacker.currentHp, victim.maxhp, victim.currentHp, 'HoT/DoT', type, sim.damage, damage_type);

        //与ダメ
        let send = {};
        let marge_temp = { target: [], data: [], replace: [] };
        if (Send_Action) {
            send = await add_accept_target(input_data.target, input_data.data, 'send');
        }
        else {
            send = marge_temp;
        }
        let send_marge = await general_input_type(lastupdate, input_data, send);
        update_maindata_change_array('Player_data', 'nameID', attacker.nameID, send_marge.target, send_marge.data, send_marge.replace);

        //被ダメ
        let income = await add_accept_target(input_data.target, input_data.data, 'income');
        let income_marge = await general_input_type(lastupdate, marge_temp, income);

        update_maindata_change_array('Player_data', 'nameID', victim.nameID, income_marge.target, income_marge.data, income_marge.replace);
    }
}

const unique_dot_player_hp_add = async (data, dot_name, uniqueID, damage_type) => {
    let time_ms = await timestamp_change(data.lastupdate);
    let input = {
        victimID: data.victimID,
        damage: data.damage,
        overdamage: data.overdamage,
        victimmaxhp: data.victimmaxhp,
        time: data.lastupdate,
        time_ms: time_ms,
        uniqueID: uniqueID,
        damage_type: damage_type
    };
    await update_maindata('Player_hp', 'nameID', data.victimID, [dot_name, input, false], ['lastupdate', data.lastupdate, true]);
}

const over_damage = async (damage_type, damage, currenthp, maxhp) => {
    if (damage_type === 'heal') {
        let over = (damage + currenthp) - maxhp;
        if (over > 0) {
            return over;
        }
        else {
            return 0;
        }
    }
    else if (damage_type === 'damage' || damage_type === 'normal-damage') {
        let over = damage - currenthp;
        if (over < 0) {
            return 0;
        }
        else {
            return over;
        }
    }
    else if (damage_type === 'mp_recover') {
        return null;
    }
    else {
        return null;
    }
}

export const new_change_accept_damage = async (attackerID, victimID, victimCurrenthp, victimmaxhp, damage, damage_type, uniqueID, lastupdate) => {
    let a_replaceID = await pet_replace(attackerID, "");
    let v_replaceID = await pet_replace(victimID, "");
    let victim = { nameID: v_replaceID.nameID, name: v_replaceID.name, maxhp: victimmaxhp, currentHp: victimCurrenthp };
    let attacker = null;

    if (a_replaceID.nameID === victimID) {
        attacker = victim;
    } else {
        let db_data = await read_maindata('Player_hp', 'nameID', a_replaceID.nameID, 'maxhp', 'currenthp');
        if (Object.keys(db_data).length === 2) {//include maxhp
            attacker = { nameID: a_replaceID.nameID, name: a_replaceID.name, maxhp: db_data.maxhp, currentHp: db_data.currenthp };
        } else {//Kari data
            attacker = { nameID: a_replaceID.nameID, name: a_replaceID.name, maxhp: 33333, currentHp: 5000 };
        }
    }
    //damage add / heal add
    let type = '';
    if (damage_type === 'DoT' || damage_type === 'normal-damage' || damage_type === 'damage') {
        //38を受けてないが、ダメージ/ヒールを受けたとして処理
        damage_type = 'damage';
        type = 'DoT';
        await update_maindata('Player_hp', 'nameID', victim.nameID, ['attacker', { attacker: attacker.nameID, type: 'DoT-damage' }, false]);
    } else if (damage_type === 'Kardia-barrier') {
        damage_type = 'heal';
        type = 'barrier';
    } else {
        damage_type = 'heal';
        type = 'HoT';
        //await update_maindata('Player_hp','nameID',victim.nameID,['attacker',{attacker:attacker.nameID,type:'HoT-heal'},false]);
    }
    let input_data = await damage_heal_input_type(uniqueID, attacker.nameID, victim.nameID, attacker.maxhp, attacker.currentHp, victim.maxhp, victim.currentHp, 'SpecialDoT/HoT', damage_type, damage, type);

    //与ダメ
    let send = {};
    let marge_temp = { target: [], data: [], replace: [] };
    if (Send_Action) {
        send = await add_accept_target(input_data.target, input_data.data, 'send');
    }
    else {
        send = marge_temp;
    }
    let send_marge = await general_input_type(lastupdate, input_data, send);
    update_maindata_change_array('Player_data', 'nameID', attacker.nameID, send_marge.target, send_marge.data, send_marge.replace);

    //被ダメ
    let income = await add_accept_target(input_data.target, input_data.data, 'income');
    let income_marge = await general_input_type(lastupdate, marge_temp, income);

    update_maindata_change_array('Player_data', 'nameID', victim.nameID, income_marge.target, income_marge.data, income_marge.replace);
}

const add_accept_target = async (name, data, income) => {
    let rtn = { target: [], data: [], replace: [] };
    let input_str = 'accept_' + income + '_';
    for (let i = 0; i < name.length; i++) {
        if (name[i] !== 'counter') {
            rtn.target.push(input_str + name[i]);
            rtn.data.push(data[i]);
            rtn.replace.push(false);
        }
    }
    return rtn;
}