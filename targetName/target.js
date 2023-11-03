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
const PvPAreaID = [376, 431, 554, 888, 1032, 1058, 1033, 1059, 1034, 1060, 1116, 1117, 250, 717, 791];
$(function () {
  'use strict';
  target_overlay_localstrage_get();
  addOverlayListener('EnmityTargetData', (e) => target_overlay_start(e.Target));
  addOverlayListener('ChangeZone', (zone) => target_overlay_area_check(zone));
  startOverlayEvents();
});
/*
window.addEventListener("storage", function (event) {
  if(event.key === "GorgeOverlay_4"){
    target_overlay_localstrage_get();
  }
});*/

function target_overlay_localstrage_get() {
  let data = JSON.parse(localStorage.getItem('GorgeOverlay_4'));
  if (data === null) {
    target_overlay_fontsize(16);
  }
  else {
    target_overlay_fontsize(data.addInTargetName);
  }
}
function target_overlay_start(target) {
  if (Overlay_On) {
    target_overlay_main(target);
  }
  else if (Temp !== null) {
    target_overlay_hide();
    Temp = null;
  }
}
function target_overlay_main(target) {
  if (target !== null) {
    if (Temp !== target.ID) {
      Temp = target.ID;
      //変更あり
      let target_ID = target.ID.toString(16);
      if (Target_Player_Only) {
        if (target_ID.substring(0, 2) === '10') {
          if (Target_Ally_Only) {
            if (true) {//パーティチェンジのやつを作ってから
              target_overlay_disp(target.Name);
            }
            else {
              target_overlay_hide();
            }
          } else {
            target_overlay_disp(target.Name);
          }
        }
        else {
          target_overlay_hide();
        }
      }
      else {
        target_overlay_disp(target.Name);
      }
    }
  }
  else {
    Temp = null;
    target_overlay_hide();
  }
}
function target_overlay_disp(targetname) {
  $('#namespace').text(targetname);
}
function target_overlay_hide() {
  $('#namespace').text('');
}
function target_overlay_fontsize(size) {
  $('#namespace').css('font-size', size);
}


////////////////
function target_overlay_area_check(area) {
  if (areaID_Array.indexOf(String(area.zoneID)) !== -1) {
    Overlay_On = true;
  }
  else {
    Overlay_On = false;
    target_overlay_hide();
  }
}
