let POTENCIAL_DAMAGE = false;
let Barrier_Unique_ID = 0;
var Barrier_incomeheal = true;
async function networkAbility_Skilldata_insert(uniqueID,damage,damage_type,additional_damage_type,abilityID,nameID,maxhp,victimID,skillID,name,victimname,skillname,lastupdate,add_target,overdamage,time_ms,victimmaxHP){
  await insert_maindata('Skill_data','actionwithnameID',uniqueID,
  ['networkskill_id',abilityID,true],['nameID',nameID,true],['name',name,true],['maxHP',maxhp,true],
  ['victimID',victimID,true],['victimname',victimname,true],['victimmaxHP',victimmaxHP,true],
  ['skillID',skillID,true],['skillname',skillname,true],['damage_type',damage_type,true],['damage',damage,true],['overdamage',overdamage,true],['add_target',add_target,true],
  ['additional_damage',additional_damage_type,true],['time_send',lastupdate,true],['time_accept','not yet',true],['time_ms',time_ms,true]);
}
async function add_target_data_create(add_target,damage,overdamage,uniqueID,damage_type,lastupdate){
  let add_target_data = [];
  let add_target_replace = [];
  if(damage_type === 'heal'){
    for(let i = 0 ; i < add_target.length ; i++){
      add_target_data.push(damage);
      add_target_replace.push(false);
    }
    add_target.push('overheal');
    add_target_data.push(overdamage);
    add_target_replace.push(false);
  }
  else if (damage_type === 'normal-damage'||damage_type === 'damage'){
    for(let i = 0 ; i < add_target.length ; i++){
      add_target_data.push(damage);
      add_target_replace.push(false);
    }
    add_target.push('overdamage');
    add_target_data.push(overdamage);
    add_target_replace.push(false);
  }
  else if (damage_type === 'mp-recover') {
    for(let i = 0 ; i < add_target.length ; i++){
      add_target_data.push(damage);
      add_target_replace.push(false);
    }
  }
  else if (damage_type === 'barrier') {
    for(let i = 0 ; i < add_target.length ; i++){
      add_target_data.push(damage);
      add_target_replace.push(false);
    }
  }
  else if (damage_type === null) {

  }
  else {
    //console.error('Error : Damage Type unknown->' + damage_type);
  }
  if(uniqueID === 'dot_calc'){
    add_target.push('dot');
    add_target_data.push(damage);
    add_target_replace.push(false);
  }else {
    if(add_target === null){
      add_target = ['usedskill'];
      add_target_data = [uniqueID];
      add_target_replace = [false];
    }
    else{
      add_target.push('usedskill');
      add_target_data.push(uniqueID);
      add_target_replace.push(false);
    }
  }
  add_target.push('lastupdate');
  add_target_data.push(lastupdate);
  add_target_replace.push(true);
  if(add_target.length !== add_target_data.length &&add_target.length !== add_target_replace.length){
    if(DEBUG_LOG){
      console.error("Error : add_target_data_create failed...->"+damage_type);
    }
  }
  return [add_target,add_target_data,add_target_replace];
}
async function over_damage(damage_type,damage,currenthp,maxhp){
  if(damage_type === 'heal' ){
    let over = (damage + currenthp ) - maxhp;
    if(over > 0){
      return over;
    }
    else {
      return 0;
    }
  }
  else if (damage_type === 'damage'||damage_type === 'normal-damage') {
    let over = damage - currenthp;
    if(over < 0){
      return 0 ;
    }
    else {
      return over;
    }
  }
  else if (damage_type === 'mp_recover') {
    return null;
  }
  else{
    return null;
  }
}
async function damage_add(attackerID,victimID,victimmaxHP,damage_type,damage,skillID){
  let add_target = [];
  if(damage_type === 'damage'||damage_type === 'normal-damage'){
    add_target = await damage_add_type_select(victimID,victimmaxHP,damage);
  }
  else if (damage_type === 'heal') {
    add_target = await damage_add_type_select_heal(attackerID,victimID);
  }
  else if (damage_type === null) {
    add_target = null;
  }
  else if (damage_type === 'mpheal'||damage_type === 'mp-recover') {
    add_target = ['mpheal'];
  }
  else if (damage_type === 'barrier') {
    add_target = await damage_add_type_select_heal(attackerID,victimID);
    add_target.push('barrier');
  }
  else {
    //console.warn('Warn : Damage Type is unknown->' + damage_type);
    return null;
  }
  return add_target;
}
async function damage_add_type_select(victimID,victimmaxHP,damage){
  let return_data = ['totaldamage'];

  if(victimID.substring(0,2) === '10'){
    return_data.push('playerdamage');
    if(victimmaxHP === Chaiser_HP || victimmaxHP === Oppresor_HP || victimmaxHP === Justice_HP){
      return_data.push('torobotdamage');
    }
    else if (victimmaxHP === 0){
      return_data.push('persondamage');
      return_data.push('playerotherdamage');
    }
    else{
      return_data.push('persondamage');
    }
  }
  else if(victimID.substring(0,2) === '40'){
    return_data.push('objectdamage');
    if(victimmaxHP === Core_Tower_HP){
      return_data.push('towerdamage');
    }
    else if (victimmaxHP === 0) {
      if(damage > 10000){
        return_data.push('towerdamage');
      }else {
        return_data.push('matondamage');
      }
      return_data.push('objectotherdamage');
    }
    else{
      return_data.push('matondamage');
    }
  }
  else{
    if(DEBUG_LOG){
      console.error('Error: (damage_add_type_select) target type unknown->' + victimID);
    }
  }
  return return_data;
}
async function damage_add_type_select_heal(attackerID,victimID){
  let return_data = ['totalheal'];
  if(victimID.substring(0,2) === '10'){
    if(attackerID === victimID){
      return_data.push('selfheal');
    }
    else {
      let attacker = await read_maindata('Player_data','nameID',attackerID,'aliance');
      let victim = await read_maindata('Player_data','nameID',victimID,'aliance');
      if(typeof attacker.aliance !== 'undefined' && typeof victim.aliance !== 'undefined'){
        if(attacker.aliance === 10){
          //24人そろってないためパーティ判別不能
          return_data.push('allyheal');
        }
        else if (attacker.aliance === victim.aliance) {
          return_data.push('partyheal');
        }
        else {
          return_data.push('allyheal');
        }
      }
      else {
        return_data.push('allyheal');
      }
    }
  }
  else if (victimID.substring(0,2) === '40') {
    return_data.push('otherheal');
  }
  else{
    if(DEBUG_LOG){
      console.warn('Warn : VictimID is probably null->'+ victimID);
    }
  }
  return return_data;
}

async function networkAbility_damage_calc(damage_bit){
  if(damage_bit.length >= 4){
    let ab = damage_bit.substring(0,damage_bit.length - 4);
    let c = damage_bit.substring(damage_bit.length - 4,damage_bit.length - 2);
    let d = damage_bit.substring(damage_bit.length - 2,damage_bit.length);
    let damage = 0;
    if( c === '00'& d === '00'){
      damage = parseInt( ab ,16);
    }
    else if ( c === '40') {
      let b = damage_bit.substring(damage_bit.length - 6,damage_bit.length - 4);
      let a = damage_bit.substring(damage_bit.length - 8,damage_bit.length - 6);
      damage = parseInt( d + a + b ,16);
    }
    else if ( c === '80' && d === '00') {
      damage = parseInt( ab ,16);
    }
    return damage;
  }
  else if (damage_bit.length === 1) {
    return 0;
  }
  else {
    if(DEBUG_LOG){
      console.warn('Error: networkAbility-damage is not 4 lower length ...->' + damage_bit);
    }
    return 0;
  }
}
async function doublerocketpuntch_hit_pct(nameID,victimID,hitnum,lastupdate){
  if(victimID === Field_ID){//miss shot
    await update_maindata('Player_data','nameID',nameID,['totalrocketpuntch',1,false],['missrocketpuntch',1,false],['lastupdate',lastupdate,true]);
  }
  else {//hit
    await update_maindata('Player_data','nameID',nameID,['totalrocketpuntch',1,false],['hitrocketpuntch',1,false],['hitrocketpuntchavarage',hitnum,false],['lastupdate',lastupdate,true]);
  }
}
async function networkactionsync_21_22(log){
  const logline_21_22_max = 48;
  if(log.length > logline_21_22_max ||log.length < logline_21_22_max - 1){
    if(DEBUG_LOG){
      console.error("Error : data length not matched 48/47 ->" + log.length);
      console.error(log);
    }
    return null;
  }
  let effectdata = await effectdata_exchangeInt(await network_action_datatype(log));
  let data = {
    attackerID : log[2],
    attacker : log[3],
    victimID : log[6],
    victim : log[7],
    actionID : log[4],
    action : log[5],
    effectname : effectdata[0],
    effectparam : effectdata[1],
    victimCurrentHP : Number(log[24]),
    victimmaxHP : Number(log[25]),
    attackerCurrentHP:Number(log[34]),
    attckermaxHP : Number(log[35]),
    networknumber : log[44],
    lastupdate : log[1],
    time_ms : await timestamp_change(log[1])
  };

  if(AREA.Area_Type === 2){//Hidden Gorge
    if(data.actionID === DoubleRocketPuntch){
      if(log[45] === '0'){
        await doublerocketpuntch_hit_pct(data.attackerID,data.victimID,Number(log[46]),data.lastupdate);
      }
    }
  }
  if(data.attackerID.substring(0,2) === '40'){//もしペットIDならIDと名前を本人に入れ替える。
    let searched = await owner_id_list_search(data.attackerID);
    if(searched !== null){
      data.attackerID = searched;
      let db = await read_maindata('Player_data','nameID',data.attackerID,name);
      if(db !== null){
        data.attacker = db.name;
      }
    }
    else if (name.indexOf('チェイサー') !== -1 ||name.indexOf('オプレッサー') !== -1 ||name.indexOf('分身') !== -1 ) {
      if(DEBUG_LOG){
              console.warn('Warn : ペットの情報がマージされませんでした。' + data.attacker + ':' + data.attackerID + ':' + data.action);
      }
    }
  }
  let uniqueID = data.networknumber + data.victimID;
  let additional_reason = {uniqueID:null,reason:null,position:null};
  let position_set = {
    damage:data.effectname.indexOf('normal-damage'),
    heal:data.effectname.indexOf('heal'),
    add_buff_attacker:data.effectname.indexOf('add-buff-attacker'),
    add_buff_victim:data.effectname.indexOf('add-buff-victim'),
    mp_recover:data.effectname.indexOf('mp-recover'),
    tp_recover:data.effectname.indexOf('tp-recover')
  };
  if(position_set.heal > 0){
    //ドレイン等のHP吸収攻撃*attacker側の更新もある
    additional_reason.reason = 'heal';
    additional_reason.position = position_set.heal;
    additional_reason.uniqueID = data.networknumber + data.victimID + data.attackerID;
  }
  else if (position_set.add_buff_attacker !== -1) {
    //attacker側の更新もある
    additional_reason.reason = 'other';
    additional_reason.position = position_set.add_buff_attacker;
    additional_reason.uniqueID = data.networknumber + data.victimID + data.attackerID;
  }
  else if (position_set.mp_recover !== -1) {
    additional_reason.reason = 'other';
    additional_reason.position = position_set.mp_recover;
    additional_reason.uniqueID = data.networknumber + data.victimID + data.attackerID;
  }
  else if (position_set.tp_recover !== -1) {
    additional_reason.reason = 'other';
    additional_reason.position = position_set.tp_recover;
    additional_reason.uniqueID = data.networknumber + data.victimID + data.attackerID;
  }
  //victim側の更新


  if(position_set.damage !== -1){
    if(position_set.damage !== 0 && additional_reason.uniqueID !== null){
      if(DEBUG_LOG){
        console.error('This Log is not first damage param & uniqueID include :reason->' + additional_reason.reason);
        console.error(log);
      }
    }
    await abilitydata_main(uniqueID,additional_reason.uniqueID,position_set.damage,data);
  }
  else if (position_set.heal === 0) {
    await abilitydata_main(uniqueID,additional_reason.uniqueID,0,data);
  }
  else if (position_set.add_buff_victim !== -1) {
    await abilitydata_main(uniqueID,additional_reason.uniqueID,position_set.add_buff_victim,data);
  }
  /*
  if(data.effectname.indexOf('normal-damage') === 0||data.effectname.indexOf('add-buff-victim') !== -1||data.effectname.indexOf('heal') === 0){
    await abilitydata_main(uniqueID,additional_reason.uniqueID,0,data);
  }*/
  if(additional_reason.uniqueID !== null){
    uniqueID = additional_reason.uniqueID;
    data.victimID = data.attackerID;
    data.victim = data.attacker;
    data.victimmaxHP = data.attckermaxHP;
    data.victimCurrentHP = data.attackerCurrentHP;
    await abilitydata_main(uniqueID,null,additional_reason.position,data);
  }
  await ability_include_dot_hot(data);
}
async function effectdata_force4(param){
  if(param.length === 3){
    return '0' + param;
  }
  else if (param.length === 2) {
    return '00' + param;
  }
  else if (param.length === 1){
     return '000' + param;
  }
  else {
    return null;
  }
}
async function ability_include_dot_hot(data){
  for(let i = 0 ; i < data.effectname.length ; i++){
    if(data.effectname[i] === 'add-buff-victim'){
      //Dot-Hot
      let dot_position = DoT_ID_Array.indexOf(await effectdata_force4(data.effectparam[i]));
      if(dot_position !== -1){
        await potencial_check_from_damage(DoT_ID[dot_position],dot_position,i,data);
      }
      //Barrier
      let barrier_position = Barrier_ID_Array.indexOf(await effectdata_force4(data.effectparam[i]));
      if(barrier_position !== -1){
        await potencial_check_barrier(data,barrier_position,'victim');
      }
    }
    else if (data.effectname[i] === 'add-buff-attacker') {
      //Dot-Hot
      let dot_position = DoT_ID_Array.indexOf(await effectdata_force4(data.effectparam[i]));
      if(dot_position !== -1){
        await potencial_check_from_damage(DoT_ID[dot_position],i,data);
      }
      //Barrier
      let barrier_position = Barrier_ID_Array.indexOf(await effectdata_force4(data.effectparam[i]));
      if(barrier_position !== -1){
        await potencial_check_barrier(data,barrier_position,'attacker');
      }
    }
  }
}
async function potencial_action_search_tool(target,actionID,dotid,position){
  let max = target.length;
  for(let search_position = position ; search_position < max ; search_position++){
    if(target[search_position].dotid === dotid){
      if(actionID === target[search_position].actionid){
        return target[search_position];
      }
    }else {
      if(DEBUG_LOG){
        console.warn('EFFECTID Not Matched... dotid:' + dotid  + ' actionID:' + actionID);
      }
      return target[position];
    }
  }
}
async function potencial_check_barrier(data,effectposition,target){
  let action_detail = await potencial_action_search_tool(Barrier_ID,data.actionID,Barrier_ID[effectposition].dotid,effectposition);
  let barrier = 0;
  let attackerID = data.attackerID;
  let victimID = data.victimID;
  if(target === 'attacker'){
    victimID = attackerID;
  }
  if(action_detail.damagesync === 0){
    barrier = await potencial_to_damage_calc_effect(attackerID,victimID,action_detail.potencial,'HoT');
  }else {
    let damage = action_detail.action_potencial;
    for(let i = 0 ; i < data.effectname.length ; i++){
      if(/*data.effectname[i] === 'damage' || */data.effectname[i] === 'heal'){
        damage = data.effectparam[i];
        break;
      }
    }
    barrier = damage;
  }
  //
  let uniqueID = 'B-' + Barrier_Unique_ID++;
  //console.log(data);
  insert_maindata('Barrier_data','uniqueID',uniqueID,['action',data.action,true],['actionID',data.actionID,true],['barrier',barrier,true],['networknumber',data.networknumber,true],['attacker',data.attacker,true],['attackerID',data.attackerID,true],['victim',data.victim,true],['victimID',data.victimID,true],['victimmaxHP',data.victimmaxHP,true],['victimCurrentHP',data.victimCurrentHP,true],['lastupdate',data.lastupdate,true]);
  //console.log(data);
  //console.log(attackerID + '->' + victimID + ' (' + barrier +'):' + uniqueID);
  //////////////////////////

  let add_target = await damage_add(attackerID,victimID,data.victimmaxHP,'barrier',barrier,null);
  let created_data = await add_target_data_create(add_target,barrier,0,String(uniqueID),'barrier',data.lastupdate);
  //(add_target,damage,overdamage,uniqueID,damage_type,lastupdate)
  add_target = created_data[0];
  let add_target_data = created_data[1];
  let add_target_replace = created_data[2];
  //////////////
  //console.log(add_target);
  //console.log(add_target_data);
  //console.log(add_target_replace);
  await update_maindata_change('Player_data','nameID',attackerID,add_target,add_target_data,add_target_replace);
  if(Barrier_incomeheal){//被ヒールにバリアを計算する。
    //hp 不要　(incomebarrier_main(uniqueID,nameID,attackerID,damage,add_target,lastupdate)
    await income_switch_main(uniqueID,victimID,null,attackerID,barrier,data.lastupdate,add_target,'barrier');
  }
}
async function potencial_check_from_damage(dot_detail,id_data_position,effectposition,data){

  if(dot_detail.actionid !== data.actionID){
    let dot_id_position = DoT_ID_Array.indexOf(dot_detail.dotid,id_data_position + 1);
    dot_detail = DoT_ID[dot_id_position];
    if(dot_detail.actionid !== data.actionID){
      dot_id_position = DoT_ID_Array.indexOf(dot_detail.dotid,dot_id_position + 1);
      dot_detail = DoT_ID[dot_id_position];
      if(dot_detail.actionid !== data.actionID){
        if(DEBUG_LOG){
          console.error('dot data not found');
          console.error(data);
        }
        //return test;
        return null;
      }
    }
  }
  let potencial = dot_detail.potencial;

  if(dot_detail.action_potencial > 0 ){
    if(data.effectname[0] === 'heal'||data.effectname[0] === 'normal-damage'&&POTENCIAL_DAMAGE){
      let damage = data.effectparam[0];
      potencial = Math.round(dot_detail.potencial * (damage / dot_detail.action_potencial));
    }
    else {
      potencial = await potencial_to_damage_calc_effect(data.attackerID,data.victimID,potencial,dot_detail.type);
    }
  }
  else {
    //unknown potencial
    potencial = await potencial_to_damage_calc_effect(data.attackerID,data.victimID,potencial,dot_detail.type);
  }
  //console.log(data.action +'(' + dot_detail.name + ')' +':Potencial->' + potencial);
  await update_maindata('Player_hp','nameID',data.victimID,['dot_potencial',{potencial:potencial,attackerID:data.attackerID,dotID:dot_detail.dotid,actionID:data.actionID,time_ms:data.time_ms,dot_time:dot_detail.max},false],['lastupdate',data.lastupdate,true]);
}
async function potencial_to_damage_calc_effect(attackerID,victimID,default_potencial,damage_type){
  let attacker_data = await read_maindata('Player_hp','nameID',attackerID,'effect','revise','maxhp');
  let victim_data = {};
  if(attackerID === victimID){
    victim_data = attacker_data;
  }
  else {
    victim_data = await read_maindata('Player_hp','nameID',victimID,'effect','revise','maxhp');
  }
  if(Object.keys(attacker_data).length === 0||Object.keys(victim_data).length === 0){
    if(DEBUG_LOG){
      console.warn('read_error potencial calc failed->');
    }
    return default_potencial;
  }
  /*
  <-damage->
  potencial * (buff - debuff) * revise -> (buff - debuff) * revise = damage
  */
  if(damage_type === 'DoT'){//damage
    let attacker = await potencial_to_damage_calc_id(attacker_data,attackerID,'damage',true);
    let victim = await potencial_to_damage_calc_id(victim_data,victimID,'damage',false);
    if(DoT_Simulate_Debug_massage){
      console.log(default_potencial + ' * ' + attacker + ' * ' + victim + ' = ' + default_potencial * attacker * victim);
    }
    //console.log(default_potencial +' : '+ attacker + ' : '+ victim);
    return Math.round(default_potencial * attacker * victim);
  }else {//heal
    let attacker = await potencial_to_damage_calc_id(attacker_data,attackerID,'heal',true);
    let victim = await potencial_to_damage_calc_id(victim_data,victimID,'heal',false);
    if(DoT_Simulate_Debug_massage){
      console.log(default_potencial + ' * ' + attacker + ' * ' + victim + ' = ' + default_potencial * attacker * victim);
    }
    //console.log(default_potencial +' : '+ attacker + ' : '+ victim);
    return Math.round(default_potencial * attacker * victim);
  }
}
async function abilitydata_main(uniqueID,additional_uniqueID,maintype_position,data){
  let add_target = await damage_add(data.attackerID,data.victimID,data.victimmaxHP,data.effectname[maintype_position],data.effectparam[maintype_position],null);
  let overdamage = await over_damage(data.effectname[maintype_position],data.effectparam[maintype_position],data.victimCurrentHP,data.victimmaxHP);
  //console.log(add_target);
  await networkAbility_Skilldata_insert(uniqueID,data.effectparam[maintype_position],data.effectname[maintype_position],additional_uniqueID,data.networknumber,data.attackerID,data.attckermaxHP,data.victimID,data.actionID,data.attacker,data.victim,data.action,data.lastupdate,add_target,overdamage,data.time_ms,data.victimmaxHP);
  //console.warn(data.effectname[maintype_position] + '!!!'+data.attacker + '->' + data.victim + data.effectparam[maintype_position] + '(O-' + overdamage + ')');
  let created_data = await add_target_data_create(add_target,data.effectparam[maintype_position],overdamage,uniqueID,data.effectname[maintype_position],data.lastupdate);
  add_target = created_data[0];
  let add_target_data = created_data[1];
  let add_target_replace = created_data[2];
  //////////////
  await update_maindata_change('Player_data','nameID',data.attackerID,add_target,add_target_data,add_target_replace);
}
async function potencial_to_damage_calc_id(target_data,nameID/*effect revise maxhp*/,type/*damage/heal*/,send){
  let return_data = [1,1,1];
  if(send){//与えた側
    if(target_data.effect !== undefined){
      if(DoT_Simulate_Debug_massage){
        console.log(target_data);
      }
      for(let i = 0 ; i < target_data.effect.length ; i++){
        //console.log('Send Check->' + EFFECT_ID_LIST.indexOf(target_data.effect[i].buffID) + ':->'+target_data.effect[i].buffID);
        if(EFFECT_ID_LIST.indexOf(target_data.effect[i].buffID) !== -1){
          let id_detail = EFFECT_ID[target_data.effect[i].buffID];
          //console.log(id_detail);
          if(id_detail.type[0] && type==='damage'){
            if(id_detail.type[4]){
              return_data[0] = return_data[0] * id_detail.effect;
            }
            else {
              return_data[1] = return_data[1] * id_detail.effect;
            }
          }
          if(id_detail.type[1] && type==='heal'){
            if(id_detail.type[4]){
              return_data[0] = return_data[0] * id_detail.effect;
            }
            else {
              return_data[1] = return_data[1] * id_detail.effect;
            }
          }
        }
        else {
          if(target_data.effect[i].player !=='E0000000'){
            //console.warn('未登録の"EFFECT ID"->' + target_data.effect[i].buffID);
          }
        }
      }
    }
    else {
      if(DoT_Simulate_Debug_massage){
        console.warn(target_data);
      }
    }
    if(target_data.revise !== undefined){
      return_data[2] = target_data.revise.damage;
    }
    if(DoT_Simulate_Debug_massage){
      console.log('buff->' + return_data[0] + ' debuff->'+return_data[1] + ' default_revise->' + return_data[2]);
    }
    if(nameID.substring(0,2) === '40'){
      if(type === 'heal'){
        return (return_data[0] * return_data[1] *0.5);
      }
      else {
        return (return_data[0] * return_data[1] * 1 );
      }
    }else {
      if(target_data.maxhp === Chaiser_HP||target_data.maxhp === Oppresor_HP||target_data.maxhp === Justice_HP){
        return ((return_data[1])* 1 );
      }
      else {
        return (return_data[0] * return_data[1] * return_data[2]);
      }
    }
  }
  else {//received受けた側
    if(target_data.revise !== undefined && type==='damage'){
      return_data[2] = target_data.revise.income;
    }
    if(target_data.effect !== undefined){
      if(DoT_Simulate_Debug_massage){
        console.log(target_data);
      }
      for(let i = 0 ; i < target_data.effect.length ; i++){
        //console.log('Receive Check->' + EFFECT_ID_LIST.indexOf(target_data.effect[i].buffID) + ':->'+target_data.effect[i].buffID);
        if(EFFECT_ID_LIST.indexOf(target_data.effect[i].buffID) !== -1){
          let id_detail = EFFECT_ID[target_data.effect[i].buffID];
          //console.log(id_detail);
          if(id_detail.type[2] && type==='damage'){
            if(id_detail.type[4]){
              return_data[0] = return_data[0] * id_detail.cut;
            }
            else {
              return_data[1] = return_data[1] * id_detail.cut;
            }
          }
          if(id_detail.type[3] && type==='heal'){
            if(id_detail.type[4]){
              return_data[0] = return_data[0] * id_detail.cut_heal;
            }
            else {
              return_data[1] = return_data[1] * id_detail.cut_heal;
            }
          }
        }
        else {
          if(target_data.effect[i].player !=='E0000000'){
            //console.warn('未登録の"EFFECT ID"->' + target_data.effect[i].buffID);
          }
        }
      }
    }
    else {
      if(DoT_Simulate_Debug_massage){
        console.warn(target_data);
      }
    }
    if(DoT_Simulate_Debug_massage){
      console.log('buff->' + return_data[0] + ' debuff->'+return_data[1] + ' default_revise->' + return_data[2]);
    }
    if(nameID.substring(0,2) === '40'){
      if(type === 'heal'){
        return (return_data[1] * return_data[0] *1);
      }
      else {
        return (return_data[1] * return_data[0] * 1 );
      }
    }else {
      if(target_data.maxhp === Chaiser_HP||target_data.maxhp === Oppresor_HP||target_data.maxhp === Justice_HP){
        return ((return_data[1])* 1 );
      }
      else {
        return (return_data[1] *return_data[0] * return_data[2]);
      }
    }
  }
  return null;
}
async function effectdata_exchangeInt(effectdata){
  let data_name = [];
  let data_param = [];
  for(let i = 0 ; i < effectdata.length ; i++){
    data_name.push(effectdata[i].flag);
    if(effectdata[i].flag === 'normal-damage'||effectdata[i].flag === 'heal'||effectdata[i].flag === 'mp-recover'||effectdata[i].flag === 'tp-recover'){
      data_param.push(await networkAbility_damage_calc(effectdata[i].param));
    }
    else {
      data_param.push(effectdata[i].param.substring(0, effectdata[i].param.length - 4));
    }
  }
  return [data_name,data_param];
}
async function network_action_datatype(log){
  const offset = 8;
  let return_data = [];
  for(let i = 0 ; i < 7 ; i++){
    let target = offset + (i * 2);
    if(log[target] === '0'){
      if(offset < 6 ){
        if(log[target + 2] === '0'){
          return return_data;
        }
      }else {
        return return_data;
      }
    }else {
      let effectflag = log[target];
      let effect_param = log[target + 1];
      if(effectflag.length > 1){
        effectflag  = effectflag.substring(effectflag.length-2 ,effectflag.length);
      }
      let flagdata = await effect_flag_checker(parseInt(effectflag,16));
      if(flagdata !== null){
        return_data.push({flag : flagdata,param:effect_param});
      }
    }
  }
  return return_data;
}
async function effect_flag_checker(flag) {
  switch (flag) {
    case 1:
      return 'miss-damage';

    case 2:
      return 'normal-damage';

    case 3:
      return 'normal-damage';

    case 4:
      return 'heal';

    case 5:
      return 'block-damage';

    case 6:

      return 'parri-damage';
    case 7:

      return 'invincible';
    case 10:

      return 'powerdrain';
    case 11:

      return 'mp-recover';
    case 13:

      return 'tp-recover';
    case 14:

      return 'add-buff-victim';
    case 15:

      return 'add-buff-attacker';
    case 24:

      return 'provoke';
    case 25:

      return 'provoke';
    case 32:

      return 'knockback';
    case 33:

      return 'pull';
    case 51:

      return 'instant death';
    case 55:

      return 'debuff-resisted';
    case 61:

      return 'actor-jobgage';
    default:
      return null;
  }
}
