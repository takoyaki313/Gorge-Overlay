function click_refresh(Data,e){
  console.log(Data);
  console.log(e);
  console.warn(Aliance);
  //console.log(T_Kills);
  var encounter = e.Encounter;
  var template = $('#source li');
  var container = $('#overlay').clone();
  container.html('');
  var header = template.clone();
  var rdps = parseFloat(encounter.encdps);
  // sanity check
  if (!isNaN(rdps) && rdps != Infinity) {
  rdps_max = Math.max(rdps_max, rdps);
  }
  //
  //ヘッダーのデータ挿入
  //
  if (encounter.encdps.length <= 7) {
  header.find('.dps').text(encounter.encdps);
  } else {
  header.find('.dps').text(encounter.ENCDPS);
  }
  header.find('.name').text(encounter.CurrentZoneName);
  if(sort_rule == 0){
    header.find('.job-icon').html('<img src="https://takoyaki313.github.io/Gorge-Overlay/images/glow/pvp.png" width="20px" height="20px" hspace="1px">')
  }
  else if (sort_rule == 1) {
    header.find('.job-icon').html('<img src="https://takoyaki313.github.io/Gorge-Overlay/images/glow/party.png" width="20px" height="20px" hspace="1px">')
  }
  else if (sort_rule == 2) {
    header.find('.job-icon').text('K');
    header.find('.job-icon').css('width',20);
  }
  else if (sort_rule == 3) {
    header.find('.job-icon').text('D');
    header.find('.job-icon').css('width',20);
  }
  header.find('.data1').css('width',0);
  header.find('.data2').css('width',0);
  header.find('.data3').text(encounter.duration);
  header.find('.bar').css('width', ((rdps / rdps_max) * 100) + '%');
  // set inactive
  if (!e.isActive) {
  rdps_max = 0;
  $('body').addClass('inactive');
  } else {
  $('body').removeClass('inactive');
  }

  header.addClass('aliance0');

  container.append(header);
  //
  //ヘッダーの処理終了
  //
  var maxdps = false;
  var GorgeData = Data;

  GorgeData.sort((a,b) => {
      return(b[1] - a[1])
  })
  if(GorgeData.length > 0){
    maxdps = GorgeData[0][1];
  }
  if(sort_rule == 1){
    GorgeData.sort((a,b) => {
        return(a[7] - b[7])
    })
  }
  if(sort_rule == 2){
    GorgeData.sort((a,b) => {
        return(b[5] - a[5])
    })
  }
  else if(sort_rule == 3){
    GorgeData.sort((a,b) => {
        return(b[4] - a[4])
    })
  }

  //
  //プレイヤーのデータを追加していく
  //

  for(var i = 0; i < DispMax && i < GorgeData.length; i++){
    var row = template.clone();


    var Dps = GorgeData[i][1];
    for (var q = 0; q < team.length; q++) {
      if(GorgeData[i][0] == team [q]){
        row.addClass('party');
      }
    }

    if(GorgeData[i][7] == 1){
      row.addClass('aliance1');
      row.addClass('party');
    }
    else if(GorgeData[i][7] == 2){
      row.addClass('aliance2');
    }
    else if(GorgeData[i][7] == 3){
      row.addClass('aliance3');
    }
    else if(GorgeData[i][7] == 4){
      row.addClass('aliance4');
    }
    else if(GorgeData[i][7] == 5){
      row.addClass('aliance5');
    }
    else if(GorgeData[i][7] == 6){
      row.addClass('aliance6');
    }
    if (GorgeData[i][0] == myname) {
    row.addClass('me');
    }
    row.find('.dps').text(Dps.toFixed(2));
    row.find('.name').text(GorgeData[i][0]);
    if(GorgeData[i][2] !== ''){
      row.find('.job-icon').html('<img src="https://takoyaki313.github.io/Gorge-Overlay/images/glow/' + GorgeData[i][2].toLowerCase() + '.png"  width="20px" onerror="$(this).attr(\'src\', \'https://takoyaki313.github.io/Gorge-Overlay/images/error.png\');">');
    }
    else{
      row.find('.job-icon').html('<img src="https://takoyaki313.github.io/Gorge-Overlay/images/glow/empty.png"  width="20px" onerror="$(this).attr(\'src\', \'https://takoyaki313.github.io/Gorge-Overlay/images/error.png\');">');
    }
    row.find('.data1').css('width', 0);
    row.find('.number').css('width', 70);
    row.find('.data2').css('font-size', 15);
    row.find('.data3').css('font-size', 15);
    row.find('.data2').text('K:'+ GorgeData[i][5]);
    row.find('.data3').text('D:'+ GorgeData[i][4]);
    row.find('.bar').css('width', ((parseFloat(GorgeData[i][1]) / maxdps) * 100) + '%');
    row.find('.Robot').css('height',0);
    if(GorgeData[i][6].length > 0){
      row.find('.robotdps').text('+' + GorgeData[i][8]);
      row.find('.bar').css('width',0);
      row.find('.bar').css('height',18);
      row.find('.Robot').css('height',18);
      row.find('.Robot').css('width',GorgeData[i][6].length/3 * 17);
      row.find('.Robot').html(RoborImage(GorgeData[i][6]));
    }
    //console.log(GorgeData);
    container.append(row);
  }


  $('#overlay').replaceWith(container);
}
