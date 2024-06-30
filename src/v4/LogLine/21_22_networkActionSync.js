import { pet_replace, LimitBreak, LimitBreak_Extend } from "./loglineGlobal.js";
import { timestamp_change } from "./logline_other.js";
import { DoubleRocketPunch, Field_ID, Kaiki, GunyouPortion, Chaiser_HP, Oppressor_HP, Justice_HP, Core_Tower_HP, OpticalSight, BigMissile } from "./loglineGlobal.js";
import { update_maindata_change_array, update_maindata, insert_maindata_object, read_maindata } from "../maindataEdit.js";
import { EFFECT_ID, EFFECT_ID_LIST } from "./resource/effectID.js";
import { Barrier_ID, Barrier_ID_Array, Special_Barrier_ID, Special_Barrier_ID_Array_Skill } from "./resource/barrierID.js";
import { DoT_ID, DoT_ID_Array } from "./resource/dotID.js";
import { battleEvent, AreaData, devMode } from "../../index.js";

const Update_attacker = ['add-buff-attacker', 'tp-recover', 'mp-recover'/*,'additional-effect'*/];

export const networkactionsync_21_22 = async (log) => {
    /*
    const logline_21_22_max = 48;
    if (log.length > logline_21_22_max) {
        if (devMode.logLevel > 2) {
            console.error("Error : data length not matched 48/47 ->" + log.length);
            console.error(log);
        }
        return null;
    }*/
    let effectdata = await effectdata_exchangeInt(await network_action_datatype(log));
    //    attackerID : log[2],      attacker : log[3],
    let petcheck = await pet_replace(log[2], log[3]);
    let attacker_MaxHP = Number(log[35]);
    if (log[2] !== petcheck.nameID) {
        if (log[4] === OpticalSight) {
            attacker_MaxHP = Chaiser_HP;
        } else if (log[4] === BigMissile) {
            attacker_MaxHP = Oppressor_HP;
        }
    }
    let data = {
        attackerID: petcheck.nameID,
        attacker: petcheck.name,
        victimID: log[6],
        victim: log[7],
        actionID: log[4],
        action: log[5],
        victimCurrentHP: Number(log[24]),
        victimmaxHP: Number(log[25]),
        attackerCurrentHP: Number(log[34]),
        attackermaxHP: attacker_MaxHP,
        networknumber: log[44],
        lastupdate: log[1],
        time_ms: await timestamp_change(log[1]),
        count: "-" + log[45],
        count_row: Number(log[45]),
        hitnum: Number(log[46]),
    };
    let effectmax = effectdata.name.length;
    let victim_effect = { name: [], param: [] };
    let attacker_effect = { name: [], param: [] };
    for (let i = 0; i < effectmax; i++) {
        if (Update_attacker.indexOf(effectdata.name[i]) === -1 && !effectdata.special[i]) {//victim 側への影響
            if ('normal-damage' === effectdata.name[i]) {
                //victim_effect.name.push('damage');
                //victim_effect.param.push({type:effectdata.type[i],param:effectdata.param[i]});
                let damage_position = victim_effect.name.indexOf('damage');
                if (damage_position !== -1) {//2個目以降のdamage
                    if (typeof effectdata.param[i] === 'number') {
                        victim_effect.param[damage_position].param += effectdata.param[i];
                    } else {
                        if (window.Dev_mode.logLevel > 2) {
                            console.error('21-22 連続攻撃の合算が出来ませんでした。');
                            console.error(log);
                            console.error(effectdata);
                        }
                    }
                } else {
                    victim_effect.name.push('damage');
                    victim_effect.param.push({ type: effectdata.type[i], param: effectdata.param[i] });
                }
            }
            else if ('skill-replace' === effectdata.name[i] || 'actor-jobgage' === effectdata.name[i] || 'additional_effect' === effectdata.name[i]) {

            }
            else {
                victim_effect.name.push(effectdata.name[i]);
                victim_effect.param.push(effectdata.param[i]);
            }
        } else {//attacker 側への影響
            if ('normal-damage' === effectdata.name[i]) {//反撃ダメージ
                attacker_effect.name.push('counter');
                attacker_effect.param.push({ type: effectdata.type[i], param: effectdata.param[i] });
            }
            else if ('heal' === effectdata.name[i]) {
                let heal_position = attacker_effect.name.indexOf('heal');
                if (heal_position !== -1) {//2個目のヒール
                    if (typeof effectdata.param[i] === 'number') {
                        attacker_effect.param[heal_position] += effectdata.param[i];
                    } else {
                        if (window.Dev_mode.logLevel > 2) {
                            console.error('21-22 吸収ヒールの合算が出来ませんでした。');
                            console.error(log);
                            console.error(effectdata);
                        }
                    }
                } else {
                    attacker_effect.name.push(effectdata.name[i]);
                    attacker_effect.param.push(effectdata.param[i]);
                }
            } else {
                attacker_effect.name.push(effectdata.name[i]);
                attacker_effect.param.push(effectdata.param[i]);
            }
        }
    }
    if (data.attackerID === data.victimID) {//省略
        victim_effect.name = victim_effect.name.concat(attacker_effect.name);
        victim_effect.param = victim_effect.param.concat(attacker_effect.param);
        attacker_effect = { name: [], param: [] };
    }
    let victim_input_data = { target: [], data: [], replace: [] };
    let attacker_input_data = { target: [], data: [], replace: [] };

    if (victim_effect.name.length > 0) {
        victim_input_data = await networkaction_calc(data, victim_effect, "victim");
    }
    if (attacker_effect.name.length > 0) {
        attacker_input_data = await networkaction_calc(data, attacker_effect, "attacker");
    }
    if (data.actionID === DoubleRocketPunch) {
        if (AreaData.Type === 2) {
            //Hidden Gorge
            if (data.count_row === 0) {
                attacker_input_data.target.push('totalrocketpunch');
                attacker_input_data.replace.push(false);
                attacker_input_data.data.push(1);
                if (data.victimID === Field_ID) {
                    //miss shot
                    attacker_input_data.target.push('missrocketpunch');
                    attacker_input_data.replace.push(false);
                    attacker_input_data.data.push(1);
                } else {
                    attacker_input_data.target.push('hitrocketpunch');
                    attacker_input_data.replace.push(false);
                    attacker_input_data.data.push(1);
                    attacker_input_data.target.push('hitrocketpunchavarage');
                    attacker_input_data.replace.push(false);
                    attacker_input_data.data.push(1);
                }
            }
        }
    }
    else if (LimitBreak.indexOf(data.actionID) !== -1 && data.count_row === 0) {
        
        let time = Math.round((data.time_ms - battleEvent.timer.Get_BattleStart) / 1000);
        attacker_input_data.target.push('limitBreak');
        attacker_input_data.replace.push(false);
        attacker_input_data.data.push({ LimitBreak: data.actionID, use: 1, hit: data.hitnum, time: time, time_ms: data.time_ms });
    } else if (LimitBreak_Extend.indexOf(data.actionID) !== -1 && data.count_row === 0) {
        let time = Math.round((data.time_ms - battleEvent.timer.Get_BattleStart) / 1000);
        attacker_input_data.target.push('limitBreak');
        attacker_input_data.replace.push(false);
        attacker_input_data.data.push({ LimitBreak: data.actionID, use: 0, hit: data.hitnum, time: time, time_ms: data.time_ms });
    }
    let marge_input_data = await general_input_type(data.lastupdate, victim_input_data, attacker_input_data);

    await update_maindata_change_array('Player_data', 'nameID', data.attackerID, marge_input_data.target, marge_input_data.data, marge_input_data.replace);

    let special_Barrier = Special_Barrier_ID_Array_Skill.indexOf(data.actionID);
    if (special_Barrier !== -1) {
        await special_barrier_calc(data, Special_Barrier_ID[special_Barrier]);
    }
}

const special_barrier_calc = async (data, barrier) => {
    let input = {
        attackerID: data.attackerID,
        attacker: data.attacker,
        victimID: data.victimID,
        victim: data.victim,
        actionID: data.actionID,
        action: data.action,
        victimCurrentHP: data.victimCurrentHP,
        victimmaxHP: data.victimmaxHP,
        attackerCurrentHP: data.attackerCurrentHP,
        attackermaxHP: data.attackermaxHP,
        time_ms: data.time_ms,
    }
    //let barrier_input = await New_potencial_check_barrier(input,barrier,true,'kardia-barrier');
    await update_maindata('Player_hp', 'nameID', data.attackerID, [barrier.dotid, { time_ms: data.time_ms, data: input }, true]);//カルディア対象へのバリアなので置き換え
}
const counterdamage_include = async (data, effect) => {
    let victim = { nameID: data.attackerID, name: data.attacker, hp: data.attackerCurrentHP, maxhp: data.attackermaxHP };
    let attacker = { nameID: data.victimID, name: data.victim, hp: data.victimCurrentHP, maxhp: data.victimmaxHP };
    let uniqueID = data.networknumber + victim.nameID + data.count;
    let input = {
        attackerID: attacker.nameID,
        attacker: attacker.name,
        victimID: victim.nameID,
        victim: victim.name,
        C_attackerID: data.victimID,
        C_attacker: data.victim,
        effectname: effect.name,
        effectparam: effect.param,
        inputname: null,
        inputdata: null,
        actionID: data.actionID,
        action: data.action,
        victimCurrentHP: victim.hp,
        victimmaxHP: victim.maxhp,
        attackerCurrentHP: attacker.hp,
        attackermaxHP: attacker.maxhp,
        time_send: data.lastupdate,
        time_accept: 'not-yet',
        time_ms: data.time_ms,
        uniqueID: uniqueID,
    }
    let counter_check = input.effectname.indexOf('counter');
    let victim_input_data = { target: [], data: [], replace: [] };
    let attacker_input_data = { target: [], data: [], replace: [] };
    if (counter_check !== -1) {
        attacker_input_data = await damage_heal_input_type(input.uniqueID, input.attackerID, input.victimID, input.attackermaxHP, input.attackerCurrentHP, input.victimmaxHP, input.victimCurrentHP, input.actionID, 'damage', input.effectparam[counter_check], 'counter');
        input.inputname = attacker_input_data.target;
        input.inputdata = attacker_input_data.data;
        let marge_input_data = await general_input_type(data.lastupdate, victim_input_data, attacker_input_data);
        update_maindata_change_array('Player_data', 'nameID', input.attackerID, marge_input_data.target, marge_input_data.data, marge_input_data.replace);
        return marge_input_data;
    }
}

const networkaction_calc = async (data, effect, type) => {
    let attacker = {};
    let victim = {};
    if (type === 'attacker') {
        attacker = { nameID: data.attackerID, name: data.attacker, hp: data.attackerCurrentHP, maxhp: data.attackermaxHP };
        victim = { nameID: data.attackerID, name: data.attacker, hp: data.attackerCurrentHP, maxhp: data.attackermaxHP };
    }
    else {
        attacker = { nameID: data.attackerID, name: data.attacker, hp: data.attackerCurrentHP, maxhp: data.attackermaxHP };
        victim = { nameID: data.victimID, name: data.victim, hp: data.victimCurrentHP, maxhp: data.victimmaxHP };
    }
    let uniqueID = data.networknumber + victim.nameID + data.count;
    let input = {
        attackerID: attacker.nameID,
        attacker: attacker.name,
        victimID: victim.nameID,
        victim: victim.name,
        C_attackerID: data.victimID,
        C_attacker: data.victim,
        effectname: effect.name,
        effectparam: effect.param,
        inputname: [],
        inputdata: [],
        actionID: data.actionID,
        action: data.action,
        victimCurrentHP: victim.hp,
        victimmaxHP: victim.maxhp,
        attackerCurrentHP: attacker.hp,
        attackermaxHP: attacker.maxhp,
        time_send: data.lastupdate,
        time_accept: 'not-yet',
        time_ms: data.time_ms,
        uniqueID: uniqueID,
    }
    /* Duplite Check (Debugging)
    if (LastUniqueID === uniqueID) {
        console.error(Log);
    } else {
        LastUniqueID = uniqueID;
    }*/

    let input_data = { target: ['uniqueID'], data: [uniqueID], replace: [false] };

    //------------------------
    let damage_check = input.effectname.indexOf('damage');
    let heal_check = input.effectname.indexOf('heal');
    if (damage_check !== -1) {
        input_data = await damage_heal_input_type(input.uniqueID, input.attackerID, input.victimID, input.attackermaxHP, input.attackerCurrentHP, input.victimmaxHP, input.victimCurrentHP, input.actionID, 'damage', input.effectparam[damage_check], 'normal');
        input.inputname = input_data.target;
        input.inputdata = input_data.data;
    }
    else if (heal_check !== -1) {
        input_data = await damage_heal_input_type(input.uniqueID, input.attackerID, input.victimID, input.attackermaxHP, input.attackerCurrentHP, input.victimmaxHP, input.victimCurrentHP, input.actionID, 'heal', input.effectparam[heal_check], 'normal');
        input.inputname = input_data.target;
        input.inputdata = input_data.data;
    }
    //------------------------
    //barrier dot/hot
    for (let i = 0; i < input.effectname.length; i++) {
        if (input.effectname[i] === "add-buff-attacker" || input.effectname[i] === "add-buff-victim") {
            let dot_position = DoT_ID_Array.indexOf(await effectdata_force4(input.effectparam[i]));
            if (dot_position !== -1) {
                //special action potencial Hpdata insert
                await potencial_check_from_damage(DoT_ID[dot_position], dot_position, input);
            }
            //Barrier
            let barrier_position = Barrier_ID_Array.indexOf(await effectdata_force4(input.effectparam[i]));
            if (barrier_position !== -1) {
                //include barrier
                let additional_effect = 1;
                if (input.actionID === '722B') {//アクアヴェールの2倍
                    if (input.effectname.indexOf('esuna-miss') !== -1) {

                    } else if (input.effectname.indexOf('esuna-one') !== -1) {
                        //console.error('アクアヴェール　OK');
                        additional_effect = 2;
                    }
                }
                let barrier_input = await New_potencial_check_barrier(input, barrier_position, false, 'barrier', input.attackerID, additional_effect);
                input.inputname = input.inputname.concat(barrier_input.target);
                input.inputdata = input.inputdata.concat(barrier_input.data);
                input_data.target = input_data.target.concat(barrier_input.target);
                input_data.data = input_data.data.concat(barrier_input.data);
                input_data.replace = input_data.replace.concat(barrier_input.replace);
            }
        } else if (input.effectname[i] === "counter") {
            //ダメージだけ入れる
            let counter_input = await counterdamage_include(data, effect);
            input.inputname = input.inputname.concat('counter');
            input.inputdata = input.inputdata.concat(counter_input);
            input_data.data.push(counter_input);
            input_data.target.push('counter');
            input_data.replace.push(false);
        }
    }
    //-------------------------------
    //let insert_data = JSON.parse(JSON.stringify(input));
    insert_maindata_object('Action_data', input);
    await insert_maindata_object('Action_Sync_data', input);
    input_data.target.push('input');
    input_data.data.push(input);
    input_data.replace.push(false);
    return input_data;
    //------------------------------
}
export const general_input_type = async (lastupdate, damage_target, heal_target) => {
    let rtn = { target: ['lastupdate'], data: [lastupdate], replace: [true] };
    if (damage_target.target.length > 0) {
        rtn.target = rtn.target.concat(damage_target.target);
        rtn.data = rtn.data.concat(damage_target.data);
        rtn.replace = rtn.replace.concat(damage_target.replace);
        //console.log(damage_target);
    }
    if (heal_target.target.length > 0) {
        rtn.target = rtn.target.concat(heal_target.target);
        rtn.data = rtn.data.concat(heal_target.data);
        rtn.replace = rtn.replace.concat(heal_target.replace);
    }
    return rtn;
}
//                                      -           -         -        -       -         -   type = damage/heal  param = Number special = DoT/HoT/counter/noraml..etc
export const damage_heal_input_type = async (uniqueID, attackerID, victimID, a_maxHP, a_CurrentHP, v_maxHP, v_CurrentHP, actionID, type, param, special) => {
    a_maxHP = typeof a_maxHP === 'number' ? a_maxHP : 0;
    a_CurrentHP = typeof a_CurrentHP === 'number' ? a_CurrentHP : 0;
    v_maxHP = typeof v_maxHP === 'number' ? v_maxHP : 0;
    v_CurrentHP = typeof v_CurrentHP === 'number' ? v_CurrentHP : 0;
    let rtn = { target: [], data: [], replace: [] };
    if (uniqueID !== null) {
        rtn = { target: ['uniqueID'], data: [uniqueID], replace: [false] };
    }
    let damage = 0;
    let overdamage = 0;
    //let damagetype = "normal";
    if (special === 'normal') {
        if (typeof param === 'number') {
            damage = param;
        } else {
            damage = param.param;
            //damagetype = param.type;
            //critical damage etc...
        }
    }
    else if (special === "counter") {
        damage = param.param;
    } else {
        damage = param;
    }
    if (type === 'damage') {
        let target = await damage_target(victimID, attackerID, v_maxHP, a_maxHP, actionID, special, damage);
        rtn = await damage_target_set(damage, overdamage, target, type, rtn);
    } else if (type === "heal") {
        let target = await heal_target(victimID, attackerID, actionID, special);
        overdamage = (damage + v_CurrentHP) - v_maxHP;
        if (special === 'barrier') {
            overdamage = 0;
        }
        else if (overdamage > 0) {
            //overdamage include
        }
        else {
            overdamage = 0;
        }
        if (damage < overdamage) {
            if (devMode.logLevel > 2) {
                console.error('Overdamage Calc Error->' + damage + ' < ' + overdamage);
                console.error(' v_CurrentHP ->' + v_CurrentHP + ' v_maxHP->' + v_maxHP);
                //console.error(Log);
            }
        }
        rtn = await damage_target_set(damage, overdamage, target, type, rtn)
    } else {
        console.warn('type is Unknown : damage_heal_input_type ->' + type);
    }
    return rtn;
}

const damage_target_set = async (damage, overdamage, paramName, type, rtn) => {
    let replace = [];
    let param = [];
    for (let i = 0; i < paramName.length; i++) {
        replace.push(false);
        if (paramName[i].substring(paramName[i].length - 4, paramName[i].length) === '_num') {
            param.push(1);
        } else {
            param.push(damage);
        }
    }
    if (type === 'damage') {
        /*param.push(paramName.concat());
        paramName.push("damage_kind");
        replace.push(false);*/
    } else if (type === 'heal') {
        if (overdamage > 0) {
            let overdamageName = [];
            for (let i = 0; i < paramName.length; i++) {
                overdamageName.push('over_' + paramName[i]);
                replace.push(false);
                param.push(overdamage);
            }
            paramName = paramName.concat(overdamageName);
        }
        /*
        param.push(paramName.concat());
        paramName.push("heal_kind");
        replace.push(false);
        */
    } else {
        console.error('damage target unknown -> ' + type);
        return rtn;
    }
    if (paramName.length === replace.length && paramName.length === param.length) {
        rtn.target = rtn.target.concat(paramName);
        rtn.data = rtn.data.concat(param);
        rtn.replace = rtn.replace.concat(replace);
        return rtn;
    } else {
        console.error('damage_target_set array length error ->' + paramName.length + ':' + replace.length + ':' + param.length);
        return rtn;
    }
}

const heal_target = async (victimID, attackerID, actionID, special) => {
    let typeinput = ['totalheal'];
    typeinput.push('heal_total_' + special);
    if (attackerID.substring(0, 2) === '40' || attackerID === Field_ID) {
        typeinput.push('heal_object');
        typeinput.push('heal_object_' + special);
    } else if (attackerID.substring(0, 2) === '10') {
        if (victimID.substring(0, 2) === "10") {
            if (victimID === attackerID) {
                typeinput.push('heal_self');
                if (actionID === Kaiki) {
                    typeinput.push('heal_kaiki');
                    typeinput.push('heal_kaiki_num');
                } else if (actionID === GunyouPortion) {
                    typeinput.push('heal_G_portion');
                    typeinput.push('heal_G_portion_num');
                } else {
                    typeinput.push('heal_self_' + special);
                }
            }
            else {//自分以外のプレイヤー
                let attacker = await read_maindata('Player_data', 'nameID', attackerID, 'alliance');
                let victim = await read_maindata('Player_data', 'nameID', victimID, 'alliance');
                if (typeof attacker.alliance !== 'undefined' && typeof victim.alliance !== 'undefined') {
                    if (attacker.alliance === 10) {
                        //24人そろってないためパーティ判別不能
                        typeinput.push('heal_ally');
                        typeinput.push('heal_ally_' + special);
                    }
                    else if (attacker.alliance === victim.alliance) {
                        typeinput.push('heal_party');
                        typeinput.push('heal_party_' + special);
                    }
                    else {
                        typeinput.push('heal_ally');
                        typeinput.push('heal_ally_' + special);
                    }
                }
                else {
                    typeinput.push('heal_ally');
                    typeinput.push('heal_ally_' + special);
                }
                if (AreaData.Type === 5) {//Crystal Conflict
                    typeinput.push('heal_' + victimID);
                    typeinput.push('heal_from_' + attackerID);
                }
            }
        } else {
            typeinput.push('heal_object');
        }
    } else {
        console.warn('heal attackerID error->' + attackerID);
        //console.warn(Log);
    }
    return typeinput;
}
const damage_target = async (victimID, attackerID, v_maxHP, a_maxHP, actionID, special, damage) => {
    let typeinput = ['totaldamage'];
    typeinput.push('damage_total_' + special);
    if (attackerID.substring(0, 2) === '40') {//オブジェクト等の攻撃の場合
        typeinput.push('damage_object');
        typeinput.push('damage_object_' + special);
    }
    else if (attackerID.substring(0, 2) === '10') {
        if (victimID.substring(0, 2) === "10") {
            typeinput.push('damage_player');
            if (AreaData.Type === 2) {//Hidden Gorge
                let attack_target = ['G_Player_attack'];
                //自身のダメージの種類
                if (actionID === "XXXX") {//Canon
                    attack_target.push("canon");
                } else {
                    attack_target.push("damage");
                    typeinput.push(attack_target.join("_"));
                    if (a_maxHP === Chaiser_HP) {
                        attack_target.push("robot");
                        typeinput.push(attack_target.join("_"));
                        attack_target.push("che");
                    } else if (a_maxHP === Oppressor_HP) {
                        attack_target.push("robot");
                        typeinput.push(attack_target.join("_"));
                        attack_target.push("opp");
                    } else if (a_maxHP === Justice_HP) {
                        attack_target.push("robot");
                        typeinput.push(attack_target.join("_"));
                        attack_target.push("jus");
                    } else {
                        attack_target.push("person");
                    }
                }
                typeinput.push(attack_target.join("_"));
                let victim_target = ['G_Player_to']
                victim_target.push("damage");
                typeinput.push(victim_target.join("_"));
                if (v_maxHP === Chaiser_HP) {
                    victim_target.push("robot");
                    typeinput.push(victim_target.join("_"));
                    victim_target.push("che");
                    typeinput.push('damage_robot');
                } else if (v_maxHP === Oppressor_HP) {
                    victim_target.push("robot");
                    typeinput.push(victim_target.join("_"));
                    victim_target.push("opp");
                    typeinput.push('damage_robot');
                } else if (v_maxHP === Justice_HP) {
                    victim_target.push("robot");
                    typeinput.push(victim_target.join("_"));
                    victim_target.push("jus");
                    typeinput.push('damage_robot');
                } else {
                    victim_target.push("person");
                    typeinput.push('damage_person');
                }
                typeinput.push(victim_target.join("_"));
            }
            else if (AreaData.Type === 5) {//Crystal Conflict
                typeinput.push('damage_CC_' + victimID);
                typeinput.push('damage_CC_from_' + attackerID);
            }
        } else {//FieldID / NPC
            typeinput.push('damage_object');
            if (AreaData.Type === 2) {//Hidden Gorge
                let attack_target = ['G_Obj_attack'];
                attack_target.push("damage");
                if (actionID === "XXXX") {//Canon
                    attack_target.push("canon");
                } else {
                    if (a_maxHP === Chaiser_HP) {
                        attack_target.push("robot");
                        attack_target.push("che");
                    } else if (a_maxHP === Oppressor_HP) {
                        attack_target.push("robot");
                        attack_target.push("opp");
                    } else if (a_maxHP === Justice_HP) {
                        attack_target.push("robot");
                        attack_target.push("jus");
                    } else {
                        attack_target.push("person");
                    }
                }
                typeinput.push(attack_target.join("_"));
                typeinput.push("G_obj_to_damage");
                if (v_maxHP === Core_Tower_HP) {//Tower Core
                    typeinput.push("damage_tower");
                    typeinput.push("G_obj_to_damage_tower");
                } else if (damage > 100000/*Big Damage*/) {
                    typeinput.push("damage_tower");
                    typeinput.push("G_obj_to_damage_tower");
                } else {
                    typeinput.push("damage_maton");
                    typeinput.push("G_obj_to_damage_maton");
                }
            }
        }
    } else {
        console.log('Attacker Unknown ->' + attackerID);
    }
    return typeinput;
}

//////////////////////////////////////////////////////////////////////////
//Barrier
//////////////////////////////////////////////////////////////////////////
const New_potencial_check_barrier = async (data, effectposition, special, type_name, attackerID/*Optional*/, additional) => {
    let action_detail = null;
    let barrier = 0;
    if (special) {
        action_detail = effectposition;
    } else {
        action_detail = await potencial_action_search_tool(Barrier_ID, data.actionID, Barrier_ID[effectposition].dotid, effectposition);
    }
    if (action_detail.synctype === 'calc') {
        barrier = await potencial_to_damage_calc_effect(data.attackerID, data.victimID, action_detail.potencial, 'HoT');
    } else if (action_detail.synctype === 'heal') {
        let damage = action_detail.action_potencial;
        for (let i = 0; i < data.effectname.length; i++) {
            if (data.effectname[i] === 'heal') {
                damage = data.effectparam[i] * action_detail.damagesync;
                break;
            }
        }
        barrier = damage;
    } else if (action_detail.synctype === 'buff_check') {
        let read_data = await read_maindata('Player_hp', 'nameID', attackerID, 'effect');
        let additional = false;//適当
        if (Object.keys(read_data).length === 1) {//include
            if (typeof read_data.effect === 'object') {
                for (let i = 0; i < read_data.effect.length; i++) {
                    if (read_data.effect[i].buffID === action_detail.checkID) {
                        additional = true;
                        break
                    }
                }
            }
        }
        let damage = action_detail.action_potencial;
        for (let i = 0; i < data.effectname.length; i++) {
            if (data.effectname[i] === 'heal') {
                damage = data.effectparam[i] * action_detail.damagesync;
                break;
            }
        }
        barrier = damage;
        if (additional) {
            barrier = barrier * action_detail.synctype2;
        }
    }
    else if (action_detail.synctype === 'maxhp') {
        if (data.victimmaxHP === 0) {
            barrier = action_detail.potencial;
        } else {
            barrier = data.victimmaxHP * action_detail.damagesync;
        }
    } else if (action_detail.synctype === 'stack-buff') {

    }
    else {
        console.warn('ActionSync Barrier Calc Failed :Sync Type Unknown ->' + action_detail.synctype);
        console.warn(action_detail);
    }
    if (additional !== 1) {
        barrier = barrier * additional;
    }
    return await damage_heal_input_type(null, data.attackerID, data.victimID, data.attackermaxHP, data.attackerCurrentHP, data.victimmaxHP, data.victimCurrentHP, action_detail.dotid, 'heal', barrier, type_name);
}

const networkAbility_damage_calc = async (damage_bit) => {
    if (damage_bit.length >= 4) {
        let ab = damage_bit.substring(0, damage_bit.length - 4);
        let c = damage_bit.substring(damage_bit.length - 4, damage_bit.length - 2);
        let d = damage_bit.substring(damage_bit.length - 2, damage_bit.length);
        let damage = 0;
        let special = false;
        if (c === '00' & d === '00') {
            damage = parseInt(ab, 16);
        }
        else if (c === '40') {
            let b = damage_bit.substring(damage_bit.length - 6, damage_bit.length - 4);
            let a = damage_bit.substring(damage_bit.length - 8, damage_bit.length - 6);
            damage = parseInt(d + a + b, 16);
        }
        else if (c === '80' && d === '00') {
            damage = parseInt(ab, 16);
            special = true;
        }
        else if (c === 'A0' && d === '00') {
            special = true;
            if (damage_bit === 'A000') {
                damage = 0;
            } else {
                damage = parseInt(ab, 16);
            }
        } else {
            console.error('damage-calc failed...' + damage_bit);
        }
        return { damage: damage, return: special };
    }
    else if (damage_bit === '0') {
        return { damage: 0, return: false };
    }
    else {
        if (devMode.logLevel > 2) {
            console.warn('Error: networkAbility-damage is not 4 lower length ...->' + damage_bit);
        }
        return { damage: 0, return: false };
    }
}

export const effectdata_force4 = async (param) => {
    if (param.length === 3) {
        return '0' + param;
    }
    else if (param.length === 2) {
        return '00' + param;
    }
    else if (param.length === 1) {
        return '000' + param;
    }
    else {
        return null;
    }
}

const potencial_action_search_tool = async (target, actionID, dotid, position) => {
    let max = target.length;
    for (let search_position = position; search_position < max; search_position++) {
        if (target[search_position].dotid === dotid) {
            if (actionID === target[search_position].actionid) {
                return target[search_position];
            }
        } else {
            if (devMode.logLevel > 2) {
                console.warn('EFFECTID Not Matched... dotid:' + dotid + ' actionID:' + actionID);
            }
            return target[position];
        }
    }
}

const potencial_check_from_damage = async (dot_detail, id_data_position, data) => {
    if (dot_detail.actionid !== data.actionID) {
        let dot_id_position = DoT_ID_Array.indexOf(dot_detail.dotid, id_data_position + 1);
        dot_detail = DoT_ID[dot_id_position];
        if (dot_id_position === -1) {
            if (devMode.logLevel > 2) {
                console.error('dot data not found');
                console.error(data);
            }
            //return test;
            return null;
        } else if (dot_detail.actionid !== data.actionID) {
            dot_id_position = DoT_ID_Array.indexOf(dot_detail.dotid, dot_id_position + 1);
            dot_detail = DoT_ID[dot_id_position];
            if (dot_id_position === -1) {
                if (devMode.logLevel > 2) {
                    console.error('dot data not found');
                    console.error(data);
                }
                //return test;
                return null;
            } else {

            }
            if (dot_detail.actionid !== data.actionID) {
                if (devMode.logLevel > 2) {
                    console.error('dot data not found');
                    console.error(data);
                }
                //return test;
                return null;
            }
        }
    }
    let potencial = dot_detail.potencial;
    potencial = await potencial_to_damage_calc_effect(data.attackerID, data.victimID, potencial, dot_detail.type);
    await update_maindata('Player_hp', 'nameID', data.victimID, ['dot_potencial', { potencial: potencial, attackerID: data.attackerID, dotID: dot_detail.dotid, actionID: data.actionID, time_ms: data.time_ms, dot_time: dot_detail.max }, false], ['lastupdate', data.lastupdate, true]);
}

export const potencial_to_damage_calc_effect = async (attackerID, victimID, default_potencial, damage_type) => {
    let attacker_data = await read_maindata('Player_hp', 'nameID', attackerID, 'effect', 'revise', 'maxhp');
    let victim_data = {};
    if (attackerID === victimID) {
        victim_data = attacker_data;
    }
    else {
        victim_data = await read_maindata('Player_hp', 'nameID', victimID, 'effect', 'revise', 'maxhp');
    }
    if (Object.keys(attacker_data).length === 0 || Object.keys(victim_data).length === 0) {
        if (devMode.logLevel > 2) {
            console.warn('read_error potencial calc failed->');
        }
        return default_potencial;
    }
    /*
    <-damage->
    potencial * (buff - debuff) * revise -> (buff - debuff) * revise = damage
    */
    if (damage_type === 'Text') {
        let attacker = await potencial_to_damage_calc_id(attacker_data, attackerID, 'damage', true);
        let victim = await potencial_to_damage_calc_id(victim_data, victimID, 'damage', false);
        return { attacker: Number(attacker.toFixed(2)), victim: Number(victim.toFixed(2)) };
    }
    else if (damage_type === 'DoT') {//damage
        let attacker = await potencial_to_damage_calc_id(attacker_data, attackerID, 'damage', true);
        let victim = await potencial_to_damage_calc_id(victim_data, victimID, 'damage', false);
        if (devMode.logLevel > 11) {
            console.log(default_potencial + ' * ' + attacker + ' * ' + victim + ' = ' + default_potencial * attacker * victim);
        }
        //console.log(default_potencial +' : '+ attacker + ' : '+ victim);
        return Math.round(default_potencial * attacker * victim);
    } else {//heal
        let attacker = await potencial_to_damage_calc_id(attacker_data, attackerID, 'heal', true);
        let victim = await potencial_to_damage_calc_id(victim_data, victimID, 'heal', false);
        if (devMode.logLevel > 11) {
            console.log(default_potencial + ' * ' + attacker + ' * ' + victim + ' = ' + default_potencial * attacker * victim);
        }
        //console.log(default_potencial +' : '+ attacker + ' : '+ victim);
        return Math.round(default_potencial * attacker * victim);
    }
}
const potencial_to_damage_calc_id = async (target_data, nameID/*effect revise maxhp*/, type/*damage/heal*/, send) => {
    let return_data = [1, 1, 1];
    if (send) {//与えた側
        if (target_data.effect !== undefined) {
            if (devMode.logLevel > 101) {
                console.log(target_data);
            }
            for (let i = 0; i < target_data.effect.length; i++) {
                //console.log('Send Check->' + EFFECT_ID_LIST.indexOf(target_data.effect[i].buffID) + ':->'+target_data.effect[i].buffID);
                if (EFFECT_ID_LIST.indexOf(target_data.effect[i].buffID) !== -1) {
                    let id_detail = EFFECT_ID[target_data.effect[i].buffID];
                    //console.log(id_detail);
                    if (id_detail.type[0] && type === 'damage') {
                        if (id_detail.type[4]) {
                            return_data[0] = return_data[0] * id_detail.effect;
                        }
                        else {
                            return_data[1] = return_data[1] * id_detail.effect;
                        }
                    }
                    if (id_detail.type[1] && type === 'heal') {
                        if (id_detail.type[4]) {
                            return_data[0] = return_data[0] * id_detail.effect;
                        }
                        else {
                            return_data[1] = return_data[1] * id_detail.effect;
                        }
                    }
                }
                else {
                    if (target_data.effect[i].player !== 'E0000000') {
                        //console.warn('未登録の"EFFECT ID"->' + target_data.effect[i].buffID);
                    }
                }
            }
        }
        else {
            if (devMode.logLevel > 11) {
                console.warn(target_data);
            }
        }
        if (target_data.revise !== undefined) {
            return_data[2] = target_data.revise.damage;
        }
        if (devMode.logLevel > 102) {
            console.log('buff->' + return_data[0] + ' debuff->' + return_data[1] + ' default_revise->' + return_data[2]);
        }
        if (nameID.substring(0, 2) === '40') {
            if (type === 'heal') {
                return (return_data[0] * return_data[1] * 0.5);
            }
            else {
                return (return_data[0] * return_data[1] * 1);
            }
        } else {
            if (target_data.maxhp === Chaiser_HP || target_data.maxhp === Oppressor_HP || target_data.maxhp === Justice_HP) {
                return ((return_data[1]) * 1);
            }
            else {
                return (return_data[0] * return_data[1] * return_data[2]);
            }
        }
    }
    else {//received受けた側
        if (target_data.revise !== undefined && type === 'damage') {
            return_data[2] = target_data.revise.income;
        }
        if (target_data.effect !== undefined) {
            if (devMode.logLevel > 101) {
                console.log(target_data);
            }
            for (let i = 0; i < target_data.effect.length; i++) {
                //console.log('Receive Check->' + EFFECT_ID_LIST.indexOf(target_data.effect[i].buffID) + ':->'+target_data.effect[i].buffID);
                if (EFFECT_ID_LIST.indexOf(target_data.effect[i].buffID) !== -1) {
                    let id_detail = EFFECT_ID[target_data.effect[i].buffID];
                    //console.log(id_detail);
                    if (id_detail.type[2] && type === 'damage') {
                        if (id_detail.type[4]) {
                            return_data[0] = return_data[0] * id_detail.cut;
                        }
                        else {
                            return_data[1] = return_data[1] * id_detail.cut;
                        }
                    }
                    if (id_detail.type[3] && type === 'heal') {
                        if (id_detail.type[4]) {
                            return_data[0] = return_data[0] * id_detail.cut_heal;
                        }
                        else {
                            return_data[1] = return_data[1] * id_detail.cut_heal;
                        }
                    }
                }
                else {
                    if (target_data.effect[i].player !== 'E0000000') {
                        //console.warn('未登録の"EFFECT ID"->' + target_data.effect[i].buffID);
                    }
                }
            }
        }
        else {
            if (devMode.logLevel > 11) {
                console.warn(target_data);
            }
        }
        if (devMode.logLevel > 101) {
            console.log('buff->' + return_data[0] + ' debuff->' + return_data[1] + ' default_revise->' + return_data[2]);
        }
        if (nameID.substring(0, 2) === '40') {
            if (type === 'heal') {
                return (return_data[1] * return_data[0] * 1);
            }
            else {
                return (return_data[1] * return_data[0] * 1);
            }
        } else {
            if (target_data.maxhp === Chaiser_HP || target_data.maxhp === Oppressor_HP || target_data.maxhp === Justice_HP) {
                return ((return_data[1]) * 1);
            }
            else {
                return (return_data[1] * return_data[0] * return_data[2]);
            }
        }
    }
}

const effectdata_exchangeInt = async (effectdata) => {
    let data_name = [];
    let data_param = [];
    let data_type = [];
    let data_special = [];
    for (let i = 0; i < effectdata.length; i++) {
        data_name.push(effectdata[i].flag);
        data_type.push(effectdata[i].type);
        if (effectdata[i].flag === 'normal-damage' || effectdata[i].flag === 'heal' || effectdata[i].flag === 'mp-recover' || effectdata[i].flag === 'tp-recover') {
            let param_calc = await networkAbility_damage_calc(effectdata[i].param);
            data_param.push(param_calc.damage);
            data_special.push(param_calc.return);
            //console.log('damage->' + param_calc.damage + ' type->' + effectdata[i].flag + ' type->' + effectdata[i].type + ' rtn->' + param_calc.return);
        }
        else {
            data_param.push(effectdata[i].param.substring(0, effectdata[i].param.length - 4));
            data_special.push(false);
        }
    }
    return { name: data_name, param: data_param, type: data_type, special: data_special };
}

const network_action_datatype = async (log) => {
    const offset = 8;
    let return_data = [];
    for (let i = 0; i < 7; i++) {
        let target = offset + (i * 2);
        if (log[target] === '0') {
            if (offset < 6) {
                if (log[target + 2] === '0') {
                    return return_data;
                }
            } else {
                return return_data;
            }
        } else {
            let effectflag = log[target];
            let effectdamage = effectflag;
            let effect_param = log[target + 1];
            let type = 'null';
            if (effectflag.length > 1) {
                effectdamage = effectflag.substring(effectflag.length - 2, effectflag.length);
            }
            let flagdata = await effect_flag_checker(parseInt(effectdamage, 16));
            if (flagdata === null) {
                if (devMode.logLevel > 2) {
                    console.warn(effectdamage);
                    console.warn(log);
                }
            }
            if (effectflag.length >= 3) {
                if (flagdata === 'normal-damage') {
                    let effect_offset = effectflag.substring(effectflag.length - 4, effectflag.length - 2);
                    type = await effect_offset_checker(effect_offset, log);
                }
            }
            if (flagdata !== null) {
                return_data.push({ flag: flagdata, type: type, param: effect_param });
            }
        }
    }
    return return_data;
}

const effect_offset_checker = async (flag, log) => {
    switch (flag) {
        case '01':
            return 'miss';
        case '21':
            return 'ex-miss';
        case '05':
            return 'block';
        case '5':
            return 'block';
        case '40':
            return 'normal';
        case '25':
            return 'ex-block';
        case '60':
            return 'ex-normal';
        case '41':
            return 'miss';
        case '61':
            return 'ex-miss';
        default:
            console.warn('effect type offset unknown -> ' + flag);
            console.warn(log);
            return 'noraml';
    }
}

const effect_flag_checker = async (flag) => {
    switch (flag) {
        case 1:
            return 'miss-damage';
        case 2:
            console.log('normal-damage-2');
            return 'normal-damage';
        case 3:
            return 'normal-damage';
        case 4:
            return 'heal';
        case 5:
            console.log('parri-damage');
            return 'block-damage';
        case 6:
            console.log('parri-damage');
            return 'parri-damage';
        case 7:
            return 'invincible';//無敵に殴るとこれ（OP）
        case 8:
            return 'esuna-miss';//効果なし
        case 10:
            console.log('powerdrain');
            return 'powerdrain';
        case 11:
            return 'mp-recover';
        case 13:
            return 'tp-recover';
        case 14:
            return 'add-buff-victim';
        case 15:
            return 'add-buff-attacker';
        case 16:
            return 'esuna-one';//状態異常回復（１つのみ）
        case 17:
            return 'un-mount';//降りる (4011)
        case 19:
            return 'esuna';
        case 20:
            return 'no-effect';//効果なし
        case 24:
            return 'provoke';
        case 25:
            return 'provoke';
        case 27:
            return 'skill-replace';
        case 29:
            return 'additional_effect';//聖刻みたいなやつが敵についてて追加効果が発動している
        case 32:
            return 'knockback';
        case 33:
            return 'pull';
        case 40:
            return 'mount';
        case 45:
            return 'buff-extension-miss';
        case 51:
            return 'instant death';
        case 55:
            return 'debuff-resisted';
        case 59:
            return 'debuff-remove';//自身が与えたデバフを削除する。
        case 60:
            return 'control-ally';//ミクロコスモスでバフの終了を強制させる/バハムートに指示する等　別アクションを同時に実行させる
        case 61:
            return 'actor-jobgage';
        case 73:
            return 'un-dead';
        default:
            if (devMode.logLevel > 2) {
                console.warn(flag);
            }
            return null;
    }
}
