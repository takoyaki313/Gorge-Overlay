import React from "react";

import 'react-tooltip/dist/react-tooltip.css';

import { Tooltip as ReactTooltip } from "react-tooltip";
import ReactDOMServer from 'react-dom/server';

export const TooltipJSX = (prop) => {
    if (prop.text === ''&&prop.icon === '') {
        return (<div className={prop.class} id={prop.setID}>{prop.text}</div>);
    } else if (prop.text === 0 && prop.icon === '') {
        return (<div className={prop.class} id={prop.setID}>{prop.text}</div>);
    }
    
    if (prop.setID === ''||typeof prop.setID === 'undefined') {
        console.warn('React Tooltip ID not defined');
    }

    return (
        <div className={prop.b_class}>
            <span data-html={true} data-place="bottom" className={typeof (prop.class) === 'undefined' ? '' : prop.class} id={prop.setID} >
                <span className={prop.icon}></span>
                <span>{prop.text}</span>
            </span>
            <ReactTooltip
                html={ReactDOMServer.renderToString(prop.html)}
                anchorId={prop.setID} 
                className='tooltip_general'
                positionStrategy='fixed'
            />
        </div>
    )
}
