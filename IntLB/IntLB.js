////////////////////
//setting
////////////////////
var Overlay_On = true;
////////////////////
$(function (){
  'use strict';
  addOverlayListener('ChangeZone', (zone) => target_overlay_area_check(zone));
  addOverlayListener('LogLine', (logline) => log_start(logline.line));
  startOverlayEvents();
});
function log_start(log){
  if(Overlay_On){
    if(log[0] === '36'){
      LB = parseInt(log[2],16);
      target_overlay_disp(LB);
    }
  }
}
function target_overlay_localstrage_get(){
  let data = JSON.parse(localStorage.getItem('Gorge-Overlay3'));
  if(data === null){
    target_overlay_fontsize(18);
  }
  else {
    target_overlay_fontsize(data.lb_int_fontsize);
  }
}
let LB = 0;

function target_overlay_disp(targetname){
  $('#InTspace').text(targetname);
}
function target_overlay_hide(){
  $('#InTspace').text('');
}
function LB_overlay_fontsize(size){
  $('#InTspace').css('font-size',size);
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
  ||area.zoneName.indexOf('Crystal Tower Training Grounds')!== -1
  ||area.zoneID == 1032
  ||area.zoneID == 1033
  ||area.zoneID == 1034) {
    Overlay_On = true;
    target_overlay_disp(LB);
  }
  else {
    Overlay_On = false;
    target_overlay_hide();
  }
}
