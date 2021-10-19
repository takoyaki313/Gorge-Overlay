function logline_start(log){
  if(log[0] === '40'){
    console.debug('Area changed =>'+log[2]+' : '+log[4]);
    //488 is Hidden Gorge
    //341 is The Goblet (my home)
    //242 is Seal Rock
    //296 is Field of Groly
    //568 is Onsal Hakair
    //167 is The Borderland Luins
    //15 is Middle La Noscea
    //51 is Wolves' Den Pier
    if (log[2] === '488'||log[2] === '242'||log[2] === '296'||log[2] ==='568'||log[2] === '167'){
      LOG_PROCESS = false;
    }/*
    else if (log[2] === '15'||log[2] === '51') {
      //other Area
      LOG_PROCESS = false;
    }*/
    else {
      LOG_PROCESS = true;
      if(TEST_MODE){
        console.warn('40 -> grobal array reset');
      }
      grobal_array_reset();
    }
    //if(log[4] === 'Hidden Gorge')
  }
  LOG_ARRAY.push(log);
}
function grobal_array_reset(){
  MAIN_DATA = [];
  ABILITY_TEMP = [];
  PROMISE_ARRAY = [];
  LOG_ARRAY = [];
  LOG_PROCESS = true;
  ALIANCE_DATA = false;
  NOW_AREA = 0;
}

function calc(){
  if(LOG_PROCESS === false||FORCE_LOG_LISTEN){
    LOG_PROCESS = true;
    PROMISE_ARRAY = [];
    //PROMISE_ARRAY = [];
    let promise = Promise.resolve();
    //let promise = ability_reflesh(5000);
    let log_num = LOG_ARRAY.length;
    for(let i = 0 ; i < log_num; i++) {
    // promiseにthenで繋ぎ再代入
    // これでどんどんthenをチェーンしていける
      promise = promise.then(() => logline_main(LOG_ARRAY.shift()));
      PROMISE_ARRAY.push(promise);
    }
    promise = promise.then(() => ability_reflesh(5000));
    PROMISE_ARRAY.push(promise);
    promise = promise.then(() => main_data_reflesh());
    PROMISE_ARRAY.push(promise);
    promise = promise.then(() => main_data_output());
    PROMISE_ARRAY.push(promise);
    //console.debug(promise);
    //console.debug(PROMISE_ARRAY);
    Promise.all(PROMISE_ARRAY)
    .then(() => LOG_PROCESS = false);
  }
  else if (LOG_PROCESS && NOW_AREA === 0) {
    //console.log('reset (calc)');
    if(TEST_MODE){
      console.warn('calc -> global arrya reset');
    }
    grobal_array_reset();
  }
}
async function logline_main(log){
  switch (log[0]) {
    case '03':
    await addcombatant(log);
    if(TEST_MODE){
      console.debug(log);
    }
      break;

    case '04':
    await removecombatant(log);
    if(TEST_MODE){
      console.debug(log);
    }
      break;

    case '11':
    await log_party_push(log);
    if(TEST_MODE){
      console.debug(log);
    }
      break;

    case '21':
    await networkAbility(log);
    if(TEST_MODE){
      console.debug(log);
    }
    //console.debug(log);
      break;

    case '22':
    await networkAbility(log);
    if(TEST_MODE){
      console.debug(log);
    }
    //console.debug(log);
        break;

    case '37':
      await networkAbility_receve(log);
    if(TEST_MODE){
      console.debug(log);
    }
      break;

    case '24':
    await networkDot(log);
    if(TEST_MODE){
      console.debug(log);
    }
      break;

    case '38':
    await hp_update(log[2],log[5],log[6],log[8]);
    if(TEST_MODE){
      console.debug(log);
    }
      break;

    case '39':
    if(log[5] === ''){
      //await one_main_data_add(log[2],'currentHP',Number(log[4]),true);
    }
    else {
      await hp_update(log[2],log[4],log[5],log[7]);
    }
    if(TEST_MODE){
      console.debug(log);
    }
      break;

    case '25':
    await kill_type_check(log);
    if(TEST_MODE){
      console.debug(log);
    }

      break;
    case '99':
    await networkAbility_receve_error(log);
      break;
    case '00':
      break;

    case '300':
    await party_update(log);
      break;
    case '13':
      break;
    case '33':
    logline_battle_start_check(log);
    if(TEST_MODE){
      console.log(log);
    }
      break;

    case '30':
      break;

    case '26':
    tensyon_max_check(log);
      break;

    default:
    if(TEST_MODE){
      console.debug(log);
    }
      break;

  }
  function tensyon_max_check(log){
    if(log[2] === '6c2'){
      if(log[7].toUpperCase() === MYCHARACTOR_ID.toUpperCase()){
        TENSYON_MAX = true;
      }
    }
  }
  function logline_battle_start_check(log){
    if(log[3] === '40000001'){
      let time = parseInt(log[4],16);
      battle_counter(time);
    }
    else if (log[3] === '40000002') {
      setTimeout(() => {
        clearInterval(Battle_Timer_interval);
        Battle_Current_Time = 0;
        Battle_start = false;
      }, 1000);
    }
  }
  async function log_party_push(log) {
    let party_num = Number(log[2]);
    if(log.length - 4 > 0){
      let aliance = 1;
      if(log.length === 28){//24
        ALIANCE_DATA = true;
        for(let i = 0 ; i < log.length - 4 ; i++){
          if(i > 3){
            if(i % 4 == 0){
              aliance++;
            }
          }
          let data = ['300',log[i + 3].toUpperCase(),null,aliance];
          await party_update(data);
          //log 300 //party_data= ['300','nameID','name','aliance'];
        }
      }
      else{
        if(ALIANCE_DATA === false){
          for(let i = 0 ; i < log.length - 4 ; i++){
            if(i > party_num ){
              aliance = 10;
            }
            let data = ['300',log[i + 3].toUpperCase(),null,aliance];
            await party_update(data);
            //log 300 //party_data= ['300','nameID','name','aliance'];
          }
        }
      }
    }
  }
  async function kill_type_check(log){
    await one_main_data_add(log[2],'death',1,false);//death data is anytime ok
    if (log[2].slice(0,2) === '10'){//death->player
      if(log[4].slice(0,2) === '10'){//kill->player
        await one_main_data_add(log[4],'kills',1,false);
        //general pvp kill / death
        victim = get_name_job(log[2]);
        attacker = get_name_job(log[4]);
        if(victim[0] == ''||victim[0] === null){
          victim[0] = log[3];
        }
        if(attacker[0] == ''||attacker[0] === null){
          attacker[0] = log[5];
        }
        let data = {
          victimName:victim[0],
          victimjob:jobID_to_string(victim[1]),
          victimaliance:victim[2],
          attackerName:attacker[0],
          attackerjob:jobID_to_string(attacker[1]),
          attackeraliance:attacker[2],
          time:Date.now()
        }
          KILL_DATA.push(data);
          if(TENSYON_MAX && attacker[2] === 1){
            if(KILLSOUND){
              KILLSOUND_PLAY.play();
            }
          }
      }
      else{//death ->player & kill -> npc
        //DoT death / AoE death / Bunsin
        //名前解決
        await one_main_data_add(log[4],'kills',1,false);
        let true_ID = null;
        let victim = [];
        let attacker = [];
        let position = MAIN_DATA.findIndex(({nameID}) => nameID == log[4]);
        if (position === -1 ){
          if(TEST_MODE){
            console.warn('Error SearchBase (owner_check(kill log)) =>' + log[4]);
          }
        }
        else{
          true_ID = MAIN_DATA[position].ownerID;
        }
        if(true_ID === null){
          attacker = get_name_job(log[4]);
        }
        else{
          attacker = get_name_job(true_ID);
        }
        victim = get_name_job(log[2]);
        if(attacker[0] == ''||attacker[0] === null){
          attacker[0] = log[5];
        }
        if(victim[0] == ''||victim[0] === null){
          victim[0] = log[3];
        }
        let data = {
          victimName:victim[0],
          victimjob:jobID_to_string(victim[1]),
          victimaliance:victim[2],
          attackerName:attacker[0],
          attackerjob:jobID_to_string(attacker[1]),
          attackeraliance:attacker[2],
          time:Date.now()
        }
          KILL_DATA.push(data);
      }
    }
    else if(log[2].slice(0,2) === '40'&& TEST_MODE){
      await one_main_data_add(log[4],'kills',1,false);
      let true_ID = null;
      let victim = [];
      let attacker = [];
      let position = MAIN_DATA.findIndex(({nameID}) => nameID == log[4]);
      if (position === -1 ){
        if(TEST_MODE){
          console.warn('Error SearchBase (owner_check(kill log)) =>' + log[4]);
        }
      }
      else{
        true_ID = MAIN_DATA[position].ownerID;
      }
      if(true_ID === null){
        attacker = get_name_job(log[4]);
      }
      else{
        attacker = get_name_job(true_ID);
      }
      victim = get_name_job(log[2]);
      if(attacker[0] == ''||attacker[0] === null){
        attacker[0] = log[5];
      }
      if(victim[0] == ''||victim[0] === null){
        victim[0] = log[3];
      }
      console.log(attacker);
      let data = {
        victimName:victim[0],
        victimjob:jobID_to_string(victim[1]),
        victimaliance:victim[2],
        attackerName:attacker[0],
        attackerjob:jobID_to_string(attacker[1]),
        attackeraliance:attacker[2],
        time:Date.now()
      }
      console.log(data);
      KILL_DATA.push(data);
    }
    else{
      if(TEST_MODE){
        console.log('log :your object kill? ->' + log[3] +':'+log[4] + 'is kill ->'+ log[1] + ':' + log[2]);
      }
    }
  }
  async function party_update(log){
    //log 300 //party_data= ['300','nameID','name','aliance'];
    let array_data = [];
    let array_object = [];
    let array_replace = [];

    array_data.push(log[1]);
    array_object.push('nameID');
    array_replace.push(true);
    if(log[2] !== null){
      array_data.push(log[2]);
      array_object.push('name');
      array_replace.push(true);
    }
    array_data.push(Number(log[3]));
    array_object.push('aliance');
    array_replace.push(true);
    await main_data_push_update('nameID',log[1],array_object,array_data,array_replace);
  }
  async function hp_update(nameID,currentHP,maxHP,currentEP){
    let array_data = [];
    let array_object = [];
    let array_replace = [];
    array_data.push(Number(currentHP));
    array_object.push('currentHP');
    array_replace.push(true);
    if(maxHP !== '0'||maxHP !== 0||maxHP !== ''){
      array_data.push(Number(maxHP));
      array_object.push('maxHP');
      array_replace.push(true);
      if(NOW_AREA === 1 && nameID.slice(0,2).toUpperCase() !== '40'){//if Hidden Gorge
        data = await get_hp(nameID);
        let rob = robot_history(data[0],data[1],Number(currentHP),Number(maxHP));
        if(rob !== null){
          console.log('hp_update:'+nameID + '->'+rob);
          array_data.push(rob);
          array_object.push('robhistory');
          array_replace.push(false);
        }
      }
    }
    await main_data_push_update('nameID',nameID,array_object,array_data,array_replace);
  }
  async function get_hp(oldbasedata){
    let basedata = oldbasedata.toUpperCase();
    let position = MAIN_DATA.findIndex(({nameID}) => nameID == basedata);
    if (position === -1 ){
      if(TEST_MODE){
        console.warn('Error SearchBase (gethp) =>' + basedata);
      }
      return [0,0];
    }
    else {
      let data = [MAIN_DATA[position].currentHP,MAIN_DATA[position].maxHP];
      return data;
    }
  }
  function get_name_job(basedata){
    let position = MAIN_DATA.findIndex(({nameID}) => nameID == basedata);
    if (position === -1 ){
      if(TEST_MODE){
        console.warn('Error SearchBase (name/job) =>' + basedata);
      }
      return ['Unknown',0];
    }
    else {
      let job = 0;
      if(MAIN_DATA[position].maxHP === Oppresor_HP){
        let data = [MAIN_DATA[position].name,'32',MAIN_DATA[position].aliance];
        return data;
      }
      else if (MAIN_DATA[position].maxHP === Chaiser_HP) {
        let data = [MAIN_DATA[position].name,'33',MAIN_DATA[position].aliance];
        return data;
      }
      else if (MAIN_DATA[position].maxHP === Justice_HP) {
        let data = [MAIN_DATA[position].name,'34',MAIN_DATA[position].aliance];
        return data;
      }
      else{
        let data = [MAIN_DATA[position].name,MAIN_DATA[position].currentjob,MAIN_DATA[position].aliance];
        return data;
      }
    }
  }
  function robot_history(old_hp,old_hpmax,new_hp,new_hpmax){
    //old hp old hpmax
    //new hp new hpmax
    if(new_hpmax === Chaiser_HP){
      if(old_hpmax !== new_hpmax){
        //new robot
        console.log('Hpmax is cahnge' + old_hpmax + '!=' + new_hpmax);
        return 'che';
      }
      else if (new_hp > old_hp) {
        //new tobot
        console.log('currenthp is raise' + old_hp + '->' + new_hp);
        return 'che';
      }
    }
    else if (new_hpmax === Oppresor_HP) {
      if(old_hpmax !== new_hpmax){
        //new robot
          console.log('Hpmax is cahnge' + old_hpmax + '!=' + new_hpmax);
        return 'opp';
      }
      else if (new_hp > old_hp) {
        //new tobot
        console.log('currenthp is raise?' + old_hp + '->' + new_hp);
        return 'opp';
      }
    }
    else if (new_hpmax === Justice_HP) {
      if(old_hpmax !== new_hpmax){
        //new robot
          console.log('Hpmax is cahnge' + old_hpmax + '!=' + new_hpmax);
        return 'jas';
      }
      else if (new_hp > old_hp) {
        //new tobot
        console.log('currenthp is raise?' + old_hp + '->' + new_hp);
        return 'jas';
      }
    }
    return null;
  }
  async function networkAbility(log){
    //logline 21 22
    //Check attackerID attackerName victimID victimName skillID skillName
    //await hp_update(log[2],log[34],log[35],log[37]);//attacker
    //await hp_update(log[6],log[24],log[25],log[27]);//victim
    let damage_mask = log[9].slice(log[9].length - 4 , log[9].length);
    let damage = 0;
    if(damage_mask === '0000'){//normal damage
      damage = parseInt(log[9].slice(0,log[9].length - 4 ),16);//16
    }
    else if (damage_mask.slice(0,1) === '4') {
      let a = log[9].slice(0,2);
      let b = log[9].slice(2,4);
      let d = log[9].slice(6,8);
      let bd = parseInt(b,16) - parseInt(d,16);
      bd = bd.toString(16);
      damage = parseInt(d + a + bd ,16);
    }
    if(damage >= 0 ){
    }
    else{
      if(TEST_MODE){
        console.debug('log :probably damage zero' + damage);
      }
      damage = 0;
    }
    if(TEST_MODE){
      console.debug(log[44] + ':!!!! '+ log[3] + '→' + log[7] + ' (' + log[5] + ') ' + damage + '/ '+ log[8]  +'/ '+ log[9]);
    }
    //damage,damage_type,attackerID,skillID,skill_type,victimID,victimHP
    await damage_add(damage,'actual',log[2],log[4],log[8],log[6],Number(log[25]));
    if(log[10].slice(-1) === '4'){
      let additional_damage = 0;
      let additional_damage_mask = log[11].slice(log[9].length - 4 , log[11].length);
      if(additional_damage_mask === '8000'){//normal damage
        additional_damage = parseInt(log[11].slice(0,log[11].length - 4 ),16);//16
      }
      if(additional_damage <= 0){
        additional_damage = 0;
      }
        await damage_add(additional_damage,'actual',log[2],log[4],log[10],log[6],Number(log[25]));
        if(TEST_MODE){
          console.debug(log[44] + ':2!!! '+ log[3] + '→' + log[7] + ' (' + log[5] + ') ' + additional_damage + '/ '+ log[10]  +'/ '+ log[11]);
        }
    }
    await ability_push(log);

    //console.debug(ABILITY_TEMP);
  }
  async function ability_push(log){
    let searchID = log[44].toUpperCase();
    let data = {
      checkID: searchID,
      attackerID: log[2],
      attackerName: log[3],
      victimID: log[6],
      victimName: log[7],
      skillID: log[4],
      skillName: log[5],
      time: Date.now()
    }
    ABILITY_TEMP.push(data);
    if(TEST_MODE){
      console.debug(data);
    }
  }
  async function networkAbility_receve_error(log){
    let damage = Number(log[3]);
    let ability_position = ABILITY_TEMP.findIndex(({checkID}) => checkID == log[4]);
    if(ability_position === -1){
      if (TEST_MODE) {
        console.debug('log :Skill not matched...' + log[4]);
      }
    }
    else{
      console.warn('Yey retry sucsess');
      await damage_add(damage,'real',ABILITY_TEMP[ability_position].attackerID,ABILITY_TEMP[ability_position].skillID,ABILITY_TEMP[ability_position].victimID,Number(log[5]));
    }
  }
  async function networkAbility_receve(log){
    //logline 37
    let this_ability_checkID = log[4].toUpperCase();;

    let ability_position = ABILITY_TEMP.findIndex(({checkID}) => checkID === this_ability_checkID);
    let old_hp_array = await get_hp(log[2]);
    let damage =  old_hp_array[0] - log[5];
    await hp_update(log[2],log[5],log[6],log[8]);
    if (ability_position === -1){
      if(damage === 0){
        if(TEST_MODE){
          console.debug('Log : Probably this Ablitily is olready calclated...'+ log[4]);
        }
        return 0;
      }
      else{
        if(TEST_MODE){
          console.debug('log :Ability not detected...1 damage=>'+ damage + ' ID:'+ this_ability_checkID);
        }
        //もう1回処理を送る　
        error_log = ['99',log[2],log[3],damage,this_ability_checkID,log[6]];
        LOG_ARRAY.push(error_log);
        return -1;
      }
    }
    else{
      if(TEST_MODE){
        console.log('ID->'+ this_ability_checkID + ':'+ ABILITY_TEMP[ability_position].attackerName + ' damege '+ ABILITY_TEMP[ability_position].skillName +'=>'+ damage);
      }
    }
    await damage_add(damage,'real',ABILITY_TEMP[ability_position].attackerID,ABILITY_TEMP[ability_position].skillID,null,ABILITY_TEMP[ability_position].victimID,Number(log[6]));
    if(TEST_MODE){
      console.debug(ABILITY_TEMP[ability_position]);
    }
    //ABILITY_TEMP = ABILITY_TEMP.slice(0,ability_position - 1).concat(ABILITY_TEMP.slice(ability_position));
    //await delete_ability_array(ability_position);
  }
  async function damage_add(damage,damage_type,attackerID,skillID,skill_type,victimID,victimHP){
    let caluc_setting =  '';
    if(skill_type !== null){
      caluc_setting = skill_type.slice(-1);
    }
    else{
      if(damage_type === 'real'){
        if(damage > 0){
          caluc_setting = '3';
        }
        else if (damage < 0) {
          caluc_setting = '4';
          damage = damage * -1 ;
        }
        else {
          caluc_setting = '-1';
        }
      }

    }
    if(caluc_setting === '3'){
      if(victimID.slice(0,2) === '40'){
        if(victimHP > 200000){
          await one_main_data_add(attackerID,damage_type + 'towerdamage',damage,false);
        }
        else {
          await one_main_data_add(attackerID,damage_type + 'objectdamage',damage,false);
        }
      }
      else if (victimID.slice(0,2) === '10') {
        if (victimHP=== Oppresor_HP ||victimHP === Justice_HP || victimHP === Chaiser_HP){
          //victim is robot
          await one_main_data_add(attackerID,damage_type + 'ToRobotdamage',damage,false);
        }
        else{
          //victim is person
          await one_main_data_add(attackerID,damage_type + 'persondamage',damage,false);
        }
      }
      else {
        if(TEST_MODE){
          console.warn('Error :What your Attack???' + victimID);
        }
      }
    }
    else if (caluc_setting === '4' && damage_type === 'real') {//damageがマイナスのときreal only ( ||caluc_setting === '4')
      if (attackerID === victimID){
        await one_main_data_add(attackerID,'selfheal',damage,false);
      }
      else {
        await one_main_data_add(attackerID,'totalheal',damage,false);
      }
      //if(ABILITY_TEMP[ability_position].skillID === '')
      //await one_main_data_add(ABILITY_TEMP[ability_position].attackerID,'totalheal',damage = damage * -1,false);
    }
    else if (caluc_setting === '4' && damage_type === 'actual') {
      await one_main_data_add(attackerID,'actualheal',damage,false);
    }
  }
  async function networkDot(log){
    //24(DOT or HOT)
    //let currentHP = await get_hp(log[2]);
    //await hp_update(log[2],log[7],log[8],log[10])
    if (log[4] === 'DoT'){

    }
    else if (log[4] === 'HoT') {

    }
    else{
      if(TEST_MODE){
        console.warn('Error :This DoT is mystery...');
        console.warn(log);
      }
    }
  }
  async function addcombatant(log){
    let array_data = [];
    let array_object = [];
    let array_replace = [];
    if(log[2] === "e0000000"){
      //除外対象
    }
    else{
      //
      let base = log[2];
      array_data.push(log[2]);
      array_object.push('nameID');
      array_replace.push(true);
      if(log[3] !== ''){
        array_data.push(log[3]);
        array_object.push('name');
        array_replace.push(true);
      }
      if(log[4] !== '0'){
        array_data.push(log[4]);
        array_object.push('currentjob');
        array_replace.push(true);
      }
      if(log[6] !== '0'){
        array_data.push(log[6]);
        array_object.push('ownerID');
        array_replace.push(true);
      }
      if(log[11] !== '0'||log[11] !== 0||log[11] !== ''){
        array_data.push(Number(log[11]));
        array_object.push('currentHP');
        array_replace.push(true);
      }
      if(log[12] !== '0'||log[12] !== 0||log[12] !== ''){
        array_data.push(Number(log[12]));
        array_object.push('maxHP');
        array_replace.push(true);
      }
      array_data.push(true);
      array_object.push('battle');
      array_replace.push(true);
      if(NOW_AREA === 1){//if Hidden Gorge
        let data = await get_hp(base.toUpperCase());
        //robot_history(old_hp,old_hpmax,new_hp,new_hpmax);
        let rob = robot_history(data[0],data[1],Number(log[11]),Number(log[12]));
        if(rob !== null){
          console.log('addcombatant->' + log[3] + ':' + rob);
          array_data.push(rob);
          array_object.push('robhistory');
          array_replace.push(false);
        }
      }
      if(array_data.length !== 0){
        await main_data_push_update('nameID',base,array_object,array_data,array_replace);
      }
    }
  }
  async function removecombatant(log){
    let array_data = [];
    let array_object = [];
    let array_replace = [];
    if(log[2] === "e0000000"){
      //除外対象
    }
    else{
      //
      let base = log[2];
      array_data.push(log[2]);
      array_object.push('nameID');
      array_replace.push(true);
      if(log[3] !== ''){
        array_data.push(log[3]);
        array_object.push('name');
        array_replace.push(true);
      }
      if(log[4] !== '0'){
        array_data.push(log[4]);
        array_object.push('currentjob');
        array_replace.push(true);
      }
      if(log[6] !== '0'){
        array_data.push(log[6]);
        array_object.push('ownerID');
        array_replace.push(true);
      }
      if(log[11] !== '0'||log[11] !== 0||log[11] !== ''){
        array_data.push(Number(log[11]));
        array_object.push('currentHP');
        array_replace.push(true);
      }
      if(log[12] !== '0'||log[12] !== 0||log[12] !== ''){
        array_data.push(Number(log[12]));
        array_object.push('maxHP');
        array_replace.push(true);
      }
      array_data.push(false);
      array_object.push('battle');
      array_replace.push(true);
      if(array_data.length !== 0){
        await main_data_push_update('nameID',base,array_object,array_data,array_replace);
      }
    }
  }
}

async function one_main_data_add(nameID,type,data,replace){
  let array_data = [data];
  let array_object = [type];
  let array_replace = [replace];
  await main_data_push_update('nameID',nameID,array_object,array_data,array_replace);
}
async function main_data_new(base,data){
  if(base === 'nameID'){
    MAIN_DATA[MAIN_DATA.length]={
    nameID: data,
    name: null,
    ownerID: null,
    battle:null,
    currentHP: 0,
    maxHP: 0,
    currentjob: null,
    aliance: 0,
    robhistory: '',
    totaloutdamage: 0,
    realobjectdamage: 0,
    realpersondamage: 0,
    realToRobotdamage: 0,
    realtowerdamage: 0,
    realRobotdamage: 0,
    actualobjectdamage: 0,
    actualpersondamage: 0,
    actualToRobotdamage: 0,
    actualtowerdamage: 0,
    actualRobotdamage: 0,
    actualheal: 0,
    kills: 0,
    death: 0,
    totalheal: 0,
    selfheal: 0,
    totalincomedamage: 0,
    combatantDuration: 0,
    combatantdps:0,
    combatantdamage: 0,
    combatantheal:0,
    combatantjob: null,
    deletetime: null,
    }
  }
}

async function main_data_push_update(objectbase,oldbasedata,objectname,data,replace){
  let position ;
  let basedata = oldbasedata.toUpperCase();
  if (objectbase === 'nameID'){
    position = MAIN_DATA.findIndex(({nameID}) => nameID == basedata);
  }
  else if (objectbase === 'name') {
    position = MAIN_DATA.findIndex(({name}) => name == basedata);
  }
  else {
    if(TEST_MODE){
      console.warn('Error SearchBase =>' + objectbase);
    }
    return -1;
  }

  if(position === -1){
    position = MAIN_DATA.length;
    await main_data_new(objectbase,basedata);
  }
  for(let i = 0 ; i < objectname.length ; i++){
    if(replace[i]){//replace
      if(objectname[i] === 'maxHP' && data[i] === 0){
        console.warn('maxHP add 0 ->' + basedata);
        console.warn(objectname);
        console.warn(data);
      }
      else{
        if(objectname[i] === 'nameID'||objectname[i] === 'ownerID'){
          MAIN_DATA[position][objectname[i]] = data[i].toUpperCase();
        }
        else{
          MAIN_DATA[position][objectname[i]] = data[i];
        }
      }
    }
    else{//add
      MAIN_DATA[position][objectname[i]] = MAIN_DATA[position][objectname[i]] + data[i];
    }
  }
  let owner = MAIN_DATA[position].ownerID;
  if(owner !== null){//もしペット系のデータだった場合
    let owner_position = MAIN_DATA.findIndex(({nameID}) => nameID == owner);
    if(owner_position !== -1){
      if(TEST_MODE){
        console.debug(position +'のデータを'+owner_position + 'にmarge');
      }
      await main_data_marge_to_child(position,owner_position);
    }
    else{
      if(TEST_MODE){
        console.warn('Error owner_position not found =>'+ owner_position);
      }
    }
  }/*
  if(MAIN_DATA[position].battle === false && MAIN_DATA[position].nameID.slice(0,2) === '40'){
    if(TEST_MODE){
      console.debug('Delete'+ MAIN_DATA[position].nameID + '(' + MAIN_DATA[position].name + ')');
    }
    //MAIN_DATA.splice(position,1);
  }*/
}
async function main_data_marge_to_child(child_position,owner_position){
  MAIN_DATA[owner_position].totaloutdamage += MAIN_DATA[child_position].totaloutdamage;

  MAIN_DATA[owner_position].realToRobotdamage += MAIN_DATA[child_position].realToRobotdamage;
  MAIN_DATA[owner_position].realRobotdamage += MAIN_DATA[child_position].realRobotdamage;
  MAIN_DATA[owner_position].realobjectdamage += MAIN_DATA[child_position].realobjectdamage;
  MAIN_DATA[owner_position].realpersondamage += MAIN_DATA[child_position].realpersondamage;
  MAIN_DATA[owner_position].realtowerdamage += MAIN_DATA[child_position].realtowerdamage;

  MAIN_DATA[owner_position].actualToRobotdamage += MAIN_DATA[child_position].actualToRobotdamage;
  MAIN_DATA[owner_position].actualRobotdamage += MAIN_DATA[child_position].actualRobotdamage;
  MAIN_DATA[owner_position].actualobjectdamage += MAIN_DATA[child_position].actualobjectdamage;
  MAIN_DATA[owner_position].actualpersondamage += MAIN_DATA[child_position].actualpersondamage;
  MAIN_DATA[owner_position].actualtowerdamage += MAIN_DATA[child_position].actualtowerdamage;

  MAIN_DATA[owner_position].kills += MAIN_DATA[child_position].kills;
  MAIN_DATA[owner_position].death += MAIN_DATA[child_position].death;

  MAIN_DATA[owner_position].totalheal += MAIN_DATA[child_position].totalheal;
  MAIN_DATA[owner_position].selfheal += MAIN_DATA[child_position].selfheal;

  MAIN_DATA[owner_position].totalincomedamage = MAIN_DATA[owner_position].totalincomedamage + MAIN_DATA[child_position].totalincomedamage;
  await marge_to_child_to_reset(child_position);
}
async function marge_to_child_to_reset(position){
  MAIN_DATA[position].totaloutdamage = 0;

  MAIN_DATA[position].realToRobotdamage = 0;
  MAIN_DATA[position].realRobotdamage = 0;
  MAIN_DATA[position].realobjectdamage = 0;
  MAIN_DATA[position].realpersondamage = 0;
  MAIN_DATA[position].realtowerdamage = 0;

  MAIN_DATA[position].actualToRobotdamage = 0;
  MAIN_DATA[position].actualRobotdamage = 0;
  MAIN_DATA[position].actualobjectdamage = 0;
  MAIN_DATA[position].actualpersondamage = 0;
  MAIN_DATA[position].actualtowerdamage = 0;

  MAIN_DATA[position].kills = 0;
  MAIN_DATA[position].death = 0;

  MAIN_DATA[position].totalheal = 0;
  MAIN_DATA[position].selfheal = 0;

  MAIN_DATA[position].totalincomedamage = 0;
}
async function ability_reflesh(time){
  let now_time = Date.now();
  let delete_position = [];
  for (let i = 0; i < ABILITY_TEMP.length; i++) {
    if(now_time - ABILITY_TEMP[i].time > time){
      delete_position.push(i)
    }
  }
  for (let i = 0; i < delete_position.length; i++) {
    await delete_ability_array(delete_position[i]);
  }
}
async function delete_ability_array(ability_position){
  ABILITY_TEMP.splice(ability_position,1);
  //ABILITY_TEMP = ABILITY_TEMP.slice(0,ability_position - 1).concat(ABILITY_TEMP.slice(ability_position));
  //ABILITY_TEMP[ability_position] = {checkID: null};
}
async function delete_maindate_array(maindata_position){
  MAIN_DATA.splice(maindata_position,1);
}
async function main_data_output(){
  let data = [];
  for(let i = 0 ;i < MAIN_DATA.length ; i++){
    if(MAIN_DATA[i].aliance !== 0){
      let temp = Object.assign({}, MAIN_DATA[i]);
      data.push(temp);
    }
  LIMITED_DATA = data;
  }
}
async function main_data_reflesh(){
  let array_length = MAIN_DATA.length;
  let delete_position = [];
  let time = Date.now();
  for(let i = 0 ; i < array_length ; i++){
    if(MAIN_DATA[i].nameID.slice(0,2) === '40'){
      if(!MAIN_DATA[i].battle||MAIN_DATA[i].death !== 0){
        if(MAIN_DATA[i].deletetime === null){
          MAIN_DATA[i].deletetime = time;
        }
        else if (time - MAIN_DATA[i].deletetime >= 5000) {//5000 is delete time
          delete_position.push(i);
        }
      }
    }
  }
  for (let i = 0; i < delete_position.length; i++) {
    await delete_maindate_array(delete_position[i]);
  }
}
