import { battleEvent, AreaData, devMode } from "..";
import { sampleJSON } from "./sample/workSample";
import { PRIMARY_PLAYER } from "..";

export let useTime = 'time';//enctime or time


export class maindata {
    constructor() {
        this.Player_data = [];
        this.Skill_data = [];
        this.DoT_data = [];
        this.Barrier_data = [];
        this.Player_hp = [];
        this.Action_data = [];
        this.Action_Synced_data = [];
        this.Action_Sync_data = [];
        this.Alliance = new dynamisHistory();
        this.EnemyAlliance = [new dynamisParty()];
        this.EnemyUnknownDynamis = [];
    }
    set resetData(type/*ALL/PART*/) {

        if (type === 'ALL') {
            this.Player_data = [];
            this.Skill_data = [];
            this.DoT_data = [];
            this.Barrier_data = [];
            this.Player_hp = [];
            this.Action_data = [];
            this.Action_Synced_data = [];
            this.Action_Sync_data = [];
            this.Alliance = new dynamisHistory();
            this.EnemyAlliance = [new dynamisParty()];
            this.EnemyUnknownDynamis = [];
            if (devMode.logLevel > 2) {
                console.log('MainData Reset Success');
            }
        }
        else if (type === 'PART') {
            let backup = [];
            for (let i = 0; i < this.Player_data.length; i++) {
                let target = this.Player_data[i];
                if (target.nameID.substring(0, 2) === '10') {
                    backup.push({ nameID: target.nameID, name: target.name, job: target.job, server: target.server, alliance: target.alliance, AreaType: target.AreaType });
                }
            }
            ////////////////////////////////////////////
            this.Player_data = backup;
            this.Skill_data = [];
            this.DoT_data = [];
            this.Barrier_data = [];
            this.Player_hp = [];
            this.Action_data = [];
            this.Action_Synced_data = [];
            this.Action_Sync_data = [];
            this.Alliance = new dynamisHistory();
            this.EnemyAlliance = [new dynamisParty()];
            this.EnemyUnknownDynamis = [];
            if (devMode.logLevel > 2) {
                console.lowarng('MainData Reset');
            }
        }
        else {
            console.error('MainData reset Flag Unknown ->' + type);
        }
        if (devMode.sampleGet) {
            sampleJSON.resetData();
        }
    }
    dataGet = (limit) => {
        // Party Ally Enemy PC NPC
        const Data = TBD.Player_data;
        const Alliance = TBD.Alliance;
        let rtn = [];
        let now = 0;
        let battleEndTime = battleEvent.timer.Get_ResultIn;
        if (battleEndTime !== 0) {
            now = battleEndTime;
        } else {
            now = Date.now();
        }

        let nameID_Job = [];
        if (Data.length > 0) {
            if (Data[0].AreaType === 5) {
                for (let i = 0; i < Data.length; i++) {
                    if (Data[i].nameID.substring(0, 2) === "10") {
                        nameID_Job.push({
                            nameID: Data[i].nameID,
                            name: typeof (Data[i].name) !== 'undefined' ? Data[i].name : "",
                            job: typeof (Data[i].job) !== 'undefined' ? Data[i].job : "",
                            alliance: typeof (Data[i].alliance) !== 'undefined' ? Data[i].alliance : 0
                        });
                    }
                }
            }
        }
        switch (limit) {
            case 'Party':
                for (let i = 0; i < Data.length; i++) {
                    if (Data[i].alliance === 1) {
                        rtn.push(new dispPlayerData(Data[i], now, Alliance, TBD.EnemyAlliance, nameID_Job));
                    }
                }
                break;
            case 'Ally':
                for (let i = 0; i < Data.length; i++) {
                    if (Data[i].alliance >= 1) {
                        rtn.push(new dispPlayerData(Data[i], now, Alliance, TBD.EnemyAlliance, nameID_Job));
                    }
                }
                break;
            case 'Enemy':
                for (let i = 0; i < Data.length; i++) {
                    if (Data[i].alliance < 1 && Data[i].nameID.substring(0, 2) === '10') {
                        rtn.push(new dispPlayerData(Data[i], now, Alliance, TBD.EnemyAlliance, nameID_Job));
                    }
                }
                break;
            case 'EnemyActive':
                for (let i = 0; i < Data.length; i++) {
                    if (Data[i].alliance < 1 && Data[i].nameID.substring(0, 2) === '10' && Data[i].battle) {
                        rtn.push(new dispPlayerData(Data[i], now, Alliance, TBD.EnemyAlliance, nameID_Job));
                    }
                }
                break;
            case 'PC':
                for (let i = 0; i < Data.length; i++) {
                    if (Data[i].nameID.substring(0, 2) === '10') {
                        rtn.push(new dispPlayerData(Data[i], now, Alliance, TBD.EnemyAlliance, nameID_Job));
                    }
                }
                break;
            case 'NPC':
                for (let i = 0; i < Data.length; i++) {
                    if (Data[i].nameID.substring(0, 2) === '40' || Data[i].nameID.substring(0, 2) === 'E0') {
                        rtn.push(new dispPlayerData(Data[i], now, Alliance, TBD.EnemyAlliance, nameID_Job));
                    }
                }
                break;
            case 'AllyActive':
                for (let i = 0; i < Data.length; i++) {
                    if (Data[i].alliance === 1) {
                        rtn.push(new dispPlayerData(Data[i], now, Alliance, TBD.EnemyAlliance, nameID_Job));
                    }
                    else if (Data[i].alliance >= 1 && Data[i].battle) {
                        rtn.push(new dispPlayerData(Data[i], now, Alliance, TBD.EnemyAlliance, nameID_Job));
                    }
                }
                break;
            default:
                for (let i = 0; i < Data.length; i++) {
                    rtn.push(new dispPlayerData(Data[i], now, Alliance, TBD.EnemyAlliance, nameID_Job));
                }
                break;
        }
        return (gorgeSortRule(rtn));
    }
    saveActionData = async () => {
        try {
            const fileHandle = await window.showSaveFilePicker({
                suggestedName: this.AreaType + "_" + Date.now() + ".csv",
            });

            const writableStream = await fileHandle.createWritable();

            let writeData = [["C_attacker", "C_attackerID", "victim", "victimID", "attacker", "attackerID", "action", "actionID", "effectname", "effectparam", "inputdata", "inputname", "send", "accept", "processtime", "animationlock", "dummy"]];
            for (let i = 0; i < this.Action_Synced_data.length; i++) {
                let data = this.Action_Synced_data[i];
                let row = [];
                row.push(data.C_attacker);
                row.push(data.C_attackerID);
                row.push(data.victim);
                row.push(data.victimID);
                row.push(data.attacker);
                row.push(data.attackerID);
                row.push(data.action);
                row.push(data.actionID);
                row.push(data.effectname.join("|"));
                row.push(data.effectparam.join("|"));
                row.push(data.inputdata.join("|"));
                row.push(data.inputname.join("|"));
                row.push(Date.parse(data.time_send));
                row.push(Date.parse(data.time_accept));
                row.push(Date.parse(data.time_accept) - Date.parse(data.time_send));
                row.push(data.animationlock);
                row.push(data.dummy ? "Y" : "N");
                writeData.push(row.join(','));
            }
            await writableStream.write(writeData.join('\n'));
            await writableStream.close();

            console.log("CSV-Save-OK");
        } catch (error) {
            console.error("JSON-Save-Error: " + error.message);
        }
    }

}

class dynamisHistory {
    constructor() {
        for (let i = 0; i < 7; i++) {
            this[i] = new dynamisParty();
        }
    }
}

export class dynamisParty {
    constructor() {
        this.dynamis = 0;
        this.history = [];
        this.memberID = [];
    }
}

export class simulationKDA {
    constructor(killerID, killerName, killerJob, killerAlliance, victimID, victimName, victimJob, victimAlliance, assist, time_number, time) {
        this.killerID = killerID;
        this.killerName = killerName;
        this.killerJob = killerJob;
        this.killerAlliance = typeof (killerAlliance) === 'number' ? killerAlliance : -99;

        this.victimID = victimID;
        this.victimName = victimName;
        this.victimJob = victimJob;
        this.victimAlliance = typeof (victimAlliance) === 'number' ? victimAlliance : -99;

        this.assist = assist;

        this.time_number = time_number;
        this.time = time;
    }
}

export const BattleDataGetLimit = (num, tbd_battledata) => {
    let active_Ally = tbd_battledata;
    let rtn = [];
    if (active_Ally.length === 0) {
        return (rtn);
    }
    let isSkip = false;
    for (let i = 0; i < active_Ally.length; i++) {
        if (active_Ally[i].alliance === 1) {
            rtn.push(active_Ally[i]);
        }
        if (rtn.length === num) {
            isSkip = true;
        }
    }
    if (!isSkip) {
        for (let i = 0; i < active_Ally.length; i++) {
            if (active_Ally[i].alliance !== 1) {
                rtn.push(active_Ally[i]);
            }
            if (rtn.length === num) {
                break;
            }
        }
    }

    return (gorgeSortRule(rtn));
}

const gorgeSortRule = (adjustTBD_rtn) => {
    if (AreaData.Type === 2) {
        adjustTBD_rtn.sort((a, b) => b.damage_prm.ps - a.damage_prm.ps);
    } else {
        adjustTBD_rtn.sort((a, b) => b.damage.ps - a.damage.ps);
    }
    return (adjustTBD_rtn);
}

const BattleTime_Calc = (data, now) => {
    if (typeof (data) === 'undefined') {
        data = [{ time: battleEvent.timer.Get_BattleStart, battle: true }];
    }
    if (data.length === 0) {
        data[0] = [{ time: battleEvent.timer.Get_BattleStart, battle: true }];
    }
    let start_time = battleEvent.timer.Get_BattleStart === 0 ? data[0].time : battleEvent.timer.Get_BattleStart;
    let end_time = battleEvent.timer.Get_ResultIn === 0 ? now : battleEvent.timer.Get_ResultIn;
    let lasttime = start_time;
    let lastposition = 0;
    let time = 0;
    for (let i = 0; i < data.length; i++) {
        if (start_time < data[i].time && data[i].time < end_time) {
            if (i > 0) {
                if (data[i - 1].battle) {
                    time += data[i].time - lasttime;
                }
            }
            lastposition = i;
            if (lasttime > data[i].time) {
                console.warn('lastTime->', data[i - 1].stamp, 'now', data[i].stamp, 'gap', data[i].time - lasttime);
            }
            lasttime = data[i].time
        }
    }

    if (data[lastposition].battle) {
        time += end_time - lasttime;
    }

    let returnValue = Math.ceil(time / 1000)
    if (returnValue === 0) {
        return 1;
    }
    return returnValue;
}

export const get_dispPlayerData_Robot = (dispData, createTime) => {
    let now = dispData.getoff;
    if (now === 0) {
        now = createTime;
    }
    dispData.data.add_combatant_time = [{ battle: true, time: dispData.ridetime, timestamp: "robot" }, { battle: false, time: now, timestamp: "robot" }];
    dispData.data.job = dispData.ride_type;
    let robotData = new dispPlayerData(dispData.data, now, TBD.Alliance, TBD.EnemyAlliance, []);
    return (robotData);
}

class dispPlayerData {
    constructor(before, now, Alliance, EnemyAlliance, nameID_Job) {
        this.nameID = before.nameID;
        this.name = typeof (before.name) === 'string' ? before.name : before.nameID;
        this.me = this.nameID === PRIMARY_PLAYER.nameID ? true : false;
        this.server = typeof (before.server) === 'string' ? before.server : '';
        this.datacenter = typeof (before.dc_server) === 'string' ? before.dc_server : '';
        this.region = typeof (before.region) === 'string' ? before.region : '';
        this.job = typeof (before.job) === 'string' ? before.job : '';
        this.jobhistory = typeof (before.jobhistory) === 'object' ? before.jobhistory : [];
        this.alliance = typeof (before.alliance) === 'number' ? before.alliance : 0;
        this.kills = typeof (before['s-kill-name']) === 'object' ? before['s-kill-name'] : [];
        this.deaths = typeof (before['s-death-name']) === 'object' ? before['s-death-name'] : [];
        this.assists = typeof (before['s-assist']) === 'object' ? before['s-assist'] : [];

        this.time = BattleTime_Calc(before.add_combatant_time, now);
        this.enctime = battleEvent.timer.Get_EncTime;
        this.createtime = now;
        this.battle = typeof (before.battle) === 'boolean' ? before.battle : false;

        this.heal = typeof (before.totalheal) === 'number' ? { num: before.totalheal, ps: Number((before.totalheal / this[useTime]).toFixed(2)), pss: (before.totalheal / this[useTime]).toFixed(2) } : { num: 0, ps: 0.00, pss: '0.00' };
        this.over_heal = typeof (before.over_totalheal) === 'number' ? { num: before.over_totalheal, ps: Number((before.over_totalheal / this[useTime]).toFixed(1)), pss: (before.over_totalheal / this[useTime]).toFixed(1) } : { num: 0, ps: 0.00, pss: '0.00' };

        this.accept_income_damage = typeof (before.accept_income_totaldamage) === 'number' ? { num: before.accept_income_totaldamage, ps: Math.round(before.accept_income_totaldamage / this[useTime]) } : { num: 0, ps: 0 };
        this.accept_income_heal = typeof (before.accept_income_totalheal) === 'number' ? { num: before.accept_income_totalheal, ps: Math.round(before.accept_income_totalheal / this[useTime]) } : { num: 0, ps: 0 };
        this.accept_income_over_heal = typeof (before.accept_income_over_totalheal) === 'number' ? { num: before.accept_income_over_totalheal, ps: Math.round(before.accept_income_over_totalheal / this[useTime]) } : { num: 0, ps: 0 };

        this.limitbreak = typeof (before.limitBreak) === 'object' ? before.limitBreak : [];
        this.robot = typeof (before.robot_data) === 'object' ? before.robot_data : [];
        this.damage_All = [];
        this.heal_All = [];
        this.damage_All_CC = [];
        this.heal_All_CC = [];
        this.accept_damage_All_CC = [];
        this.accept_heal_All_CC = [];
        this.nameID_Job_CC = nameID_Job;
        this.over_heal_All = [];

        this.accept_income_damage_All = [];
        this.accept_income_damage_G_All = [];
        this.damage_G_All = [];
        this.accept_income_heal_All = [];
        this.accept_income_over_heal_All = [];
        this.alliance_Type = typeof (before.alliance_ID) === 'undefined' ? '' : before.alliance_ID;
        this.AreaType = before.AreaType;
        if (this.AreaType === 2) {
            if (0 < this.alliance && this.alliance < 7) {
                if (Alliance[this.alliance].dynamis > 0) {
                    this.dynamishistory = Alliance[this.alliance];
                    this.dynamis = this.dynamishistory.dynamis;
                }
                else {
                    this.dynamishistory = new dynamisParty();
                    this.dynamis = typeof (before.dynamis) === 'undefined' ? '' : before.dynamis;
                }
            } else if (this.alliance < 0) {
                if (EnemyAlliance[Math.abs(this.alliance)].dynamis > 0) {
                    this.dynamishistory = EnemyAlliance[Math.abs(this.alliance)];
                    this.dynamis = this.dynamishistory.dynamis;
                }
                else {
                    this.dynamishistory = new dynamisParty();
                    this.dynamis = typeof (before.dynamis) === 'undefined' ? '' : before.dynamis;
                }
            }
            else {
                this.dynamishistory = new dynamisParty();
                this.dynamis = typeof (before.dynamis) === 'undefined' ? '' : before.dynamis;
            }
            if (typeof (this.dynamishistory.history) === 'undefined') {
                this.dynamishistory = new dynamisParty();
            }
        } else {
            this.dynamis = typeof (before.dynamis) === 'undefined' ? '' : before.dynamis;
            this.dynamishistory = new dynamisParty();
        }

        let beforeArray = Object.keys(before);
        for (let tbd of beforeArray) {
            if (tbd.indexOf('damage') !== -1) {
                if (tbd.substring(0, 12) === 'damage_CC_10') {
                    let changed_nameID_name = { nameID: tbd.substring(10), name: "", job: "", alliance: -1 }
                    for (let nameID_name of nameID_Job) {
                        if (nameID_name.nameID === changed_nameID_name.nameID) {
                            changed_nameID_name = nameID_name;
                            break;
                        }
                    }
                    this.damage_All_CC.push({ type: tbd, nameData: changed_nameID_name, num: before[tbd], ps: Math.round(before[tbd] / this[useTime]) });
                } else if (tbd.substring(0, 31) === 'accept_income_damage_CC_from_10') {
                    let changed_nameID_name = { nameID: tbd.substring(29), name: "", job: "", alliance: -1 }
                    for (let nameID_name of nameID_Job) {
                        if (nameID_name.nameID === changed_nameID_name.nameID) {
                            changed_nameID_name = nameID_name;
                            break;
                        }
                    }
                    this.accept_damage_All_CC.push({ type: tbd, nameData: changed_nameID_name, num: before[tbd], ps: Math.round(before[tbd] / this[useTime]) });
                } else if (tbd.indexOf('damage') === 0 || tbd === 'totaldamage') {
                    this.damage_All.push({ type: tbd, num: before[tbd], ps: Math.round(before[tbd] / this[useTime]) });
                } else if (tbd.substring(0, 2) === "G_") {
                    this.damage_G_All.push({ type: tbd, num: before[tbd], ps: Math.round(before[tbd] / this[useTime]) });
                } else if (tbd.substring(0, 16) === "accept_income_G_") {
                    this.accept_income_damage_G_All.push({ type: tbd, num: before[tbd], ps: Math.round(before[tbd] / this[useTime]) });
                } else {
                    this.accept_income_damage_All.push({ type: tbd, num: before[tbd], ps: Math.round(before[tbd] / this[useTime]) });
                }
            } else if (tbd.indexOf('heal') !== -1) {
                let healtype = tbd.indexOf('heal');
                if (tbd.substring(0, 7) === 'heal_10') {
                    let changed_nameID_name = { nameID: tbd.substring(5), name: "", job: "", alliance: -1 }
                    for (let nameID_name of nameID_Job) {
                        if (nameID_name.nameID === changed_nameID_name.nameID) {
                            changed_nameID_name = nameID_name;
                            break;
                        }
                    }
                    this.heal_All_CC.push({ type: tbd, nameData: changed_nameID_name, num: before[tbd], ps: Math.round(before[tbd] / this[useTime]) });
                } else if (tbd.substring(0, 26) === 'accept_income_heal_from_10') {
                    let changed_nameID_name = { nameID: tbd.substring(24), name: "", job: "", alliance: -1 }
                    for (let nameID_name of nameID_Job) {
                        if (nameID_name.nameID === changed_nameID_name.nameID) {
                            changed_nameID_name = nameID_name;
                            break;
                        }
                    }
                    this.accept_heal_All_CC.push({ type: tbd, nameData: changed_nameID_name, num: before[tbd], ps: Math.round(before[tbd] / this[useTime]) });
                }
                else if (healtype === 0 || tbd === 'totalheal') {
                    this.heal_All.push({ type: tbd, num: before[tbd], ps: Math.round(before[tbd] / this[useTime]) });
                }
                else if (healtype === 5 || tbd === 'over_totalheal') {
                    this.over_heal_All.push({ type: tbd, num: before[tbd], ps: Math.round(before[tbd] / this[useTime]) });
                }
                else if (healtype === 14 || tbd === 'accept_income_totalheal') {
                    this.accept_income_heal_All.push({ type: tbd, num: before[tbd], ps: Math.round(before[tbd] / this[useTime]) });
                }
                else if (healtype === 19 || tbd === 'accept_income_over_totalheal') {
                    this.accept_income_over_heal_All.push({ type: tbd, num: before[tbd], ps: Math.round(before[tbd] / this[useTime]) });
                }
                else {
                    if (devMode.logLevel > 1) {
                        console.error(healtype);
                        console.error('healtype unknowkn->' + tbd);
                    }
                }

            }
        }
        this.damage_person = beforeArray.indexOf('damage_person') !== -1 ? { num: before.damage_person, ps: Math.round(before.damage_person / this[useTime]) } : { num: 0, ps: 0 };
        this.damage_object = beforeArray.indexOf('damage_object') !== -1 ? { num: before.damage_object, ps: Math.round(before.damage_object / this[useTime]) } : { num: 0, ps: 0 };
        this.damage_robot = beforeArray.indexOf('damage_robot') !== -1 ? { num: before.damage_robot, ps: Math.round(before.damage_robot / this[useTime]) } : { num: 0, ps: 0 };
        this.damage_maton = beforeArray.indexOf('damage_maton') !== -1 ? { num: before.damage_maton, ps: Math.round(before.damage_maton / this[useTime]) } : { num: 0, ps: 0 };
        this.damage_tower = beforeArray.indexOf('damage_tower') !== -1 ? { num: before.damage_tower, ps: Math.round(before.damage_tower / this[useTime]) } : { num: 0, ps: 0 };
        let prm_totalDamage = this.damage_person.num + this.damage_robot.num + this.damage_maton.num;
        this.damage_prm = { num: prm_totalDamage, ps: Number((prm_totalDamage / this[useTime]).toFixed(2)), pss: (prm_totalDamage / this[useTime]).toFixed(2) }
        this.damage_total = typeof (before.totaldamage) === 'number' ? { num: before.totaldamage, ps: Number((before.totaldamage / this[useTime]).toFixed(2)), pss: (before.totaldamage / this[useTime]).toFixed(2) } : { num: 0, ps: 0.00, pss: '0.00' };
        if (before.AreaType === 2) {
            this.damage = this.damage_prm;
        } else {
            this.damage = this.damage_total;
        }
        this.rocketPunch = {
            total: typeof (before.totalrocketpunch) === "number" ? before.totalrocketpunch : 0,
            hit: typeof (before.hitrocketpunch) === "number" ? before.hitrocketpunch : 0,
            avg: typeof (before.hitrocketpunchavarage) === "number" ? before.hitrocketpunchavarage : 0,
            miss: typeof (before.missrocketpunch) === "number" ? before.missrocketpunch : 0
        }
    }
    set set_nameID(nameID) {
        this.nameID = nameID;
    }
    set set_alliance(alliance) {
        this.alliance = alliance;
    }
}
export const TBD = new maindata();
window.TBD_Obj = TBD;

/*
export class battleHistory_Layout {
    constructor(tbd) {
        this.Ally = tbd.dataGet("Ally");
        this.Enemy = tbd.dataGet("Enemy");
        //this.battleEvent = new battle_event();
        this.battleEvent = battleEvent;
    }
}

export const BattleHistory = [];
window.BattleHistory_obj = BattleHistory;
*/

export const saveHistory = () => {
    //BattleHistory.unshift(new battleHistory_Layout(TBD));
}