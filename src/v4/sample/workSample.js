
import { loglineQueue_Push } from "../LogLine/loglineClock.js";

import { AreaData, battleEvent, devMode } from "../../index.js";
import { TBD } from "../maindataFormat.js";

class sampleLog {
    constructor() {
        this.AreaType = 0;
        this.data = [];
    }
    resetData() {
        this.AreaType = 0;
        this.data = [];
    }
    async save() {
        try {
            const fileHandle = await window.showSaveFilePicker({
                suggestedName: this.AreaType + "_" + Date.now() + ".json",
            });

            const writableStream = await fileHandle.createWritable();

            const jsonStr = JSON.stringify(this, null, 2);

            await writableStream.write(jsonStr);
            await writableStream.close();

            console.log("JSON-Save-OK");
        } catch (error) {
            console.error("JSON-Save-Error: " + error.message);
        }
    }
    async calc() {
        AreaData.areaType = this.AreaType;
        devMode.sampleType = this.AreaType;
        battleEvent.reset = true;
        battleEvent.encounterStart = true;
        for (let i = 0; i < this.data.length; i++) {
            loglineQueue_Push(this.data[i]);
        }
        return "OK";
    }

    set pushData(log) {
        this.data.push(log);
    }

    set applyArea(areaType) {
        this.AreaType = areaType;
    }

    async applyData() {
        try {
            const fileHandle = await window.showOpenFilePicker();
            const file = await fileHandle[0].getFile();

            const text = await file.text();
            const jsonObject = JSON.parse(text);

            this.applyArea = jsonObject.AreaType;
            this.data = jsonObject.data;
        } catch (error) {
            console.error('JSON-Read-Error:', error);
        }
    }
}

export const saveOrRead_JSON = async () => {
    if (!devMode.sampleGet) {
        
        return null;
    }
    if (sampleJSON.AreaType !== 0 && !devMode.sampleReadMode) {
        //save
        await sampleJSON.save();
    } else {
        //read
        TBD.resetData = "ALL";
        await sampleJSON.applyData();
        await sampleJSON.calc();
        devMode.sampleReadMode = true;
    }
    sampleJSON.resetData();
}

export const sampleJSON = new sampleLog();
window.sampleJSON_OBJ = sampleJSON;