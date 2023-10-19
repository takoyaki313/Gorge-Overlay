import { local } from "..";

let KILL_SOUND = null;

export const killSound_play = () => {
    if (local.rw_killSound_Path === '') {
        return null;
    } else {
        KILL_SOUND.play();
    }
}

export const killSound_Load = (play = false) => {
    if (local.rw_killSound_Path === '') {
        return null;
    }
    KILL_SOUND = new Audio(local.rw_killSound_Path);
    KILL_SOUND.volume = local.rw_killSound_Volume / 100;
    if (play) {
        KILL_SOUND.play();
    }
}

export const samplePlay = (path, volume) =>{
    let sound = new Audio(path);
    sound.volume = volume / 100;
    sound.play();
}