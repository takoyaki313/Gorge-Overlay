export const time_change = (time_sec) => {
    let division_time = [0, 0];

    if(time_sec < 0){
        return division_time;
    }

    division_time[0] = Math.trunc(time_sec / 60);
    const temp = division_time[0] * 60;
    division_time[1] = time_sec - temp;
    if (division_time[1] < 10) {
        division_time[1] = "0" + division_time[1];
    }
    return division_time;
}
