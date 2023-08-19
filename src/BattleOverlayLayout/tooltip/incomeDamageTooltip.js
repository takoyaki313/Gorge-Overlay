import React from 'react';

import {
    DamageTotalToolTipLayout,
    RobotDamageToolTipLayout,
    ObjectDamageToolTipLayout,
    PlayerDetailTooltipLayout,
    DamageObjectPersionTooltipLayout,
    DamagePersonToolTipLayout
} from "./damageTooltip"

import '../../css/pvp_overlay_main.css'
import '../../css/fonticon/style.css'
import '../../css/tooltip.css'

export const IncomeDamageTooltipLayout = (prop) => {
    let data = prop.data;
    let area = data.AreaType;
    if (area === 2) {
        return (
            <div className='tooltip-damage'>
                <DamageTotalToolTipLayout damage_All={data.accept_income_damage_All} time={data.time} />
                <div className="P-horizontalLine flex-center"></div>
                <DamagePersonToolTipLayout damage_G_All={data.accept_income_damage_G_All} />
                <RobotDamageToolTipLayout damage_G_All={data.accept_income_damage_G_All} />
                <div className="P-horizontalLine flex-center"></div>
                <ObjectDamageToolTipLayout damage_G_All={data.accept_income_damage_G_All} />
            </div>
        );
    }
    else if (area === 5) {
        return (
            <div className='tooltip-damage'>
                <DamageTotalToolTipLayout damage_All={data.accept_income_damage_All} time={data.time} />
                <div className="P-horizontalLine flex-center"></div>
                <DamageObjectPersionTooltipLayout damage_All={data.accept_income_damage_All} />
                <PlayerDetailTooltipLayout damage_All_CC={data.accept_damage_All_CC} areaType={data.areaType} />
            </div>
        );
    }
    else {
        return (
            <div className='tooltip-damage'>
                <DamageTotalToolTipLayout damage_All={data.accept_income_damage_All} time={data.time} />
                <div className="P-horizontalLine flex-center"></div>
                <DamageObjectPersionTooltipLayout damage_All={data.accept_income_damage_All} />
            </div>
        );
    }
}
