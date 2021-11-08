$(function() {
"use strict";
  version_check();
  COLOR_DATA = color_data_local_load(LOCAL_SAVE_NAME);
  overlay_css_append(COLOR_DATA);
  addOverlayListener('ChangeZone', (zone) => area_check(zone));
  addOverlayListener("LogLine", (log) => logline_start(log.line));
  if(TEST_MODE){
    addOverlayListener("ImportedLogLines", (log) => import_log_division(log.logLines));
  }
  addOverlayListener("ChangePrimaryPlayer",(MyName) =>{
    MYCHARACTOR_ID = MyName.charID.toString(16);
    MYCHARACTOR_NAME = MyName.charName;
    let party_data = ['300',MYCHARACTOR_ID,MYCHARACTOR_NAME,1];
    if(TEST_MODE){
      console.log(MyName);
    }
    logline_start(party_data);
  });
  addOverlayListener('PartyChanged', (p) => party(p.party));
  addOverlayListener("CombatData", (e) => overlay_update_start(e));
  startOverlayEvents();
  setInterval(calc,1000);
  //sample_data();
  //let array_data = ['Takoyaki',3,1];
  //let array_object = ['name','kills','death'];
  //main_data_push_update('nameID','101020AF',array_object,array_data);
});
$(document).on("click", "#button-4", function(){
  $('#overlay').css('display','none');
  $('.header').css('display','none');
  $('.set-data').css('display','flex');
  COLOR_DATA = color_data_local_load(LOCAL_SAVE_NAME);
  overlay_css_append(COLOR_DATA);
  $('body').css('background-color','rgb(38 38 38)');
  localstorage_restore();
});//click button-4 end (setting-button)
//click button-5 start (setting-button-close)
$(document).on("click", "#button-5", function(){
  $('#overlay').css('display','flex');
  $('.header').css('display','flex');
  $('.set-data').css('display','none');
  COLOR_DATA = color_data_local_load(LOCAL_SAVE_NAME);
  overlay_css_append(COLOR_DATA);
  localstorage_save();
});//click button-5 end (setting-button-close)
//  DispMax= $('#p-max').val();
//Disappearance//$("#setting-item-3").prop("checked") == true
//click button-5 start (setting-button-close)
//$('#p-max').val(Number(DispMax));
$(document).on("click", "#setting-item-110-2", function(){
  //volume button
  localstorage_save();
  if(KILLSOUND){
    KILLSOUND_PLAY.play();
  }
});//click end volume )
$(document).on("click", "#button-2", function(){
  //timet button
  console.log('button2');
  battle_counter();
});//click button-2 end (timer button )
$(document).on("click", "#setting-item-9", function(){
  localstorage_defalt();
  });//click button-5 end (setting-button-close)
$(document).on("click", "#setting-item-8-2", function(){
  localstorage_save();
  dammy();
  gorge_overlay_update_process($('#gorge-source li'));
  if(KILLSOUND){
    KILLSOUND_PLAY.play();
  }
  });//click button-5 end (setting-button-close)
