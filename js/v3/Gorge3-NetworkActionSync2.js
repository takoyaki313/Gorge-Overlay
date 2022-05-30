const Update_attacker = ['add-buff-attacker','tp-recover','mp-recover','additional-effect'];
let LastUniqueID = "";
async function networkactionsync_21_22_2(log){
  if(log.length > logline_21_22_max){
    if(DEBUG_LOG){
      console.error("Error : data length not matched 48/47 ->" + log.length);
      console.error(log);
    }
    return null;
  }
  let effectdata = await effectdata_exchangeInt(await network_action_datatype(log));
  //    attackerID : log[2],      attacker : log[3],
  let petcheck = await pet_replace(log[2],log[3]);
  let data = {
    attackerID : petcheck.nameID,
    attacker : petcheck.name,
    victimID : log[6],
    victim : log[7],
    actionID : log[4],
    action : log[5],
    victimCurrentHP : Number(log[24]),
    victimmaxHP : Number(log[25]),
    attackerCurrentHP:Number(log[34]),
    attackermaxHP : Number(log[35]),
    networknumber : log[44],
    lastupdate : log[1],
    time_ms : await timestamp_change(log[1]),
    count: "-" + log[45],
  };
  let effectmax = effectdata.name.length;

  let victim_effect = {name:[],param:[]};
  let attacker_effect = {name:[],param:[]};
  for(let i = 0 ; i < effectmax ; i++){
    if(Update_attacker.indexOf(effectdata.name[i]) === -1){//victim 側への影響
      if('normal-damage' === effectdata.name[i] && effectdata.special[i]){
        //counter damage
        let counter_position = victim_effect.name.indexOf('counter');
        if(counter_position !== -1){//2個目以降のdamage
          if(typeof effectdata.param[i] === 'number'){
            victim_effect.param[counter_position].param += effectdata.param[i];
          }else {
            if(DEBUG_LOG){
              console.error('21-22 連続攻撃の合算が出来ませんでした。');
              console.error(log);
              console.error(effectdata);
            }
          }
        }else {
          victim_effect.name.push('counter');
          victim_effect.param.push({type:effectdata.type[i],param:effectdata.param[i]});
        }
      }
      else if('normal-damage' === effectdata.name[i]){
        //victim_effect.name.push('damage');
        //victim_effect.param.push({type:effectdata.type[i],param:effectdata.param[i]});
        let damage_position = victim_effect.name.indexOf('damage');
        if(damage_position !== -1){//2個目以降のdamage
          if(typeof effectdata.param[i] === 'number'){
            victim_effect.param[damage_position].param += effectdata.param[i];
          }else {
            if(DEBUG_LOG){
              console.error('21-22 連続攻撃の合算が出来ませんでした。');
              console.error(log);
              console.error(effectdata);
            }
          }
        }else {
          victim_effect.name.push('damage');
          victim_effect.param.push({type:effectdata.type[i],param:effectdata.param[i]});
        }
      }
      else if ('skill-replace' === effectdata.name[i]||'actor-jobgage' === effectdata.name[i]||'additional_effect' === effectdata.name[i]) {

      }
      else {
        victim_effect.name.push(effectdata.name[i]);
        victim_effect.param.push(effectdata.param[i]);
      }
    }else {//attacker 側への影響
      /*if('normal-damage' === effectdata.name[i]){//反撃ダメージ
        attacker_effect.name.push('counter');
        attacker_effect.param.push({type:effectdata.type[i],param:effectdata.param[i]});
        console.warn(Log);
      }
      else*/ if('heal' === effectdata.name[i]){
        let heal_position = attacker_effect.name.indexOf('heal');
        if(heal_position !== -1){//2個目のヒール
          if(typeof effectdata.param[i] === 'number'){
            attacker_effect.param[heal_position] += effectdata.param[i];
          }else {
            if(DEBUG_LOG){
              console.error('21-22 吸収ヒールの合算が出来ませんでした。');
              console.error(log);
              console.error(effectdata);
            }
          }
        }else {
          attacker_effect.name.push(effectdata.name[i]);
          attacker_effect.param.push(effectdata.param[i]);
        }
      }else {
        attacker_effect.name.push(effectdata.name[i]);
        attacker_effect.param.push(effectdata.param[i]);
      }
    }
  }
  if(data.attackerID === data.victimID){//省略
    victim_effect.name = victim_effect.name.concat(attacker_effect.name);
    victim_effect.param = victim_effect.param.concat(attacker_effect.param);
    attacker_effect = {name:[],param:[]};
  }
  let victim_input_data = {target:[],data:[],replace:[]};
  let attacker_input_data = {target:[],data:[],replace:[]};

  if(victim_effect.name.length > 0){
    victim_input_data = await networkaction_calc(data,victim_effect,"victim");
  }
  if(attacker_effect.name.length > 0){
    attacker_input_data = await networkaction_calc(data,attacker_effect,"attacker");
  }
  let marge_input_data = await general_input_type(data.lastupdate,victim_input_data,attacker_input_data);
  if(NetworkActionSync){
    update_maindata_change_array('Player_data','nameID',data.attackerID,marge_input_data.target,marge_input_data.data,marge_input_data.replace);
  }
}
async function counterdamage_include(data,effect){
  let victim = {nameID:data.attackerID,name:data.attacker,hp:data.attackerCurrentHP,maxhp:data.attackermaxHP};
  let attacker = {nameID:data.victimID,name:data.victim,hp:data.victimCurrentHP,maxhp:data.victimmaxHP};
  let uniqueID = data.networknumber + victim.nameID + data.count;
  let input = {
    attackerID:attacker.nameID,
    attacker:attacker.name,
    victimID:victim.nameID,
    victim:victim.name,
    effectname:effect.name,
    effectparam:effect.param,
    inputname:null,
    inputdata:null,
    actionID:data.actionID,
    action:data.action,
    victimCurrentHP : victim.hp,
    victimmaxHP : victim.maxhp,
    attackerCurrentHP:attacker.hp,
    attackermaxHP : attacker.maxhp,
    time_send:data.lastupdate,
    time_accept:'not-yet',
    time_ms:data.time_ms,
    uniqueID:uniqueID,
  }
  let counter_check = input.effectname.indexOf('counter');
  let victim_input_data = {target:[],data:[],replace:[]};
  let attacker_input_data = {target:[],data:[],replace:[]};
  if(counter_check !== -1){
    attacker_input_data = await damage_heal_input_type(input.uniqueID,input.attackerID,input.victimID,input.attackermaxHP,input.attackerCurrentHP,input.victimmaxHP,input.victimCurrentHP,input.actionID,'damage',input.effectparam[counter_check],'counter');
    input.inputname = attacker_input_data.target;
    input.inputdata = attacker_input_data.data;
    let marge_input_data = await general_input_type(data.lastupdate,victim_input_data,attacker_input_data);
    update_maindata_change_array('Player_data','nameID',input.attackerID,marge_input_data.target,marge_input_data.data,marge_input_data.replace);
    return marge_input_data;
  }
}
async function networkaction_calc(data,effect,type){
  let attacker = {};
  let victim = {};
  let counter = effect.name.indexOf('counter') ;
  if(type === 'attacker'){
    attacker = {nameID:data.attackerID,name:data.attacker,hp:data.attackerCurrentHP,maxhp:data.attackermaxHP};
    victim = {nameID:data.attackerID,name:data.attacker,hp:data.attackerCurrentHP,maxhp:data.attackermaxHP};
  }
  else{
    attacker = {nameID:data.attackerID,name:data.attacker,hp:data.attackerCurrentHP,maxhp:data.attackermaxHP};
    victim = {nameID:data.victimID,name:data.victim,hp:data.victimCurrentHP,maxhp:data.victimmaxHP};
  }
  let uniqueID = data.networknumber + victim.nameID + data.count;
  let input = {
    attackerID:attacker.nameID,
    attacker:attacker.name,
    victimID:victim.nameID,
    victim:victim.name,
    effectname:effect.name,
    effectparam:effect.param,
    inputname:null,
    inputdata:null,
    actionID:data.actionID,
    action:data.action,
    victimCurrentHP : victim.hp,
    victimmaxHP : victim.maxhp,
    attackerCurrentHP:attacker.hp,
    attackermaxHP : attacker.maxhp,
    time_send:data.lastupdate,
    time_accept:'not-yet',
    time_ms:data.time_ms,
    uniqueID:uniqueID,
  }
  if(LastUniqueID === uniqueID){
    console.error(Log);
  }else{
    LastUniqueID = uniqueID;
  }
  let input_data = {target:['uniqueID'],data:[uniqueID],replace:[false]};

  //------------------------
  let damage_check = input.effectname.indexOf('damage');
  let heal_check = input.effectname.indexOf('heal');
  if(damage_check !== -1){
    input_data = await damage_heal_input_type(input.uniqueID,input.attackerID,input.victimID,input.attackermaxHP,input.attackerCurrentHP,input.victimmaxHP,input.victimCurrentHP,input.actionID,'damage',input.effectparam[damage_check],'normal');
    input.inputname = input_data.target;
    input.inputdata = input_data.data;
  }
  else if(heal_check !== -1){
    input_data = await damage_heal_input_type(input.uniqueID,input.attackerID,input.victimID,input.attackermaxHP,input.attackerCurrentHP,input.victimmaxHP,input.victimCurrentHP,input.actionID,'heal',input.effectparam[heal_check],'normal');
    input.inputname = input_data.target;
    input.inputdata = input_data.data;
  }
  //------------------------
  //barrier dot/hot
  for (let i = 0 ; i  < input.effectname.length ; i++){
    if(input.effectname[i] === "add-buff-attacker" || input.effectname[i] === "add-buff-victim"){
      let dot_position = DoT_ID_Array.indexOf(await effectdata_force4(input.effectparam[i]));
      if(dot_position !== -1){
        //special action potencial Hpdata insert
        await potencial_check_from_damage(DoT_ID[dot_position],dot_position,input);
      }
      //Barrier
      let barrier_position = Barrier_ID_Array.indexOf(await effectdata_force4(input.effectparam[i]));
      if(barrier_position !== -1){
        //include barrier
        let barrier_input = await New_potencial_check_barrier(input,barrier_position);
        input_data.data = input_data.data.concat(barrier_input.data);
        input_data.target = input_data.target.concat(barrier_input.target);
        input_data.replace = input_data.replace.concat(barrier_input.replace);
      }
    }else if (input.effectname[i] === "counter") {
        //ダメージだけ入れる
        let counter_input = await counterdamage_include(data,effect);
        input_data.data.push(counter_input);
        input_data.target.push('counter');
        input_data.replace.push(false);
    }
  }
  //-------------------------------
  //let insert_data = JSON.parse(JSON.stringify(input));
  insert_maindata_object('Action_data',input);
  await insert_maindata_object('Action_Sync_data',input);
  input_data.target.push('input');
  input_data.data.push(input);
  input_data.replace.push(false);
  return input_data;
  //------------------------------
}
async function general_input_type(lastupdate,damage_target,heal_target){
  let rtn = {target:['lastupdate'],data:[lastupdate],replace:[true]};
  if(damage_target.target.length > 0){
    rtn.target = rtn.target.concat(damage_target.target);
    rtn.data = rtn.data.concat(damage_target.data);
    rtn.replace = rtn.replace.concat(damage_target.replace);
    //console.log(damage_target);
  }
  if(heal_target.target.length > 0){
    rtn.target = rtn.target.concat(heal_target.target);
    rtn.data = rtn.data.concat(heal_target.data);
    rtn.replace = rtn.replace.concat(heal_target.replace);
  }
  return rtn;
}
//                                      -           -         -        -       -         -   type = damage/heal  param = Number special = DoT/HoT/counter/noraml..etc
async function damage_heal_input_type(uniqueID,attackerID,victimID,a_maxHP,a_CurrentHP,v_maxHP,v_CurrentHP,actionID,type,param,special){
  a_maxHP = typeof a_maxHP === 'number' ? a_maxHP : 0;
  a_CurrentHP = typeof a_CurrentHP === 'number' ? a_CurrentHP : 0;
  v_maxHP = typeof v_maxHP === 'number' ? v_maxHP : 0;
  v_CurrentHP = typeof v_CurrentHP === 'number' ? v_CurrentHP : 0;
  let rtn = {target:[],data:[],replace:[]};
  if (uniqueID !== null) {
    rtn = {target:['uniqueID'],data:[uniqueID],replace:[false]};
  }
  let damage = 0;
  let overdamage = 0;
  //let damagetype = "normal";
  if(special === 'normal'){
    if(typeof param === 'number'){
      damage = param;
    }else {
      damage = param.param;
      //damagetype = param.type;
      //critical damage etc...
    }
  }
  else if (special === "counter"){
    damage = param.param;
  }else{
    damage = param;
  }
  if(type === 'damage'){
    let target = await damage_target(victimID,attackerID,v_maxHP,a_maxHP,actionID,special);
    rtn = await damage_target_set(damage,overdamage,target,type,rtn);
  }else if (type === "heal") {
    let target = await heal_target(victimID,attackerID,actionID,special);
    overdamage = (damage + v_CurrentHP ) - v_maxHP;
    if(special  === 'barrier'){
      overdamage = 0;
    }
    else if(overdamage > 0){
      //overdamage include
    }
    else{
      overdamage = 0;
    }
    if(damage < overdamage){
      console.error('Overdamage Calc Error->'  + damage + ' < ' + overdamage);
      console.error(' v_CurrentHP ->'+ v_CurrentHP + ' v_maxHP->' + v_maxHP);
      console.error(Log);
    }
    rtn = await damage_target_set(damage,overdamage,target,type,rtn)
  }else {
    console.warn('type is Unknown : damage_heal_input_type ->' + type);
  }
  return rtn;
}
async function damage_target_set(damage,overdamage,paramName,type,rtn){
  let replace = [];
  let param = [];
  for(let i = 0 ; i < paramName.length ; i++){
    replace.push(false);
    if(paramName[i].substring(paramName[i].length - 4 ,paramName[i].length ) === '_num'){
      param.push(1);
    }else {
      param.push(damage);
    }
  }
  if(type === 'damage'){
    param.push(paramName.concat());
    paramName.push("damage_kind");
    replace.push(false);
  }else if (type === 'heal') {
    if(overdamage > 0){
      let overdamageName = [];
      for(let i = 0 ; i < paramName.length ; i++){
        overdamageName.push('over_' + paramName[i]);
        replace.push(false);
        param.push(overdamage);
      }
      paramName = paramName.concat(overdamageName);
    }
    param.push(paramName.concat());
    paramName.push("heal_kind");
    replace.push(false);
  }else{
    console.error('damage target unknown -> ' + type);
    return rtn;
  }
  if(paramName.length === replace.length && paramName.length === param.length){
    rtn.target = rtn.target.concat(paramName);
    rtn.data = rtn.data.concat(param);
    rtn.replace = rtn.replace.concat(replace);
    return rtn;
  }else {
    console.error('damage_target_set array length error ->' + paramName.length + ':' + replace.length + ':' + param.length);
    return rtn;
  }
}
async function heal_target(victimID,attackerID,actionID,special){
  let typeinput = ['totalheal'];
  typeinput.push('heal_total_' + special);
  if(attackerID.substring(0,2) === '40'){
    typeinput.push('heal_object');
    typeinput.push('heal_object_' + special);
  }else if (attackerID.substring(0,2) === '10') {
    if(victimID.substring(0,2) === "10"){
      if(victimID === attackerID){
        typeinput.push('heal_self');
        if(actionID === Kaiki){
          typeinput.push('heal_kaiki');
          typeinput.push('heal_kaiki_num');
        }else if (actionID === GunyouPosion) {
          typeinput.push('heal_G_posion');
          typeinput.push('heal_G_posion_num');
        }else {
          typeinput.push('heal_self_' + special );
        }
      }
      else {//自分以外のプレイヤー
        let attacker = await read_maindata('Player_data','nameID',attackerID,'aliance');
        let victim = await read_maindata('Player_data','nameID',victimID,'aliance');
        if(typeof attacker.aliance !== 'undefined' && typeof victim.aliance !== 'undefined'){
          if(attacker.aliance === 10){
            //24人そろってないためパーティ判別不能
            typeinput.push('heal_ally');
            typeinput.push('heal_ally_' + special);
          }
          else if (attacker.aliance === victim.aliance) {
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
        if(AREA.Area_Type === 5){//Crystal Conflict
          typeinput.push('heal_' + victimID);
          typeinput.push('heal_from_' + attackerID);
        }
      }
    }else {
      typeinput.push('heal_object');
    }
  }else {
    console.warn('heal attackerID error->' + attackerID);
  }
  return typeinput;
}
async function damage_target(victimID,attackerID,v_maxHP,a_maxHP,actionID,special){
  let typeinput = ['totaldamage'];
  typeinput.push('damage_total_' + special);
  if(attackerID.substring(0,2) === '40'){//オブジェクト等の攻撃の場合
    typeinput.push('damage_object');
    typeinput.push('damage_object_' + special);
  }
  else if (attackerID.substring(0,2) === '10') {
    if(victimID.substring(0,2) === "10"){
      typeinput.push('damage_player');
      if(AREA.Area_Type === 2){//Hidden Gorge
        let attack_target = ['G_P_attack'];
        //自身のダメージの種類
        if(actionID === "XXXX"){//Canon
          attack_target.push("canon");
        }else {
          attack_target.push("damage");
          if(a_maxHP === Chaiser_HP){
            attack_target.push("robot");
            attack_target.push("che");
          }else if (a_maxHP === Oppresor_HP) {
            attack_target.push("robot");
            attack_target.push("opp");
          }else if (a_maxHP === Justice_HP) {
            attack_target.push("robot");
            attack_target.push("jus");
          }else {
            attack_target.push("person");
          }
        }
        typeinput.push(attack_target.join("_"));
        let victim_target = ['G_P_to']
        victim_target.push("damage");
        if(v_maxHP === Chaiser_HP){
          victim_target.push("robot");
          victim_target.push("che");
          typeinput.push('torobotdamage');
        }else if (v_maxHP === Oppresor_HP) {
          victim_target.push("robot");
          victim_target.push("opp");
          typeinput.push('torobotdamage');
        }else if (v_maxHP === Justice_HP) {
          victim_target.push("robot");
          victim_target.push("jus");
          typeinput.push('torobotdamage');
        }else {
          victim_target.push("person");
          typeinput.push('persondamage');
        }
        typeinput.push(victim_target.join("_"));
      }
      else if (AREA.Area_Type === 5) {//Crystal Conflict
        typeinput.push('damage_' + victimID);
        typeinput.push('damage_from_' + attackerID);
      }
    }else{//FieldID / NPC
      typeinput.push('damage_object');
      if(AREA.Area_Type === 2){//Hidden Gorge
        let attack_target = ['G_O_attack'];
        attack_target.push("damage");
        if(actionID === "XXXX"){//Canon
          attack_target.push("canon");
        }else {
          attack_target.push("damage");
          if(a_maxHP === Chaiser_HP){
            attack_target.push("robot");
            attack_target.push("che");
          }else if (a_maxHP === Oppresor_HP) {
            attack_target.push("robot");
            attack_target.push("opp");
          }else if (a_maxHP === Justice_HP) {
            attack_target.push("robot");
            attack_target.push("jus");
          }else {
            attack_target.push("person");
          }
        }
        typeinput.push(attack_target.join("_"));
        if(v_maxHP > 1000000){//Tower Core
          typeinput.push("damage_tower");
        }else {
          typeinput.push("damage_maton");
        }
      }
    }
  }else {
    console.log('Attacker Unknown ->' + attackerID);
  }
  return typeinput;
}
//////////////////////////////////////////////////////////////////////////
//Barrier
//////////////////////////////////////////////////////////////////////////
async function New_potencial_check_barrier(data,effectposition){
  let action_detail = await potencial_action_search_tool(Barrier_ID,data.actionID,Barrier_ID[effectposition].dotid,effectposition);
  let barrier = 0;
  if(action_detail.synctype === 'calc'){
    barrier = await potencial_to_damage_calc_effect(data.attackerID,data.victimID,action_detail.potencial,'HoT');
  }else if (action_detail.synctype === 'heal'){
    let damage = action_detail.action_potencial;
    for(let i = 0 ; i < data.effectname.length ; i++){
      if(data.effectname[i] === 'heal'){
        damage = data.effectparam[i] * action_detail.damagesync;
        break;
      }
    }
    barrier = damage;
  }
  else if (action_detail.synctype === 'maxhp'){
    if (data.victimmaxHP === 0) {
      barrier = action_detail.potencial;
    }else {
      barrier = data.victimmaxHP * action_detail.damagesync;
    }
  }else {
    console.warn('ActionSync Barrier Calc Failed :Sync Type Unknown ->' + action_detail.synctype);
    console.warn(action_detail);
  }
  return await damage_heal_input_type(null,data.attackerID,data.victimID,data.attackermaxHP,data.attackerCurrentHP,data.victimmaxHP,data.victimCurrentHP,action_detail.dotid,'heal',barrier,'barrier');
}
////////////////////////////////////////////////////////////////
//  effectdata return
//name: (2) ['normal-damage', 'knockback']
//param: (2) [3200, '1']
//special: (2) [false, false]  // true is 自傷/吸収
//type: (2) ['normal', 'null'] //防御等 スキル条件での攻撃上昇
////////////////////////////////////////////////////////////////
