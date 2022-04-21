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
    action_potencial: 6000,
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
    potencial: 4000,
    max : 6,
    type:'DoT'
  },{
    actionid:'73FD',
    action_potencial: 7000,
    dotid:'0CA6',
    name:'エンツヴェルクハウ',
    potencial: 4000,
    max : 6,
    type:'DoT'
  },{
    actionid:'73FE',
    action_potencial: 8000,
    dotid:'0CA7',
    name:'エンルドゥブルマン',
    potencial: 6000,
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
  id:'C64',
  name:'急所系穴',
  type:'DoT'
},{
  id:'C64',
  name:'急所系穴',
  type:'DoT'
}];
const Barrier_ID = [
  //占星
  {
    actionid:'458C',
    action_potencial: 2000,
    dotid:'07FA',
    name:'ニュートラルセクト（日）',
    potencial: 2000,
    max : 10,
    damagesync : 1,
    damage : false,
    type:'barrier'
  },{
    actionid:'4A07',
    action_potencial: 2000,
    dotid:'07FA',
    name:'ニュートラルセクト（日）',
    potencial: 1000,
    max : 10,
    damagesync : 0.5,
    damage : false,
    type:'barrier'
  },{
    actionid:'4647',
    action_potencial: 0,
    dotid:'0817',
    name:'星天対抗',
    potencial: 2000,
    max : 10,
    damagesync : 0,
    damage : false,
    type:'barrier'
  },{//学者
    actionid:'22C9',
    action_potencial: 2000,
    dotid:'0533',
    name:'鼓舞激励の策',
    potencial: 2000,
    max : 10,
    damagesync : 1,
    damage : false,
    type:'barrier'
  },{
    actionid:'4647',
    action_potencial: 0,
    dotid:'0533',
    name:'士気高揚の策',
    potencial: 1000,
    max : 10,
    damagesync : 1,
    damage : false,
    type:'barrier'
  },{//赤
    actionid:'457A',
    action_potencial: 1200,
    dotid:'07F1',
    name:'アンガジェマン',
    potencial: 2500,
    max : 6,
    damagesync : 0,
    damage : true,
    type:'barrier'
  },{//キャス
    actionid:'4517',
    action_potencial: 0,
    dotid:'07C5',
    name:'マバリア',
    potencial: 2500,
    max : 10,
    damagesync : 0,
    damage : false,
    type:'barrier'
  },{//暗黒
    actionid:'224B',
    action_potencial: 0,
    dotid:'051C',
    name:'ブラックナイト',
    potencial: 3000,
    max : 6,
    damagesync : 0,
    damage : false,
    type:'barrier'
  },{//ガンブレ
    actionid:'4528',
    action_potencial: 1200,
    dotid:'07CD',
    name:'ブルータルシェル',
    potencial: 1200,
    max : 10,
    damagesync : 0,
    damage : true,
    type:'barrier'
  },{
    actionid:'49DF',
    action_potencial: 800,
    dotid:'07CD',
    name:'デーモンスローター',
    potencial: 800,
    max : 10,
    damagesync : 0,
    damage : true,
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
