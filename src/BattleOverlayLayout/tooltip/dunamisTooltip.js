import React from 'react';

import '../../css/pvp_overlay_main.css'
import '../../css/icon.css'
import '../../css/tooltip.css'
import { time_change } from '../../v4/timer/timer_format';

export const DunamishistoryTooltipLayout = (prop) => {
    //prop data
    return (<div className='tooltip-dunamishistory'>
        {prop.data.map((data, index) => {
            let time = time_change(data.time);
            return (
                <React.Fragment key={index}>
                    <div>{data.from}</div>
                    <div className='icon-NaviArrowRight'></div>
                    <div >{data.to}</div>
                    <div className=' icon-ScheduleTime'></div>
                    <div>{time[0]}:{time[1]}</div>
                </React.Fragment>
            )
        })}
    </div>);
}