import React from 'react';

import '../../css/pvp_overlay_main.css'
import '../../css/fonticon/style.css'
import '../../css/tooltip.css'

export const PortionTooltipLayout = (prop) => {
    //prop data
    return (<div className='tooltip-portion'>
        <div className='tooltip_png_iconSize kaiki-png'></div>
        <div> - {prop.data.kaiki_num}</div>
        <div> {prop.data.kaiki}</div>
        <div>{" O-" + prop.data.over_kaikiPct}</div>
        <div className='tooltip_png_iconSize jouka-png'></div>
        <div> - {prop.data.jouka}</div>
        <div>-</div>
        <div>-</div>
        <div className='tooltip_png_iconSize portion-png'></div>
        <div> - {prop.data.portion_num}</div>
        <div> {prop.data.portion}</div>
        <div>{" O-" + prop.data.over_portionPct}</div>
    </div>);
}