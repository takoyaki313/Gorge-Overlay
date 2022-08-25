let check = null;
let check_2 = null;
let AcceptMarginTime = 100;
let AcceptMarginTime_mag = 1.1;
async function networkDoT_24(log) {
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
    if (DEBUG_LOG) {
      console.error('Eroor : This log Dot type unknown->' + data.DoTType);
    }
  }
  data.overdamage = await over_damage(damage_type, data.damage, Number(log[7]), data.victimmaxhp);
  if (check !== uniqueID) {
    check = uniqueID;
    check_2 = log;
  }
  else {
    if (DEBUG_LOG) {
      console.error('This ID is Not Unique->' + uniqueID);
      console.error(log);
      console.error(check_2);
    }
  }
  if (data.effectID === '0') {
    let effect = await read_maindata('Player_hp', 'nameID', data.victimID, 'effect', 'dot_potencial');
    if (effect.effect === undefined) {
      if (DEBUG_LOG) {
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
      if (DEBUG_LOG) {
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
      if (DEBUG_LOG) {
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
    if (DEBUG_LOG) {
      console.error('Warn : DoT EffectID Unknown ->' + data.effectID);
      console.error(log);
    }
  }
}
async function meteor_drive(data) {
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
        if (DEBUG_LOG) {
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
async function kardia_heal(data) {
  let read_data = await read_maindata('Player_hp', 'nameID', data.victimID, 'effect');
  if (Object.keys(read_data).length === 1) {//include
    if (typeof read_data.effect === 'object') {
      let attacker = null;//適当
      for (let i = 0; i < read_data.effect.length; i++) {
        if (read_data.effect[i].buffID === '0B38') {//カルディア被
          if (attacker === null) {
            attacker = read_data.effect[i].attacker;
          } else {
            if (DEBUG_LOG) {
              console.warn('Warn : 複数人からカルディアを受けている。');
              console.warn(read_data);
            }
            return null;
          }
        }
      }
      if (attacker === null) {
        if (DEBUG_LOG) {
          console.warn('Kardia effect not include->' + data.victimID);
        }
      } else {
        await new_change_accept_damage(attacker, data.victimID, data.victimCurrenthp, data.victimmaxhp, data.damage, 'kardia-heal', data.uniqueID, data.lastupdate);
      }
      //-------------
    }
  }
}
async function unique_dot_player_hp_add(data, dot_name, uniqueID, damage_type) {
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
//
async function puneuma_calc(data, uniqueID, log) {
  /*let data = {
    victimID: log[2],
    victim:log[3],
    victimmaxhp:Number(log[8]),
    DoTType : log[4],
    effectID : log[5],
    damage : parseInt(log[6],16),
    lastupdate : log[1]
  };*/
  let read_data = await read_maindata('Player_hp', 'nameID', data.victimID, 'puneuma');
  if (read_data.puneuma !== undefined) {
    for (let i = 0; i < read_data.puneuma.length; i++) {
      if (read_data.puneuma[i].receive === data.lastupdate) {
        let puneuma_data = read_data.puneuma[i];
        let new_puneuma = read_data.puneuma.slice(0, i);
        new_puneuma.concat(read_data.puneuma.slice(i + 1,));
        await new_change_accept_damage(puneuma_data.attackerID, data.victimID, data.victimCurrenthp, data.victimmaxhp, data.damage, 'HoT', uniqueID, data.lastupdate);
        //await change_accept_damage(puneuma_data.attackerID,data.victimID,data.victimmaxhp,data.damage,data.overdamage,17500,'heal',uniqueID,data.lastupdate);
        await update_maindata('Player_hp', 'nameID', data.victimID, ['puneuma', new_puneuma, true]);
        return null;
      }
    }
    let now = await timestamp_change(data.lastupdate);
    if (now - read_data.puneuma[read_data.puneuma.length - 1].receive_time < 10) {
      //let num = now - read_data.puneuma[read_data.puneuma.length - 1].receive_time;
      //console.error('Probably...? '  + num);
      let puneuma_data = read_data.puneuma[read_data.puneuma.length - 1];
      await new_change_accept_damage(puneuma_data.attackerID, data.victimID, data.victimCurrenthp, data.victimmaxhp, data.damage, 'HoT', uniqueID, data.lastupdate);
      //await change_accept_damage(puneuma_data.attackerID,data.victimID,data.victimmaxhp,data.damage,data.overdamage,17500,'heal',uniqueID,data.lastupdate);
      await update_maindata('Player_hp', 'nameID', data.victimID, ['puneuma', read_data.puneuma.slice(0, -1), true]);
      return null;
    }
    if (DEBUG_LOG) {
      console.warn('Puneuma Not Found ');
      console.warn(log);
    }
  }
}
//await new_dot_damage_cut(simulation_data,data.victimID,data.victimCurrenthp,data.victimmaxhp,data.DoTType,data.lastupdate,uniqueID);
async function new_dot_damage_cut(simulation_data, victimID, victimCurrenthp, victimmaxhp, damage_type, lastupdate, uniqueID) {
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
async function dot_damage_cut(simulation_data, victimID, victimmaxhp, damage_type, lastupdate, uniqueID) {
  for (let i = 0; i < simulation_data.length; i++) {
    let overdamage = simulation_data[i].overdamage;
    let damage = simulation_data[i].damage;
    let damage_input_nameID = await pet_replace(simulation_data[i].player, "");
    simulation_data[i].player = damage_input_nameID.nameID;
    let add_target = await damage_add(damage_input_nameID.nameID, victimID, victimmaxhp, damage_type, damage, null);
    let created_data = await add_target_data_create(add_target, damage, overdamage, 'dot_calc', damage_type, lastupdate);
    add_target = created_data[0];
    let add_target_data = created_data[1];
    let add_target_replace = created_data[2];
    //////////////
    //console.log(add_target);
    //console.log(add_target_data);
    //console.log(add_target_replace);
    await update_maindata_change_array('Player_data', 'nameID', simulation_data[i].player, add_target, add_target_data, add_target_replace);
    ////
    if (damage_type === 'normal-damage') {
      await update_maindata('Player_hp', 'nameID', victimID, ['attacker', { attacker: simulation_data[i].player, type: 'DoT-damage' }, false]);
    }
    let data = await read_maindata('Player_hp', 'nameID', simulation_data[i].player, 'maxhp');

    //console.log('UniqueID->' + uniqueID + ' :AttckerID->' + simulation_data[i].player + '(' + data.maxhp + ') ->' + victimID + '  damage->' + damage + ' : ' + damage_type);

    if (Object.keys(data).length === 1) {//include maxhp
      await income_switch_main(uniqueID, simulation_data[i].player, data.maxhp, victimID, damage, lastupdate, add_target, damage_type);
    }
    else {//Kari data
      //console.error('HP_data Not Found');

      await income_switch_main(uniqueID, simulation_data[i].player, 15000, victimID, damage, lastupdate, add_target, damage_type);
    }
    /////////////////////////
  }
}
async function dot_damage_distribution(data, sum, totaldamage, totaloverdamage) {
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
        if(DEBUG_LOG){
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
async function player_buff_add_26(log) {
  let data = { buffID: await buffID_cordinate(log[2]), attacker: log[5], victim: log[7], buff: log[3], time: Number(log[4]), time_ms: await timestamp_change(log[1]), lastupdate: log[1] };
  if (Stack_buff.indexOf(data.buffID) !== -1) {
    data.buffID = log[9] + data.buffID;
  }
  let special = Special_Barrier_ID_Array_Dot.indexOf(data.buffID);
  if (special !== -1) {
    let player_effect = await read_maindata('Player_hp', 'nameID', data.victim, 'effect', 'currenthp', 'maxhp');
    let victim = { currenthp: player_effect.currenthp, maxhp: player_effect.maxhp, nameID: data.victim };
    if (typeof victim.maxhp !== 'number') {
      victim.currenthp = 33333;
      victim.maxhp = 11111;
      //DUMMY
      console.warn('26:VICTIM DUMMY_HP APPLY');
    }
    //let attacker = await read_maindata('Player_hp','nameID',data.attacker,data.buffID,'currenthp','maxhp');
    let barrier = await potencial_to_damage_calc_effect(data.attacker, data.victim, Special_Barrier_ID[special].potencial, 'HoT');
    await new_change_accept_damage(data.attacker, data.victim, victim.currenthp, victim.maxhp, barrier, 'Kardia-barrier', data.buffID + data.lastupdate + data.attacker + data.victim, data.lastupdate);
  }
  //Meteor Drive
  if (data.buffID === '0C67') {
    data.hit = 3;
    await update_maindata('Player_hp', 'nameID', log[7], ['effect', data, false], [data.buffID, data, false], ['lastupdate', log[1], true]);
  }
  else {
    await update_maindata('Player_hp', 'nameID', log[7], ['effect', data, false], ['lastupdate', log[1], true]);
  }
}
async function player_buff_list_update(data, nameID, lastupdate) {
  if (data.length % 3 !== 0) {
    if (DEBUG_LOG) {
      console.error('This data area is %3 === 0 -> ' + data.length);
      console.error(data);
    }
    return null;
  }
  if (data.length === 0) {
    //effect reset
    await update_maindata('Player_hp', 'nameID', nameID, ['effect', [], true], ['dot_potencial', [], true], ['lastupdate', lastupdate, true]);
    return null;
  }
  else {
    let data_num = data.length / 3;
    let checked = 0;
    let replace_data = [];
    for (let i = 0; i < data_num; i++) {
      //console.log(data[0 + (i * 3)] + ':'+data[1 + (i * 3)] + ':'+data[2 + (i * 3)]);
      if (data[0 + (i * 3)] !== '0' || data[2 + (i * 3)] !== '0') {
        let effectID = await buffID_cordinate(data[0 + (i * 3)]);
        if (Stack_buff.indexOf(effectID) !== -1) {
          replace_data.push({ buffID: data[0 + (i * 3)], attacker: data[2 + (i * 3)] });
          checked += await dunamis_checker(nameID, effectID, parseInt(data[0 + (i * 3)].substring(0, 2), 16), lastupdate);
        }
        else {
          replace_data.push({ buffID: effectID, attacker: data[2 + (i * 3)] });
          checked += await dunamis_checker(nameID, effectID, null, lastupdate);
        }
      }
    }
    if (checked === data_num) {//No Tensyon
      await update_maindata('Player_hp', 'nameID', nameID, ['effect', replace_data, true], ['dunamis', null, true]);
    }
    else {
      await update_maindata('Player_hp', 'nameID', nameID, ['effect', replace_data, true]);
    }
  }
}
async function dunamis_checker(nameID, effectID, rank, lastupdate) {
  let dunamis = ['0853', '0854', '0855', '0856', '0857', '05B9', '06C2'];
  // 05B9 Tensyon    06C2 TensyonMax
  if (dunamis.indexOf(effectID) !== -1 && nameID.substring(0, 2) === "10") {
    if (effectID === '05B9') {
      if (typeof rank !== 'number') {
        if (DEBUG_LOG) {
          console.error('Tensyon_num is unknown', rank);
          console.error(Log);
        }
        return null;
      }
      update_maindata('Player_data', 'nameID', nameID, ['dunamis', rank, true]);
      if (AREA.Area_Type === 2) {
        aliance_dunamis_update(nameID, rank, lastupdate);
      }
    }
    else {//Tensyon 以外
      update_maindata('Player_data', 'nameID', nameID, ['dunamis', effectID, true]);
      if (AREA.Area_Type === 2) {
        aliance_dunamis_update(nameID, 20, lastupdate);
      }
    }
    return 0;
  }
  else {
    return 1;
  }

}
async function buffID_cordinate(id) {
  if (id.length > 4) {
    return id.substring(id.length - 4, id.length);
  } else if (id.length < 4) {
    return await effectdata_force4(id);
  }
  else if (id.length === 4) {
    return id;
  }
}
async function unique_buff_remove_action(log, dot_name) {
  let attackerID = log[5];
  let victimID = log[7];
  let lastupdate = log[1];
  let victimhp = 0;
  let victimmaxhp = 48000;
  let read_data = await read_maindata('Player_hp', 'nameID', victimID, dot_name, 'currenthp', 'maxhp');
  if (Object.keys(read_data).length === 0) {
    if (DEBUG_LOG) {
      console.warn(dot_name + ' Data Not Found');
      console.warn(log);
    }
    return null;
  }
  if (read_data[dot_name] === undefined) {
    if (DEBUG_LOG) {
      console.log(dot_name + ' Data Not Found [undefined]');
      console.log(log);
    }
    return null;
  }
  if (read_data[dot_name].length === 0) {
    if (DEBUG_LOG) {
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
    if (DEBUG_LOG) {
      console.warn(dot_name + ':Accept Action Time Not Found->' + now);
      console.warn(log);
    }
  }
}
let UniqueID_end = 3;
async function network_buff_removerd_30(log) {
  //Calc Target ID ->52B Wild Fire
  //
  for (let i = UniqueID_end; i < Unique_DoT_ID_Array.length; i++) {
    if (log[2] === Unique_DoT[i].id && log[2] !== 'C67') {//Meteor Drive Exclude
      await unique_buff_remove_action(log, Unique_DoT[i].id, 17500);
    }
  }
}
async function new_change_accept_damage(attackerID, victimID, victimCurrenthp, victimmaxhp, damage, damage_type, uniqueID, lastupdate) {
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

/*
async function change_accept_damage(attackerID,victimID,victimmaxhp,damage,overdamage,attackermaxhp,damage_type,uniqueID,lastupdate){
  //attacker side
  let a_petcheck = await pet_replace(attackerID,"");
  let v_petcheck = await pet_replace(victimID,"");
  let add_target = await damage_add(a_petcheck.nameID,victimID,victimmaxhp,damage_type,damage,'skillID');
  let created_data = await add_target_data_create(add_target,damage,overdamage,uniqueID,damage_type,lastupdate);
  await update_maindata_change_array('Player_data','nameID',a_petcheck.nameID,created_data[0],created_data[1],created_data[2]);
  //victim side
  await update_maindata('Player_hp','nameID',v_petcheck.nameID,['attacker',{attacker:a_petcheck.nameID,type:'unique_dot'},false]);
  await income_switch_main(uniqueID,a_petcheck.nameID,attackermaxhp,v_petcheck.nameID,damage,lastupdate,add_target,damage_type);
}
*/
