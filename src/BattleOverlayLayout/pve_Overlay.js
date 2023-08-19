import React from 'react';

import { m_dataCombatant } from './OverlayPlayer_M';
import { PRIMARY_PLAYER } from '..';
import { OverlayM1 } from './OverlayPlayer_M1';
import { local } from '..';
export const OverlayMCombatants = (Combatants) => {
    let Combatants_Array = [];
    let names = Object.keys(Combatants.Combatant);


    if (names.length === 0) {
        return (<div>No Data...</div>)
    }
    let maxdamage = 0;
    for (let i = 0; i < Math.min(names.length, local.pveMax); i++) {
        let data = new m_dataCombatant();
        data.push_data = Combatants.Combatant[names[i]];
        Combatants_Array.push(data);
        if (i === 0) {
            maxdamage = Number(Combatants_Array[0].damage);
        }
    }
    return (<div style={{ display: 'flex', flexDirection: 'column' }}>
        {Combatants_Array.map((data) => {
            let background_color_row = '';
            if (PRIMARY_PLAYER.ACT_name === data.nameID) {
                background_color_row = 'me_background';
            } else {
                background_color_row = data.role + '-background-gradient';
            }
            let gage_offset = Math.abs((data.damage / maxdamage) * 100 - 100) - 2;
            return (
                <li className='flex-center gageRelative m1_overlay li_space' key={data.nameID}>
                    <div className={'gegeAbs ' + background_color_row} style={{ right: gage_offset + '%' }}></div>
                    <OverlayM1 data={data} />
                </li>
            )
        })}
    </div>);
}
