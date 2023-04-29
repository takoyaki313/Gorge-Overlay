import { job_to_role } from '../role';
import { TensyonMax } from '../v4/LogLine/loglineGlobal';

import { JobhistoryTooltipLayout } from './tooltip/jobhistoryTooltip';
import { KillTooltipLayout, DeathTooltipLayout, AssistTooltipLayout } from './tooltip/kdaTooltip';
import { DynamishistoryTooltipLayout } from './tooltip/dynamisTooltip';
import { DamageTooltipLayout } from './tooltip/damageTooltip';
import { HealTooltipLayout } from "./tooltip/healTooltip";

class m_dataLayout {
    constructor() {
        this.damage = 0;
        this.dps_i = '0';
        this.dps_d = '.0';
        this.dps_tooltip = '';
        this.hps = '0';
        this.hps_tooltip = '';
        this.name = '';
        this.name_tooltip = '';
        this.nameID = '';
        this.job = '';
        this.job_tooltip = '';
        this.role = '';

        this.overPct = '';
        this.overPct_tooltip = '';

        this.r_left = '';
        this.r_left_tooltip = '';
        this.r_center = '';
        this.r_center_tooltip = '';
        this.r_right = '';
        this.r_right_tooltip = '';

        this.dynamis_text = '';
        this.dynamis_icon = '';
        this.dynamis_tooltip = '';

        this.alliance = 0;
    }

}

export class m_dataCombatant extends m_dataLayout {
    set push_data(combatant) {
        this.damage = combatant.damage;
        let sep_dps = separate_d_i(combatant_dps_formatChange(0, combatant.encdps));
        this.dps_i = sep_dps.int;
        this.dps_d = sep_dps.dec === '' ? '' : '.' + sep_dps.dec;
        this.dps_tooltip = 'encdps';
        let sep_hps = separate_d_i(combatant_dps_formatChange(0, combatant.enchps));
        this.hps = sep_hps.int;
        this.hps_tooltip = 'enchps';
        this.name = combatant.name;
        this.name_tooltip = '';
        this.nameID = combatant.name.replace("'", "");

        if (combatant.Job === "Limit Break") {
            this.job = "app_fc";
        }
        else if (combatant.Job === "") {
            this.job = 'app_world_wanderer';
        } else {
            this.job = combatant.Job.toLowerCase();
        }

        this.job_tooltip = this.job;
        this.role = job_to_role(this.job);

        this.overPct = combatant.OverHealPct;
        this.overPct_tooltip = 'OverHeal';

        this.r_left = combatant["crithit%"];
        this.r_left_tooltip = 'CritHit%';
        this.r_center = combatant.DirectHitPct;
        this.r_center_tooltip = 'DirectHit%';
        this.r_right = combatant.CritDirectHitPct;
        this.r_right_tooltip = 'CritDirectHit%';
    }
}

export class m_data extends m_dataLayout {
    set push_data(d_Data) {

        this.damage = d_Data.damage.num;
        let sep_dps = separate_d_i(d_Data.damage);
        this.dps_i = sep_dps.int;
        this.dps_d = sep_dps.dec === '' ? '' : '.' + sep_dps.dec;


        this.dps_tooltip = d_Data.damage_All.length > 0 ? <DamageTooltipLayout data={d_Data} /> : "";
        let sep_hps = separate_d_i(d_Data.heal);
        this.hps = sep_hps.int
        this.hps_tooltip = d_Data.heal_All.length > 0 ? <HealTooltipLayout data={d_Data} /> : "";
        this.name = d_Data.name;
        this.name_tooltip = d_Data.server;
        this.nameID = d_Data.nameID;
        this.job = d_Data.job;

        this.job_tooltip = d_Data.jobhistory.length > 0 ? <JobhistoryTooltipLayout data={d_Data.jobhistory} /> : '';
        this.role = job_to_role(this.job);

        if (d_Data.heal.num > 0) {
            this.overPct = Math.round((d_Data.over_heal.num / d_Data.heal.num) * 100) + '%'
        }
        this.overPct_tooltip = d_Data.over_heal.num;

        this.r_left = d_Data.kills.length;
        this.r_left_tooltip = d_Data.kills.length > 0 ? <KillTooltipLayout simulationKDA={d_Data.kills} /> : '';
        this.r_center = d_Data.deaths.length;
        this.r_center_tooltip = d_Data.deaths.length > 0 ? <DeathTooltipLayout simulationKDA={d_Data.deaths} /> : '';
        this.r_right = d_Data.assists.length;
        this.r_right_tooltip = d_Data.assists.length > 0 ? <AssistTooltipLayout simulationKDA={d_Data.assists} /> : '';

        let dynamisCheck = { text: '', class: '' }
        if (d_Data.AreaType === 2) {
            //Gorge
            if (d_Data.dynamis === TensyonMax) {
                dynamisCheck.class = dynamis_detect(d_Data.dynamis)
            } else {
                dynamisCheck.text = d_Data.dynamis;
            }
        } else if (d_Data.AreaType > 0) {
            //Other
            dynamisCheck.class = dynamis_detect(d_Data.dynamis)
        }
        else {
            console.warn('OverlayCreate Type Not Matched (Area Input Error)');
            dynamisCheck = { text: '', class: '' }
        }

        this.dynamis_text = dynamisCheck.text;
        this.dynamis_icon = dynamisCheck.class;
        this.dynamis_tooltip = d_Data.dynamishistory.history.length > 0 ? <DynamishistoryTooltipLayout data={d_Data.dynamishistory.history} /> : '';
    }
}

const combatant_dps_formatChange = (damage, dps) => {
    return ({ num: Number(damage), ps: Number(dps), pss: String(dps) })
}

const separate_d_i = (ps_format) => {
    let i = Math.trunc(ps_format.ps);
    if (isNaN(i)) {
        i = 0;
    }
    let d = ps_format.pss.indexOf('.') !== -1 ? ps_format.pss.substring(ps_format.pss.indexOf('.') + 1) : '00';
    if (d.length === 1) {
        d += '0';
    }
    switch (String(i).length) {
        case (0):
            i = 0;
            d = '';
            break;
        case (1)://9.99
            break;
        case (2)://99.99
            break;
        case (3)://999.9
            d = d.substring(0, 1);
            break;
        default:
            d = '';
            break;
    }
    return { int: i, dec: d };
}

const dynamis_detect = (dynamis) => {
    if (typeof dynamis === 'number') {
        return 'dynamis_tensyon' + dynamis;
    } else {
        switch (dynamis) {
            case '0853':
                return 'dynamis_kouyou1';
            case '0854':
                return 'dynamis_kouyou2';
            case '0855':
                return 'dynamis_kouyou3';
            case '0856':
                return 'dynamis_kouyou4';
            case '0857':
                return 'dynamis_kouyou5';
            case '06C2':
                return 'dynamis_tensyon20';
            default:
                return '';
        }
    }
}