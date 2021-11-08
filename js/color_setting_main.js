$(document).on("click", "#color-reset", function(){
  let reset = window.confirm('色データをResetしますか？');
  if(reset){
    let data = default_color_data();
    color_data_display_write(data);
    color_sample_display(data);
    color_data_json_out(data);
    overlay_css_append(data);
    color_data_local_save(data,LOCAL_SAVE_NAME);
  }
});//click button-2 end (timer button )
$(document).on("click", "#color-import", function(){
  let data = color_data_json_import();
  color_sample_display(data);
  color_data_display_write(data);
  color_data_json_out(data);
  window.alert('import');
  color_data_local_save(data,LOCAL_SAVE_NAME);
  let select_type = $('input[name="sample-data-type"]:checked').val();
  if(select_type === 'RW'){
    gorge_overlay_update_process($("#source li"));
  }
  else if (select_type === 'FL') {
    fl_overlay_update(sample_encounter_data());
  }
  else if (select_type === 'PvE') {
    pve_overlay_update(sample_encounter_data());
  }
  overlay_css_append(data);

});//click button-2 end (timer button )
$(document).on("change","input[type='text']",function(){
  let data = color_data_listen();
  color_sample_display(data);
  color_data_json_out(data);
  color_data_local_save(data,LOCAL_SAVE_NAME);
  let select_type = $('input[name="sample-data-type"]:checked').val();
  if(select_type === 'RW'){
    gorge_overlay_update_process($("#source li"));
  }
  else if (select_type === 'FL') {
    fl_overlay_update(sample_encounter_data());
  }
  else if (select_type === 'PvE') {
    pve_overlay_update(sample_encounter_data());
  }
  overlay_css_append(data);
});
$(document).on("click","input[name='sample-data-type']",function(){
  let select_type = $('input[name="sample-data-type"]:checked').val();
  console.log(select_type);
  let local_data = color_data_local_load(LOCAL_SAVE_NAME);
  dammy();
  if(select_type === 'RW'){
    $("#source").load("https://takoyaki313.github.io/Gorge-Overlay/Test-module.html #gorge-source", function(gorge_source) {
    if(gorge_source == null){
    $("#source").append("読込みに失敗しました");
    console.log('Failed...');
    }
    else{
      $('.fl').css('display','none');
      $('.pve').css('display','none');
      $('.rw').css('display','flex');
      gorge_overlay_update_process($("#source li"));
      overlay_css_append(local_data);
    }
    });
  }
  else if (select_type === 'FL') {
    $("#source").load("https://takoyaki313.github.io/Gorge-Overlay/Test-module.html #fl-source", function(fl_source) {
    if(fl_source == null){
    $("#source").append("読込みに失敗しました");
    console.log('Failed...');
    }
    else{
      $('.rw').css('display','none');
      $('.pve').css('display','none');
      $('.fl').css('display','flex');
      fl_overlay_update(sample_encounter_data());
      overlay_css_append(local_data);
    }
    });
  }
  else if (select_type === 'PvE') {
    $("#source").load("https://takoyaki313.github.io/Gorge-Overlay/Test-module.html #pve-source", function(pve_source) {
    if(pve_source == null){
    $("#source").append("読込みに失敗しました");
    console.log('Failed...');
    }
    else{
      $('.fl').css('display','none');
      $('.rw').css('display','none');
      $('.pve').css('display','flex');
      pve_overlay_update(sample_encounter_data());
      overlay_css_append(local_data);
    }
    });
  }
});
$(function(){
  "use strict";
  localstorage_restore();
  ACT_NAME = 'YOU';
  let local_data = color_data_local_load(LOCAL_SAVE_NAME);
  color_data_display_write(local_data);
  color_sample_display(local_data);
  color_data_json_out(local_data);
  dammy();

  $("input[value = 'RW']").prop('checked',true);
  $('.fl').css('display','none');
  $('.pve').css('display','none');
  $('.rw').css('display','flex');
$("#source").load("https://takoyaki313.github.io/Gorge-Overlay/Test-module.html #gorge-source", function(gorge_source) {
if(gorge_source == null){
$("#source").append("読込みに失敗しました");
console.log('Failed...');
}
else{
  gorge_overlay_update_process($("#source li"));
  overlay_css_append(local_data);
}
});

});
