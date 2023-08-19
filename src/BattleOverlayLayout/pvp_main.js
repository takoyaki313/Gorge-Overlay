import '../css/pvp_overlay_main.css'
import '../css/pvp_overlay_team.css'

import React, { useState } from 'react';

import { TeamData } from './pvp_team'
import { PvPPlayerNewMain } from './pvp_player new';
import { BattleDataGetLimit } from '../v4/maindataFormat';
import { local } from '..';

export const PvPMain = (prop) => {
    let allyData= local[prop.area + "_allyData"];
    let enemyData = local[prop.area + "_enemyData"];
    let allyMax = Number(local[prop.area + "_allyMax"]);
    let enemyMax = Number(local[prop.area + "_enemyMax"]);
    let resultAllAlly = local[prop.area + "_resultAllAlly"];
    let resultAllEnemy = local[prop.area + "_resultAllEnemy"];
    let playerMode = Number(local[prop.area + "_layout"]);
    
    const [allyPlayer, allyPlayerToggle] = useState(true);
    const [enemyPlayer, enemyPlayerToggle] = useState(true);
    const toggleAllyPlayer = () => {
        allyPlayerToggle(!allyPlayer);
    }
    const toggleEnemyPlayer = () => {
        enemyPlayerToggle(!enemyPlayer);
    }
    let ally_Limit = BattleDataGetLimit(allyMax,window.TBD.BattleData_AllyActive);
    let ally = window.TBD.BattleData_Ally
    let enemy = window.TBD.BattleData_Enemy;
    let enemy_Limit = BattleDataGetLimit(enemyMax, window.TBD.BattleData_EnemyActive);
    if (window.BATTLE_EVENT.Result_Page) {
        if (resultAllAlly) {
            ally_Limit = ally;
            allyData = true;
        }
        if (resultAllEnemy) {
            enemy_Limit = enemy;
            enemyData = true;
        }
        
        
    }
    return (
        <div>
            <PvPControlMenu data={ally} />
            {allyData ?<TeamData data={ally} team={'blue'} toggle={toggleAllyPlayer} />:""}
            {allyPlayer ? <PvPPlayerNewMain data={ally_Limit} mode={playerMode} area={prop.area} />:""}
            {enemyData ? <TeamData data={enemy} team={'red'} toggle={toggleEnemyPlayer} /> : ""}
            {enemyPlayer ? <PvPPlayerNewMain data={enemy_Limit} mode={playerMode} area={prop.area} /> : ""}
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