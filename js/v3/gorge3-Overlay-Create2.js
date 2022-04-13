//grobal
var CC_Simulation_kill = true;
var CC_Death_Too_Much = 5;
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
  already_calc.selfheal = damage_to_dps(data.selfheal,time).toFixed(0);
  already_calc.partyheal = damage_to_dps(data.partyheal,time).toFixed(0);
  already_calc.allyheal = damage_to_dps(data.allyheal,time).toFixed(0);
  already_calc.otherheal = damage_to_dps(data.otherheal,time).toFixed(0);
  already_calc.barrier = damage_to_dps(data.barrier,time).toFixed(0);
  already_calc.overhealPct = ((data.overheal / data.totalheal)*100).toFixed(2) + '%';
  //dps
  already_calc.totaldamage = damage_to_dps(data.totaldamage,time).toFixed(0);
  //
  let dps_area = row.find('.c-dps');
  let hps_area = row.find('.c-hps');
  hps_area.text(already_calc.totalheal);
  hps_area.prop('title',tooltip_dps_create(data.totalheal,data.overheal,already_calc.overhealPct,already_calc.selfheal,already_calc.partyheal,already_calc.allyheal,already_calc.otherheal,already_calc.barrier));
  //let dps_tooltip_string = tooltip_dps_create(already_calc.playerdamage,already_calc.persondamage,already_calc.torobotdamage,already_calc.playerotherdamage,already_calc.objectdamage,already_calc.matondamage,already_calc.towerdamage,already_calc.objectotherdamage,already_calc.totaldamage,battle_data.totaldamage,battle_data['total-accept-damage'],time);
  dps_area.prop(tooltip_dps_create('-','-','-','-','-','-','-','-',already_calc.totaldamage,data.totaldamage,data['total-accept-damage'],time));

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
  if(death_num >= CC_Death_Too_Much){
    row.addClass('death-too-much');
  }else if (me) {
    row.addClass('me');
  }
  //damage bar
  row.find('.c-damage-gage').addClass('role-background-' + job_to_role(data.job));
  row.find('.c-damage-gage').css('width', ((data.calcdps / maxdps) * 100) + '%');
  //
  row.find('.c-income-space').prop('title',tooltip_income(damage_to_dps(data.incomeselfheal,time).toFixed(0),damage_to_dps(data.incomepartyheal,time).toFixed(0),damage_to_dps(data.incomeallyheal,time).toFixed(0),damage_to_dps(data.incomeotherheal,time).toFixed(0),damage_to_dps(data.personincomedamage,time).toFixed(0),damage_to_dps(data.robincomedamage,time).toFixed(0),damage_to_dps(data.objectincomedamage,time).toFixed(0)));
  row.find('.c-incomedamage-number').text(damage_to_dps(data.totalincomedamage,time).toFixed(0));
  row.find('.c-incomeheal-number').text(damage_to_dps(data.totalincomeheal,time).toFixed(0));
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
