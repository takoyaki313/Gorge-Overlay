import { object_to_array } from "./resource";

export const Barrier_ID = [
    //Pld
    {
        actionid: '718B',
        action_potential: 0,
        dotid: '0BD2',
        name: 'ホーリーシェルトロン',
        potential: 10000,
        max: 4,
        synctype: 'calc',
        damagesync: 0,
        damage: false,
        type: 'barrier'
    }, {//War
        actionid: '719A',
        action_potential: 0,
        dotid: '0BD7',
        name: '原初の血煙',
        potential: 66000 * 0.2,
        max: 10,
        synctype: 'maxhp',
        damagesync: 0.2,//maxhp 20%
        damage: false,
        type: 'barrier'
    }, {//drk
        actionid: '71A5',
        action_potential: 0,
        dotid: '051C',
        name: 'ブラックナイト',
        potential: 8000,
        max: 8,
        synctype: 'calc',
        damagesync: 0,
        damage: false,
        type: 'barrier'
    }, {//whm
        actionid: '722B',
        action_potential: 0,
        dotid: '0C0E',
        name: 'アクアヴェール',
        potential: 8000,//成功時は2倍に威力アップ
        max: 10,
        synctype: 'calc',
        damagesync: 0,
        damage: false,
        type: 'barrier'
    }, {//sch
        actionid: '7230',
        action_potential: 4000,
        dotid: '0C0F',
        name: '鼓舞',
        potential: 4000,
        max: 12,
        synctype: 'buff_check',
        checkID: '0C16',
        synctype2: 2,
        damagesync: 1,
        damage: false,
        type: 'barrier'
    }, {
        actionid: '7238',
        action_potential: 6000,
        dotid: '07F1',
        name: 'セラフィックヴェール',
        potential: 6000,
        max: 10,
        synctype: 'heal',
        damagesync: 1,
        damage: false,
        type: 'barrier'
    }, {
        actionid: 'A21D',
        action_potential: 8000,
        dotid: '0C1A',
        name: 'コンソレイション',
        potential: 8000,
        max: 20,
        synctype: 'heal',
        damagesync: 1,
        damage: false,
        type: 'barrier'
    }, {//gnb
        actionid: '71B8',
        action_potential: 4000,
        dotid: '0BE8',
        name: 'ジャギュラーリップ',
        potential: 6000,
        max: 6,
        synctype: 'calc',
        damagesync: 0,
        damage: true,
        type: 'barrier'
    }, {
        actionid: '71B9',
        action_potential: 4000,
        dotid: '0BE8',
        name: 'アブドメンテアー',
        potential: 6000,
        max: 6,
        synctype: 'calc',
        damagesync: 0,
        damage: true,
        type: 'barrier'
    }, {
        actionid: '71BA',
        action_potential: 4000,
        dotid: '0BE8',
        name: 'アイガウジ',
        potential: 6000,
        max: 6,
        synctype: 'calc',
        damagesync: 0,
        damage: true,
        type: 'barrier'
    }, {
        actionid: '71B3',
        action_potential: 4000,
        dotid: '0BE8',
        name: 'ハイパーヴェロシティ',
        potential: 8000,
        max: 6,
        synctype: 'calc',
        damagesync: 0,
        damage: true,
        type: 'barrier'
    }, {
        actionid: 'A1E2',
        action_potential: 4000,
        dotid: '10C6',
        name: 'フェイテッドブランド',
        potential: 8000,
        max: 6,
        synctype: 'calc',
        damagesync: 0,
        damage: true,
        type: 'barrier'
    }, {//ast
        actionid: '723F',
        action_potential: 0,
        dotid: '0C1C',
        name: 'アスペクトベネフィク[夜]',
        potential: 4000,
        max: 12,
        synctype: 'calc',
        damagesync: 0,
        damage: false,
        type: 'barrier'
    }, {
        actionid: 'A222',
        action_potential: 0,
        dotid: '10EA',
        name: 'エピサイクル',
        potential: 8000,
        max: 10,
        synctype: 'calc',
        damagesync: 0,
        damage: false,
        type: 'barrier'

    }, {//drg
        actionid: '733A',
        action_potential: 16000,
        dotid: '0C6D',
        name: 'スカイシャッター',
        potential: 24000,
        max: 10,
        synctype: 'maxhp',
        damagesync: 0,
        damage: true,
        type: 'calc'
    }, {//rpr
        actionid: '7370',
        action_potential: 0,
        dotid: '0B2D',
        name: '守護のクレスト',
        potential: 12000,
        max: 10,
        synctype: 'calc',
        damagesync: 0,
        damage: false,
        type: 'barrier'
    }, {//sam
        actionid: '735A',
        action_potential: 8000,
        dotid: '07CF',
        name: '奥義波切',
        potential: 8000,
        max: 10,
        synctype: 'calc',
        damagesync: 0,
        damage: true,
        type: 'barrier'
    }, {
        actionid: '735B',
        action_potential: 8000,
        dotid: '0C80',
        name: '返し波切',
        potential: 8000,
        max: 10,
        synctype: 'calc',
        damagesync: 0,
        damage: true,
        type: 'barrier'
    },/*{//dnc
      actionid:'72F3',
      action_potential: 0,
      dotid:'0C5C',
      name:'刃の舞い[終]',
      potential: 1000,//2000-6000
      max : 10,
      synctype: 'stack-buff',
      checkbuff: [{buffID:'010C5C',potential:2000},{buffID:'020C5C',potential:3000},{buffID:'030C5C',potential:4000},{buffID:'040C5C',potential:5000}],
      damagesync : 0,
      damage : false,
      type:'barrier'
    },*/{//smn
        actionid: '73E6',
        action_potential: 0,
        dotid: '0C98',
        name: '守りの光',
        potential: 10000,
        max: 10,
        synctype: 'calc',
        damagesync: 0,
        damage: false,
        type: 'barrier'
    }, {//rdm
        actionid: '73F9',
        action_potential: 5000,
        dotid: '0CA2',
        name: 'エンリポスト',
        potential: 4000,
        max: 10,
        synctype: 'calc',
        damagesync: 0,
        damage: true,
        type: 'barrier'
    }, {
        actionid: '73FA',
        action_potential: 6000,
        dotid: '0CA3',
        name: 'エンツヴェルクハウ',
        potential: 4000,
        max: 10,
        synctype: 'calc',
        damagesync: 0,
        damage: true,
        type: 'barrier'
    }, {
        actionid: '73FB',
        action_potential: 7000,
        dotid: '0CA4',
        name: 'エンルドゥブルマン',
        potential: 4000,
        max: 10,
        synctype: 'calc',
        damagesync: 0,
        damage: true,
        type: 'barrier'
    }, {
        actionid: 'A218',
        action_potential: 0,
        dotid: '10E0',
        name: 'フォルテ',
        potential: 4000,
        max: 4,
        synctype: 'calc',
        damagesync: 0,
        damage: true,
        type: 'barrier'
    }, {//blm
        actionid: '73D9',
        action_potential: 12000,
        dotid: '0C95',
        name: 'バースト',
        potential: 12000,
        max: 10,
        synctype: 'calc',
        damagesync: 0,
        damage: true,
        type: 'barrier'
    }, {//mch
        actionid: '72E5',
        action_potential: 0,
        dotid: '0C54',
        name: 'エーテルモーター',
        potential: 6000,
        max: 10,
        synctype: 'calc',
        damagesync: 0,
        damage: false,
        type: 'barrier'
    }, {//nin
        actionid: '7347',
        action_potential: 0,
        dotid: '07DB',
        name: '分身の術',
        potential: 8000,
        max: 10,
        synctype: 'calc',
        damagesync: 0,
        damage: false,
        type: 'barrier'
    }, {
        actionid: '7348',
        action_potential: 0,
        dotid: '0C72',
        name: '風遁の術',
        potential: 16000,
        max: 10,
        synctype: 'calc',
        damagesync: 0,
        damage: false,
        type: 'barrier'
    }, {//mnk
        actionid: '732C',
        action_potential: 0,
        dotid: '0C65',
        name: '抜重歩法',
        potential: 8000,
        max: 5,
        synctype: 'calc',
        damagesync: 0,
        damage: false,
        type: 'barrier'
    }, {//pct
        actionid: '992B',
        action_potential: 0,
        dotid: '1012',
        name: 'テンペラコート',
        potential: 12000,
        max: 10,
        synctype: 'calc',
        damagesync: 0,
        damage: false,
        type: 'barrier'
    }, {
        actionid: '992C',
        action_potential: 0,
        dotid: '1013',
        name: 'テンペラグラッサ',
        potential: 6000,
        max: 10,
        synctype: 'calc',
        damagesync: 0,
        damage: false,
        type: 'barrier'
    }, {//vpr
        actionid: '9911',
        action_potential: 0,
        dotid: '1001',
        name: '蛇鱗［バリア］',
        potential: 4000,
        max: 4,
        synctype: 'calc',
        damagesync: 0,
        damage: false,
        type: 'barrier'
    }
];
export const Special_Barrier_ID = [{
    actionid: '7249',
    action_potential: 0,
    dotid: '0C25',//logline 26
    name: 'エウクラシア・ディアグノシス',
    potential: 8000,
    max: 15,
    synctype: 'calc',
    damagesync: 0,
    damage: false,
    type: 'barrier'
}, {
    actionid: '740A',//プネウマ
    action_potential: 0,
    dotid: '0C26',//logline 26
    name: 'ハイマ',
    potential: 3000,
    max: 10,
    synctype: 'calc',
    damagesync: 0,
    damage: false,
    type: 'barrier'
}];

export const Barrier_ID_Array = object_to_array(Barrier_ID, 'dotid');

export const Special_Barrier_ID_Array_Skill = object_to_array(Special_Barrier_ID, 'actionid');

export const Special_Barrier_ID_Array_Dot = object_to_array(Special_Barrier_ID, 'dotid');
