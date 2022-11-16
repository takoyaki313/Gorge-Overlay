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
        this.Alliance = new dunamisHistory();
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
            this.Alliance = new dunamisHistory();
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
            this.Alliance = new dunamisHistory();
            if (window.devMode.logLevel > 2) {
                console.lowarng('MainData Reset');
            }
        }
        else {
            console.error('MainData reset Flag Unknown ->' + type);
        }
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

class dunamisHistory {
    constructor() {
        for (let i = 0; i < 7; i++) {
            this[i] = new dunamisParty();
        }
    }
}

class dunamisParty {
    constructor() {
        this.dunamis = 0;
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
        default:
            for (let i = 0; i < Data.length; i++) {
                rtn.push(new dispPlayerData(Data[i], now, Alliance));
            }
            break;
    }
    rtn.sort((a, b) => b.damage.ps - a.damage.ps);
    return (rtn);
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

        this.damage = typeof (before.totaldamage) === 'number' ? { num: before.totaldamage, ps: Number((before.totaldamage / this[useTime]).toFixed(2)), pss: (before.totaldamage / this[useTime]).toFixed(2) } : { num: 0, ps: 0.00, pss: '0.00' };
        this.heal = typeof (before.totalheal) === 'number' ? { num: before.totalheal, ps: Number((before.totalheal / this[useTime]).toFixed(2)), pss: (before.totalheal / this[useTime]).toFixed(2) } : { num: 0, ps: 0.00, pss: '0.00' };
        this.over_heal = typeof (before.over_totalheal) === 'number' ? { num: before.over_totalheal, ps: Number((before.over_totalheal / this[useTime]).toFixed(1)) } : 0;

        this.accept_income_damage = typeof (before.accept_income_totaldamage) === 'number' ? { num: before.accept_income_totaldamage, ps: Math.round(before.accept_income_totaldamage / this[useTime]) } : { num: 0, ps: 0 };
        this.accept_income_heal = typeof (before.accept_income_totalheal) === 'number' ? { num: before.accept_income_totalheal, ps: Math.round(before.accept_income_totalheal / this[useTime]) } : { num: 0, ps: 0 };
        this.accept_income_over_heal = typeof (before.accept_income_over_totalheal) === 'number' ? { num: before.accept_income_over_totalheal, ps: Math.round(before.accept_income_over_totalheal / this[useTime]) } : { num: 0, ps: 0 };

        this.damage_All = [];
        this.heal_All = [];
        this.over_heal_All = [];

        this.accept_income_damage_All = [];
        this.accept_income_heal_All = [];
        this.accept_income_over_heal_All = [];

        this.dunamis = typeof (before.dunamis) === 'undefined' ? '' : before.dunamis;

        if (0 < this.alliance && this.alliance < 7) {
            if (Alliance[this.alliance].dunamis > 0) {
                this.dunamishistory = Alliance[this.alliance];
            }
            else {
                this.dunamishistory = null;
            }
        } else {
            this.dunamishistory = null;
        }


        let beforeArray = Object.keys(before);
        for (let tbd of beforeArray) {
            if (tbd.indexOf('damage') !== -1) {
                if (tbd.indexOf('damage') === 0 || tbd === 'totaldamage') {
                    this.damage_All.push({ type: tbd, num: before[tbd], ps: Math.round(before[tbd] / this[useTime]) });
                } else {
                    this.accept_income_damage_All.push({ type: tbd, num: before[tbd], ps: Math.round(before[tbd] / this[useTime]) });
                }
            } else if (tbd.indexOf('heal') !== -1) {
                let healtype = tbd.indexOf('heal');
                if (healtype === 0 || tbd === 'totalheal') {
                    this.heal_All.push({ type: tbd, num: before[tbd], ps: Math.round(before[tbd] / this[useTime]) });
                }
                else if (healtype === 5) {
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
    }
}