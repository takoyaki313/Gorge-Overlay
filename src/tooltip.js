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
import React from "react";

import ReactTooltip from "react-tooltip";
import ReactDOMServer from 'react-dom/server';

export const TooltipBlock = (prop) => {
    return (
        <div className={typeof (prop.class) === 'undefined' ? '' : prop.class}>
            <span data-tip={prop.tip}>{prop.text}</span>
            <ReactTooltip />
        </div>
    )
}

export const TooltipJSX = (prop) => {
    if (prop.text === 0) {
        return (<div className={prop.class} id={prop.setID}>{prop.text}</div>);
    }
    return (
        <div>
            <span data-html={true} data-place="bottom"  className={typeof (prop.class) === 'undefined' ? '' : prop.class} data-for={prop.setID} data-tip={ReactDOMServer.renderToString(prop.html)}>{prop.text}</span>
            <ReactTooltip id={prop.setID}
                overridePosition={(
                    { left, top },
                    currentEvent, currentTarget, node) => {
                    const d = document.documentElement;
                    left = Math.min(d.clientWidth - node.clientWidth, left);
                    top = Math.min(d.clientHeight - node.clientHeight, top);
                    left = Math.max(0, left);
                    top = Math.max(0, top);
                    return { top, left }
                    }}
                className='tooltip_padding'
            />
        </div>
    )
}
