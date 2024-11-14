import { read_maindata } from "../maindataEdit.js";

///////////////////////////////////////////////////////////////////////////////
export const Field_ID = 'E0000000';
///////////////////////////////////////////////////////////////////////////////
export const Oppressor_HP = 600000;
export const Justice_HP = 450000;//jas
export const Chaiser_HP = 300000;
export const Robot_Bunsin_HP = 100;
export const Robot_name = ['che', 'opp', 'jas'];
export const Core_Tower_HP = 8000000;
///////////////////////////////////////////////////////////////////////////////
// Skill ID / Buff ID
///////////////////////////////////////////////////////////////////////////////
export const DoubleRocketPunch = '26FB';//ダブルロケットパンチ (SkillID)
export const Kaiki = '740F' //快気(SkillID)
export const GunyouPortion = '717F' //軍用ポーション(SkillID)
export const TensyonID = '05B9';
export const TensyonMax = '06C2';//テンションマックス (buffID)
export const DynamisIconID = ['0853', '0854', '0855', '0856', '0857', TensyonID , TensyonMax];
export const OpticalSight = '26F4'//ホークブラスター(SkillID)
export const BigMissile = '26F8'//超大型ミサイル(SkillID)
export const LimitBreak = [/*TANK*/'718D', '719B', '71A9', '71CA',/*HEALER*/'722E', '7235', '7247', '7252',
/*Range*/'72D9', '72E7', '72F8',/*MELEE*/'732D', '7339', '734B', '7361', '7371','9916',/*MAGICAL*/'73DE', '73E9', '73EE', '7408', '7409','992F'];
export const LimitBreak_Extend = [/*SCH*/'7237',/*SMN*/'73EB', '73F0',/*DRG*/'733A',/*PCT*/'9930',/*VPR*/'9905'];
///////////////////////////////////////////////////////////////////////////////
export const Stack_buff = ['05B9'/*テンション*/, '0BED'/*連続剣*/, '0C5B'/*喝采*/];
export const EXCLUDE_BUFF = ['07EB', '07EA', '0B37', '0B38'];//スタンス系　カルディア クローズドポジション
///////////////////////////////////////////////////////////////////////////////
export const Send_Action = false;

export const robotHP_Get = (rob) => {
    if (rob === 'che') {
        return Chaiser_HP;
    }
    else if (rob === 'opp') {
        return Oppressor_HP;
    }
    else if (rob === 'jas') {
        return Justice_HP;
    } else {
        return 0;
    }
}

////////////////////////////////////////////////////////////////////////////
//OWNER ID LIST (03)
////////////////////////////////////////////////////////////////////////////
export let OWNER_LIST = [];

export const pet_replace = async (nameID, name) => {
    let rtn = { nameID: nameID, name: name };
    if (nameID.substring(0, 2) === '40') {//もしペットIDならIDと名前を本人に入れ替える。
        let searched = await owner_id_list_search(nameID);
        if (searched !== null) {
            rtn.nameID = searched;
            let db = await read_maindata('Player_data', 'nameID', searched, 'name');
            if (db !== null) {
                rtn.name = db.name;
            }
        }
    }
    return rtn;
}

export const owner_id_list_add = async (ownerID, petID, ownername) => {
    OWNER_LIST.push([petID, ownerID, ownername]);
}

const owner_id_list_search = async (petID) => {
    let ownerID = null;
    for (let i = 0; i < OWNER_LIST.length; i++) {
        if (OWNER_LIST[i][0] === petID) {
            ownerID = OWNER_LIST[i][1];
            return ownerID;
        }
    }
    return ownerID;
}

export const owner_id_list_reset = () => {
    OWNER_LIST = [];
}