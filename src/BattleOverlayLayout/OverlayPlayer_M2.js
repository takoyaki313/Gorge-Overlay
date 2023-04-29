import { TooltipJSX } from "./tooltip/tooltip";

import './css/M2.css'

export const OverlayM2 = (prop) => {
    let data = prop.data;
    return (
        <div className='m2_overlay'>
            <div className='rightArea'>
                <TooltipJSX setID={data.nameID + 'dpsArea'} b_class="maindpsArea" class="maindps" text={data.dps_i} html={data.dps_tooltip} />
                <TooltipJSX setID={data.nameID + 'hpsArea'} b_class="mainhpsArea" class="mainhps" text={data.hps} html={data.hps_tooltip} />
                <div className=' jobicon'>
                {typeof data.job_tooltip === 'object' ? <><TooltipJSX icon={'icon-' + data.job} setID={data.nameID + 'jobhistory'} text={''} html={data.job_tooltip} /><div className='jobhistory'></div></> : <div className={'icon-' + data.job}></div>}
                </div>
            </div>
            <div className='leftArea'>
                <div className='nameArea'>
                    {data.dynamis_text !== '' ? <TooltipJSX b_class="dynamis_icon" setID={data.nameID + 'dynamis_text'} text={data.dynamis_text} html={data.dynamis_tooltip} /> : ''}
                    {data.dynamis_icon !== '' ? <TooltipJSX b_class="dynamis_icon" setID={data.nameID + 'dynamis_icon'} text={''} icon={data.dynamis_icon + ' dynamis_icon'} html={data.dynamis_tooltip} /> : ''}
                    <TooltipJSX setID={data.nameID + 'name'} text={data.name} icon='' html={data.name_tooltip} />
                </div>
                <div className='kdaArea'>
                    <div><TooltipJSX setID={data.nameID + 'r_left'} text={data.r_left} icon='' html={data.r_left_tooltip} /></div>
                    <div><TooltipJSX setID={data.nameID + 'r_center'} text={data.r_center} icon='' html={data.r_center_tooltip} /></div>
                    <div><TooltipJSX setID={data.nameID + 'r_right'} text={data.r_right} icon='' html={data.r_right_tooltip} /></div>
                </div>
            </div>
        </div>
    );
}