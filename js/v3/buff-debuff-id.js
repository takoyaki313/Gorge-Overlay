const Stack_buff = ['05B9'/*テンション*/, '0BED'/*連続剣*/, '0C5B'/*喝采*/];
const EFFECT_ID = {
  /*'05B9':{
    en_name:'Soaring',
    name:'テンション',
    // damage heal incomedamage incomeheal buff/debuff
    type:[true,true,false,false,true],
    effect:1.1/*2~40%,
    cut:1,
    cut_heal:1
  },*/
  '0105B9': {
    name: 'テンション1',
    type: [true, true, false, false, true],
    effect: 1.02,
    cut: 1,
    cut_heal: 1
  },
  '0205B9': {
    name: 'テンション2',
    type: [true, true, false, false, true],
    effect: 1.04,
    cut: 1,
    cut_heal: 1
  },
  '0305B9': {
    name: 'テンション3',
    type: [true, true, false, false, true],
    effect: 1.06,
    cut: 1,
    cut_heal: 1
  },
  '0405B9': {
    name: 'テンション4',
    type: [true, true, false, false, true],
    effect: 1.08,
    cut: 1,
    cut_heal: 1
  },
  '0505B9': {
    name: 'テンション5',
    type: [true, true, false, false, true],
    effect: 1.1,
    cut: 1,
    cut_heal: 1
  },
  '0605B9': {
    name: 'テンション6',
    type: [true, true, false, false, true],
    effect: 1.12,
    cut: 1,
    cut_heal: 1
  },
  '0705B9': {
    name: 'テンション7',
    type: [true, true, false, false, true],
    effect: 1.14,
    cut: 1,
    cut_heal: 1
  },
  '0805B9': {
    name: 'テンション8',
    type: [true, true, false, false, true],
    effect: 1.16,
    cut: 1,
    cut_heal: 1
  },
  '0905B9': {
    name: 'テンション9',
    type: [true, true, false, false, true],
    effect: 1.18,
    cut: 1,
    cut_heal: 1
  },
  '0A05B9': {
    name: 'テンション10',
    type: [true, true, false, false, true],
    effect: 1.2,
    cut: 1,
    cut_heal: 1
  },
  '0B05B9': {
    name: 'テンション11',
    type: [true, true, false, false, true],
    effect: 1.22,
    cut: 1,
    cut_heal: 1
  },
  '0C05B9': {
    name: 'テンション12',
    type: [true, true, false, false, true],
    effect: 1.24,
    cut: 1,
    cut_heal: 1
  },
  '0D05B9': {
    name: 'テンション13',
    type: [true, true, false, false, true],
    effect: 1.26,
    cut: 1,
    cut_heal: 1
  },
  '0E05B9': {
    name: 'テンション14',
    type: [true, true, false, false, true],
    effect: 1.28,
    cut: 1,
    cut_heal: 1
  },
  '0F05B9': {
    name: 'テンション15',
    type: [true, true, false, false, true],
    effect: 1.3,
    cut: 1,
    cut_heal: 1
  },
  '1005B9': {
    name: 'テンション16',
    type: [true, true, false, false, true],
    effect: 1.32,
    cut: 1,
    cut_heal: 1
  },
  '1105B9': {
    name: 'テンション17',
    type: [true, true, false, false, true],
    effect: 1.34,
    cut: 1,
    cut_heal: 1
  },
  '1205B9': {
    name: 'テンション18',
    type: [true, true, false, false, true],
    effect: 1.36,
    cut: 1,
    cut_heal: 1
  },
  '1305B9': {
    name: 'テンション19',
    type: [true, true, false, false, true],
    effect: 1.38,
    cut: 1,
    cut_heal: 1
  },
  '0853': {
    name: '士気高揚I',
    type: [true, true, false, false, true],
    effect: 1.1,
    cut: 1,
    cut_heal: 1
  },
  '0854': {
    name: '士気高揚II',
    type: [true, true, false, false, true],
    effect: 1.2,
    cut: 1,
    cut_heal: 1
  },
  '0855': {
    name: '士気高揚III',
    type: [true, true, false, false, true],
    effect: 1.3,
    cut: 1,
    cut_heal: 1
  },
  '0856': {
    name: '士気高揚IV',
    type: [true, true, false, false, true],
    effect: 1.4,
    cut: 1,
    cut_heal: 1
  },
  '0857': {
    name: '士気高揚V',
    type: [true, true, false, false, true],
    effect: 1.5,
    cut: 1,
    cut_heal: 1
  },
  '037F': {
    name: '無敵',
    type: [false, false, true, true, true],
    effect: 1,
    cut: 0,
    cut_heal: 1
  },
  '0B38': {
    name: 'カルディア[被]',
    type: [false, false, false, false, true],
    effect: 1,
    cut: 1,
    cut_heal: 1
  },
  '0B37': {
    name: 'カルディア',
    type: [false, false, false, false, true],
    effect: 1,
    cut: 1,
    cut_heal: 1
  },
  '07EB': {
    name: 'クローズドポジション[被]',
    type: [false, false, true, false, true],
    effect: 1.1,
    cut: 0.9,
    cut_heal: 1
  },
  '07EA': {
    name: 'クローズドポジション',
    type: [false, false, true, true, true],
    effect: 1,
    cut: 1,
    cut_heal: 1
  },
  '018A': {
    name: '無敵',
    type: [false, false, true, true, true],
    effect: 1,
    cut: 0,
    cut_heal: 1
  },
  //Paladin
  '07C7': {
    name: '忠義の剣',
    type: [false, false, false, false, true],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 10
  },
  '0BD1': {
    name: '聖刻',
    type: [false, false, false, false, false],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 10
  },
  '0515': {
    name: 'かばう[被]',
    type: [false, false, false, false, true],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 10
  },
  '0514': {
    name: 'かばう',
    type: [false, false, false, false, true],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 10
  },
  '0BD2': {
    name: 'ホーリーシェルトロン',
    type: [false, false, false, false, true],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 5
  },
  '0C74': {
    name: 'ナイトの堅守',
    type: [false, false, true, false, true],
    effect: 1,
    cut: 0.85,
    cut_heal: 1,
    maxtime: 10
  },
  '0C8A': {
    name: 'ファランクス',
    type: [false, false, true, false, true],
    effect: 1,
    cut: 0.5,
    cut_heal: 1,
    maxtime: 5
  },
  '0CB2': {
    name: 'ブレード・オブ・フェイス実行可',
    type: [false, false, false, false, true],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 10
  },
  '0516': {
    name: 'インビンシブル',
    type: [false, false, false, false, true],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 10
  },
  //Warrier
  '0CB8': {
    name: 'オロジェネシス',
    type: [true, false, false, false, false],
    effect: 0.9,
    cut: 1,
    cut_heal: 1,
    maxtime: 10
  },
  '0BD6': {
    name: '原初の血気',
    type: [false, false, false, false, true],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 10
  },
  '0BD7': {
    name: '原初の血煙',
    type: [false, false, false, false, true],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 10
  },
  '07C8': {
    name: '原初の混沌',
    type: [false, false, false, false, true],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 10
  },
  '0517': {
    name: '原初の解放',
    type: [false, false, false, false, true],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 15
  },
  '0C71': {
    name: 'スリル・オブ・バトル',
    type: [false, false, false, false, true],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 30
  },
  '0BD5': {
    name: 'オンスロート',
    type: [false, false, true, false, false],
    effect: 1,
    cut: 1.1,
    cut_heal: 1,
    maxtime: 10
  },
  '0BCD': {
    name: '防御不可',
    type: [false, false, false, false, false],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 15
  },
  //DarkNight
  '0BD9': {
    name: 'ブラックブラッド',
    type: [false, false, false, false, true],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 10
  },
  '051A': {
    name: 'ソウルサバイバー',
    type: [false, false, false, true, false],
    effect: 1,
    cut: 1,
    cut_heal: 0.8,
    maxtime: 15
  },
  '051C': {
    name: 'ブラックナイト',
    type: [false, false, false, false, true],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 15
  },
  '0BDA': {
    name: 'ダークアーツ',
    type: [false, false, false, false, true],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 10
  },
  '0BDC': {
    name: 'ソルトアース',//暗黒が持つバフ
    type: [false, false, false, false, true],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 10
  },
  '0BDD': {
    name: 'ソルトアース',//範囲内に入ると自身に付与される
    type: [false, false, true, false, true],
    effect: 1,
    cut: 0.8,
    cut_heal: 1,
    maxtime: 5
  },
  '0BDE': {
    name: 'ソルトアース[害]',//範囲内に入った敵に付与
    type: [false, false, false, false, false],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 5
  },
  '0BDF': {
    name: 'アンデット・リデンプション',
    type: [false, false, false, false, true],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 10
  },
  //GunBraker
  '0BE3': {
    name: 'ソイル',
    type: [false, false, false, false, true],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 10
  },
  '07D2': {
    name: 'ジャギュラーリップ実行可',
    type: [false, false, false, false, true],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 5
  },
  '07D3': {
    name: 'アブドメンテアー実行可',
    type: [false, false, false, false, true],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 5
  },
  '07D4': {
    name: 'アイガウジ実行可',
    type: [false, false, false, false, true],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 5
  },
  '0BE1': {
    name: 'ハイパーヴェロシティ実行可',
    type: [false, false, false, false, true],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 10
  },
  '0BE8': {
    name: 'シャギュラーリップ',//ブラッドドロー：タンク時
    type: [false, false, false, false, true],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 7
  },
  '0BE9': {
    name: 'アブドメンテアー',//ブラッドドロー：タンク時
    type: [false, false, false, false, true],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 7
  },
  '0BEA': {
    name: 'アイガウジ',//ブラッドドロー：タンク時
    type: [false, false, false, false, true],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 7
  },
  '0BE2': {
    name: 'ノーマーシー',
    type: [true, true, false, false, true],
    effect: 1.2,
    cut: 1,
    cut_heal: 1,
    maxtime: 7
  },
  '0BE5': {
    name: 'ブラッドドロー：DPS',
    type: [false, false, false, false, true],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 9999
  },
  '0BE6': {
    name: 'ブラッドドロー：ヒーラー',
    type: [false, false, false, false, true],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 9999
  },
  '0BE4': {
    name: 'ブラッドドロー：タンク',
    type: [false, false, false, false, true],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 9999
  },
  '0BEB': {
    name: 'ネピュラ',
    type: [false, false, true, false, true],
    effect: 1,
    cut: 0.8,
    cut_heal: 1,
    maxtime: 10
  },
  '0811': {
    name: 'オーロラ',
    type: [false, false, false, false, true],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 12
  },
  '0BEC': {
    name: '連続剣',
    type: [false, false, true, false, true],
    effect: 1,
    cut: 0.75,
    cut_heal: 1,
    maxtime: 4
  },
  '010BED': {//Stack 1
    name: '連続剣[被]',
    type: [false, false, true, false, false],
    effect: 1,
    cut: 1.04,
    cut_heal: 1,
    maxtime: 5
  },
  '020BED': {//Stack 2
    name: '連続剣[被]',
    type: [false, false, true, false, false],
    effect: 1,
    cut: 1.08,
    cut_heal: 1,
    maxtime: 5
  },
  '030BED': {//Stack 3
    name: '連続剣[被]',
    type: [false, false, true, false, false],
    effect: 1,
    cut: 1.12,
    cut_heal: 1,
    maxtime: 5
  },
  '040BED': {//Stack 4
    name: '連続剣[被]',
    type: [false, false, true, false, false],
    effect: 1,
    cut: 1.16,
    cut_heal: 1,
    maxtime: 5
  },
  '050BED': {//Stack 5
    name: '連続剣[被]',
    type: [false, false, true, false, false],
    effect: 1,
    cut: 1.20,
    cut_heal: 1,
    maxtime: 5
  },
  //Whitemage
  '0C0E': {
    name: 'アクアヴェール',
    type: [false, false, false, false, true],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 10
  },
  '0C0D': {
    name: 'ミラクル・オブ・ネイチャー',
    type: [false, false, false, false, false],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 2
  },
  '0587': {
    name: 'プロテス',
    type: [false, false, true, false, true],
    effect: 1,
    cut: 0.9,
    cut_heal: 1,
    maxtime: 10
  },
  '0C0B': {
    name: 'ケアルガ実行可',
    type: [false, false, false, false, true],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 10
  },
  '07F5': {
    name: 'テンパランス',
    type: [true, true, false, false, true],
    effect: 1.1,
    cut: 1,
    cut_heal: 1,
    maxtime: 15
  },
  '07F6': {
    name: 'テンパランス：効果',
    type: [true, false, true, false, true],
    effect: 1.1,
    cut: 1,
    cut_heal: 1,
    maxtime: 5
  },
  //Scholar
  '0C0F': {
    name: '鼓舞',
    type: [false, false, false, false, true],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 15
  },
  '0C10': {
    name: '激励',
    type: [true, false, false, false, true],
    effect: 1.08,
    cut: 1,
    cut_heal: 1,
    maxtime: 15
  },
  '0C11': {
    name: '蟲毒法',
    type: [false, false, false, false, false],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 15
  },
  '0C12': {
    name: '蟲毒',
    type: [true, false, false, false, false],
    effect: 0.92,
    cut: 1,
    cut_heal: 1,
    maxtime: 15
  },
  '0C16': {
    name: '秘策',
    type: [false, false, false, false, true],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 15
  },
  '0C13': {
    name: '枯骨法',
    type: [false, false, false, true, false],
    effect: 1,
    cut: 1,
    cut_heal: 0.75,
    maxtime: 10
  },
  '0C14': {
    name: '疾風の計',
    type: [false, false, false, false, true],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 10
  },
  '0C15': {
    name: '怒涛の計',
    type: [false, false, true, false, true],
    effect: 1,
    cut: 0.9,
    cut_heal: 1,
    maxtime: 10
  },
  '0C1A': {
    name: 'コンソレイション',
    type: [false, false, false, false, true],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 10
  },
  '0C17': {
    name: 'サモン・セラフィム',
    type: [false, false, false, false, true],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 20
  },
  '0C18': {
    name: 'セラフィムウィング',
    type: [false, false, false, false, true],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 20
  },
  '0C19': {
    name: 'セラフィックヴェール',
    type: [false, false, false, false, true],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 10
  },
  '0886': {
    name: '深謀遠慮の策',
    type: [false, false, false, false, true],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 20
  },
  //Astrologian
  '0C1B': {
    name: 'アスペクト・ベネフィク[日]',
    type: [false, false, false, false, true],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 12
  },
  '0C1C': {
    name: 'アスペクト・ベネフィク[夜]',
    type: [false, false, false, false, true],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 15
  },
  '0C1D': {
    name: 'ドロー：アーゼマの均衡',
    type: [false, false, false, false, true],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 15
  },
  '053A': {
    name: 'アーゼマの均衡',
    type: [true, false, false, false, true],
    effect: 1.1,
    cut: 1,
    cut_heal: 1,
    maxtime: 15
  },
  '0C1F': {
    name: 'ドロー：ビエルゴの塔',
    type: [false, false, false, false, true],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 15
  },
  '053D': {
    name: 'ビエルゴの塔',
    type: [false, false, false, false, true],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 15
  },
  '0C1E': {
    name: 'ドロー：サリャクの水瓶',
    type: [false, false, false, false, true],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 15
  },
  '053C': {
    name: 'サリャクの水瓶',
    type: [false, false, false, false, true],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 15
  },
  '0C20': {
    name: 'マクロコスモス',
    type: [false, false, false, false, true],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 10
  },
  '0C21': {
    name: '星河一天',
    type: [true, false, false, false, true],
    effect: 1.3,//1.3-1.2-1.1
    cut: 1,
    cut_heal: 1,
    maxtime: 15
  },
  '0C22': {
    name: '星河一天[害]',
    type: [true, false, false, false, false],
    effect: 0.7,//0.7-0.8-0.9
    cut: 1,
    cut_heal: 1,
    maxtime: 15
  },
  //Sage
  '0C26': {
    name: 'ハイマ',
    type: [false, false, false, false, true],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 10
  },
  '0C27': {
    name: 'ハイマの印',
    type: [false, false, false, false, true],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 10
  },
  '0C23': {
    name: 'エウクラシア',
    type: [false, false, false, false, true],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 10
  },
  '0C29': {
    name: 'トキシコン',
    type: [false, false, true, false, false],
    effect: 1,
    cut: 1.1,
    cut_heal: 1,
    maxtime: 5
  },
  '0C24': {
    name: 'エウクラシア・ドシスIII',
    type: [false, false, false, false, false],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 12
  },
  '0C25': {
    name: 'エウクラシア・ディアグノシス',
    type: [false, false, false, false, true],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 15
  },
  '0C2B': {
    name: 'アダースティング',
    type: [false, false, false, false, true],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 10
  },
  '0C2E': {
    name: 'メソテース',//発動したことによるバフ
    type: [false, false, false, false, true],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 15
  },
  '0C30': {//メソーテス内の敵につく
    name: 'リュペー',
    type: [false, false, false, false, false],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 5
  },
  '0C2F': {
    name: 'メソーテス',//メソーテス内の味方に付与
    type: [false, false, false, false, true],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 5
  },
  //Monk
  '07D7': {
    name: '疾風の神髄',
    type: [false, false, false, false, true],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 5
  },
  '0C60': {
    name: '六合星導脚',
    type: [false, false, false, false, true],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 5
  },
  '0C64': {
    name: '急所経穴',
    type: [false, false, false, false, false],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 3
  },
  '0C62': {
    name: '紅蓮の神髄',
    type: [false, false, false, false, true],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 10
  },
  '0C63': {
    name: '金剛の神髄',
    type: [false, false, false, false, true],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 10
  },
  '0C65': {
    name: '抜重歩法',
    type: [false, false, false, false, true],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 5
  },
  '0C66': {
    name: 'メテオドライヴ',//強化スタン
    type: [false, false, false, false, false],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 3
  },
  '0C67': {
    name: 'メテオドライヴ',//DoT
    type: [false, false, false, false, false],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 2
  },
  //Dragoon
  '0C69': {
    name: '紅の流血',
    type: [true, false, true, false, true],
    effect: 1.25,
    cut: 1.25,
    cut_heal: 1,
    maxtime: 10
  },
  '0C68': {
    name: 'ヘヴンスラスト実行可',
    type: [false, false, false, false, true],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 10
  },
  '0C89': {
    name: 'イルーシブジャンプ',
    type: [false, false, false, false, true],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 5
  },
  '0C6A': {
    name: '天竜眼',
    type: [false, false, false, false, true],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 10
  },
  '0C6B': {
    name: 'ホリッドロア',
    type: [false, false, false, false, false],
    effect: 1,
    cut: 1,//付与した敵からのダメージを50％カットする
    cut_heal: 1,
    maxtime: 10
  },
  '0C6C': {
    name: 'スカイハイ',
    type: [false, false, false, false, true],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 5
  },
  '0C6D': {
    name: 'スカイシャッター',
    type: [false, false, false, false, true],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 10
  },
  //Ninja
  '0C6F': {
    name: 'ぶんどる',
    type: [false, false, true, false, false],
    effect: 1,
    cut: 1.1,
    cut_heal: 1,
    maxtime: 10
  },
  '07DB': {
    name: '残影',
    type: [false, false, false, false, true],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 10
  },
  '0525': {
    name: '三印自在',
    type: [false, false, false, false, true],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 10
  },
  '07DA': {
    name: '分身の術',
    type: [false, false, false, false, true],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 30
  },
  '0524': {
    name: 'かくれる',
    type: [false, false, false, false, true],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 5
  },
  '0C8B': {
    name: '月影雷獣牙実行可',
    type: [false, false, false, false, true],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 10
  },
  '0C7B': {
    name: '月影雷獣爪実行不可',
    type: [false, false, false, false, true],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 9999
  },
  '0C7A': {
    name: '氷晶乱流の術実行不可',
    type: [false, false, false, false, true],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 9999
  },
  '0C70': {
    name: '劫火滅却の術',
    type: [false, false, false, false, false],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 12
  },
  '0C79': {
    name: '劫火滅却の術実行不可',
    type: [false, false, false, false, true],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 9999
  },
  '0C75': {
    name: '命水',
    type: [false, false, false, false, true],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 15
  },
  '0C7E': {
    name: '命水実行不可',
    type: [false, false, false, false, true],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 9999
  },
  '0C72': {
    name: '風遁の術',
    type: [false, false, false, false, true],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 15
  },
  '0C7C': {
    name: '風遁の術実行不可',
    type: [false, false, false, false, true],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 9999
  },
  '0C73': {
    name: '土遁の術',
    type: [false, false, false, false, true],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 10
  },
  '0C07': {
    name: '土遁の術[害]',
    type: [false, false, false, false, false],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 5
  },
  '0C7D': {
    name: '土遁の術実行不可',
    type: [false, false, false, false, true],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 9999
  },
  '0C76': {
    name: '星遁天誅',
    type: [false, false, false, false, true],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 2
  },
  '0C78': {
    name: '星遁天誅実行可',
    type: [false, false, false, false, true],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 8
  },
  '0C77': {
    name: '死の連鎖',
    type: [false, false, false, false, false],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 5
  },
  //Samurai
  '0C7F': {
    name: '奥義波切',
    type: [false, false, false, false, true],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 10
  },
  '0C81': {
    name: '回天',
    type: [false, false, false, false, true],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 10
  },
  '04D8': {
    name: '必殺剣・地天',
    type: [false, false, true, false, true],
    effect: 1,
    cut: 0.75,
    cut_heal: 1,
    maxtime: 5
  },
  '0C82': {
    name: '崩し',
    type: [false, false, false, false, false],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 3
  },
  '0528': {
    name: '名鏡止水',
    type: [false, false, false, false, true],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 3
  },
  '0C83': {
    name: '乱れ雪月花実行可',
    type: [false, false, false, false, true],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 10
  },
  '0C80': {
    name: '返し波切',
    type: [false, false, false, false, true],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 10
  },
  //Reaper
  '0C84': {
    name: '死の供物',
    type: [false, false, false, false, true],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 9999
  },
  '0C85': {
    name: 'プレンティフルハーベスト',
    type: [false, false, false, false, true],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 15
  },
  '0B26': {
    name: '妖異の鎌',
    type: [false, false, false, false, true],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 10
  },
  '0C86': {
    name: 'デスワラント',
    type: [false, false, false, false, false],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 7
  },
  '0B2F': {
    name: 'レムール',
    type: [false, false, false, false, true],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 15
  },
  '0B2C': {
    name: 'リターン実行可',
    type: [false, false, false, false, true],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 10
  },
  '0B28': {
    name: 'ギャロウズ実行可',
    type: [false, false, false, false, true],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 10
  },
  '0B2A': {
    name: 'クロスリーパー実行可',
    type: [false, false, false, false, true],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 10
  },
  '0ABE': {
    name: 'ソウルソウ',
    type: [false, false, false, false, true],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 10
  },
  '0C87': {
    name: 'ヘルズイングレス',
    type: [false, false, false, false, true],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 5
  },
  '0B2D': {
    name: '守護のクレスト',
    type: [true, false, false, false, true],
    effect: 1.1,
    cut: 1,
    cut_heal: 1,
    maxtime: 10
  },
  '0B2E': {
    name: '活性のクレスト',
    type: [false, false, false, false, true],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 6
  },
  '0BCF': {
    name: '恐慌',//フィアー？
    type: [false, false, false, false, false],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 2
  },
  //Bird
  '0C42': {
    name: '進撃のマーチ',
    type: [false, false, false, false, true],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 30
  },
  '0C43': {
    name: '進撃のマーチ[被]',
    type: [true, false, false, false, true],
    effect: 1.05,
    cut: 1,
    cut_heal: 1,
    maxtime: 5
  },
  '0C46': {
    name: 'ブラストアロー実行可[被]',
    type: [false, false, false, false, true],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 20
  },
  '0C41': {
    name: '詩心',
    type: [false, false, false, false, true],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 10
  },
  '0C47': {
    name: '時神のピーアン',
    type: [false, false, false, false, true],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 10
  },
  '0882': {
    name: '時神の護り',
    type: [false, false, true, true, true],
    effect: 1,
    cut: 0.8,
    cut_heal: 1.2,
    maxtime: 5
  },
  '0C44': {
    name: 'エイペックス・フォルテ',
    type: [false, false, false, false, true],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 10
  },
  '0C45': {
    name: 'エイペックス・フォルテ[被]',
    type: [true, false, false, false, true],
    effect: 1.05,
    cut: 1,
    cut_heal: 1,
    maxtime: 5
  },
  '0C48': {
    name: '英雄のファンタジア',
    type: [false, false, false, false, true],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 30
  },
  '0C49': {
    name: '英雄のファンタジア[被]',
    type: [true, false, false, false, true],
    effect: 1.1,
    cut: 1,
    cut_heal: 1,
    maxtime: 30
  },
  //Machinist
  '0C4C': {
    name: 'ヒート',
    type: [false, false, false, false, true],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 15
  },
  '0C4D': {
    name: 'オーバーヒート',
    type: [false, false, false, false, true],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 5
  },
  '0C4F': {
    name: 'バイオブラスト起動',
    type: [false, false, false, false, true],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 9999
  },
  '052B': {
    name: 'ワイルドファイア',
    type: [false, false, false, false, false],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 7
  },
  '0C53': {
    name: 'ビショップ起動中',
    type: [false, false, false, false, true],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 10
  },
  '0C54': {
    name: 'エーテルモーター',
    type: [false, false, true, false, true],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 5
  },
  '0C55': {
    name: 'エーテルモーター[害]',
    type: [false, false, true, false, false],
    effect: 1,
    cut: 1.1,
    cut_heal: 1,
    maxtime: 5
  },
  '0C56': {
    name: 'アナライズ',
    type: [false, false, true, false, true],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 10
  },
  '07E3': {
    name: 'バイオブラスト',
    type: [false, false, true, false, false],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 9
  },
  '0C50': {
    name: 'エアアンカー起動',
    type: [false, false, false, false, true],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 9999
  },
  '0C51': {
    name: '回天のこぎり起動',
    type: [false, false, false, false, true],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 9999
  },
  '0C4E': {
    name: 'ドリル起動',
    type: [false, false, false, false, true],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 9999
  },
  //Dancer
  '0C59': {
    name: '流星の舞い',
    type: [false, false, false, false, true],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 10
  },
  '0C5A': {
    name: '刃の舞い',
    type: [false, false, true, false, true],
    effect: 1,
    cut: 0.8,
    cut_heal: 1,
    maxtime: 3
  },
  '010C5B': {
    name: '喝采',
    type: [false, false, false, false, true],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 5
  },
  '020C5B': {
    name: '喝采',
    type: [false, false, false, false, true],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 5
  },
  '030C5B': {
    name: '喝采',
    type: [false, false, false, false, true],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 5
  },
  '040C5B': {
    name: '喝采',
    type: [false, false, false, false, true],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 5
  },
  '0C5C': {
    name: '刃の舞い[終]',
    type: [false, false, false, false, true],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 10
  },
  '0C57': {
    name: '飛剣',
    type: [false, false, false, false, true],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 10
  },
  '0804': {
    name: '扇の舞い',
    type: [false, false, true, false, true],
    effect: 1,
    cut: 0.9,
    cut_heal: 1,
    maxtime: 10
  },
  '07E6': {
    name: '剣の舞い',
    type: [true, false, false, false, true],
    effect: 1.1,
    cut: 1,
    cut_heal: 1,
    maxtime: 10
  },
  '0C58': {
    name: '剣の舞い実行可',
    type: [false, false, false, false, true],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 15
  },
  '0800': {
    name: 'アン・アヴァン',
    type: [false, false, false, false, true],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 10
  },
  '0BD0': {
    name: '誘惑',
    type: [false, false, false, false, false],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 2
  },
  //BlackMage
  '0C8C': {
    name: 'アストラルファイアII',
    type: [false, false, false, false, true],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 30
  },
  /*'0C8D'*/'0D35': {　
    name: 'アストラルファイアIII',
    type: [false, false, false, false, true],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 30
  },
  '0C90': {
    name: 'アストラルファイア[被]',
    type: [false, false, false, false, false],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 15
  },
  '0C8E': {
    name: 'アンブラルブリザードII',
    type: [false, false, false, false, true],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 30
  },
  '0C8F': {
    name: 'アンブラルブリザードIII',
    type: [false, false, false, false, true],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 30
  },
  '0C91': {
    name: 'アンブラルブリザード[被]',
    type: [false, false, false, false, false],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 15
  },
  '0C95': {
    name: 'バースト',
    type: [false, false, false, false, true],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 10
  },
  '0BCE': {
    name: '徐々に睡眠',
    type: [false, false, false, false, false],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 3
  },
  '052D': {
    name: '迅速魔',
    type: [false, false, false, false, true],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 10
  },
  '0C92': {
    name: '火傷',
    type: [false, false, false, false, false],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 12//6-9-12
  },
  '0C93': {
    name: '氷結',
    type: [false, false, false, false, false],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 3//1-2-3
  },
  '0C96': {
    name: 'ソウルレゾナンス',
    type: [false, false, false, false, true],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 60
  },
  '0C61': {
    name: 'ホリグロット',
    type: [false, false, false, false, true],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 10
  },
  '0C94': {
    name: 'アポカタスタシス',
    type: [false, false, true, false, true],
    effect: 1,
    cut: 0.9,
    cut_heal: 1,
    maxtime: 1
  },
  //Summoner
  '0C99': {
    name: 'スリップストリーム',
    type: [false, false, false, false, true],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 10
  },
  '0C9B': {
    name: 'スリップストリーム[害]',
    type: [false, false, false, false, false],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 10
  },
  '0C9A': {// speed up
    name: 'スリップストリーム',
    type: [false, false, false, false, true],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 5
  },
  '0C98': {
    name: '守りの光',
    type: [false, false, true, false, true],
    effect: 1,
    cut: 0.8,
    cut_heal: 1,
    maxtime: 10
  },
  '0C9C': {
    name: 'トランス・バハムート',
    type: [false, false, false, false, true],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 20
  },
  '0C9D': {
    name: 'トランス・フェニックス',
    type: [false, false, false, false, true],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 20
  },
  '0C9E': {
    name: '不死鳥の翼',
    type: [false, false, false, false, true],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 15
  },
  '0C9F': {
    name: '火焔',
    type: [true, false, false, false, false],
    effect: 0.5,
    cut: 1,
    cut_heal: 1,
    maxtime: 5
  },
  '0CA0': {
    name: 'リヴァレーション',
    type: [false, false, false, false, false],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 15
  },
  '07AD': {//バハムートが使ってる。謎
    name: 'アクション実行待機III',
    type: [false, false, false, false, false],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 30
  },
  //RedMage
  '0571': {
    name: '連続魔',
    type: [false, false, false, false, true],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 10
  },
  '0CAA': {
    name: 'モノマキー',
    type: [true, false, false, false, false],
    effect: 0.9,//付与したは付与された人へのダメージが1.1倍
    cut: 1,
    cut_heal: 1,
    maxtime: 7
  },
  '0CAB': {
    name: 'マナフィケーション',
    type: [false, false, false, false, true],
    effect: 1,//次の魔法：ダメージ/ヒールを1.2倍
    cut: 1,
    cut_heal: 1,
    maxtime: 10
  },
  '0CAD': {
    name: 'シフトホワイト',
    type: [false, false, false, false, true],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 9999
  },
  '0CAE': {
    name: 'シフトブラック',
    type: [false, false, false, false, true],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 9999
  },
  '0CA9': {
    name: 'フラズル',
    type: [false, false, true, true, false],
    effect: 1,
    cut: 1.1,
    cut_heal: 0.8,
    maxtime: 10
  },
  '0CA8': {
    name: 'バマジク',
    type: [false, false, true, true, true],
    effect: 1,
    cut: 0.9,
    cut_heal: 1.2,
    maxtime: 10
  },
  '0CA1': {
    name: 'ヴァルホーリー、ヴァルフレア実行可',
    type: [false, false, false, false, true],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 10
  },
  '0CA2': {//White - Barrier
    name: 'エンリポスト',
    type: [false, false, false, false, true],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 10
  },
  '0CA3': {//White - Barrier
    name: 'エンリポスト',
    type: [false, false, false, false, true],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 10
  },
  '0CA4': {//White - Barrier
    name: 'エンルドゥブルマン',
    type: [false, false, false, false, true],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 10
  },
  '0CA5': {//Black - DoT
    name: 'エンリポスト',
    type: [false, false, false, false, false],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 6
  },
  '0CA6': {//Black - DoT
    name: 'エンリポスト',
    type: [false, false, false, false, false],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 6
  },
  '0CA7': {//Black - DoT
    name: 'エンルドゥブルマン',
    type: [false, false, false, false, false],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 6
  },
  //General Buff
  '0BEE': {
    name: '防御',
    type: [false, false, true, false, true],
    effect: 1,
    cut: 0.1,
    cut_heal: 1,
    maxtime: 5
  },
  '053E': {
    name: 'スプリント',
    type: [false, false, false, false, true],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 9999
  },
  '0CB0': {
    name: '活性',
    type: [false, false, false, false, true],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 5
  },
  '0540': {
    name: 'ヘヴィ',
    type: [false, false, false, false, false],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 3
  },
  '0541': {
    name: 'バインド',
    type: [false, false, false, false, false],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 3
  },
  '0543': {
    name: '沈黙',
    type: [false, false, false, false, false],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 3
  },
  '0544': {
    name: '睡眠',
    type: [false, false, false, false, false],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 4
  },
  '053F': {
    name: 'スタン',
    type: [false, false, false, false, false],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 2
  },
  //Crystal Conflict
  '0BB5': {//リスポーン地点
    name: 'スーパースプリント',
    type: [false, false, false, false, true],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 9999
  },
  '0BB4': {//リスポーン地点から降りた場所
    name: 'スーパースプリント',
    type: [false, false, false, false, true],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 4
  },
  '0C35': {//スプリントエリア
    name: 'スーパースプリント',
    type: [false, false, false, false, true],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 9999
  },
  '0BB2': {
    name: 'ボムの塊',
    type: [false, false, false, false, true],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 9999
  },
  '0BB3': {
    name: '黒チョコボの羽',
    type: [false, false, false, false, true],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 30
  },
  '0BAC': {
    name: 'Unknown_BAC',//クリスタルロック解除？
    type: [false, false, false, false, true],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 9999
  },
  //Hidden Gorge
  '058C': {
    name: '搭乗',
    type: [false, false, false, false, true],
    effect: 1,
    cut: 1,
    cut_heal: 1
  },
  '06C0': {
    name: '契約期間',
    type: [false, false, false, false, true],
    effect: 1,
    cut: 1,
    cut_heal: 1
  },
  '06C2': {
    name: 'テンションマックス',
    type: [true, true, false, false, true],
    effect: 1.5,
    cut: 1,
    cut_heal: 1
  },
  '06E7': {
    name: '魔道フィールド:弱',
    type: [false, false, true, false, false],
    effect: 1,
    cut: 0.5,
    cut_heal: 1
  },/* before 6.2
  '010B': {
    name: '火傷',
    type: [false, false, false, false, false],
    effect: 1,
    cut: 1,
    cut_heal: 1
  },*/
  '00FA': {// 6.2-
    name: '火傷',
    type: [false, false, false, false, false],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 12
  },  
  '06C1': {// 6.2-
    name: '不退転',
    type: [false, false, false, false, true],
    effect: 1,
    cut: 1,
    cut_heal: 1,
    maxtime: 9999
  },
  '0597': {
    name: 'タワーフィールド',
    type: [false, false, true, false, true],
    effect: 1,
    cut: 0.5,
    cut_heal: 1
  },
  '0598': {// タワーにつく
    name: 'タワーフィールド',
    type: [false, false, false, false, true],
    effect: 1,
    cut: 1,
    cut_heal: 1
  },
};
