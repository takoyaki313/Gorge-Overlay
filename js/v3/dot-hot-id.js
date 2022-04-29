var DoT_ID = [
  {
    actionid:'722E',
    action_potencial: 18000,
    dotid:'07F6',
    name:'テンパランス：効果',
    potencial: 4000,
    max : 5,
    type:'HoT'
  },{
    actionid:'',//ソルトアース起動71A6
    action_potencial: 0,
    dotid:'0BDD',
    name:'ソルトアース',
    potencial: 2000,
    max : 5,
    type:'HoT'
    },{
    actionid:'',//ソルトアース起動71A6
    action_potencial: 0,
    dotid:'0BDE',
    name:'ソルトアース[害]',
    potencial: 2000,
    max : 5,
    type:'DoT'
  },{
    actionid:'7231',
    action_potencial: 0,
    dotid:'0C11',
    name:'蟲毒法',
    potencial: 3000,
    max : 15,
    type:'DoT'
  },{
    actionid:'7232',//展開戦術
    action_potencial: 0,
    dotid:'0C11',
    name:'蟲毒法',
    potencial: 3000,
    max : 15,
    type:'DoT'
  },{
    actionid:'45E3',
    action_potencial: 8000,
    dotid:'0811',
    name:'オーロラ',
    potencial: 3000,
    max : 12,
    type:'HoT'
  },{
    actionid:'723B',
    action_potencial: 0,//4000-8000 HP可変
    dotid:'0C1B',
    name:'アスペクトベネフィク[日]',
    potencial: 1000,
    max : 12,
    type:'HoT'
  },{
    actionid:'7249',
    action_potencial: 0,
    dotid:'0C24',
    name:'エウクラシア・ドシスIII',
    potencial: 4000,
    max : 12,
    type:'DoT'
  },{
    actionid:'7252',
    action_potencial: 0,
    dotid:'0C30',
    name:'リュペー',
    potencial: 8000,
    max : 5,
    type:'DoT'
  },{
    actionid:'72DE',
    action_potencial: 4000,
    dotid:'07E3',
    name:'バイオブラスト',
    potencial: 4000,
    max : 9,
    type:'DoT'
  },{
    actionid:'73DD',
    action_potencial: 0,//3000-6000-9000可変
    dotid:'0C92',
    name:'火傷',
    potencial: 3000,
    max : 9,
    type:'DoT'
  },{
    actionid:'',
    action_potencial: 0,
    dotid:'0C9B',
    name:'スリップストリーム[害]',
    potencial: 3000,
    max : 5,
    type:'DoT'
  },{
    actionid:'73F0',//フェニックスが使用
    action_potencial: 0,
    dotid:'0C9E',
    name:'不死鳥の翼',
    potencial: 3000,
    max : 15,
    type:'HoT'
  },{
    actionid:'73F2',
    action_potencial: 3000,
    dotid:'0CA0',
    name:'リヴァレーション',
    potencial: 3000,
    max : 15,
    type:'DoT'
  },{
    actionid:'73FC',
    action_potencial: 6000,
    dotid:'0CA5',
    name:'エンリポスト',
    potencial: 3000,
    max : 6,
    type:'DoT'
  },{
    actionid:'73FD',
    action_potencial: 7000,
    dotid:'0CA6',
    name:'エンツヴェルクハウ',
    potencial: 3000,
    max : 6,
    type:'DoT'
  },{
    actionid:'73FE',
    action_potencial: 8000,
    dotid:'0CA7',
    name:'エンルドゥブルマン',
    potencial: 3000,
    max : 6,
    type:'DoT'
  },{
    actionid:'7340',
    action_potencial: 4000,
    dotid:'0C70',
    name:'劫火滅却の術',
    potencial: 4000,
    max : 12,
    type:'DoT'
  },{
    actionid:'7344',
    action_potencial: 10000,
    dotid:'0C75',
    name:'命水',
    potencial: 4000,
    max : 12,
    type:'HoT'
  },{
    actionid:'',//ドトン発動734A
    action_potencial: 0,
    dotid:'0C07',
    name:'土遁の術[害]',
    potencial: 2000,
    max : 5,
    type:'DoT'
  },{
    actionid:'',
    //守護のクレスト　B2D
    //活性のクレスト　 B2E
    action_potencial: 0,
    dotid:'0B2E',
    name:'活性のクレスト',
    potencial: 6000,
    max : 6,
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
    actionid:'',
    dotid:'0597',
    name:'タワーフィールド',
    potencial: 1000,
    max : 1200,
    type:'HoT'
  },{
    actionid:'',
    dotid:'0598',
    name:'タワーフィールド',
    potencial: 1000,
    max : 1200,
    type:'HoT'
  }
];
let Unique_DoT =[{
  id:'A2C',
  name:'カルディア',
  type:'HoT'
},{
  id:'51A',
  name:'ソウルサバイバー',
  type:'DoT'
},{
  id:'C64',
  name:'急所系穴',
  type:'DoT'
},{
  id:'544',
  name:'スリプル',
  type:'DoT'
},{
  id:'886',
  name:'深謀遠慮の策',
  type:'HoT'
},{
  id:'C27',
  name:'ハイマの印',
  type:'HoT'
},{
  id:'C9E',
  name:'不死鳥の翼',
  type:'HoT'
},{
  id:'C20',
  name:'マクロコスモス',
  type:'HoT'
},{
  id:'C67',
  name:'メテオドライブ',
  type:'DoT'
}];
const Barrier_ID = [
  //Pld
  {
    actionid:'718B',
    action_potencial: 0,
    dotid:'0BD2',
    name:'ホーリーシェルトロン',
    potencial: 12000,
    max : 5,
    damagesync : 0,
    damage : false,
    type:'barrier'
  },{//War
    actionid:'719A',
    action_potencial: 0,
    dotid:'0BD7',
    name:'原初の血煙',
    potencial: 0,
    max : 10,
    damagesync : 0,//maxhp 10%
    damage : false,
    type:'barrier'
  },{//drk
    actionid:'71A5',
    action_potencial: 0,
    dotid:'051C',
    name:'ブラックナイト',
    potencial: 8000,
    max : 10,
    damagesync : 0,
    damage : false,
    type:'barrier'
  },{//whm
    actionid:'722B',
    action_potencial: 0,
    dotid:'0C0E',
    name:'アクアヴェール',
    potencial: 6000,//成功時は12000
    max : 10,
    damagesync : 0,
    damage : false,
    type:'barrier'
  },{//sch
    actionid:'7230',
    action_potencial: 4000,
    dotid:'0C0F',
    name:'鼓舞',
    potencial: 4000,
    max : 15,
    damagesync : 1,
    damage : false,
    type:'barrier'
  },{
    actionid:'7238',
    action_potencial: 4000,
    dotid:'07F1',
    name:'セラフィックヴェール',
    potencial: 4000,
    max : 10,
    damagesync : 1,
    damage : false,
    type:'barrier'
  },{
    actionid:'7239',
    action_potencial: 4000,
    dotid:'0C1A',
    name:'コンソレイション',
    potencial: 4000,
    max : 10,
    damagesync : 1,
    damage : false,
    type:'barrier'
  },{//gnb
    actionid:'71B8',
    action_potencial: 1000,
    dotid:'0BE8',
    name:'ジャギュラーリップ',
    potencial: 4000,
    max : 7,
    damagesync : 4,
    damage : true,
    type:'barrier'
  },{
    actionid:'71B9',
    action_potencial: 2000,
    dotid:'0BE8',
    name:'アブドメンテアー',
    potencial: 5000,
    max : 7,
    damagesync : 2.5,
    damage : true,
    type:'barrier'
  },{
    actionid:'71BA',
    action_potencial: 3000,
    dotid:'0BE8',
    name:'アイガウジ',
    potencial: 6000,
    max : 7,
    damagesync : 2,
    damage : true,
    type:'barrier'
  },{//ast
    actionid:'723F',
    action_potencial: 0,
    dotid:'0C1C',
    name:'アスペクトベネフィク[夜]',
    potencial: 1200,
    max : 10,
    damagesync : 0,
    damage : false,
    type:'barrier'
  },/*{//sage
    actionid:'740A',
    action_potencial: 0,
    dotid:'0C24',
    name:'ハイマ',
    potencial: 1200,
    max : 10,
    damagesync : 0,
    damage : false,
    type:'barrier'
  },*/{
    actionid:'7249',
    action_potencial: 0,
    dotid:'0C24',
    name:'エウクラシア・ディアグノシス',
    potencial: 8000,
    max : 15,
    damagesync : 0,
    damage : false,
    type:'barrier'
  },{//drg
    actionid:'733A',
    action_potencial: 20000,
    dotid:'0C6D',
    name:'スカイシャッター',
    potencial: 0,//Hp 25%
    max : 10,
    damagesync : 0,
    damage : true,
    type:'barrier'
  },{//rpr
    actionid:'7370',
    action_potencial: 0,
    dotid:'0B2D',
    name:'守護のクレスト',
    potencial: 12000,
    max : 10,
    damagesync : 0,
    damage : false,
    type:'barrier'
  },{//sam
    actionid:'735A',
    action_potencial: 8000,
    dotid:'07CF',
    name:'奥義波切',
    potencial: 8000,
    max : 10,
    damagesync : 1,
    damage : true,
    type:'barrier'
  },{
    actionid:'735B',
    action_potencial: 8000,
    dotid:'0C80',
    name:'返し波切',
    potencial: 8000,
    max : 10,
    damagesync : 1,
    damage : true,
    type:'barrier'
  },/*{//dnc
    actionid:'72F3',
    action_potencial: 0,
    dotid:'0C5C',
    name:'刃の舞い[終]',
    potencial: 1000,//1000-5000
    max : 10,
    damagesync : 0,
    damage : false,
    type:'barrier'
  },*/{//smn
    actionid:'73E6',
    action_potencial: 0,
    dotid:'0C98',
    name:'守りの光',
    potencial: 8000,
    max : 10,
    damagesync : 0,
    damage : false,
    type:'barrier'
  },{//rdm
    actionid:'73F9',
    action_potencial: 6000,
    dotid:'0CA2',
    name:'エンリポスト',
    potencial: 6000,
    max : 10,
    damagesync : 1,
    damage : true,
    type:'barrier'
  },{
    actionid:'73FA',
    action_potencial: 7000,
    dotid:'0CA3',
    name:'エンツヴェルクハウ',
    potencial: 6000,
    max : 10,
    damagesync : 0.857,
    damage : true,
    type:'barrier'
  },{
    actionid:'73FB',
    action_potencial: 8000,
    dotid:'0CA4',
    name:'エンルドゥブルマン',
    potencial: 6000,
    max : 10,
    damagesync : 0.75,
    damage : true,
    type:'barrier'
  },{//mch
    actionid:'72E5',
    action_potencial: 0,
    dotid:'0C54',
    name:'エーテルモーター',
    potencial: 4000,
    max : 10,
    damagesync : 0,
    damage : false,
    type:'barrier'
  },{//nin
    actionid:'7347',
    action_potencial: 0,
    dotid:'07DB',
    name:'分身の術',
    potencial: 8000,
    max : 10,
    damagesync : 0,
    damage : false,
    type:'barrier'
  },{
    actionid:'7348',
    action_potencial: 0,
    dotid:'0C72',
    name:'風遁の術',
    potencial: 16000,
    max : 10,
    damagesync : 0,
    damage : false,
    type:'barrier'
  },{
    actionid:'732C',
    action_potencial: 0,
    dotid:'07CD',
    name:'抜重歩法',
    potencial: 6000,
    max : 10,
    damagesync : 0,
    damage : false,
    type:'barrier'
  },
];
let Unique_DoT_ID_Array;
let DoT_ID_Array;
let Barrier_ID_Array;
function object_to_array(object,key){
  let data = [];
  for(let i = 0 ; i < object.length ; i++){
    data.push(object[i][key]);
  }
  return data;
}
