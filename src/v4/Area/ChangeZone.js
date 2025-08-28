import { timerStop } from "../timer/timer_event";
import { battleEvent } from "../..";
import { TBD } from "../maindataFormat";
import { sampleJSON } from "../sample/workSample";
import { devMode } from "../..";

export class Area {

    constructor() {
        this.Type = 0;
        this.lastType = -1;
        this.id = 0;
        this.lastid = -1;
    }

    set areaset_40(id) {
        this.lastid = this.id;
        this.lastType = this.Type;
        this.id = id;
        this.Type = areaTypeSet_40(id);
        if (this.Type !== this.lastType) {
            timerStop();
            if (this.Type > 0) {
                TBD.resetData = 'ALL';
                battleEvent.reset = true;
            }
        }
        if (this.Type === 0 && this.lastType === 0) {
            TBD.resetData = 'ALL';
            battleEvent.reset = true;
        }
        sampleJSON.applyArea = this.Type;
    }

    set areaset_changeMap(id) {
        // not reset
        this.lastid = this.id;
        this.lastType = this.Type;
        this.id = id;
        this.Type = areaTypeSet_40(id);
    }

    get battleType() {
        return this.Type;
    }

    get battleId() {
        return this.id;
    }

    get battleType_Last() {
        return this.lastType;
    }
}

const areaTypeSet_40 = (zoneID) => {
    //console.log("ZoneID-40", zoneID);
    switch (zoneID) {
        case 488://Hidden Gorge
            return 2;
        case 167://The Border land Ruins Secure
            return 3;
        case 242://Seal Rock Seize
            return 1;
        case 296://The Fields Of Glory Shatter
            return 3;
        case 568://Onsal Hakair Danshig Naadam
            return 1;
        case 759://Crystal Conflict The Palaistra
            return 5;
        case 760://Crystal Conflict The Volcanic Heart
            return 5;
        case 761://Crystal Conflict Cloud Nine
            return 5;
        case 822://Crystal Conflict The Clockwork Castletown 
            return 5;
        case 854://Crystal Conflict The RedSans 
            return 5;
        case 1060://Crystal Conflict The Bayside Battleground
            return 5;
        case 51://Wolves Den Pier
            if (devMode.wolves) {
                return 4;
            }
            return 0;
        case 341://The Goblet
            if (devMode.wolves) {
                return 10;
            }
            return 0;
        default:
            return 0
    }
}