import { read_maindata } from "../maindataEdit.js";
///////////////////////////////////////////////////////////////////////////////
export const Field_ID = 'E0000000';
///////////////////////////////////////////////////////////////////////////////
export const Oppresor_HP = 500000;
export const Justice_HP = 375000;//jas
export const Chaiser_HP = 250000;
export const Robot_Bunsin_HP = 100;
export const Robot_name = ['che', 'opp', 'jas'];
export const Core_Tower_HP = 8000000;
///////////////////////////////////////////////////////////////////////////////
// Skill ID / Buff ID
///////////////////////////////////////////////////////////////////////////////
export const DoubleRocketPuntch = '26FB';//ダブルロケットパンチ (SkillID)
export const Kaiki = '740F' //快気(SkillID)
export const GunyouPortion = '717F' //軍用ポーション(SkillID)
export const TensyonMax = '06C2';//テンションマックス (buffID)
///////////////////////////////////////////////////////////////////////////////
export const Stack_buff = ['05B9'/*テンション*/, '0BED'/*連続剣*/, '0C5B'/*喝采*/];
export const EXCLUDE_BUFF = ['07EB', '07EA', '0B37', '0B38'];//スタンス系　カルディア クローズドポジション
///////////////////////////////////////////////////////////////////////////////
export const Send_Action = false;

export const object_to_array = (object, key) => {
    let data = [];
    for (let i = 0; i < object.length; i++) {
        data.push(object[i][key]);
    }
    return data;
}

////////////////////////////////////////////////////////////////////////////
//OWNER ID LIST (03)
////////////////////////////////////////////////////////////////////////////
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
    window.OWNER_LIST.push([petID, ownerID, ownername]);
}

const owner_id_list_search = async (petID) => {
    let ownerID = null;
    for (let i = 0; i < window.OWNER_LIST.length; i++) {
        if (window.OWNER_LIST[i][0] === petID) {
            ownerID = window.OWNER_LIST[i][1];
            return ownerID;
        }
    }
    return ownerID;
}

export const owner_id_list_reset = () => {
    window.OWNER_LIST = [];
}