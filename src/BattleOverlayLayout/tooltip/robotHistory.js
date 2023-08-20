import React from 'react';

import { DamagePersonToolTipLayout, RobotDamageToolTipLayout, ObjectDamageToolTipLayout, DamageTotalToolTipLayout } from './damageTooltip';
import { robotHP_Get } from '../../v4/LogLine/loglineGlobal';

import '../../css/pvp_overlay_main.css'
import '../../css/fonticon/style.css'
import '../../css/tooltip.css'

export const RobotTooltipLayout = (prop) => {
    //prop data
    let data = prop.data;
    let incomeDamage = data.accept_income_damage.num;
    let robotHP = robotHP_Get(data.job);
    return (
        <div>
            <div>
                <span>Ride</span><span></span>

            </div>
            <div className='tooltip-damage'>
                <div>
                    <DamageTotalToolTipLayout damage_All={data.damage_All} time={data.time} />
                    <div style={{ "display": "flex", "justifyContent": "space-around" }}>
                        <span>{"K:" + data.kills.length}</span>
                        <span>{"D:" + data.deaths.length}</span>
                        <span>{"A:" + data.assists.length}</span>
                    </div>
                    <div className="P-horizontalLine flex-center"></div>
                    <DamagePersonToolTipLayout damage_G_All={data.damage_G_All} />
                    <RobotDamageToolTipLayout damage_G_All={data.damage_G_All} />
                    <div className="P-horizontalLine flex-center"></div>
                    <ObjectDamageToolTipLayout damage_G_All={data.damage_G_All} />
                </div>
            </div>
            {/*
            <div className='tooltip-damage'>
                <DamageTotalToolTipLayout damage_All={data.accept_income_damage_All} time={data.time} />
                <div className="P-horizontalLine flex-center"></div>
                <DamagePersonToolTipLayout damage_G_All={data.accept_income_damage_G_All} />
                <RobotDamageToolTipLayout damage_G_All={data.accept_income_damage_G_All} />
                <div className="P-horizontalLine flex-center"></div>
                <ObjectDamageToolTipLayout damage_G_All={data.accept_income_damage_G_All} />
            </div>
            */}
            <div>
                <div className="P-horizontalLine flex-center"></div>
                <div className={robotHP - incomeDamage >= 0 && data.deaths.length === 0 ? "alive-rob" : "death-rob"}>
                    <span>HP:</span>
                    <span>{Math.abs(robotHP - incomeDamage)}</span>
                    <span>  / Receive-Damage:</span>
                    <span>{incomeDamage}</span>
                </div>
            </div>
        </div>

    );
}