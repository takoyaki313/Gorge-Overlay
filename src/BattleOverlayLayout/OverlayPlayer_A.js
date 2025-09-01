import { LimitBreakTooltipLayout } from "./tooltip/limitbreakTooltip";
import { PortionTooltipLayout } from "./tooltip/portionTooltip";
import { IncomeDamageTooltipLayout } from "./tooltip/incomeDamageTooltip";
import { DamagePersonToolTipLayout } from "./tooltip/damageTooltip";
import { RobotDamageToolTipLayout } from "./tooltip/damageTooltip";
import { ObjectDamageToolTipLayout } from "./tooltip/damageTooltip";
import { IncomeHealTooltipLayout } from "./tooltip/incomeHealTooltip";
import { DamageTooltipLayout } from "./tooltip/damageTooltip";

export class a_data {
    constructor(d_Data) {
        this.nameID = d_Data.nameID;
        this.name = d_Data.name;
        this.alliance = d_Data.alliance;
        this.AreaType = d_Data.AreaType;
        //
        this.damage_person = d_Data.damage_person.ps;
        this.damage_person_Tooltip = <DamagePersonToolTipLayout damage_G_All={d_Data.damage_G_All} />
        this.damage_robot = d_Data.damage_robot.ps;
        this.damage_robot_Tooltip = <RobotDamageToolTipLayout damage_G_All={d_Data.damage_G_All} />
        this.damage_maton = d_Data.damage_maton.ps;
        this.damage_tower = d_Data.damage_tower.ps;
        this.damage_maton_Tooltip = <ObjectDamageToolTipLayout damage_G_All={d_Data.damage_G_All} />
        this.damage_object = d_Data.damage_object.ps;
        this.damage_object_Tooltip = <DamageTooltipLayout data={d_Data} />
        this.portion = 0;
        this.kaiki = 0;
        this.jouka = d_Data.jouka_num;
        this.overHealPct = '-%';
        if (d_Data.heal.num > 0) {
            this.overHealPct = Math.round((d_Data.over_heal.num / d_Data.heal.num) * 100) + '%'
        }
        let portion_TooltipData = { kaiki_num: 0, kaiki: 0, over_kaikiPct: '0%', portion_num: 0, portion: 0, over_portionPct: '0%', jouka: this.jouka }
        if (d_Data.heal_All.length > 0) {
            for (let i = 0; i < d_Data.heal_All.length; i++) {
                if (d_Data.heal_All[i].type === 'heal_G_portion_num') {
                    this.portion = d_Data.heal_All[i].num;
                    portion_TooltipData.portion_num = this.portion;
                } else if (d_Data.heal_All[i].type === 'heal_kaiki_num') {
                    this.kaiki = d_Data.heal_All[i].num;
                    portion_TooltipData.kaiki_num = this.kaiki;
                } else if (d_Data.heal_All[i].type === 'heal_kaiki') {
                    portion_TooltipData.kaiki = d_Data.heal_All[i].num;
                }
                else if (d_Data.heal_All[i].type === 'heal_G_portion') {
                    portion_TooltipData.portion = d_Data.heal_All[i].num;
                }
            }
        }

        if (d_Data.over_heal_All.length > 0) {
            for (let i = 0; i < d_Data.over_heal_All.length; i++) {
                if (d_Data.over_heal_All[i].type === 'over_heal_kaiki') {
                    if (portion_TooltipData.kaiki !== 0) {
                        portion_TooltipData.over_kaikiPct = Math.round((d_Data.over_heal_All[i].num / portion_TooltipData.kaiki) * 100) + "%";
                    }
                }
                else if (d_Data.over_heal_All[i].type === 'over_heal_G_portion') {
                    if (portion_TooltipData.portion !== 0) {
                        portion_TooltipData.over_portionPct = Math.round((d_Data.over_heal_All[i].num / portion_TooltipData.portion) * 100) + "%";
                    }
                }
            }
        }
        this.portion_Tooltip = <PortionTooltipLayout data={portion_TooltipData} />
        this.limitbreakNum = 0;
        this.limitbreak_Tooltip = "";
        if (d_Data.limitbreak.length > 0) {
            let backup_limit = { count: -1, time: 0 };
            let new_limitbreak = [];
            for (let i = d_Data.limitbreak.length - 1; i >= 0; i--) {
                if (d_Data.limitbreak[i].use === 0) {
                    backup_limit = { count: d_Data.limitbreak[i].hit, time: d_Data.limitbreak[i].time_ms };
                } else {
                    new_limitbreak.push(d_Data.limitbreak[i]);
                    if (backup_limit.count !== -1) {
                        new_limitbreak[new_limitbreak.length - 1].exCount = backup_limit.count;
                    } else {
                        new_limitbreak[new_limitbreak.length - 1].exCount = "";
                    }
                    backup_limit = { count: -1, time: 0 };
                }
            }
            new_limitbreak.sort((a, b) => a.time_ms - b.time_ms);
            this.limitbreakNum = d_Data.limitbreak.reduce((sum, d) => sum + d.use, 0);

            if (new_limitbreak.length > 0) {
                this.last_limitbreak = d_Data.enctime - new_limitbreak[new_limitbreak.length - 1].time;
                this.limitbreak_Tooltip = <LimitBreakTooltipLayout data={new_limitbreak} />;
            } else {
                this.last_limitbreak = d_Data.enctime - d_Data.limitbreak[d_Data.limitbreak.length - 1].time;
                this.limitbreak_Tooltip = <LimitBreakTooltipLayout data={d_Data.limitbreak} />;
            }

        } else {
            this.last_limitbreak = "X"
        }

        this.accept_income_damage = d_Data.accept_income_damage.ps;
        this.accept_income_damage_Tooltip = <IncomeDamageTooltipLayout data={d_Data} />
        this.accept_income_heal = d_Data.accept_income_heal.ps;
        this.accept_income_heal_Tooltip = <IncomeHealTooltipLayout data={d_Data} />
    }

}
