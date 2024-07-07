import { loglineQueue_Push } from "./v4/LogLine/loglineClock";
import { jobID_to_string } from "./jobs";
import { AreaData } from ".";
import { PRIMARY_PLAYER } from ".";
export const AllianceMember = new Map();

export const partyChangeEvent = (party) => {
    let isAllianceStr = true;
    for (let i = 0; i < party.length; i++) {
        if (PRIMARY_PLAYER.nameID === party[i].id) {
            if (party[i].territoryType === 791) {//Hidden Gorge
                isAllianceStr = false;
            }
        }
    }
    for (let i = 0; i < party.length; i++) {
        AllianceMember.set(party[i].id, new Party(party[i].id, party[i].name, party[i].inParty, party.length, i + 1, jobID_to_string(party[i].job), party[i].partyType, isAllianceStr));
    }
}

class Party {
    constructor(nameID, name, inParty, AllianceNum, count, job, partyType, isAllianceStr) {
        this.nameID = nameID;
        this.name = name;
        this.job = job;
        this.count = count;
        this.combatant = {};


        if (inParty) {
            this.PartyNumber = 1;
            this.PartyNumberVerified = true;
        }
        else {
            if (AllianceNum === 24) {
                if (AreaData.Type === 2) {//Hidden Gorge
                    const party_length = 4;
                    this.PartyNumber = Math.ceil(count / party_length);
                    this.PartyNumberVerified = true;
                } else {
                    const party_length = 8;
                    this.PartyNumber = Math.ceil(count / party_length);
                    this.PartyNumberVerified = true;
                }

            }
            else {
                this.PartyNumber = 10;
                this.PartyNumberVerified = false;
            }
        }

        if (partyType.indexOf("Alliance") !== -1 && isAllianceStr) {
            this.AllianceType = partyType.charAt(partyType.length - 1);
        } else {
            this.AllianceType = "";
        }

        if (this.PartyNumberVerified) {
            loglineQueue_Push(['102', null, this.nameID, this.name, this.PartyNumber, this.job, this.AllianceType]);
        }
        this.inPary = inParty;
    }
}