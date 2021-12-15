function area_check(area){
  header_update_zone(area.zoneName);
  if(TEST_MODE){
    console.log(area);
  }
  if(area.zoneName === 'Hidden Gorge'){
    NOW_AREA = 1;//Hiddengorge
    SET_BATTLE_TIME = 900;//15min
    LOG_PROCESS = false;
    KILL_DATA = [];
    SKILL_KILL_DATA = [];
    header_update_timer();
  }
  else if (area.zoneID == 376
  ||area.zoneName.indexOf('Seal Rock')!== -1
  ||area.zoneID == 554
  ||area.zoneName.indexOf('Onsal Hakair')!== -1) {
    NOW_AREA = 2;//FL
    SET_BATTLE_TIME = 1200;//20min
    LOG_PROCESS = false;
    KILL_DATA = [];
    SKILL_KILL_DATA = [];
    header_update_timer();
  }/*
  else if (TEST_MODE && area.zoneName.indexOf('Middle La Noscea')!== -1||area.zoneName.indexOf("Wolves' Den Pier")!== -1||area.zoneName.indexOf('The Goblet')!== -1){
    NOW_AREA = 3;//Test Area_FL
    SET_BATTLE_TIME = 300;//test
    LOG_PROCESS = false;
    KILL_DATA = [];
    SKILL_KILL_DATA = [];
    header_update_timer();
  }*/
  else {
    NOW_AREA = 0;
    TENSYON_MAX = false;
    ENCOUNTER_START = false;
    SET_BATTLE_TIME = 0;
    ALIANCE_DATA = false;
  }
  if(HEADER_TEMP === 0){//First start up
    header_disp(true);
    HEADER_TEMP = 1;
  }
  else{//second or later
    if(PVE_HEADER){//Disp anytime
      header_disp(true);
    }
    else if (NOW_AREA > 0 && !PVE_HEADER) {//PvPArea
      header_disp(true);
      HEADER_TEMP = 0;
    }
    else{
      header_disp(false);
    }
  }
}
function header_disp(disp){
  if(disp){
    $("#header_space").css('display','flex');
  }
  else{
    $("#header_space").css('display','none');
  }
}
function header_update_zone(area_name){
  $('.areaname').text(area_name);
}
function header_update_timer(){
  let timer = time_change(SET_BATTLE_TIME,Battle_Current_Time);

  if(timer[0] >= 0||timer[1] >= 0){
    $('.time-min').text(timer[0]);
    $('.time-sec').text(timer[1]);
  }
  else {
    if(TEST_MODE){
      console.warn('Error :Timer is minus ->' + timer[0] + ':' +timer[1]);
    }
    $('.time-min').text(0);
    $('.time-sec').text(0);
  }
}
function header_update_battle_data(e){
  var header = $('#header-data');
  let total_death = 0;
  let total_kill = 0;
  let min_death = 0;
  let min_kill = 0;
  let now = Date.now();
  for(let i = 0 ; i < KILL_DATA.length ; i++){
    if(KILL_DATA[i].attackeraliance !== 0){
      total_kill++;
      if(now - KILL_DATA[i].time < 60000){
        min_kill++;
      }
    }
    if(KILL_DATA[i].victimaliance !== 0){
      total_death++;
      if(now - KILL_DATA[i].time < 60000){
        min_death++;
      }
    }
  }
  let kd_rate_kill = total_kill + 1;
  let kd_rate_death = total_death + 1;
  let kd_rate = kd_rate_kill / kd_rate_death ;
  header.find('.what-header-data').text('Total : '+ e.DPS);
  header.find('.kill-num').text('K : '+total_kill+' ['+min_kill+']');
  header.find('.death-num').text('D : '+total_death+' ['+min_death+']');
  header.find('.all-kd-percent').text('K/D : '+kd_rate.toFixed(2));
}
function overlay_update_start(e){
  if(e.isActive){
    header_update_battle_data(e.Encounter);
  }
  if(e.Encounter.CurrentZoneName.toLowerCase() === 'hidden gorge'){
    if(!ENCOUNTER_START && NOW_AREA !== 0){
      ENCOUNTER_START_TIME = Date.now();
      ENCOUNTER_START = true;
    }
    gorge_overlay_update(e);
  }
  else if (
    e.Encounter.CurrentZoneName.toLowerCase() === 'the borderland ruins (secure)'||
    e.Encounter.CurrentZoneName.toLowerCase() === 'seal rock (seize)'||
    e.Encounter.CurrentZoneName.toLowerCase() === 'the fields of glory (shatter)'||
    e.Encounter.CurrentZoneName.toLowerCase() === 'onsal hakair (danshig naadam)'
    ) {
      if(!ENCOUNTER_START && NOW_AREA !== 0){
        ENCOUNTER_START_TIME = Date.now();
        ENCOUNTER_START = true;
      }
      fl_overlay_update(e);
  }/*
  else if(e.Encounter.CurrentZoneName === 'Middle La Noscea'||e.Encounter.CurrentZoneName === "Wolves' Den Pier"||e.Encounter.CurrentZoneName === 'The Goblet'){
    if(!ENCOUNTER_START && NOW_AREA !== 0){
      ENCOUNTER_START_TIME = Date.now();
      ENCOUNTER_START = true;
    }
    gorge_overlay_update(e);
  }*/
  else {
    pve_overlay_update(e);
  }
  overlay_css_append(COLOR_DATA);
}
function pve_overlay_update(e){
  var encounter = e.Encounter;
  var combatants = e.Combatant;
  var template = $('#pve-source li');
  var container = $('#overlay').clone();
  var maxdps ;
  container.html('');
  var names = Object.keys(combatants).slice(0,PVE_MAX_ROW);
  let healer_table_array = [];
  if (!e.isActive) {
    rdps_max = 0;
    $('body').addClass('inactive');
  } else {
    $('body').removeClass('inactive');
  }
  var limit = Math.min(names.length,PVE_MAX_ROW);
  let special_color = special_color_check();
  for(let i = 0 ; i < limit ; i++){
    let combatant = combatants[names[i]];
    let row = template.clone();
    if (!maxdps) {
    maxdps = parseFloat(combatant.encdps);
    }
    let dps = Number(combatant.encdps);
    if(DECIMAL_POINT_DISPLAY){
      if(combatant.encdps.length >= 9){//100,000
        row.find('.n-dps').text(dps.toFixed(0));
      }
      else if (combatant.encdps.length === 8){//10,000
        row.find('.n-dps').text(dps.toFixed(1));
      }
      else{
        row.find('.n-dps').text(dps.toFixed(2));
      }
    }
    else{
      row.find('.n-dps').text(dps.toFixed(0));
    }
    row.find('.n-job').addClass('icon-' + combatant.Job.toLowerCase());
    let role = job_to_role(combatant.Job.toLowerCase());
    if(role === 'healer'){
      if(PVE_HEALER_TABLE&&combatant.healed !== '0'){
        healer_table_array.push(combatant);
      }
    }
    let aliance = 10;
    ///////////////////////////title
    row.find('.n-name').text(combatant.name);
    row.find('.n-crit').text(combatant['crithit%']);
    row.find('.n-direct').text(combatant.DirectHitPct);
    row.find('.n-cridirect').text(combatant.CritDirectHitPct);
    if(combatant.name === 'Limit Break'){
      row.find('.n-job').addClass('icon-app_fc');
      row.find('.n-crit').text('');
      row.find('.n-direct').text('');
      row.find('.n-cridirect').text('');
    }
    row.find('.n-bar').css('width', ((parseFloat(combatant.encdps) / maxdps) * 100) + '%');
    if(ACT_NAME === combatant.name){
      row.find('.n-basic').addClass('me');
    }
    row = special_color_addclass(row,'.n-dps',special_color.n_dps,'font',role,aliance);
    row = special_color_addclass(row,'.n-job',special_color.n_job_icon,'font',role,aliance);
    row = special_color_addclass(row,'.n-name',special_color.n_name,'font',role,aliance);
    row = special_color_addclass(row,'.n-crit',special_color.n_crit,'font',role,aliance);
    row = special_color_addclass(row,'.n-direct',special_color.n_direct,'font',role,aliance);
    row = special_color_addclass(row,'.n-cridirect',special_color.n_cridirect,'font',role,aliance);
    row = special_color_addclass(row,'.n-bar',special_color.n_dps_bar,'background',role,aliance);
    container.append(row);
  }
  //HPS table
  if(healer_table_array.length !== 0){
    let line = $('#space-with-line li');
    container.append(line.clone());
    healer_table_array.sort(function(a, b) {
      return b.enchps - a.enchps;
    });
    let maxhps;
    for(let i = 0 ; i < healer_table_array.length ; i++){
      let combatant = healer_table_array[i];
      let row = template.clone();
      //
      if (!maxhps) {
      maxhps = parseFloat(combatant.enchps);
      }
      let hps = Number(combatant.enchps);
      if(DECIMAL_POINT_DISPLAY){
        if(combatant.enchps.length >= 9){//100,000
          row.find('.n-dps').text(hps.toFixed(0));
        }
        else if (combatant.enchps.length === 8){//10,000
          row.find('.n-dps').text(hps.toFixed(1));
        }
        else{
          row.find('.n-dps').text(hps.toFixed(2));
        }
      }
      else{
        row.find('.n-dps').text(hps.toFixed(0));
      }
      row.find('.n-name').text(combatant.name);
      row.find('.n-job').addClass('icon-' + combatant.Job.toLowerCase());
      row.find('.n-cridirect').text(((Number(combatant.overHeal) / Number(combatant.healed))*100).toFixed(0) + '%');
      row.find('.n-bar').css('width', ((parseFloat(combatant.enchps) / maxhps) * 100) + '%');
      let role = job_to_role(combatant.Job.toLowerCase());
      let aliance = 10;
      row = special_color_addclass(row,'.n-dps',special_color.n_dps,'font',role,aliance);
      row = special_color_addclass(row,'.n-job',special_color.n_job_icon,'font',role,aliance);
      row = special_color_addclass(row,'.n-name',special_color.n_name,'font',role,aliance);
      row = special_color_addclass(row,'.n-bar',special_color.n_dps_bar,'background',role,aliance);
      if(ACT_NAME === combatant.name){
        row.find('.n-basic').addClass('me');
      }
      container.append(row);
    }
  }

  $('#overlay').replaceWith(container);
}
function fl_overlay_update(e){
  var encounter = e.Encounter;
  var combatants = e.Combatant;
  var template = $('#fl-source li');
  var container = $('#overlay').clone();
  container.html('');
  var names = Object.keys(combatants).slice(0,FL_MAX_ROW);
  var limit = 0;
  let color_data = special_color_check();
  if(ENCOUNTER_TIME){//use LIMITED_DATA
    limited_data_combatant_marge(combatants,encounter.DURATION,'fl');
    encounter_time_detected(encounter.DURATION);
    LIMITED_DATA.sort(function (a,b) {
      return b.totaloutdamage - a.totaloutdamage ;
    });
    if(Battle_start){
      limited_data_party_cut(FL_MAX_ROW,'fl');
    }
    else if (!IGNORE_MAX_AFTER_BATTLE) {
      limited_data_party_cut(FL_MAX_ROW,'fl');
    }
    for(let i = 0 ; i < LIMITED_DATA.length ; i++){
      let row = fl_overlay_update_process(LIMITED_DATA[i],template,PVP_DURATION,color_data);
      container.append(row);
    }
  }else{
    let limited_data = combatant_data_to_limited_data(combatants);
    limit = Math.min(names.length,FL_MAX_ROW,limited_data.length);
    for(let i = 0 ; i < limit ; i++){
      let row = fl_overlay_update_process(limited_data[i],template,Number(encounter.DURATION),color_data);
      container.append(row);
    }
  }
  $('#overlay').replaceWith(container);
}

function fl_overlay_update_process(data,template,time,special_color){
  var row = template.clone();
  let aliance = fl_alliance(data.aliance);
  if (!MAX_DPS) {
  MAX_DPS = parseFloat(damage_to_dps(data.totaloutdamage,time));
  }
  let dps = damage_to_dps(data.totaloutdamage,time);
  row.find('.f-dps').text(dps);
  let job = jobID_to_string(data.currentjob);
  if(job === null){
    job = data.combatantjob.toLowerCase();
  }
  row.find('.f-job').addClass('icon-' + job);
  let role = job_to_role(job);
  ///////////////////////////title
  row.find('.f-name').text(data.name);
  row.find('.f-kill-number').text(data.kills);
  row.find('.f-death-number').text(data.death);

  row.find('.f-bar').css('width', ((dps / MAX_DPS) * 100) + '%');
  /////////////////////
  row = special_color_addclass(row,'.f-dps',special_color.f_dps,'font',role,aliance);
  row = special_color_addclass(row,'.f-job',special_color.f_job_icon,'font',role,aliance);
  row = special_color_addclass(row,'.f-name',special_color.f_name,'font',role,aliance);
  row = special_color_addclass(row,'.f-kill-number',special_color.f_kill_number,'font',role,aliance);
  row = special_color_addclass(row,'.f-death-number',special_color.f_death_number,'font',role,aliance);
  row = special_color_addclass(row,'.f-kill-string',special_color.f_kill_string,'font',role,aliance);
  row = special_color_addclass(row,'.f-death-string',special_color.f_death_string,'font',role,aliance);
  row = special_color_addclass(row,'.f-bar',special_color.f_dps_bar,'background',role,aliance);
  row = special_color_addclass(row,'.f-basic',special_color.f_aliance_bar,'border',role,aliance);
  /////////////////////
  if(data.death >= DEATH_TOO_MUCH){
    row.find('.f-basic').addClass('death-too-much');
  }
  if(dps >= RAINBOW_DPS){
    row.find('.f-dps').addClass('gaming');
  }
  if(ACT_NAME === data.name){
    row.find('.f-basic').addClass('me');
  }
  return row;
}
function combatant_data_to_limited_data(combatants){
  let names = Object.keys(combatants);
  let result = [];
  for(let i = 0 ; i < names.length ; i++){
    let return_data = {};
    let combatant = combatants[names[i]];
    return_data.totaloutdps = combatant.encdps;
    return_data.totaloutdamage = combatant.damage;
    return_data.name = combatant.name;
    return_data.combatantjob = combatant.Job;
    return_data.currentjob = 0;
    if(ACT_NAME === combatant.name && MYCHARACTOR_NAME !== ''){
      position = LIMITED_DATA.findIndex(({name}) => name == MYCHARACTOR_NAME);
    }
    else{
      position = LIMITED_DATA.findIndex(({name}) => name == combatant.name);
    }
    if(position === -1){
      return_data.kills = combatant.kills;
      return_data.death = combatant.deaths;
      return_data.aliance = 10;
    }
    else{
      return_data.kills = LIMITED_DATA[position].kills;
      return_data.death = LIMITED_DATA[position].death;
      return_data.aliance = LIMITED_DATA[position].aliance;
    }
    result.push(return_data);
  }
  console.log(result);
  return result;
}
function encounter_time_detected(time){
  //combatantDuration: 0,
  //combatantdamage: 0,
  //combatantjob: null,
  let time_now = Date.now();
  let combatant_time_ms = time_now - ENCOUNTER_START_TIME;
  let caluc_time = Math.floor(combatant_time_ms/1000);
  time = Number(time);
  if(time >= caluc_time){
    //nothing
  }
  else if (time < caluc_time) {
    time = caluc_time;
  }
  if(ENCOUNTER_START_TIME !== 0){
    PVP_DURATION = time;
  }
}
function limited_data_combatant_marge(e,time,area){
  let position = LIMITED_DATA.findIndex(({name}) => name == MYCHARACTOR_NAME);
  if(position !== -1){
    LIMITED_DATA[position].name = ACT_NAME;
  }
  if(TEST_MODE){
    console.debug(LIMITED_DATA);
  }
  let combatants_names = Object.keys(e);
  for(let i = 0 ; i < LIMITED_DATA.length ; i++){
    if(LIMITED_DATA[i].aliance === 0){
      if(TEST_MODE){
        console.warn('Error :'  + LIMITED_DATA[i].aliance + 'has LIMITED_DATA');
        console.warn(LIMITED_DATA[i]);
      }
    }
    else{
      for(let p = 0 ; p < combatants_names.length ; p++){
        let combatants_name = combatants_names[p];
        if(e[combatants_name].name === LIMITED_DATA[i].name){
          LIMITED_DATA[i].combatantjob = e[combatants_name].Job.toLowerCase();
          LIMITED_DATA[i].combatantdamage = e[combatants_name].damage;
          LIMITED_DATA[i].combatantDuration = time;
          LIMITED_DATA[i].combatantheal = e[combatants_name].healed;
          if(area === 'rw'){
            LIMITED_DATA[i].totaloutdamage = LIMITED_DATA[i].actualToRobotdamage + LIMITED_DATA[i].actualpersondamage + LIMITED_DATA[i].actualobjectdamage;
          }
          else if (area === 'fl') {
            LIMITED_DATA[i].totaloutdamage = LIMITED_DATA[i].actualToRobotdamage + LIMITED_DATA[i].actualpersondamage + LIMITED_DATA[i].actualobjectdamage + LIMITED_DATA[i].actualtowerdamage;
          }
          break;
        }
      }
    }
  }
}
function fl_alliance(data){
  if(data === 2){
    return 1;
  }
  else if (data === 4) {
    return 3;
  }
  else if (data === 6) {
    return 5
  }
  else {
    return data;
  }
}

function party(p){
  if(TEST_MODE){
    console.warn(p);
  }
  //party_data= ['300','nameID','name','aliance'];
  if(p.length === 24){
    ALIANCE_DATA = true;
    let aliance = 1;
    for(let i = 0 ; i < p.length ; i++){
      if(i > 3){
        if(i % 4 == 0){
          aliance++;
        }
      }
      let party_data = ['300',p[i].id,p[i].name,aliance];
      logline_start(party_data);
    }
  }
  else if (p.length > 4 && ALIANCE_DATA === false) {
    for(let i = 0 ; i < p.length ; i++){
      let party_data = [];
      if(p[i].inParty === true){//Party member
        party_data = ['300',p[i].id,p[i].name,1];
      }
      else {//other aliance member
        party_data = ['300',p[i].id,p[i].name,10];
      }
      logline_start(party_data);
    }
  }
}
function import_log_division(log){
  console.log(log);
  for(let i = 0 ;i < log.length;i++){
    let data = log[i].split('|');
    logline_start(data);
  }
}
