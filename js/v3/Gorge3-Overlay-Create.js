var FL_MAXROW = 15;
var RW_MAXROW = 15;
var PVE_MAXROW = 8;
var FL_EXTEND = {Aliance:false,Party:false,Me:true,near:true};
var FL_ACT_Compatible_Mode = false;
var GORGE_ACT_Compatible_Mode = false;
var FL_PARTYPRIORITY = true;
var FL_AROUND_ONLY = true;
var FL_RESULT_SHOW = true;
var RW_PARTYPRIORITY = true;
var RW_AROUND_ONLY = true;
var RW_RESULT_SHOW = true;
var RW_DUNAMIS_ICON = false;
var RW_MAX_DUNAMIS_ICON = true;
var G_REPLACE_ACTNAME = true;
let Overlay_Select = {};
function gorge_start(e){
  let sort_target = 'calcdps';
  let template = $('#rw-source');
  let container = $('#overlay').clone();
  container.html("");
  if(GORGE_ACT_Compatible_Mode){

  }else {
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
    //let battle_datas = maindata_export('ally',null,'persondamage','torobotdamage','matondamage');
    let battle_datas = [];
    if(RW_RESULT_SHOW && LOGLINE_ENCOUNTER.Result_Page){
      battle_datas = maindata_export('ally',null,'persondamage','torobotdamage','matondamage');
    }
    else if(RW_PARTYPRIORITY){
      let party_member = maindata_export('party',null,'persondamage','torobotdamage','matondamage');
      let other_member = maindata_export('ally-other',null,'persondamage','torobotdamage','matondamage');
      if(RW_AROUND_ONLY){
        party_member = battled_only(party_member);
        other_member = battled_only(other_member);
      }
      other_member = array_sort_module(other_member,sort_target);
      battle_datas = party_priority(party_member,other_member,RW_MAXROW);
    }
    else {
      battle_datas = maindata_export('ally',null,'persondamage','torobotdamage','matondamage');
      if(RW_AROUND_ONLY){
        battle_datas = battled_only(battle_datas);
      }
      battle_datas = party_priority([],battle_datas,RW_MAXROW);
    }
    ////////////////////////////////////////////////////////////
    battle_datas = array_sort_module(battle_datas,sort_target);


      let select_lock = Object.keys(Overlay_Select);
      for(let i = 0 ; i < battle_datas.length ; i++){
        let locked = select_lock.indexOf(battle_datas[i].name);
        if(locked !== -1){
          if(Overlay_Select[battle_datas[i].name].click){
            if(Overlay_Select[battle_datas[i].name].extend){
              container.append(gorge_create(template,create_time,start_time,battle_datas[i],false,true));
            }
            else {
              container.append(gorge_create(template,create_time,start_time,battle_datas[i],true,true));
            }
          }
          else {
            if(DEBUG_LOG){
              console.error('Error : Overlay_Create Selected not delete');
            }
          }
        }
        else {//クリックしたプレイヤー以外
          if(FL_EXTEND === 'ally'){
            container.append(gorge_create(template,create_time,start_time,battle_datas[i],false,false));//disp noselect
          }
          else if (FL_EXTEND === 'near') {
            if(battle_datas[i].battle){
              container.append(gorge_create(template,create_time,start_time,battle_datas[i],false,false));//disp noselect
            }
            else {
              container.append(gorge_create(template,create_time,start_time,battle_datas[i],true,false));//hide noselect
            }
          }
          else if (FL_EXTEND === 'party') {
            if(battle_datas[i].aliance == 1){
              container.append(gorge_create(template,create_time,start_time,battle_datas[i],false,false));//disp noselect
            }
            else {
              container.append(gorge_create(template,create_time,start_time,battle_datas[i],true,false));//hide noselect
            }
          }
          else if (FL_EXTEND === 'me') {
            if(battle_datas[i].nameID === PRIMARY_PLAYER.nameID){
              container.append(gorge_create(template,create_time,start_time,battle_datas[i],false,false));//disp noselect
            }
            else {
              container.append(gorge_create(template,create_time,start_time,battle_datas[i],true,false));//hide noselect
            }
          }
        }
      }
    $('#overlay').replaceWith(container);
  }
}
function gorge_create(template,create_time,start_time,battle_data,hide,selected,robot_extend){
  let row = template.clone();
  let time = battle_data.battle_time;
  if(hide){
    row.find('.g-hide').css('display','none');
    row.children().attr('id','Overlay_' + battle_data.name + 'of');
  }
  else {
    row.children().attr('id','Overlay_' + battle_data.name + 'on');
  }
  row.addClass('aliance-border-' + battle_data.aliance);
  let dps = battle_data.calcdps.toFixed(1);
  row.find('.g-dps-i').text(dps.substring(0,dps.length - 2));
  if(dps.length < 6){
    row.find('.g-dps-d').text('.' + dps.slice(-1));
  }
  else {
    row.find('.g-dps-d').text('');
  }
  if(selected){
    row.find('.g-job-icon').addClass('underline-text');
  }
  //dps space
  row.find('.g-hps').text(damage_to_dps(battle_data.totalheal,time).toFixed(0));
  row.find(".g-hps").prop('title',tooltip_title_create([Lang_select.self +' -> ',battle_data.selfheal],[Lang_select.party + ' -> ',battle_data.partyheal],[Lang_select.ally + ' -> ',battle_data.allyheal],[Lang_select.other + ' -> ',battle_data.otherheal]));
  row.find(".g-dps").prop('title',tooltip_title_create([Lang_select.Person +' -> ',battle_data.persondamage],[Lang_select.Robot + ' -> ',battle_data.torobotdamage],[Lang_select.Maton + ' -> ',battle_data.matondamage],[Lang_select.Tower + ' -> ',battle_data.towerdamage]));
  row.find('.g-job-icon').addClass('icon-' + battle_data.job);
  //top space
  row.find('.g-kill').text(battle_data.kill);
  row.find('.g-death').text(battle_data.death);
  row.find('.g-assist').text(battle_data.assist);
  row.find('.g-name').text(battle_data.name);
  if(battle_data.dunamis !== undefined && battle_data.dunamis !== null){
    row.find('.g-dunamis').addClass('dunamis-space');
    if(RW_DUNAMIS_ICON){
      row.find('.g-dunamis').addClass(dunamis_detect(battle_data.dunamis));
    }
    else {
      if(battle_data.dunamis === TensyonMax){
        if(RW_MAX_DUNAMIS_ICON){
          row.find('.g-dunamis').addClass(dunamis_detect(battle_data.dunamis));
        }
        else {
          row.find('.g-dunamis').text(20);
          row.find('.g-dunamis').css('font-size','0.7rem');
        }
      }else {
        row.find('.g-dunamis').text(battle_data.dunamis);
        row.find('.g-dunamis').css('font-size','0.7rem');
      }
    }
  }
  //middle space
  row.find('.g-player-number').text(damage_to_dps(battle_data.persondamage,time).toFixed(0));
  row.find('.g-torobot-number').text( '+' + damage_to_dps(battle_data.torobotdamage,time).toFixed(0));
  row.find('.g-object-number').text(damage_to_dps(battle_data.matondamage,time).toFixed(0));
  row.find('.g-tower-number').text( '+' + damage_to_dps(battle_data.towerdamage,time).toFixed(0));
  row.find('.g-incomedamage-number').text(damage_to_dps(battle_data.totalincomedamage,time).toFixed(0) + '(' + damage_to_dps(battle_data.robincomedamage,time).toFixed(0) + ')');

  row.find('.g-incomeheal-number').text(damage_to_dps(battle_data.totalincomeheal,time).toFixed(0) + '(' + damage_to_dps(battle_data.incomeselfheal,time).toFixed(0) + ')');
  //under space
  if(typeof battle_data.robot_data === 'undefined'){//ロボなし

  }else {//ロボあり
    if(/*robot_extend||*/battle_data.aliance === 1||true){
      row.find('.g-robot-data').html(robot_icon_timehistory_create(battle_data.robot_data,false,create_time,start_time));
    }
    else {
      row.find('.g-income-number').html(robot_icon_timehistory_create(battle_data.robot_data,true,create_time,start_time));
    }
  }

  return row;
}
function robot_icon_timehistory_create(data,simple,nowtime,battle_start_time){
  let return_data = '';
  let total_battle_time = nowtime - battle_start_time;
  for(let i = 0 ; i < data.length ; i++){
    if(simple){
      if(Robot_name.indexOf(data[i].ride_type) !== -1){//robot data
        return_data += "<span class='icon-" + data[i].ride_type + "3'></span>";
      }
    }else {//extend mode のとき
      if(return_data === ''){//1回目
        return_data += "<span class='' style=' width:" + (data[i].ridetime - battle_start_time) /total_battle_time * 100 +"%'> </span>";
      }
      let icon_type = '';
      if(Robot_name.indexOf(data[i].ride_type) !== -1){//robot data
        icon_type = 'icon-' + data[i].ride_type +'3';
      }
      if(data[i].time !== 0){
        return_data += "<span class='" + icon_type +"' style=' width:" + data[i].time /total_battle_time * 100 +"%'></span>";
      }else {//last data
        return_data += "<span class='" + icon_type +"' style=' width:" + (nowtime - data[i].ridetime) /total_battle_time * 100 +"%'></span>";
      }
    }
  }
  return return_data;
}
function fl_start(e){
  let sort_target = 'calcdps';
  //let encounter = e.Encounter;
  //let combatants = e.Combatant;
  let fl_template = $('#fl-source');
  let container = $('#overlay').clone();
  container.html('');
  //var names = Object.keys(combatants);
  if(FL_ACT_Compatible_Mode||false){
    //yet
  }
  else {
    let battle_datas = [];
    if(FL_RESULT_SHOW && LOGLINE_ENCOUNTER.Result_Page){
      battle_datas = maindata_export('ally',null,'totaldamage');
    }
    else if(FL_PARTYPRIORITY){
      let party_member = maindata_export('party',null,'totaldamage');
      let other_member = maindata_export('ally-other',null,'totaldamage');
      if(FL_AROUND_ONLY){
        party_member = battled_only(party_member);
        other_member = battled_only(other_member);
      }
      other_member = array_sort_module(other_member,sort_target);
      battle_datas = party_priority(party_member,other_member,FL_MAXROW);
    }
    else {
      battle_datas = maindata_export('ally',null,'totaldamage');
      if(FL_AROUND_ONLY){
        battle_datas = battled_only(battle_datas);
      }
      battle_datas = party_priority([],battle_datas,FL_MAXROW);
    }
    battle_datas = array_sort_module(battle_datas,sort_target);
    //////////////////////////////

    let max_data = damage_to_dps(battle_datas[0].totaldamage,battle_datas[0].battle_time);
    max_data = (typeof max_data === 'number')?max_data:0;
    let select_lock = Object.keys(Overlay_Select);
    for(let i = 0 ; i < battle_datas.length ; i++){
      let locked = select_lock.indexOf(battle_datas[i].name);
      if(locked !== -1){
        if(Overlay_Select[battle_datas[i].name].click){
          if(Overlay_Select[battle_datas[i].name].extend){
            container.append(fl_create(fl_template,battle_datas[i],false,true));
          }
          else {
            container.append(fl_create(fl_template,battle_datas[i],true,true));
          }
        }
        else {
          if(DEBUG_LOG){
            console.error('Error : Overlay_Create Selected not delete');
          }
        }
      }
      else {//クリックしたプレイヤー以外
        if(FL_EXTEND === 'ally'){
          container.append(fl_create(fl_template,battle_datas[i],false,false));//disp noselect
        }
        else if (FL_EXTEND === 'near') {
          if(battle_datas[i].battle){
            container.append(fl_create(fl_template,battle_datas[i],false,false));//disp noselect
          }
          else {
            container.append(fl_create(fl_template,battle_datas[i],true,false));//hide noselect
          }
        }
        else if (FL_EXTEND === 'party') {
          if(battle_datas[i].aliance == 1){
            container.append(fl_create(fl_template,battle_datas[i],false,false));//disp noselect
          }
          else {
            container.append(fl_create(fl_template,battle_datas[i],true,false));//hide noselect
          }
        }
        else if (FL_EXTEND === 'me') {
          if(battle_datas[i].nameID === PRIMARY_PLAYER.nameID){
            container.append(fl_create(fl_template,battle_datas[i],false,false));//disp noselect
          }
          else {
            container.append(fl_create(fl_template,battle_datas[i],true,false));//hide noselect
          }
        }
      }
    }
  }
  $('#overlay').replaceWith(container);
}
function array_sort_module(array,key){
  array.sort((a, b) => b[key] - a[key]);
  return array;
}
function battled_only(array){
  let return_data = [];
  for(let i = 0 ; i < array.length ; i++){
    if(array[i].battle){
      return_data.push(array[i]);
    }
  }
  return return_data;
}
function party_priority(party_array,other_array,maxsize){
  let party_l = party_array.length;
  let other_l = other_array.length;
  let maxrow = Math.max(party_l,maxsize);
  let cutsize = maxrow - party_l;
  if(cutsize > 0){
    const cutted_array = other_array.slice(0,cutsize);
    return party_array.concat(cutted_array);
  }
  else {
    return party_array;
  }
}
function fl_create(template,battle_data,hide,selected){
  let row = template.clone();
  let time = battle_data.battle_time;
  row.addClass('aliance-border-' + battle_data.aliance);
  let dps = battle_data.calcdps.toFixed(1);
  row.find('.f-dps-i').text(dps.substring(0,dps.length - 2));
  if(dps.length < 6){
    row.find('.f-dps-d').text('.' + dps.slice(-1));
  }
  else {
    row.find('.f-dps-d').text('');
  }
  if(selected){
    row.find('.f-job-icon').addClass('underline-text');
  }
  row.find('.f-hps').text(damage_to_dps(battle_data.totalheal,time).toFixed(0));
  row.find(".f-hps").prop('title',tooltip_title_create([Lang_select.self +' -> ',battle_data.selfheal],[Lang_select.party + ' -> ',battle_data.partyheal],[Lang_select.ally + ' -> ',battle_data.allyheal],[Lang_select.other + ' -> ',battle_data.otherheal]));
  row.find(".f-dps").prop('title',tooltip_title_create([Lang_select.Person +' -> ',battle_data.persondamage],[Lang_select.Robot + ' -> ',battle_data.torobotdamage],[Lang_select.Maton + ' -> ',battle_data.matondamage],[Lang_select.Tower + ' -> ',battle_data.towerdamage]));
  row.find('.f-job-icon').addClass('icon-' + battle_data.job);
  row.find('.f-kill').text(battle_data.kill);
  row.find('.f-death').text(battle_data.death);
  row.find('.f-assist').text(battle_data.assist);
  row.find('.f-name').text(battle_data.name);
  row.find('.f-dunamis').addClass(dunamis_detect(battle_data.dunamis));
  if(battle_data.dunamis !== undefined && battle_data.dunamis !== null){
    row.find('.f-dunamis').addClass('dunamis-space');
  }
  row.find('.f-incomedamage').text(damage_to_dps(battle_data.totalincomedamage,time).toFixed(0));
  row.find(".f-incomedamage").prop('title',tooltip_title_create([Lang_select.personincomedamage +' -> ',battle_data.personalincomedamage],[Lang_select.robincomedamage + ' -> ',battle_data.robincomedamage],[Lang_select.objectincomedamage + ' -> ',battle_data.objectincomedamage],[Lang_select.otherpersonincomedamage + ' -> ',battle_data.otherpersonincomedamage]));
  row.find('.f-incomeheal').text(damage_to_dps(battle_data.totalincomeheal ,time).toFixed(0));
  row.find(".f-incomeheal").prop('title',tooltip_title_create([Lang_select.incomeselfheal +' -> ',battle_data.incomeselfheal],[Lang_select.incomepartyheal + ' -> ',battle_data.incomepartyheal],[Lang_select.incomeallyheal + ' -> ',battle_data.incomeallyheal],[Lang_select.incomeotherheal + ' -> ',battle_data.incomeotherheal]));
  if(AREA.Area_Type === 3){
    row.find(".f-incomedamage-gage").html(bar_create([battle_data.personalincomedamage,'incomedamage-player'],[battle_data.robincomedamage,'incomedamage-robot'],[battle_data.objectincomedamage,'incomedamage-object'],[battle_data.otherpersonincomedamage,'incomedamage-other']));
  }
  row.find(".f-incomeheal-gage").html(bar_create([battle_data.incomeotherheal,'incomeheal-object'],[battle_data.incomeallyheal,'incomeheal-ally'],[battle_data.incomepartyheal,'incomeheal-party'],[battle_data.incomeselfheal,'incomeheal-self']));
  if(hide){
    row.find('.f-hide').css('display','none');
    row.children().attr('id','Overlay_' + battle_data.name + 'of');
  }
  else {
    row.children().attr('id','Overlay_' + battle_data.name + 'on');
  }

  if(battle_data.name === PRIMARY_PLAYER.name){
    //myself
    row.addClass('me');
    if(G_REPLACE_ACTNAME){
        row.find('.f-name').text(ACT_NAME);
    }
  }

  return row;

}
function simple_create(template,battle_data,max_data){
  let row = template.clone();
  let time = battle_data.enctime;
  /*
  if(typeof battle_data.aliance === 'number'){
    //aliance include
  }*/
  row.find('.basic-dps').text(alignment_of_digits(battle_data.dpsarea));
  if(battle_data.overhealPct !== null){
    row.find('.basic-dps').prop('title',tooltip_title_create([Lang_select.healed +' -> ',alignment_of_digits(battle_data.hpsarea)],[Lang_select.overhealPct +' -> ',battle_data.overhealPct]));
  }

  if(typeof battle_data.data_area1 === 'number'){
    if(battle_data.dunamis !== undefined && battle_data.dunamis !== null){
      row.find('.basic-dunamis').addClass(dunamis_detect(battle_data.dunamis));
      row.find('.basic-dunamis').addClass('dunamis-space');
      row.find('.basic-name').css('min-width','calc(100% - 5.2rem)');
      row.find('.basic-name').css('max-width','calc(100% - 5.2rem)');
    }
    row.find('.basic-dataspace').css('min-width','1.4rem');
    row.find('.basic-dataspace').css('max-width','1.4rem');
    row.find('.basic-name').css('min-width','calc(100% - 6.2rem)');
    row.find('.basic-name').css('max-width','calc(100% - 6.2rem)');
  }
  row.find('.basic-name').text(battle_data.name);
  row.find('.basic-space1').text(battle_data.data_area1);
  row.find('.basic-space2').text(battle_data.data_area2);
  row.find('.basic-space3').text(battle_data.data_area3);
  row.find('.basic-bar').addClass('role-background-' + battle_data.role);
  row.find('.basic-bar').css('width', ((battle_data.dpsarea / max_data) * 100) + '%');
  if(battle_data.name === PRIMARY_PLAYER.name){
    //myself
    row.addClass('me');
    if(G_REPLACE_ACTNAME){
        row.find('.basic-name').text(ACT_NAME);
    }
  }
  else if(battle_data.name === ACT_NAME){
    row.addClass('me');
  }
  if(battle_data.job === ''){
    if (battle_data.name.indexOf('(') !== -1) {
      if(battle_data.name.indexOf(')') !== -1){
        row.find('.basic-job').addClass('icon-app_world_wanderer');
        row.find('.basic-space1').text('');
        row.find('.basic-space2').text('');
        row.find('.basic-space3').text('');
      }
    }
  }
  else {
    if(battle_data.job === 'limit break'){
      row.find('.basic-job').addClass('icon-app_fc');
      row.find('.basic-space1').text('');
      row.find('.basic-space2').text('');
      row.find('.basic-space3').text('');
    }else {
      row.find('.basic-job').addClass('icon-' + battle_data.job);
    }
  }

  return row;
}
function data_simple_exchange(type,data,enc_time){
  let changed_data = null;
  if(type === 'encounter-pve'){
    changed_data = {
      aliance:null,
      dpsarea:isNaN(Number(data.encdps)) === isNaN? 0 : Number(data.encdps),
      enctime:enc_time,
      hpsarea:isNaN(Number(data.enchps))? 0 : Number(data.enchps),
      dunamis:'',
      overhealPct:data.OverHealPct,
      name:data.name,
      job:data.Job.toLowerCase(),
      role:job_to_role(data.Job.toLowerCase()),
      data_area1:data['crithit%'],
      data_area2:data.DirectHitPct,
      data_area3:data.CritDirectHitPct
    };
  }else if (type === 'encounter-pvp') {
    changed_data = {
      aliance:null,
      dpsarea:Number(data.encdps),
      enctime:enc_time,
      hpsarea:Number(data.enchps),
      dunamis:'',
      overhealPct:data.OverHealPct,
      name:data.name,
      job:data.Job.toLowerCase(),
      role:job_to_role(data.Job.toLowerCase()),
      data_area1:'',
      data_area2:data.kills,
      data_area3:data.deaths
    };
  }
  else if (type === 'original-fl') {
    changed_data = {
      aliance:data.aliance,
      dpsarea:damage_to_dps(data.totaldamage,enc_time),
      enctime:data.battle_time,
      hpsarea:damage_to_dps(data.totalheal,enc_time),
      overhealPct:Math.round((data.overheal/data.totalheal)*100) + '%',
      name:data.name,
      job:data.job,
      role:job_to_role(data.job),
      dunamis:data.dunamis,
      data_area1:(typeof data.kill === 'number')?data.kill:0,
      data_area2:(typeof data.death === 'number')?data.death:0,
      data_area3:(typeof data.assist === 'number')?data.assist:0
    };
  }
  return changed_data;
}
function pve_start(e){
  let encounter = e.Encounter;
  let combatants = e.Combatant;
  let basic_template = $('#basic-source');
  let container = $('#overlay').clone();
  container.html('');
  var names = Object.keys(combatants);
  let max_data = 0;
  let hps_table = [];
  for(let i = 0 ; i < names.length && i <PVE_MAXROW; i++){
    let changed_data = data_simple_exchange('encounter-pve',combatants[names[i]],Number(encounter.DURATION));
    if(i === 0){
      max_data = changed_data.dpsarea;
    }
    if(PVE_HPS_TABLE.indexOf(changed_data.role) !== -1 && changed_data.hpsarea !== 0){
      hps_table.push({hps:changed_data.hpsarea,overhealpct:changed_data.overhealPct,name:changed_data.name,job:changed_data.job,role:changed_data.role,dps:changed_data.dpsarea});
    }
    container.append(simple_create(basic_template,changed_data,max_data));
  }
  if(hps_table.length > 0){
    container.append('<div><hr class="basic-hps-line" noshade></hr></div>');
    hps_table = array_sort_module(hps_table,'hps');
    let max_hps = 0;
    for(let i = 0 ; i < hps_table.length ; i++){
      if(i === 0){
        max_hps = hps_table[i].hps;
      }
      let t = hps_table[i];
      container.append(simple_create(basic_template,{dpsarea:t.hps,hpsarea:t.dps,overhealPct:null,name:t.name,job:t.job,role:t.role,dunamis:null,data_area1:'',data_area2:'',data_area3:t.overhealpct},max_hps));
    }
  }
  $('#overlay').replaceWith(container);
}
function bar_create(...data){
  //data [125123,incomedamage-robot]
  let sum = 0;
  let new_data = [];
  for(let i = 0 ; i < data.length ; i++){
    if(typeof data[i][0] === 'number' && data[i][0] > 0){
      new_data.push(data[i]);
      sum += data[i][0];
    }
  }
  let return_data = '';
  for(let i = 0 ; i < new_data.length ; i++){
    let percent = new_data[i][0] / sum * 100;
    return_data += '<div class="' + new_data[i][1] + '" style="width: ' + percent + '%;"></div>';
  }
  return return_data;
}
function tooltip_title_create(...data){
  let string = '';
  for(let i = 0 ; i < data.length ; i ++){
    if(data[i][1] === undefined ||data[i][1] === 0){

    }
    else {
      string = string + data[i][0] + data[i][1] + '<br/>';
    }
  }
  return string;
}
function dunamis_detect(dunamis){
  if(typeof dunamis === 'number'){
    return 'dunamis_tensyon' + dunamis;
  }else {
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
function alignment_of_digits(dps){
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
      return dps.substring(0,6);
    case 8:
      return dps.substring(0,5);
    default:
      return dps.substring(0,5) + '...';
  }
}
