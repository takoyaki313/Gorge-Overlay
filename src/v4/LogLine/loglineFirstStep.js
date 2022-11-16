import { minimapChange_40, } from "./logline_other.js";
import { addcombatant } from "./03addCombatant.js";
import { removecombatant } from "./04removeCombatant.js";
import { log_party_push } from "./11party_push.js";
import { networkactionsync_21_22 } from "./21_22_networkActionSync.js";
import { networkDoT_24 } from "./24networkDoT.js";
import { kill_death_main_25 } from "./25kill_death.js";
import { player_buff_add_26 } from "./26playerBuffAdd.js";
import { marker_data_check } from "./29marker_data_check.js";
import { network_buff_removerd_30 } from "./30buffRemoved.js";
import { logline_battle_start_check } from "./33battleStartCheck.js";
import { networkAbility_receve } from "./37networkAbilityReceve.js";
import { networkDoT_sync_38 } from "./38networkDoT_Sync.js";
import { networkupdatehp_39 } from "./39networkUpdateHP.js";
import { primaryPlayerChanged_101 } from "./logline_other.js";



//////////////////////////////////////////////////////////////////////////////
export const loglineFirstStep = async (log) => {
    if (log[0] === '40') {
        //AREATYPE
        await minimapChange_40(log);
    }
    if (window.Area.Type === 0) {
        return;
    }
    switch (log[0]) {
        case '01'://Area Change
            break;
        case '03':
            await addcombatant(log);
            break;
        case '04':
            if (!window.BATTLE_EVENT.Result_Page) {
                await removecombatant(log);
            }
            break;
        case '11':
            if (window.Area.Type > 0) {
                log_party_push(log);
            }
            break;
        case '21':
            if (window.BATTLE_EVENT.Engage) {
                //await networkactionsync_21_22(log);
                await networkactionsync_21_22(log);
            }
            break;
        case '22':
            if (window.BATTLE_EVENT.Engage) {
                //await networkactionsync_21_22(log);
                await networkactionsync_21_22(log);
            }
            break;
        case '24':
            if (window.BATTLE_EVENT.Engage) {
                await networkDoT_24(log);
            }
            break;
        case '25':
            await kill_death_main_25(log);
            break;
        case '26':
            /*
            if (Logline_add_mode) {
                await action_add_tool(log); //action_tempに未登録 effectID
            }*/
            await player_buff_add_26(log);
            break;
        case '29':
            await marker_data_check(log);
            break;
        case '30':
            await network_buff_removerd_30(log);
            break;

        case '33':
            logline_battle_start_check(log);
            break;
        case '37':
            //await networkAbility_receve(log);
            await networkAbility_receve(log);
            break;
        case '38':
            if (window.BATTLE_EVENT.Engage) {
                await networkDoT_sync_38(log);
            }
            break;

        case '39':
            await networkupdatehp_39(log);
            break;
        case '41':
            //console.log(log);
            break;

        case '101':
            await primaryPlayerChanged_101(log);
            break;
        /*
        case '102':
            party_changed_dataupdate(log);
            //console.log(log);
            break;*/
        default:
            break;
    }
}