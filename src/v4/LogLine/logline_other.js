export const minimapChange_40 = async (log) => {
    const areaID = Number(log[2]);
    window.Area.areaset_40 = areaID;
}
export const primaryPlayerChanged_101 = (log) => {

}

export const timestamp_change = async (time) => {
    return Date.parse(time);
}

export const null_check = (data) => {
    if (data === '' || typeof data === 'undefined') {
        data = null;
    }
    return data;
}