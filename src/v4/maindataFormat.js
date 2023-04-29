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
            if (window.devMode.logLevel > 2) {
                console.warn('MainData Reset');
            }
        }
        else if (type === 'PART') {
            let backup = [];
            for (let i = 0; i < this.Player_data.length; i++) {
                let target = this.Player_data[i];
                if (target.nameID.substring(0, 2) === '10') {
                    backup.push({ nameID: target.nameID, name: target.name, job: target.job, server: target.server, alliance: target.alliance });
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
            if (window.devMode.logLevel > 2) {
                console.lowarng('MainData Reset');
            }
        }
        else {
            console.error('MainData reset Flag Unknown ->' + type);
        }
    }
    get BattleData_AllyActive() {
        return (BattleDataGet('AllyActive'));
    }
    get BattleData_Party() {
        return (BattleDataGet('Party'));
    }
    get BattleData_Ally() {
        return (BattleDataGet('Ally'));
    }
    get BattleData_Enemy() {
        return (BattleDataGet('Enemy'));
    }
    get BattleData_EnemyActive() {
        return (BattleDataGet('EnemyActive'));
    }
    get BattleData_PC() {
        return (BattleDataGet('PC'));
    }
    get BattleData_NPC() {
        return (BattleDataGet('NPC'));
    }
    get BattleData_All() {
        return (BattleDataGet('All'));
    }
}

class dynamisHistory {
    constructor() {
        for (let i = 0; i < 7; i++) {
            this[i] = new dynamisParty();
        }
    }
}

class dynamisParty {
    constructor() {
        this.dynamis = 0;
        this.history = [];
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

export const BattleDataGetLimit = (num,tbd_battledata) => {
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
const BattleDataGet = (limit) => {
    // Party Ally Enemy PC NPC
    const Data = window.TBD.Player_data;
    const Alliance = window.TBD.Alliance;
    let rtn = [];
    let now = new Date();
    now = now.getTime();

    switch (limit) {
        case 'Party':
            for (let i = 0; i < Data.length; i++) {
                if (Data[i].alliance === 1) {
                    rtn.push(new dispPlayerData(Data[i], now, Alliance));
                }
            }
            break;
        case 'Ally':
            for (let i = 0; i < Data.length; i++) {
                if (Data[i].alliance >= 1) {
                    rtn.push(new dispPlayerData(Data[i], now, Alliance));
                }
            }
            break;
        case 'Enemy':
            for (let i = 0; i < Data.length; i++) {
                if (!Data[i].alliance >= 1 && Data[i].nameID.substring(0, 2) === '10') {
                    rtn.push(new dispPlayerData(Data[i], now, Alliance));
                }
            }
            break;
        case 'EnemyActive':
                for (let i = 0; i < Data.length; i++) {
                    if (!Data[i].alliance >= 1 && Data[i].nameID.substring(0, 2) === '10'&& Data[i].battle) {
                        rtn.push(new dispPlayerData(Data[i], now, Alliance));
                    }
                }
                break;
        case 'PC':
            for (let i = 0; i < Data.length; i++) {
                if (Data[i].nameID.substring(0, 2) === '10') {
                    rtn.push(new dispPlayerData(Data[i], now, Alliance));
                }
            }
            break;
        case 'NPC':
            for (let i = 0; i < Data.length; i++) {
                if (Data[i].nameID.substring(0, 2) === '40' || Data[i].nameID.substring(0, 2) === 'E0') {
                    rtn.push(new dispPlayerData(Data[i], now, Alliance));
                }
            }
            break;
        case 'AllyActive':
            for (let i = 0; i < Data.length; i++) {
                if (Data[i].alliance === 1) {
                    rtn.push(new dispPlayerData(Data[i], now, Alliance));
                }
                else if (Data[i].alliance >= 1 && Data[i].battle) {
                    rtn.push(new dispPlayerData(Data[i], now, Alliance));
                }
            }
            break;
        default:
            for (let i = 0; i < Data.length; i++) {
                rtn.push(new dispPlayerData(Data[i], now, Alliance));
            }
            break;
    }
    return (gorgeSortRule(rtn));
}
const gorgeSortRule = (adjustTBD_rtn) =>{
    if (window.Area.Type === 2) {
        adjustTBD_rtn.sort((a, b) => b.damage_prm.ps - a.damage_prm.ps);
    } else {
        adjustTBD_rtn.sort((a, b) => b.damage.ps - a.damage.ps);
    }
    return (adjustTBD_rtn);
}
const BattleTime_Calc = (data, now) => {
    if (typeof (data) === 'undefined') {
        data = [{ time: window.BATTLE_EVENT.timer.Get_BattleStart, battle: true }];
    }
    if (data.length === 0) {
        data[0] = [{ time: window.BATTLE_EVENT.timer.Get_BattleStart, battle: true }];
    }
    let start_time = window.BATTLE_EVENT.timer.Get_BattleStart === 0 ? data[0].time : window.BATTLE_EVENT.timer.Get_BattleStart;
    let end_time = window.BATTLE_EVENT.timer.Get_ResultIn === 0 ? now : window.BATTLE_EVENT.timer.Get_ResultIn;
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
export const get_dispPlayerData_RobotIndex = (dispData, index) => {
    console.log(index);
    let now = dispData.robot[index].getoff;
    if ( now === 0) {
        now = Date.now();
    }
    let robotData = new dispPlayerData(dispData.robot[index].ridetime, now, dispData.alliance);
    console.log(robotData);
    return ("");
}
class dispPlayerData {
    constructor(before, now, Alliance) {
        this.nameID = before.nameID;
        this.name = typeof (before.name) === 'string' ? before.name : before.nameID;
        this.server = typeof (before.server) === 'string' ? before.server : '';
        this.job = typeof (before.job) === 'string' ? before.job : '';
        this.jobhistory = typeof (before.jobhistory) === 'object' ? before.jobhistory : [];
        this.alliance = typeof (before.alliance) === 'number' ? before.alliance : 0;
        this.kills = typeof (before['s-kill-name']) === 'object' ? before['s-kill-name'] : [];
        this.deaths = typeof (before['s-death-name']) === 'object' ? before['s-death-name'] : [];
        this.assists = typeof (before['s-assist']) === 'object' ? before['s-assist'] : [];

        this.time = BattleTime_Calc(before.add_combatant_time, now);
        this.enctime = window.BATTLE_EVENT.timer.Get_EncTime;
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
        this.over_heal_All = [];

        this.accept_income_damage_All = [];
        this.accept_income_damage_G_All = [];
        this.damage_G_All = [];
        this.accept_income_heal_All = [];
        this.accept_income_over_heal_All = [];

        this.dynamis = typeof (before.dynamis) === 'undefined' ? '' : before.dynamis;
        this.AreaType = before.AreaType;
        if (0 < this.alliance && this.alliance < 7) {
            if (Alliance[this.alliance].dynamis > 0) {
                this.dynamishistory = Alliance[this.alliance];
            }
            else {
                this.dynamishistory = new dynamisParty();
            }
        } else {
            this.dynamishistory = new dynamisParty();
        }


        let beforeArray = Object.keys(before);
        for (let tbd of beforeArray) {
            if (tbd.indexOf('damage') !== -1) {
                if (tbd.indexOf('damage') === 0 || tbd === 'totaldamage') {
                    this.damage_All.push({ type: tbd, num: before[tbd], ps: Math.round(before[tbd] / this[useTime]) });
                } else if (tbd.substring(0, 2) === "G_") {
                    this.damage_G_All.push({ type: tbd, num: before[tbd], ps: Math.round(before[tbd] / this[useTime]) });
                } else {
                    if (tbd.substring(0, 16) === "accept_income_G_") {
                        this.accept_income_damage_G_All.push({ type: tbd, num: before[tbd], ps: Math.round(before[tbd] / this[useTime]) });
                    } else {
                        this.accept_income_damage_All.push({ type: tbd, num: before[tbd], ps: Math.round(before[tbd] / this[useTime]) });
                    }
                }
            } else if (tbd.indexOf('heal') !== -1) {
                let healtype = tbd.indexOf('heal');
                if (healtype === 0 || tbd === 'totalheal') {
                    this.heal_All.push({ type: tbd, num: before[tbd], ps: Math.round(before[tbd] / this[useTime]) });
                }
                else if (healtype === 5 ||tbd === 'over_totalheal') {
                    this.over_heal_All.push({ type: tbd, num: before[tbd], ps: Math.round(before[tbd] / this[useTime]) });
                }
                else if (healtype === 14) {
                    this.accept_income_heal_All.push({ type: tbd, num: before[tbd], ps: Math.round(before[tbd] / this[useTime]) });
                }
                else if (healtype === 19) {
                    this.accept_income_over_heal_All.push({ type: tbd, num: before[tbd], ps: Math.round(before[tbd] / this[useTime]) });
                }
                else {
                    if (window.devMode.logLevel > 1) {
                        console.error('healtype unknowkn->' + tbd);
                    }
                }
            }
        }
        this.damage_person = beforeArray.indexOf('damage_person') !== -1 ? { num: before.damage_person, ps: Math.round(before.damage_person / this[useTime]) } : { num: 0, ps: 0 };
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