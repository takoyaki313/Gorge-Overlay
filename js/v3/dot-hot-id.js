var DoT_ID = [
  {
    actionid:'229C',
    action_potencial: 400,
    dotid:'052C',
    netdotid:'1F40052C',
    name:'サンダー',
    potencial: 400,
    max : 15,
    type:'DoT'
  },{
    actionid:'229D',
    action_potencial: 2400,
    dotid:'052C',
    netdotid:'1F40052C',
    name:'サンダガ',
    potencial: 400,
    max : 15,
    type:'DoT'
    },{
    actionid:'49F7',
    action_potencial: 200,
    dotid:'081B',
    netdotid:'0FA0081B',
    name:'サンダラ',
    potencial: 200,
    max : 15,
    type:'DoT'
  },{
    actionid:'49F8',
    action_potencial: 1200,
    dotid:'081B',
    netdotid:'0FA0081B',
    name:'サンダジャ',
    potencial: 200,
    max : 15,
    type:'DoT'
  },{
    actionid:'22A9',
    action_potencial: 0,
    dotid:'052E',
    name:'バイオガ',
    potencial: 600,
    max : 18,
    type:'DoT'
  },{
    actionid:'4A09',
    action_potencial: 800,
    dotid:'052E',
    name:'バイオガ',
    potencial: 600,
    max : 18,
    type:'DoT'
  },{
    actionid:'49FB',
    action_potencial: 0,
    dotid:'052E',
    name:'バイオガ',
    potencial: 600,
    max : 18,
    type:'DoT'
  },{
    actionid:'457F',
    action_potencial: 4000,
    dotid:'0532',
    name:'ハートオブソラス',
    potencial: 400,
    max : 15,
    type:'HoT'
  },{
    actionid:'4A02',
    action_potencial: 2000,
    dotid:'0532',
    name:'ハートオブラプチャー',
    potencial: 200,
    max : 15,
    type:'HoT'
  },{
    actionid:null,
    //守護のクレスト　B2D
    //活性のクレスト　 B2E
    action_potencial: 0,
    dotid:'0B2E',
    name:'活性のクレスト',
    potencial: 500,
    max : 15,
    type:'HoT'
  },{
    actionid:'4647',
    action_potencial: 0,
    dotid:'0816',
    name:'星天対抗',
    potencial: 800,
    max : 15,
    type:'HoT'
  },{
    actionid:'458C',
    action_potencial: 2000,
    dotid:'07FA',
    name:'ニュートラルセクト（日）',
    potencial: 800,
    max : 15,
    type:'HoT'
  },{
    actionid:'4A07',
    action_potencial: 2000,
    dotid:'07FA',
    name:'ニュートラルセクト（日）',
    potencial: 400,
    max : 15,
    type:'HoT'
  },{
    actionid:'45E3',
    action_potencial: 3000,
    dotid:'0811',
    name:'オーロラ',
    potencial: 600,
    max : 15,
    type:'HoT'
  },{
    actionid:'26FA',
    action_potencial: 10000,
    dotid:'010B',
    name:'火傷',
    potencial: 2500,
    max : 12,
    type:'DoT'
  },{
    actionid:null,
    dotid:'0597',
    name:'タワーフィールド',
    potencial: 1000,
    max : 1200,
    type:'HoT'
  },{
    actionid:null,
    dotid:'0598',
    name:'タワーフィールド',
    potencial: 1000,
    max : 1200,
    type:'HoT'
  },{
    actionid:'89',
    dotid:'009E',
    name:'リジェネ',
    potencial: 1000,
    max : 18,
    type:'HoT'
  },{
    actionid:'4094',
    action_potencial: 60,
    dotid:'074F',
    name:'ディア',
    potencial: 60,
    max : 30,
    type:'DoT'
  }
];
let Unique_DoT =[{
  id:'52B',
  name:'ワイルドファイア',
  type:'DoT'
},{
  id:'A2C',
  name:'カルディア',
  type:'HoT'
},{
  id:'886',
  name:'深謀遠慮の策',
  type:'HoT'
},{
  id:'80E',
  name:'原初の猛り[被]',
  type:'HoT'
},{
  id:'B36',
  name:'ハイマの印',
  type:'HoT'
},{
  id:'B34',
  name:'プネウマ',
  type:'HoT'
}];
let Unique_DoT_ID_Array;
let DoT_ID_Array;

function object_to_array(object,key){
  let data = [];
  for(let i = 0 ; i < object.length ; i++){
    data.push(object[i][key]);
  }
  return data;
}
