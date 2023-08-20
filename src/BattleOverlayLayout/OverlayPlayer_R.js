import React from 'react';

import { Tooltip as ReactTooltip } from "react-tooltip";
import ReactDOMServer from 'react-dom/server';

import { TooltipJSX } from './tooltip/tooltip';
import { time_change } from '../v4/timer/timer_format';
import { RobotTooltipLayout } from './tooltip/robotHistory';
import { get_dispPlayerData_Robot } from '../v4/maindataFormat';

import 'react-tooltip/dist/react-tooltip.css';
import './css/R.css'


export const RobotHistory = (prop) => {
    let data = prop.data;
    if (data.length === 0) {
        return ("");
    }
    let totalTime = prop.now - prop.start;
    let rideTime = [0, 0];
    for (let i = prop.data.length - 1; i >= 0; i--) {
        if (data[i].ride_type !== 'person') {
            if (data[i].time === 0) {
                rideTime = time_change(Math.round((prop.now - prop.data[prop.data.length - 1].ridetime) / 1000));
            } else {
                rideTime = time_change(Math.round((data[i].time) / 1000));
            }
            break;
        }
    }
    const Timer = (prop) => {
        return (
            <span>
                <span>{prop.rideTime[0]}</span>
                <span>:</span>
                <span>{prop.rideTime[1]}</span>
            </span>
        )
    }
    const Punch = (prop) => {
        const PunchTooltip = (prop) => {
            return (
                <div className='tooltip-punch'>
                    <span>LastRide</span><span>:</span><Timer rideTime={prop.rideTime} />
                    <span>Totalhit</span><span>:</span><span>{prop.punch.total}</span>
                    <span>Hit</span><span>:</span><span>{prop.punch.hit}</span>
                    <span>Miss</span><span>:</span><span>{prop.punch.miss}</span>
                    <span>Avg</span><span>:</span><span>{prop.punch.avg}</span>
                </div>
            )
        }
        let PunchTooltip_obj = <PunchTooltip punch={prop.punch} rideTime={prop.rideTime} />;
        let hitPct = Math.round((prop.punch.hit / prop.punch.total) * 100) + "%";
        return (
            <>
                <TooltipJSX icon="" class='flex-center' setID={prop.nameID + 'Punch'} text={hitPct + " (" + prop.punch.total + ")"} html={PunchTooltip_obj} />
            </>
        )

    }
    return (
        <div className='robotArea'>
            <div className='robotRideTimeArea'>
                {prop.rocketPunch.total > 0 ? <Punch punch={prop.rocketPunch} nameID={prop.nameID} rideTime={rideTime} /> : <Timer rideTime={rideTime} />}
            </div>
            <div className='robotHistoryArea'>
                <div style={{ width: (data[0].ridetime - prop.start) / totalTime * 100 + '%' }}></div>
                {prop.data.map((data, index) => {
                    let time = data.time
                    if (time === 0) {
                        time = prop.now - data.ridetime;
                    }
                    if (time > 700) {
                        if (data.ride_type === 'person') {
                            return (
                                <React.Fragment key={index}>
                                    <div className="robotHistory" style={{ width: (time / totalTime) * 100 * 0.95 + '%' }}>
                                    </div>
                                </React.Fragment>
                            )
                        } else {
                            const RobotHistoryIconLine = (prop) => {
                                let disp = get_dispPlayerData_Robot(prop.data, prop.now);
                                let obj_color = objectdamage_color_add(disp.job, disp.damage_tower.num);
                                return (
                                    <>
                                        <div data-html={true} data-place="bottom" className="robotHistory" style={{ width: (prop.time / prop.totalTime) * 100 * 0.95 + '%' }} id={prop.setID}>
                                            <div className={'robotHistory_icon icon-' + prop.data.ride_type + ' ' + obj_color}>
                                                <div className={obj_color !== "" ? 'robotHistory_line ' + obj_color + '-background' : "robotHistory_line"}></div>
                                            </div>
                                        </div>
                                        <ReactTooltip
                                            html={ReactDOMServer.renderToString(<RobotTooltipLayout data={disp} ridetime={data.ridetime} getoff={data.getoff} />)}
                                            anchorId={prop.setID}
                                            className='tooltip_general'
                                            positionStrategy='fixed'
                                        />
                                    </>
                                );
                            }
                            return (
                                <React.Fragment key={index}>
                                    <RobotHistoryIconLine data={data} time={time} now={prop.now} totalTime={totalTime} setID={prop.nameID + "-" + index + "RobotHistory"} />
                                </React.Fragment>
                            )
                        }
                    }
                })}
            </div>
        </div>
    )
}

const objectdamage_color_add = (robType, damage) => {
    if (robType === "opp" || robType === 'jas') {
        if (damage >= 5000000) {
            return 'gaming2';
        } else if (damage >= 3500000) {
            return 'purple';
        } else if (damage >= 2000000) {
            return 'blue';
        } else if (damage >= 1000000) {
            return 'green';
        }
        else {
            return '';
        }
    }
    else {
        return '';
    }
}