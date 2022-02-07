let TBD = {Player_data:[],Skill_data:[],DoT_data:[],Player_hp:[],Hp_data:[]};
/*async function database_version_store(){
  // バージョン1
  await DB.version(1).stores({
    Player_data: "&nameID, name, job, aliance, server, &hphistory, robhistory, kills, deaths, assist, water, totaldamage, playerdamage, persondamage, torobotdamage, objectdamage, matondamage, towerdamage, overdamage, totalheal, myheal ,partyheal ,allyheal, otherheal, overheal, totalincomeheal, incomeselfheal, incomeotherheal, incomepartyheal, incomeallyheal, totalincomedamage, personalincomedamage, robincomedamage, otherpersonincomedamage, objectincomedamage, mpheal",
    Skill_data: "&actionwithnameID, networkskill_id, name, victimname, skillname ,damage_type, add_target, skillID, nameID, victimID, time_send, time_accept, [networkskill_id+victimID]",
    DoT_data: "&ID, victimID, lastupdate, effectID",
    Player_hp: "&nameID, currenthp, maxhp, lastupdate",
    Hp_data: "++ , nameID , time_number, lastupdate"
  });

  // バージョン2 usersストアを追加

  await DB.version(2).stores({
    Player_data: "&nameID, name, job, aliance, server, &hphistory, robhistory, kills, deaths, assist, water, totaldamage, playerdamage, persondamage, torobotdamage, objectdamage, matondamage, towerdamage, overdamage, totalheal, myheal ,partyheal ,allyheal, otherheal, overheal, totalincomeheal, incomeselfheal, incomeotherheal, incomepartyheal, incomeallyheal, totalincomedamage, personalincomedamage, robincomedamage, otherpersonincomedamage, objectincomedamage, mpheal",
    Skill_data: "&actionwithnameID, networkskill_id, name, victimname, skillname ,damage_type, add_target, skillID, nameID, victimID, time_send, time_accept, [networkskill_id+victimID], damage",
    DoT_data: "&ID, victimID, lastupdate, effectID",
    Player_hp: "&nameID, currenthp, maxhp, lastupdate",
    Hp_data: "++ , nameID , time_number, lastupdate"
  });
  /*
  // バージョン3 notesストアにgoodを追加
  // 更新時にtagsにgoodがあったら、新しく追加したキー「good」にtrueを入れるようにします。
  db.version(3).stores({
    notes: "++id, title, body, *tags, good, updated_at",
    users: "++id, name"
  }).upgrade(function() {
    return db.notes.modify(function(note) {
      if (note.tags.indexOf('good')) {
        note.good = true;
      }
    });
  });
  await DB_WORKSPACE.version(1).stores({
    Player_data: "&nameID, name, job, aliance, server, *rob, robhistory, kills, deaths, assist, water, totaldamage, playerdamage, persondamage, torobotdamage, objectdamage, matondamage, towerdamage, overdamage, totalheal, myheal ,partyheal ,allyheal, otherheal, overheal, totalincomeheal, incomeselfheal, incomeotherheal, incomepartyheal, incomeallyheal, totalincomedamage, personalincomedamage, robincomedamage, otherpersonincomedamage, objectincomedamage, mpheal",
    Skill_data: "&actionwithnameID, networkskill_id, name, victimname, skillname ,damage_type, add_target, skillID, nameID, victimID, time_send, time_accept, [networkskill_id+victimID]",
    DoT_data: "&ID, victimID, lastupdate, effectID",
    Hp_data: "++ , nameID , time_number, lastupdate"//bufflist pottencial% attackerhistory
  });
  await DB_BACKUP.version(1).stores({
    Battle : '++'
  });
}*/
async function main_db_save_reset(){
  //await DB_BACKUP.Battle.add({Database : DB.Player_data.toArray()});
  await main_db_save();
  await main_db_clear();
}
async function main_db_clear(){
  await DB.Player_data.clear();
  await DB.Skill_data.clear();
  await DB.DoT_data.clear();
  await DB.Hp_data.clear();
  await DB.Player_hp.clear();
}
async function main_db_save(){
  await DB_BACKUP.Battle.add({
    Player_data : await DB.Player_data.toArray(),
    Hp_data : await DB.Hp_data.toArray(),
    Skill_data : await DB.Skill_data.toArray(),
    DoT_data : await DB.DoT_data.toArray()
  });
}
async function hp_data_db_add(data){
  let input_primary_key = null;
  await DB.transaction("rw", DB.Hp_data,async ()=>{
    input_primary_key = LOGLINE_ENCOUNTER.Hp_database_id++;
    data.id = input_primary_key;
    await DB.Hp_data.add(data);
  })
  .catch((error)=>{
    console.error(error);
    input_primary_key = null;
  });
  //console.log('return value ->'+ input_primary_key);
  return input_primary_key;
}
//target : Player_data "nameID" (DPS...HPS...etc)
//Player_data: "&nameID, name, job, aliance, server, *rob, robhistory, kills, deaths, assist, water, totaldamage, playerdamage, persondamage, torobotdamage, objectdamage, matondamage, towerdamage, overdamage, totalheal, myheal ,partyheal ,allyheal, otherheal, overheal, totalincomeheal, incomeselfheal, incomeotherheal, incomepartyheal, incomeallyheal, totalincomedamage, personalincomedamage, robincomedamage, otherpersonincomedamage, objectincomedamage, mpheal",
//Skill_data: "&actionwithnameID, networkskill_id, name, victimname, skillname ,damage_type, add_target, skillID, nameID, victimID, time_send, time_accept, [networkskill_id+victimID]",
//DoT_data: "&ID, victimID, lastupdate, effectID",
//Hp_data
//target : Realtime_data "nameID"(currenthp/maxhp...noweffect)
//target : Skill_data "queueID + victimID + attackerID"(skillID...queueID)
async function initialize_playerdata(key){
  let data = {
    nameID:key,
    //damage
    totaldamage:0,
    playerdamage:0,
    torobotdamage:0,
    playerotherdamage:0,
    persondamage:0,
    objectdamage:0,
    towerdamage:0,
    matondamage:0,
    //heal
    allyheal:0,
    partyheal:0,
    selfheal:0,
    totalheal:0,
    otherheal:0,
    //incomedamage
    totalincomedamage:0,
    objectincomedamage:0,
    robincomedamage:0,
    otherpersonincomedamage:0,
    personalincomedamage:0,
    //incomeheal
    totalincomeheal:0,
    incomeselfheal:0,
    incomeotherheal:0,
    incomeallyheal:0,
    incomepartyheal:0,
    //over
    overheal:0,
    overdamage:0,
    //kill
    kill:0,
    death:0,
    assist:0,
    s_kill:0,
    s_death:0
  };
  console.log(data);
  return data;
}
async function insert_maindata(target,keyname,key,...data){//データの新規追加ONLY
  let input = {[keyname]:key};
  for(let i = 0 ; i <data.length ; i ++){
    input[data[i][0]] = data[i][1];
  }
  TBD[target].push(input);
}
async function update_maindata(target,keyname,key,...data){//データの更新含む
  //let position = TBD[target].findIndex(({nameID}) => nameID === key);
  let position = await searched_maindata(target,keyname,key);
  if(position === -1){//存在しないとき
    /*
    if(target === 'Player_data'){
      TBD[target].push(await initialize_playerdata(key));
    }
    else {
      TBD[target].push({[keyname]:key});
    }*/
    TBD[target].push({[keyname]:key});
    position = await searched_maindata(target,keyname,key);
    if(position === -1){
      console.error('Error : New Data create failed... [keyname]->' + key);
      console.error(data);
      return null;
    }
  }
  for(let i = 0 ; i < data.length ; i++){
    if(data[i][2]){//replace
      TBD[target][position][data[i][0]] = data[i][1];
    }
    else{//add
      //console.log(typeof db_data[data[i][0]]);
      if(typeof TBD[target][position][data[i][0]] === 'undefined'){
        if(typeof data[i][1] === 'number'){
          TBD[target][position][data[i][0]] = 0 ;
        }
        else if (typeof data[i][1] === 'string') {
          //db_data[data[i][0]] = '' ;
          TBD[target][position][data[i][0]] = [];
        }
        else if (typeof data[i][1] === 'object') {
          TBD[target][position][data[i][0]] = [];
        }
      }
      if(typeof data[i][1] === 'number'){
        TBD[target][position][data[i][0]] += data[i][1];
      }
      else if (typeof data[i][1] === 'string') {
        //db_data[data[i][0]] += data[i][1];
        TBD[target][position][data[i][0]].push(data[i][1]) ;
      }
      else if (typeof data[i][1] === 'object') {
        TBD[target][position][data[i][0]].push(data[i][1]) ;
      }
      else {
        console.error('Error : Input Data is typeof Unknown ->' + typeof data[i][1] + ':' + data[i][1]);
        console.error(data);
      }
    }
  }
  //robot data を詳細にするためのもの
  if(AREA.Area_Type === 2){//Hidden Gorge
    if(target === 'Player_data'){
      if(typeof TBD[target][position].robot === 'boolean'){
        if(TBD[target][position].robot){//ロボ中のとき
          //input
          let data_robot = TBD[target][position].robot_data[TBD[target][position].robot_data.length - 1].data;
          for(let i = 0 ; i < data.length ; i++){
            if(data[i][2]){//replace
              //TBD[target][position].robot_data[TBD[target][position].robot_data.length - 1].data[data[i][0]] = data[i][1];
            }
            else if (data[i][0] === 'robot_data') {
              //Circular reference
            }
            else{//add
              if(typeof data_robot[data[i][0]] === 'undefined'){
                if(typeof data[i][1] === 'number'){
                  data_robot[data[i][0]] = 0 ;
                }
                else if (typeof data[i][1] === 'string') {
                  //db_data[data[i][0]] = '' ;
                  data_robot[data[i][0]] = [];
                }
                else if (typeof data[i][1] === 'object') {
                  data_robot[data[i][0]] = [];
                }
              }
              if(typeof data[i][1] === 'number'){
                data_robot[data[i][0]] += data[i][1];
              }
              else if (typeof data[i][1] === 'string') {
                //db_data[data[i][0]] += data[i][1];
                data_robot[data[i][0]].push(data[i][1]) ;
              }
              else if (typeof data[i][1] === 'object') {
                data_robot[data[i][0]].push(data[i][1]) ;
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
async function searched_maindata(target,keyname,key){
  for(let i = TBD[target].length - 1 ; i >= 0 ; i--){
    if(TBD[target][i][keyname] === key){
      return i;
    }
  }
  return -1;
}

async function db_update(target,keyname,key,...data){
  await DB.transaction("rw", DB[target], async ()=>{
    let db_data = await DB[target].get({[keyname] : key});
    if(typeof db_data === 'undefined'){
      await DB[target].add({[keyname] : key});
      db_data = await DB[target].get({[keyname] : key});
    }
    for(let i = 0 ; i < data.length ; i++){
      if(data[i][2]){//replace
        db_data[data[i][0]] = data[i][1];
        await DB[target].put(db_data);
      }
      else{//add
        //console.log(typeof db_data[data[i][0]]);
        if(typeof db_data[data[i][0]] === 'undefined'){
          if(typeof data[i][1] === 'number'){
            db_data[data[i][0]] = 0 ;
          }
          else if (typeof data[i][1] === 'string') {
            //db_data[data[i][0]] = '' ;
            db_data[data[i][0]] = [];
          }
          else if (typeof data[i][1] === 'object') {
            db_data[data[i][0]] = [];
          }
        }
        if(typeof data[i][1] === 'number'){
          db_data[data[i][0]] += data[i][1];
        }
        else if (typeof data[i][1] === 'string') {
          //db_data[data[i][0]] += data[i][1];
          db_data[data[i][0]].push(data[i][1]) ;
        }
        else if (typeof data[i][1] === 'object') {
          db_data[data[i][0]].push(data[i][1]) ;
        }
        else {
          console.error('Error : Input Data is typeof Unknown ->' + typeof data[i][1] + ':' + data[i][1]);
          console.error(data);
        }
        await DB[target].put(db_data);
      }
    }
  })
  .then(()=>{
    // トランザクション正常終了後に処理をしたい場合はここに書く
    //console.debug('transaction sucsess ! Target:' + target + 'key->' + keyname + ':' + key);
    //console.debug(data);
  })
  .catch((error)=>{
    console.error(error);
    console.error('Target:' + target + 'key->' + keyname + ':' + key);
    console.error(data);
  });
}
async function read_maindata(target,keyname,key,...data){
  let return_data = {};
  let position = await searched_maindata(target,keyname,key);
  if(position === -1){
    return {};
  }
  if(typeof TBD[target][position] !== 'undefined'){
    for(let i = 0 ; i < data.length ; i++){
      return_data[data[i]] = TBD[target][position][data[i]];
    }
  }
  return return_data;
}
async function db_read(target,keyname,key,...data){
  let return_data = {};
  await DB.transaction('r',DB[target],async ()=>{
    let db_data = await DB[target].get({[keyname] : key});
    if(typeof db_data !== 'undefined'){
      for(let i = 0 ; i < data.length ; i++){
        return_data[data[i]] = db_data[data[i]];
      }
    }
    else{
      console.debug('Debug : Database not saved->' + target + ':' + keyname +  ':' + key);
    }
  })
  .catch((error)=>{
    console.error(error);
    return_data = null;
  });
  return return_data;
}

async function update_maindata_change(target, keyname, key, dataname, data, replace){
  if(dataname.length === 1){
    await update_maindata(target,keyname,key,[dataname[0],data[0],replace[0]]);
  }
  else if (dataname.length === 2) {
    await update_maindata(target,keyname,key,[dataname[0],data[0],replace[0]],[dataname[1],data[1],replace[1]]);
  }
  else if (dataname.length === 3) {
    await update_maindata(target,keyname,key,[dataname[0],data[0],replace[0]],[dataname[1],data[1],replace[1]],[dataname[2],data[2],replace[2]]);
  }
  else if (dataname.length === 4) {
    await update_maindata(target,keyname,key,[dataname[0],data[0],replace[0]],[dataname[1],data[1],replace[1]],[dataname[2],data[2],replace[2]],[dataname[3],data[3],replace[3]]);
  }
  else if (dataname.length === 5) {
    await update_maindata(target,keyname,key,[dataname[0],data[0],replace[0]],[dataname[1],data[1],replace[1]],[dataname[2],data[2],replace[2]],[dataname[3],data[3],replace[3]],[dataname[4],data[4],replace[4]]);
  }
  else if (dataname.length === 6) {
    await update_maindata(target,keyname,key,[dataname[0],data[0],replace[0]],[dataname[1],data[1],replace[1]],[dataname[2],data[2],replace[2]],[dataname[3],data[3],replace[3]],[dataname[4],data[4],replace[4]],[dataname[5],data[5],replace[5]]);
  }
  else {
    console.warn('Error : database update format change failed... ->');
    console.warn(dataname);
  }
}
