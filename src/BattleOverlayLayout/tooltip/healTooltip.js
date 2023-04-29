import React from 'react';

import '../../css/pvp_overlay_main.css'
import '../../css/fonticon/style.css'
import '../../css/tooltip.css'


export const HealTooltipLayout = (prop) => {
    //prop data
    let data = prop.data.heal_All;
    let o_data = prop.data.over_heal_All;
    let damage = {
        total: { num: 0, ps: 0, Pct: '100%' }, normal: { num: 0, ps: 0, Pct: '0%' },
        dot: { num: 0, ps: 0, Pct: '0%' }, barrier: { num: 0, ps: 0, Pct: '0%' },
        kaiki: { num: 0, ps: 0, Pct: '0%' }, portion: { num: 0, ps: 0, Pct: '0%' }
    }

    for (let i = 0; i < data.length; i++) {
        if (data[i].type === "heal_total_HoT") {
            damage.dot.num = data[i].num;
            damage.dot.ps = data[i].ps;
        } else if (data[i].type === "heal_total_barrier") {
            damage.barrier.num = data[i].num;
            damage.barrier.ps = data[i].ps;
        } else if (data[i].type === "heal_total_normal") {
            damage.normal.num = data[i].num;
            damage.normal.ps = data[i].ps;
        } else if (data[i].type === "totalheal") {
            damage.total.num = data[i].num;
            damage.total.ps = data[i].ps;
        } else if (data[i].type === "heal_kaiki") {
            damage.kaiki.num = data[i].num;
            damage.kaiki.ps = data[i].ps;
        } else if (data[i].type === "heal_G_portion") {
            damage.portion.num = data[i].num;
            damage.portion.ps = data[i].ps;
        }
    }
    if (damage.total.num > 0) {
        damage.normal.Pct = Math.round((damage.normal.num / damage.total.num) * 100) + '%';
        damage.dot.Pct = Math.round((damage.dot.num / damage.total.num) * 100) + '%';
        damage.barrier.Pct = Math.round((damage.barrier.num / damage.total.num) * 100) + '%';
        if (damage.normal.num > 0) {
            damage.kaiki.Pct = Math.round((damage.kaiki.num / damage.normal.num) * 100) + '%';
            damage.portion.Pct = Math.round((damage.portion.num / damage.normal.num) * 100) + '%';
        }
    }

    let over = {
        total: { num: 0, ps: 0, Pct: '0%' }, normal: { num: 0, ps: 0, Pct: '0%' },
        kaiki: { num: 0, ps: 0, Pct: '0%' }, portion: { num: 0, ps: 0, Pct: '0%' }

    };
    for (let i = 0; i < o_data.length; i++) {
        if (o_data[i].type === "over_totalheal") {
            over.total.num = o_data[i].num;
            over.total.ps = o_data[i].ps;
            if (damage.total.num > 0) {
                over.total.Pct = Math.round((over.total.num / damage.total.num) * 100) + '%';
            }
        } else if (o_data[i].type === "over_heal_total_normal") {
            over.normal.num = o_data[i].num;
            over.normal.ps = o_data[i].ps;
            if (damage.normal.num > 0) {
                over.normal.Pct = Math.round((over.normal.num / damage.normal.num) * 100) + '%';
            }
        } else if (o_data[i].type === "over_heal_G_portion") {
            over.portion.num = o_data[i].num;
            over.portion.ps = o_data[i].ps;
            if (damage.portion.num > 0) {
                over.portion.Pct = Math.round((over.portion.num / damage.portion.num) * 100) + '%';
            }
        } else if (o_data[i].type === "over_heal_kaiki") {
            over.kaiki.num = o_data[i].num;
            over.kaiki.ps = o_data[i].ps;
            if (damage.kaiki.num > 0) {
                over.kaiki.Pct = Math.round((over.kaiki.num / damage.kaiki.num) * 100) + '%';
            }
        }
    }

    const OptDamage = (prop) => {
        if (prop.data.num > 0) {
            return (<>
                <div className={prop.icon}></div>
                <span>{prop.text}</span>
                <span>{prop.data.ps}{' (' + prop.data.Pct + ')'}{prop.overPct.length > 0 ? " O-" + prop.overPct : ""}</span>
            </>
            )
        } else {
            return ("")
        }
    }
    return (
        <>
            <div className='tooltip-personTooltip'>
                <span>HEAL : {damage.total.num}</span>
                <span className='flex-center'><span>O - </span><span>{over.total.Pct}</span></span>
            </div>
            <div className="P-horizontalLine flex-center"></div>
            <div className='tooltip-damage-opt'>
                <OptDamage data={damage.normal} overPct={over.normal.Pct} icon="" text="normal" />
                <OptDamage data={damage.dot} overPct="" text="dot" icon="" />
                <OptDamage data={damage.barrier} overPct="" text="barrier" icon="" />
            </div>
            <div className='tooltip-damage-opt'>
                <span> |  </span>
                <OptDamage data={damage.kaiki} overPct={over.kaiki.Pct} text="" icon="tooltip_png_iconSize kaiki-png" />
                <OptDamage data={damage.portion} overPct={over.portion.Pct} text="" icon="tooltip_png_iconSize portion-png" />
            </div>
        </>
    )
}