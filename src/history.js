import { BattleHistory } from "./v4/maindataFormat";
import React, { useState } from 'react'

import { Timer_OverlayChangeEvent } from "./v4/timer/timer_event";

export const HistorySelect = (prop) => {
    let [History, ChangeHistory] = useState(0);

    const prevHistory = () => {
        let now = History++;
        if (now > BattleHistory.length - 1) {
            return null;
        }
        ChangeHistory(now);
        console.log(BattleHistory[now].battleEvent)
        Timer_OverlayChangeEvent(BattleHistory[now].battleEvent);
    }

    const nextHistory = () => {
        let now = History--;
        if (now < 0) {
            return null;
        }
        ChangeHistory(now);
        console.log(BattleHistory[now].battleEvent)
        Timer_OverlayChangeEvent(BattleHistory[now].battleEvent);
    }

    return (<>
        {History !== BattleHistory.length - 1 ? <div className='icon-arrow_left' onClick={prevHistory}></div> : ""}
        {History !== 0 ? <div className='icon-arrow_right' onClick={nextHistory}></div> : ""}
    </>
    );


}

const changeView = (battleCount) => {

}