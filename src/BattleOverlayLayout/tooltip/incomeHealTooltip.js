import React from 'react';
import {
    HealTotalTooltipLayout,
    HealDetailTooltipLayout,
    HealPartyAllyTooltipLayout
} from './healTooltip';

import { PlayerDetailTooltipLayout } from './damageTooltip';

import '../../css/pvp_overlay_main.css'
import '../../css/fonticon/style.css'
import '../../css/tooltip.css'

export const IncomeHealTooltipLayout = (prop) => {
    let data = prop.data;
    let area = data.AreaType;
    if (area === 2) {
        return (
            <div className='tooltip-damage'>
                <HealTotalTooltipLayout total={data.accept_income_heal} over={data.accept_income_over_heal} />
                <HealDetailTooltipLayout heal_All={data.accept_income_heal_All} over_heal_All={data.accept_income_over_heal_All} accept={true} />
                <HealPartyAllyTooltipLayout heal_All={data.accept_income_heal_All} over_heal_All={data.accept_income_over_heal_All} />
            </div>
        );
    }
    else if (area === 5) {
        return (
            <div className='tooltip-damage'>
                <HealTotalTooltipLayout total={data.heal} over={data.over_heal} />
                <HealDetailTooltipLayout heal_All={data.heal_All} over_heal_All={data.over_heal_All} />
                <HealPartyAllyTooltipLayout heal_All={data.accept_income_heal_All} over_heal_All={data.accept_income_over_heal_All} />
                <PlayerDetailTooltipLayout damage_All_CC={data.accept_heal_All_CC} areaType={data.areaType} />
            </div>
        );
    }
    else {
        return (
            <div className='tooltip-damage'>
                <HealTotalTooltipLayout total={data.accept_income_heal} over={data.accept_income_over_heal} />
                <HealDetailTooltipLayout heal_All={data.accept_income_heal_All} over_heal_All={data.accept_income_over_heal_All} accept={true} />
                <HealPartyAllyTooltipLayout heal_All={data.accept_income_heal_All} over_heal_All={data.accept_income_over_heal_All} />
            </div>
        );
    }
}


