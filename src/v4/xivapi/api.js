const XIVAPI = require('@xivapi/js')
const xiv = new XIVAPI();

export let serverList = {}

export const getDatacenters = async () => {
    let res = await xiv.data.datacenters();
    serverList = {};
    let dc = Object.keys(res);
    for (let i = 0; i < dc.length; i++) {
        for (let p = 0; p < res[dc[i]].length; p++) {
            serverList[res[dc[i]][p]] = { dc: dc[i], region: getServerRegion(dc[i]) }
        }
    }
    return res;
}

export const getServerRegion = (dc) => {
    switch (dc) {
        case 'Elemental':
        case 'Gaia':
        case 'Mana':
        case 'Meteor':
            return 'JP';
        case 'Aether':
        case 'Crystal':
        case 'Dynamis':
        case 'Primal':
            return 'NA';
        case 'Chaos':
        case 'Light':
            return 'EU';
        case 'Materia':
            return 'OC';
        case 'Korea':
            return 'KR';
        case '猫小胖':
        case '莫古力':
        case '陆行鸟':
            return 'CN';
        case '豆豆柴':
            return 'TW';
        default:
            return '';

    }
}