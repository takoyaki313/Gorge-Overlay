import '../css/pvp_overlay_main.css'
import '../css/pvp_overlay_team.css'

import React, { useState } from 'react';

import { TeamData } from './pvp_team'
import {PvPPlayerMain} from './pvp_player'

//let cc_ally_team_disp = true;
export const PvPMain = (prop) => {
    /*
    const [hide, setActive] = useState(cc_ally_team_disp);
    const cc_ally_team_disp_toggle = () => {
        setActive(!hide)
    }
    *//*
    let [partydata, setPartyData] = useState([]);

    const getPartyData = () => {
        setPartyData(partydata = window.TBD.BattleData_Ally);
        console.log(partydata);
    }*/
    //let data = window.TBD.BattleData_Party;
    let ally = window.TBD.BattleData_Ally;
    let enemy = window.TBD.BattleData_Enemy;

    return (
        <div>
            {<PvPControlMenu data={ally} />}
            <TeamData data={ally} team={'blue'} />
            <PvPPlayerMain data={ally} />
            <TeamData data={enemy} team={'red'} />
            <PvPPlayerMain data={enemy}/>
        </div>
    );

}

const PvPControlMenu = (prop) => {
    return (
        <div>
            <div onClick={prop.update}></div>
        </div>
    );
}