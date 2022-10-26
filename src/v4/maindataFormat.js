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
        this.Aliance = new dunamisHistory();
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
            this.Aliance = new dunamisHistory();
            if(window.devMode.logLevel > 2){
                console.warn('MainData Reset');
            }
        }
        else if (type === 'PART') {
            let backup = [];
            for (let i = 0; i < this.Player_data.length; i++) {
                let target = this.Player_data[i];
                if (target.nameID.substring(0, 2) === '10') {
                    backup.push({ nameID: target.nameID, name: target.name, job: target.job, server: target.server, aliance: target.aliance });
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
            this.Aliance = new dunamisHistory();
            if(window.devMode.logLevel > 2){
                console.lowarng('MainData Reset');
            }
        }
        else {
            console.error('MainData reset Flag Unknown ->' + type);
        }
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