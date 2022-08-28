var ACT_NAME = 'YOU';
var FL_MAXROW = 15;
var RW_MAXROW = 15;
var PVE_MAXROW = 8;
var FL_EXTEND = { Aliance: false, Party: false, Me: true, near: true };
var RW_EXTEND = { Aliance: false, Party: false, Me: true, near: true };
var FL_ACT_Compatible_Mode = false;
var GORGE_ACT_Compatible_Mode = false;
var FL_PARTYPRIORITY = true;
var FL_AROUND_ONLY = true;
var FL_RESULT_SHOW = true;
var FL_PARTY_COLOR_BACKGROUND = true;
var RW_PARTYPRIORITY = true;
var RW_AROUND_ONLY = true;
var RW_RESULT_SHOW = true;
var RW_DUNAMIS_ICON = false;
var RW_MAX_DUNAMIS_ICON = true;
var RW_PARTY_COLOR_BACKGROUND = true;
var RW_DEATH_TOO_MUCH = 8;
var FL_DEATH_TOO_MUCH = 8;
var REPLACE_ACTNAME = true;
var G_SIMULATION_KILL = true;
var FL_SIMULATION_KILL = true;
const Robot_Accept_Shotest_Time = 100;
var RW_Person_Rainbow_DPS = 1000;
let ALLDISPLAY = false;
let Overlay_Select = {};
function gorge_start(e) {
  let sort_target = 'calcdps';
  let template = $('#rw-source');
  let container = $('#overlay').clone();
  container.html("");
  if (GORGE_ACT_Compatible_Mode) {

  } else {
    let create_time = 0;
    if (LOGLINE_ENCOUNTER.Result_in_time === 0) {
      create_time = Date.now();
    }
    else {
      create_time = Math.min(Date.now(), LOGLINE_ENCOUNTER.Result_in_time);
    }

    let start_time = LOGLINE_ENCOUNTER.Battle_Start_Time;
    if (start_time === 0) {
      start_time = Date.now() - 1000;
    }
    if (Dev_mode) {
      container.append(teamdata_main(Math.round((create_time - start_time) / 1000), 'null', maindata_export('ally', null, 'damage-player','damage-maton')));
    }

    //let battle_datas = maindata_export('ally',null,'persondamage','torobotdamage','matondamage');
    let battle_datas = [];
    if (ALLDISPLAY) {
      battle_datas = maindata_export('all-player', null, 'damage-player','damage-maton');
    }
    else if (RW_RESULT_SHOW && LOGLINE_ENCOUNTER.Result_Page) {
      battle_datas = maindata_export('ally', null, 'damage-player','damage-maton');
    }
    else if (RW_PARTYPRIORITY) {
      let party_member = maindata_export('party', null, 'damage-player','damage-maton');
      let other_member = maindata_export('ally-other', null, 'damage-player','damage-maton');
      if (RW_AROUND_ONLY) {
        party_member = battled_only(party_member);
        other_member = battled_only(other_member);
      }
      other_member = array_sort_module(other_member, sort_target, 'up');
      battle_datas = party_priority(party_member, other_member, RW_MAXROW);
    }
    else {
      battle_datas = maindata_export('ally', null, 'damage-player','damage-maton');
      if (RW_AROUND_ONLY) {
        battle_datas = battled_only(battle_datas);
      }
      battle_datas = party_priority([], battle_datas, RW_MAXROW);
    }
    ////////////////////////////////////////////////////////////
    battle_datas = array_sort_module(battle_datas, sort_target, 'up');
    let aliance_data = aliance_data_export();

    let select_lock = Object.keys(Overlay_Select);
    for (let i = 0; i < battle_datas.length; i++) {
      let locked = select_lock.indexOf(battle_datas[i].name);
      if (locked !== -1) {
        if (Overlay_Select[battle_datas[i].name].click) {
          if (Overlay_Select[battle_datas[i].name].extend) {
            container.append(gorge_create(template, create_time, start_time, battle_datas[i], false, true, aliance_data));
          }
          else {
            container.append(gorge_create(template, create_time, start_time, battle_datas[i], true, true, aliance_data));
          }
        }
        else {
          if (DEBUG_LOG) {
            console.error('Error : Overlay_Create Selected not delete');
          }
        }
      }
      else {//クリックしたプレイヤー以外
        if (RW_EXTEND === 'ally') {
          container.append(gorge_create(template, create_time, start_time, battle_datas[i], false, false, aliance_data));//disp noselect
        }
        else if (RW_EXTEND === 'near') {
          if (battle_datas[i].battle) {
            container.append(gorge_create(template, create_time, start_time, battle_datas[i], false, false, aliance_data));//disp noselect
          }
          else {
            container.append(gorge_create(template, create_time, start_time, battle_datas[i], true, false, aliance_data));//hide noselect
          }
        }
        else if (RW_EXTEND === 'party') {
          if (battle_datas[i].aliance == 1) {
            container.append(gorge_create(template, create_time, start_time, battle_datas[i], false, false, aliance_data));//disp noselect
          }
          else {
            container.append(gorge_create(template, create_time, start_time, battle_datas[i], true, false, aliance_data));//hide noselect
          }
        }
        else if (RW_EXTEND === 'me') {
          if (battle_datas[i].nameID === PRIMARY_PLAYER.nameID) {
            container.append(gorge_create(template, create_time, start_time, battle_datas[i], false, false, aliance_data));//disp noselect
          }
          else {
            container.append(gorge_create(template, create_time, start_time, battle_datas[i], true, false, aliance_data));//hide noselect
          }
        }
      }
    }
    $('#overlay').replaceWith(container);
  }
}
function sample_gorge_overlay(num) {
  let template = $('#rw-source');
  let container = $('#overlay').clone();
  container.html("");
  let alliance = aliance_data_export();
  let create_time = Date.now();
  let start_time = create_time - 600000;
  for (let i = 0; i < num; i++) {
    let battle_data = dammy_battle_data();
    if (i > 4) {
      container.append(gorge_create(template, create_time, start_time, battle_data, false, true, alliance));
    }
    container.append(gorge_create(template, create_time, start_time, battle_data, false, false, alliance));
  }
  $('#overlay').replaceWith(container);
}
function gorge_create(template, create_time, start_time, battle_data, hide, selected, aliance_data) {
  let row = template.clone();
  let time = battle_data.battle_time;
  let dps = battle_data.calcdps.toFixed(1);
  row.addClass('aliance-border-' + battle_data.aliance);
  row.find('.g-dps-i').text(dps.substring(0, dps.length - 2));
  if (dps.length < 6) {
    row.find('.g-dps-d').text('.' + dps.slice(-1));
  }
  else {
    row.find('.g-dps-d').text('');
  }
  if (selected) {
    row.find('.g-job-icon').addClass('underline-text');
  }
  //dps space
  let hps_space = row.find('.g-hps');

  //row.find(".g-hps").prop('title',tooltip_title_create([Lang_select.self +' -> ',battle_data.selfheal],[Lang_select.party + ' -> ',battle_data.partyheal],[Lang_select.ally + ' -> ',battle_data.allyheal],[Lang_select.other + ' -> ',battle_data.otherheal]));

  //row.find(".g-dps").prop('title',tooltip_title_create([Lang_select.Person +' -> ',battle_data.persondamage],[Lang_select.Robot + ' -> ',battle_data.torobotdamage],[Lang_select.Maton + ' -> ',battle_data.matondamage],[Lang_select.Tower + ' -> ',battle_data.towerdamage]));
  let already_calc = {};
  //hps
  already_calc.totalheal = damage_to_dps(battle_data.totalheal, time).toFixed(0);
  already_calc.selfheal = damage_to_dps(battle_data.heal_self, time).toFixed(0);
  already_calc.partyheal = damage_to_dps(battle_data.heal_party, time).toFixed(0);
  already_calc.allyheal = damage_to_dps(battle_data.heal_ally, time).toFixed(0);
  already_calc.otherheal = damage_to_dps(battle_data.heal_object, time).toFixed(0);
  already_calc.barrier = damage_to_dps(battle_data.heal_total_barrier, time).toFixed(0);
  already_calc.overhealPct = ((battle_data.over_totalheal / battle_data.totalheal) * 100).toFixed(2) + '%';
  //dps
  already_calc.totaldamage = damage_to_dps(battle_data.totaldamage, time).toFixed(0);
  already_calc.persondamage = damage_to_dps(battle_data.persondamage, time).toFixed(0);
  already_calc.torobotdamage = damage_to_dps(battle_data.torobotdamage, time).toFixed(0);
  already_calc.matondamage = damage_to_dps(battle_data.damage_maton, time).toFixed(0);
  already_calc.towerdamage = damage_to_dps(battle_data.damage_tower, time).toFixed(0);
  already_calc.playerotherdamage = damage_to_dps(battle_data.playerotherdamage, time).toFixed(0);
  already_calc.objectotherdamage = damage_to_dps(battle_data.objectotherdamage, time).toFixed(0);
  already_calc.playerdamage = damage_to_dps(battle_data.playerdamage, time).toFixed(0);
  already_calc.objectdamage = damage_to_dps(battle_data.objectdamage, time).toFixed(0);

  hps_space.text(already_calc.totalheal);
  hps_space.prop('title', tooltip_dps_create(battle_data.totalheal, battle_data.over_totalheal, already_calc.overhealPct, already_calc.selfheal, already_calc.partyheal, already_calc.allyheal, already_calc.otherheal, already_calc.barrier));
  let dps_tooltip_string = tooltip_dps_create(already_calc.playerdamage, already_calc.persondamage, already_calc.torobotdamage, already_calc.playerotherdamage, already_calc.objectdamage, already_calc.matondamage, already_calc.towerdamage, already_calc.objectotherdamage, already_calc.totaldamage, battle_data.totaldamage, 0/*battle_data['total-accept-damage']*/, time);
  row.find(".g-dps").prop('title', dps_tooltip_string);
  let jobicon_space = row.find('.g-job-icon');
  jobicon_space.addClass('icon-' + battle_data.job);
  let jobhistory = tooltip_job_history(battle_data.jobhistory);
  if (jobhistory.change) {
    jobicon_space.prop('title', jobhistory.html);
    jobicon_space.addClass('astarisk');
  }
  //top space
  let g_kill = row.find('.g-kill');
  let g_death = row.find('.g-death');
  let g_assist = row.find('.g-assist');
  let death_num = 0;
  if (G_SIMULATION_KILL) {
    g_kill = g_kill.text(battle_data.s_kill);
    g_kill = g_kill.prop('title', tooltip_kill_death_create(battle_data['s-kill-name'], 'simulate'));
    g_death = g_death.text(battle_data.s_death);
    death_num = battle_data.s_death;
    g_death = g_death.prop('title', tooltip_kill_death_create(battle_data['s-death-name'], 'simulate'));
  } else {
    g_kill = g_kill.text(battle_data.kill);
    g_kill = g_kill.prop('title', tooltip_kill_death_create(battle_data.kill_name, 'normal'));
    g_death = g_death.text(battle_data.death);
    death_num = battle_data.death;
    g_death = g_death.prop('title', tooltip_kill_death_create(battle_data.death_name, 'normal'));
  }
  g_assist = g_assist.text(battle_data.assist);
  g_assist = g_assist.prop('title', tooltip_assist_create(battle_data['s-assist']));

  let name_space = row.find('.g-name');

  name_space.prop('title', tooltip_title_create(['', battle_data.server]));
  //////
  if (death_num >= RW_DEATH_TOO_MUCH) {
    row.addClass('death-too-much');
    name_space.text(battle_data.name);
  }
  else if (battle_data.name === PRIMARY_PLAYER.name) {
    //myself
    row.addClass('me');
    if (REPLACE_ACTNAME) {
      name_space.text(PRIMARY_PLAYER.ACT_NAME);
    }
    else {
      name_space.text(battle_data.name);
    }
  } else {
    if (battle_data.aliance === 1 && RW_PARTY_COLOR_BACKGROUND) {
      row.addClass('party');
    }
    name_space.text(battle_data.name);
  }
  let dunamis_space = row.find('.g-dunamis');
  let dunamis_detail = tooltip_dunamis_history(aliance_data, Number(battle_data.aliance));
  if (dunamis_detail.now > 0 || dunamis_detail.now === TensyonMax) {
    dunamis_space.prop('title', dunamis_detail.html);
    dunamis_space.addClass('dunamis-space');
    if (RW_DUNAMIS_ICON) {
      dunamis_space.addClass(dunamis_detect(dunamis_detail.now));
    }
    else {
      if (dunamis_detail.now === TensyonMax) {
        if (RW_MAX_DUNAMIS_ICON) {
          dunamis_space.addClass(dunamis_detect(dunamis_detail.now));
        }
        else {
          dunamis_space.text(20);
          dunamis_space.css('font-size', '0.7rem');
        }
      } else {
        dunamis_space.text(dunamis_detail.now);
        dunamis_space.css('font-size', '0.7rem');
      }
    }
  }
  //damage gage
  let damage_gage = row.find(".g-damage-gage");
  damage_gage.html(bar_create([battle_data.persondamage, 'damage-person gage-size'], [battle_data.torobotdamage, 'damage-robot gage-size'], [battle_data.matondamage, 'damage-object gage-size'], [battle_data.towerdamage, 'damage-tower gage-size']));
  damage_gage.prop('title', dps_tooltip_string);
  row.find('.g-damage-div-area').prop('title', dps_tooltip_string);
  //middle space
  row.find('.g-person-number').text(already_calc.persondamage);
  row.find('.g-torobot-number').text(already_calc.torobotdamage);
  row.find('.g-maton-number').text(already_calc.matondamage);
  row.find('.g-tower-number').text(already_calc.towerdamage);
  //row.find('.g-income-space').prop('title', tooltip_income(damage_to_dps(battle_data.incomeselfheal, time).toFixed(0), damage_to_dps(battle_data.incomepartyheal, time).toFixed(0), damage_to_dps(battle_data.incomeallyheal, time).toFixed(0), damage_to_dps(battle_data.incomeotherheal, time).toFixed(0), damage_to_dps(battle_data.personincomedamage, time).toFixed(0), damage_to_dps(battle_data.robincomedamage, time).toFixed(0), damage_to_dps(battle_data.objectincomedamage, time).toFixed(0)));
  //row.find('.g-incomedamage-number').text(damage_to_dps(battle_data.totalincomedamage, time).toFixed(0));
  //row.find('.g-incomeheal-number').text(damage_to_dps(battle_data.totalincomeheal, time).toFixed(0));
  row.find('.g-incomedamage-number').text(damage_to_dps(battle_data.accept_income_totaldamage, time).toFixed(0));
  row.find(".g-incomedamage-number").prop('title', crystal_income_damage_tooptip(battle_data));
  row.find('.g-incomeheal-number').text(damage_to_dps(battle_data.accept_income_totalheal, time).toFixed(0));
  row.find(".g-incomeheal-number").prop('title', crystal_income_heal_tooptip(battle_data));
  //under space
  if (typeof battle_data.robot_data === 'undefined') {//ロボなし
    //Rainbow
    /*if (battle_data.calcdps >= RW_Person_Rainbow_DPS) {
      row.find(".g-dps-i").addClass('gaming');
      row.find(".g-dps-d").addClass('gaming');
    }*/
  } else {//ロボあり
    row.find('.robot-space-hide').removeClass('robot-space-hide');
    let robot_detail = robot_icon_timehistory_create(battle_data.robot_data, false, create_time, start_time);
    row.find('.g-robot-data').html(robot_detail.history);
    if (robot_detail.rob.jas > 0) {//jas ride
      let rocketpuntch_space = row.find('.g-rocketpunth');
      rocketpuntch_space.removeClass('g-puntch-hide');
      let rocketpuntch_data = tooltip_rocket_puntch(battle_data.missrocketpuntch, battle_data.hitrocketpuntch, battle_data.hitrocketpuntchavarage);
      rocketpuntch_space.text(rocketpuntch_data.text);
      rocketpuntch_space.attr('title', rocketpuntch_data.tooltip);
    }
    let ridetime_now = now_rob_ride_time(battle_data.robot_data, create_time);
    if (ridetime_now.ride) {
      row.find('.ridetime_ten').addClass('blinking');
    }
    row.find('.ridetime_min').text(ridetime_now.min);
    row.find('.ridetime_sec').text(ridetime_now.sec);
    row.find('.ridetime').attr('title', robot_detail.lastrobot);
  }
  if (hide) {
    row.find('.g-hide').css('display', 'none');
    row.children().attr('id', 'Overlay_' + battle_data.name + 'of');
  }
  else {
    row.children().attr('id', 'Overlay_' + battle_data.name + 'on');
  }
  return row;
}
function tooltip_income(...data) {
  let html_create = '';
  if (data.length === 4) {//incomeheal Only
    html_create += '<div class="tooltip-grid-income-heal">';
    html_create += '<span style="display: flex;"><span class="child icon-me incomeheal-self-color"></span></span><span class="incomeheal-self-color">' + data[0] + '</span>';
    html_create += '<span style="display: flex;"><span class="child icon-party_normal incomeheal-party-color"></span></span><span class="incomeheal-party-color">' + data[1] + '</span>';
    html_create += '<span style="display: flex;"><span class="child icon-alliance_normal incomeheal-ally-color"></span></span><span class="incomeheal-ally-color">' + data[2] + '</span>';
    html_create += '<span style="display: flex;"><span class="icon-tower_income child incomeheal-object-color"></span></span><span class="incomeheal-object-color">' + data[3] + '</span>';
    html_create += '</div>';
  } else if (data.length === 7) {//incomeheal with incomedamage
    html_create += '<div class="tooltip-grid-income-damage">';
    html_create += '<span style="display: flex;"><span class="icon-person_income child incomedamage-player-color"></span></span><span class="tooltip-grid-income-damage-number incomedamage-player-color">' + data[4] + '</span>';
    html_create += '<span style="display: flex;"><span class="icon-robot_income child incomedamage-robot-color"></span></span><span class="tooltip-grid-income-damage-number incomedamage-robot-color">' + data[5] + '</span>';
    html_create += '<span style="display: flex;"><span class="icon-maton_income child incomedamage-object-color"></span></span><span class="tooltip-grid-income-damage-number incomedamage-object-color">' + data[6] + '</span>';
    html_create += '</div><div class="tooltip-line"></div>';
    html_create += '<div class="tooltip-grid-income-heal">';
    html_create += '<span style="display: flex;"><span class="child icon-me incomeheal-self-color"></span></span><span class="incomeheal-self-color">' + data[0] + '</span>';
    html_create += '<span style="display: flex;"><span class="child icon-party incomeheal-party-color"></span></span><span class="incomeheal-party-color">' + data[1] + '</span>';
    html_create += '<span style="display: flex;"><span class="child icon-alliance incomeheal-ally-color"></span></span><span class="incomeheal-ally-color">' + data[2] + '</span>';
    html_create += '<span style="display: flex;"><span class="icon-tower_income child incomeheal-object-color"></span></span><span class="incomeheal-object-color">' + data[3] + '</span>';
    html_create += '</div>';
  }
  return html_create;
}
function tooltip_dunamis_history(aliancedata, aliance) {
  if (aliance < 7 && aliance > 0) {
    let data = aliancedata[aliance];
    if (data.dunamis === 0) {
      return { now: 0, html: '' };
    }
    else {
      let html_create = '<div class="tooltip-grid-jobhistory">';
      for (let i = 0; i < data.history.length; i++) {
        html_create += '<span>' + data.history[i].from + '</span><span class="icon-NaviArrowRight"></span><span>' + data.history[i].to + '</span><span>' + time_change_format(data.history[i].time) + '</span>';
      }
      html_create += '</div>';
      if (data.dunamis === 20) {
        return { html: html_create, now: TensyonMax };
      } else {
        return { html: html_create, now: data.dunamis };
      }
      //06C2 --20
    }
  } else {
    return { now: 0, html: '' };
  }
}
function tooltip_job_history(jobdata) {
  if (typeof jobdata === 'undefined') {
    return { html: '', change: false };
  }
  else {
    let html_create = '<div class="tooltip-grid-jobhistory">';
    for (let i = 0; i < jobdata.length; i++) {
      html_create += '<span class="jobicon icon-' + jobdata[i].job + '"></span><span class="jobicon icon-NaviArrowRight"></span><span class="jobicon icon-' + jobdata[i].to + '"></span><span>' + time_change_format(jobdata[i].time) + '</span>';
    }
    html_create += '</div>';
    return { html: html_create, change: true };
  }
}
function tooltip_robot_history_detail(type, data, time) {
  let incomedamage = 0;
  if (typeof data.accept_income_totaldamage !== 'number') {
    incomedamage = 0;
  } else {
    if (type === 'che') {
      incomedamage = Chaiser_HP - data.accept_income_totaldamage;
    } else if (type === 'opp') {
      incomedamage = Oppresor_HP - data.accept_income_totaldamage;
    } else if (type === 'jas') {
      incomedamage = Justice_HP - data.accept_income_totaldamage;
    } else {
      incomedamage = 0;
    }
  }
  let incomedamage_color = '';
  if (incomedamage > 0) {
    incomedamage = '+' + incomedamage;
    incomedamage_color = 'remain-hp';
  }
  else {
    incomedamage_color = 'over-hp';
  }
  let kda = { kill: 0, death: 0, assist: 0 };
  if (G_SIMULATION_KILL) {
    kda.kill = typeof data.s_kill === 'number' ? kda.kill = data.s_kill : 0;
    kda.death = typeof data.s_death === 'number' ? kda.death = data.s_death : 0;
    kda.assist = typeof data.assist === 'number' ? kda.assist = data.assist : 0;
  } else {
    kda.kill = typeof data.kill === 'number' ? kda.kill = data.kill : 0;
    kda.death = typeof data.death === 'number' ? kda.death = data.death : 0;
    kda.assist = typeof data.assist === 'number' ? kda.assist = data.assist : 0;
  }
  let html_create = '<div class="tooltip-robot-dps"><div class="g-robot-top-dps">';
  html_create += damage_to_dps(data.totaldamage, time).toFixed(0) + '</div><div class="g-icon icon-';
  html_create += type + '"></div><div class="g-robot-main"><div class="g-robot-top">';
  html_create += '<div class="g-robot-div"><span class="icon-person"></span><span class="">' + damage_to_dps(data.persondamage, time).toFixed(0) + '</span></div>';
  html_create += '<div class="g-robot-div"><span class="icon-hammer"></span><span class="">' + damage_to_dps(data.torobotdamage, time).toFixed(0) + '</span></div>';
  html_create += '<div class="g-robot-div"><span class="icon-maton"></span><span class="">' + damage_to_dps(data.damage_maton, time).toFixed(0) + '</span></div>';
  html_create += '<div class="g-robot-div"><span class="icon-tower2"></span><span class="">' + damage_to_dps(data.damage_tower, time).toFixed(0) + '</span></div>';
  html_create += '</div><div class="g-middle"></div><div class="g-robot-under"><div class="g-robot-ridetime"><span class="icon-ScheduleTime"></span><span>' + time_change_format(time) + '</span></div>';
  html_create += '<div class="g-robot-incomedamage ' + incomedamage_color + '">' + incomedamage + '</div><div class="g-robot-k-d-a">' + 'K:' + kda.kill + ' D:' + kda.death + ' A:' + kda.assist + '</div></div></div></div>';
  return html_create;
}
function tooltip_rocket_puntch(miss, hit, hit_total) {
  let text = '';
  let tooltip = '';
  let cordinate = {};
  if (typeof miss !== 'number') {
    miss = 0;
  }
  let sum = {};
  if (typeof hit !== 'number') {
    hit = 0;
    hit_total = 0;
    //0除算
    sum = { total_cast: miss + hit, total_hit: miss + hit_total };
    if (miss === 0) {
      cordinate = { hit_Pct_text: '0%', hit_Pct: '0.00%', totalhit_Pct: '0.00%', missPct: '0.00%' };
    } else {
      cordinate = { hit_Pct_text: '0%', hit_Pct: '0.00%', totalhit_Pct: '0.00%', missPct: '100%' };
    }
  } else {
    sum = { total_cast: miss + hit, total_hit: miss + hit_total };
    cordinate = { hit_Pct_text: (100 - ((miss / sum.total_cast) * 100)).toFixed(0) + '%', hit_Pct: (100 - ((miss / sum.total_cast) * 100)).toFixed(2) + '%', totalhit_Pct: (100 - ((miss / sum.total_hit) * 100)).toFixed(2) + '%', missPct: (((miss / sum.total_cast) * 100)).toFixed(2) + '%' };
  }
  text = sum.total_cast + '/' + cordinate.hit_Pct_text;
  tooltip = '<div class="tooltip-grid-puntch">';
  tooltip += '<span>Total-Miss</span><span>' + miss + '</span><span> ' + cordinate.missPct + '</span>';
  tooltip += '<span>Total-Cast</span><span>' + hit + '</span><span>' + cordinate.hit_Pct + '</span>';
  tooltip += '<span>Total-Hit</span><span>' + hit_total + '</span><span>' + cordinate.totalhit_Pct + '</span>';
  tooltip += '</div>';
  return { text: text, tooltip: tooltip };
}
function tooltip_dps_create(...data) {
  //format
  //_| Taizin Total | Person | Robot | Other
  //_| Taibubtu Total | Maton | Tower | Other
  /*<div class="tooltip-grid-total-dps">
    <span>Total-DPS</span>2153.4<span>1581.5</span><span>1584131</span><span>A-1574141</span><span>841</span>
  </div>
  <div class='tooltip-grid-dps'>
    <span class="tooltip-grid-dps-text">Player</span><span>1501.4</span><span class="icon-person"></span><span>1501.4</span><span class="icon-person"></span><span>1501.4</span><span class="icon-person"></span><span>1501.4</span>
    <span class="tooltip-grid-dps-text">Object</span><span>1501.4</span><span class="icon-person"></span><span>1501.4</span><span class="icon-person"></span><span>1501.4</span><span class="icon-person"></span><span>1501.4</span>
  </div>*/
  let html_create = '';
  if (data.length === 8) {
    if (typeof data[0] === 'undefined') {
      return 'NO DATA';
    }
    html_create += '<div class="tooltip-grid-total-dps">';
    html_create += '<span>Total-Heal</span><span>' + data[0] + '</span><span>O-' + data[1] + '</span><span>' + data[2] + '</span>';
    html_create += "</div><div class='tooltip-line'></div><div class='tooltip-grid-hps'>";
    html_create += '<span class="icon-shield"></span><span class="">' + data[7] + '</span><span class="heal-self-color icon-me_normal"></span><span class="heal-self-color">' + data[3] + '</span><span class="heal-party-color icon-party_normal"></span><span class="heal-party-color">' + data[4] + '</span><span class="heal-ally-color icon-alliance_normal"></span><span class="heal-ally-color">' + data[5] + '</span><span class="icon-maton heal-object-color"></span><span class="heal-object-color">' + data[6] + '</span>';
    html_create += '</div>';
    return html_create;
  } else if (data.length === 12) {
    html_create += '<div class="tooltip-grid-total-dps">';
    html_create += '<span>Total-DPS</span><span>' + data[8] + '</span><span>' + data[9] + '</span><span>A-' + data[10] + '</span><span><span class="icon-ScheduleTime"></span><span>' + data[11] + '</span></span>';
    html_create += "</div><div class='tooltip-line'></div><div class='tooltip-grid-dps'>";
    html_create += '</span><span class="damage-person-color icon-person"></span><span class="damage-person-color">' + data[1] + '</span><span class="icon-hammer damage-robot-color"></span><span class="damage-robot-color">' + data[2] + '</span>';
    html_create += '</span><span class="icon-maton damage-object-color"></span><span class="damage-object-color">' + data[5] + '</span><span class="icon-tower2 damage-tower-color"></span><span class="damage-tower-color">' + data[6] + '</span>';
    html_create += '</div>';
    return html_create;
  }
  else {
    return '';
  }
}
function tooltip_kill_death_create(data, type) {
  //type :normal | simulate
  if (typeof data === 'object') {
    let html_create = '<div class="tooltip-grid-jobicon-name-time">';
    for (let i = 0; i < data.length; i++) {
      let icon = '';
      if (type === 'simulate') {
        icon = 'icon-' + data[i].job;
        let name = data[i].name;
        if (name === '' || typeof name === 'undefined') {
          name = 'Unknown';
        }
        html_create += '<span class= "' + icon + '"></span><span>' + name + '</span><span>' + time_change_format(data[i].time) + '</span>';
      }
      else if (type === 'normal') {
        let name = data[i].name;
        if (name === '' || typeof name === 'undefined') {
          name = 'Unknown';
        }
        html_create += '<span></span><span>' + name + '</span><span>' + time_change_format(data[i].time) + '</span>';
      }
    }
    html_create += '</div>';
    return html_create;
  }
  else {
    return '';
  }
}
function tooltip_assist_create(data) {
  if (typeof data === 'object') {
    //<span class='icon-pld'></span><span>Killer</span><span class='icon-NaviArrowRight'></span><span class='icon-ast'></span><span>Victim</span><span>0:05</span>
    let html_create = '<div class="tooltip-grid-assist">';
    for (let i = 0; i < data.length; i++) {
      let icon = 'icon-' + data[i].job;
      let killer_icon = 'icon-' + data[i].killerjob;
      let killer_alliance = '';
      if (data[i].killer_alliance > 0 && data[i].killer_alliance < 7) {
        killer_alliance = 'var(--aliance-color-' + data[i].killer_alliance + ')';
      } else {
        killer_alliance = 'var(--default-color)';
      }

      html_create += '<span class= "' + killer_icon + '" style="color:' + killer_alliance + ';"></span><span style="color:' + killer_alliance + ';">' + data[i].killer + '</span><span class="icon-NaviArrowRight"  style="color:' + killer_alliance + ';"></span>' + '<span class= "' + icon + '"></span><span>' + data[i].name + '</span><span>' + time_change_format(data[i].time) + '</span>';
    }
    html_create += '</div>';
    return html_create;
  } else {
    return '';
  }
}
function time_change_format(number) {
  if (typeof number === 'number') {
    let min = Math.floor(number / 60);
    let sec = number % 60;
    if (min <= 9) {
      min = '0' + min;
    }
    if (sec <= 9) {
      sec = '0' + sec;
    }
    return min + ':' + sec;
  }
  else {
    return 'XX:XX';
  }
}
function now_rob_ride_time(data, now_time) {
  let target_data = {};
  for (let i = data.length - 1; i >= 0; i--) {
    if (Robot_name.indexOf(data[i].ride_type) !== -1) {
      let ridetime = 0;
      let ride = false;
      if (data[i].time !== 0) {
        ridetime = Math.round(data[i].time / 1000);
      } else {
        ridetime = Math.round((now_time - data[i].ridetime) / 1000);
        ride = true;
      }
      let time = time_change_format(ridetime);
      return { min: time.substring(0, 2), sec: time.substring(3, 5), ride: ride };
    }
  }
  return { min: '-', sec: '-', ride: false };
}
function robot_icon_timehistory_create(data, simple, nowtime, battle_start_time) {
  let return_data = '';
  let robot = { jas: 0, opp: 0, che: 0 };
  let total_battle_time = nowtime - battle_start_time;
  let tooltip_data = '';
  for (let i = 0; i < data.length; i++) {
    if (simple) {
      if (Robot_name.indexOf(data[i].ride_type) !== -1) {//robot data
        robot[data[i].ride_type]++;
        return_data += "<span class='icon-" + data[i].ride_type + "'></span>";
      }
    } else {//extend mode のとき
      if (return_data === '') {//1回目
        return_data += "<div class='robot-history-box' style=' width:" + (data[i].ridetime - battle_start_time) / total_battle_time * 100 + "%'><span class='' > </span></div>";
      }
      let icon_type = '';
      if (Robot_name.indexOf(data[i].ride_type) !== -1) {//robot data
        robot[data[i].ride_type]++;
        icon_type = 'icon-' + data[i].ride_type;
        if (data[i].time !== 0) {
          let r_time = data[i].time;
          if (data[i].time > Robot_Accept_Shotest_Time) {
            tooltip_data = tooltip_robot_history_detail(data[i].ride_type, data[i].data, Math.round(r_time / 1000));
            return_data += "<div class='robot-history-box' title='" + tooltip_data + "' style=' width:" + r_time / total_battle_time * 100 + "%'><span class='" + "g-textline " + icon_type + " " + objectdamage_color_add(data[i].ride_type, data[i].data.damage_tower) + "'></span></div>";
          } else {//短すぎるデータ
            let r_time = data[i].time;
            return_data += "<div class='robot-history-box' style=' width:" + r_time / total_battle_time * 100 + "%'><span class='' ></span></div>";
          }
        } else {//last data
          let r_time = nowtime > data[i].time ? nowtime - data[i].ridetime : 0;
          tooltip_data = tooltip_robot_history_detail(data[i].ride_type, data[i].data, Math.round(r_time / 1000));
          return_data += "<div class='robot-history-box' title='" + tooltip_data + "' style=' width:" + r_time / total_battle_time * 100 + "%'><span class='" + "g-textline " + icon_type + " " + objectdamage_color_add(data[i].ride_type, data[i].data.damage_tower) + "' ></span></div>";
        }
      }
      else {// no robot
        if (data[i].time !== 0) {
          let r_time = data[i].time;
          return_data += "<div class='robot-history-box' style=' width:" + r_time / total_battle_time * 100 + "%'><span class='' ></span></div>";
        } else {//last data
          let r_time = nowtime > data[i].time ? nowtime - data[i].ridetime : 0;
          return_data += "<div class='robot-history-box' style=' width:" + r_time / total_battle_time * 100 + "%'><span class='' ></span></div>";
        }
      }
    }
  }
  return { history: return_data, rob: robot, lastrobot: tooltip_data };
}
function objectdamage_color_add(type, damage) {
  if (type === "opp" || type === 'jas') {
    if (damage >= 5000000) {
      return 'gaming2 gaming2-robot';
    } else if (damage >= 350000) {
      return 'purple purple-robot';
    } else if (damage >= 2000000) {
      return 'blue blue-robot';
    } else if (damage >= 1000000) {
      return 'green green-robot';
    }
    else {
      return '';
    }
  }
  else {
    return '';
  }
}
function fl_start(e) {
  let sort_target = 'calcdps';
  //let encounter = e.Encounter;
  //let combatants = e.Combatant;
  let fl_template = $('#fl-source');
  let container = $('#overlay').clone();
  container.html('');
  //var names = Object.keys(combatants);
  if (FL_ACT_Compatible_Mode || false) {
    //yet
  }
  else {
    let battle_datas = [];
    if (FL_RESULT_SHOW && LOGLINE_ENCOUNTER.Result_Page) {
      battle_datas = maindata_export('ally', null, 'totaldamage');
    }
    else if (FL_PARTYPRIORITY) {
      let party_member = maindata_export('party', null, 'totaldamage');
      let other_member = maindata_export('ally-other', null, 'totaldamage');
      if (FL_AROUND_ONLY) {
        party_member = battled_only(party_member);
        other_member = battled_only(other_member);
      }
      other_member = array_sort_module(other_member, sort_target, 'up');
      battle_datas = party_priority(party_member, other_member, FL_MAXROW);
    }
    else {
      battle_datas = maindata_export('ally', null, 'totaldamage');
      if (FL_AROUND_ONLY) {
        battle_datas = battled_only(battle_datas);
      }
      battle_datas = party_priority([], battle_datas, FL_MAXROW);
    }
    battle_datas = array_sort_module(battle_datas, sort_target, 'up');
    //////////////////////////////

    let max_data = damage_to_dps(battle_datas[0].totaldamage, battle_datas[0].battle_time);
    max_data = (typeof max_data === 'number') ? max_data : 0;
    let select_lock = Object.keys(Overlay_Select);
    for (let i = 0; i < battle_datas.length; i++) {
      let locked = select_lock.indexOf(battle_datas[i].name);
      if (locked !== -1) {
        if (Overlay_Select[battle_datas[i].name].click) {
          if (Overlay_Select[battle_datas[i].name].extend) {
            container.append(fl_create(fl_template, battle_datas[i], false, true));
          }
          else {
            container.append(fl_create(fl_template, battle_datas[i], true, true));
          }
        }
        else {
          if (DEBUG_LOG) {
            console.error('Error : Overlay_Create Selected not delete');
          }
        }
      }
      else {//クリックしたプレイヤー以外
        if (FL_EXTEND === 'ally') {
          container.append(fl_create(fl_template, battle_datas[i], false, false));//disp noselect
        }
        else if (FL_EXTEND === 'near') {
          if (battle_datas[i].battle) {
            container.append(fl_create(fl_template, battle_datas[i], false, false));//disp noselect
          }
          else {
            container.append(fl_create(fl_template, battle_datas[i], true, false));//hide noselect
          }
        }
        else if (FL_EXTEND === 'party') {
          if (battle_datas[i].aliance == 1) {
            container.append(fl_create(fl_template, battle_datas[i], false, false));//disp noselect
          }
          else {
            container.append(fl_create(fl_template, battle_datas[i], true, false));//hide noselect
          }
        }
        else if (FL_EXTEND === 'me') {
          if (battle_datas[i].nameID === PRIMARY_PLAYER.nameID) {
            container.append(fl_create(fl_template, battle_datas[i], false, false));//disp noselect
          }
          else {
            container.append(fl_create(fl_template, battle_datas[i], true, false));//hide noselect
          }
        }
      }
    }
  }
  $('#overlay').replaceWith(container);
}
function array_sort_module(array, key, direction) {
  if (direction === 'down') {
    array.sort((a, b) => a[key] - b[key]);
  } else {
    array.sort((a, b) => b[key] - a[key]);
  }
  return array;
}
function battled_only(array) {
  let return_data = [];
  for (let i = 0; i < array.length; i++) {
    if (array[i].battle) {
      return_data.push(array[i]);
    }
  }
  return return_data;
}
function party_priority(party_array, other_array, maxsize) {
  let party_l = party_array.length;
  let other_l = other_array.length;
  let maxrow = Math.max(party_l, maxsize);
  let cutsize = maxrow - party_l;
  if (cutsize > 0) {
    const cutted_array = other_array.slice(0, cutsize);
    return party_array.concat(cutted_array);
  }
  else {
    return party_array;
  }
}
function fl_create(template, battle_data, hide, selected) {
  let row = template.clone();
  let time = battle_data.battle_time;
  row.addClass('aliance-border-' + battle_data.aliance);
  let dps = battle_data.calcdps.toFixed(1);
  row.find('.f-dps-i').text(dps.substring(0, dps.length - 2));
  if (dps.length < 6) {
    row.find('.f-dps-d').text('.' + dps.slice(-1));
  }
  else {
    row.find('.f-dps-d').text('');
  }
  if (selected) {
    row.find('.f-job-icon').addClass('underline-text');
  }
  row.find('.f-hps').text(damage_to_dps(battle_data.totalheal, time).toFixed(0));
  row.find(".f-hps").prop('title', crystal_heal_tooptip(battle_data));
  row.find(".f-dps").prop('title', crystal_dps_tooptip(battle_data));
  let jobicon_space = row.find('.f-job-icon');
  jobicon_space.addClass('icon-' + battle_data.job);
  let jobhistory = tooltip_job_history(battle_data.jobhistory);
  if (jobhistory.change) {
    jobicon_space.prop('title', jobhistory.html);
    jobicon_space.addClass('astarisk');
  }
  row.find('.f-kill').text(battle_data.kill);
  row.find('.f-death').text(battle_data.death);
  row.find('.f-assist').text(battle_data.assist);

  let f_kill = row.find('.f-kill');
  let f_death = row.find('.f-death');
  let f_assist = row.find('.f-assist');
  let death_num = 0;
  if (FL_SIMULATION_KILL) {
    f_kill = f_kill.text(battle_data.s_kill);
    f_kill = f_kill.prop('title', tooltip_kill_death_create(battle_data['s-kill-name'], 'simulate'));
    f_death = f_death.text(battle_data.s_death);
    death_num = battle_data.s_death;
    f_death = f_death.prop('title', tooltip_kill_death_create(battle_data['s-death-name'], 'simulate'));
  } else {
    f_kill = f_kill.text(battle_data.kill);
    f_kill = f_kill.prop('title', tooltip_kill_death_create(battle_data.kill_name, 'normal'));
    f_death = f_death.text(battle_data.death);
    death_num = battle_data.death;
    f_death = f_death.prop('title', tooltip_kill_death_create(battle_data.death_name, 'normal'));
  }
  f_assist = f_assist.text(battle_data.assist);
  f_assist = f_assist.prop('title', tooltip_assist_create(battle_data['s-assist']));

  let name_space = row.find('.f-name');
  name_space.text(battle_data.name);
  name_space.prop('title', tooltip_title_create(['', battle_data.server]));
  row.find('.f-dunamis').addClass(dunamis_detect(battle_data.dunamis));
  if (battle_data.dunamis !== undefined && battle_data.dunamis !== null) {
    row.find('.f-dunamis').addClass('dunamis-space');
  }
  row.find('.f-incomedamage').text(damage_to_dps(battle_data.accept_income_totaldamage, time).toFixed(0));
  row.find(".f-incomedamage").prop('title', crystal_income_damage_tooptip(battle_data));
  row.find('.f-incomeheal').text(damage_to_dps(battle_data.accept_income_totalheal, time).toFixed(0));
  row.find(".f-incomeheal").prop('title', crystal_income_heal_tooptip(battle_data));
  /*if(AREA.Area_Type === 3){
    row.find(".f-incomedamage-gage").html(bar_create([battle_data.personincomedamage,'incomedamage-player'],[battle_data.robincomedamage,'incomedamage-robot'],[battle_data.objectincomedamage,'incomedamage-object'],[battle_data.otherpersonincomedamage,'incomedamage-other']));
  }*/
  //row.find(".f-incomeheal-gage").html(bar_create([battle_data.incomeotherheal,'incomeheal-object'],[battle_data.incomeallyheal,'incomeheal-ally'],[battle_data.incomepartyheal,'incomeheal-party'],[battle_data.incomeselfheal,'incomeheal-self']));
  if (hide) {
    row.find('.f-hide').css('display', 'none');
    row.children().attr('id', 'Overlay_' + battle_data.name + 'of');
  }
  else {
    row.children().attr('id', 'Overlay_' + battle_data.name + 'on');
  }
  if (death_num >= FL_DEATH_TOO_MUCH) {
    row.addClass('death-too-much');
  }
  else if (battle_data.name === PRIMARY_PLAYER.name) {
    //myself
    row.addClass('me');
    if (REPLACE_ACTNAME) {
      name_space.text(PRIMARY_PLAYER.ACT_NAME);
    }
  }
  else if (battle_data.aliance === 1 && FL_PARTY_COLOR_BACKGROUND) {
    row.addClass('party');
  }

  return row;

}
function simple_create(template, battle_data, max_data) {
  let row = template.clone();
  let time = battle_data.enctime;
  /*
  if(typeof battle_data.aliance === 'number'){
    //aliance include
  }*/
  row.find('.basic-dps').text(alignment_of_digits(battle_data.dpsarea));
  if (battle_data.overhealPct !== null) {
    row.find('.basic-dps').prop('title', tooltip_title_create([Lang_select.healed + ' -> ', alignment_of_digits(battle_data.hpsarea)], [Lang_select.overhealPct + ' -> ', battle_data.overhealPct]));
  }

  if (typeof battle_data.data_area1 === 'number') {
    if (battle_data.dunamis !== undefined && battle_data.dunamis !== null) {
      row.find('.basic-dunamis').addClass(dunamis_detect(battle_data.dunamis));
      row.find('.basic-dunamis').addClass('dunamis-space');
      row.find('.basic-name').css('min-width', 'calc(100% - 5.2rem)');
      row.find('.basic-name').css('max-width', 'calc(100% - 5.2rem)');
    }
    row.find('.basic-dataspace').css('min-width', '1.4rem');
    row.find('.basic-dataspace').css('max-width', '1.4rem');
    row.find('.basic-name').css('min-width', 'calc(100% - 6.2rem)');
    row.find('.basic-name').css('max-width', 'calc(100% - 6.2rem)');
  }
  row.find('.basic-name').text(battle_data.name);
  row.find('.basic-space1').text(battle_data.data_area1);
  row.find('.basic-space2').text(battle_data.data_area2);
  row.find('.basic-space3').text(battle_data.data_area3);
  row.find('.basic-bar').addClass('role-background-' + battle_data.role);
  row.find('.basic-bar').css('width', ((battle_data.dpsarea / max_data) * 100) + '%');
  if (battle_data.name === PRIMARY_PLAYER.name) {
    //myself
    row.addClass('me');
    if (REPLACE_ACTNAME) {
      row.find('.basic-name').text(PRIMARY_PLAYER.ACT_NAME);
    }
  }
  else if (battle_data.name === PRIMARY_PLAYER.ACT_NAME) {
    row.addClass('me');
  }
  if (battle_data.job === '') {
    if (battle_data.name.indexOf('(') !== -1) {
      if (battle_data.name.indexOf(')') !== -1) {
        row.find('.basic-job').addClass('icon-app_world_wanderer');
        row.find('.basic-space1').text('');
        row.find('.basic-space2').text('');
        row.find('.basic-space3').text('');
      }
    }
  }
  else {
    if (battle_data.job === 'limit break') {
      row.find('.basic-job').addClass('icon-app_fc');
      row.find('.basic-space1').text('');
      row.find('.basic-space2').text('');
      row.find('.basic-space3').text('');
    } else {
      row.find('.basic-job').addClass('icon-' + battle_data.job);
    }
  }

  return row;
}
function data_simple_exchange(type, data, enc_time) {
  let changed_data = null;
  if (type === 'encounter-pve') {
    changed_data = {
      aliance: null,
      dpsarea: isNaN(Number(data.encdps)) === isNaN ? 0 : Number(data.encdps),
      enctime: enc_time,
      hpsarea: isNaN(Number(data.enchps)) ? 0 : Number(data.enchps),
      dunamis: '',
      overhealPct: data.OverHealPct,
      name: data.name,
      job: data.Job.toLowerCase(),
      role: job_to_role(data.Job.toLowerCase()),
      data_area1: data['crithit%'],
      data_area2: data.DirectHitPct,
      data_area3: data.CritDirectHitPct
    };
  } else if (type === 'encounter-pvp') {
    changed_data = {
      aliance: null,
      dpsarea: Number(data.encdps),
      enctime: enc_time,
      hpsarea: Number(data.enchps),
      dunamis: '',
      overhealPct: data.OverHealPct,
      name: data.name,
      job: data.Job.toLowerCase(),
      role: job_to_role(data.Job.toLowerCase()),
      data_area1: '',
      data_area2: data.kills,
      data_area3: data.deaths
    };
  }
  else if (type === 'original-fl') {
    changed_data = {
      aliance: data.aliance,
      dpsarea: damage_to_dps(data.totaldamage, enc_time),
      enctime: data.battle_time,
      hpsarea: damage_to_dps(data.totalheal, enc_time),
      overhealPct: Math.round((data.overheal / data.totalheal) * 100) + '%',
      name: data.name,
      job: data.job,
      role: job_to_role(data.job),
      dunamis: data.dunamis,
      data_area1: (typeof data.kill === 'number') ? data.kill : 0,
      data_area2: (typeof data.death === 'number') ? data.death : 0,
      data_area3: (typeof data.assist === 'number') ? data.assist : 0
    };
  }
  return changed_data;
}
function pve_start(e) {
  let encounter = e.Encounter;
  let combatants = e.Combatant;
  let basic_template = $('#basic-source');
  let container = $('#overlay').clone();
  container.html('');
  var names = Object.keys(combatants);
  let max_data = 0;
  let hps_table = [];
  for (let i = 0; i < names.length && i < PVE_MAXROW; i++) {
    let changed_data = data_simple_exchange('encounter-pve', combatants[names[i]], Number(encounter.DURATION));
    if (i === 0) {
      max_data = changed_data.dpsarea;
    }
    if (PVE_HPS_TABLE.indexOf(changed_data.role) !== -1 && changed_data.hpsarea !== 0) {
      hps_table.push({ hps: changed_data.hpsarea, overhealpct: changed_data.overhealPct, name: changed_data.name, job: changed_data.job, role: changed_data.role, dps: changed_data.dpsarea });
    }
    container.append(simple_create(basic_template, changed_data, max_data));
  }
  if (hps_table.length > 0) {
    container.append('<div><hr class="basic-hps-line" noshade></hr></div>');
    hps_table = array_sort_module(hps_table, 'hps', 'up');
    let max_hps = 0;
    for (let i = 0; i < hps_table.length; i++) {
      if (i === 0) {
        max_hps = hps_table[i].hps;
      }
      let t = hps_table[i];
      container.append(simple_create(basic_template, { dpsarea: t.hps, hpsarea: t.dps, overhealPct: null, name: t.name, job: t.job, role: t.role, dunamis: null, data_area1: '', data_area2: '', data_area3: t.overhealpct }, max_hps));
    }
  }
  $('#overlay').replaceWith(container);
}
function bar_create(...data) {
  //data [125123,incomedamage-robot]
  let sum = 0;
  let new_data = [];
  for (let i = 0; i < data.length; i++) {
    if (typeof data[i][0] === 'number' && data[i][0] > 0) {
      new_data.push(data[i]);
      sum += data[i][0];
    }
  }
  let return_data = '';
  for (let i = 0; i < new_data.length; i++) {
    let percent = new_data[i][0] / sum * 100;
    return_data += '<div class="' + new_data[i][1] + '" style="width: ' + percent + '%;"></div>';
  }
  return return_data;
}
function tooltip_title_create(...data) {
  let string = '';
  for (let i = 0; i < data.length; i++) {
    if (data[i][1] === undefined || data[i][1] === 0) {

    }
    else {
      string = string + data[i][0] + data[i][1] + '<br/>';
    }
  }
  return string;
}
function dunamis_detect(dunamis) {
  if (typeof dunamis === 'number') {
    return 'dunamis_tensyon' + dunamis;
  } else {
    switch (dunamis) {
      case '0853':
        return 'dunamis_kouyou1';
      case '0854':
        return 'dunamis_kouyou2';
      case '0855':
        return 'dunamis_kouyou3';
      case '0856':
        return 'dunamis_kouyou4';
      case '0857':
        return 'dunamis_kouyou5';
      case '06C2':
        return 'dunamis_tensyon20';
      default:
        return '';
    }
  }
}
function alignment_of_digits(dps) {
  dps = dps.toFixed(2);
  switch (dps.length) {
    case 0:
      return 0;
    case 1:
      return dps;
    case 2:
      return dps;
    case 3:
      return dps;
    case 4:
      return dps;
    case 5:
      return dps;
    case 6:
      return dps;
    case 7:
      return dps.substring(0, 6);
    case 8:
      return dps.substring(0, 5);
    default:
      return dps.substring(0, 5) + '...';
  }
}
function dammy_battle_data() {
  let data = {
    aliance: 1,
    assist: 10,
    battle: true,
    calcdps: 1450.45,
    death: 4,
    hitrocketpuntch: 14,
    hitrocketpuntchavarage: 18,
    incomeotherheal: 11263,
    incomepartyheal: 35684,
    incomeselfheal: 154121,
    incomeallyheal: 1451,
    job: 'whm',
    kill: 7,
    matondamage: 451421,
    missrocketpuntch: 3,
    name: 'Sample Namedesu',
    nameID: '10101010',
    objectdamage: 451421,
    overdamage: 32232,
    overheal: 4571,
    persondamage: 874014,
    personincomedamage: 457124,
    playerdamage: 1211454,
    robincomedamage: 154147,
    robot: false,
    s_death: 2,
    s_kill: 7,
    selfheal: 451111,
    server: 'Metor',
    torobotdamage: 290015,
    ['total-accept-damage']: 874910,
    totaldamage: 1254100,
    totalincomedamage: 351012,
    totalheal: 611210,
    totalincomeheal: 78948,
    totalrocketpuntch: 18,
    dunamis: 5,
    battle_time: 600
  };
  return data;
}
