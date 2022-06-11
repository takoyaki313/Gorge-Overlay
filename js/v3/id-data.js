//////////////////////////////////////////////
const Field_ID = 'E0000000';
const Battle_Start_Envioroment_ID = '40000001';
const Battle_End_Envioroment_ID = '40000002';
const Oppresor_HP = 100000;
const Justice_HP = 75000;//jas
const Chaiser_HP = 50000;
const Robot_Bunsin = 100;
const Robot_name = ['che', 'opp', 'jas'];
const Core_Tower_HP = 2000000;
const Gorge_BattleTime = 900;
const Fl_BattleTime = 1200;
const CC_BattleTime = 300;
const Test_BattleTime = 300;
//////////////////////////////////////////////
//skilltype exclude action
/////////////////////////////////////////////
const DoubleRocketPuntch = '26FB';//ダブルロケットパンチ (SkillID)
const Kaiki = '740F' //快気(SkillID)
const GunyouPosion = '717F' //軍用ポーション(SkillID)
const TensyonMax = '06C2';//テンションマックス (buffID)
/////////////////////
//////// Setting
/////////////////////

/////////////////
///effect ID
/////////////////
let Lang_text = {
  ja: {
    Person: '人',
    Robot: 'ロボット',
    Maton: 'オブジェクト',
    Tower: 'タワー・コア',
    //
    self: '自分',
    party: 'パーティ',
    ally: '他アラ',
    other: 'オブジェクト',
    //income
    personincomedamage: '人',
    robincomedamage: 'ロボット',
    objectincomedamage: 'オブジェクト',
    otherpersonincomedamage: '人（不明）',
    //
    incomeselfheal: '自分',
    incomepartyheal: 'パーティ',
    incomeallyheal: '他アラ',
    incomeotherheal: 'オブジェクト',
    //
    overhealPct: 'オーバーヒール%',
    healed: 'HPS',
  },
  en: {
    Person: 'Person',
    Robot: 'Robot',
    Maton: 'Object',
    Tower: 'Tower/Core',
    //
    self: 'Myself',
    party: 'Party',
    ally: 'Aliance',
    other: 'Object',
    //income
    personincomedamage: 'Person',
    robincomedamage: 'Robot',
    objectincomedamage: 'Object',
    otherpersonincomedamage: 'Person (Unknown)',
    //
    incomeselfheal: 'Myself',
    incomepartyheal: 'Party',
    incomeallyheal: 'Aliance',
    incomeotherheal: 'Object',
    //
    overhealPct: 'OverHeal%',
    healed: 'HPS',
  },
};
var Lang_select = Lang_text.ja;
let EXCLUDE_BUFF = ['07EB', '07EA', '0B37', '0B38'];//スタンス系　カルディア クローズドポジション
let EFFECT_ID_LIST = [];
//////////////////////////////////////////////
//Job
//////////////////////////////////////////////
function jobID_to_string(id) {
  if (typeof id === 'string') {
    id = parseInt(id, 16);
  }
  let job = null;
  switch (id) {
    case 0:
      job = null;
      break;
    case 1:
      job = 'gla';
      break;
    case 2:
      job = 'pgl';
      break;
    case 3:
      job = 'mrd';
      break;
    case 4:
      job = 'lnc';
      break;
    case 5:
      job = 'arc';
      break;
    case 6:
      job = 'cnj';
      break;
    case 7:
      job = 'thm';
      break;
    case 8:
      job = 'crp';
      break;
    case 9:
      job = 'bsm';
      break;
    case 10:
      job = 'arm';
      break;
    case 11:
      job = 'gsm';
      break;
    case 12:
      job = 'ltw';
      break;
    case 13:
      job = 'wvr';
      break;
    case 14:
      job = 'alc';
      break;
    case 15:
      job = 'cul';
      break;
    case 16:
      job = 'nin';
      break;
    case 17:
      job = 'btn';
      break;
    case 18:
      job = 'fsh';
      break;
    case 19:
      job = 'pld';
      break;
    case 20:
      job = 'mnk';
      break;
    case 21:
      job = 'war';
      break;
    case 22:
      job = 'drg';
      break;
    case 23:
      job = 'brd';
      break;
    case 24:
      job = 'whm';
      break;
    case 25:
      job = 'blm';
      break;
    case 26:
      job = 'acn';
      break;
    case 27:
      job = 'smn';
      break;
    case 28:
      job = 'sch';
      break;
    case 29:
      job = 'rog';
      break;
    case 30:
      job = 'nin';
      break;
    case 31:
      job = 'mch';
      break;
    case 32:
      job = 'drk';
      break;
    case 33:
      job = 'ast';
      break;
    case 34:
      job = 'sam';
      break;
    case 35:
      job = 'rdm';
      break;
    case 36:
      job = 'bdm';
      break;
    case 37:
      job = 'gnb';
      break;
    case 38:
      job = 'dnc';
      break;
    case 39:
      job = 'rpr';
      break;
    case 40:
      job = 'sge';
      break;
    case 50:
      job = 'opp';
      break;
    case 51:
      job = 'che';
      break;
    case 52:
      job = 'jas';
      break;
    default:
      job = null;
  }
  return job;
}
function job_to_role(job) {
  let tank = ['pld', 'gla', 'war', 'mrd', 'drk', 'gnb'];
  let healer = ['whm', 'sch', 'ast', 'cnj', 'sge'];
  let melee = ['mnk', 'drg', 'nin', 'sam', 'pgl', 'lnc', 'rog', 'rpr'];
  let physical = ['brd', 'mch', 'dnc', 'arc'];
  let magical = ['blm', 'smn', 'rdm', 'thm', 'acn'];
  if (tank.indexOf(job) !== -1) {
    return 'tank';
  }
  else if (healer.indexOf(job) !== -1) {
    return 'healer';
  }
  else if (melee.indexOf(job) !== -1) {
    return 'melee';
  }
  else if (physical.indexOf(job) !== -1) {
    return 'physical';
  }
  else if (magical.indexOf(job) !== -1) {
    return 'magical';
  }
  else {
    return 'general';
  }
}
