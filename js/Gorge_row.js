function gorge_overlay_update(e){
  var encounter = e.Encounter;
  var combatants = e.Combatant;
  //limited_data_combatant_marge(combatants,encounter.DURATION,'rw');

  gorge_overlay_update_process($('#gorge-source li'));
}
function gorge_overlay_update_process(template){
    total_damage_calc();
    if(SPENT_NEARBY_TIME){
      LIMITED_DATA.sort(function (a,b) {
        return b.totaloutdps - a.totaloutdps ;
      });
    }
    else{
      LIMITED_DATA.sort(function (a,b) {
        return b.totaloutdamage - a.totaloutdamage ;
      });
    }
    var container = $('#overlay').clone();
    container.html('');
    if(Battle_start){
      limited_data_party_cut(MAX_ROW,'rw');
    }
    else if (!IGNORE_MAX_AFTER_BATTLE) {
      limited_data_party_cut(MAX_ROW,'rw');
    }
    let maxrow = LIMITED_DATA.length;
    if(maxrow > MAX_ROW){
      maxrow = MAX_ROW;
    }
    if(!Battle_start && IGNORE_MAX_AFTER_BATTLE){
      maxrow = LIMITED_DATA.length;
    }
    let special_color = special_color_check();
    for(let i = 0 ; i < maxrow ; i++){
      let base_time = 0;
      if(SPENT_NEARBY_TIME){
        base_time = LIMITED_DATA[i].totalbattletime;
      }
      else{
        base_time = PVP_DURATION;
      }
      if(Battle_start){//Timerが動いている時。
        let row = gorge_row_create(template.clone(),i,base_time,special_color);
        container.append(row);
      }
      else{//Timerが止まってるとき。
        let row = gorge_row_create(template.clone(),i,base_time,special_color);
        container.append(row);
      }
    }
    $('#overlay').replaceWith(container);
}
function special_color_check(){
  let data = color_data_local_load(LOCAL_SAVE_NAME);
  let temp = {};
  let data_array = Object.keys(data);
  for(let i = 0 ; i < data_array.length ; i++){
    let color = special_color(data[data_array[i]]);
    if(color !== null){
      temp[data_array[i]] = color;
    }
  }
  return temp;
}
function special_color_addclass (html,find,type,property,role,aliance){
  if(type !== null){
    if(type === 'role-color'){
      if(find === null){
        html.addClass('role-'+ property +'-'+ role);
      }
      else {
        html.find(find).addClass('role-'+ property +'-'+ role);
      }
    }
    else if (type === 'aliance-color') {
      if(find === null){
        html.addClass('aliance-' + property +'-'+ aliance);
      }
      else {
        html.find(find).addClass('aliance-' + property +'-'+ aliance);
      }
    }
  }
  return html;
}
function gorge_row_create(row,i,base_time,special_color){
  row.find('.g-total-dps-number').text(damage_to_dps(LIMITED_DATA[i].totaloutdamage,base_time));
  row.find('.g-total-hps-number').text(damage_to_dps(LIMITED_DATA[i].actualheal,base_time));
  let job = jobID_to_string(LIMITED_DATA[i].currentjob);
  let role = job_to_role(job);
  let aliance = LIMITED_DATA[i].aliance;
  row.find('.g-job-icon').addClass('icon-' + job);
  //special_color_addclass (html,find,type,property,data){
  /////////////////////////////////////////////////////////////////////////////////////////////
  row = special_color_addclass(row,'.g-job-icon',special_color.job_icon,'font',role,aliance);
  row = special_color_addclass(row,'.g-line-color',special_color.frame,'border',role,aliance);
  row = special_color_addclass(row,'.g-total-dps-number',special_color.main_dps,'font',role,aliance);
  row = special_color_addclass(row,'.g-total-hps-number',special_color.main_hps,'font',role,aliance);
  row = special_color_addclass(row,'.g-name',special_color.playername,'font',role,aliance);

  row = special_color_addclass(row,'.g-robot-history',special_color.boarding_history,'font',role,aliance);
  row = special_color_addclass(row,'.g-player-number',special_color.person_damage,'font',role,aliance);
  row = special_color_addclass(row,'.icon-person',special_color.person_icon,'font',role,aliance);
  row = special_color_addclass(row,'.g-torobot-number',special_color.torob_damage,'font',role,aliance);
  row = special_color_addclass(row,'.icon-hammer',special_color.torob_icon,'font',role,aliance);
  row = special_color_addclass(row,'.g-object-number',special_color.object_damage,'font',role,aliance);
  row = special_color_addclass(row,'.icon-maton',special_color.object_icon,'font',role,aliance);
  row = special_color_addclass(row,'.g-tower-number',special_color.tower_damage,'font',role,aliance);
  row = special_color_addclass(row,'.icon-tower2',special_color.tower_icon,'font',role,aliance);
  row = special_color_addclass(row,'.g-kill-number',special_color.kill_number,'font',role,aliance);
  row = special_color_addclass(row,'.g-death-number',special_color.death_number,'font',role,aliance);
  row = special_color_addclass(row,'.g-k-string',special_color.kill_string,'font',role,aliance);
  row = special_color_addclass(row,'.g-d-string',special_color.death_string,'font',role,aliance);
  row = special_color_addclass(row,'.g-basic',special_color.aliance_bar,'border',role,aliance);
  /////////////////////////////////////////////////////////////////////////////////////////////
  row.find('.g-name').text(LIMITED_DATA[i].name);
  row.find('.g-kill-number').text(LIMITED_DATA[i].kills);
  row.find('.g-death-number').text(LIMITED_DATA[i].death);
  row.find('.g-player-number').text(damage_to_dps(LIMITED_DATA[i].actualpersondamage,base_time));
  row.find('.g-torobot-number').text(damage_to_dps(LIMITED_DATA[i].actualToRobotdamage,base_time));
  row.find('.g-object-number').text(damage_to_dps(LIMITED_DATA[i].actualobjectdamage,base_time));
  row.find('.g-tower-number').text(damage_to_dps(LIMITED_DATA[i].actualtowerdamage,base_time));

  if(LIMITED_DATA[i].robhistory === null||LIMITED_DATA[i].robhistory === ''){
    //let reject_damage = LIMITED_DATA[i].realobjectdamage + LIMITED_DATA[i].realpersondamage + LIMITED_DATA[i].realToRobotdamage;
    //reject_damage = LIMITED_DATA[i].totaloutdamage - reject_damage;
    row.find('.g-robot-history').css('display','none');
    row.find('.g-name').css('max-width','100%');
  }
  else{
    row.find('.icon-robots').text(robot_history_fonts(LIMITED_DATA[i].robhistory));
    if(LIMITED_DATA[i].robhistory.indexOf('jas') !== -1 && JUSTICE_PUNTCH){
      let hit = LIMITED_DATA[i].rocketpuntchhit;
      let miss = LIMITED_DATA[i].rocketpuntchmiss;
      let total = hit + miss;
      let percent = hit / total;
      if(isNaN(percent)){
        percent = 0;
      }
      percent = percent*100;
      row.find('.g-total-hps-number').text(total + '/'+ percent.toFixed(0) +'%');
    }
  }

  if(ACT_NAME === LIMITED_DATA[i].name){
    row.find('.g-basic').addClass('me');
  }
  else if(LIMITED_DATA[i].death >= DEATH_TOO_MUCH){
    row.find('.g-basic').addClass('death-too-much');
  }
  else if(LIMITED_DATA[i].aliance === 1){
    row.find('.g-basic').addClass('party');
  }
  if(damage_to_dps(LIMITED_DATA[i].totaloutdamage,base_time) >= RAINBOW_DPS){
    row.find('.g-total-dps-number').addClass('gaming');
  }
  if(LIMITED_DATA[i].actualtowerdamage >= RAINBOW_DAMAGE_TOWER){
    row.find('.icon-tower2').addClass('gaming');
    row.find('.g-tower-number').addClass('gaming');
  }
  return row;
}
function robot_history_fonts(robhistory){
  //   outline  fill
  //jas 0xe90d 0xe92e
  //opp 0xe914 0xe933
  //che 0xe908 0xe927
  let data = '';
  if(robhistory === null){
    return '';
  }
  else {
    let num = robhistory.length / 3;
    for(let i = 0 ; i < num ; i++){
      if('jas' === robhistory.substr(0,3)){
        data = data + String.fromCodePoint(0xe92e);
        robhistory = robhistory.substr(3,robhistory.length);
      }
      else if ('che' === robhistory.substr(0,3)) {
        data = data + String.fromCodePoint(0xe927);
        robhistory = robhistory.substr(3,robhistory.length);
      }
      else if ('opp' === robhistory.substr(0,3)) {
        data = data + String.fromCodePoint(0xe933);
        robhistory = robhistory.substr(3,robhistory.length);
      }
    }
    return data;
  }
}

function damage_to_dps(damage,time){
  damage = Number(damage);
  time = Number(time);
  let dps = 0;
  if(time === 0) {
    time = 1;
  }
  else {
    dps = damage / time ;
  }
  dps = dps_round(dps);
  return dps;
}
function dps_round(dps){
  if(DECIMAL_POINT_DISPLAY){
    if (dps.toFixed(0).length <= 2) {
      dps = dps.toFixed(2);
    }
    else if (dps.toFixed(0).length === 3){
      dps = dps.toFixed(1);
    }
    else if (dps.toFixed(0).length >= 4) {
      dps = dps.toFixed(0);
    }
    return dps;
  }
else{
  return dps.toFixed(0);
  }
}
function limited_data_party_cut(cut,area){
  let replace_data = [];
  let party_member_position = [];
  if(AROUND_MEMBER_ONLY){
    let around_ally = [];
    for(let i = 0 ; i < LIMITED_DATA.length ; i++){
      if(LIMITED_DATA[i].battle){
        around_ally.push(LIMITED_DATA[i]);
      }
    }
    LIMITED_DATA = around_ally;
  }
  if(PARTY_PRIORITY){
    if(LIMITED_DATA.length >= cut){
      for(let i = 0 ; i < LIMITED_DATA.length ; i++){
        if(LIMITED_DATA[i].aliance === 1) {
          party_member_position.push(i);
          replace_data.push(LIMITED_DATA[i]);
        }
        else if (LIMITED_DATA[i].aliance === 2 && area === 'fl') {
          party_member_position.push(i);
          replace_data.push(LIMITED_DATA[i]);
        }
      }
      for(let i = 0;i < LIMITED_DATA.length && replace_data.length < cut ;i++){
        let noparty = 0;
        for(let p = 0; p < party_member_position.length;p++){
          if(i == party_member_position[p]){
            noparty = 1;
          }
        }
        if(noparty == 0){//パーティメンバーのデータでないとき
          replace_data.push(LIMITED_DATA[i]);
        }
      }
      LIMITED_DATA = replace_data;
      LIMITED_DATA.sort(function (a,b) {
        return b.totaloutdamage - a.totaloutdamage ;
      });
    }
  }
}
