import React from 'react';

import '../../css/pvp_overlay_main.css'
import '../../css/fonticon/style.css'
import '../../css/tooltip.css'
import { time_change } from '../../v4/timer/timer_format';

export const LimitBreakTooltipLayout = (prop) => {
    //prop data
    let lastUse = 0;
    return (<div className='tooltip-limitbreak'>
        {prop.data.map((data, index) => {
            let time = time_change(data.time);
            let beforeUse = data.time - lastUse;
            lastUse = data.time;
            return (
                <React.Fragment key={index}>
                    <div className={"tooltip_png_iconSize limitbreak_" + data.LimitBreak}></div>
                    <div>Hit : {data.hit}</div>
                    <div>{time[0]}:{time[1]}</div>
                    <div>{beforeUse + "s"}</div>
                </React.Fragment>
            )
        })}
    </div>);
}