import { loglineFirstStep } from './loglineFirstStep'
import { devMode } from '../..';
/////////////////////////////////////////////////
let LOG_PROCESS = false;
let LOG_QUEUE = [];
let PROMISE_ARRAY = [];
let PROCESS_TIME = { start: 0, end: 0 };

export const loglineQueue_Push = (log) => {
    LOG_QUEUE.push(log);

}


export const calcClock = async () => {
    if (!LOG_PROCESS) {
        LOG_PROCESS = true;
        PROMISE_ARRAY = [];
        if (devMode.calcTime) {
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
            if (devMode.calcTime) {
                PROCESS_TIME.end = performance.now();
                let time = PROCESS_TIME.end - PROCESS_TIME.start;
                console.debug('CLOCK_Successes(' +log_num +')->' + time + 'ms');
            }
        });
        PROMISE_ARRAY.push(promise);
        if (!devMode.forceReset) {
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