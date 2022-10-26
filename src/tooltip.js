/*
//tippy.js
import 'react-tippy/dist/tippy.css';

import {Tooltip} from 'react-tippy';

export const TooltipText = ({data,tooltip}) => {
    return (
        <span>
            <Tooltip hideOnClick={false} touchHold={true} html={tooltip}>{data}</Tooltip>
        </span>

    );
} 
*/
//react-tooltip.js
import React from 'react';
import ReactTooltip from 'react-tooltip';
import ReactDOMServer from 'react-dom/server';

export const TooltipText = ({text,tip}) =>{
    return (
        <span>
            <span effect="solid" data-tip={tip}>{text}</span>
            <ReactTooltip />
        </span>
    )
}
export const TooltipJSX = ({text,html}) =>{
    return (
        <span>
            <span data-html={true} data-tip={ReactDOMServer.renderToString(html)}>{text}</span>
            <ReactTooltip />
        </span>
    )
}