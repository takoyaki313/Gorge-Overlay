////////////////////
//setting
////////////////////
var Target_Player_Only = true;
var Target_Ally_Only = true;
var PvP_Area_Only = true;
////////////////////
var Temp = null;
var Overlay_On = true;
////////////////////
$(function (){
  'use strict';
  target_overlay_localstrage_get();
  addOverlayListener('EnmityTargetData', (e) => target_overlay_start(e.Target));
  addOverlayListener('ChangeZone', (zone) => target_overlay_area_check(zone));
  startOverlayEvents();
});
window.addEventListener("storage", function (event) {
  if(event.key === "Gorge-Overlay2"){
    target_overlay_localstrage_get();
  }
});
function target_overlay_localstrage_get(){
  let data = JSON.parse(localStorage.getItem('Gorge-Overlay2'));
  if(data === null){
    target_overlay_fontsize(18);
  }
  else {
    target_overlay_fontsize(data.TARGET_NAME_FONTSIZE);
  }
}
function target_overlay_start(target){
  if(Overlay_On){
    target_overlay_main(target);
  }
  else if (Temp !== null) {
    target_overlay_hide();
    Temp = null;
  }
}
function target_overlay_main(target){
  if(target !== null){
    if(Temp !== target.ID){
      Temp = target.ID;
      //変更あり
      let target_ID = target.ID.toString(16);
      if(Target_Player_Only){
        if(target_ID.substring(0,2) === '10'){
          if(Target_Ally_Only){
            if(true){//パーティチェンジのやつを作ってから
              target_overlay_disp(target.Name);
            }
            else {
              target_overlay_hide();
            }
          }else {
            target_overlay_disp(target.Name);
          }
        }
        else{
          target_overlay_hide();
        }
      }
      else{
        target_overlay_disp(target.Name);
      }
    }
  }
  else {
    Temp = null;
    target_overlay_hide();
  }
}
function target_overlay_disp(targetname){
  $('#namespace').text(targetname);
}
function target_overlay_hide(){
  $('#namespace').text('');
}
function target_overlay_fontsize(size){
  $('#namespace').css('font-size',size);
}


////////////////
function target_overlay_area_check(area){
  if (area.zoneName === 'Hidden Gorge'
  ||area.zoneID == 376
  ||area.zoneName.indexOf('Seal Rock')!== -1
  ||area.zoneID == 554
  ||area.zoneName.indexOf('Onsal Hakair')!== -1
  ||area.zoneName.indexOf('Wolves')!== -1
  ||area.zoneName.indexOf('Astragalos')!== -1
  ||area.zoneName.indexOf('Lichenweed')!== -1
  ||area.zoneName.indexOf('Crystal Tower Training Grounds')!== -1) {
    Overlay_On = true;
  }
  else {
    Overlay_On = false;
    target_overlay_hide();
  }
}
