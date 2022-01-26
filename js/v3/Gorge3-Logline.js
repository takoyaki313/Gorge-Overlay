let LOGLINE_ENCOUNTER = {};

async function logline_firststep(log){
  if(log[0] === '40'){
    await minimap_change_area_check(log);
  }
  if(AREA.Area_Type > 0){
    switch (log[0]) {
      case '01'://Area Change
        break;
      case '03':
      await addcombatant(log);
        break;
      case '04':
      if(!LOGLINE_ENCOUNTER.Result_Page){
        await removecombatant(log);
      }
        break;
      case '11':
      if(AREA.Area_Type > 0){
        log_party_push(log);
      }
        break;
      case '21':
      if(LOGLINE_ENCOUNTER.Engage){
        await networkactionsync_21_22(log);
      }
        break;
      case '22':
      if(LOGLINE_ENCOUNTER.Engage){
        await networkactionsync_21_22(log);
      }
        break;
      case '24':
      if(LOGLINE_ENCOUNTER.Engage){
        await networkDoT_24(log);
      }
        break;
      case '25':
      await kill_death_main_25(log);
          break;
      case '26':
      //await action_add_tool(log); action_tempに未登録 effectID
      await player_buff_add_26(log);
        break;
      case '30':
      await network_buff_removerd_30(log);
        break;

      case '33':
      logline_battle_start_check(log);
        break;
      case '37':
      await networkAbility_receve(log);
        break;
      case '38':
      if(LOGLINE_ENCOUNTER.Engage){
        await networkDoT_sync_38(log);
      }
        break;

      case '39':
      await networkupdatehp_39(log);
        break;
      case '00':
      //console.log(log);
      break;

      case '101':
      primary_player_changed(log);
        break;
      case '102':
      party_changed_dataupdate(log);
      //console.log(log);
        break;
      default:
        break;
      }
  }
}
//////////////////////////////////////////
/// action add tool
///////////////////////////////////////////
let action_temp = [];
async function action_add_tool(log){
  let data = Object.keys(EFFECT_ID);
  if(data.indexOf(await effectdata_force4(log[2])) !== -1){
    return null;
  }
  for(let i = 0 ; i < action_temp.length ; i++){
    if(action_temp[i].id === log[2]){
      return null;
    }
  }
  action_temp.push({id:log[2],name:log[3],time:Number(log[4])});
}
//////////////////////////////////////////
////        3
//////////////////////////////////////////
async function addcombatant(log){
  let nameID = log[2].toUpperCase();
  let name = null_check(log[3]);
  let job = jobID_to_string(log[4]);
  let server = null_check(log[8]);
  let owner_id = log[6].toUpperCase();
  let currenthp = Number(log[9]);
  let maxhp = Number(log[10]);
  let battle = true;
  let lastupdate = log[1];
  if(owner_id !== '0000'){
    await owner_id_list_add(owner_id,nameID,name);
  }
  else {
    owner_id = null;
  }
  if(nameID !== Field_ID){
    await update_maindata('Player_data','nameID',nameID,['name',name,true],['job',job,true],['server',server,true],['battle',battle,true],['ownerID',owner_id,true],['lastupdate',lastupdate,true]);
  }
  if(job !== null){
    await damage_revise(nameID,job,lastupdate);
  }
  await update_maindata('Player_hp','nameID',nameID,['attacker',[],true]);
}
async function damage_revise(nameID,job,lastupdate){
  if(AREA.Area_Type === 1 ||AREA.Area_Type === 3){//FL
    let class_A = ['pld','war','drk','gnb','mnk','sam','rpr'];
    let class_B = ['drg','nin'];
    let class_C = ['rdm'];
    if(class_A.indexOf(job) !== -1) {
      await update_maindata('Player_hp','nameID',nameID,['revise',{damage:1.1,income:0.7},true],['lastupdate',lastupdate,true]);
    }
    else if (class_B.indexOf(job) !== -1) {
      await update_maindata('Player_hp','nameID',nameID,['revise',{damage:1.1,income:0.75},true],['lastupdate',lastupdate,true]);
    }
    else if (class_C.indexOf(job) !== -1) {
      await update_maindata('Player_hp','nameID',nameID,['revise',{damage:1,income:0.8},true],['lastupdate',lastupdate,true]);
    }
    else {
      await update_maindata('Player_hp','nameID',nameID,['revise',{damage:1,income:1},true],['lastupdate',lastupdate,true]);
    }
  }
  else if (AREA.Area_Type === 2) {//Gorge
    let class_A = ['pld','war','drk','gnb','mnk','sam','rpr'];
    let class_B = ['drg','nin'];
    let class_C = ['rdm'];
    if(class_A.indexOf(job) !== -1) {
      await update_maindata('Player_hp','nameID',nameID,['revise',{damage:1,income:0.8},true],['lastupdate',lastupdate,true]);
    }
    else if (class_B.indexOf(job) !== -1) {
      await update_maindata('Player_hp','nameID',nameID,['revise',{damage:1,income:0.85},true],['lastupdate',lastupdate,true]);
    }
    else if (class_C.indexOf(job) !== -1) {
      await update_maindata('Player_hp','nameID',nameID,['revise',{damage:1,income:0.9},true],['lastupdate',lastupdate,true]);
    }
    else {
      await update_maindata('Player_hp','nameID',nameID,['revise',{damage:1,income:1},true],['lastupdate',lastupdate,true]);
    }
  }
  else {
    await update_maindata('Player_hp','nameID',nameID,['revise',{damage:1,income:1},true],['lastupdate',lastupdate,true]);
  }
}
//////////////////////////////////////////////
/////////          4
//////////////////////////////////////////////
async function removecombatant(log){
  let nameID = log[2].toUpperCase();
  let name = null_check(log[3]);
  let job = jobID_to_string(log[4]);
  let server = null_check(log[8]);
  //let owner_id = null_check(log[6].toUpperCase());
  let currenthp = Number(log[9]);
  let maxhp = Number(log[10]);
  let battle = false;
  let lastupdate = log[1];
  //if(owner_id !== '0'){
  //  owner_id_list_add(owner_id,nameID,name);
  //}
  if(nameID !== Field_ID){
    await update_maindata('Player_data','nameID',nameID,['battle',battle,true],['lastupdate',lastupdate,true]);
  }
  await update_maindata('Player_hp','nameID',nameID,['attacker',[],true]);
}
//////////////////////////////////////////////////////////////
////   11
//////////////////////////////////////////////////////////////
function log_party_push(log) {
  let party_num = Number(log[2]);
  if(log.length - 4 > 0){
    let aliance = 1;
    if(log.length === 28){//24
      LOGLINE_ENCOUNTER.Aliance_Data_24 = true;
      let party_length = 8;
      if(AREA.Area_Type === 2){//Gorge
        party_length = 4;
      }
      for(let i = 0 ; i < log.length - 4 ; i++){
        if(i > 3){
          if(i % party_length == 0){
            aliance++;
          }
        }
        update_maindata('Player_data','nameID',log[i + 3].toUpperCase(),['aliance',aliance,true]);
      }
    }
    else{
      if(LOGLINE_ENCOUNTER.Aliance_Data_24 === false){
        for(let i = 0 ; i < log.length - 4 ; i++){
          if(i > party_num ){
            aliance = 10;
          }
          update_maindata('Player_data','nameID',log[i + 3].toUpperCase(),['aliance',aliance,true]);
        }
      }
    }
  }
}
////////////////////////////////////////////////////////////////////////
////////////     25
////////////////////////////////////////////////////////////////////////
async function kill_death_main_25(log){
  let data = {
    attackerID : log[4],
    attacker : log[3],
    attcker_type : await npc_check_nameID(log[4]),
    victimID : log[2],
    victim : log[3],
    victim_type : await npc_check_nameID(log[2]),
    lastupdate : log[1]
  };
  if(data.attacker_type === 'npc'){//もしペットIDならIDと名前を本人に入れ替える。
    let searched = await owner_id_list_search(data.attackerID);
    if(searched !== null){
      data.attackerID = searched;
      data.attcker_type = await npc_check_nameID(searched);
      let db = await read_maindata('Player_data','nameID',data.attackerID,'name');
      if(db !== null){
        data.attacker = db.name;
      }
    }
    else if (data.attacker.indexOf('チェイサー') !== -1 ||data.attacker.indexOf('オプレッサー') !== -1 ||data.attacker.indexOf('分身') !== -1 ) {
      if(DEBUG_LOG){
        console.warn('Warn : ペットの情報がマージされませんでした。' + data.attacker + ':' + data.attackerID);
        console.warn(log);
      }
    }
  }
  if(data.victim_type === 'player'){
    await update_maindata('Player_data','nameID',data.attackerID,['kill',1,false],['lastupdate',data.lastupdate,true]);
    await update_maindata('Player_data','nameID',data.victimID,['death',1,false],['lastupdate',data.lastupdate,true]);
  }
}
async function npc_check_nameID(nameID){
  if(nameID.substring(0,2) === '10'){
    return 'player';
  }
  else {
    return 'npc';
  }
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////     37
//////////////////////////////////////////////////////////////////////////////////////////////////////////
async function networkAbility_receve(log){
  //logline 37
  let nameID = log[2];
  let abilityID = log[4];
  let lastupdate = log[1];
  let currenthp = Number(log[5]);
  let maxhp = Number(log[6]);
  let player_data = {
    nameID : nameID,
    currenthp : currenthp,
    maxhp : maxhp,
    x_position : log[11],
    y_position : log[12],
    z_position : log[13],
    rotate : log[14],
    lastupdate : log[1],
    time_number : await timestamp_change(lastupdate)
  };

  //await player_buff_list_update(log.slice(17,log.length -1),player_data.nameid,player_data.lastupdate);
  let name_ability_ID = abilityID + nameID;
  let db_data = await read_maindata('Skill_data','actionwithnameID',name_ability_ID,'nameID','victimID','additional_damage','damage_type','maxHP','damage','add_target');
  if(typeof db_data.nameID !== 'undefined'){
    await update_maindata('Skill_data','actionwithnameID',name_ability_ID,['time_accept',lastupdate,true]);
    if(db_data.damage_type === 'damage'||db_data.damage_type === 'normal-damage'){
      await hpdata_add(nameID,player_data,db_data.nameID);
      //incomedamage  calc space
      //await incomedamage_main(uniqueID,attackerID,attackermaxhp,victimID,victimmaxHP,victimCurrentHP,damage);
      await incomedamage_main(name_ability_ID,db_data.nameID,db_data.maxHP,nameID,db_data.damage,lastupdate);

      await update_maindata('Player_data','nameID',db_data.nameID,['total-accept-damage',db_data.damage,false],['lastupdate',lastupdate,true]);
    }
    else if (db_data.damage_type === 'heal') {
      await hpdata_add(nameID,player_data,' 37_heal');
      //function incomeheal_main(uniqueID,nameID,attackerID,attacker_aliance,damage,lastupdate)
      await incomeheal_main(name_ability_ID,nameID,db_data.nameID,db_data.damage,db_data.add_target,lastupdate);
    }
    else {//other
      await hpdata_add(nameID,player_data,db_data.nameID);
    }
    if(db_data.additional_damage !== null){
      //let actionwithnameID = abilityID + db_data.nameID + db_data.victimID;
      let actionwithnameID = db_data.additional_damage;
      let db_data_additional = await read_maindata('Skill_data','actionwithnameID',actionwithnameID,'nameID','victimID','additional_damage','add_target','damage','damage_type');
      if(db_data_additional.nameID !== 'undefined'){
        await update_maindata('Skill_data','actionwithnameID',actionwithnameID,['time_accept',lastupdate,true]);
        if(db_data_additional.damage_type === 'heal'){
          await incomeheal_main(actionwithnameID,db_data_additional.victimID,db_data_additional.nameID,db_data_additional.damage,db_data_additional.add_target,lastupdate);
        }
      }
      else {
        if(DEBUG_LOG){
          console.warn('WARN : Not Additional Data Sync Read failed...' + actionwithnameID);
          console.warn(log);
        }
      }
    }
  }
  else {
    await hpdata_add(nameID,player_data,'unknown ');
    //console.debug(log);
    //スキルデータが存在しない
  }
}
async function income_switch_main(uniqueID,attackerID,attackermaxhp,victimID,damage,lastupdate,add_target,type){
  if(type === 'normal-damage'){
    await incomedamage_main(uniqueID,attackerID,attackermaxhp,victimID,damage,lastupdate);
  }
  else if (type === 'heal') {
    await incomeheal_main(uniqueID,victimID,attackerID,damage,add_target,lastupdate);
  }
  else {
    if(DEBUG_LOG){
      console.error('Income calc error ->' + type);
    }
  }
}
async function incomeheal_main(uniqueID,nameID,attackerID,damage,add_target,lastupdate){
  if(nameID === attackerID){//selfheal
    await update_maindata('Player_data','nameID',nameID,['totalincomeheal',damage,false],['incomeselfheal',damage,false],['incomeheal',uniqueID,false],['lastupdate',lastupdate,true]);
  }
  else if (nameID.substring(0,2) === '40'){//From Object (NPC)
    await update_maindata('Player_data','nameID',nameID,['totalincomeheal',damage,false],['incomeotherheal',damage,false],['incomeheal',uniqueID,false],['lastupdate',lastupdate,true]);
  }
  else {//From Player
    if(add_target.indexOf('partyheal') !== -1){
      await update_maindata('Player_data','nameID',nameID,['totalincomeheal',damage,false],['incomepartyheal',damage,false],['incomeheal',uniqueID,false],['lastupdate',lastupdate,true]);
    }
    else{
      await update_maindata('Player_data','nameID',nameID,['totalincomeheal',damage,false],['incomeallyheal',damage,false],['incomeheal',uniqueID,false],['lastupdate',lastupdate,true]);
    }
  }
}
async function incomedamage_main(uniqueID,attackerID,attackermaxhp,victimID,damage,lastupdate){
  //let incomedamage = await incomedamage_calc(victimmaxHP,victimCurrentHP,damage);
  let incomedamage = damage;
  let incomedamage_damage_type = await incomedamage_add_target(attackerID,attackermaxhp);
  let incomedamage_data = await incomedamage_data_create(incomedamage_damage_type,uniqueID,incomedamage,lastupdate);
  await update_maindata_change('Player_data','nameID',victimID,incomedamage_data[0],incomedamage_data[1],incomedamage_data[2]);
}
async function incomedamage_data_create(incomedamage_damage_type,uniqueID,incomedamage,lastupdate){
  let data_main = [];
  let data_replace = [];
  for(let i = 0 ; i < incomedamage_damage_type.length ; i++){
    data_main.push(incomedamage);
    data_replace.push(false);
  }
  incomedamage_damage_type.push('incomeskill');
  data_main.push(uniqueID);
  data_replace.push(false);

  incomedamage_damage_type.push('lastupdate');
  data_main.push(lastupdate);
  data_replace.push(true);
  return [incomedamage_damage_type,data_main,data_replace];
}
async function incomedamage_add_target(attackerID,attackermaxhp){
  if(attackerID.substring(0,2) === '40'){
    return ['totalincomedamage','objectincomedamage'];
  }
  else if (attackerID.substring(0,2) === '10') {
    if(attackermaxhp === Chaiser_HP || attackermaxhp === Oppresor_HP || attackermaxhp === Justice_HP){
      return ['totalincomedamage','robincomedamage'];
    }
    else if (Number(attackermaxhp) === 0) {
      return ['totalincomedamage','otherpersonincomedamage'];
    }
    else {
      return ['totalincomedamage','personalincomedamage'];
    }
  }
  else{
    if(DEBUG_LOG){
      console.error('Error : incomedamage_add_target is unknown...=>' + attackerID);
    }
    return ['totalincomedamage'];
  }
}
///////////////////////////////////////////////////////////////
//////    38
///////////////////////////////////////////////////////////////
async function networkDoT_sync_38(log){
  //await dot_calc_main(log);
  if(log[6] === ''){
    player_data = {
      nameID :log[2],
      maxhp : Number(log[6]),
      currenthp : Number(log[5]),
      lastupdate : log[1],
      time_number : await timestamp_change(log[1])
    };
  }
  else {
    player_data = {
      nameID : log[2],
      currenthp : Number(log[5]),
      maxhp : Number(log[6]),
      x_position : log[11],
      y_position : log[12],
      z_position : log[13],
      rotate : log[14],
      lastupdate : log[1],
      time_number : await timestamp_change(log[1])
    };
  }
  await player_buff_list_update(log.slice(15,log.length -1),player_data.nameID,player_data.lastupdate);
  await hpdata_add(log[2],player_data,' log_38 ');
  //await dot_calculation(log);
}
///////////////////////////////////////////////////////////////
//////    39
///////////////////////////////////////////////////////////////
async function networkupdatehp_39(log){
  let player_data = {};
  if(log[5] === ''){
    player_data = {
      nameID :log[2],
      maxhp : Number(log[5]),
      currenthp : Number(log[4]),
      lastupdate : log[1],
      time_number : await timestamp_change(log[1])
    };
  }
  else {
    player_data = {
      nameID : log[2],
      currenthp : Number(log[4]),
      maxhp : Number(log[5]),
      x_position : log[10],
      y_position : log[11],
      z_position : log[12],
      rotate : log[13],
      lastupdate : log[1],
      time_number : await timestamp_change(log[1])
    };
  }
  await hpdata_add(log[2],player_data,null);

}
//////////////////////////////////////////////////////////////////
////////////////       HP
//////////////////////////////////////////////////////////////////
async function hpdata_add(nameID,player_data,attackerID){
  let dataname = [];
  let datavalue = [];
  let datareplace = [];
  if(player_data.currenthp === undefined){
    if(DEBUG_LOG){
      console.error('Hp Data is undefined');
      console.error(player_data);
    }
    return null;
  }
  if(player_data.maxhp === 0){
    dataname = ['currenthp','lastupdate','time_number'];
    datavalue = [player_data.currenthp,player_data.lastupdate,player_data.time_number];
    datareplace = [true,true,true];
  }
  else {
    dataname = ['currenthp','maxhp','lastupdate','time_number'];
    datavalue = [player_data.currenthp,player_data.maxhp,player_data.lastupdate,player_data.time_number];
    datareplace = [true,true,true,true];
  }
  let include_attcker = false;
  if(attackerID === undefined || attackerID === ' log_38 ' || attackerID === 'unknown '|| attackerID === null|| attackerID === ' 37_heal'|| attackerID === nameID){
  }
  else {
    include_attcker = true;
    dataname.push('attacker');
    datavalue.push({attacker:attackerID,type:'action'});
    datareplace.push(false);
  }
  //let position = await hp_data_db_add(player_data);
  //await update_maindata('Player_data','nameID',nameID,['hphistory',position.toString(),false],['lastupdate',player_data.lastupdate,true]);
  let readed_data = await read_maindata('Player_hp','nameID',nameID,'nameID','currenthp','maxhp','time_number','effect','attacker');
  if(Object.keys(readed_data).length === 0){
    //new create
    await update_maindata_change('Player_hp','nameID',nameID,dataname,datavalue,datareplace);
  }else {
    if(player_data.currenthp === player_data.maxhp){
      //デバフがかかった人はアシストのリストをリセットしない
      //let debuff_list = await what_include_buff(readed_data.effect,'debuff');
      if(/*debuff_list.length === 0 &&*/ true){
        dataname.push('attacker');
        datavalue.push([]);
        datareplace.push(true);
      }
    }
    if(readed_data.time_number < player_data.time_number){
      await update_maindata_change('Player_hp','nameID',nameID,dataname,datavalue,datareplace);
      //////////////////////////////////
      ////
      ////////////////
      if(player_data.currenthp === 0 ){
        if(readed_data.currenthp === 0){
          if(DEBUG_LOG){
            console.debug('Enemy->' + attackerID + ' -> '+ player_data.nameID + ': '+ readed_data.currenthp+ ' / '+  readed_data.maxhp + ' -> '+player_data.currenthp + ' / ' + player_data.maxhp);
          }
        }
        else {
          await update_maindata('Player_data','nameID',player_data.nameID,['s_death',1,false],['lastupdate',player_data.lastupdate,true]);
          if(player_data.nameID.substring(0,2) === '10'){//死んだ人がプレイヤー
            if(attackerID.substring(0,2) === '10'){
              await assist_main(attackerID,player_data.nameID,readed_data.attacker,player_data.lastupdate);
            }
            else if (attackerID === ' log_38 ') {
              if(readed_data.attacker.length > 0){
                attackerID = readed_data.attacker.slice(-1)[0].attacker;/*
                if(readed_data.attacker.slice(-1)[0].type === 'DoT-damage'){
                  if(readed_data.attacker.slice(-2)[0].type === 'DoT-damage'){
                    console.error(readed_data.attacker);
                  }
                }*/
                await assist_main(attackerID,player_data.nameID,readed_data.attacker,player_data.lastupdate);
              }else {
                if(DEBUG_LOG){
                  console.warn('Warn : Kill Player Unknown->' + attackerID +'->' + player_data.nameID);
                }
              }
            }
            else {
              if(DEBUG_LOG){
                console.warn('Warn : Kill Player Unknown->' + attackerID +'->' + player_data.nameID);
              }
            }
          }
        }
      }

      /////
      /////
      /////   Rob ride process
      /////
      /////
    }
    else if (readed_data.time_number === player_data.time_number) {
      //同一データ
      //console.warn('This Data is duplite...?');
      //console.warn(readed_data);
      //console.warn(player_data);
    }
    else if (readed_data.currenthp === undefined) {
      //new create
      await update_maindata_change('Player_hp','nameID',nameID,dataname,datavalue,datareplace);
    }
    else {
      if(DEBUG_LOG){
        console.error('This data is probably old->' + nameID);
        console.log(readed_data);
        console.log(player_data);
      }
    }
  }
}
async function assist_main(kill_player,death_player,death_attcker,lastupdate){
  let attacker_aliance = await read_maindata('Player_data','nameID',kill_player,'aliance');
  let ally_kill = false;
  if(Object.keys(attacker_aliance).length === 1){
    if(attacker_aliance.aliance > 0){
      ally_kill = true;
    }
  }
  //console.log('aliance->' + attacker_aliance.aliance + ' :result->' + ally_kill);
  if(ally_kill){
    let damage_attcker = [];
    for(let i = 0 ; i < death_attcker.length ; i++){
      damage_attcker.push(death_attcker[i].attacker);
    }
    let assist_player = [];
    let attcker_effect = await read_maindata('Player_hp','nameID',kill_player,'effect');
    let kill_buff_list = await what_include_buff(attcker_effect.effect,'buff');
    let assist_dupe = kill_buff_list.concat(damage_attcker);
    let A_test = false;
    for(let i = 0 ; i < assist_dupe.length ; i++){//
      if(assist_player.indexOf(assist_dupe[i]) === -1 && assist_dupe[i] !== kill_player){
        assist_player.push(assist_dupe[i]);
      }
    }
    await assist_players_write(assist_player,'assist',lastupdate);
    //console.log('Ally ->'+kill_player + ' -> '+ death_player + '  :' + lastupdate);
    //console.log(assist_player);
  }
  await update_maindata('Player_data','nameID',kill_player,['s_kill',1,false],['lastupdate',lastupdate,true]);
}
async function assist_players_write(nameID_array,type,lastupdate){
  for(let i = 0 ; i < nameID_array.length ; i++){
    update_maindata('Player_data','nameID',nameID_array[i],[type,1,false],['lastupdate',lastupdate,true]);
  }
}
async function what_include_buff(effect,buff_type){
  let search_type = true;
  if(effect === undefined){
    return [];
  }
  if(buff_type === 'buff'){

  }else if (buff_type === 'debuff') {
    search_type =false;
  }else {
    if(DEBUG_LOG){
      console.error('Buff_type unknown ->' + buff_type);
    }
    return [];
  }
  if(Object.keys(effect).length > 0){
    let return_data = [];
    for(let i = 0 ; i < effect.length ; i ++){
      if(effect[i].attacker === '0'||effect[i].attacker === 'E0000000' ||EXCLUDE_BUFF.indexOf(effect[i].buffID) !== -1){

      }else {
        let position = EFFECT_ID_LIST.indexOf(effect[i].buffID);
        if(position !== -1){
          if(EFFECT_ID[effect[i].buffID].type[4] === search_type){
            return_data.push(effect[i].attacker);
          }
        }
      }
    }
    return return_data;
  }else {
    return [];
  }
}
///////////////////////////////////////////////////////////////
///////       40
///////////////////////////////////////////////////////////////
async function minimap_change_area_check(log){
  //488 is Hidden Gorge
  //341 is The Goblet (my home)
  //242 is Seal Rock
  //296 is Field of Groly
  //568 is Onsal Hakair
  //167 is The Borderland Luins
  //15 is Middle La Noscea
  //51 is Wolves' Den Pier
  if (log[2] === '488'||log[2] === '242'||log[2] === '296'||log[2] ==='568'||log[2] === '167'||log[2] === '341'){
    if(AREA.Area_Type <= 0){
      if(DEBUG_LOG){
        console.error('Area Changed Event later logline event than');
      }
    }
  }
}
//////////////////////////////////////////
//// extra logline
//////////////////////////////////////////
// 101
//////////////////
function primary_player_changed(log){
  //data format
  // 101|null|nameID|name
  update_maindata('Player_data','nameID',log[2],['name',log[3],true],['aliance',1,true],['battle',true,true]);
}
// 102
/////////////
function party_changed_dataupdate(log){
  //data format
  //102|null|nameID|name|aliance|job
  update_maindata('Player_data','nameID',log[2],['name',log[3],true],['job',log[5],true],['aliance',log[4],true]);
}
function null_check(data){
  if(data === '' || typeof data === 'undefined'){
    data = null;
  }
  return data;
}
async function owner_id_list_add(ownerID,petID,ownername){
  OWNER_LIST.push([petID,ownerID,ownername]);
}
async function owner_id_list_search(petID){
  let ownerID = null;
  for(let i = 0 ; i < OWNER_LIST.length ; i++){
    if(OWNER_LIST[i][0] === petID){
      ownerID = OWNER_LIST[i][1];
      return ownerID;
    }
  }
  return ownerID;
}
function owner_id_list_reset(){
  OWNER_LIST = [];
}
async function logline_battle_start_check(log){
  if(log[3] === Battle_Start_Envioroment_ID){
    let time = parseInt(log[4],16);
    LOGLINE_ENCOUNTER.Battle_Max_Time = time;
    await battle_counter(time);
    LOGLINE_ENCOUNTER.Engage = true;
  }
  else if (log[3] === Battle_End_Envioroment_ID) {
    LOGLINE_ENCOUNTER.Engage = false;
    LOGLINE_ENCOUNTER.Result_Page = true;
    stop_timer();
    //main_db_save();
    //console.log('Data_saved');
  }
}
function battle_data_reset(){
  //PvPエリア入室時に実行
  logline_battle_flag_reset();
  TBD = {Player_data:[],Skill_data:[],DoT_data:[],Player_hp:[],Hp_data:[]};
  owner_id_list_reset();
}
function Overlay_Select_Reset(){
  Overlay_Select = {};
}
function logline_battle_flag_reset(){
  LOGLINE_ENCOUNTER = {
    Engage : false,
    Result_Page : false,
    Timer_Start : false,
    Battle_Start_Time : 0,
    Battle_Max_Time : 0,
    Aliance_Data_24 : false,
  };
}
async function timestamp_change(time){
  return Date.parse(time);
}
