var Setting_Page_Num = 1;
var Sample_Page_Num = 3;
var ONLINE = true;
var Dev_mode = false;
var Calc_interval = 1000;

$(function () {
  'use strict';
  //database_version_store(DB);
  logline_battle_flag_reset();
  reset_TBD();
  //DB.Player_hp.clear();
  $(document).tooltip({
    content: function () {
      return $(this).attr('title');
    },
    show: false
  });
  /////////////////////////////////////////////////////////
  addOverlayListener('LogLine', (logline) => {
    if (!FORCE_LOG_OFF) {
      log_queue_insert(logline.line);
    }
  });
  /*
  addOverlayListener('ImportedLogLines', (log) => {
    import_log_division(log.logLines);
  });*/
  addOverlayListener('ChangeZone', (zone) => area_check(zone));
  /*
  addOverlayListener('EnmityTargetData', (e) => {
    console.log(e);
  });
  addOverlayListener('EnmityAggroList', (aggro) =>{
    console.log(aggro);
  });
  */
  addOverlayListener("CombatData", (e) => overlay_update_start(e));
  addOverlayListener('PartyChanged', (p) => party_data_exchange(p.party));
  addOverlayListener("ChangePrimaryPlayer", (myname) => primary_player(myname));
  DoT_ID_Array = object_to_array(DoT_ID, 'dotid');
  Unique_DoT_ID_Array = object_to_array(Unique_DoT, 'id');
  Barrier_ID_Array = object_to_array(Barrier_ID, 'dotid');
  Special_Barrier_ID_Array_Skill = object_to_array(Special_Barrier_ID, 'actionid');
  Special_Barrier_ID_Array_Dot = object_to_array(Special_Barrier_ID, 'dotid');
  EFFECT_ID_LIST = Object.keys(EFFECT_ID);
  version_check(true);
  startOverlayEvents();
  setInterval(calc, Calc_interval);
  if (Dev_mode) {
    connectBC(true);
  }
});
$(document).on("click", "[id^=Overlay_]", function (t) {
  let select_id = t.currentTarget.id;
  let click_name = select_id.slice(8, select_id.length - 2);
  let type = select_id.slice(select_id.length - 2);
  let target = $(this);
  if (type === 'on') {
    target.find('.f-hide').css('display', 'none');
    target.find('.f-job-icon').addClass('underline-text');
    target.find('.g-hide').css('display', 'none');
    target.find('.g-job-icon').addClass('underline-text');
    target.attr('id', 'Overlay_' + click_name + 'of');
    Overlay_Select[click_name] = { click: true, extend: false };
  }
  else {
    target.find('.f-hide').css('display', 'flex');
    target.find('.f-job-icon').addClass('underline-text');
    target.find('.g-hide').css('display', 'flex');
    target.find('.g-job-icon').addClass('underline-text');
    target.attr('id', 'Overlay_' + click_name + 'on');
    Overlay_Select[click_name] = { click: true, extend: true };
  }
  if (t.detail % 2 === 0) {
    target.find('.f-job-icon').removeClass('underline-text');
    target.find('.g-job-icon').removeClass('underline-text');
    delete Overlay_Select[click_name];
  }
});

$(document).on("click", "#mypage-icon-open", function (t) {
  if (Dev_mode) {
    if (ONLINE) {
      //window.open( 'https://takoyaki313.github.io/Gorge-Overlay/G3-Setting.html' ,'',"width=1080,height=840" );
    } else {
      window.open('GorgeOverlay_DebugTool.html', '', "width=1080,height=840");
    }
  }
  else if (t.detail === Sample_Page_Num) {
    if (LOGLINE_ENCOUNTER.Engage || LOGLINE_ENCOUNTER.Result_Page) {
      fl_start();
      ALLDISPLAY = false;
    } else {
      sample_gorge_overlay(RW_MAXROW);
    }
  }
});

$(document).on("click", "#setting-open", function (t) {
  let num = Math.max(1, Math.min(10, Setting_Page_Num));
  if (t.detail === num) {
    if (ONLINE) {
      window.open('https://takoyaki313.github.io/Gorge-Overlay/G3-Setting.html', '', "width=1080,height=840");
    } else {
      window.open('G3-Setting.html', '', "width=1080,height=840");
    }
  }
});

$(document).on("click", ".header-areaname", function (t) {
  if (Dev_mode) {
    sendBC(TBD);
  }
});

window.addEventListener("storage", function (event) {
  if (event.key === Storage_name) {
    version_check(true);
  }
});
