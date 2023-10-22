import { read_maindata, update_maindata } from "../maindataEdit.js";
import { what_include_buff } from "./hpdata.js";
import { simulationKDA } from "../maindataFormat.js";
import { local } from "../../index.js";
import { killSound_play } from "../sound.js";
import { battleEvent } from "../../index.js";

export const assist_main = async (kill_player, death_player, death_attacker, lastupdate, time_number, death_player_name, attacker_alliance, death_job, attacker_job, attacker_name,death_alliance) => {
    let ally_kill = false;
    if (typeof attacker_alliance !== 'undefined') {
        if (attacker_alliance > 0) {
            ally_kill = true;
        }
    }
    //console.log('alliance->' + attacker_alliance.alliance + ' :result->' + ally_kill);
    let assist_player = [];
    if (ally_kill) {
        let damage_attacker = [];
        for (let i = 0; i < death_attacker.length; i++) {
            damage_attacker.push(death_attacker[i].attacker);
        }
        
        let attacker_effect = await read_maindata('Player_hp', 'nameID', kill_player, 'effect');
        let kill_buff_list = await what_include_buff(attacker_effect.effect, 'buff');
        let assist_dupe = kill_buff_list.concat(damage_attacker);
        for (let i = 0; i < assist_dupe.length; i++) {//
            if (assist_player.indexOf(assist_dupe[i]) === -1 && assist_dupe[i] !== kill_player) {
                assist_player.push(assist_dupe[i]);
            }
        }
        //console.log('Ally ->'+kill_player + ' -> '+ death_player + '  :' + lastupdate);
        //console.log(assist_player);
    }
    //kill list {}
    if (attacker_alliance === 1 && battleEvent.TenSyonMax_Me && local.rw_killSound) {
        killSound_play();
    }
    let s_kill_data = new simulationKDA(
        kill_player, attacker_name, attacker_job, attacker_alliance,
        death_player, death_player_name, death_job, death_alliance,
        assist_player,
        time_number,Math.round((time_number - battleEvent.timer.Get_BattleStart) / 1000)
    );

    await update_maindata('Player_data', 'nameID', kill_player, ['s_kill', 1, false], ['s-kill-name', s_kill_data , false], ['lastupdate', lastupdate, true]);
    for (let i = 0; i < assist_player.length; i++) {
        update_maindata('Player_data', 'nameID', assist_player[i], ['s_assist', 1, false], ['s-assist', s_kill_data, false], ['lastupdate', lastupdate, true]);
    }
    return s_kill_data;
}