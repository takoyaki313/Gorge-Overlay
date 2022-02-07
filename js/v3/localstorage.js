let Storage_name = 'Gorge-Overlay3';
var Font_Size = 16;
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
    title_en:'The name you set in ACT.',
    description_ja:'ACTからのデータを使う部分（PvEと互換モード）において、自分の背景変更に必要です。',
    description_en:'This is needed to change your background in the part that uses data from ACT (PvE and compatibility mode).',
    inputtype:'textbox',
  },
  replace_act_name:{
    func_name:'G_REPLACE_ACTNAME',
    value:true,
    disp_tab:'general',
    title_ja:'自分をACTで設定した名前に置き換える',
    title_en:'Replace yourself with the name you set in ACT.',
    description_ja:'一部オーバーレイにおいて、名前をACTで設定したものに置き換えます。',
    description_en:'In some overlays, replace the name with the one set in ACT.',
    inputtype:'toggle',
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
    title_en:'Only allies in the vicinity are shown in the overlay. (FL)',
    description_ja:'周囲に居る味方を表示し、遠くにいる味方を非表示にする。',
    description_en:"Shows allies around you and hides allies in the distance.",
    inputtype:'toggle',
  },
  fl_result:{
    func_name:'FL_RESULT_SHOW',
    value:true,
    disp_tab:'FL-setting',
    title_ja:'試合終了後に味方全てのデータをオーバーレイに表示する (FL)',
    title_en:"Display all allies' data in an overlay after a fights. (FL)",
    description_ja:'最大表示行数や周囲の味方のみ表示の制限を無視してすべて表示する。',
    description_en:"Display all of them, ignoring the maximum number of display lines and the limit of displaying only allies around you.",
    inputtype:'toggle',
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
    title_en:'Only allies in the vicinity are shown in the overlay. (RW)',
    description_ja:'周囲に居る味方を表示し、遠くにいる味方を非表示にする。',
    description_en:"Shows allies around you and hides allies in the distance.",
    inputtype:'toggle',
  },
  rw_result:{
    func_name:'RW_RESULT_SHOW',
    value:true,
    disp_tab:'RW-setting',
    title_ja:'試合終了後に味方全てのデータをオーバーレイに表示する (RW)',
    title_en:"Display all allies' data in an overlay after a fights. (RW)",
    description_ja:'最大表示行数や周囲の味方のみ表示の制限を無視してすべて表示する。',
    description_en:"Display all of them, ignoring the maximum number of display lines and the limit of displaying only allies around you.",
    inputtype:'toggle',
  },
  other_debug_log:{
    func_name:'DEBUG_LOG',
    value:false,
    disp_tab:'Other',
    title_ja:'処理におけるログをコンソールに表示する。',
    title_en:"null",
    description_ja:'デバッグ用',
    description_en:"null",
    inputtype:'toggle',
  },
  other_debug_processtime:{
    func_name:'Process_time_console',
    value:false,
    disp_tab:'Other',
    title_ja:'計算にかかった時間をコンソールに表示する。',
    title_en:"null",
    description_ja:'デバッグ用',
    description_en:"null",
    inputtype:'toggle',
  },
  other_debug_assist_debuff_reset:{
    func_name:'Assist_Debuff_Reset',
    value:true,
    disp_tab:'Other',
    title_ja:'アシストの対象として、デバフがかかった敵のリセットを行う。',
    title_en:"null",
    description_ja:'デバッグ用',
    description_en:"null",
    inputtype:'toggle',
  },
  other_debug_hp_data_duplite:{
    func_name:'HP_Update_duplite_data',
    value:true,
    disp_tab:'Other',
    title_ja:'HPデータの更新に同一タイムスタンプのデータを含める。',
    title_en:"null",
    description_ja:'デバッグ用',
    description_en:"null",
    inputtype:'toggle',
  },
  other_debug_hp_data_duplite_robrideprocess:{
    func_name:'HP_Update_duplite_robride_process',
    value:false,
    disp_tab:'Other',
    title_ja:'重複したタイムスタンプのデータを含めた場合、重複データに対してロボの搭乗確認を行う。',
    title_en:"null",
    description_ja:'デバッグ用',
    description_en:"null",
    inputtype:'toggle',
  },
  VERSION:{
    func_name:null,
    value:'Gorge-overlay Alpha 0.3.3',
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
}

function localstorage_defalt(){
  let array = Object.keys(Localstorage_dictionary);
  let storage_data = {};
  for(let i = 0 ; i < array.length ; i++){
    storage_data[array[i]] = Localstorage_dictionary[array[i]].value;
  }
  return storage_data;
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
