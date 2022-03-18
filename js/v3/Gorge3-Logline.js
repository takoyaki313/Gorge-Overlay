let LOGLINE_ENCOUNTER = {};
var Assist_Debuff_Reset = false;
var HP_Update_duplite_data = true;
var HP_Update_duplite_robride_process = false;
var KILLSOUND = true;
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
  let time_ms = await timestamp_change(lastupdate);
  if(owner_id !== '0000'){
    await owner_id_list_add(owner_id,nameID,name);
  }
  else {
    owner_id = null;
  }
  if(nameID !== Field_ID){
    if(LOGLINE_ENCOUNTER.Engage){
      let readed_data = await read_maindata('Player_data','nameID',nameID,'job');
      if(typeof readed_data.job === 'string'){
        if(job !== readed_data.job){//違うので保存する
          await update_maindata('Player_data','nameID',nameID,['name',name,true],['job',job,true],['jobhistory',{job:readed_data.job,to:job,time:Math.round((time_ms - LOGLINE_ENCOUNTER.Battle_Start_Time)/1000),lasttime:time_ms,stamp:lastupdate},false],['server',server,true],['battle',battle,true],['add_combatant_time',{battle:true,time:time_ms,stamp:lastupdate},false],['ownerID',owner_id,true],['lastupdate',lastupdate,true]);
        }
        else {
          await update_maindata('Player_data','nameID',nameID,['name',name,true],['job',job,true],['server',server,true],['battle',battle,true],['add_combatant_time',{battle:true,time:time_ms,stamp:lastupdate},false],['ownerID',owner_id,true],['lastupdate',lastupdate,true]);
        }
      }else {//
        await update_maindata('Player_data','nameID',nameID,['name',name,true],['job',job,true],['server',server,true],['battle',battle,true],['add_combatant_time',{battle:true,time:time_ms,stamp:lastupdate},false],['ownerID',owner_id,true],['lastupdate',lastupdate,true]);
      }
    }else {
      await update_maindata('Player_data','nameID',nameID,['name',name,true],['job',job,true],['server',server,true],['battle',battle,true],['add_combatant_time',{battle:true,time:time_ms,stamp:lastupdate},false],['ownerID',owner_id,true],['lastupdate',lastupdate,true]);
    }

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
  let time_ms = await timestamp_change(lastupdate);
  //if(owner_id !== '0'){
  //  owner_id_list_add(owner_id,nameID,name);
  //}
  if(nameID !== Field_ID){
    await update_maindata('Player_data','nameID',nameID,['battle',battle,true],['add_combatant_time',{battle:false,time:time_ms,stamp:lastupdate},false],['lastupdate',lastupdate,true]);
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
    attacker : log[5],
    attacker_type : await npc_check_nameID(log[4]),
    victimID : log[2],
    victim : log[3],
    victim_type : await npc_check_nameID(log[2]),
    lastupdate : log[1]
  };
  if(data.attacker_type === 'npc'){//もしペットIDならIDと名前を本人に入れ替える。
    let searched = await owner_id_list_search(data.attackerID);
    if(searched !== null){
      data.attackerID = searched;
      data.attacker_type = await npc_check_nameID(searched);
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
    let time_number = await timestamp_change(data.lastupdate);
    let time = Math.round((time_number - LOGLINE_ENCOUNTER.Battle_Start_Time) / 1000);
    await update_maindata('Player_data','nameID',data.attackerID,['kill',1,false],['kill_name',{toID:data.victimID,name:data.victim,lastupdate:data.lastupdate,time_number : time_number,time:time},false],['lastupdate',data.lastupdate,true]);
    await update_maindata('Player_data','nameID',data.victimID,['death',1,false],['death_name',{fromID:data.attackerID,name:data.attacker,lastupdate:data.lastupdate,time_number : time_number,time:time},false],['lastupdate',data.lastupdate,true]);
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
  else if (attackerID.substring(0,2) === '40'||attackerID.substring(0,2) === 'E0'){//From Object (NPC)
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
  if(attackerID.substring(0,2) === '40'||attackerID.substring(0,2) === 'E0'){
    return ['totalincomedamage','objectincomedamage'];
  }
  else if (attackerID.substring(0,2) === '10') {
    if(attackermaxhp == Chaiser_HP || attackermaxhp == Oppresor_HP || attackermaxhp == Justice_HP || attackermaxhp == Robot_Bunsin){
      return ['totalincomedamage','robincomedamage'];
    }/*
    else if (Number(attackermaxhp) === 0) {
      return ['totalincomedamage','otherpersonincomedamage'];
    }*/
    else {
      return ['totalincomedamage','personincomedamage'];
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
  let include_attacker = false;
  if(attackerID === undefined || attackerID === ' log_38 ' || attackerID === 'unknown '|| attackerID === null|| attackerID === ' 37_heal'|| attackerID === nameID){
  }
  else {
    include_attacker = true;
    dataname.push('attacker');
    datavalue.push({attacker:attackerID,type:'action'});
    datareplace.push(false);
  }
  //let position = await hp_data_db_add(player_data);
  //await update_maindata('Player_data','nameID',nameID,['hphistory',position.toString(),false],['lastupdate',player_data.lastupdate,true]);
  let readed_data = await read_maindata('Player_hp','nameID',nameID,'nameID','currenthp','maxhp','time_number','effect','attacker');
  if(Object.keys(readed_data).length === 0){
    //new create :data not found
    await update_maindata_change('Player_hp','nameID',nameID,dataname,datavalue,datareplace);
  }else {
    let apply_hpupdate = false;
    let temp_time = player_data.time_number - readed_data.time_number;
    if(temp_time > 0){//timestamp OK
      apply_hpupdate = true;
    }else if (temp_time === 0) {//timestamp duplite
      if(HP_Update_duplite_data){
        apply_hpupdate = true;
      }
    }
    else {//old data
      //no action
    }
    ////

    if(apply_hpupdate){
      if(player_data.currenthp === player_data.maxhp){//HPMax時のアシスト リセット
        //デバフがかかった人はアシストのリストをリセットしない
        let debuff_list = await what_include_buff(readed_data.effect,'debuff');

        if(debuff_list.length === 0){
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

      await update_maindata_change('Player_hp','nameID',nameID,dataname,datavalue,datareplace);
      //////////////////////////////////
      ////
      ////////////////
      if(player_data.currenthp === 0 ){
        if(readed_data.currenthp === 0){
          //既にHPが0になっている
        }
        else {
          let victim_name = await read_maindata('Player_data','nameID',player_data.nameID,'aliance','name','job','robot','robot_data');
          let victim_job = await robot_replace_job(victim_name);
          let attacker_job = '';
          let attacker_name = {};
          if(player_data.nameID.substring(0,2) === '10'){//死んだ人がプレイヤー
            if(attackerID.substring(0,2) === '10'){//キルした人がプレイヤー
              attacker_name = await read_maindata('Player_data','nameID',attackerID,'aliance','name','job','robot','robot_data');
              attacker_job = await robot_replace_job(attacker_name);
              await assist_main(attackerID,player_data.nameID,readed_data.attacker,player_data.lastupdate,player_data.time_number,victim_name.name,attacker_name.aliance,victim_job,attacker_job,attacker_name.name);
            }
            else if (attackerID.substring(0,2) === '40') {//キルした人がNPC
              if(readed_data.attacker.length > 0){
                for(let i = 1 ; i < readed_data.attacker.length + 1; i++){
                  if(readed_data.attacker.slice(i * -1)[0].attacker.substring(0,2) === '10'){
                    attackerID = readed_data.attacker.slice(i * -1)[0].attacker;
                    break;
                  }
                  else {
                    if(readed_data.attacker.length === i){
                      if(DEBUG_LOG){
                        console.log('attacker is NPC? ->' + attackerID);
                      }
                    }
                  }
                }
              }
              attacker_name = await read_maindata('Player_data','nameID',attackerID,'aliance','name','job','robot','robot_data');
              attacker_job = await robot_replace_job(attacker_name);
              await assist_main(attackerID,player_data.nameID,readed_data.attacker,player_data.lastupdate,player_data.time_number,victim_name.name,attacker_name.aliance,victim_job,attacker_job,attacker_name.name);
            }
            else if (attackerID === ' log_38 ') {
              if(readed_data.attacker.length > 0){
                for(let i = 1 ; i < readed_data.attacker.length + 1; i++){
                  if(readed_data.attacker.slice(i * -1)[0].attacker.substring(0,2) === '10'){
                    attackerID = readed_data.attacker.slice(i * -1)[0].attacker;
                    break;
                  }
                  else {
                    if(readed_data.attacker.length === i){
                      if(DEBUG_LOG){
                        console.log('attacker is NPC? ->' + attackerID);
                      }
                    }
                  }
                }
                attacker_name = await read_maindata('Player_data','nameID',attackerID,'aliance','name','job','robot','robot_data');
                attacker_job = await robot_replace_job(attacker_name);
                await assist_main(attackerID,player_data.nameID,readed_data.attacker,player_data.lastupdate,player_data.time_number,victim_name.name,attacker_name.aliance,victim_job,attacker_job,attacker_name.name);
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
          await update_maindata('Player_data','nameID',player_data.nameID,['s_death',1,false],['s-death-name',{attackerID:attackerID,name:attacker_name.name,job:attacker_job,lastupdate:player_data.lastupdate,time_ms:player_data.time_number,time:Math.round((player_data.time_number - LOGLINE_ENCOUNTER.Battle_Start_Time) / 1000)},false],['lastupdate',player_data.lastupdate,true]);
        }
      }
      if(AREA.Area_Type === 2){//Hidden Gorge
        if(temp_time > 0 ||HP_Update_duplite_robride_process){//duplite Hpdata exclude
          if(LOGLINE_ENCOUNTER.Engage){
            await rob_ride_check(nameID,readed_data,player_data);
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
      if(readed_data.currenthp !== player_data.currenthp||readed_data.maxhp !== player_data.maxhp){
        if(DEBUG_LOG){
          console.warn('This Data is duplite...?,Not Applied'+attackerID);
          console.warn(readed_data);
          console.warn(player_data);
        }
      }
    }
    else if (readed_data.currenthp === undefined) {
      //new create HP Data 未登録
      if(player_data.currenthp === player_data.maxhp){//HPMax時のアシスト リセット
        //デバフがかかった人はアシストのリストをリセットしない
        let debuff_list = await what_include_buff(readed_data.effect,'debuff');

        if(debuff_list.length === 0){
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
async function robot_replace_job(data){
  if(typeof data.robot !== 'boolean'){
    return data.job;
  }else {
    if(data.robot_data.slice(-1)[0].ride_type === 'person'){
      return data.job;
    }
    else {
      return data.robot_data.slice(-1)[0].ride_type;
    }
  }
}
async function rob_ride_check(nameID,old,now){
  if(now.maxhp === 0||nameID.substring(0,2) === '40'){
    return null;
  }
  let now_joutai = await rob_checker(now.maxhp);
  if(old.maxhp !== now.maxhp){//undefined wo hukumu
    if(now_joutai !== 'person'){//新規搭乗（最大HPの変更）
      //console.log('Ride Robot->' + now_joutai + ':' + nameID);
      await rob_ride_time_calc(nameID,now,now_joutai,true);
    }
    else {
      let old_joutai = await rob_checker(old.maxhp);
      if(old_joutai !== 'person'){//降りる　
        //console.log('Get off the Robot->' + old_joutai + ':' + nameID);
        await rob_ride_time_calc(nameID,now,now_joutai,true);
      }
    }
  }
  else if (now_joutai !== 'person') {//HP Regen received. probably changed robot
    if(old.currenthp - now.currenthp < 0){
      //console.log('HP_Regen->' + now_joutai + ':' + nameID + '  ' + old.currenthp + '->' + now.currenthp);
      await rob_ride_time_calc(nameID,now,now_joutai,true);
    }
  }
}
async function rob_ride_time_calc(nameID,now,now_joutai,ride){
  let searched = await read_maindata('Player_data','nameID',nameID,'robot_data');
  if(typeof searched.robot_data !== 'undefined'){
    let edit = searched.robot_data.length - 1;
    searched.robot_data[edit].getoff = now.time_number;
    searched.robot_data[edit].time = now.time_number - searched.robot_data[edit].ridetime;
    searched.robot_data[edit + 1] = {ridetime:now.time_number,ride_type:now_joutai,getoff:0,time:0,data:{}};
    await update_maindata('Player_data','nameID',nameID,['robot',ride,true],['robot_data',searched.robot_data,true],['lastupdate',now.lastupdate,true]);
  }
  else {
    await update_maindata('Player_data','nameID',nameID,['robot',ride,true],['robot_data',{ridetime:now.time_number,ride_type:now_joutai,getoff:0,time:0,data:{}},false],['lastupdate',now.lastupdate,true]);
  }
}
async function rob_checker(maxhp){
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
async function assist_main(kill_player,death_player,death_attacker,lastupdate,time_number,death_player_name,attacker_aliance,death_job,attacker_job,attacker_name){
  let ally_kill = false;
  if(typeof attacker_aliance !== 'undefined'){
    if(attacker_aliance > 0){
      ally_kill = true;
    }
  }
  //console.log('aliance->' + attacker_aliance.aliance + ' :result->' + ally_kill);
  if(ally_kill){
    let damage_attacker = [];
    for(let i = 0 ; i < death_attacker.length ; i++){
      damage_attacker.push(death_attacker[i].attacker);
    }
    let assist_player = [];
    let attacker_effect = await read_maindata('Player_hp','nameID',kill_player,'effect');
    let kill_buff_list = await what_include_buff(attacker_effect.effect,'buff');
    let assist_dupe = kill_buff_list.concat(damage_attacker);
    let A_test = false;
    for(let i = 0 ; i < assist_dupe.length ; i++){//
      if(assist_player.indexOf(assist_dupe[i]) === -1 && assist_dupe[i] !== kill_player){
        assist_player.push(assist_dupe[i]);
      }
    }
    await assist_players_write(assist_player,'assist',lastupdate,death_player,death_player_name,death_job,attacker_name,attacker_job,time_number,attacker_aliance);
    //console.log('Ally ->'+kill_player + ' -> '+ death_player + '  :' + lastupdate);
    //console.log(assist_player);
  }
  //kill list {}
  if(attacker_aliance === 1 && TenSyonMax_Me && KILLSOUND){
    killsound_play();
  }
  await update_maindata('Player_data','nameID',kill_player,['s_kill',1,false],['s-kill-name',{victimID:death_player,name:death_player_name,job:death_job,lastupdate:lastupdate,time_ms:time_number,time:Math.round((time_number - LOGLINE_ENCOUNTER.Battle_Start_Time) / 1000)},false],['lastupdate',lastupdate,true]);
}
async function assist_players_write(nameID_array,type,lastupdate,deathID,death_player_name,death_job,kill_name,attacker_job,time_number,attacker_aliance){
  for(let i = 0 ; i < nameID_array.length ; i++){
    update_maindata('Player_data','nameID',nameID_array[i],[type,1,false],['s-'+type,{assist:deathID,name:death_player_name,job:death_job,killer:kill_name,killerjob:attacker_job,killer_alliance:attacker_aliance,lastupdate:lastupdate,time_number:time_number,time:Math.round((time_number - LOGLINE_ENCOUNTER.Battle_Start_Time) / 1000)},false],['lastupdate',lastupdate,true]);
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
  if (log[2] === '488'||log[2] === '242'||log[2] === '296'||log[2] ==='568'||log[2] === '167'){
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
    LOGLINE_ENCOUNTER.Battle_Start_Time = await timestamp_change(log[1]);
    await battle_counter(time);
    LOGLINE_ENCOUNTER.Engage = true;
  }
  else if (log[3] === Battle_End_Envioroment_ID) {
    LOGLINE_ENCOUNTER.Engage = false;
    LOGLINE_ENCOUNTER.Result_Page = true;
    LOGLINE_ENCOUNTER.Result_in_time = await timestamp_change(log[1]);
    stop_timer();
    //main_db_save();
    //console.log('Data_saved');
  }
}
function battle_data_reset(){
  //PvPエリア入室時に実行
  $(document).find('.ui-helper-hidden-accessible').html('');
  logline_battle_flag_reset();
  TBD = {Player_data:[],Skill_data:[],DoT_data:[],Player_hp:[],Hp_data:[],Aliance:[{dunamis:0,history:[]},{dunamis:0,history:[]},{dunamis:0,history:[]},{dunamis:0,history:[]},{dunamis:0,history:[]},{dunamis:0,history:[]},{dunamis:0,history:[]}]};
  TenSyonMax_Me = false;
  owner_id_list_reset();
}
function Overlay_Select_Reset(){
  Overlay_Select = {};
}
function logline_battle_flag_reset(){
  LOGLINE_ENCOUNTER = {
    Engage : false,
    Result_Page : false,
    Result_in_time : 0,
    Timer_Start : false,
    Battle_Start_Time : 0,
    Timer_Start_Time : 0,
    Battle_Max_Time : 0,
    Aliance_Data_24 : false,
  };
}
async function timestamp_change(time){
  return Date.parse(time);
}
