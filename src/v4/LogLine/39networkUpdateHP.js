import { timestamp_change } from "./logline_other.js";
import { hpdata_add } from "./hpdata.js";

export const networkupdatehp_39 = async (log) => {
    let player_data = {};
    if (log[5] === '') {
        player_data = {
            nameID: log[2],
            maxhp: Number(log[5]),
            currenthp: Number(log[4]),
            lastupdate: log[1],
            time_number: await timestamp_change(log[1])
        };
    }
    else {
        player_data = {
            nameID: log[2],
            currenthp: Number(log[4]),
            maxhp: Number(log[5]),
            x_position: log[10],
            y_position: log[11],
            z_position: log[12],
            rotate: log[13],
            lastupdate: log[1],
            time_number: await timestamp_change(log[1])
        };
    }
    await hpdata_add(log[2], player_data, null);

}