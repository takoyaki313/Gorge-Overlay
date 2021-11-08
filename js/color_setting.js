function special_color(data){
  if(data === 'role-color'){
    return 'role-color';
  }
  else if (data === 'aliance-color') {
    return 'aliance-color';
  }
  else {
    return null;
  }
}

function overlay_css_append(data){
  let data_array = Object.keys(data);
  let css_property = color_data_css_property();
  for(let i = 0 ; i < data_array.length ; i++){
    if(data[data_array[i]] !== 'role-color' ||data[data_array[i]] !== 'aliance-color' ||data[data_array[i]] !== 'default' ||data[data_array[i]] === ''){
      $(css_property[data_array[i] + '_ID']).css(css_property[data_array[i] + '_Property'] , data[data_array[i]]);
    }
  }
}
function color_data_local_load(savename){
  let data = localStorage.getItem(savename);
  if(data === null){
    data = default_color_data();
    color_data_local_save(data,savename);
  }
  else{
    data = JSON.parse(data);
  }
  return data;
}
function color_data_local_save(data,savename){
  let json = JSON.stringify(data);
  localStorage.setItem(savename,json);
}
function color_data_listen(){
  let position_data = color_data_position();
  let color_data = default_color_data();
  let data_array = Object.keys(color_data);
  console.log('Setting_item_num->' + data_array.length);
  for(let i = 0 ; i < data_array.length ; i ++){
    let position = position_data[data_array[i] + '_position'];
    if($('#setting-color-' + position).val() === ''||$('#setting-color-' + position).val() === 'default'){
      //no data
    }
    else{
      color_data[data_array[i]] = $('#setting-color-' + position).val();
    }
  }
  return color_data;
}
function color_sample_display(data){
  let position_data = color_data_position();
  let data_array = Object.keys(data);
  for(let i = 0 ; i < data_array.length ;i++){
    $('.s-c-color-' + position_data[data_array[i] + '_position']).css('background-color',data[data_array[i]]);
  }
}
function color_data_display_write(data){
  let position_data = color_data_position();
  let data_array = Object.keys(data);
  for(let i = 0 ; i < data_array.length ;i++){
    $('#setting-color-' + position_data[data_array[i] + '_position']).val(data[data_array[i]]);
  }
}
function color_data_json_import(){
  let data = JSON.parse($('#color-import-textarea').val());
  return data;
}
function color_data_json_out(data){
  let json = JSON.stringify(data);
  $('#color-import-textarea').val(json);
}
function isEmpty(obj){//when Empty -> return true
  return !Object.keys(obj).length;
}
function default_color_data(){
  data = {
    html_background : 'transparent',
    overlay_background : 'rgba(0,0,0,0.3)',
    overlay_font : '#ded7be',
    main_dps : '#ded7be',
    main_hps : '#ded7be',
    job_icon : '#ded7be',
    job_default : '#ded7be',
    job_tank : '#7586e0',
    job_healer : '#76ab67',
    job_melee : '#ad6161',
    job_physical : '#ad6161',
    job_magical : '#ad6161',
    playername : '#ded7be',
    frame : '#ded7be',
    boarding_history : '#ded7be',
    person_damage : '#ded7be',
    person_icon : '#ded7be',
    torob_damage : '#ded7be',
    torob_icon : '#ded7be',
    object_damage : '#ded7be',
    object_icon : '#ded7be',
    tower_damage : '#ded7be',
    tower_icon : '#ded7be',
    kill_number : '#ded7be',
    death_number : '#ded7be',
    kill_string : '#ded7be',
    death_string : '#ded7be',
    aliance_bar : 'aliance-color',
    aliance1 : '#5BB7E5',
    aliance2 : '#895BE5',
    aliance3 : '#E55BB7',
    aliance4 : '#E5895B',
    aliance5 : '#B7E55B',
    aliance6 : '#5BE589',
    aliance_other : 'transparent',
    death_background : 'rgba(255,0,0,0.3)',
    party_background : 'rgba(37,92,80,0.5)',
    my_background : 'rgba(93,81,37,0.7)',
    ///////////////////////////////////////
    f_dps  : '#ded7be',
    f_job_icon : '#ded7be',
    f_name : '#ded7be',
    f_kill_number : '#ded7be',
    f_death_number : '#ded7be',
    f_kill_string : '#ded7be',
    f_death_string : '#ded7be',
    f_dps_bar : 'role-color',
    f_aliance_bar : 'aliance-color',
    ///////////////////////////////////////
    n_dps  : '#ded7be',
    n_job_icon : '#ded7be',
    n_name : '#ded7be',
    n_crit : '#ded7be',
    n_direct : '#ded7be',
    n_cridirect : '#ded7be',
    n_dps_bar : 'role-color',
  }
  return data;
}

function color_data_position(){
  data = {
    overlay_background_position : 36,
    html_background_position : 1,
    overlay_font_position : 2,
    my_background_position : 3,
    party_background_position : 4,
    death_background_position : 5,
    main_dps_position : 6,
    main_hps_position : 7,
    job_icon_position : 37,
    job_default_position : 22,
    job_tank_position : 31,
    job_healer_position : 30,
    job_melee_position : 29,
    job_physical_position : 32,
    job_magical_position : 33,
    playername_position : 8,
    frame_position : 9,
    boarding_history_position : 23,
    person_damage_position : 10,
    person_icon_position : 24,
    torob_damage_position : 11,
    torob_icon_position : 25,
    object_damage_position : 12,
    object_icon_position : 26,
    tower_damage_position : 13,
    tower_icon_position : 27,
    kill_number_position : 14,
    death_number_position : 15,
    kill_string_position : 34,
    death_string_position : 35,
    aliance_bar_position : 38,
    aliance1_position : 16,
    aliance2_position : 17,
    aliance3_position : 18,
    aliance4_position : 19,
    aliance5_position : 20,
    aliance6_position : 21,
    aliance_other_position : 28,
    //////////////////////////////
    f_dps_position  : 39,
    f_job_icon_position : 40,
    f_name_position : 41,
    f_kill_number_position : 42,
    f_death_number_position : 43,
    f_kill_string_position : 44,
    f_death_string_position : 45,
    f_dps_bar_position : 46,
    f_aliance_bar_position : 47,
    //////////////////////////////
    n_dps_position  : 48,
    n_job_icon_position : 49,
    n_name_position : 50,
    n_crit_position : 51,
    n_direct_position : 52,
    n_cridirect_position : 53,
    n_dps_bar_position : 54,

  }
  return data;
}
function color_data_css_property(){
  data = {
    html_background_ID : 'body',
    html_background_Property : 'background-color',
    overlay_background_ID : '#overlay',
    overlay_background_Property : 'background-color',
    overlay_font_ID : 'html',
    overlay_font_Property : 'color',
    my_background_ID : '.me',
    my_background_Property : 'background-color',
    party_background_ID : '.party',
    party_background_Property : 'background-color',
    death_background_ID : '.death-too-much',
    death_background_Property : 'background-color',
    main_dps_ID : '.g-total-dps-number',
    main_dps_Property : 'color',
    main_hps_ID : '.g-total-hps-number',
    main_hps_Property : 'color',
    job_icon_ID : '.g-job-icon',
    job_icon_Property : 'color',
    job_default_ID : ':root',
    job_default_Property : '--general-role-color',
    job_tank_ID : ':root',
    job_tank_Property : '--tank-role-color',
    job_healer_ID : ':root',
    job_healer_Property : '--healer-role-color',
    job_melee_ID : ':root',
    job_melee_Property : '--melee-role-color',
    job_physical_ID : ':root',
    job_physical_Property : '--physical-role-color',
    job_magical_ID : ':root',
    job_magical_Property : '--magical-role-color',
    playername_ID : '.g-name',
    playername_Property : 'color',
    frame_ID : '.g-line-color',
    frame_Property : 'border-color',
    boarding_history_ID : '.g-robot-history',
    boarding_history_Property : 'color',
    person_damage_ID : '.g-player-number',
    person_damage_Property : 'color',
    person_icon_ID : '.icon-person',
    person_icon_Property : 'color',
    torob_damage_ID : '.g-torobot-number',
    torob_damage_Property : 'color',
    torob_icon_ID : '.icon-hammer',
    torob_icon_Property : 'color',
    object_damage_ID : '.g-object-number',
    object_damage_Property : 'color',
    object_icon_ID : '.icon-maton',
    object_icon_Property : 'color',
    tower_damage_ID : '.g-tower-number',
    tower_damage_Property : 'color',
    tower_icon_ID : '.icon-tower2',
    tower_icon_Property : 'color',
    kill_number_ID : '.g-kill-number',
    kill_number_Property : 'color',
    death_number_ID : '.g-death-number',
    death_number_Property : 'color',
    kill_string_ID : '.g-k-string',
    kill_string_Property : 'color',
    death_string_ID : '.g-d-string',
    death_string_Property : 'color',
    aliance_bar_ID : ':root',
    aliance_bar_Property : '--aliance-color-general',
    aliance1_ID : ':root',
    aliance1_Property : '--aliance-color-1',
    aliance2_ID : ':root',
    aliance2_Property : '--aliance-color-2',
    aliance3_ID : ':root',
    aliance3_Property : '--aliance-color-3',
    aliance4_ID : ':root',
    aliance4_Property : '--aliance-color-4',
    aliance5_ID : ':root',
    aliance5_Property : '--aliance-color-5',
    aliance6_ID : ':root',
    aliance6_Property : '--aliance-color-6',
    aliance_other_ID : ':root',
    aliance_other_Property : '--aliance-color-10',
    /////////////////////////////////////////////
    f_dps_ID  : '.f-dps',
    f_dps_Property  : 'color',
    f_job_icon_ID : '.f-job',
    f_job_icon_Property : 'color',
    f_name_ID : '.f-name',
    f_name_Property : 'color',
    f_kill_number_ID : '.f-kill-number',
    f_kill_number_Property : 'color',
    f_death_number_ID : '.f-death-number',
    f_death_number_Property : 'color',
    f_kill_string_ID : '.f-kill-string',
    f_kill_string_Property : 'color',
    f_death_string_ID : '.f-death-string',
    f_death_string_Property : 'color',
    f_dps_bar_ID : '.f-bar',
    f_dps_bar_Property : 'background-color',
    f_aliance_bar_ID : '.f-basic',
    f_aliance_bar_Property : 'border-color',
    /////////////////////////////////////////////
    n_dps_ID  : '.n-dps',
    n_dps_Property  : 'color',
    n_job_icon_ID : '.n-job',
    n_job_icon_Property : 'color',
    n_name_ID : '.n-name',
    n_name_Property : 'color',
    n_crit_ID : '.n-crit',
    n_crit_Property : 'color',
    n_direct_ID : '.n-direct',
    n_direct_Property : 'color',
    n_cridirect_ID : '.n-cridirect',
    n_cridirect_Property : 'color',
    n_dps_bar_ID : '.n-bar',
    n_dps_bar_Property : 'background-color',
  }
  return data;
}
