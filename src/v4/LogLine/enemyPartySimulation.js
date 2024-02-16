import { update_maindata, alliance_dynamis_update } from "../maindataEdit";
import { TensyonMax } from "./loglineGlobal";
const CHECK_RANGE = 5;//0.005s
export const enemyPartySimulation = async (queue) => {
    if (queue.length === 0) {
        return;
    }
    queue.sort((a, b) => a.time_ms - b.time_ms);
    let list = [];
    let refTime = queue[0].time_ms;
    list.push({ nameID: [queue[0].victim], time_ms: refTime, effectID: queue[0].buffID, alliance: queue[0].alliance, lastupdate: queue[0].lastupdate });
    if (queue.length > 1) {
        for (let i = 1; i < queue.length; i++) {
            if (Math.abs(refTime - queue[i].time_ms) <= CHECK_RANGE && list[list.length - 1].effectID === queue[i].buffID) {
                list[list.length - 1].nameID.push(queue[i].victim);
                if (list[list.length - 1].alliance === 0 && queue[i].alliance !== 0) {
                    list[list.length - 1].alliance = queue[i].alliance;
                } else if (list[list.length - 1].alliance > queue[i].alliance) {
                    //PartyNumberの削除とマージ処理
                    list[list.length - 1].alliance = queue[i].alliance;
                }
            } else {
                list.push({ nameID: [queue[i].victim], time_ms: queue[i].time_ms, effectID: queue[i].buffID, alliance: queue[i].alliance, lastupdate: queue[i].lastupdate });
                refTime = queue[i].time_ms;
            }
        }
    }
    for (let i = 0; i < list.length; i++) {
        if (list[i].nameID.length > 1) {
            let dynamisNum = 0;
            if (list[i].effectID === TensyonMax) {
                dynamisNum = 20;
            } else {
                dynamisNum = parseInt(list[i].effectID.substring(0, 2), 16);
            }
            let alliance_num = await alliance_dynamis_update(list[i].nameID[0], dynamisNum, list[i].lastupdate, list[i].alliance, list[i].nameID);
            for (let p = 0; p < list[i].nameID.length; p++) {
                update_maindata('Player_data', 'nameID', list[i].nameID[p], ['alliance', alliance_num, true]);
            }
        }
    }
}
