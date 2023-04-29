import '../css/pvp_overlay_main.css'
import '../css/pvp_overlay_team.css'

import React, { useState } from 'react';

import { TeamData } from './pvp_team'
import {PvPPlayerMain} from './pvp_player'
import { PvPPlayerNewMain } from './pvp_player new';
import { BattleDataGetLimit } from '../v4/maindataFormat';

export const PvPMain = (prop) => {
    const [allyPlayer, allyPlayerToggle] = useState(true);
    const [enemyPlayer, enemyPlayerToggle] = useState(true);
    const toggleAllyPlayer = () => {
        allyPlayerToggle(!allyPlayer);
    }
    const toggleEnemyPlayer = () => {
        enemyPlayerToggle(!enemyPlayer);
    }
    let ally_Limit = BattleDataGetLimit(10,window.TBD.BattleData_AllyActive);
    let ally = window.TBD.BattleData_Ally
    let enemy = window.TBD.BattleData_Enemy;
    let enemy_Limit = BattleDataGetLimit(6, window.TBD.BattleData_EnemyActive);
    if (window.BATTLE_EVENT.Result_Page) {
        ally_Limit = ally;
        enemy_Limit = enemy;
    }
    return (
        <div>
            {<PvPControlMenu data={ally} />}
            <TeamData data={ally} team={'blue'} toggle={toggleAllyPlayer} />
            {allyPlayer ?<PvPPlayerNewMain data={ally_Limit} />:""}
            <TeamData data={enemy} team={'red'} toggle={toggleEnemyPlayer} />
            {enemyPlayer ? <PvPPlayerNewMain data={enemy_Limit} /> : ""}
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