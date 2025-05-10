export const EFFECT_ID = {
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
        type: [true, false, false, false, true],
        effect: 1.15,
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
        maxtime: 8
    },
    '0514': {
        name: 'かばう',
        type: [false, false, false, false, true],
        effect: 1,
        cut: 1,
        cut_heal: 1,
        maxtime: 8
    },
    '0BD2': {
        name: 'ホーリーシェルトロン',
        type: [false, false, false, false, true],
        effect: 1,
        cut: 1,
        cut_heal: 1,
        maxtime: 5
    },
    '0BD4': {
        name: 'コンフィティオル実行可',
        type: [false, false, false, false, true],
        effect: 1,
        cut: 1,
        cut_heal: 1,
        maxtime: 5
    },
    '0C74': {
        name: '忠義の盾',
        type: [false, false, true, false, true],
        effect: 1,
        cut: 0.85,
        cut_heal: 1,
        maxtime: 8
    },
    '0C8A': {
        name: 'ファランクス',
        type: [false, false, true, false, true],
        effect: 1,
        cut: 0.67,
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
    '07DF': {
        name: 'ロイエ実行可',
        type: [false, false, false, false, true],
        effect: 1,
        cut: 1,
        cut_heal: 1,
        maxtime: 10
    },
    '10B9': {
        name: 'ゲベート実行可',
        type: [false, false, false, false, true],
        effect: 1,
        cut: 1,
        cut_heal: 1,
        maxtime: 10
    },
    '10BA': {
        name: 'グラブカッマー実行可',
        type: [false, false, false, false, true],
        effect: 1,
        cut: 1,
        cut_heal: 1,
        maxtime: 10
    },
    '10BB': {
        name: 'シールドスマイト',
        type: [false, false, true, false, false],
        effect: 1,
        cut: 1.1,
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
    '0517': {
        name: '原初の解放',
        type: [false, false, false, false, true],
        effect: 1,
        cut: 1,
        cut_heal: 1,
        maxtime: 15
    },
    '07C8': {
        name: 'カオティックサイクロン実行可',
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
    '10BC': {
        name: 'インナーカオス実行可',
        type: [false, false, false, false, true],
        effect: 1,
        cut: 1,
        cut_heal: 1,
        maxtime: 10
    },
    '10BD': {
        name: 'ルイネーター実行可',
        type: [false, false, false, false, true],
        effect: 1,
        cut: 1,
        cut_heal: 1,
        maxtime: 10
    },
    '10BE': {
        name: '原初の激震実行可',
        type: [false, false, false, false, true],
        effect: 1,
        cut: 1,
        cut_heal: 1,
        maxtime: 10
    },
    '10BF': {
        name: '原初の鼓動',
        type: [false, false, false, false, true],
        effect: 1,
        cut: 1,
        cut_heal: 1,
        maxtime: 10
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
    '10C0': {
        name: 'カマパンス実行可',
        type: [false, false, false, false, true],
        effect: 1,
        cut: 1,
        cut_heal: 1,
        maxtime: 9999
    },
    '10C1': {
        name: 'トアクリーバー実行可',
        type: [false, false, false, false, true],
        effect: 1,
        cut: 1,
        cut_heal: 1,
        maxtime: 9999
    },
    '10C2': {
        name: 'ディセスティーム実行可',
        type: [false, false, false, false, true],
        effect: 1,
        cut: 1,
        cut_heal: 1,
        maxtime: 9999
    },
    //GunBraker
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
    '0BE7': {
        name: 'ハイパーヴェロシティ',
        type: [false, false, false, false, true],
        effect: 1,
        cut: 1,
        cut_heal: 1,
        maxtime: 10
    },
    '0BE8': {
        name: 'シャギュラーリップ',
        type: [false, false, false, false, true],
        effect: 1,
        cut: 1,
        cut_heal: 1,
        maxtime: 7
    },
    '0BE9': {
        name: 'アブドメンテアー',
        type: [false, false, false, false, true],
        effect: 1,
        cut: 1,
        cut_heal: 1,
        maxtime: 7
    },
    '0BEA': {
        name: 'アイガウジ',
        type: [false, false, false, false, true],
        effect: 1,
        cut: 1,
        cut_heal: 1,
        maxtime: 7
    },
    '0BEB': {
        name: 'ネビュラ',
        type: [false, false, false, false, true],
        effect: 1,
        cut: 1,
        cut_heal: 1,
        maxtime: 10
    },
    '0BE2': {
        name: 'ノーマーシー',
        type: [true, true, false, false, true],
        effect: 1.1,
        cut: 1,
        cut_heal: 1,
        maxtime: 7
    },
    '0BEC': {
        name: '連続剣',
        type: [false, false, true, false, true],
        effect: 1,
        cut: 0.75,
        cut_heal: 1,
        maxtime: 4
    },
    '0BED': {//Stack ?
        name: '連続剣[被]',
        type: [false, false, true, false, false],
        effect: 1,
        cut: 1.05,
        cut_heal: 1,
        maxtime: 6
    },
    '010BED': {//Stack 1
        name: '連続剣[被]',
        type: [false, false, true, false, false],
        effect: 1,
        cut: 1.05,
        cut_heal: 1,
        maxtime: 6
    },
    '020BED': {//Stack 2
        name: '連続剣[被]',
        type: [false, false, true, false, false],
        effect: 1,
        cut: 1.1,
        cut_heal: 1,
        maxtime: 6
    },
    '030BED': {//Stack 3
        name: '連続剣[被]',
        type: [false, false, true, false, false],
        effect: 1,
        cut: 1.15,
        cut_heal: 1,
        maxtime: 6
    },
    '040BED': {//Stack 4
        name: '連続剣[被]',
        type: [false, false, true, false, false],
        effect: 1,
        cut: 1.2,
        cut_heal: 1,
        maxtime: 6
    },
    '050BED': {//Stack 5
        name: '連続剣[被]',
        type: [false, false, true, false, false],
        effect: 1,
        cut: 1.25,
        cut_heal: 1,
        maxtime: 6
    },
    '10C5': {
        name: 'フェイテッドブランド実行可',
        type: [false, false, false, false, true],
        effect: 1,
        cut: 1,
        cut_heal: 1,
        maxtime: 10
    },
    '10C6': {
        name: 'フェイテッドブランド',
        type: [false, false, false, false, true],
        effect: 1,
        cut: 1,
        cut_heal: 1,
        maxtime: 6
    },
    '10C7': {
        name: 'ハート・オブ・コランダム',
        type: [false, false, true, false, true],
        effect: 1,
        cut: 0.9,
        cut_heal: 1,
        maxtime: 10
    },
    '10C8': {
        name: 'カタルシス・オブ・コランダム',
        type: [false, false, false, false, true],
        effect: 1,
        cut: 1,
        cut_heal: 1,
        maxtime: 10
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
        type: [false, false, false, false, true],
        effect: 1,
        cut: 1,
        cut_heal: 1,
        maxtime: 15
    },
    '07F6': {
        name: 'テンパランス：効果',
        type: [false, false, false, false, true],
        effect: 1,
        cut: 1,
        cut_heal: 1,
        maxtime: 5
    },
    '10E6': {
        name: 'グレアジャ実行可',
        type: [false, false, false, false, true],
        effect: 1,
        cut: 1,
        cut_heal: 1,
        maxtime: 20
    },
    //Scholar
    '057E': {
        name: '連環計',
        type: [true, false, false, false, false],
        effect: 1.1,
        cut: 1,
        cut_heal: 1,
        maxtime: 6
    },
    '0C0F': {
        name: '鼓舞',
        type: [false, false, false, false, true],
        effect: 1,
        cut: 1,
        cut_heal: 1,
        maxtime: 12
    },
    '0C10': {
        name: '激励',
        type: [false, false, true, false, true],
        effect: 1,
        cut: 0.9,
        cut_heal: 1,
        maxtime: 12
    },
    '0C11': {
        name: '蟲毒法',
        type: [false, false, false, false, false],
        effect: 1,
        cut: 1,
        cut_heal: 1,
        maxtime: 12
    },
    '0C12': {
        name: '蟲毒',
        type: [false, false, false, true, false],
        effect: 1,
        cut: 1,
        cut_heal: 0.8,
        maxtime: 12
    },
    '0C16': {
        name: '秘策',
        type: [false, false, false, false, true],
        effect: 1,
        cut: 1,
        cut_heal: 1,
        maxtime: 15
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
        type: [true, false, false, false, true],
        effect: 1.1,
        cut: 1,
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
        type: [false, true, false, false, true],
        effect: 1.1,
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
    '10E7': {
        name: 'セラフィズム',
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
        maxtime: 6
    },
    '0C1C': {
        name: 'アスペクト・ベネフィク[夜]',
        type: [false, false, false, false, true],
        effect: 1,
        cut: 1,
        cut_heal: 1,
        maxtime: 12
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
        type: [true, true, false, false, true],
        effect: 1.2,//1.3-1.2-1.1
        cut: 1,
        cut_heal: 1,
        maxtime: 15
    },
    '0C22': {
        name: '星河一天[害]',
        type: [true, true, false, false, false],
        effect: 0.8,//0.7-0.8-0.9
        cut: 1,
        cut_heal: 1,
        maxtime: 15
    },
    '10E8': {//引いただけ
        name: 'クラウンレディ',
        type: [false, false, false, false, true],
        effect: 1,
        cut: 1,
        cut_heal: 1,
        maxtime: 10
    },
    '10E9': {//引いただけ
        name: 'クラウンロード',
        type: [false, false, false, false, true],
        effect: 1,
        cut: 1,
        cut_heal: 1,
        maxtime: 10
    },
    '05AC': {//効果
        name: 'クラウンレディ',
        type: [false, true, false, false, true],
        effect: 1,
        cut: 0.9,
        cut_heal: 1,
        maxtime: 10
    },
    '05AB': {//効果
        name: 'クラウンロード',
        type: [false, true, false, false, false],
        effect: 1,
        cut: 1.1,
        cut_heal: 1,
        maxtime: 10
    },
    '10EA': {
        name: 'エピサイクル',
        type: [false, false, false, false, true],
        effect: 1,//0.7-0.8-0.9
        cut: 1,
        cut_heal: 1,
        maxtime: 10
    },
    '10EB': {
        name: 'レトログレード実行可',
        type: [false, false, false, false, true],
        effect: 1,
        cut: 1,
        cut_heal: 1,
        maxtime: 10
    },
    '10EC': {
        name: 'オラクル実行可',
        type: [false, false, false, false, true],
        effect: 1,
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
        maxtime: 6
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
    '0C64': {
        name: '急所経穴',
        type: [false, false, false, false, false],
        effect: 1,
        cut: 1,
        cut_heal: 1,
        maxtime: 4
    },
    '0C62': {
        name: '紅蓮の神髄',
        type: [true, false, false, false, true],
        effect: 1.5,
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
        maxtime: 8
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
    '10CD': {
        name: '乾坤闘気弾実行可',
        type: [false, false, false, false, true],
        effect: 1,
        cut: 1,
        cut_heal: 1,
        maxtime: 10
    },
    '1136': {//金剛の極意（ダメージ集計用？）
        name: 'Unknown_1136',
        type: [false, false, false, false, true],
        effect: 1,
        cut: 1,
        cut_heal: 1,
        maxtime: 10
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
    '10CE': {
        name: 'スタークロッサー実行可',
        type: [false, false, false, false, true],
        effect: 1,
        cut: 1,
        cut_heal: 1,
        maxtime: 10
    },
    '1134': {
        name: 'ナーストレンド実行可',
        type: [false, false, false, false, true],
        effect: 1,
        cut: 1,
        cut_heal: 1,
        maxtime: 10
    },
    //Ninja
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
        maxtime: 20
    },
    '0524': {
        name: 'かくれる',
        type: [false, false, false, false, true],
        effect: 1,
        cut: 1,
        cut_heal: 1,
        maxtime: 4
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
        maxtime: 4
    },
    '10CF': {
        name: '毒盛の術',
        type: [false, false, true, false, false],
        effect: 1,
        cut: 1.1,
        cut_heal: 1,
        maxtime: 8
    },
    '10D0': {
        name: '土遁の術',
        type: [false, false, true, false, true],
        effect: 1,
        cut: 0.85,
        cut_heal: 1,
        maxtime: 4
    },
    '10D1': {
        name: '是生滅法実行可',
        type: [false, false, false, false, true],
        effect: 1,
        cut: 1,
        cut_heal: 1,
        maxtime: 9999
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
        maxtime: 4
    },
    '0526': {
        name: '残心実行可',
        type: [false, false, false, false, true],
        effect: 1,
        cut: 1,
        cut_heal: 1,
        maxtime: 10
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
        name: '天道雪月花実行可',
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
    '10D2': {
        name: '崩し［弱］',
        type: [false, false, false, false, false],
        effect: 1,//自分からのみ10%上昇
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
        maxtime: 20
    },
    '0B2C': {
        name: 'リターン実行可',
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
        type: [false, false, false, false, true],
        effect: 1,
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
    '10D3': {
        name: 'エクスギロティン実行可',
        type: [false, false, false, false, true],
        effect: 1,
        cut: 1,
        cut_heal: 1,
        maxtime: 10
    },
    '10D4': {
        name: 'デスワラント',
        type: [false, false, false, false, false],
        effect: 1,
        cut: 1,
        cut_heal: 1,
        maxtime: 8
    },
    '10D5': {
        name: 'ペルフェクティオ実行可',//フィアー？
        type: [false, false, false, false, true],
        effect: 1,
        cut: 1,
        cut_heal: 1,
        maxtime: 10
    },//Viper
    '0FF5': {
        name: '参の牙【咬撃】実行後',
        type: [false, false, false, false, true],
        effect: 1,
        cut: 1,
        cut_heal: 1,
        maxtime: 10
    },
    '0FF6': {
        name: '壱の蛇【猛襲】実行後',
        type: [false, false, false, false, true],
        effect: 1,
        cut: 1,
        cut_heal: 1,
        maxtime: 10
    },
    '0FF7': {
        name: '弐の蛇【疾速】実行後',
        type: [false, false, false, false, true],
        effect: 1,
        cut: 1,
        cut_heal: 1,
        maxtime: 10
    },
    '0FF8': {
        name: '飛蛇連尾撃実行可',
        type: [false, false, false, false, true],
        effect: 1,
        cut: 1,
        cut_heal: 1,
        maxtime: 10
    },
    '0FF9': {
        name: '?',
        type: [false, false, false, false, true],
        effect: 1,
        cut: 1,
        cut_heal: 1,
        maxtime: 10
    },
    '0FFA': {
        name: '祖霊の蛇【壱】実行後',
        type: [false, false, false, false, true],
        effect: 1,
        cut: 1,
        cut_heal: 1,
        maxtime: 10
    },
    '0FFB': {
        name: '祖霊の蛇【弐】実行後',
        type: [false, false, false, false, true],
        effect: 1,
        cut: 1,
        cut_heal: 1,
        maxtime: 10
    },
    '0FFC': {
        name: '祖霊の蛇【参】実行後',
        type: [false, false, false, false, true],
        effect: 1,
        cut: 1,
        cut_heal: 1,
        maxtime: 10
    },
    '0FFD': {
        name: '祖霊の蛇【肆】実行後',
        type: [false, false, false, false, true],
        effect: 1,
        cut: 1,
        cut_heal: 1,
        maxtime: 10
    },
    '0FFE': {
        name: '祖霊降ろし',
        type: [false, false, false, false, true],
        effect: 1,
        cut: 1,
        cut_heal: 1,
        maxtime: 20
    },
    '0FFF': {
        name: '蛇行',
        type: [false, false, false, false, true],
        effect: 1,
        cut: 1,
        cut_heal: 1,
        maxtime: 4
    },
    '1000': {
        name: '蛇鱗',
        type: [false, false, true, false, true],
        effect: 1,
        cut: 0.5,
        cut_heal: 1,
        maxtime: 4
    },
    '1001': {
        name: '蛇鱗［バリア］',
        type: [false, false, false, false, true],
        effect: 1,
        cut: 1,
        cut_heal: 1,
        maxtime: 4
    },
    '1002': {
        name: '蛇血',
        type: [false, false, false, false, true],
        effect: 1,
        cut: 1,
        cut_heal: 1,
        maxtime: 4
    },
    '1003': {
        name: '惨毒',
        type: [false, false, false, false, false],
        effect: 1,//自身からのみ1.25
        cut: 1,
        cut_heal: 1,
        maxtime: 10
    },
    //Bird
    '0C41': {
        name: '詩心',
        type: [false, false, false, false, true],
        effect: 1,
        cut: 1,
        cut_heal: 1,
        maxtime: 10
    },
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
    '0C47': {
        name: '時神のピーアン',
        type: [false, false, false, false, true],
        effect: 1,
        cut: 1,
        cut_heal: 1,
        maxtime: 8
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
    '0882': {
        name: '時神の護り',
        type: [false, false, true, true, true],
        effect: 1,
        cut: 0.75,
        cut_heal: 1.25,
        maxtime: 4
    },
    '10D8': {
        name: '英雄のアンコール実行可',
        type: [false, false, false, false, true],
        effect: 1,
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
    '0C4E': {
        name: 'ドリル起動',
        type: [false, false, false, false, true],
        effect: 1,
        cut: 1,
        cut_heal: 1,
        maxtime: 9999
    },
    '0C4F': {
        name: 'バイオブラスト起動',
        type: [false, false, false, false, true],
        effect: 1,
        cut: 1,
        cut_heal: 1,
        maxtime: 9999
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
    '0C52': {
        name: '回天のこぎり',
        type: [false, false, true, false, false],
        effect: 1,
        cut: 1.2,
        cut_heal: 1,
        maxtime: 6
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
        maxtime: 7
    },
    '0C55': {
        name: 'エーテルモーター[害]',
        type: [false, false, true, false, false],
        effect: 1,
        cut: 1.1,
        cut_heal: 1,
        maxtime: 7
    },
    '0C56': {
        name: 'アナライズ',
        type: [false, false, true, false, true],
        effect: 1,
        cut: 1,
        cut_heal: 1,
        maxtime: 10
    },
    '052B': {
        name: 'ワイルドファイア',
        type: [false, false, false, false, false],
        effect: 1,
        cut: 1,
        cut_heal: 1,
        maxtime: 7
    },
    '07E2': {
        name: 'ワイルドファイア',
        type: [false, false, true, false, false],
        effect: 1,
        cut: 1,
        cut_heal: 1,
        maxtime: 9
    },
    '07E3': {
        name: 'バイオブラスト',
        type: [false, false, true, false, false],
        effect: 1,
        cut: 1,
        cut_heal: 1,
        maxtime: 9
    },
    //Dancer
    '07E6': {
        name: '剣の舞い',
        type: [true, false, false, false, true],
        effect: 1.1,
        cut: 1,
        cut_heal: 1,
        maxtime: 10
    },
    '0800': {
        name: 'アン・アヴァン',
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
    '0BD0': {
        name: '誘惑',
        type: [false, false, false, false, false],
        effect: 1,
        cut: 1,
        cut_heal: 1,
        maxtime: 2
    },
    '0C57': {
        name: '飛剣',
        type: [false, false, false, false, true],
        effect: 1,
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
        cut: 0.75,
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
    '10D9': {
        name: '暁の絆',
        type: [false, false, false, false, true],
        effect: 1,
        cut: 1,
        cut_heal: 1,
        maxtime: 9999
    },
    '10DA': {
        name: '暁の舞い',
        type: [true, false, false, false, true],
        effect: 1.1,
        cut: 1,
        cut_heal: 1,
        maxtime: 10
    },
    //BlackMage
    '0C8C': {
        name: 'アストラルファイアI',
        type: [false, false, false, false, true],
        effect: 1,
        cut: 1,
        cut_heal: 1,
        maxtime: 30
    },
    '0C8D': {
        name: 'アストラルファイアII',
        type: [false, false, false, false, true],
        effect: 1,
        cut: 1,
        cut_heal: 1,
        maxtime: 30
    },
    '0C8E': {
        name: 'アンブラルブリザードI',
        type: [false, false, false, false, true],
        effect: 1,
        cut: 1,
        cut_heal: 1,
        maxtime: 30
    },
    '0C8F': {
        name: 'アンブラルブリザードII',
        type: [false, false, false, false, true],
        effect: 1,
        cut: 1,
        cut_heal: 1,
        maxtime: 30
    },
    '0C92': {
        name: '火傷',
        type: [false, false, false, false, false],
        effect: 1,
        cut: 1,
        cut_heal: 1,
        maxtime: 6//6-9-12
    },
    '0C93': {
        name: '氷結',
        type: [false, false, false, false, false],
        effect: 1,
        cut: 1,
        cut_heal: 1,
        maxtime: 3//1-2-3
    },
    '0C95': {
        name: 'バースト',
        type: [false, false, false, false, true],
        effect: 1,
        cut: 1,
        cut_heal: 1,
        maxtime: 10
    },
    '0C96': {
        name: 'ソウルレゾナンス',
        type: [false, false, false, false, true],
        effect: 1,
        cut: 1,
        cut_heal: 1,
        maxtime: 15
    },
    '0C97': {
        name: 'パラドックスシンボル',
        type: [false, false, false, false, true],
        effect: 1,
        cut: 1,
        cut_heal: 1,
        maxtime: 15
    },
    '0D35': {
        name: 'アストラルファイアIII',
        type: [false, false, false, false, true],
        effect: 1,
        cut: 1,
        cut_heal: 1,
        maxtime: 15
    },
    '0D36': {
        name: 'アンブラルブリザードIII',
        type: [false, false, false, false, true],
        effect: 1,
        cut: 1,
        cut_heal: 1,
        maxtime: 15
    },
    '10DB': {
        name: 'リース・オブ・ファイア',
        type: [false, false, false, false, true],
        effect: 1,
        cut: 1,
        cut_heal: 1,
        maxtime: 10
    },
    '10DC': {
        name: 'リース・オブ・アイス',
        type: [false, false, true, false, true],
        effect: 1,
        cut: 0.8,
        cut_heal: 1,
        maxtime: 10
    },
    '10DD': {
        name: 'エレメントスター',
        type: [false, false, false, false, true],
        effect: 1,
        cut: 1,
        cut_heal: 1,
        maxtime: 30
    },
    '10ED': {
        name: 'レサージー',
        type: [true, false, false, false, false],
        effect: 0.67,
        cut: 1,
        cut_heal: 1,
        maxtime: 60
    },
    //Summoner
    '0C98': {
        name: '守りの光',
        type: [false, false, true, false, true],
        effect: 1,
        cut: 0.75,
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
    '0C9B': {
        name: 'スリップストリーム[害]',
        type: [false, false, false, false, false],
        effect: 1,
        cut: 1,
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
        type: [false, false, false, false, false],
        effect: 1,
        cut: 1,
        cut_heal: 1,
        maxtime: 5
    },
    '0CA0': {//煉獄の炎
        name: 'リヴァレーション',
        type: [true, false, false, false, false],
        effect: 0.5,
        cut: 1,
        cut_heal: 1,
        maxtime: 15
    },
    '112F': {
        name: 'ルインジャ実行可',
        type: [false, false, false, false, true],
        effect: 1,
        cut: 1,
        cut_heal: 1,
        maxtime: 10
    },
    '1130': {
        name: 'クリムゾンストライク実行可',
        type: [false, false, false, false, true],
        effect: 1,
        cut: 1,
        cut_heal: 1,
        maxtime: 10
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
    '08EA': {
        name: 'エンボルデン',
        type: [true, false, true, false, true],
        effect: 1.08,
        cut: 0.92,
        cut_heal: 1,
        maxtime: 8
    },
    '0CA2': {//White - Barrier
        name: 'エンリポスト',
        type: [false, false, false, false, true],
        effect: 1,
        cut: 1,
        cut_heal: 1,
        maxtime: 6
    },
    '0CA3': {//White - Barrier
        name: 'エンリポスト',
        type: [false, false, false, false, true],
        effect: 1,
        cut: 1,
        cut_heal: 1,
        maxtime: 6
    },
    '0CA4': {//White - Barrier
        name: 'エンルドゥブルマン',
        type: [false, false, false, false, true],
        effect: 1,
        cut: 1,
        cut_heal: 1,
        maxtime: 6
    },
    '0CAA': {
        name: 'モノマキー',
        type: [true, false, false, false, false],
        effect: 0.9,//付与された人へのダメージが1.1倍
        cut: 1,
        cut_heal: 1,
        maxtime: 7
    },
    '0CAB': {
        name: 'デプラスマン',
        type: [true, true, false, false, true],
        effect: 1.15,
        cut: 1,
        cut_heal: 1,
        maxtime: 7
    },
    '10DF': {
        name: 'スコーチ',
        type: [false, false, false, false, false],
        effect: 1,
        cut: 1,
        cut_heal: 1,
        maxtime: 6
    },
    '10E0': {
        name: 'フォルテ',
        type: [false, false, true, false, true],
        effect: 1,
        cut: 0.5,
        cut_heal: 1,
        maxtime: 4
    },
    '10E1': {
        name: 'ブライヤー・クロゼ実行可',
        type: [false, false, false, false, true],
        effect: 1,
        cut: 1,
        cut_heal: 1,
        maxtime: 6
    },
    '10E2': {
        name: 'プリフルジェンス実行可',
        type: [false, false, false, false, true],
        effect: 1,
        cut: 1,
        cut_heal: 1,
        maxtime: 6
    },
    //Pct
    '1004': {
        name: '色魔法2実行可',
        type: [false, false, false, false, true],
        effect: 1,
        cut: 1,
        cut_heal: 1,
        maxtime: 15
    },
    '1005': {
        name: '色魔法3実行可',
        type: [false, false, false, false, true],
        effect: 1,
        cut: 1,
        cut_heal: 1,
        maxtime: 15
    },
    '1006': {
        name: 'サブトラクティブパレット',
        type: [false, false, false, false, true],
        effect: 1,
        cut: 1,
        cut_heal: 1,
        maxtime: 9999
    },
    '1007': {
        name: 'モーグリシンボル',
        type: [false, false, false, false, true],
        effect: 1,
        cut: 1,
        cut_heal: 1,
        maxtime: 9999
    },
    '1008': {
        name: 'マディーンシンボル',
        type: [false, false, false, false, true],
        effect: 1,
        cut: 1,
        cut_heal: 1,
        maxtime: 9999
    },
    '1009': {
        name: 'ピクトポンポン',
        type: [false, false, false, false, true],
        effect: 1,
        cut: 1,
        cut_heal: 1,
        maxtime: 9999
    },
    '100A': {
        name: 'ピクトウィング',
        type: [false, false, false, false, true],
        effect: 1,
        cut: 1,
        cut_heal: 1,
        maxtime: 9999
    },
    '100B': {
        name: 'ピクトクロー',
        type: [false, false, false, false, true],
        effect: 1,
        cut: 1,
        cut_heal: 1,
        maxtime: 9999
    },
    '100C': {
        name: 'ピクトファング',
        type: [false, false, false, false, true],
        effect: 1,
        cut: 1,
        cut_heal: 1,
        maxtime: 9999
    },
    '100D': {
        name: 'イマジンポンポン',
        type: [true, true, false, false, true],
        effect: 1.2,
        cut: 1,
        cut_heal: 1,
        maxtime: 10
    },
    '100E': {
        name: 'イマジンウィング',
        type: [false, false, false, false, true],
        effect: 1,
        cut: 1,
        cut_heal: 1,
        maxtime: 10
    },
    '100F': {
        name: 'イマジンクロー',
        type: [false, false, true, true, false],
        effect: 1,
        cut: 1.1,
        cut_heal: 0.8,
        maxtime: 10
    },
    '1010': {
        name: 'イマジンファング',
        type: [false, false, false, false, false],
        effect: 1,
        cut: 1,
        cut_heal: 1,
        maxtime: 12
    },
    '1011': {
        name: 'スマッジ',
        type: [false, false, false, false, true],
        effect: 1,
        cut: 1,
        cut_heal: 1,
        maxtime: 5
    },
    '1012': {
        name: 'テンペラコート',
        type: [false, false, false, false, true],
        effect: 1,
        cut: 1,
        cut_heal: 1,
        maxtime: 10
    },
    '1013': {
        name: 'テンペラグラッサ',
        type: [false, false, false, false, true],
        effect: 1,
        cut: 1,
        cut_heal: 1,
        maxtime: 10
    },
    '1014': {
        name: 'ウォール・オブ・ファット',
        type: [false, false, false, false, true],
        effect: 1,
        cut: 1,
        cut_heal: 1,
        maxtime: 15
    },
    '1015': {
        name: 'ウォール・オブ・ファット【被】',
        type: [false, false, true, true, true],
        effect: 1,
        cut: 0.75,
        cut_heal: 1.25,
        maxtime: 5
    },
    '1016': {
        name: 'スタープリズム実行可',
        type: [false, false, false, false, true],
        effect: 1,
        cut: 1,
        cut_heal: 1,
        maxtime: 15
    },
    '1017': {
        name: 'スタープリズム',
        type: [false, false, false, false, true],
        effect: 1,
        cut: 1,
        cut_heal: 1,
        maxtime: 12
    },
    '101C': {
        name: 'スタープリズム',
        type: [false, false, false, false, true],
        effect: 1,
        cut: 1,
        cut_heal: 1,
        maxtime: 12
    },
    '101D': {
        name: 'ドラフトポンポン',
        type: [false, false, false, false, true],
        effect: 1,
        cut: 1,
        cut_heal: 1,
        maxtime: 12
    },
    '101E': {
        name: 'ドラフトクロー',
        type: [false, false, false, false, true],
        effect: 1,
        cut: 1,
        cut_heal: 1,
        maxtime: 12
    },
    '101F': {
        name: 'ドラフトファング',
        type: [false, false, false, false, true],
        effect: 1,
        cut: 1,
        cut_heal: 1,
        maxtime: 12
    },
    '10E4': {
        name: 'ラフドローイング',
        type: [false, false, false, false, true],
        effect: 1,
        cut: 1,
        cut_heal: 1,
        maxtime: 12
    },
    //General Buff
    '0BEE': {
        name: '防御',
        type: [false, false, true, false, true],
        effect: 1,
        cut: 0.1,
        cut_heal: 1,
        maxtime: 4
    },
    '0E59': {
        name: '防御【弱】',
        type: [false, false, true, false, true],
        effect: 1,
        cut: 0.5,
        cut_heal: 1,
        maxtime: 4
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
    //RoleAction
    '1183': {
        name: 'PvPアクション ランページ',
        type: [false, false, false, false, true],
        effect: 1,
        cut: 1,
        cut_heal: 1,
        maxtime: 9999
    },
    '1184': {
        name: 'PvPアクション ランパート',
        type: [false, false, false, false, true],
        effect: 1,
        cut: 1,
        cut_heal: 1,
        maxtime: 9999
    },
    '1185': {
        name: 'PvPアクション フルスイング',
        type: [false, false, false, false, true],
        effect: 1,
        cut: 1,
        cut_heal: 1,
        maxtime: 9999
    },
    '1186': {
        name: 'PvPアクション ブラッドバス',
        type: [false, false, false, false, true],
        effect: 1,
        cut: 1,
        cut_heal: 1,
        maxtime: 9999
    },
    '1187': {
        name: 'PvPアクション スウィフト',
        type: [false, false, false, false, true],
        effect: 1,
        cut: 1,
        cut_heal: 1,
        maxtime: 9999
    },
    '1188': {
        name: 'PvPアクション スマイト',
        type: [false, false, false, false, true],
        effect: 1,
        cut: 1,
        cut_heal: 1,
        maxtime: 9999
    },
    '1189': {
        name: 'PvPアクション スピードスター',
        type: [false, false, false, false, true],
        effect: 1,
        cut: 1,
        cut_heal: 1,
        maxtime: 9999
    },
    '118A': {
        name: 'PvPアクション ブレイブ',
        type: [false, false, false, false, true],
        effect: 1,
        cut: 1,
        cut_heal: 1,
        maxtime: 9999
    },
    '118B': {
        name: 'PvPアクション イーグルアイ',
        type: [false, false, false, false, true],
        effect: 1,
        cut: 1,
        cut_heal: 1,
        maxtime: 9999
    },
    '118C': {
        name: 'PvPアクション コメット',
        type: [false, false, false, false, true],
        effect: 1,
        cut: 1,
        cut_heal: 1,
        maxtime: 9999
    },
    '118D': {
        name: 'PvPアクション',//バリア
        type: [false, false, false, false, true],
        effect: 1,
        cut: 1,
        cut_heal: 1,
        maxtime: 9999
    },
    '118E': {
        name: 'PvPアクション ダルウェポン',
        type: [false, false, false, false, true],
        effect: 1,
        cut: 1,
        cut_heal: 1,
        maxtime: 9999
    },
    '11A4': {
        name: 'PvPアクション ファントムダート',
        type: [false, false, false, false, true],
        effect: 1,
        cut: 1,
        cut_heal: 1,
        maxtime: 9999
    },
    '118F': {
        name: 'PvPアクション ヒール',
        type: [false, false, false, false, true],
        effect: 1,
        cut: 1,
        cut_heal: 1,
        maxtime: 9999
    },
    '1190': {
        name: 'PvPアクション ストンラスキン',
        type: [false, false, false, false, true],
        effect: 1,
        cut: 1,
        cut_heal: 1,
        maxtime: 9999
    },
    '1191': {
        name: 'PvPアクション ディアブロシス',
        type: [false, false, false, false, true],
        effect: 1,
        cut: 1,
        cut_heal: 1,
        maxtime: 9999
    },
    //RoleAction Tank
    '117C': {
        name: 'ランページ',
        type: [false, false, true, false, false],
        effect: 1,
        cut: 1.25,
        cut_heal: 1,
        maxtime: 10
    },
    '07BA': {
        name: 'ランパート',
        type: [false, false, true, true, true],
        effect: 1,
        cut: 0.5,
        cut_heal: 1.25,
        maxtime: 15
    },
    //RoleAction Healer
    '1181': {
        name: 'ストンラスキン',
        type: [false, false, false, false, true],
        effect: 1,
        cut: 1,
        cut_heal: 1,
        maxtime: 10
    },
    '1182': {
        name: 'ディアブロシス',
        type: [false, false, false, true, false],
        effect: 1,
        cut: 0.5,
        cut_heal: 0.75,
        maxtime: 10
    },
    //RoleAction Melee
    '07BE': {
        name: 'ブラッドバス',
        type: [false, false, false, false, true],
        effect: 1,
        cut: 1,
        cut_heal: 1,
        maxtime: 10
    },
    '117D': {
        name: 'スウィフト',
        type: [false, false, false, false, true],
        effect: 1,
        cut: 1,
        cut_heal: 1,
        maxtime: 44
    },
    //RoleAction Range
    '117E': {
        name: 'スピードスター',
        type: [false, false, false, false, true],
        effect: 1,
        cut: 1,
        cut_heal: 1,
        maxtime: 10
    },
    '117F': {
        name: 'ブレイブ',
        type: [true, false, true, false, true],
        effect: 1.25,
        cut: 0.75,
        cut_heal: 1,
        maxtime: 44
    },
    //RoleAction caster
    '1180': {
        name: 'ダルウェポン',
        type: [true, false, false, true, false],
        effect: 0.75,
        cut: 1,
        cut_heal: 0.75,
        maxtime: 10
    },
    '07C2': {
        name: 'ファントムダート',
        type: [false, true, false, false, false],
        effect: 1,
        cut: 1.25,
        cut_heal: 1,
        maxtime: 44
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
        effect: 1.4,
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
        type: [true, false, false, false, true],
        effect: 1.5,
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
    //制圧
    '1192': {
        name: '予備電力',
        type: [false, false, false, false, true],
        effect: 1,
        cut: 1,
        cut_heal: 1,
        maxtime: 9999
    },
    '0C01': {
        name: '感電',
        type: [false, false, false, false, false],
        effect: 1,
        cut: 1,
        cut_heal: 1,
        maxtime: 9999
    }
};

export const EFFECT_ID_LIST = Object.keys(EFFECT_ID);