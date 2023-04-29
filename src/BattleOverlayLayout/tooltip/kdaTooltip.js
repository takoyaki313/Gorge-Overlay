import React from 'react';

import '../../css/pvp_overlay_main.css'
import '../../css/fonticon/style.css'
import '../../css/tooltip.css'
import { time_change } from '../../v4/timer/timer_format';

export const AssistTooltipLayout = (prop) => {
    //prop data
    return (<div className='tooltip-assistKDA tooltip-assist'>
        {prop.simulationKDA.map((data, index) => {
            let time = time_change(data.time);
            return (
                <React.Fragment key={index}>
                    <div className={'iconSize icon-'+data.killerJob} style={data.killerAlliance>0?{'color':'var(--alliance-color-' + data.killerAlliance}:{}}></div>
                    <div style={data.killerAlliance>0?{'color':'var(--alliance-color-' + data.killerAlliance}:{}}>{data.killerName}</div>
                    <div className='icon-NaviArrowRight'></div>
                    <div className={'iconSize icon-'+data.victimJob} style={data.victimAlliance>0?{'color':'var(--alliance-color-' + data.victimAlliance}:{}}></div>
                    <div style={data.victimAlliance>0?{'color':'var(--alliance-color-' + data.victimAlliance}:{}}>{data.victimName}</div>
                    <div className=' icon-ScheduleTime'></div>
                    <div>{time[0]}:{time[1]}</div>
                </React.Fragment>
            )
        })}
    </div>);
}

export const KillTooltipLayout = (prop) => {
    //prop data
    return (<div className='tooltip-assistKDA tooltip-kill'>
        {prop.simulationKDA.map((data, index) => {
            let time = time_change(data.time);
            return (
                <React.Fragment key={index}>
                    <div className={'iconSize icon-'+data.victimJob} style={data.victimAlliance>0?{'color':'var(--alliance-color-' + data.victimAlliance}:{}}></div>
                    <div style={data.victimAlliance>0?{'color':'var(--alliance-color-' + data.victimAlliance}:{}}>{data.victimName}</div>
                    <div className=' icon-ScheduleTime'></div>
                    <div>{time[0]}:{time[1]}</div>
                </React.Fragment>
            )
        })}
    </div>);
}

export const DeathTooltipLayout = (prop) => {
    //prop data
    return (<div className='tooltip-assistKDA tooltip-death'>
        {prop.simulationKDA.map((data, index) => {
            let time = time_change(data.time);
            return (
                <React.Fragment key={index}>
                    <div className={'iconSize icon-'+data.killerJob} style={data.killerAlliance>0?{'color':'var(--alliance-color-' + data.killerAlliance}:{}}></div>
                    <div style={data.killerAlliance>0?{'color':'var(--alliance-color-' + data.killerAlliance}:{}}>{data.killerName}</div>
                    <div className=' icon-ScheduleTime'></div>
                    <div>{time[0]}:{time[1]}</div>
                </React.Fragment>
            )
        })}
    </div>);
}