import {loglineFirstStep} from './loglineFirstStep'
/////////////////////////////////////////////////
let LOG_PROCESS = false;
let LOG_QUEUE = [];
let PROMISE_ARRAY = [];
let PROCESS_TIME = { start: 0, end: 0 };

export const loglineQuene_Push = (log) => {
    LOG_QUEUE.push(log);
}


export const calcClock = async () => {
    if (!LOG_PROCESS) {
        if (window.devMode.logLevel > 5) {
            PROCESS_TIME.start = performance.now();
        }
        let promise = Promise.resolve();
        let log_num = LOG_QUEUE.length;

        for (let i = 0; i < log_num; i++) {
            // eslint-disable-next-line no-loop-func
            promise = promise.then(async () => await loglineFirstStep(LOG_QUEUE.shift()));
            PROMISE_ARRAY.push(promise);
        }
        promise = promise.then(async () => {
            if (window.devMode.logLevel > 99) {
                PROCESS_TIME.end = performance.now();
                let time = PROCESS_TIME.end - PROCESS_TIME.start;
                console.debug('CLOCK_Sucsessed(' +log_num +')->' + time + 'ms');
            }
            await log_battle_time();
            await duplicate_delete();
        });
        PROMISE_ARRAY.push(promise);
        if (window.devMode.logLevel > 2) {
            Promise.all(PROMISE_ARRAY).then(() => LOG_PROCESS = false);
        } else {
            Promise.all(PROMISE_ARRAY).then(() => LOG_PROCESS = false)
                .catch(() => {
                    console.error('Critical Error : Log_Calc_failed... log queue reset');
                    LOG_QUEUE = [];
                    LOG_PROCESS = false;
                });
        }
    }
    else {
        console.error('LOG_PROCESS WORKING...->' + LOG_QUEUE.length);
    }
}

const log_battle_time = () =>{
    //Activeなメンバーのtimeに1秒addする
};
const duplicate_delete = () => {
    //重複して入れたデータを削除する。
};