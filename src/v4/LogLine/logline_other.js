import { update_maindata } from "../maindataEdit";
import { AreaData } from "../..";

export const minimapChange_40 = async (log) => {
    const areaID = Number(log[2]);
    AreaData.areaset_40 = areaID;
}

export const primaryPlayerChanged_101 = async (log) => {
    await update_maindata('Player_data', 'nameID', log[2], ['name', log[3], true], ['ownerID', null, true], ['alliance', 1, true]);
}

export const partyChanged_102 = async (log) => {
    //data format
    //102|null|nameID|name|alliance|job|alliance(ABCDEF)
    update_maindata('Player_data', 'nameID', log[2], ['name', log[3], true], ['job', log[5], true], ['alliance', log[4], true], ['alliance_ID', log[6], true]);
}

export const timestamp_change = async (time) => {
    return Date.parse(time);
}

export const null_check = (data) => {
    if (data === '' || typeof data === 'undefined') {
        data = null;
    }
    return data;
}