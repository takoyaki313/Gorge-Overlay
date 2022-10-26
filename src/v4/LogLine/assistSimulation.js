import { read_maindata, update_maindata } from "../maindataEdit.js";
import { what_include_buff } from "./hpdata.js";

export const assist_main = async (kill_player, death_player, death_attacker, lastupdate, time_number, death_player_name, attacker_aliance, death_job, attacker_job, attacker_name) => {
    let ally_kill = false;
    if (typeof attacker_aliance !== 'undefined') {
        if (attacker_aliance > 0) {
            ally_kill = true;
        }
    }
    //console.log('aliance->' + attacker_aliance.aliance + ' :result->' + ally_kill);
    if (ally_kill) {
        let damage_attacker = [];
        for (let i = 0; i < death_attacker.length; i++) {
            damage_attacker.push(death_attacker[i].attacker);
        }
        let assist_player = [];
        let attacker_effect = await read_maindata('Player_hp', 'nameID', kill_player, 'effect');
        let kill_buff_list = await what_include_buff(attacker_effect.effect, 'buff');
        let assist_dupe = kill_buff_list.concat(damage_attacker);
        for (let i = 0; i < assist_dupe.length; i++) {//
            if (assist_player.indexOf(assist_dupe[i]) === -1 && assist_dupe[i] !== kill_player) {
                assist_player.push(assist_dupe[i]);
            }
        }
        await assist_players_write(assist_player, 'assist', lastupdate, death_player, death_player_name, death_job, attacker_name, attacker_job, time_number, attacker_aliance);
        //console.log('Ally ->'+kill_player + ' -> '+ death_player + '  :' + lastupdate);
        //console.log(assist_player);
    }
    //kill list {}
    if (attacker_aliance === 1 && window.BATTLE_EVENT.TenSyonMax_Me/* && KILLSOUND*/) {
        //killsound_play();
    }
    await update_maindata('Player_data', 'nameID', kill_player, ['s_kill', 1, false], ['s-kill-name', { victimID: death_player, name: death_player_name, job: death_job, lastupdate: lastupdate, time_ms: time_number, time: Math.round((time_number - window.BATTLE_EVENT.Battle_Start_Time) / 1000) }, false], ['lastupdate', lastupdate, true]);
}

const  assist_players_write = async (nameID_array, type, lastupdate, deathID, death_player_name, death_job, kill_name, attacker_job, time_number, attacker_aliance) => {
    for (let i = 0; i < nameID_array.length; i++) {
        update_maindata('Player_data', 'nameID', nameID_array[i], [type, 1, false], ['s-' + type, { assist: deathID, name: death_player_name, job: death_job, killer: kill_name, killerjob: attacker_job, killer_alliance: attacker_aliance, lastupdate: lastupdate, time_number: time_number, time: Math.round((time_number - window.BATTLE_EVENT.Battle_Start_Time) / 1000) }, false], ['lastupdate', lastupdate, true]);
    }
}