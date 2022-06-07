//grobal
var CC_Simulation_kill = true;
var CC_Death_Too_Much = 5;
var CC_Death_Per_Sec = 60;
function teamdata_main(duration,teamtype,maindata){
  let teamdata = team_data_marge(maindata);
  return teamdata_disp(teamdata,duration,teamtype);
}
function teamtype_get(data){
  //gorgeでいろいろ変える
  if(data === 'blue'){
    return data;
  }
  else if (data === 'red') {
    return data;
  }
  else {
    return 'general';
  }
  return data;
}
function teamdata_disp(data,duration,teamtype){
  if(typeof duration !== 'number'){
    console.warn('Team Data is missing duration');
    console.warn('duration');
    return '';
  }else {
    let template = $('#team-source').clone();
    let teamname = teamtype;
    let teamdata = {dps:alignment_of_digits(damage_to_dps(data.damage,duration)),hps:alignment_of_digits(damage_to_dps(data.heal,duration))};
    template.addClass(teamname + 'team');//背景
    template.find('.t-team').addClass(teamname + 'teamicon');
    let dps_space = template.find('.t-dps');
    dps_space.text(teamdata.dps);
    let hps_space = template.find('.t-hps');
    hps_space.text(teamdata.hps);
    let kill_space = template.find('.t-kill');
    kill_space.text('K:'+data.kill);
    let death_space = template.find('.t-death');
    death_space.text('D:'+data.death);
    let assist_space = template.find('.t-assist');
    assist_space.text('A:'+data.assist);
    return template;
  }
}
function team_data_marge(data){
  let num = data.length ;
  let total = {dps:0,damage:0,heal:0,kill:0,kill_name:[],death:0,death_name:[],assist:0,assist_name:[]};
  let temp = {kill_name:[],death_name:[],assist_name:[]};
  for(let i = 0 ; i < num ; i++){
    total.dps += typeof data[i].calcdps === 'number'? data[i].calcdps : 0;
    total.damage += typeof data[i].totaldamage === 'number'? data[i].totaldamage : 0;
    total.heal += typeof data[i].totalheal === 'number'? data[i].totalheal : 0;
    if(CC_Simulation_kill){
      if(typeof data[i].s_kill === 'number'){
        total.kill += data[i].s_kill;
        for(let p = 0 ; p < data[i]['s-kill-name'].length ; p++){
          let inputdata = data[i]['s-kill-name'][p];
          inputdata.attacker = data[i].name;
          inputdata.attckerID = data[i].nameID;
          temp.kill_name.push(inputdata);
        }
      }
      if(typeof data[i].s_death === 'number'){
        total.death += data[i].s_death;
        for(let p = 0 ; p < data[i]['s-death-name'].length ; p++){
          let inputdata = data[i]['s-death-name'][p];
          inputdata.victim = data[i].name;
          inputdata.victimID = data[i].nameID;
          temp.death_name.push(inputdata);
        }
      }
      total.assist += typeof data[i].assist === 'number'? data[i].assist : 0;

    }else {
      if(typeof data[i].kill === 'number'){
        total.kill += data[i].kill;
        for(let p = 0 ; p < data[i].kill_name.length ; p++){
          let inputdata = data[i].kill_name[p];
          inputdata.attacker = data[i].name;
          inputdata.attckerID = data[i].nameID;
          temp.kill_name.push(inputdata);
        }
      }
      if(typeof data[i].death === 'number'){
        total.death += data[i].death;
        for(let p = 0 ; p < data[i].death_name.length ; p++){
          let inputdata = data[i].death_name[p];
          inputdata.victim = data[i].name;
          inputdata.victimID = data[i].nameID;
          temp.death_name.push(inputdata);
        }
      }
      total.assist += typeof data[i].assist === 'number'? data[i].assist : 0;
    }
  }
  total.kill_name = array_sort_module(temp.kill_name,'time_ms','down');
  total.death_name = array_sort_module(temp.death_name,'time_ms','down');
  return total;
}
var Ally_team_display = true;
var Enemy_team_display = true;
var Ally_team_matome = true;
var Enemy_team_matome = true;
var C_Time_Reference = 'battle_time';
function wolves_start(e){
  let template = $('#cc-source');
  let container = $('#overlay').clone();
  container.html("");
  let time = Number(e.Encounter.DURATION);
  let battle_datas = maindata_export('ally',time,'totaldamage');
  battle_datas = array_sort_module(battle_datas,'calcdps','up');
  for(let i = 0 ; i < battle_datas.length; i++){
    let battle_data = battle_datas[i];
    battle_data.battle_time = time;
    container.append(cc_create(template,battle_data,time,battle_datas[0].calcdps));
  }
  $('#overlay').replaceWith(container);
}
function cc_start(){
  let sort_target = 'calcdps';
  let template = $('#cc-source');
  let container = $('#overlay').clone();
  container.html("");
  let current_battle_time = overlaycreate_battletimeset();
  if(Ally_team_display||Ally_team_matome){
    let teamtype = teamtype_get('blue');
    let battle_datas = maindata_export('ally',current_battle_time,'totaldamage');
    if(Ally_team_matome){
      container.append(teamdata_main(current_battle_time,teamtype,battle_datas));
    }
    battle_datas = array_sort_module(battle_datas,'calcdps','up');
    if(Ally_team_display){
      for(let i = 0 ; i < battle_datas.length; i++){
        let battle_data = battle_datas[i];
        container.append(cc_create(template,battle_data,current_battle_time,battle_datas[0].calcdps));
      }
    }
  }
  if (Enemy_team_display||Enemy_team_matome) {
    let teamtype = teamtype_get('red');
    let battle_datas = maindata_export('enemy-player',current_battle_time,'totaldamage');
    if(Enemy_team_matome){
      container.append(teamdata_main(current_battle_time,teamtype,battle_datas));
    }
    battle_datas = array_sort_module(battle_datas,'calcdps','up');
    if(Enemy_team_display){
      for(let i = 0 ; i < battle_datas.length; i++){
        let battle_data = battle_datas[i];
        container.append(cc_create(template,battle_data,current_battle_time,battle_datas[0].calcdps));
      }
    }
  }
  $('#overlay').replaceWith(container);
}
function cc_create(template,data,duration,maxdps){
  let row = template.clone();
  let time = duration;
  if(C_Time_Reference === 'battle_time'){
    time = data.battle_time;
  }
  let dps = data.calcdps.toFixed(1);
  row.find('.c-dps-i').text(dps.substring(0,dps.length - 2));
  if(dps.length < 6){
    row.find('.c-dps-d').text('.' + dps.slice(-1));
  }
  else {
    row.find('.c-dps-d').text('');
  }
  //あらかじめ計算しておく
  let already_calc = {};
  //hps
  already_calc.totalheal = damage_to_dps(data.totalheal,time).toFixed(0);
  already_calc.selfheal = damage_to_dps(data.heal_self,time).toFixed(0);
  already_calc.partyheal = damage_to_dps(data.heal_party,time).toFixed(0);
  already_calc.allyheal = damage_to_dps(data.heal_ally,time).toFixed(0);
  already_calc.otherheal = damage_to_dps(data.heal_object,time).toFixed(0);
  already_calc.barrier = damage_to_dps(data.heal_total_barrier,time).toFixed(0);
  already_calc.overhealPct = ((data.over_totalheal / data.totalheal)*100).toFixed(2) + '%';
  //dps
  already_calc.totaldamage = damage_to_dps(data.totaldamage,time).toFixed(0);
  //
  let dps_area = row.find('.c-dps');
  let hps_area = row.find('.c-hps');
  hps_area.text(already_calc.totalheal);
  hps_area.prop('title',crystal_heal_tooptip(data));
  //let dps_tooltip_string = tooltip_dps_create(already_calc.playerdamage,already_calc.persondamage,already_calc.torobotdamage,already_calc.playerotherdamage,already_calc.objectdamage,already_calc.matondamage,already_calc.towerdamage,already_calc.objectotherdamage,already_calc.totaldamage,battle_data.totaldamage,battle_data['total-accept-damage'],time);
  dps_area.prop('title',crystal_dps_tooptip(data));

  //jobicon
  let jobicon_space = row.find('.c-job-icon');
  jobicon_space.addClass('icon-' + data.job);
  let jobhistory = tooltip_job_history(data.jobhistory);
  if(jobhistory.change){
    jobicon_space.prop('title',jobhistory.html);
    jobicon_space.addClass('astarisk');
  }
  //top space
  let c_kill = row.find('.c-kill');
  let c_death = row.find('.c-death');
  let c_assist = row.find('.c-assist');
  let death_num = 0;
  if(CC_Simulation_kill){
    c_kill = c_kill.text(data.s_kill);
    c_kill = c_kill.prop('title',tooltip_kill_death_create(data['s-kill-name'],'simulate'));
    c_death = c_death.text(data.s_death);
    death_num = data.s_death;
    c_death = c_death.prop('title',tooltip_kill_death_create(data['s-death-name'],'simulate'));
  }else {
    c_kill = c_kill.text(data.kill);
    c_kill = c_kill.prop('title',tooltip_kill_death_create(data.kill_name,'normal'));
    c_death = c_death.text(data.death);
    death_num = data.death;
    c_death = c_death.prop('title',tooltip_kill_death_create(data.death_name,'normal'));
  }
  c_assist = c_assist.text(data.assist);
  c_assist = c_assist.prop('title',tooltip_assist_create(data['s-assist']));
  let name_space = row.find('.c-name');
  name_space.prop('title',tooltip_title_create(['',data.server]));
  let me = false;
  if(data.name === PRIMARY_PLAYER.name){
    me = true;
    if(REPLACE_ACTNAME){
        name_space.text(PRIMARY_PLAYER.ACT_NAME);
    }
    else {
      name_space.text(data.name);
    }
  }else {
    name_space.text(data.name);
  }
  //not use
  //let dunamis_space = row.find('.c-dunamis');
  if( ( time / death_num ) - CC_Death_Per_Sec < 0){
    if(death_num > 2){
      row.addClass('death-too-much');
    }
  }else if (me) {
    row.addClass('me');
  }
  //damage bar
  row.find('.c-damage-gage').addClass('role-background-' + job_to_role(data.job));
  row.find('.c-damage-gage').css('width', ((data.calcdps / maxdps) * 100) + '%');
  //
  //row.find('.c-income-space').prop('title',tooltip_income(damage_to_dps(data.accept_income_heal_self,time).toFixed(0),damage_to_dps(data.accept_income_heal_party,time).toFixed(0),damage_to_dps(data.accept_income_heal_ally,time).toFixed(0),damage_to_dps(data.accept_income_heal_object,time).toFixed(0),damage_to_dps(data.accept_income_damage_player,time).toFixed(0),damage_to_dps(data.robincomedamage,time).toFixed(0),damage_to_dps(data.accept_income_damage_object,time).toFixed(0)));
  row.find('.c-incomedamage-number').text(damage_to_dps(data.accept_income_totaldamage,time).toFixed(0));
  row.find('.c-incomedamage-number').prop('title',crystal_income_damage_tooptip(data));
  row.find('.c-incomeheal-number').text(damage_to_dps(data.accept_income_totalheal,time).toFixed(0));
  row.find('.c-incomeheal-number').prop('title',crystal_income_heal_tooptip(data));
  return row;
}
function overlaycreate_battletimeset(){
  let create_time = 0;
  if(LOGLINE_ENCOUNTER.Result_in_time === 0){
    create_time = Date.now();
  }
  else {
    create_time = Math.min(Date.now(),LOGLINE_ENCOUNTER.Result_in_time);
  }

  let start_time = LOGLINE_ENCOUNTER.Battle_Start_Time;
  if(start_time === 0){
    start_time = Date.now() - 1000;
  }
  return Math.round((create_time - start_time) / 1000);
}
/*DAMAGE TOOLTIP
<div class="Crystal_damage_Tooltip">
  <div class="damage-top">
    <div class="damage-total">DAMAGE : 1235121</div>
    <div class="damage-total icon-ScheduleTime">231</div>
  </div>
  <div class="damage-total-other">
    <div class="damage-total">N:1125-95%</div>
    <div class="damage-total">D:115-5%</div>
    <div class="damage-total">C:15-5%</div>
  </div>
  <div class="tooltip_hr_line"></div>
  <div class="damage-player-row">
    <div class="name">A Name</div><div class="job-icon icon-pld"></div><div class="dps">1254</div><div class="dps-percent">15%</div>
    <div class="name">B Name</div><div class="job-icon icon-pld"></div><div class="dps">254</div><div class="dps-percent">5%</div>
    <div class="name">C Name</div><div class="job-icon icon-pld"></div><div class="dps">154</div><div class="dps-percent">35%</div>
    <div class="name">D Name</div><div class="job-icon icon-pld"></div><div class="dps">4</div><div class="dps-percent">20%</div>
    <div class="name">E Name</div><div class="job-icon icon-pld"></div><div class="dps">12</div><div class="dps-percent">1%</div>
  </div>
</div>
*/
function crystal_dps_tooptip(data){
  let all_kind = Object.keys(data);
  let time_include = false;
  let time = 0;
  if(all_kind.indexOf('damage_kind') === -1){
    return '';
  }
  if(all_kind.indexOf('battle_time') !== -1 ){
    time_include = true;
    time = data.battle_time;
  }
  let d_kind = data.damage_kind;

  let rtn = '';//html format
  //top area
  rtn += '<div class="Crystal_damage_Tooltip"><div class="damage-top"><div class="damage-total">DAMAGE : ';
  rtn += d_kind.indexOf('totaldamage') !== -1 ? data.totaldamage : '0' ;
  rtn += '</div><div class="damage-total"><div class="icon-ScheduleTime"></div>'
  rtn += time_include ? time : '-' ;
  //
  rtn += '</div></div><div class="damage-total-other">';
  rtn += d_kind.indexOf('damage_total_normal') !== -1 ? '<div class="damage-total">N:' + damage_to_dps(data.damage_total_normal,time).toFixed(1) + '-' + ((data.damage_total_normal/data.totaldamage) * 100).toFixed(0) + '%</div>': '' ;
  rtn += d_kind.indexOf('damage_total_DoT') !== -1 ? '<div class="damage-total">D:' + damage_to_dps(data.damage_total_DoT,time).toFixed(1) + '-' + ((data.damage_total_DoT/data.totaldamage) * 100).toFixed(0) + '%</div>': '' ;
  rtn += d_kind.indexOf('damage_total_counter') !== -1 ? '<div class="damage-total">C:' + damage_to_dps(data.damage_total_counter,time).toFixed(1) + '-' + ((data.damage_total_counter/data.totaldamage) * 100).toFixed(0) + '%</div>': '' ;
  rtn += '</div>';

  //player dps area
  if (!time_include){
    return rtn;
  }

  let player_damage = [];
  for(let i = 0 ; i < d_kind.length ; i++){
    if(d_kind[i].substring(0,9) === 'damage_10'){
      let nameID = d_kind[i].substring(d_kind[i].length - 8 ,d_kind[i].length);
      let damage = data[d_kind[i]];
      if(typeof NameID_Name_JobList[nameID] === 'object'){
        let name_job = NameID_Name_JobList[nameID]
        player_damage.push({nameID:nameID,name:name_job.name,job:name_job.job,damage:damage,dps:damage_to_dps(damage,time).toFixed(1),percent:((damage/data.totaldamage) * 100).toFixed(0) + '%'});
      }else {
        player_damage.push({nameID:nameID,name:nameID,job:'none',damage:damage,dps:damage_to_dps(damage,time).toFixed(1),percent:((damage/data.totaldamage) * 100).toFixed(0) + '%'});
      }
    }
  }
  player_damage = array_sort_module(player_damage,'damage','');
  if(player_damage.length > 0 ){
    player_damage = array_sort_module(player_damage,'damage','');
    //hr
    rtn += '<div class="tooltip_hr_line"></div>';
    rtn += '<div class="damage-player-row">';
    for(let i = 0 ; i < player_damage.length ; i ++){
      rtn += '<div class="name">'+ player_damage[i].name +'</div><div class="job-icon icon-'+ player_damage[i].job +'"></div><div class="dps">'+ player_damage[i].dps +'</div><div class="dps-percent">'+ player_damage[i].percent +'</div>';
    }
    rtn += '</div>';
  }
  rtn += '</div>';
  return rtn;
}
/*INCOME DAMAGE TOOLTIP
<div class="Crystal_damage_Tooltip">
  <div class="income-top">
    <div class="damage-total">ALL : 1235121</div>
    <div class="damage-total icon-person_income">231</div>
    <div class="damage-total icon-maton_income">231</div>
  </div>
  <div class="damage-total-other">
    <div class="damage-total">N:1125-95%</div>
    <div class="damage-total">D:115-5%</div>
    <div class="damage-total">C:15-5%</div>
  </div>
  <div class="tooltip_hr_line"></div>
  <div class="damage-player-row">
    <div class="name">A Name</div><div class="job-icon icon-pld"></div><div class="dps">1254</div><div class="dps-percent">15%</div>
    <div class="name">B Name</div><div class="job-icon icon-pld"></div><div class="dps">254</div><div class="dps-percent">5%</div>
    <div class="name">C Name</div><div class="job-icon icon-pld"></div><div class="dps">154</div><div class="dps-percent">35%</div>
    <div class="name">D Name</div><div class="job-icon icon-pld"></div><div class="dps">4</div><div class="dps-percent">20%</div>
    <div class="name">E Name</div><div class="job-icon icon-pld"></div><div class="dps">12</div><div class="dps-percent">1%</div>
  </div>
</div>
*/
function crystal_income_damage_tooptip(data){
  let all_kind = Object.keys(data);
  let time_include = false;
  let time = 0;
  if(all_kind.indexOf('accept_income_damage_kind') === -1){
    return '';
  }
  if(all_kind.indexOf('battle_time') !== -1 ){
    time_include = true;
    time = data.battle_time;
  }
  let d_kind = data.accept_income_damage_kind;

  let rtn = '';//html format
  //top area
  rtn += '<div class="Crystal_damage_Tooltip"><div class="income-top"><div class="damage-total">A-DAMAGE : ';
  rtn += d_kind.indexOf('totaldamage') !== -1 ? data.accept_income_totaldamage : '0' ;
  rtn += d_kind.indexOf('damage_player') !== -1 ? '<div class="damage-total"><div class="icon-person_income"></div>' + damage_to_dps(data.accept_income_damage_player,time).toFixed(1) +'</div>': '' ;
  rtn += d_kind.indexOf('damage_object') !== -1 ? '<div class="damage-total"><div class="icon-maton_income"></div>' + damage_to_dps(data.accept_income_damage_object,time).toFixed(1) +'</div>': '' ;
  //
  rtn += '</div></div><div class="damage-total-other">';
  rtn += d_kind.indexOf('damage_total_normal') !== -1 ? '<div class="damage-total">N:' + damage_to_dps(data.accept_income_damage_total_normal,time).toFixed(1) + '-' + ((data.accept_income_damage_total_normal/data.accept_income_totaldamage) * 100).toFixed(0) + '%</div>': '' ;
  rtn += d_kind.indexOf('damage_total_DoT') !== -1 ? '<div class="damage-total">D:' + damage_to_dps(data.accept_income_damage_total_DoT,time).toFixed(1) + '-' + ((data.accept_income_damage_total_DoT/data.accept_income_totaldamage) * 100).toFixed(0) + '%</div>': '' ;
  rtn += d_kind.indexOf('damage_total_counter') !== -1 ? '<div class="damage-total">C:' + damage_to_dps(data.accept_income_damage_total_counter,time).toFixed(1) + '-' + ((data.accept_income_damage_total_counter/data.accept_income_totaldamage) * 100).toFixed(0) + '%</div>': '' ;
  rtn += '</div>';
  //player dps area
  if (!time_include){
    return rtn;
  }

  let player_damage = [];
  for(let i = 0 ; i < d_kind.length ; i++){
    if(d_kind[i].substring(0,14) === 'damage_from_10'){
      let nameID = d_kind[i].substring(d_kind[i].length - 8 ,d_kind[i].length);
      let damage = data['accept_income_' + d_kind[i]];
      if(typeof NameID_Name_JobList[nameID] === 'object'){
        let name_job = NameID_Name_JobList[nameID]
        player_damage.push({nameID:nameID,name:name_job.name,job:name_job.job,damage:damage,dps:damage_to_dps(damage,time).toFixed(1),percent:((damage/data.accept_income_totaldamage) * 100).toFixed(0) + '%'});
      }else {
        player_damage.push({nameID:nameID,name:nameID,job:'none',damage:damage,dps:damage_to_dps(damage,time).toFixed(1),percent:((damage/data.accept_income_totaldamage) * 100).toFixed(0) + '%'});
      }
    }
  }
  if(player_damage.length > 0 ){
    player_damage = array_sort_module(player_damage,'damage','');
    //hr
    rtn += '<div class="tooltip_hr_line"></div>';
    rtn += '<div class="damage-player-row">';
    for(let i = 0 ; i < player_damage.length ; i ++){
      rtn += '<div class="name">'+ player_damage[i].name +'</div><div class="job-icon icon-'+ player_damage[i].job +'"></div><div class="dps">'+ player_damage[i].dps +'</div><div class="dps-percent">'+ player_damage[i].percent +'</div>';
    }
    rtn += '</div>';
  }
  rtn += '</div>';
  return rtn;
}
/*
<div class="Crystal_damage_Tooltip">
  <div class="income-top"><!--Heal All-->
    <div class="damage-total">ALL : 1235121(15%)</div>
  </div>
  <div class="damage-total-other">
    <div class="damage-total">N:1125(15%)-95%</div>
    <div class="damage-total">D:115-5%</div>
    <div class="damage-total icon-shield">:15-5%</div>
  </div>
  <div class="tooltip_hr_line"></div>
  <!--Heal Me-->
  <div class="heal-me">
    <div class="icon-me_normal">321(10%)</div><div>N:127(100%)</div><div class="">D:127</div><div class="icon-shield">127</div>
  </div>
  <div class="heal-me-under">
    <div class="icon-local_fire_department">10-325(32%)</div><div class="icon-Frasco">3-87(32%)</div>
  </div>
  <div class="tooltip_hr_line"></div>
  <div class="heal-me">
    <div class="icon-party_normal">321(10%)</div><div >N:127(100%)</div><div class="">D:127</div><div class="icon-shield">127</div>
  </div>
  <!--Heal Other-->
  <div class="damage-player-row">
    <div class="name">A Name</div><div class="job-icon icon-pld"></div><div class="dps">1254</div><div class="dps-percent">15%</div>
    <div class="name">B Name</div><div class="job-icon icon-pld"></div><div class="dps">254</div><div class="dps-percent">5%</div>
    <div class="name">C Name</div><div class="job-icon icon-pld"></div><div class="dps">154</div><div class="dps-percent">35%</div>
    <div class="name">D Name</div><div class="job-icon icon-pld"></div><div class="dps">4</div><div class="dps-percent">20%</div>
    <div class="name">E Name</div><div class="job-icon icon-pld"></div><div class="dps">12</div><div class="dps-percent">1%</div>
  </div>
</div>
*/
function crystal_heal_tooptip(data){
  let all_kind = Object.keys(data);
  let time = 0;
  if(all_kind.indexOf('heal_kind') === -1){
    return '';
  }
  if(all_kind.indexOf('battle_time') !== -1 ){
    time = data.battle_time;
  }
  else {
    return '';
  }
  let h_kind = data.heal_kind;

  let rtn = '';//html format
  //top area
  rtn += '<div class="Crystal_damage_Tooltip"><div class="income-top"><div class="damage-total">HEAL : ';
  rtn += h_kind.indexOf('totalheal') !== -1 ? data.totalheal : '0' ;
  rtn += h_kind.indexOf('over_totalheal') !== -1 ? ' (' + ((data.over_totalheal / data.totalheal) * 100).toFixed(1) + '%)' : ' (0%)' ;
  //
  rtn += '</div></div><div class="damage-total-other">';
  rtn += h_kind.indexOf('heal_total_normal') !== -1 ? '<div class="damage-total">N:' + damage_to_dps(data.heal_total_normal,time).toFixed(0) +' (' + ((data.over_heal_total_normal / data.heal_total_normal) * 100).toFixed(0) + '%)' + '-' + ((data.heal_total_normal/data.totalheal) * 100).toFixed(0) + '%</div>': '' ;
  rtn += h_kind.indexOf('heal_total_HoT') !== -1 ? '<div class="damage-total">H:' + damage_to_dps(data.heal_total_HoT,time).toFixed(0) +' (' + ((data.over_heal_total_HoT / data.heal_total_HoT) * 100).toFixed(0) + '%)' + '-' + ((data.heal_total_HoT/data.totalheal) * 100).toFixed(0) + '%</div>': '' ;
  rtn += h_kind.indexOf('heal_total_barrier') !== -1 ? '<div class="damage-total"><div class="icon-shield"></div>:' + damage_to_dps(data.heal_total_barrier,time).toFixed(0) + '-' + ((data.heal_total_barrier/data.totalheal) * 100).toFixed(0) + '%</div>': '' ;
  rtn += '</div>';
  //me hps area
  if(h_kind.indexOf('heal_self') !== -1){
    if(data.heal_self > 0){
      //hr
      rtn += '<div class="tooltip_hr_line"></div>';
      rtn += '<div class="heal-me"><div><div class="icon-me_normal"></div>';
      rtn += damage_to_dps(data.heal_self,time).toFixed(1);
      rtn += h_kind.indexOf('over_heal_self') !== -1 ? ' (' + ((data.over_heal_self / data.heal_self) * 100).toFixed(0) + '%)' : '(0%)' ;
      rtn += '-' + ((data.heal_self / data.totalheal) * 100).toFixed(0) + '%</div>';
      rtn += h_kind.indexOf('heal_self_HoT') !== -1 ? '<div class="damage-total">H:'+ damage_to_dps(data.heal_self_HoT,time).toFixed(0) +' (' + ((data.over_heal_self_HoT / data.heal_self_HoT) * 100).toFixed(0) + '%)</div>': '' ;
      rtn += h_kind.indexOf('heal_self_barrier') !== -1 ? '<div class="damage-total"><div class="icon-shield"></div>:'+ damage_to_dps(data.heal_self_barrier,time).toFixed(0) + '</div>': '' ;
      //Kaiki G-posion
      rtn += '</div><div class="heal-me-under">';
      rtn += h_kind.indexOf('heal_kaiki') !== -1 ? '<div><div class="icon-local_fire_department"></div>'+ data.heal_kaiki_num + '-' + damage_to_dps(data.heal_kaiki,time).toFixed(0) +' (' + ((data.over_heal_kaiki / data.heal_kaiki) * 100).toFixed(0) + '%)</div>': '' ;
      rtn += h_kind.indexOf('heal_G_posion') !== -1 ? '<div><div class="icon-Frasco"></div>'+ data.heal_G_posion_num + '-' + damage_to_dps(data.heal_G_posion,time).toFixed(0) +' (' + ((data.over_heal_G_posion / data.heal_G_posion) * 100).toFixed(0) + '%)</div>': '' ;
      rtn += '</div>';
    }
  }
  //party hps area
  if(h_kind.indexOf('heal_party') !== -1){
    if(data.heal_party > 0){
      rtn += '<div class="tooltip_hr_line"></div>';
      rtn += '<div class="heal-me"><div><div class="icon-party_normal"></div>';
      rtn += damage_to_dps(data.heal_party,time).toFixed(1);
      rtn += h_kind.indexOf('over_heal_party') !== -1 ? ' (' + ((data.over_heal_party / data.heal_party) * 100).toFixed(0) + '%)' : '(0%)' ;
      rtn += '-' + ((data.heal_party / data.totalheal) * 100).toFixed(0) + '%</div>';
      rtn += h_kind.indexOf('heal_party_HoT') !== -1 ? '<div class="damage-total">H:'+ damage_to_dps(data.heal_party_HoT,time).toFixed(0) +' (' + ((data.over_heal_party_HoT / data.heal_party_HoT) * 100).toFixed(0) + '%)</div>': '' ;
      rtn += h_kind.indexOf('heal_party_barrier') !== -1 ? '<div class="damage-noraml"><div class="icon-shield"></div>:'+ damage_to_dps(data.heal_party_barrier,time).toFixed(0) + '</div>': '' ;
      rtn += '</div>';

      let player_damage = [];
      for(let i = 0 ; i < h_kind.length ; i++){
        if(h_kind[i].substring(0,7) === 'heal_10'){
          let nameID = h_kind[i].substring(h_kind[i].length - 8 ,h_kind[i].length);
          let damage = data[h_kind[i]];
          if(typeof NameID_Name_JobList[nameID] === 'object'){
            let name_job = NameID_Name_JobList[nameID]
            player_damage.push({nameID:nameID,name:name_job.name,job:name_job.job,damage:damage,dps:damage_to_dps(damage,time).toFixed(1),percent:((damage/data.totalheal) * 100).toFixed(0) + '%'});
          }else {
            player_damage.push({nameID:nameID,name:nameID,job:'none',damage:damage,dps:damage_to_dps(damage,time).toFixed(1),percent:((damage/data.totalheal) * 100).toFixed(0) + '%'});
          }
        }
      }
      if(player_damage.length > 0 ){
        player_damage = array_sort_module(player_damage,'damage','');
        rtn += '<div class="damage-player-row">';
        for(let i = 0 ; i < player_damage.length ; i ++){
          rtn += '<div class="name">'+ player_damage[i].name +'</div><div class="job-icon icon-'+ player_damage[i].job +'"></div><div class="dps">'+ player_damage[i].dps +'</div><div class="dps-percent">'+ player_damage[i].percent +'</div>';
        }
        rtn += '</div>';
      }
    }
  }
  //Ally hps area (party copy)
  if(h_kind.indexOf('heal_ally') !== -1){
    if(data.heal_ally > 0){
      rtn += '<div class="tooltip_hr_line"></div>';
      rtn += '<div class="heal-me"><div><div class="icon-alliance_normal"></div>';
      rtn += damage_to_dps(data.heal_ally,time).toFixed(1);
      rtn += h_kind.indexOf('over_heal_ally') !== -1 ? ' (' + ((data.over_heal_ally / data.heal_ally) * 100).toFixed(0) + '%)' : '(0%)' ;
      rtn += '-' + ((data.heal_ally / data.totalheal) * 100).toFixed(0) + '%</div>';
      rtn += h_kind.indexOf('heal_ally_HoT') !== -1 ? '<div class="damage-total">H:'+ damage_to_dps(data.heal_ally_HoT,time).toFixed(0) +' (' + ((data.over_heal_ally_HoT / data.heal_ally_HoT) * 100).toFixed(0) + '%)</div>': '' ;
      rtn += h_kind.indexOf('heal_ally_barrier') !== -1 ? '<div class="damage-total"><div class="icon-shield"></div>:'+ damage_to_dps(data.heal_ally_barrier,time).toFixed(0) + '</div>': '' ;
      rtn += '</div>';

      let player_damage = [];
      for(let i = 0 ; i < h_kind.length ; i++){
        if(h_kind[i].substring(0,7) === 'heal_10'){
          let nameID = h_kind[i].substring(h_kind[i].length - 8 ,h_kind[i].length);
          let damage = data[h_kind[i]];
          if(typeof NameID_Name_JobList[nameID] === 'object'){
            let name_job = NameID_Name_JobList[nameID]
            player_damage.push({nameID:nameID,name:name_job.name,job:name_job.job,damage:damage,dps:damage_to_dps(damage,time).toFixed(1),percent:((damage/data.totalheal) * 100).toFixed(0) + '%'});
          }else {
            player_damage.push({nameID:nameID,name:nameID,job:'none',damage:damage,dps:damage_to_dps(damage,time).toFixed(1),percent:((damage/data.totalheal) * 100).toFixed(0) + '%'});
          }
        }
      }
      if(player_damage.length > 0 ){
        player_damage = array_sort_module(player_damage,'damage','');
        rtn += '<div class="damage-player-row">';
        for(let i = 0 ; i < player_damage.length ; i ++){
          rtn += '<div class="name">'+ player_damage[i].name +'</div><div class="job-icon icon-'+ player_damage[i].job +'"></div><div class="dps">'+ player_damage[i].dps +'</div><div class="dps-percent">'+ player_damage[i].percent +'</div>';
        }
        rtn += '</div>';
      }
    }
  }
  rtn += '</div>';
  return rtn;
}
function crystal_income_heal_tooptip(data){
  let all_kind = Object.keys(data);
  let time = 0;
  if(all_kind.indexOf('accept_income_heal_kind') === -1){
    return '';
  }
  if(all_kind.indexOf('battle_time') !== -1 ){
    time = data.battle_time;
  }
  else {
    return '';
  }
  let h_kind = data.accept_income_heal_kind;

  let rtn = '';//html format
  //top area
  rtn += '<div class="Crystal_damage_Tooltip"><div class="income-top"><div class="damage-total">A-HEAL : ';
  rtn += h_kind.indexOf('totalheal') !== -1 ? data.accept_income_totalheal : '0' ;
  rtn += h_kind.indexOf('over_totalheal') !== -1 ? ' (' + ((data.accept_income_over_totalheal / data.accept_income_totalheal) * 100).toFixed(1) + '%)' : ' (0%)' ;
  //
  rtn += '</div></div><div class="damage-total-other">';
  rtn += h_kind.indexOf('heal_total_normal') !== -1 ? '<div class="damage-total">N:' + damage_to_dps(data.accept_income_heal_total_normal,time).toFixed(0) +' (' + ((data.accept_income_over_heal_total_normal / data.accept_income_heal_total_normal) * 100).toFixed(0) + '%)' + '-' + ((data.accept_income_heal_total_normal/data.accept_income_totalheal) * 100).toFixed(0) + '%</div>': '' ;
  rtn += h_kind.indexOf('heal_total_HoT') !== -1 ? '<div class="damage-total">H:' + damage_to_dps(data.accept_income_heal_total_HoT,time).toFixed(0) +' (' + ((data.accept_income_over_heal_total_HoT / data.accept_income_heal_total_HoT) * 100).toFixed(0) + '%)' + '-' + ((data.accept_income_heal_total_HoT/data.accept_income_totalheal) * 100).toFixed(0) + '%</div>': '' ;
  rtn += h_kind.indexOf('heal_total_barrier') !== -1 ? '<div class="damage-total"><div class="icon-shield"></div>:' + damage_to_dps(data.accept_income_heal_total_barrier,time).toFixed(0) + '-' + ((data.accept_income_heal_total_barrier/data.accept_income_totalheal) * 100).toFixed(0) + '%</div>': '' ;
  rtn += '</div>';
  //me hps area
  if(h_kind.indexOf('heal_self') !== -1){
    if(data.accept_income_heal_self > 0){
      rtn += '<div class="tooltip_hr_line"></div>';
      rtn += '<div class="heal-me"><div><div class="icon-me_normal"></div>';
      rtn += damage_to_dps(data.accept_income_heal_self,time).toFixed(1);
      rtn += h_kind.indexOf('over_heal_self') !== -1 ? ' (' + ((data.accept_income_over_heal_self / data.accept_income_heal_self) * 100).toFixed(0) + '%)' : '(0%)' ;
      rtn += '-' + ((data.accept_income_heal_self / data.accept_income_totalheal) * 100).toFixed(0) + '%</div>';
      rtn += h_kind.indexOf('heal_self_HoT') !== -1 ? '<div class="damage-total">H:'+ damage_to_dps(data.accept_income_heal_self_HoT,time).toFixed(0) +' (' + ((data.accept_income_over_heal_self_HoT / data.accept_income_heal_self_HoT) * 100).toFixed(0) + '%)</div>': '' ;
      rtn += h_kind.indexOf('heal_self_barrier') !== -1 ? '<div class="damage-total"><div class="icon-shield"></div>:'+ damage_to_dps(data.accept_income_heal_self_barrier,time).toFixed(0) + '</div>': '' ;
      //Kaiki G-posion
      rtn += '</div><div class="heal-me-under">';
      rtn += h_kind.indexOf('heal_kaiki') !== -1 ? '<div><div class="icon-local_fire_department"></div>'+ data.accept_income_heal_kaiki_num + '-' + damage_to_dps(data.accept_income_heal_kaiki,time).toFixed(0) +' (' + ((data.accept_income_over_heal_kaiki / data.accept_income_heal_kaiki) * 100).toFixed(0) + '%)</div>': '' ;
      rtn += h_kind.indexOf('heal_G_posion') !== -1 ? '<div><div class="icon-Frasco"></div>'+ data.accept_income_heal_G_posion_num + '-' + damage_to_dps(data.accept_income_heal_G_posion,time).toFixed(0) +' (' + ((data.accept_income_over_heal_G_posion / data.accept_income_heal_G_posion) * 100).toFixed(0) + '%)</div>': '' ;
      rtn += '</div>';
    }
  }
  //party hps area
  if(h_kind.indexOf('heal_party') !== -1){
    if(data.accept_income_heal_party > 0){
      rtn += '<div class="tooltip_hr_line"></div>';
      rtn += '<div class="heal-me"><div><div class="icon-party_normal"></div>';
      rtn += damage_to_dps(data.accept_income_heal_party,time).toFixed(1);
      rtn += h_kind.indexOf('over_heal_party') !== -1 ? ' (' + ((data.accept_income_over_heal_party / data.accept_income_heal_party) * 100).toFixed(0) + '%)' : '(0%)' ;
      rtn += '-' + ((data.accept_income_heal_party / data.accept_income_totalheal) * 100).toFixed(0) + '%</div>';
      rtn += h_kind.indexOf('heal_party_HoT') !== -1 ? '<div class="damage-total">H:'+ damage_to_dps(data.accept_income_heal_party_HoT,time).toFixed(0) +' (' + ((data.accept_income_over_heal_party_HoT / data.accept_income_heal_party_HoT) * 100).toFixed(0) + '%)</div>': '' ;
      rtn += h_kind.indexOf('heal_party_barrier') !== -1 ? '<div class="damage-total"><div class="icon-shield"></div>:'+ damage_to_dps(data.accept_income_heal_party_barrier,time).toFixed(0) + '</div>': '' ;
      rtn += '</div>';

      let player_damage = [];
      for(let i = 0 ; i < h_kind.length ; i++){
        if(h_kind[i].substring(0,12) === 'heal_from_10'){
          let nameID = h_kind[i].substring(h_kind[i].length - 8 ,h_kind[i].length);
          let damage = data['accept_income_' + h_kind[i]];
          if(typeof NameID_Name_JobList[nameID] === 'object'){
            let name_job = NameID_Name_JobList[nameID]
            player_damage.push({nameID:nameID,name:name_job.name,job:name_job.job,damage:damage,dps:damage_to_dps(damage,time).toFixed(1),percent:((damage/data.accept_income_totalheal) * 100).toFixed(0) + '%'});
          }else {
            player_damage.push({nameID:nameID,name:nameID,job:'none',damage:damage,dps:damage_to_dps(damage,time).toFixed(1),percent:((damage/data.accept_income_totalheal) * 100).toFixed(0) + '%'});
          }
        }
      }
      if(player_damage.length > 0 ){
        player_damage = array_sort_module(player_damage,'damage','');
        rtn += '<div class="damage-player-row">';
        for(let i = 0 ; i < player_damage.length ; i ++){
          rtn += '<div class="name">'+ player_damage[i].name +'</div><div class="job-icon icon-'+ player_damage[i].job +'"></div><div class="dps">'+ player_damage[i].dps +'</div><div class="dps-percent">'+ player_damage[i].percent +'</div>';
        }
        rtn += '</div>';
      }
    }
  }
  //Ally hps area (party copy)
  if(h_kind.indexOf('heal_ally') !== -1){
    if(data.accept_income_heal_ally > 0){
      rtn += '<div class="tooltip_hr_line"></div>';
      rtn += '<div class="heal-me"><div><div class="icon-alliance_normal"></div>';
      rtn += damage_to_dps(data.accept_income_heal_ally,time).toFixed(1);
      rtn += h_kind.indexOf('over_heal_ally') !== -1 ? ' (' + ((data.accept_income_over_heal_ally / data.accept_income_heal_ally) * 100).toFixed(0) + '%)' : '(0%)' ;
      rtn += '-' + ((data.accept_income_heal_ally / data.accept_income_totalheal) * 100).toFixed(0) + '%</div>';
      rtn += h_kind.indexOf('heal_ally_HoT') !== -1 ? '<div class="damage-total">H:'+ damage_to_dps(data.accept_income_heal_ally_HoT,time).toFixed(0) +' (' + ((data.accept_income_over_heal_ally_HoT / data.accept_income_heal_ally_HoT) * 100).toFixed(0) + '%)</div>': '' ;
      rtn += h_kind.indexOf('heal_ally_barrier') !== -1 ? '<div class="damage-total"><div class="icon-shield"></div>:'+ damage_to_dps(data.accept_income_heal_ally_barrier,time).toFixed(0) + '</div>': '' ;
      rtn += '</div>';

      let player_damage = [];
      for(let i = 0 ; i < h_kind.length ; i++){
        if(h_kind[i].substring(0,12) === 'heal_from_10'){
          let nameID = h_kind[i].substring(h_kind[i].length - 8 ,h_kind[i].length);
          let damage = data['accept_income_' + h_kind[i]];
          if(typeof NameID_Name_JobList[nameID] === 'object'){
            let name_job = NameID_Name_JobList[nameID]
            player_damage.push({nameID:nameID,name:name_job.name,job:name_job.job,damage:damage,dps:damage_to_dps(damage,time).toFixed(1),percent:((damage/data.accept_income_totalheal) * 100).toFixed(0) + '%'});
          }else {
            player_damage.push({nameID:nameID,name:nameID,job:'none',damage:damage,dps:damage_to_dps(damage,time).toFixed(1),percent:((damage/data.accept_income_totalheal) * 100).toFixed(0) + '%'});
          }
        }
      }
      if(player_damage.length > 0 ){
        player_damage = array_sort_module(player_damage,'damage','');
        rtn += '<div class="damage-player-row">';
        for(let i = 0 ; i < player_damage.length ; i ++){
          rtn += '<div class="name">'+ player_damage[i].name +'</div><div class="job-icon icon-'+ player_damage[i].job +'"></div><div class="dps">'+ player_damage[i].dps +'</div><div class="dps-percent">'+ player_damage[i].percent +'</div>'
        }
        rtn += '</div>';
      }
    }
  }
  rtn += '</div>';
  return rtn;
}
