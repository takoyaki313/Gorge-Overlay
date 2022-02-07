var Language = 'ja';
$(function() {
  version_check(false);
  let localdata = JSON.parse(localStorage.getItem(Storage_name));
  $("#version").text(localdata.VERSION);
  generate_settingpage('general',localdata);
});
function generate_settingpage(type,data){
  let local_keyname = Object.keys(Localstorage_dictionary);
  $("#navi-" + type).prop('checked',true);
  let setting_container = $('#main-setting').clone();
  setting_container.html('');
  let template_value = $("#s-numberbox");
  let template_textbox = $("#s-textbox");
  let template_pulldown = $("#s-pulldown");
  let template_toggle = $("#s-toggle");
  for(let i = 0 ; i < local_keyname.length ; i++){
    if(Localstorage_dictionary[local_keyname[i]].disp_tab === type){
      let create = '';
      let key = local_keyname[i];
      if(Localstorage_dictionary[key].inputtype === 'textbox'){
        create = template_textbox.clone();
        create.find(".s-title").text(Localstorage_dictionary[key]['title_' + Language]);
        create.find(".s-description").text(Localstorage_dictionary[key]['description_' + Language]);
        create.find(".inputarea").attr('id','set-' +key);
        create.find(".inputarea").val(data[key]);
      }else if (Localstorage_dictionary[key].inputtype === 'value') {
        create = template_value.clone();
        create.find(".s-title").text(Localstorage_dictionary[key]['title_' + Language]);
        create.find(".s-description").text(Localstorage_dictionary[key]['description_' + Language]);
        create.find(".inputarea").attr('id','set-' +key);
        create.find(".inputarea").val(data[key]);
      }
      else if (Localstorage_dictionary[key].inputtype === 'pulldown') {
        create = template_pulldown.clone();
        create.find(".s-title").text(Localstorage_dictionary[key]['title_' + Language]);
        create.find(".s-description").text(Localstorage_dictionary[key]['description_' + Language]);
        let option = Localstorage_dictionary[key].option;
        let replacehtml = '';
        for(let i = 0 ; i < option.length ; i++){
          replacehtml += '<option value="' + option[i].value + '">' + option[i].text + '</option>';
        }
        create.find(".option_c").attr('id','set-' + key);
        if(Localstorage_dictionary[key].inputtypeoption === 'multiple'){
          create.find(".option_c").attr('multiple','multiple');
        }
        create.find(".option_c").html(replacehtml);
        create.find(".option_c").val(data[key]);
      }
      else if (Localstorage_dictionary[key].inputtype === 'toggle') {
        create = template_toggle.clone();
        create.find(".s-title").text(Localstorage_dictionary[key]['title_' + Language]);
        create.find(".s-description").text(Localstorage_dictionary[key]['description_' + Language]);
        if(data[key]){
          create.find('.toggle').prop('checked',true);
        }else {
          create.find('.toggle').prop('checked',false);
        }
        create.find('.toggle').attr('id','prp-' + key);
      }
      setting_container.append(create);
    }
  }
  $('#main-setting').replaceWith(setting_container);
}
$(document).on("change", "[id^=set-]", function(t){
  let select_id = t.currentTarget.id;
  localstorage_key_save(select_id.slice(4,),$(this).val());
});
$(document).on("change", "[id^=prp-]", function(t){
  let select_id = t.currentTarget.id;
  localstorage_key_save(select_id.slice(4,),$(this).prop('checked'));
});
$(document).on("change", "[id^=navi-]", function(t){
  let select_id = t.currentTarget.id;
  let localdata = JSON.parse(localStorage.getItem(Storage_name));
  generate_settingpage(select_id.slice(5,),localdata);
});
