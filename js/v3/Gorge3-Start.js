$(function (){
  'use strict';
  database_version_store(DB);
  logline_battle_flag_reset();
  DB.Player_hp.clear();
   $( document ).tooltip({
    content: function() {
        return $(this).attr('title');
    }
  });
  /////////////////////////////////////////////////////////
  addOverlayListener('LogLine', (logline) => {
    if(!FORCE_LOF_OFF){
      log_queue_insert(logline.line);
    }
  });
  addOverlayListener('ImportedLogLines', (log) => {
    import_log_division(log.logLines);
  });
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
  addOverlayListener("ChangePrimaryPlayer",(myname) => primary_player(myname));
  DoT_ID_Array = object_to_array(DoT_ID,'dotid');
  Unique_DoT_ID_Array = object_to_array(Unique_DoT,'id');
  EFFECT_ID_LIST = Object.keys(EFFECT_ID);
  version_check(true);
  startOverlayEvents();
  setInterval(calc,1000);
});
$(document).on("click", "[id^=Overlay_]", function(t){
    let select_id = t.currentTarget.id;
    let click_name = select_id.slice(8,select_id.length -2);
    let type = select_id.slice(select_id.length -2);
    let target = $(this);
    if(type === 'on'){
      target.find('.f-hide').css('display','none');
      target.find('.f-job-icon').addClass('underline-text');
      target.attr('id','Overlay_' + click_name + 'of');
      Overlay_Select[click_name] = {click:true,extend:false};
    }
    else {
      target.find('.f-hide').css('display','flex');
      target.find('.f-job-icon').addClass('underline-text');
      target.attr('id','Overlay_' + click_name + 'on');
      Overlay_Select[click_name] = {click:true,extend:true};
    }
    if(t.detail % 2 === 0){
      target.find('.f-job-icon').removeClass('underline-text');
      delete Overlay_Select[click_name];
    }
});
$(document).on("click", "#setting-open", function(t){
  if(t.detail === 3){
    window.open( 'https://takoyaki313.github.io/Gorge-Overlay/G3-Setting.html' );
  }
  else if (t.detail === 10) {
    window.location.reload(false);
  }
});
window.addEventListener("storage", function (event) {
  if(event.key === Storage_name){
    version_check(true);
  }
});
