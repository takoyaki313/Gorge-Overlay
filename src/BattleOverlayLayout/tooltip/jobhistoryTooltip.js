import React from 'react';

import '../../css/pvp_overlay_main.css'
import '../../css/fonticon/style.css'
import '../../css/tooltip.css'
import { time_change } from '../../v4/timer/timer_format';

export const JobhistoryTooltipLayout = (prop) => {
    //prop data
    return (<div className='tooltip-jobhistory'>
        {prop.data.map((data, index) => {
            let time = time_change(data.time);
            return (
                <React.Fragment key={index}>
                    <div className={'iconSize icon-'+data.job} /*style={{color:'var(--'+data.role + '-role-color)'}}*/></div>
                    <div className='icon-NaviArrowRight'></div>
                    <div className={'iconSize icon-'+data.to} /*style={{color:'var(--'+data.torole + '-role-color)'}}*/></div>
                    {/*<div className=' icon-ScheduleTime'></div>*/}<div></div>
                    <div>{time[0]}:{time[1]}</div>
                </React.Fragment>
            )
        })}
    </div>);
}