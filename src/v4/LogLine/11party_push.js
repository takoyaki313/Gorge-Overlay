import { update_maindata } from "../maindataEdit.js";
import { battleEvent,AreaData } from "../../index.js";

export const  log_party_push = (log) => {
    let party_num = Number(log[2]);
    battleEvent.partyNumUpdate = party_num;
    if (log.length - 4 > 0) {
        let alliance = 1;
        if (log.length === 28) {//24
            battleEvent.Alliance_Data_24 = true;
            let party_length = 8;
            if (AreaData.Type === 2) {//Gorge
                party_length = 4;
            }
            for (let i = 0; i < log.length - 4; i++) {
                if (i > 3) {
                    if (i % party_length === 0) {
                        alliance++;
                    }
                }
                update_maindata('Player_data', 'nameID', log[i + 3].toUpperCase(), ['alliance', alliance, true]);
            }
        }
        else {
            if (battleEvent.Alliance_Data_24 === false) {
                for (let i = 0; i < log.length - 4; i++) {
                    if (i > party_num) {
                        alliance = 10;
                    }
                    update_maindata('Player_data', 'nameID', log[i + 3].toUpperCase(), ['alliance', alliance, true]);
                }
            }
        }
    }
}
