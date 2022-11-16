import React from 'react';

import '../css/pve_overlay.css'
import { job_to_role } from '../role';

export const PvEMain = (Combatants) => {
    let Combatants_Array = [];
    let names = Object.keys(Combatants.Combatant);
    let maxdamage = 0;
    for (let i = 0; i < names.length; i++) {
        Combatants_Array.push(Combatants.Combatant[names[i]]);
        if (i === 0) {
            maxdamage = Number(Combatants_Array[0].damage);
        }
        Combatants_Array[i].maxdamage = maxdamage;
        Combatants_Array[i].PartyNumber = i;
    }
    if (names.length === 0) {
        return(<div>No Data...</div>)
    }
    return (<div style={{ display: 'flex', flexDirection: 'column' }}>
        {Combatants_Array.map((data) => {
            return (<PvEPlayer Data={data} key={data.name} />)
        })}
    </div>);
}

const PvEPlayer = (prop) => {
    let Data = prop.Data;
    let role = job_to_role(Data.Job.toLowerCase());
    let job = Data.Job;
    if (job === "Limit Break") {
        job = "app_fc";
    }
    else if (job === "") {
        job = 'app_world_wanderer';
    }
    let damagePct = Data.maxdamage > 0 ? Number(((Number(Data.damage) / Data.maxdamage) * 100).toFixed(0)) : 0;
    let gage_offset = Math.abs(damagePct - 100) - 2;
    return (
        <li className='pveOverlay'>
            <div className='pveMainRow' >
                <div className={'backgroundGage ' + role + '-background-gradient' } style={{right:gage_offset + '%'}}></div>
                <div className='dataArea'>
                    <div className='dpshps'>
                        <div className='dps'>
                            <span className="dps-i">{Data.encdps.substring(0, Data.encdps.indexOf('.'))}</span>
                            <span className="dps-d">{Data.encdps.indexOf(".") < 5 ? Data.encdps.substring(Data.encdps.indexOf("."), Data.encdps.length - 1) : ""}</span>
                        </div>
                        <div className='hps'>
                            <div className={Data.ENCHPS.length < 5 ? "hps-d " : "hps-d hps-5"}>{Data.ENCHPS}
                                <div className='hps-overPct'>{Data.OverHealPct}</div>
                            </div>
                        </div>
                    </div>
                    <div className='nameArea'>
                        <div className='nameAreaTop'>
                            <div className={'icon-' + job.toLowerCase() + ' jobicon'}></div>
                            <div className='name'>{Data.name}
                                <div className='PctSpace'>
                                    <div className='CritPct'>{Data["crithit%"]}</div>
                                    <div className='DirectPct'>{Data.DirectHitPct}</div>
                                    <div className='CritDirectPct'>{Data.CritDirectHitPct}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </li>
    )
}
