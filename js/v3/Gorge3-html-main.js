function bar_create(...data){
  //data [125123,incomedamage-robot]
  let sum = 0;
  let new_data = [];
  for(let i = 0 ; i < data.length ; i++){
    if(typeof data[i][0] === 'number' && data[i][0] > 0){
      new_data.push(data[i]);
      sum += data[i][0];
    }
  }
  let return_data = '';
  for(let i = 0 ; i < new_data.length ; i++){
    let percent = new_data[i][0] / sum * 100;
    return_data += '<div class="' + new_data[i][1] + '" style="width: ' + percent + '%;"></div>';
  }
  return return_data;
}
function tooltip_title_create(...data){
  let string = '';
  for(let i = 0 ; i < data.length ; i ++){
    if(data[i][1] === undefined ||data[i][1] === 0){

    }
    else {
      string = string + data[i][0] + data[i][1] + '<br/>';
    }
  }
  return string;
}
function dunamis_detect(dunamis){
  if(typeof dunamis === 'number'){
    return 'dunamis_tensyon' + dunamis;
  }else {
    switch (dunamis) {
      case '0853':
        return 'dunamis_kouyou1';
      case '0854':
        return 'dunamis_kouyou2';
      case '0855':
        return 'dunamis_kouyou3';
      case '0856':
        return 'dunamis_kouyou4';
      case '0857':
        return 'dunamis_kouyou5';
      case '06C2':
        return 'dunamis_tensyon20';
      default:
        return '';
    }
  }
}
function alignment_of_digits(dps){
  dps = dps.toFixed(2);
  switch (dps.length) {
    case 0:
      return 0;
    case 1:
     return dps;
    case 2:
      return dps;
    case 3:
      return dps;
    case 4:
      return dps;
    case 5:
      return dps;
    case 6:
      return dps;
    case 7:
      return dps.substring(0,6);
    case 8:
      return dps.substring(0,5);
    default:
      return dps.substring(0,5) + '...';
  }
}
