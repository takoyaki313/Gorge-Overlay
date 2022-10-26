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
        if(this.Type !== this.lastType){
            if(this.Type > 0){
                window.TBD.resetData = 'ALL';
            }
        }
        if(this.Type === 0 && this.lastType === 0){
            window.TBD.resetData = 'ALL';
        }
    }

    set areaset_Override(id) {
        this.Type = areaTypeSetEvent(id);
        if(this.Type > 0){
            //ExtOverlay_BATTLEMODE ON
        }
        else{
            //ExtOverlay_BATTLEMODE OFF
        }
    }

    get battleType() {
        return this.Type;
    }

    get battleType_Last() {
        return this.lastType;
    }

}
const  areaTypeSetEvent = (zoneID) => {
    switch (zoneID) {
        case 791://Hidden Gorge
            return 2;
        case 376://The Border land Ruins Secure
            return 3;
        case 431://Seal Rock Seize
            return 1;
        case 554://The Fields Of Glory Shatter
            return 3;
        case 888://Onsal Hakair Danshig Naadam
            return 1;
        case 1032://Crystal Conflict The Palaistra
            return 5;
        case 1033://Crystal Conflict The Volcanic Heart
            return 5;
        case 1034://Crystal Conflict Cloud Nine
            return 5;
        case 250://Wolves Den Pier
            return 4;
        /*
        case 341://The Goblet
            return 10;
        */
        default:
            return 0
    }
}

const areaTypeSet_40 = (zoneID) => {
    //488 is Hidden Gorge
    //341 is The Goblet (my home)
    //242 is Seal Rock
    //296 is Field of Groly
    //568 is Onsal Hakair
    //167 is The Borderland Luins
    //15 is Middle La Noscea
    //51 is Wolves' Den Pier
    //759 is The Palaistra
    //760 is The Volcanic Heart
    //761 is Cloud Nine
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
        case 51://Wolves Den Pier
            return 4;
        /*
        case 341://The Goblet
            return 10;
        */
        default:
            return 0
    }
}