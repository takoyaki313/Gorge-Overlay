let TBD = {};
let NameID_Name_JobList = {};
///////////////

let TenSyonMax_Me = false;
const Kind = ['damage_kind', 'heal_kind', 'accept_income_heal_kind', 'accept_income_damage_kind'];//重複を許可しない.要素は文字列だけ

function reset_TBD() {
  TBD = {
    Player_data: [], Skill_data: [], DoT_data: [], Barrier_data: [], Player_hp: [], Hp_data: [], Action_data: [], Action_Synced_data: [], Action_Sync_data: []
    , Aliance: [{ dunamis: 0, history: [] }, { dunamis: 0, history: [] }, { dunamis: 0, history: [] }, { dunamis: 0, history: [] }, { dunamis: 0, history: [] }, { dunamis: 0, history: [] }, { dunamis: 0, history: [] }]
  };
  NameID_Name_JobList = {}
}
function part_reset_TBD() {
  let backup = [];
  for (let i = 0; i < TBD.Player_data.length; i++) {
    let target = TBD.Player_data[i];
    if (target.nameID.substring(0, 2) === '10') {
      backup.push({ nameID: target.nameID, name: target.name, job: target.job, server: target.server, aliance: target.aliance });
    }
  }
  TBD = {
    Player_data: backup, Skill_data: [], DoT_data: [], Barrier_data: [], Player_hp: [], Hp_data: [], Action_data: [], Action_Synced_data: [], Action_Sync_data: []
    , Aliance: [{ dunamis: 0, history: [] }, { dunamis: 0, history: [] }, { dunamis: 0, history: [] }, { dunamis: 0, history: [] }, { dunamis: 0, history: [] }, { dunamis: 0, history: [] }, { dunamis: 0, history: [] }]
  };
}
async function get_ID_to_NameJob(nameID){
  if (typeof(NameID_Name_JobList[nameID]) === 'undefined'){
    return {name:nameID,job:"",server:"Unknown",owner:null};
  }else{
    if(NameID_Name_JobList[nameID].owner === null){
      return NameID_Name_JobList[nameID];
    }else{
      if (typeof(NameID_Name_JobList[NameID_Name_JobList[nameID].owner]) === 'undefined'){
        return NameID_Name_JobList[nameID];
      }else{
        return NameID_Name_JobList[NameID_Name_JobList[nameID].owner];
      }
    }
  }
}
async function hp_data_db_add(data) {
  let input_primary_key = null;
  await DB.transaction("rw", DB.Hp_data, async () => {
    input_primary_key = LOGLINE_ENCOUNTER.Hp_database_id++;
    data.id = input_primary_key;
    await DB.Hp_data.add(data);
  })
    .catch((error) => {
      console.error(error);
      input_primary_key = null;
    });
  //console.log('return value ->'+ input_primary_key);
  return input_primary_key;
}
async function insert_maindata(target, keyname, key, ...data) {//データの新規追加ONLY
  let input = { [keyname]: key };
  for (let i = 0; i < data.length; i++) {
    input[data[i][0]] = data[i][1];
  }
  TBD[target].push(input);
}
async function insert_maindata_object(target, obj) {//データの新規追加ONLY 連想配列をそのまま
  TBD[target].push(obj);
}
async function update_maindata(target, keyname, key, ...data) {
  await New_update_maindata(target, keyname, key, data);
}
async function update_maindata_change_array(target, keyname, key, name, data, replace) {
  let rtn = [];
  for (let i = 0; i < name.length; i++) {
    if (data[i] !== undefined) {
      if (typeof data[i] === 'number') {
        if (isNaN(data[i])) {
          console.error('DataSpace include "NaN"');
          console.error(name);
          console.error(data);
          console.error(replace);
          console.error(Log);
          return null;
        }
      }
      rtn.push([name[i], data[i], replace[i]]);
    } else {
      console.error('DataSpace undefined Include');
      console.error(name);
      console.error(data);
      console.error(replace);
      return null;
    }
  }
  await New_update_maindata(target, keyname, key, rtn);
}
async function New_update_maindata(target, keyname, key, data) {//データの更新含む
  //let position = TBD[target].findIndex(({nameID}) => nameID === key);
  let position = await searched_maindata(target, keyname, key);
  if (position === -1) {//存在しないとき
    TBD[target].push({ [keyname]: key });
    position = await searched_maindata(target, keyname, key);
    if (position === -1) {
      console.error('Error : New Data create failed... [keyname]->' + key);
      console.error(data);
      return null;
    }
  }
  for (let i = 0; i < data.length; i++) {
    if (data[i][2]) {//replace
      TBD[target][position][data[i][0]] = data[i][1];
    }
    else {//add
      //console.log(typeof db_data[data[i][0]]);
      if (typeof TBD[target][position][data[i][0]] === 'undefined') {
        if (typeof data[i][1] === 'number') {
          TBD[target][position][data[i][0]] = 0;
        }
        else if (typeof data[i][1] === 'string') {
          //db_data[data[i][0]] = '' ;
          TBD[target][position][data[i][0]] = [];
        }
        else if (data[i][1] instanceof Object) {
          TBD[target][position][data[i][0]] = [];
        }
      }
      if (typeof data[i][1] === 'number') {
        TBD[target][position][data[i][0]] += data[i][1];
      }
      else if (typeof data[i][1] === 'string') {
        //db_data[data[i][0]] += data[i][1];
        TBD[target][position][data[i][0]].push(data[i][1]);
      }
      else if (data[i][1] instanceof Object) {
        if (data[i][1] instanceof Array) {
          if (Kind.indexOf(data[i][0] !== -1)) {
            TBD[target][position][data[i][0]] = TBD[target][position][data[i][0]].concat(data[i][1]);
          } else {
            TBD[target][position][data[i][0]].push(data[i][1]);
          }
        } else {
          TBD[target][position][data[i][0]].push(data[i][1]);
        }
      }
      else {
        console.error('Error : Input Data is typeof Unknown ->' + typeof data[i][1] + ':' + data[i][1] + 'i = ' + i);
        console.error(data);
      }
    }
  }
  //robot data を詳細にするためのもの
  if (AREA.Area_Type === 2) {//Hidden Gorge
    if (target === 'Player_data') {
      if (typeof TBD[target][position].robot === 'boolean') {
        if (TBD[target][position].robot) {//ロボ中のとき
          //input
          let data_robot = TBD[target][position].robot_data[TBD[target][position].robot_data.length - 1].data;
          for (let i = 0; i < data.length; i++) {
            if (data[i][2]) {//replace
              //TBD[target][position].robot_data[TBD[target][position].robot_data.length - 1].data[data[i][0]] = data[i][1];
            }
            else if (data[i][0] === 'robot_data') {
              //Circular reference
            }
            else {//add
              if (typeof data_robot[data[i][0]] === 'undefined') {
                if (typeof data[i][1] === 'number') {
                  data_robot[data[i][0]] = 0;
                }
                else if (typeof data[i][1] === 'string') {
                  //db_data[data[i][0]] = '' ;
                  data_robot[data[i][0]] = [];
                }
                else if (data[i][1] instanceof Object) {
                  data_robot[data[i][0]] = [];
                }
              }
              if (typeof data[i][1] === 'number') {
                data_robot[data[i][0]] += data[i][1];
              }
              else if (typeof data[i][1] === 'string') {
                //db_data[data[i][0]] += data[i][1];
                data_robot[data[i][0]].push(data[i][1]);
              }
              else if (data[i][1] instanceof Object) {
                if (data[i][1] instanceof Array) {
                  if (Kind.indexOf(data[i][0] !== -1)) {
                    TBD[target][position][data[i][0]] = TBD[target][position][data[i][0]].concat(data[i][1]);
                  } else {
                    TBD[target][position][data[i][0]].push(data[i][1]);
                  }
                } else {
                  TBD[target][position][data[i][0]].push(data[i][1]);
                }
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
async function actionSplice(target, potision) {
  return TBD[target].splice(potision, 1);
}
async function action_Search(target, searchkey, searchdata, part) {
  for (let i = TBD[target].length - 1; i > 0; i--) {
    if (part) {
      if (TBD[target][i][searchkey].substring(0, searchdata.length) === searchdata) {
        return i;
      }
    } else {
      if (TBD[target][i][searchkey] === searchdata) {
        return i;
      }
    }
  }
  return -1;
}
async function searched_maindata(target, keyname, key) {
  for (let i = TBD[target].length - 1; i >= 0; i--) {
    if (TBD[target][i][keyname] === key) {
      return i;
    }
  }
  return -1;
}
async function aliance_dunamis_update(nameID, dunamis, time) {
  if (nameID.substring(0, 2) === '10') {
    let read_data = await read_maindata('Player_data', 'nameID', nameID, 'aliance');
    if (typeof read_data.aliance === 'number') {
      number = read_data.aliance;
    } else {
      return null;
    }
    if (number > 0 && number < 7) {

    } else {
      return null;
    }
    if (AREA.Area_Type === 2 && LOGLINE_ENCOUNTER.Engage) {
      if (TBD.Aliance[number].dunamis !== dunamis) {
        if (dunamis === 20 && number === 1) {
          TenSyonMax_Me = true;
        }
        TBD.Aliance[number].history.push({ from: TBD.Aliance[number].dunamis, to: dunamis, time: Math.round((await timestamp_change(time) - LOGLINE_ENCOUNTER.Battle_Start_Time) / 1000) });
        TBD.Aliance[number].dunamis = dunamis;
      }
    }
  }
}
async function read_maindata(target, keyname, key, ...data) {
  let return_data = {};
  let position = await searched_maindata(target, keyname, key);
  if (position === -1) {
    return {};
  }
  if (typeof TBD[target][position] !== 'undefined') {
    for (let i = 0; i < data.length; i++) {
      return_data[data[i]] = TBD[target][position][data[i]];
    }
  }
  return return_data;
}

async function update_maindata_change(target, keyname, key, dataname, data, replace) {
  if (dataname.length === 1) {
    await update_maindata(target, keyname, key, [dataname[0], data[0], replace[0]]);
  }
  else if (dataname.length === 2) {
    await update_maindata(target, keyname, key, [dataname[0], data[0], replace[0]], [dataname[1], data[1], replace[1]]);
  }
  else if (dataname.length === 3) {
    await update_maindata(target, keyname, key, [dataname[0], data[0], replace[0]], [dataname[1], data[1], replace[1]], [dataname[2], data[2], replace[2]]);
  }
  else if (dataname.length === 4) {
    await update_maindata(target, keyname, key, [dataname[0], data[0], replace[0]], [dataname[1], data[1], replace[1]], [dataname[2], data[2], replace[2]], [dataname[3], data[3], replace[3]]);
  }
  else if (dataname.length === 5) {
    await update_maindata(target, keyname, key, [dataname[0], data[0], replace[0]], [dataname[1], data[1], replace[1]], [dataname[2], data[2], replace[2]], [dataname[3], data[3], replace[3]], [dataname[4], data[4], replace[4]]);
  }
  else if (dataname.length === 6) {
    await update_maindata(target, keyname, key, [dataname[0], data[0], replace[0]], [dataname[1], data[1], replace[1]], [dataname[2], data[2], replace[2]], [dataname[3], data[3], replace[3]], [dataname[4], data[4], replace[4]], [dataname[5], data[5], replace[5]]);
  }
  else if (dataname.length === 7) {
    await update_maindata(target, keyname, key, [dataname[0], data[0], replace[0]], [dataname[1], data[1], replace[1]], [dataname[2], data[2], replace[2]], [dataname[3], data[3], replace[3]], [dataname[4], data[4], replace[4]], [dataname[5], data[5], replace[5]], [dataname[6], data[6], replace[6]]);
  }
  else if (dataname.length === 8) {
    await update_maindata(target, keyname, key, [dataname[0], data[0], replace[0]], [dataname[1], data[1], replace[1]], [dataname[2], data[2], replace[2]], [dataname[3], data[3], replace[3]], [dataname[4], data[4], replace[4]], [dataname[5], data[5], replace[5]], [dataname[6], data[6], replace[6]], [dataname[7], data[7], replace[7]]);
  }
  else if (dataname.length === 9) {
    await update_maindata(target, keyname, key, [dataname[0], data[0], replace[0]], [dataname[1], data[1], replace[1]], [dataname[2], data[2], replace[2]], [dataname[3], data[3], replace[3]], [dataname[4], data[4], replace[4]], [dataname[5], data[5], replace[5]], [dataname[6], data[6], replace[6]], [dataname[7], data[7], replace[7]], [dataname[8], data[8], replace[8]]);
  }
  else if (dataname.length === 10) {
    await update_maindata(target, keyname, key, [dataname[0], data[0], replace[0]], [dataname[1], data[1], replace[1]], [dataname[2], data[2], replace[2]], [dataname[3], data[3], replace[3]], [dataname[4], data[4], replace[4]], [dataname[5], data[5], replace[5]], [dataname[6], data[6], replace[6]], [dataname[7], data[7], replace[7]], [dataname[8], data[8], replace[8]], [dataname[9], data[9], replace[9]]);
  }
  else if (dataname.length === 11) {
    await update_maindata(target, keyname, key, [dataname[0], data[0], replace[0]], [dataname[1], data[1], replace[1]], [dataname[2], data[2], replace[2]], [dataname[3], data[3], replace[3]], [dataname[4], data[4], replace[4]], [dataname[5], data[5], replace[5]], [dataname[6], data[6], replace[6]], [dataname[7], data[7], replace[7]], [dataname[8], data[8], replace[8]], [dataname[9], data[9], replace[9]], [dataname[10], data[10], replace[10]]);
  }
  else if (dataname.length === 12) {
    await update_maindata(target, keyname, key, [dataname[0], data[0], replace[0]], [dataname[1], data[1], replace[1]], [dataname[2], data[2], replace[2]], [dataname[3], data[3], replace[3]], [dataname[4], data[4], replace[4]], [dataname[5], data[5], replace[5]], [dataname[6], data[6], replace[6]], [dataname[7], data[7], replace[7]], [dataname[8], data[8], replace[8]], [dataname[9], data[9], replace[9]], [dataname[10], data[10], replace[10]], [dataname[11], data[11], replace[11]]);
  }
  else if (dataname.length === 13) {
    await update_maindata(target, keyname, key, [dataname[0], data[0], replace[0]], [dataname[1], data[1], replace[1]], [dataname[2], data[2], replace[2]], [dataname[3], data[3], replace[3]], [dataname[4], data[4], replace[4]], [dataname[5], data[5], replace[5]], [dataname[6], data[6], replace[6]], [dataname[7], data[7], replace[7]], [dataname[8], data[8], replace[8]], [dataname[9], data[9], replace[9]], [dataname[10], data[10], replace[10]], [dataname[11], data[11], replace[11]], [dataname[12], data[12], replace[12]]);
  }
  else if (dataname.length === 14) {
    await update_maindata(target, keyname, key, [dataname[0], data[0], replace[0]], [dataname[1], data[1], replace[1]], [dataname[2], data[2], replace[2]], [dataname[3], data[3], replace[3]], [dataname[4], data[4], replace[4]], [dataname[5], data[5], replace[5]], [dataname[6], data[6], replace[6]], [dataname[7], data[7], replace[7]], [dataname[8], data[8], replace[8]], [dataname[9], data[9], replace[9]], [dataname[10], data[10], replace[10]], [dataname[11], data[11], replace[11]], [dataname[12], data[12], replace[12]], [dataname[13], data[13], replace[13]]);
  }
  else if (dataname.length === 15) {
    await update_maindata(target, keyname, key, [dataname[0], data[0], replace[0]], [dataname[1], data[1], replace[1]], [dataname[2], data[2], replace[2]], [dataname[3], data[3], replace[3]], [dataname[4], data[4], replace[4]], [dataname[5], data[5], replace[5]], [dataname[6], data[6], replace[6]], [dataname[7], data[7], replace[7]], [dataname[8], data[8], replace[8]], [dataname[9], data[9], replace[9]], [dataname[10], data[10], replace[10]], [dataname[11], data[11], replace[11]], [dataname[12], data[12], replace[12]], [dataname[13], data[13], replace[13]], [dataname[14], data[14], replace[14]]);
  }
  else {
    console.warn('Error : database update format change failed... ->');
    console.warn(dataname);
  }
}
