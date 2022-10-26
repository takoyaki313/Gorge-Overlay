export const partyChangeEvent = (party) => {
    window.AllianceMember = [];
    for (let i = 0; i < party.length; i++) {
        window.AllianceMember.push(new Party(party.id, party.name, party.inParty, party.length, i + 1));
    }
}

class Party {
    constructor(nameID, name, inParty, AllianceNum, count) {
        this.nameID = nameID;
        this.name = '';
        this.server = '';
        this.job = '';
        this.count = count;
        this.combatant = {};
        if (inParty) {
            this.PartyNumber = 1;
            this.PartyNumberVerified = true;
        }
        else {
            if (AllianceNum === 24) {
                const party_length = 8;
                this.PartyNumber = Math.ceil(count / party_length);
                this.PartyNumberVerified = true;
            }
            else if (!this.PartyNumberVerified) {
                this.PartyNumber = 10;
                this.PartyNumberVerified = false;
            }
        }
        this.inPary = inParty;
    }
}