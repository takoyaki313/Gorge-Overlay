import '../css/pvp_overlay_main.css'
import '../css/pvp_overlay_team.css'

import { TooltipJSX } from './tooltip/tooltip';
import { AssistTooltipLayout } from './tooltip/kdaTooltip'
import { getLastKDA } from './OverlayPlayer_M';
import React, { useState } from 'react';
import { local } from '..';

export const TeamData = (prop) => {
    //marge player data

    let data = prop.data;
    if (data.length === 0) {
        return (<div></div>);
    }
    let dispdata = {
        TotalDPS: 0,
        TotalHPS: 0,
        time: 1,
        DPSData: [],
        HPSData: [],
        Kills: [],
        Deaths: [],
        Assists: [],
        DPS_k: '',
        DPS_o: '',
        HPS_k: '',
        HPS_o: '',
    }

    for (let i = 0; i < data.length; i++) {
        dispdata.time = data[i].enctime;
        dispdata.TotalDPS += data[i].damage.num;
        //dispdata.DPSData.push({ DPS: data[i].damage.ps, name: data[i].name, job: data[i].job });
        dispdata.TotalHPS += data[i].heal.num;
        //dispdata.DPSData.push({ HPS: data[i].heal.ps, name: data[i].name, job: data[i].job });
        dispdata.Kills = dispdata.Kills.concat(data[i].kills);
        dispdata.Deaths = dispdata.Deaths.concat(data[i].deaths);
        dispdata.Assists = dispdata.Assists.concat(data[i].assists);
    }
    if (dispdata.time > 0) {
        dispdata.TotalDPS = (dispdata.TotalDPS / dispdata.time).toFixed(0);
        dispdata.TotalHPS = (dispdata.TotalHPS / dispdata.time).toFixed(0);
    }

    if (dispdata.TotalDPS.length > 3) {
        dispdata.DPS_k = dispdata.TotalDPS.substring(0, dispdata.TotalDPS.length - 3);
        dispdata.DPS_o = dispdata.TotalDPS.substring(dispdata.TotalDPS.length - 3);
    } else {
        dispdata.DPS_k = dispdata.TotalDPS;
    }
    if (dispdata.TotalHPS.length > 3) {
        dispdata.HPS_k = dispdata.TotalHPS.substring(0, dispdata.TotalHPS.length - 3);
        dispdata.HPS_o = dispdata.TotalHPS.substring(dispdata.TotalHPS.length - 3);
    } else {
        dispdata.HPS_k = dispdata.TotalHPS;
    }
    //dispdata.DPSData.sort((a, b) => b.DPS - a.DPS);
    //dispdata.HPSData.sort((a, b) => b.HPS - a.HPS);
    dispdata.Kills.sort((a, b) => b.time - a.time);
    dispdata.Deaths.sort((a, b) => b.time - a.time);
    dispdata.Assists.sort((a, b) => b.time - a.time);
    return (
        <div className={'pvpTeam ' + prop.team + 'team'} onClick={prop.toggle}>
            {local.teamSymbol ? <div className={'teamSymbol ' + prop.team + 'teamicon'}></div> : ""}
            <div className='dataArea'>
                <div className='DPSArea'>
                    <div style={{ "display": "flex", "alignItems": "flex-end" }}>
                        <span style={{ "fontSize": "1.1rem" }}>
                            {dispdata.DPS_k}
                        </span>
                        <span style={{ "fontSize": "0.9rem" }}>
                            {dispdata.DPS_o}
                        </span>
                    </div>
                    <div className='verticalLineThin'></div>
                    <div style={{ "display": "flex", "alignItems": "flex-end" }}>
                        <span style={{ "fontSize": "1.1rem" }}>
                            {dispdata.HPS_k}
                        </span>
                        <span style={{ "fontSize": "0.9rem" }}>
                            {dispdata.HPS_o}
                        </span>
                    </div>
                </div>
                <div className='verticalLineThin'></div>
                <div className='KDArea'>
                    <div className='TeamKills'><TooltipJSX class="" setID={prop.team + 'kill'} text={"K:" + dispdata.Kills.length + ' - ' + getLastKDA(dispdata.Kills, prop.data[0].createtime, 30000, 'num')} html={<AssistTooltipLayout simulationKDA={dispdata.Kills} />} /></div>
                    <div className='TeamDeaths'><TooltipJSX class="" setID={prop.team + 'death'} text={"D:" + dispdata.Deaths.length + ' - ' + getLastKDA(dispdata.Deaths, prop.data[0].createtime, 30000, 'num')} html={<AssistTooltipLayout simulationKDA={dispdata.Deaths} />} /></div>
                    {/*<div className='TeamAssists'><TooltipJSX class="" setID={prop.team + 'assist'} text={"A:" + dispdata.Assists.length} html={<AssistTooltipLayout simulationKDA={dispdata.Assists} />} /></div>*/}
                </div>
            </div>
        </div>
    );
}