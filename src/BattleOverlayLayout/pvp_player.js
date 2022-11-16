import '../css/pvp_overlay_main.css'
import '../css/pvp_overlay_player.css'
import '../css/icon.css'

import React, { useState } from 'react';
import { TooltipJSX } from '../tooltip';
import { AssistTooltipLayout,KillTooltipLayout,DeathTooltipLayout  } from './tooltip/kdaTooltip'
import { JobhistoryTooltipLayout } from './tooltip/jobhistoryTooltip';
import { DunamishistoryTooltipLayout } from './tooltip/dunamisTooltip';

import { job_to_role } from '../role';

import { PRIMARY_PLAYER } from '..';

export const PvPPlayerMain = (prop) => {
    if (prop.data.length === 0) {
        return (null);
    }
    let maxdps = prop.data[0].damage.ps;
    return (
        <div>
            {prop.data.map((data, index) => {
                return (<PvPPlayer key={data.nameID} data={data} maxdps={maxdps} />)
            })}
        </div>

    );
}
const dunamisIcon = 'icon';

const PvPPlayer = (prop) => {
    let data = prop.data;
    let role = job_to_role(data.job);

    let damageformat = [data.damage.pss.substring(0, data.damageB.pss.length - 3), data.damage.pss.substring(data.damage.pss.length - 2, data.damage.pss.length)];
    
    if (damageformat[0].length === 3) {
        damageformat[1] = damageformat[1].substring(0, 1);
    }
    else if (damageformat[0].length > 3) {
        damageformat[1] = '';
    }
    
    let healformat = [data.heal.pss.substring(0, data.heal.pss.length - 3), data.heal.pss.substring(data.heal.pss.length - 2, data.heal.pss.length)];
    
    if (healformat[0].length === 2) {
        healformat[1] = healformat[1].substring(0, 1);
    }
    else if (healformat[0].length > 2) {
        healformat[1] = '';
    }

    let dunamisCheck = null;
    if (data.dunamishistory === null) {
        //FL CC
        dunamisCheck = { text: '', history: [], type: 'icon', class: dunamis_detect(data.dunamis) };
    } else {
        //Gorge
        if (dunamisIcon === 'icon') {
            dunamisCheck = { text: '', history: data.dunamishistory.history, type: 'icon', class: dunamis_detect(data.dunamis) };
        } else {
            dunamisCheck = { text: data.dunamisdata.dunamis, history: data.dunamishistory.history, type: 'icon', class: '' };
        }
    }

    let gage_offset = Math.abs((data.damage.ps / prop.maxdps) * 100 - 100);
    return (
        <li className='PvPPlayer' style={{'borderLeft':'0.2rem solid var(--alliance-color-' + data.alliance}}>
            <div className='leftArea'>
                <div className='dpsNumber'>
                    <div className='dps_d'>{damageformat[0]}</div>
                    <div className='dps_f'>{damageformat[1].length === 0 ?'':'.' + damageformat[1]}</div>
                    </div>
                <div className='hpsNumber'>
                <div className='hps_d'>{healformat[0]}</div>
                    <div className='hps_f'>{healformat[1].length === 0 ?'':'.' + healformat[1]}</div>
                </div>
                <div className=' jobicon'>
                    {data.jobhistory.length > 0 ?<><TooltipJSX class={'icon-' + data.job} setID={data.nameID + 'jobhistory'} text={''} html={<JobhistoryTooltipLayout data={data.jobhistory} />} /><div className='jobhistory'></div></>:<div className={'icon-' + data.job}></div>}
                </div>
            </div>
            <div className='rightArea'>
                <div className='topArea'>
                    <div className='nameArea'>
                        <TooltipJSX class={'dunamisArea ' + dunamisCheck.class} setID={data.nameID + 'dunamis' } text={dunamisCheck.text} html={<DunamishistoryTooltipLayout data={dunamisCheck.history}/>} />
                        <TooltipJSX setID={data.nameID + 'name'} text={data.name} html={data.server} />
                    </div>
                    <div className='kdaArea'>
                        <div><TooltipJSX setID={data.nameID + 'kill'} text={data.kills.length} html={<KillTooltipLayout simulationKDA={data.kills} />} /></div>
                        <div><TooltipJSX setID={data.nameID + 'death'} text={data.deaths.length} html={<DeathTooltipLayout simulationKDA={data.deaths} />} /></div>
                        <div><TooltipJSX setID={data.nameID + 'assist'} text={data.assists.length} html={<AssistTooltipLayout simulationKDA={data.assists} />} /></div>
                    </div>
                </div>
                <div className='DPSMaterArea'>
                    <div className={'DPSMater role-background-' +role} style={{right:gage_offset + '%'}}></div>
                </div>
                <div className='bottomArea'>
                    <div className='bottomleftArea'>
                        
                    </div>
                    <div className='incomeArea'>
                        <div className='incomeNumber'>{data.accept_income_damage.ps}</div>
                        <div className="verticalLine"></div>
                        <div className='incomeNumber'>{ data.accept_income_heal.ps}</div>
                    </div>
                </div>
            </div>
        </li>
    );
}

const dunamis_detect = (dunamis) => {
    if (typeof dunamis === 'number') {
      return 'dunamis_tensyon' + dunamis;
    } else {
      switch (dunamis) {
        case '0853':
          return 'dunamis_kouyou1';
        case '0854':
          return 'dunamis_kouyou2';
        case '0855':
          return 'dunamis_kouyou3';
        case '0856':
          return 'dunamis_kouyou4';
        case '0857':
          return 'dunamis_kouyou5';
        case '06C2':
          return 'dunamis_tensyon20';
        default:
          return '';
      }
    }
  }