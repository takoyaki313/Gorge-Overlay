const XIVAPI = require('@xivapi/js')
const xiv = new XIVAPI();

export let serverList = {}

export const getDatacenters = async () => {
    let res = await xiv.data.datacenters();
    serverList = {};
        let dc = Object.keys(res);
        for (let i = 0; i < dc.length; i++) {
            for (let p = 0; p < res[dc[i]].length; p++) {
                serverList[res[dc[i]][p]] = { dc: dc[i] }
            }
        }
    return res;

}