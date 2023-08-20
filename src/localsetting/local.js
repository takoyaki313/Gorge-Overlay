//import { local } from "..";
import { PRIMARY_PLAYER } from "..";

import { killSound_Load } from "../v4/sound";

export const GorgeOverlay_LocalStorage = "GorgeOverlay_4";

export class GorgeOverlay_Local {
    constructor(data) {
        this.root_header = typeof (data.root_header) !== 'undefined' ? data.root_header : false;
        this.root_ACTName = typeof (data.root_ACTName) !== 'undefined' ? data.root_ACTName : "YOU";
        this.language = typeof (data.language) !== 'undefined' ? data.language : 'English';
        this.pveMax = typeof (data.pveMax) !== 'undefined' ? data.pveMax : 12;
        this.teamSymbol = typeof (data.teamSymbol) !== 'undefined' ? data.teamSymbol : true;
        //
        this.fl_layout = typeof (data.fl_layout) !== 'undefined' ? data.fl_layout : 2;
        this.fl_allyData = typeof (data.fl_allyData) !== 'undefined' ? data.fl_allyData : true;
        this.fl_allyMax = typeof (data.fl_allyMax) !== 'undefined' ? data.fl_allyMax : 12;
        this.fl_enemyData = typeof (data.fl_enemyData) !== 'undefined' ? data.fl_enemyData : false;
        this.fl_enemyMax = typeof (data.fl_enemyMax) !== 'undefined' ? data.fl_enemyMax : 0;
        this.fl_resultAllAlly = typeof (data.fl_resultAllAlly) !== 'undefined' ? data.fl_resultAllAlly : true;
        this.fl_resultAllEnemy = typeof (data.fl_resultAllEnemy) !== 'undefined' ? data.fl_resultAllEnemy : false;
        this.fl_advancedOverlay_me = typeof (data.fl_advancedOverlay_me) !== 'undefined' ? data.fl_advancedOverlay_me : true;
        this.fl_advancedOverlay_party = typeof (data.fl_advancedOverlay_party) !== 'undefined' ? data.fl_advancedOverlay_party : true;
        this.fl_advancedOverlay_ally = typeof (data.fl_advancedOverlay_ally) !== 'undefined' ? data.fl_advancedOverlay_ally : false;
        this.fl_advancedOverlay_enemy = typeof (data.fl_advancedOverlay_enemy) !== 'undefined' ? data.fl_advancedOverlay_enemy : false;
        this.fl_advancedOverlay_slim = typeof (data.fl_advancedOverlay_slim) !== 'undefined' ? data.fl_advancedOverlay_slim : true;
        //
        this.rw_layout = typeof (data.rw_layout) !== 'undefined' ? data.rw_layout : 2;
        this.rw_allyData = typeof (data.rw_allyData) !== 'undefined' ? data.rw_allyData : true;
        this.rw_allyMax = typeof (data.rw_allyMax) !== 'undefined' ? data.rw_allyMax : 12;
        this.rw_enemyData = typeof (data.rw_enemyData) !== 'undefined' ? data.rw_enemyData : false;
        this.rw_enemyMax = typeof (data.rw_enemyMax) !== 'undefined' ? data.rw_enemyMax : 0;
        this.rw_resultAllAlly = typeof (data.rw_resultAllAlly) !== 'undefined' ? data.rw_resultAllAlly : true;
        this.rw_resultAllEnemy = typeof (data.rw_resultAllEnemy) !== 'undefined' ? data.rw_resultAllEnemy : false;
        this.rw_advancedOverlay_me = typeof (data.rw_advancedOverlay_me) !== 'undefined' ? data.rw_advancedOverlay_me : true;
        this.rw_advancedOverlay_party = typeof (data.rw_advancedOverlay_party) !== 'undefined' ? data.rw_advancedOverlay_party : true;
        this.rw_advancedOverlay_ally = typeof (data.rw_advancedOverlay_ally) !== 'undefined' ? data.rw_advancedOverlay_ally : false;
        this.rw_advancedOverlay_enemy = typeof (data.rw_advancedOverlay_enemy) !== 'undefined' ? data.rw_advancedOverlay_enemy : false;
        this.rw_advancedOverlay_slim = typeof (data.rw_advancedOverlay_slim) !== 'undefined' ? data.rw_advancedOverlay_slim : true;
        this.rw_killSound = typeof (data.rw_killSound) !== 'undefined' ? data.rw_killSound : false;
        this.rw_killSound_Volume = typeof (data.rw_killSound_Volume) !== 'undefined' ? data.rw_killSound_Volume : 50;
        this.rw_killSound_Path = typeof (data.rw_killSound_Path) !== 'undefined' ? data.rw_killSound_Path : "https://takoyaki313.github.io/Gorge-Overlay/sound/zyaki.wav";
        //
        this.cc_layout = typeof (data.cc_layout) !== 'undefined' ? data.cc_layout : 2;
        this.cc_allyData = typeof (data.cc_allyData) !== 'undefined' ? data.cc_allyData : true;
        this.cc_allyMax = typeof (data.cc_allyMax) !== 'undefined' ? data.cc_allyMax : 5;
        this.cc_enemyData = typeof (data.cc_enemyData) !== 'undefined' ? data.cc_enemyData : true;
        this.cc_enemyMax = typeof (data.cc_enemyMax) !== 'undefined' ? data.cc_enemyMax : 5;
        this.cc_resultAllAlly = typeof (data.cc_resultAllAlly) !== 'undefined' ? data.cc_resultAllAlly : true;
        this.cc_resultAllEnemy = typeof (data.cc_resultAllEnemy) !== 'undefined' ? data.cc_resultAllEnemy : false;
        this.cc_advancedOverlay_me = typeof (data.cc_resultAllEnemy) !== 'undefined' ? data.cc_resultAllEnemy : true;
        this.cc_advancedOverlay_party = typeof (data.cc_advancedOverlay_party) !== 'undefined' ? data.cc_advancedOverlay_party : true;
        this.cc_advancedOverlay_ally = typeof (data.cc_advancedOverlay_ally) !== 'undefined' ? data.cc_advancedOverlay_ally : true;
        this.cc_advancedOverlay_enemy = typeof (data.cc_advancedOverlay_enemy) !== 'undefined' ? data.cc_advancedOverlay_enemy : true;
        this.cc_advancedOverlay_slim = typeof (data.cc_advancedOverlay_slim) !== 'undefined' ? data.cc_advancedOverlay_slim : true;
        //

        PRIMARY_PLAYER.ACT_name = this.root_ACTName;
        saveLocalStorage(this);
    }
    set setHeader(isHeader) {
        this.root_header = isHeader;
        saveLocalStorage(this);
    }
    set setPvEMax(max) {
        this.pveMax = max;
        saveLocalStorage(this);
    }
    set setLanguage(language) {
        if (language === 'Japanese') {
            this.language = language;
        } else {
            this.language = 'English';
        }
        saveLocalStorage(this);
    }
    set setTeamSymbol(data) {
        this.teamSymbol = data;
        saveLocalStorage(this);
    }
    set setACTName(actName) {
        this.root_ACTName = actName;
        PRIMARY_PLAYER.ACT_name = this.root_ACTName;
        saveLocalStorage(this);
    }
    set setFL_Layout(layout) {
        this.fl_layout = layout;
        saveLocalStorage(this);
    }
    set setFL_AllyData(data) {
        this.fl_allyData = data;
        saveLocalStorage(this);
    }
    set setFL_AllyMax(data) {
        this.fl_allyMax = data;
        saveLocalStorage(this);
    }
    set setFL_EnemyData(data) {
        this.fl_enemyData = data;
        saveLocalStorage(this);
    }
    set setFL_EnemyMax(data) {
        this.fl_enemyMax = data;
        saveLocalStorage(this);
    }
    set setFL_ResultAllAlly(data) {
        this.fl_resultAllAlly = data;
        saveLocalStorage(this);
    }
    set setFL_ResultAllEnemy(data) {
        this.fl_resultAllEnemy = data;
        saveLocalStorage(this);
    }
    set setFL_AdvancedOverlay_me(data) {
        this.fl_advancedOverlay_me = data;
        saveLocalStorage(this);
    }
    set setFL_AdvancedOverlay_party(data) {
        this.fl_advancedOverlay_party = data;
        saveLocalStorage(this);
    }
    set setFL_AdvancedOverlay_ally(data) {
        this.fl_advancedOverlay_ally = data;
        saveLocalStorage(this);
    }
    set setFL_AdvancedOverlay_enemy(data) {
        this.fl_advancedOverlay_enemy = data;
        saveLocalStorage(this);
    }
    set setFL_AdvancedOverlay_slim(data) {
        this.fl_advancedOverlay_slim = data;
        saveLocalStorage(this);
    }
    set setRW_Layout(layout) {
        this.rw_layout = layout;
        saveLocalStorage(this);
    }
    set setRW_AllyData(data) {
        this.rw_allyData = data;
        saveLocalStorage(this);
    }
    set setRW_AllyMax(data) {
        this.rw_allyMax = data;
        saveLocalStorage(this);
    }
    set setRW_EnemyData(data) {
        this.rw_enemyData = data;
        saveLocalStorage(this);
    }
    set setRW_EnemyMax(data) {
        this.rw_enemyMax = data;
        saveLocalStorage(this);
    }
    set setRW_ResultAllAlly(data) {
        this.rw_resultAllAlly = data;
        saveLocalStorage(this);
    }
    set setRW_ResultAllEnemy(data) {
        this.rw_resultAllEnemy = data;
        saveLocalStorage(this);
    }
    set setRW_AdvancedOverlay_me(data) {
        this.rw_advancedOverlay_me = data;
        saveLocalStorage(this);
    }
    set setRW_AdvancedOverlay_party(data) {
        this.rw_advancedOverlay_party = data;
        saveLocalStorage(this);
    }
    set setRW_AdvancedOverlay_ally(data) {
        this.rw_advancedOverlay_ally = data;
        saveLocalStorage(this);
    }
    set setRW_AdvancedOverlay_slim(data) {
        this.rw_advancedOverlay_slim = data;
        saveLocalStorage(this);
    }
    set setRW_killSound(data) {
        this.rw_killSound = data;
        saveLocalStorage(this);
        killSound_Load(data);
    }
    set setRW_killSound_Volume(data) {
        this.rw_killSound_Volume = data;
        saveLocalStorage(this);
        killSound_Load(this.rw_killSound);
    }
    set setRW_killSound_Path(data) {
        this.rw_killSound_Path = data;
        saveLocalStorage(this);
        killSound_Load(this.rw_killSound);
    }
    set setCC_Layout(layout) {
        this.cc_layout = layout;
        saveLocalStorage(this);
    }
    set setCC_AllyData(data) {
        this.cc_allyData = data;
        saveLocalStorage(this);
    }
    set setCC_AllyMax(data) {
        this.cc_allyMax = data;
        saveLocalStorage(this);
    }
    set setCC_EnemyData(data) {
        this.cc_enemyData = data;
        saveLocalStorage(this);
    }
    set setCC_EnemyMax(data) {
        this.cc_enemyMax = data;
        saveLocalStorage(this);
    }
    set setCC_ResultAllAlly(data) {
        this.cc_resultAllAlly = data;
        saveLocalStorage(this);
    }
    set setCC_ResultAllEnemy(data) {
        this.cc_resultAllEnemy = data;
        saveLocalStorage(this);
    }
    set setCC_AdvancedOverlay_me(data) {
        this.cc_advancedOverlay_me = data;
        saveLocalStorage(this);
    }
    set setCC_AdvancedOverlay_party(data) {
        this.cc_advancedOverlay_party = data;
        saveLocalStorage(this);
    }
    set setCC_AdvancedOverlay_ally(data) {
        this.cc_advancedOverlay_ally = data;
        saveLocalStorage(this);
    }
    set setCC_AdvancedOverlay_enemy(data) {
        this.cc_advancedOverlay_enemy = data;
        saveLocalStorage(this);
    }
    set setCC_AdvancedOverlay_slim(data) {
        this.cc_advancedOverlay_slim = data;
        saveLocalStorage(this);
    }
}
const saveLocalStorage = (data) => {
    localStorage.setItem(GorgeOverlay_LocalStorage, JSON.stringify(data));
}