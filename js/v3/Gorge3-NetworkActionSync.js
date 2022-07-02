var Barrier_incomeheal = true;

async function over_damage(damage_type, damage, currenthp, maxhp) {
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
async function networkAbility_damage_calc(damage_bit) {
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
    if (DEBUG_LOG) {
      console.warn('Error: networkAbility-damage is not 4 lower length ...->' + damage_bit);
    }
    return { damage: 0, return: false };
  }
}
async function doublerocketpuntch_hit_pct(nameID, victimID, hitnum, lastupdate) {
  if (victimID === Field_ID) {//miss shot
    await update_maindata('Player_data', 'nameID', nameID, ['totalrocketpuntch', 1, false], ['missrocketpuntch', 1, false], ['lastupdate', lastupdate, true]);
  }
  else {//hit
    await update_maindata('Player_data', 'nameID', nameID, ['totalrocketpuntch', 1, false], ['hitrocketpuntch', 1, false], ['hitrocketpuntchavarage', hitnum, false], ['lastupdate', lastupdate, true]);
  }
}
async function effectdata_force4(param) {
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
async function potencial_action_search_tool(target, actionID, dotid, position) {
  let max = target.length;
  for (let search_position = position; search_position < max; search_position++) {
    if (target[search_position].dotid === dotid) {
      if (actionID === target[search_position].actionid) {
        return target[search_position];
      }
    } else {
      if (DEBUG_LOG) {
        console.warn('EFFECTID Not Matched... dotid:' + dotid + ' actionID:' + actionID);
      }
      return target[position];
    }
  }
}
async function potencial_check_from_damage(dot_detail, id_data_position, data) {
  if (dot_detail.actionid !== data.actionID) {
    let dot_id_position = DoT_ID_Array.indexOf(dot_detail.dotid, id_data_position + 1);
    dot_detail = DoT_ID[dot_id_position];
    if (dot_id_position === -1) {
      if (DEBUG_LOG) {
        console.error('dot data not found');
        console.error(data);
      }
      //return test;
      return null;
    } else if (dot_detail.actionid !== data.actionID) {
      dot_id_position = DoT_ID_Array.indexOf(dot_detail.dotid, dot_id_position + 1);
      dot_detail = DoT_ID[dot_id_position];
      if (dot_id_position === -1) {
        if (DEBUG_LOG) {
          console.error('dot data not found');
          console.error(data);
        }
        //return test;
        return null;
      } else {

      }
      if (dot_detail.actionid !== data.actionID) {
        if (DEBUG_LOG) {
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
async function potencial_to_damage_calc_effect(attackerID, victimID, default_potencial, damage_type) {
  let attacker_data = await read_maindata('Player_hp', 'nameID', attackerID, 'effect', 'revise', 'maxhp');
  let victim_data = {};
  if (attackerID === victimID) {
    victim_data = attacker_data;
  }
  else {
    victim_data = await read_maindata('Player_hp', 'nameID', victimID, 'effect', 'revise', 'maxhp');
  }
  if (Object.keys(attacker_data).length === 0 || Object.keys(victim_data).length === 0) {
    if (DEBUG_LOG) {
      console.warn('read_error potencial calc failed->');
    }
    return default_potencial;
  }
  /*
  <-damage->
  potencial * (buff - debuff) * revise -> (buff - debuff) * revise = damage
  */
  if (damage_type === 'DoT') {//damage
    let attacker = await potencial_to_damage_calc_id(attacker_data, attackerID, 'damage', true);
    let victim = await potencial_to_damage_calc_id(victim_data, victimID, 'damage', false);
    if (DoT_Simulate_Debug_massage) {
      console.log(default_potencial + ' * ' + attacker + ' * ' + victim + ' = ' + default_potencial * attacker * victim);
    }
    //console.log(default_potencial +' : '+ attacker + ' : '+ victim);
    return Math.round(default_potencial * attacker * victim);
  } else {//heal
    let attacker = await potencial_to_damage_calc_id(attacker_data, attackerID, 'heal', true);
    let victim = await potencial_to_damage_calc_id(victim_data, victimID, 'heal', false);
    if (DoT_Simulate_Debug_massage) {
      console.log(default_potencial + ' * ' + attacker + ' * ' + victim + ' = ' + default_potencial * attacker * victim);
    }
    //console.log(default_potencial +' : '+ attacker + ' : '+ victim);
    return Math.round(default_potencial * attacker * victim);
  }
}
async function potencial_to_damage_calc_id(target_data, nameID/*effect revise maxhp*/, type/*damage/heal*/, send) {
  let return_data = [1, 1, 1];
  if (send) {//与えた側
    if (target_data.effect !== undefined) {
      if (DoT_Simulate_Debug_massage) {
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
      if (DoT_Simulate_Debug_massage) {
        console.warn(target_data);
      }
    }
    if (target_data.revise !== undefined) {
      return_data[2] = target_data.revise.damage;
    }
    if (DoT_Simulate_Debug_massage) {
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
      if (target_data.maxhp === Chaiser_HP || target_data.maxhp === Oppresor_HP || target_data.maxhp === Justice_HP) {
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
      if (DoT_Simulate_Debug_massage) {
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
      if (DoT_Simulate_Debug_massage) {
        console.warn(target_data);
      }
    }
    if (DoT_Simulate_Debug_massage) {
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
      if (target_data.maxhp === Chaiser_HP || target_data.maxhp === Oppresor_HP || target_data.maxhp === Justice_HP) {
        return ((return_data[1]) * 1);
      }
      else {
        return (return_data[1] * return_data[0] * return_data[2]);
      }
    }
  }
}
async function effectdata_exchangeInt(effectdata) {
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
async function network_action_datatype(log) {
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
        if (DEBUG_LOG) {
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
async function effect_offset_checker(flag, log) {
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
async function effect_flag_checker(flag) {
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
    default:
      if (DEBUG_LOG) {
        console.warn(flag);
      }
      return null;
  }
}
