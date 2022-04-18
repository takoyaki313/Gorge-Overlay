let Storage_name = 'Gorge-Overlay3';
var Font_Size = 16;
var KILLSOUND_PLAY = new Audio('');
var KILLSOUND_VOLUME = 20;
var LB_Font_Size = 18;
var KILLSOUND_PATH = 'https://takoyaki313.github.io/Gorge-Overlay/sound/zyaki.wav';
const Localstorage_dictionary = {
  language:{
    func_name:'Language',
    value:'ja',
    disp_tab:'general',
    title_ja:'Overlay上の言語設定',
    title_en:'Language settings on Overlay',
    description_ja:'Overlayの設定画面や説明の表示言語を設定する。',
    description_en:'Set the display language for the Overlay settings screen and descriptions.',
    option: [{value:'ja',text:'日本語'},{value:'en',text:'English'}],
    inputtype:'pulldown',
    inputtypeoption:null
  },
  font_size:{
    func_name:'Font_Size',
    value:16,
    disp_tab:'general',
    title_ja:'Overlayのフォントサイズ',
    title_en:'Font size for Overlay',
    description_ja:'Overlayの細かい拡大縮小にどうぞ。小数点使えます。リロードした方がいいかも？',
    description_en:'For fine scaling of Overlay. You can use a decimal point. You might want to reload it.',
    inputtype:'value',
  },
  ACT_NAME:{
    func_name:'ACT_NAME',
    value:'YOU',
    disp_tab:'general',
    title_ja:'ACTで設定した名前',
    title_en:'The name you set in ACT',
    description_ja:'ACTからのデータを使う部分（PvEと互換モード）において、自分の背景変更に必要です。',
    description_en:'This is needed to change your background in the part that uses data from ACT (PvE and compatibility mode).',
    inputtype:'textbox',
  },
  replace_act_name:{
    func_name:'REPLACE_ACTNAME',
    value:true,
    disp_tab:'general',
    title_ja:'自分をACTで設定した名前に置き換える',
    title_en:'Replace yourself with the name you set in ACT.',
    description_ja:'一部オーバーレイにおいて、名前をACTで設定したものに置き換えます。',
    description_en:'In some overlays, replace the name with the one set in ACT.',
    inputtype:'toggle',
  },
  settingpage_num:{
    func_name:'Setting_Page_Num',
    value:1,
    disp_tab:'general',
    title_ja:'設定を開きにくくする。',
    title_en:'settings harder to open',
    description_ja:'うっかり触ったとき用に連打で開くように変更する。',
    description_en:'Change it to open with a series of hits for when it is accidentally touched.',
    inputtype:'value',
  },
  samplepage_num:{
    func_name:'Sample_Page_Num',
    value:3,
    disp_tab:'general',
    title_ja:'サンプルを開きにくくする。',
    title_en:'Make samples harder to open',
    description_ja:'うっかり触ったとき用に連打で開くように変更する。',
    description_en:'Change it to open with a series of hits for when it is accidentally touched.',
    inputtype:'value',
  },
  PvE_Maxrow:{
    func_name:'PVE_MAXROW',
    value:8,
    min_value:8,
    max_value:24,
    disp_tab:'PvE-setting',
    title_ja:'最大表示行数（PvE）',
    title_en:'Maximum number of rows displayed (PvE)',
    description_ja:'PvE時におけるオーバーレイの最大表示行数を指定する',
    description_en:'Specify the maximum number of lines to display in the overlay in PvE.',
    inputtype:'value',
  },
  FL_MAXROW:{
    func_name:'FL_MAXROW',
    value:8,
    disp_tab:'FL-setting',
    min_value:8,
    max_value:24,
    title_ja:'最大表示行数（FL）',
    title_en:'Maximum number of rows displayed (FL)',
    description_ja:'FL時におけるオーバーレイの最大表示行数を指定する',
    description_en:'Specify the maximum number of lines to display in the overlay in FL',
    inputtype:'value',
  },
  RW_MAXROW:{
    func_name:'RW_MAXROW',
    value:8,
    disp_tab:'RW-setting',
    min_value:8,
    max_value:24,
    title_ja:'最大表示行数（RW）',
    title_en:'Maximum number of rows displayed (RW)',
    description_ja:'RW時におけるオーバーレイの最大表示行数を指定する',
    description_en:'Specify the maximum number of lines to display in the overlay in RW',
    inputtype:'value',
  },
  RW_dunamis:{
    func_name:'RW_DUNAMIS_ICON',
    value:false,
    disp_tab:'RW-setting',
    title_ja:'アイコンの種類（RW）',
    title_en:'Type of Icon (RW)',
    description_ja:'RW時におけるテンションのアイコンを数字にするかアイコンにするか。',
    description_en:'Icons of tension in RW should be numbers or icons.',
    inputtype:'toggle',
  },
  RW_maxdunamis:{
    func_name:'RW_MAX_DUNAMIS_ICON',
    value:true,
    disp_tab:'RW-setting',
    title_ja:'テンションマックス時のアイコン（RW）',
    title_en:'Icon at max tension (RW)',
    description_ja:'RW時におけるテンションマックスのアイコンを数字にするかアイコンにするか。',
    description_en:'Icon of Tension Max in RW case should be a number or an icon.',
    inputtype:'toggle',
  },
  fl_act_compatible_mode:{
    func_name:'FL_ACT_Compatible_Mode',
    value:false,
    disp_tab:'FL-setting',
    title_ja:'未実装：データ参照元をACT準拠にする (FL)',
    title_en:'Not Working : Make the data source ACT compliant (FL)',
    description_ja:'オーバーレイ表示に使うデータの参照元を切り替える。バグってるときに。',
    description_en:"Switch the referrer of the data used for overlay display. For when it's buggy.",
    inputtype:'toggle',
  },
  fl_party_priorty:{
    func_name:'FL_PARTYPRIORITY',
    value:true,
    disp_tab:'FL-setting',
    title_ja:'パーティメンバーの優先表示 (FL)',
    title_en:'Priority display of party members (FL)',
    description_ja:'パーティメンバーが最大表示行数外だった場合に優先表示を行う。',
    description_en:"If a party member is outside the maximum number of lines to be displayed, priority is displayed.",
    inputtype:'toggle',
  },
  fl_simulation_kill:{
    func_name:'FL_SIMULATION_KILL',
    value:true,
    disp_tab:'FL-setting',
    title_ja:'OverlayでシミュレーションしたK/Dを用いる (FL)',
    title_en:'Using K/D simulated by Overlay  (FL)',
    description_ja:'DoTダメージや列車死等によるキルが反映されます。精度低め。',
    description_en:"Kills due to DoT damage, train deaths, etc. are reflected. Low accuracy.",
    inputtype:'toggle',
  },
  fl_extend:{
    func_name:'FL_EXTEND',
    value:'party',
    disp_tab:'FL-setting',
    title_ja:'自動で詳細モード表示する対象 (FL)',
    title_en:'Automatically display target in detail mode (FL)',
    description_ja:'選択した対象を詳細モードで表示する。',
    description_en:"Display the selected target in detail mode.",
    option: [{value:'ally',text:'Aliance'},{value:'near',text:'Near player'},{value:'party',text:'Party'},{value:'me',text:'Myself Only',}],
    inputtype:'pulldown',
    inputtypeoption:null
  },
  fl_around:{
    func_name:'FL_AROUND_ONLY',
    value:true,
    disp_tab:'FL-setting',
    title_ja:'周囲に居る味方のみオーバーレイに表示 (FL)',
    title_en:'Only allies in the vicinity are shown in the overlay (FL)',
    description_ja:'周囲に居る味方を表示し、遠くにいる味方を非表示にする。',
    description_en:"Shows allies around you and hides allies in the distance.",
    inputtype:'toggle',
  },
  fl_result:{
    func_name:'FL_RESULT_SHOW',
    value:true,
    disp_tab:'FL-setting',
    title_ja:'試合終了後に味方全てのデータをオーバーレイに表示する (FL)',
    title_en:"Display all allies' data in an overlay after a fights (FL)",
    description_ja:'最大表示行数や周囲の味方のみ表示の制限を無視してすべて表示する。',
    description_en:"Display all of them, ignoring the maximum number of display lines and the limit of displaying only allies around you.",
    inputtype:'toggle',
  },
  fl_death_too_much:{
    func_name:'FL_DEATH_TOO_MUCH',
    value:8,
    disp_tab:'FL-setting',
    min_value:8,
    max_value:24,
    title_ja:'Downした人を協調表示する。（FL）',
    title_en:'Downed person in a coordinated display (FL)',
    description_ja:'一定回数以上死んだ人を協調表示する。',
    description_en:'Coordinated display of people who have died more than a certain number of times.',
    inputtype:'value',
  },
  rw_death_too_much:{
    func_name:'RW_DEATH_TOO_MUCH',
    value:8,
    disp_tab:'RW-setting',
    min_value:8,
    max_value:24,
    title_ja:'Downしすぎた人を協調表示する。（RW）',
    title_en:'Maximum number of rows displayed (RW)',
    description_ja:'一定回数以上死んだ人を協調表示する。',
    description_en:'Coordinated display of people who have died more than a certain number of times.',
    inputtype:'value',
  },
  rw_perosn_raibow:{
    func_name:'RW_Person_Rainbow_DPS',
    value:1000,
    disp_tab:'RW-setting',
    min_value:1,
    max_value:100000,
    title_ja:'一定DPS以上をレインボーにする。（RW）',
    title_en:'Make a certain DPS or higher a rainbow (RW)',
    description_ja:'中央で盛った人が輝く。ロボは対象外。',
    description_en:'The people who thrived in the center shine. Robot is out of scope.',
    inputtype:'value',
  },
  pve_hpstable:{
    func_name:'PVE_HPS_TABLE',
    value:'healer',
    disp_tab:'PvE-setting',
    title_ja:'HPSテーブルを表示する (PvE)',
    title_en:'Show HPS table (PvE)',
    description_ja:'選択したロールをHPSテーブルに表示する。複数選択可',
    description_en:"Show the selected roles in the HPS table. Multiple selections allowed.",
    option: [{value:'no select',text:'Hide'},{value:'healer',text:'Healer'},{value:'tank',text:'Tank'},{value:'melee',text:'Melee'},{value:'physical',text:'Physical'},{value:'magical',text:'Magical'}],
    inputtype:'pulldown',
    inputtypeoption:'multiple'
  },
  rw_act_compatible:{
    func_name:'GORGE_ACT_Compatible_Mode',
    value:false,
    disp_tab:'RW-setting',
    title_ja:'未実装：データ参照元をACT準拠にする (RW)',
    title_en:'Not Working : Make the data source ACT compliant (RW)',
    description_ja:'オーバーレイ表示に使うデータの参照元を切り替える。バグってるときに。',
    description_en:"Switch the referrer of the data used for overlay display. For when it's buggy.",
    inputtype:'toggle',
  },
  rw_party_priorty:{
    func_name:'RW_PARTYPRIORITY',
    value:true,
    disp_tab:'RW-setting',
    title_ja:'パーティメンバーの優先表示 (RW)',
    title_en:'Priority display of party members (RW)',
    description_ja:'パーティメンバーが最大表示行数外だった場合に優先表示を行う。',
    description_en:"If a party member is outside the maximum number of lines to be displayed, priority is displayed.",
    inputtype:'toggle',
  },
  rw_simulation_kill:{
    func_name:'G_SIMULATION_KILL',
    value:true,
    disp_tab:'RW-setting',
    title_ja:'OverlayでシミュレーションしたK/Dを用いる (RW)',
    title_en:'Using K/D simulated by Overlay  (RW)',
    description_ja:'DoTダメージや列車死等によるキルが反映されます。精度低め。',
    description_en:"Kills due to DoT damage, train deaths, etc. are reflected. Low accuracy.",
    inputtype:'toggle',
  },
  rw_party_color_background:{
    func_name:'RW_PARTY_COLOR_BACKGROUND',
    value:true,
    disp_tab:'RW-setting',
    title_ja:'パーティメンバーの背景を塗りつぶす (RW)',
    title_en:'Fill in the background of party members (RW)',
    description_ja:'パーティメンバーの背景を塗りつぶして見やすくします。',
    description_en:"Fill in the background of the party members to make them easier to see.",
    inputtype:'toggle',
  },
  fl_party_color_background:{
    func_name:'FL_PARTY_COLOR_BACKGROUND',
    value:false,
    disp_tab:'FL-setting',
    title_ja:'パーティメンバーの背景を塗りつぶす (FL)',
    title_en:'Fill in the background of party members (FL)',
    description_ja:'パーティメンバーの背景を塗りつぶして見やすくします。',
    description_en:"Fill in the background of the party members to make them easier to see.",
    inputtype:'toggle',
  },
  rw_killsound:{
    func_name:'KILLSOUND',
    value:false,
    disp_tab:'RW-setting',
    title_ja:'Killに音を鳴らす (RW)',
    title_en:'Sound to Kill (RW)',
    description_ja:'テンションマックス以降の自アラキルに音を再生する。',
    description_en:"Play sound to kill after tension max.",
    inputtype:'toggle',
  },
  rw_killsound_path:{
    func_name:'KILLSOUND_PATH',
    value:'https://takoyaki313.github.io/Gorge-Overlay/sound/zyaki.wav',
    disp_tab:'RW-setting',
    title_ja:'再生するファイル (RW)',
    title_en:'Files to be play (RW)',
    description_ja:'ローカルのファイルは設定できません。',
    description_en:"Local files cannot be set.",
    inputtype:'textbox',
  },
  rw_killsound_volume:{
    func_name:'KILLSOUND_VOLUME',
    value:30,
    disp_tab:'RW-setting',
    title_ja:'キルサウンドの音量 (RW)',
    title_en:'Kill sound volume (RW)',
    description_ja:'キルサウンドの音量を指定する。',
    description_en:"Specifies the volume of the kill sound.",
    inputtype:'slider',
  },
  rw_extend:{
    func_name:'RW_EXTEND',
    value:'party',
    disp_tab:'RW-setting',
    title_ja:'自動で詳細モード表示する対象 (RW)',
    title_en:'Automatically display target in detail mode (RW)',
    description_ja:'選択した対象を詳細モードで表示する。',
    description_en:"Display the selected target in detail mode.",
    option: [{value:'ally',text:'Aliance'},{value:'near',text:'Near player'},{value:'party',text:'Party'},{value:'me',text:'Myself Only',}],
    inputtype:'pulldown',
    inputtypeoption:null
  },
  rw_around:{
    func_name:'RW_AROUND_ONLY',
    value:true,
    disp_tab:'RW-setting',
    title_ja:'周囲に居る味方のみオーバーレイに表示 (RW)',
    title_en:'Only allies in the vicinity are shown in the overlay (RW)',
    description_ja:'周囲に居る味方を表示し、遠くにいる味方を非表示にする。',
    description_en:"Shows allies around you and hides allies in the distance.",
    inputtype:'toggle',
  },
  rw_result:{
    func_name:'RW_RESULT_SHOW',
    value:true,
    disp_tab:'RW-setting',
    title_ja:'試合終了後に味方全てのデータをオーバーレイに表示する (RW)',
    title_en:"Display all allies' data in an overlay after a fights (RW)",
    description_ja:'最大表示行数や周囲の味方のみ表示の制限を無視してすべて表示する。',
    description_en:"Display all of them, ignoring the maximum number of display lines and the limit of displaying only allies around you.",
    inputtype:'toggle',
  },
  force_log_off:{
    func_name:'FORCE_LOG_OFF',
    value:false,
    disp_tab:'Other',
    title_ja:'ACTから受け取ったLog_Lineを無視する。',
    title_en:"Debug only",
    description_ja:'デバッグ用',
    description_en:"null",
    inputtype:'toggle',
  },
  other_debug_log:{
    func_name:'DEBUG_LOG',
    value:false,
    disp_tab:'Other',
    title_ja:'処理におけるログをコンソールに表示する。',
    title_en:"Debug only",
    description_ja:'デバッグ用',
    description_en:"null",
    inputtype:'toggle',
  },
  other_debug_processtime:{
    func_name:'Process_time_console',
    value:false,
    disp_tab:'Other',
    title_ja:'計算にかかった時間をコンソールに表示する。',
    title_en:"Debug only",
    description_ja:'デバッグ用',
    description_en:"null",
    inputtype:'toggle',
  },
  other_debug_assist_debuff_reset:{
    func_name:'Assist_Debuff_Reset',
    value:true,
    disp_tab:'Other',
    title_ja:'アシストの対象として、デバフがかかった敵のリセットを行う。',
    title_en:"Debug only",
    description_ja:'デバッグ用',
    description_en:"null",
    inputtype:'toggle',
  },
  other_debug_hp_data_duplite:{
    func_name:'HP_Update_duplite_data',
    value:true,
    disp_tab:'Other',
    title_ja:'HPデータの更新に同一タイムスタンプのデータを含める。',
    title_en:"Debug only",
    description_ja:'デバッグ用',
    description_en:"null",
    inputtype:'toggle',
  },
  other_debug_hp_data_duplite_robrideprocess:{
    func_name:'HP_Update_duplite_robride_process',
    value:false,
    disp_tab:'Other',
    title_ja:'重複したタイムスタンプのデータを含めた場合、重複データに対してロボの搭乗確認を行う。',
    title_en:"Debug only",
    description_ja:'デバッグ用',
    description_en:"null",
    inputtype:'toggle',
  },
  Barrier_incomeheal:{
    func_name:'Barrier_incomeheal',
    value:true,
    disp_tab:'Other',
    title_ja:'バリアを被ヒールの計算に含める。',
    title_en:"Debug only",
    description_ja:'デバッグ用',
    description_en:"null",
    inputtype:'toggle',
  },
  dev_mode:{
    func_name:'Dev_mode',
    value:false,
    disp_tab:'Other',
    title_ja:'テストモード',
    title_en:"Test Mode",
    description_ja:'個人用',
    description_en:"null",
    inputtype:'toggle',
  },
  data_reset:{
    func_name:'data_reset',
    value:false,
    disp_tab:'general',
    title_ja:'設定をリセットする。',
    title_en:"Reset settings",
    description_ja:'ローカルに保存された設定データを削除する。',
    description_en:"Delete locally saved configuration data.",
    inputtype:'toggle',
  },
  onlinemode:{
    func_name:'ONLINE',
    value:true,
    disp_tab:'null',
    title_ja:'設定のhtmlをローカル参照にする。',
    title_en:"Reset settings",
    description_ja:'デバッグ用。設定が開かなくなります。',
    description_en:"Delete locally saved configuration data.",
    inputtype:'toggle',
  },
  cc_simulation_kill:{
    func_name:'CC_Simulation_kill',
    value:true,
    disp_tab:'CC-setting',
    title_ja:'OverlayでシミュレーションしたK/Dを用いる (CC)',
    title_en:'Using K/D simulated by Overlay  (CC)',
    description_ja:'DoTダメージや列車死等によるキルが反映されます。精度低め。',
    description_en:"Kills due to DoT damage, train deaths, etc. are reflected. Low accuracy.",
    inputtype:'toggle',
  },
  C_Ally_team_display:{
    func_name:'Ally_team_display',
    value:true,
    disp_tab:'CC-setting',
    title_ja:'味方のDPS表を表示',
    title_en:"Display the DPS table of allies",
    description_ja:'味方個人のDPSテーブルを表示する。',
    description_en:"Display the DPS table for an individual ally.",
    inputtype:'toggle',
  },
  C_Ally_team_matome:{
    func_name:'Ally_team_matome',
    value:true,
    disp_tab:'CC-setting',
    title_ja:'味方チームの合計値を表示',
    title_en:"Displays the total value of allied teams",
    description_ja:'味方チームのDPS/HPS/Kill/Deathをまとめたものを表示する。',
    description_en:"Display a summary of the allied team's DPS/HPS/Kill/Death.",
    inputtype:'toggle',
  },
  C_enemy_team_display:{
    func_name:'Enemy_team_display',
    value:true,
    disp_tab:'CC-setting',
    title_ja:'敵のDPS表を表示',
    title_en:"Display enemy DPS table",
    description_ja:'敵個人のDPSテーブルを表示する。',
    description_en:"Display the DPS table for individual enemies.",
    inputtype:'toggle',
  },
  C_enemy_team_matome:{
    func_name:'Enemy_team_matome',
    value:true,
    disp_tab:'CC-setting',
    title_ja:'敵チームの合計値を表示',
    title_en:"Displays the total value of the enemy teams",
    description_ja:'敵チームのDPS/HPS/Kill/Deathをまとめたものを表示する。',
    description_en:"Display a summary of the enemy team's DPS/HPS/Kill/Death.",
    inputtype:'toggle',
  },
  cc_death_too_much:{
    func_name:'CC_Death_Too_Much',
    value:5,
    disp_tab:'CC-setting',
    min_value:1,
    max_value:99,
    title_ja:'Downしすぎた人を協調表示する。（CC）',
    title_en:'Maximum number of rows displayed (CC)',
    description_ja:'一定回数以上死んだ人を協調表示する。',
    description_en:'Coordinated display of people who have died more than a certain number of times.',
    inputtype:'value',
  },
  lb_int_fontsize:{
    func_name:'LB_Font_Size',
    value:18,
    disp_tab:'Other',
    min_value:1,
    max_value:99,
    title_ja:'数値LBのフォントサイズ',
    title_en:'LB',
    description_ja:'別オーバレイ「LBInt」のフォントサイズを変更する。リロード必要',
    description_en:'not yet',
    inputtype:'value',
  },
  VERSION:{
    func_name:null,
    value:'Gorge-overlay3 Rev.21.2',
    title_ja:'Version : ',
    title_en:'Version : ',
    description_ja:'',
    description_en:'',
    inputtype:null,
  }
};
function version_check(grobal_apply){
  let data = {};
  if(localStorage.getItem(Storage_name) === null){
    data = localstorage_defalt();
    localstorage_disksave(data);
  }
  else{
    let saved = JSON.parse(localStorage.getItem(Storage_name));
    data = saved;
    if(saved.VERSION === Localstorage_dictionary.VERSION.value){
      //console.log('Version match!');
      //localstorage_restore();
    }
    else{
      console.log('New update');
      let updated_data = localstorage_update(saved);
      //save
      data = updated_data;
      localstorage_disksave(updated_data);
      //localstorage_restore();
    }
  }
  localstorage_to_grobal(data,grobal_apply);
  font_size_change();
  audio_set(false,KILLSOUND_VOLUME);
}
function audio_set(play,volume){
  KILLSOUND_PLAY = new Audio(KILLSOUND_PATH);
  KILLSOUND_PLAY.volume = volume/100;
  if(play){
    killsound_play();
  }
}
function killsound_play(){
  KILLSOUND_PLAY.play();
}
function localstorage_defalt(){
  let array = Object.keys(Localstorage_dictionary);
  let storage_data = {};
  for(let i = 0 ; i < array.length ; i++){
    storage_data[array[i]] = Localstorage_dictionary[array[i]].value;
  }
  return storage_data;
}
function localstorage_reset(){
  localstorage_disksave(localstorage_defalt());
  window.setTimeout(function(){
    window.location.reload(false);
  }, 100);
}
function localstorage_update(old){
  let default_local = localstorage_defalt();
  let new_data = {};
  let default_array = Object.keys(default_local);
  for(let i = 0 ; i <default_array.length ; i++){
    let key = default_array[i];
    if(typeof old[key] !== 'undefined'){
      new_data[key] = old[key];
    }
    else {
      new_data[key] = default_local[key];
    }
    if(key === 'VERSION'){
      console.log(default_local[key]);
      new_data[key] = default_local[key];
    }
  }
  return new_data;
}
function localstorage_disksave(data){
  let json = JSON.stringify(data);
  localStorage.setItem(Storage_name,json);
}
function localstorage_to_grobal(data,global_apply){
  if(data.VERSION !== Localstorage_dictionary.VERSION.value){
    console.error('Error : Localstorage is broken. Force changed to default value');
    data = localstorage_defalt();
    localstorage_disksave(data);
  }
  let array = Object.keys(Localstorage_dictionary);
  for(let i = 0 ; i < array.length ; i++){
    if(typeof Localstorage_dictionary[array[i]].value === 'number'){
          window[Localstorage_dictionary[array[i]].func_name] = Number(data[array[i]]);
    }else {
          window[Localstorage_dictionary[array[i]].func_name] = data[array[i]];
    }
    //console.log(Localstorage_dictionary[array[i]].func_name + '<-' + data[array[i]]);
  }
  if(global_apply){
    localstorage_to_global_link_object();
  }
}
function localstorage_key_save(key,value){
  let saved = JSON.parse(localStorage.getItem(Storage_name));
  saved[key] = value;
  localstorage_disksave(saved);
  localstorage_to_grobal(saved);
}
function localstorage_to_global_link_object(){
  PRIMARY_PLAYER.ACT_NAME = ACT_NAME;
  Lang_select = Lang_text[Language];
  font_size_change();
}
function font_size_change(){
  $('html').css('font-size',Font_Size +'px');
}
