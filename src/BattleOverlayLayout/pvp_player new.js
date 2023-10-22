import '../css/pvp_overlay_main.css'
import '../css/pvp_overlay_player.css'
import '../css/fonticon/style.css'

import React, { useState } from 'react';

import { job_to_role } from '../role';
import { battleEvent } from '..';
import { PRIMARY_PLAYER } from '..';
import { m_data } from './OverlayPlayer_M';
import { a_data } from './OverlayPlayer_A';
import { OverlayM1 } from './OverlayPlayer_M1';
import { OverlayM2 } from './OverlayPlayer_M2';
import { NormalAdvance } from './OverlayPlayer_A1';
import { GorgeAdvance } from './OverlayPlayer_A2';
import { RobotHistory } from './OverlayPlayer_R';

import { local } from '..';

export const PvPPlayerNewMain = (prop) => {
    if (prop.data.length === 0) {
        return (null);
    }
    let maxdps = prop.data[0].damage.ps;
    let start = battleEvent.timer.Get_BattleStart;
    let now = Date.now();
    if (battleEvent.timer.Get_ResultIn !== 0) {
        now = Math.min(now, battleEvent.timer.Get_ResultIn);
    }
    return (
        <div>
            {prop.data.map((data, index) => {
                return (<PvPPlayer key={data.nameID} data={data} maxdps={maxdps} start={start} now={now} mode={prop.mode} area={prop.area} />)
            })}
        </div>

    );
}

const PvPPlayer = (prop) => {
    const [simple, setActive] = useState(false);
    const [isReset, setReset] = useState(true);
    let data = prop.data;
    let role = job_to_role(data.job);

    const hide_toggle = () => {
        setActive(!simple)
    }

    let advanced_slimOff = local[prop.area + '_advancedOverlay_slim'];
    if (isReset) {
        setReset(false);
        if (PRIMARY_PLAYER.nameID === prop.data.nameID && local[prop.area + '_advancedOverlay_me']) {
            setActive(true);
        }else if (prop.data.alliance === 1 && local[prop.area + '_advancedOverlay_party']) {
            setActive(true);
        }else if (prop.data.alliance === 0 && local[prop.area + '_advancedOverlay_ally']) {
            setActive(true);
        }else if (prop.data.alliance > 1 && local[prop.area + '_advancedOverlay_enemy']) {
            setActive(true);
        } else {
            setActive(false);
        }
    }

    let gage_offset = Math.abs((data.damage.ps / prop.maxdps) * 100 - 100) - 2;

    const AdvancedPvP = (prop) => {
        let data = prop.data; 
        if (data.AreaType === 2) {
            return (
                <>
                    <div className='P2-horizontalLine'></div>
                    <GorgeAdvance data={data} slim={prop.slim} />
                </>)    
        } else {
            return (
                <>
                    <NormalAdvance data={data} slim={prop.slim}/>
                </>)    
        }
    }

    let background_color_row = backgroundColorGet(data.nameID,data.AreaType,data.alliance,role);

    let Created_m_data = new m_data();

    let Created_a_data = new a_data(data);
    Created_m_data.push_data = data;
    let createType = 'OverlayM' + prop.mode;
    if (createType === 'OverlayM1') {
        return (
            <li className='flex-center gageRelative li_space' onClick={hide_toggle}>
                <div className={'gegeAbs ' + background_color_row} style={{ right: gage_offset + '%' }}></div>
                <OverlayM1 data={Created_m_data} />
                {simple ? <AdvancedPvP data={Created_a_data} slim={advanced_slimOff} /> : ""}
                {data.AreaType === 2 ? <RobotHistory data={data.robot} start={prop.start} now={prop.now} nameID={data.nameID} rocketPunch={data.rocketPunch} /> : ""}
            </li>
        );
    } else if (createType === 'OverlayM2') {
        return (
            <li className='flex-center gageRelative li_space' onClick={hide_toggle}>
                <div className={'gegeAbs ' + background_color_row} style={{ right: gage_offset + '%' }}></div>
                <OverlayM2 data={Created_m_data} />
                {simple ? <AdvancedPvP data={Created_a_data} slim={advanced_slimOff} /> : ""}
                {data.AreaType === 2 ? <RobotHistory data={data.robot} start={prop.start} now={prop.now} nameID={data.nameID} rocketPunch={data.rocketPunch} /> : ""}
            </li>
        );
    }
}

export const backgroundColorGet = (nameID, areaType, alliance, role) =>{
    let background_color_row = '';
    if (areaType === 5) {
        background_color_row = role + '-background-gradient';
    }
    else if (7 > alliance && alliance > 0) {
        background_color_row = 'alliance-background-gradient-' + alliance;
    } else {
        background_color_row = role + '-background-gradient';
    }
    return background_color_row;
}