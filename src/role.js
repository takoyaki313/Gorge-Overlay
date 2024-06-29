export const job_to_role = (job) => {
    let tank = ['pld', 'gla', 'war', 'mrd', 'drk', 'gnb'];
    let healer = ['whm', 'sch', 'ast', 'cnj', 'sge'];
    let melee = ['mnk', 'drg', 'nin', 'sam', 'pgl', 'lnc', 'rog', 'rpr', 'vpr'];
    let physical = ['brd', 'mch', 'dnc', 'arc'];
    let magical = ['blm', 'smn', 'rdm', 'thm', 'acn', 'pct'];
    if (tank.indexOf(job) !== -1) {
        return 'tank';
    }
    else if (healer.indexOf(job) !== -1) {
        return 'healer';
    }
    else if (melee.indexOf(job) !== -1) {
        return 'melee';
    }
    else if (physical.indexOf(job) !== -1) {
        return 'physical';
    }
    else if (magical.indexOf(job) !== -1) {
        return 'magical';
    }
    else {
        return 'general';
    }
}
