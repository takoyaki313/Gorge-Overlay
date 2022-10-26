import './css/pve_overlay.css'
import { job_to_role } from './role';
import React, { useState } from 'react'
import { Flipper, Flipped } from 'react-flip-toolkit'


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
    return (<div style={{ display: 'flex', flexDirection: 'column' }}>
        {Combatants_Array.map((data) => {
            return (<PvEPlayer Data={data} key={data.name} />)
        })}
    </div>);
}
/*
export const AninationPvEMain = (Combatants) => {

    let Combatants_Array = [];
    let names = Object.keys(Combatants.Combatant);
    let battle_data = Combatants.Combatant;
    let maxdamage = 0;
    for (let i = 0; i < names.length; i++) {
        Combatants_Array.push(Combatants.Combatant[names[i]]);
        if (i === 0) {
            maxdamage = Number(Combatants_Array[0].damage);
        }
        Combatants_Array[i].maxdamage = maxdamage;
        Combatants_Array[i].PartyNumber = i;
        console.log(convertToInt(Combatants_Array[i].name.toLowerCase()), Combatants_Array[i].name.toLowerCase());
    }

    return (
        <Flipper flipKey={names.join('')}>
            <ul className="list">
                {Combatants_Array.map((d) => (
                    <Flipped key={d.name} flipId={d.name}>
                        {FlippedProps => < PvEPlayer FlippedProps={FlippedProps} Data={d} />}
                    </Flipped>
                ))}
            </ul>
        </Flipper>
    )
}
*/
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
    console.log(prop.FlippedProps);
    let damagePct = Data.maxdamage > 0 ? Number(((Number(Data.damage) / Data.maxdamage) * 100).toFixed(0)) : 0;
    let damagePct_Ex = damagePct + 2;
    return (
        <li>
            <div {...prop.FlippedProps} style={{ background: 'linear-gradient(90deg,var(--transparent-' + role + '-role-color) 0% ,var(--transparent-' + role + '-role-color) ' + damagePct + '%,transparent ' + damagePct_Ex + '%,transparent 100%)' /*,order:Data.PartyNumber*/ }}>
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


/*
<div className='DPSMater' style={{ width: Data["damage%"] }}></div>
*/

function convertToInt(a) {
    const alphabet = "abcdefghijklmnopqrstuvwxyz'"
    const b = a.split('').map((str) => alphabet.indexOf(str) + 1)
    return Number(b.join(''));
}