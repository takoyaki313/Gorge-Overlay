import { timestamp_change } from "./logline_other.js";
import { hpdata_add } from "./hpdata.js";
import { update_maindata, alliance_dunamis_update } from "../maindataEdit.js";
import { Stack_buff } from "./loglineGrobal.js";
import { buffID_cordinate } from "./26playerBuffAdd.js";

export const networkDoT_sync_38 = async (log) => {
    //await dot_calc_main(log);
    let player_data = {};
    if (log[6] === '') {
        player_data = {
            nameID: log[2],
            maxhp: Number(log[6]),
            currenthp: Number(log[5]),
            lastupdate: log[1],
            time_number: await timestamp_change(log[1])
        };
    }
    else {
        player_data = {
            nameID: log[2],
            currenthp: Number(log[5]),
            maxhp: Number(log[6]),
            x_position: log[11],
            y_position: log[12],
            z_position: log[13],
            rotate: log[14],
            lastupdate: log[1],
            time_number: await timestamp_change(log[1])
        };
    }
    await player_buff_list_update(log.slice(15, log.length - 1), player_data.nameID, player_data.lastupdate);
    await hpdata_add(log[2], player_data, ' log_38 ');
    //await dot_calculation(log);
}

const player_buff_list_update = async (data, nameID, lastupdate) => {
    if (data.length % 3 !== 0) {
        if (window.devMode.logLevel > 2) {
            console.error('This data area is %3 === 0 -> ' + data.length);
            console.error(data);
        }
        return null;
    }
    if (data.length === 0) {
        //effect reset
        await update_maindata('Player_hp', 'nameID', nameID, ['effect', [], true], ['dot_potencial', [], true], ['lastupdate', lastupdate, true]);
        return null;
    }
    else {
        let data_num = data.length / 3;
        let checked = 0;
        let replace_data = [];
        for (let i = 0; i < data_num; i++) {
            //console.log(data[0 + (i * 3)] + ':'+data[1 + (i * 3)] + ':'+data[2 + (i * 3)]);
            if (data[0 + (i * 3)] !== '0' || data[2 + (i * 3)] !== '0') {
                let effectID = await buffID_cordinate(data[0 + (i * 3)]);
                if (Stack_buff.indexOf(effectID) !== -1) {
                    replace_data.push({ buffID: data[0 + (i * 3)], attacker: data[2 + (i * 3)] });
                    checked += await dunamis_checker(nameID, effectID, parseInt(data[0 + (i * 3)].substring(0, 2), 16), lastupdate);
                }
                else {
                    replace_data.push({ buffID: effectID, attacker: data[2 + (i * 3)] });
                    checked += await dunamis_checker(nameID, effectID, null, lastupdate);
                }
            }
        }
        if (checked === data_num) {//No Tensyon
            await update_maindata('Player_hp', 'nameID', nameID, ['effect', replace_data, true], ['dunamis', null, true]);
        }
        else {
            await update_maindata('Player_hp', 'nameID', nameID, ['effect', replace_data, true]);
        }
    }
}

const dunamis_checker = async (nameID, effectID, rank, lastupdate) => {
    let dunamis = ['0853', '0854', '0855', '0856', '0857', '05B9', '06C2'];
    // 05B9 Tensyon    06C2 TensyonMax
    if (dunamis.indexOf(effectID) !== -1 && nameID.substring(0, 2) === "10") {
        if (effectID === '05B9') {
            if (typeof rank !== 'number') {
                if (window.devMode.logLevel > 2) {
                    console.error('Tensyon_num is unknown', rank);
                    //console.error(Log);
                }
                return null;
            }
            update_maindata('Player_data', 'nameID', nameID, ['dunamis', rank, true]);
            if (window.Area.Type === 2) {
                alliance_dunamis_update(nameID, rank, lastupdate);
            }
        }
        else {//Tensyon 以外
            update_maindata('Player_data', 'nameID', nameID, ['dunamis', effectID, true]);
            if (window.Area.Type === 2) {
                alliance_dunamis_update(nameID, 20, lastupdate);
            }
        }
        return 0;
    }
    else {
        return 1;
    }

}