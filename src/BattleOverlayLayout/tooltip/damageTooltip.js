import React from 'react';

import '../../css/pvp_overlay_main.css'
import '../../css/fonticon/style.css'
import '../../css/tooltip.css'

export const DamageTooltipLayout = (prop) => {
    //prop data
    let data = prop.data;
    return (<div className='tooltip-damage'>
        <DamageTotalToolTipLayout damage_All={data.damage_All} time={data.time} />
        <div className="P-horizontalLine flex-center"></div>
        <DamagePersonToolTipLayout damage_G_All={data.damage_G_All} />
        <RobotDamageToolTipLayout damage_G_All={data.damage_G_All} />
        <div className="P-horizontalLine flex-center"></div>
        <ObjectDamageToolTipLayout damage_G_All={data.damage_G_All} />
    </div>);
}

export const DamageTotalToolTipLayout = (prop) => {
    let data = prop.damage_All;
    let damage = { total: { num: 0, ps: 0, Pct: '100%' }, normal: { num: 0, ps: 0, Pct: '0%' }, dot: { num: 0, ps: 0, Pct: '0%' }, counter: { num: 0, ps: 0, Pct: '0%' } }

    for (let i = 0; i < data.length; i++) {
        if (data[i].type === "damage_total_DoT") {
            damage.dot.num = data[i].num;
            damage.dot.ps = data[i].ps;
        } else if (data[i].type === "damage_total_counter") {
            damage.counter.num = data[i].num;
            damage.counter.ps = data[i].ps;
        } else if (data[i].type === "damage_total_normal") {
            damage.normal.num = data[i].num;
            damage.normal.ps = data[i].ps;
        } else if (data[i].type === "totaldamage") {
            damage.total.num = data[i].num;
            damage.total.ps = data[i].ps;
        }
    }
    if (damage.total.num > 0) {
        damage.normal.Pct = Math.round((damage.normal.num / damage.total.num) * 100) + '%';
        damage.dot.Pct = Math.round((damage.dot.num / damage.total.num) * 100) + '%';
        damage.counter.Pct = Math.round((damage.counter.num / damage.total.num) * 100) + '%';
    }
    const OptDamage = (prop) => {
        if (prop.data.num > 0) {
            return (<>
                <span>{prop.text}</span>
                <span>{prop.data.ps}{' (' +prop.data.Pct + ')'}</span>
            </>
            )
        } else {
            return ("")
        }
    }
    return (
        <>
            <div className='tooltip-personTooltip'>
                <span>DAMAGE : {damage.total.num}</span>
                <span className='flex-center'><span className='icon-ScheduleTime'></span><span>{prop.time}</span></span>
            </div>
            <div className='tooltip-damage-opt'>
                <OptDamage data={damage.normal} text="normal" />
                <OptDamage data={damage.dot} text="dot" />
                <OptDamage data={damage.counter} text="counter" />
            </div>
        </>
    )
}
export const DamagePersonToolTipLayout = (prop) => {
    let data = prop.damage_G_All;
    let damage = { total: { num: 0, ps: 0, Pct: '100%' }, person: { num: 0, ps: 0, Pct: '0%' }}
    for (let i = 0; i < data.length; i++) {
        if (data[i].type === "G_Player_to_damage_person") {
            damage.person.num = data[i].num;
            damage.person.ps = data[i].ps;
        }else if (data[i].type === "G_Player_to_damage") {
            damage.total.num = data[i].num;
            damage.total.ps = data[i].ps;
        }
    }
    if (damage.total.num > 0) {
        damage.person.Pct = Math.round((damage.person.num / damage.total.num) * 100) + '%';
    }
    return (
        <>
            <div className='tooltip-damage-opt'>
                <span className='icon-person1'></span>
                <span>{damage.person.ps}{' (' +damage.person.Pct + ')'}</span>
                <span>{' - ' + damage.person.num}</span>
            </div>
        </>
    )
}
export const RobotDamageToolTipLayout = (prop) => {
    let data = prop.damage_G_All;
    let damage = { robot: { num: 0, ps: 0, Pct: '0%' }, total: { num: 0, ps: 0, Pct: '100%' }, che: { num: 0, ps: 0, Pct: '0%' }, opp: { num: 0, ps: 0, Pct: '0%' },jus: { num: 0, ps: 0, Pct: '0%' } }
    for (let i = 0; i < data.length; i++) {
        if (data[i].type === "G_Player_to_damage_robot_che") {
            damage.che.num = data[i].num;
            damage.che.ps = data[i].ps;
        } else if (data[i].type === "G_Player_to_damage_robot_opp") {
            damage.opp.num = data[i].num;
            damage.opp.ps = data[i].ps;
        } else if (data[i].type === "G_Player_to_damage_robot_jus") {
            damage.jus.num = data[i].num;
            damage.jus.ps = data[i].ps;
        } else if (data[i].type === "G_Player_to_damage_robot") {
            damage.robot.num = data[i].num;
            damage.robot.ps = data[i].ps;
        } else if (data[i].type === "G_Player_to_damage") {
            damage.total.num = data[i].num;
            damage.total.ps = data[i].ps;
        }
    }
    if (damage.total.num > 0) {
        damage.robot.Pct = Math.round((damage.robot.num / damage.total.num) * 100) + '%';
    }
    if (damage.robot.num > 0) {
        damage.che.Pct = Math.round((damage.che.num / damage.robot.num) * 100) + '%';
        damage.opp.Pct = Math.round((damage.opp.num / damage.robot.num) * 100) + '%';
        damage.jus.Pct = Math.round((damage.jus.num / damage.robot.num) * 100) + '%';
    }
    return (
        <>
            <div className='tooltip-damage-opt'>
                <span className='icon-hammer'></span>
                <span>{damage.robot.ps}{' (' +damage.robot.Pct + ')'}</span>
                <span>{' - ' + damage.robot.num}</span>
            </div>
            <div className='tooltip-damage-opt'>
                <span>| </span>
                <span className='icon-che' style={{ 'fontSize': '0.8rem' }}></span>
                <span>{damage.che.ps}{' (' + damage.che.Pct + ')'}</span>
                <span className='icon-opp' style={{ 'fontSize': '0.8rem' }}></span>
                <span>{damage.opp.ps}{' (' + damage.opp.Pct + ')'}</span>
                <span className='icon-jas' style={{ 'fontSize': '0.8rem' }}></span>
                <span>{damage.jus.ps}{' (' +damage.jus.Pct + ')'}</span>
            </div>
        </>
    )
}
export const ObjectDamageToolTipLayout = (prop) => {
    let data = prop.damage_G_All;
    let damage = { total: { num: 0, ps: 0, Pct: '0%' }, maton: { num: 0, ps: 0, Pct: '100%' }, tower: { num: 0, ps: 0, Pct: '0%' } }
    for (let i = 0; i < data.length; i++) {
        if (data[i].type === "G_obj_to_damage") {
            damage.total.num = data[i].num;
            damage.total.ps = data[i].ps;
        } else if (data[i].type === "G_obj_to_damage_maton") {
            damage.maton.num = data[i].num;
            damage.maton.ps = data[i].ps;
        } else if (data[i].type === "G_obj_to_damage_tower") {
            damage.tower.num = data[i].num;
            damage.tower.ps = data[i].ps;
        }
    }
    if (damage.total.num > 0) {
        damage.maton.Pct = Math.round((damage.maton.num / damage.total.num) * 100) + '%';
        damage.tower.Pct = Math.round((damage.tower.num / damage.total.num) * 100) + '%';
    }
    return (
        <>
            <div className='tooltip-damage-opt'>
                <span className='icon-maton'></span>
                <span>{damage.total.ps}</span>
                <span>{' - ' + damage.total.num}</span>
            </div>
            <div className='tooltip-damage-opt'>
                <span>| </span>
                <span className='icon-maton' style={{ 'fontSize': '0.8rem' }}></span>
                <span>{damage.maton.ps}{' (' + damage.maton.Pct + ')'}</span>
                <span className='icon-tower2' style={{ 'fontSize': '0.8rem' }}></span>
                <span>{damage.tower.ps}{' (' + damage.tower.Pct + ')'}</span>
            </div>
        </>
    )
}