import React from 'react';

import './css/M1.css'
import './css/M.css'

import { TooltipJSX } from './tooltip/tooltip';
import { local } from '..';

export const OverlayM1 = (prop) => {
    let data = prop.data;
    return (
        <div className={'m1_overlay ' + data.all_color} >
            <div className='dataArea'>
                <div className='dpshps'>
                    <TooltipJSX b_class='dps' setID={data.nameID + 'dps'} icon='' html={data.dps_tooltip} text={<DpsJSX data={data} />} />
                    <div className='hps'>
                        <div className={String(data.hps).length < 5 ? "hps-d " : "hps-d hps-5"}>
                            <TooltipJSX setID={data.nameID + 'hps'} text={data.hps} icon='' html={data.hps_tooltip} />
                            <div className='hps-overPct'><TooltipJSX setID={data.nameID + 'overPct'} text={data.overPct} icon='' html={data.overPct_tooltip} /></div>
                        </div>
                    </div>
                </div>
                <div className='nameArea'>
                    <div className='nameAreaTop'>
                        <div className='jobicon'>
                            {typeof data.job_tooltip === 'object' ? <><TooltipJSX icon={'icon-' + data.job} setID={data.nameID + 'jobhistory'} text={''} html={data.job_tooltip} /><div className='jobhistory'></div></> : <div className={'icon-' + data.job}></div>}
                        </div>
                        <div className='name'>
                            {data.dynamis_text !== '' ? <TooltipJSX b_class="dynamis_icon" setID={data.nameID + 'dynamis_text'} text={data.dynamis_text} html={data.dynamis_tooltip} /> : ''}
                            {data.dynamis_icon !== '' ? <TooltipJSX b_class="dynamis_icon" setID={data.nameID + 'dynamis_icon'} text={''} icon={data.dynamis_icon + ' dynamis_icon'} html={data.dynamis_tooltip} /> : ''}

                            <TooltipJSX setID={data.nameID + 'name'} text={data.alliance_Type === "" || !local.alliance_event? data.name : data.alliance_Type + "-" + data.name} icon='' html={data.name_tooltip} class={data.name_color} />
                            <div className='rightSpace'>
                                <div className='rightSpace_child' style={data.createSource === "combatant" ? { "width": "1.8rem" } : { "width": "1rem" }}><TooltipJSX setID={data.nameID + 'r_left'} text={data.r_left} icon='' html={data.r_left_tooltip} class={data.r_left_color} /></div>
                                <div className='rightSpace_child' style={data.createSource === "combatant" ? { "width": "1.8rem" } : { "width": "1rem" }}><TooltipJSX setID={data.nameID + 'r_center'} text={data.r_center} icon='' html={data.r_center_tooltip} class={data.r_center_color} /></div>
                                <div className='rightSpace_child' style={data.createSource === "combatant" ? { "width": "1.8rem" } : { "width": "1rem" }}><TooltipJSX setID={data.nameID + 'r_right'} text={data.r_right} icon='' html={data.r_right_tooltip} class={data.r_right_color} /></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const DpsJSX = (prop) => {
    return (
        <>
            <span className="dps-i">{prop.data.dps_i}</span>
            <span className="dps-d">{prop.data.dps_d}</span>
        </>
    );
} 