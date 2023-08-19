import '../css/pvp_overlay_main.css'
import '../css/pvp_overlay_team.css'

import { TooltipJSX } from './tooltip/tooltip';
import { AssistTooltipLayout} from './tooltip/kdaTooltip'
import { getLastKDA } from './OverlayPlayer_M';

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
    }

    for (let i = 0; i < data.length; i++) {
        dispdata.time = data[i].enctime;
        dispdata.TotalDPS += data[i].damage.num;
        dispdata.DPSData.push({ DPS: data[i].damage.ps, name: data[i].name, job: data[i].job });
        dispdata.TotalHPS += data[i].heal.num;
        dispdata.DPSData.push({ HPS: data[i].heal.ps, name: data[i].name, job: data[i].job });
        dispdata.Kills = dispdata.Kills.concat(data[i].kills);
        dispdata.Deaths = dispdata.Deaths.concat(data[i].deaths);
        dispdata.Assists = dispdata.Assists.concat(data[i].assists);
    }

    dispdata.TotalDPS = Math.round(dispdata.TotalDPS / dispdata.time);
    dispdata.TotalHPS = Math.round(dispdata.TotalHPS / dispdata.time);
    
    dispdata.DPSData.sort((a, b) => b.DPS - a.DPS);
    dispdata.HPSData.sort((a, b) => b.HPS - a.HPS);

    dispdata.Kills.sort((a, b) => a.time - b.time);
    dispdata.Deaths.sort((a, b) => a.time - b.time);
    dispdata.Assists.sort((a, b) => a.time - b.time);
    return (
        <div className={'pvpTeam ' + prop.team + 'team'} onClick={prop.toggle}>
            <div className={'teamSymbol ' + prop.team + 'teamicon'}></div>
            <div className='dataArea'>
                <div className='DPSArea'>
                    <div className='TeamDPS'>{dispdata.TotalDPS}</div>
                    <div className='verticalLineThin'></div>
                    <div className='TeamHPS'>{dispdata.TotalHPS}</div>
                </div>
                <div className='verticalLineThin'></div>
                <div className='KDArea'>
                    <div className='TeamKills'><TooltipJSX class="" setID={prop.team +'kill'} text={"K:" + dispdata.Kills.length + ' (' + getLastKDA(dispdata.Kills,prop.data[0].createtime,30000,'num') + ')'} html={<AssistTooltipLayout simulationKDA={dispdata.Kills} />} /></div>
                    <div className='TeamDeaths'><TooltipJSX class="" setID={prop.team +'death'} text={"D:" + dispdata.Deaths.length+ ' (' + getLastKDA(dispdata.Deaths,prop.data[0].createtime,30000,'num') + ')'} html={<AssistTooltipLayout simulationKDA={dispdata.Deaths} />} /></div>
                    {/*<div className='TeamAssists'><TooltipJSX class="" setID={prop.team + 'assist'} text={"A:" + dispdata.Assists.length} html={<AssistTooltipLayout simulationKDA={dispdata.Assists} />} /></div>*/}
                </div>
            </div>
        </div>
    );
}