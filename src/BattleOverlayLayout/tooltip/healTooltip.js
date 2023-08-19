import React from 'react';
import { PlayerDetailTooltipLayout } from './damageTooltip';

import '../../css/pvp_overlay_main.css'
import '../../css/fonticon/style.css'
import '../../css/tooltip.css'


export const HealTooltipLayout = (prop) => {
    let data = prop.data;
    let area = data.AreaType;
    if (area === 2) {
        return (
            <div className='tooltip-damage'>
                <HealTotalTooltipLayout total={data.heal} over={data.over_heal} />
                <HealDetailTooltipLayout heal_All={data.heal_All} over_heal_All={data.over_heal_All} />
                <HealPartyAllyTooltipLayout heal_All={data.heal_All} over_heal_All={data.over_heal_All} />
            </div>
        );
    }
    else if (area === 5) {
        return (
            <div className='tooltip-damage'>
                <HealTotalTooltipLayout total={data.heal} over={data.over_heal} />
                <HealDetailTooltipLayout heal_All={data.heal_All} over_heal_All={data.over_heal_All} />
                <HealPartyAllyTooltipLayout heal_All={data.heal_All} over_heal_All={data.over_heal_All} />
                <PlayerDetailTooltipLayout damage_All_CC={data.heal_All_CC} areaType={data.areaType} />
            </div>
        );
    }
    else {
        return (
            <div className='tooltip-damage'>
                <HealTotalTooltipLayout total={data.heal} over={data.over_heal} />
                <HealDetailTooltipLayout heal_All={data.heal_All} over_heal_All={data.over_heal_All} />
                <HealPartyAllyTooltipLayout heal_All={data.heal_All} over_heal_All={data.over_heal_All} />
            </div>
        );
    }

}

export const HealTotalTooltipLayout = (prop) => {
    let heal = { total: typeof (prop.total.num) !== 'undefined' ? prop.total.num : 0, over: typeof (prop.over.num) !== 'undefined' ? prop.over.num : 0 }
    return (
        <div className='tooltip-personTooltip'>
            <span>HEAL : {heal.total}</span>
            <span>
                <span>O-</span>
                <span>{heal.total > 0 ? Math.round((heal.over / heal.total) * 100) : 0}%</span>
            </span>
        </div>
    )
}

export const HealDetailTooltipLayout = (prop) => {
    let data = prop.heal_All;
    let o_data = prop.over_heal_All;

    let heal = {
        normal: { num: 0, ps: 0, Pct: "0%", over: "0%" },
        hot: { num: 0, ps: 0, Pct: "0%", over: "0%" },
        barrier: { num: 0, ps: 0, Pct: "0%", over: "0%" },
        total: { num: 0, ps: 0, Pct: "0%", over: "0%" },
        kaiki: { num: 0, ps: 0, Pct: "0%", over: "0%" },
        portion: { num: 0, ps: 0, Pct: "0%", over: "0%" }
    }

    for (let i = 0; i < data.length; i++) {
        if (data[i].type === "heal_total_HoT" || data[i].type === "accept_income_heal_total_HoT") {
            heal.hot.num = data[i].num;
            heal.hot.ps = data[i].ps;
        } else if (data[i].type === "heal_total_barrier" || data[i].type === "accept_income_heal_total_barrier") {
            heal.barrier.num = data[i].num;
            heal.barrier.ps = data[i].ps;
        } else if (data[i].type === "heal_total_normal" || data[i].type === "accept_income_heal_total_normal") {
            heal.normal.num = data[i].num;
            heal.normal.ps = data[i].ps;
        } else if (data[i].type === "totalheal" || data[i].type === "accept_income_totalheal") {
            heal.total.num = data[i].num;
            heal.total.ps = data[i].ps;
        } else if (data[i].type === "heal_kaiki" || data[i].type === "accept_income_heal_kaiki") {
            heal.kaiki.num = data[i].num;
            heal.kaiki.ps = data[i].ps;
        } else if (data[i].type === "heal_G_portion" || data[i].type === "accept_income_heal_G_portion") {
            heal.portion.num = data[i].num;
            heal.portion.ps = data[i].ps;
        }
    }
    if (heal.total.num > 0) {
        heal.normal.Pct = Math.round((heal.normal.num / heal.total.num) * 100) + '%';
        heal.hot.Pct = Math.round((heal.hot.num / heal.total.num) * 100) + '%';
        heal.barrier.Pct = Math.round((heal.barrier.num / heal.total.num) * 100) + '%';
        if (heal.normal.num > 0) {
            heal.kaiki.Pct = Math.round((heal.kaiki.num / heal.normal.num) * 100) + '%';
            heal.portion.Pct = Math.round((heal.portion.num / heal.normal.num) * 100) + '%';
        }
    }

    for (let i = 0; i < o_data.length; i++) {
        if (o_data[i].type === "over_totalheal" || o_data[i].type === "accept_income_over_totalheal") {
            if (heal.total.num > 0) {
                heal.total.over = Math.round((o_data[i].num / heal.total.num) * 100) + '%';
            }
        } else if (o_data[i].type === "over_heal_total_normal" || o_data[i].type === "accept_income_over_heal_total_normal") {
            if (heal.normal.num > 0) {
                heal.normal.over = Math.round((o_data[i].num / heal.normal.num) * 100) + '%';
            }
        } else if (o_data[i].type === "over_heal_G_portion" || o_data[i].type === "accept_income_over_heal_G_portion") {
            if (heal.portion.num > 0) {
                heal.portion.over = Math.round((o_data[i].num / heal.portion.num) * 100) + '%';
            }
        } else if (o_data[i].type === "over_heal_kaiki" || o_data[i].type === "accept_income_over_heal_kaiki") {
            if (heal.kaiki.num > 0) {
                heal.kaiki.over = Math.round((o_data[i].num / heal.kaiki.num) * 100) + '%';
            }
        } else if (o_data[i].type === "over_heal_total_HoT" || o_data[i].type === "accept_income_over_heal_total_HoT") {
            if (heal.hot.num > 0) {
                heal.hot.over = Math.round((o_data[i].num / heal.hot.num) * 100) + '%';
            }
        }

    } 
    const OptDamage = (prop) => {
        if (prop.data.num > 0) {
            return (<>
                <div className={prop.icon}></div>
                <span>{prop.text}</span>
                <span>{prop.data.ps}{' (' + prop.data.Pct + ')'}{prop.data.over !== "0%" ? " O-" + prop.data.over : ""}</span>
            </>
            )
        } else {
            return ("")
        }
    }
    return (
        <>
            <div className="P-horizontalLine flex-center"></div>
            <div className='tooltip-damage-opt'>
                <OptDamage data={heal.normal} icon="" text="normal" />
            </div>
            <div className='tooltip-damage-opt'>
                <OptDamage data={heal.hot} text="hot" icon="" />
                <OptDamage data={heal.barrier} overPct="" text="barrier" icon="" />
            </div>
            <div className='tooltip-damage-opt' style={{marginTop:"0.2rem"}}>
                <span> |  </span>
                <OptDamage data={heal.kaiki} text="" icon="tooltip_png_iconSize kaiki-png" />
                <OptDamage data={heal.portion} text="" icon="tooltip_png_iconSize portion-png" />
            </div>
        </>
    )
}

export const HealPartyAllyTooltipLayout = (prop) => {
    let data = prop.heal_All;
    let o_data = prop.over_heal_All;

    let heal = {
        self: { num: 0, ps: 0, Pct: "0%", over: "0%", hot: 0, hot_ps: 0, hot_over: "0%", barrier: 0, barrier_ps: 0, barrier_over: "0%" },
        party: { num: 0, ps: 0, Pct: "0%", over: "0%", hot: 0, hot_ps: 0, hot_over: "0%", barrier: 0, barrier_ps: 0, barrier_over: "0%" },
        ally: { num: 0, ps: 0, Pct: "0%", over: "0%", hot: 0, hot_ps: 0, hot_over: "0%", barrier: 0, barrier_ps: 0, barrier_over: "0%" },
        total: { num: 0, ps: 0, Pct: "0%", over: "0%", hot: 0, hot_ps: 0, hot_over: "0%", barrier: 0, barrier_ps: 0, barrier_over: "0%" },
        object: { num: 0, ps: 0, Pct: "0%", over: "0%", hot: 0, hot_ps: 0, hot_over: "0%", barrier: 0, barrier_ps: 0, barrier_over: "0%" }
    }

    for (let i = 0; i < data.length; i++) {
        if (data[i].type === "heal_self" || data[i].type === "accept_income_heal_self") {
            heal.self.num = data[i].num;
            heal.self.ps = data[i].ps;
        } else if (data[i].type === "heal_party" || data[i].type === "accept_income_heal_party") {
            heal.party.num = data[i].num;
            heal.party.ps = data[i].ps;
        } else if (data[i].type === "heal_ally" || data[i].type === "accept_income_heal_ally") {
            heal.ally.num = data[i].num;
            heal.ally.ps = data[i].ps;
        } else if (data[i].type === "totalheal" || data[i].type === "accept_income_totalheal") {
            heal.total.num = data[i].num;
            heal.total.ps = data[i].ps;
        } else if (data[i].type === "heal_object" || data[i].type === "accept_income_heal_object") {
            heal.object.num = data[i].num;
            heal.object.ps = data[i].ps;
        } else if (data[i].type === "heal_self_HoT" || data[i].type === "accept_income_heal_self_HoT") {
            heal.self.hot = data[i].num;
            heal.self.hot_ps = data[i].ps;
        } else if (data[i].type === "heal_self_barrier" || data[i].type === "accept_income_heal_self_barrier") {
            heal.self.barrier = data[i].num;
            heal.self.barrier_ps = data[i].ps;
        } else if (data[i].type === "heal_party_HoT" || data[i].type === "accept_income_heal_party_HoT") {
            heal.party.hot = data[i].num;
            heal.party.hot_ps = data[i].ps;
        } else if (data[i].type === "heal_party_barrier" || data[i].type === "accept_income_heal_party_barrier") {
            heal.party.barrier = data[i].num;
            heal.party.barrier_ps = data[i].ps;
        } else if (data[i].type === "heal_ally_HoT" || data[i].type === "accept_income_heal_ally_HoT") {
            heal.ally.hot = data[i].num;
            heal.ally.hot_ps = data[i].ps;
        } else if (data[i].type === "heal_ally_barrier" || data[i].type === "accept_income_heal_ally_barrier") {
            heal.ally.barrier = data[i].num;
            heal.ally.barrier_ps = data[i].ps;
        } else if (data[i].type === "heal_object_HoT" || data[i].type === "accept_income_heal_object_HoT") {
            heal.object.hot = data[i].num;
            heal.object.hot_ps = data[i].ps;
        } else if (data[i].type === "heal_object_barrier" || data[i].type === "accept_income_heal_object_barrier") {
            heal.object.barrier = data[i].num;
            heal.object.barrier_ps = data[i].ps;
        }
    }
    if (heal.total.num > 0) {
        heal.self.Pct = Math.round((heal.self.num / heal.total.num) * 100) + '%';
        heal.party.Pct = Math.round((heal.party.num / heal.total.num) * 100) + '%';
        heal.ally.Pct = Math.round((heal.ally.num / heal.total.num) * 100) + '%';
        heal.object.Pct = Math.round((heal.object.num / heal.total.num) * 100) + '%';
    }
    for (let i = 0; i < o_data.length; i++) {
        if (o_data[i].type === "over_totalheal" || o_data[i].type === "accept_income_over_totalheal") {
            if (heal.total.num > 0) {
                heal.total.over = Math.round((o_data[i].num / heal.total.num) * 100) + '%';
            }
        } else if (o_data[i].type === "over_heal_self" || o_data[i].type === "accept_income_over_heal_self") {
            if (heal.self.num > 0) {
                heal.self.over = Math.round((o_data[i].num / heal.self.num) * 100) + '%';
            }
        } else if (o_data[i].type === "over_heal_party" || o_data[i].type === "accept_income_over_heal_party") {
            if (heal.party.num > 0) {
                heal.party.over = Math.round((o_data[i].num / heal.party.num) * 100) + '%';
            }
        } else if (o_data[i].type === "over_heal_ally" || o_data[i].type === "accept_income_over_heal_ally") {
            if (heal.ally.num > 0) {
                heal.ally.over = Math.round((o_data[i].num / heal.ally.num) * 100) + '%';
            }
        } else if (o_data[i].type === "over_heal_object" || o_data[i].type === "accept_income_over_heal_object") {
            if (heal.object.num > 0) {
                heal.object.over = Math.round((o_data[i].num / heal.object.num) * 100) + '%';
            }
        } else if (o_data[i].type === "over_heal_self_HoT" || o_data[i].type === "accept_income_over_heal_self_HoT") {
            if (heal.self.hot > 0) {
                heal.self.hot_over = Math.round((o_data[i].num / heal.self.hot) * 100) + '%';
            }
        } else if (o_data[i].type === "over_heal_self_barrier" || o_data[i].type === "accept_income_over_heal_self_barrier") {
            if (heal.self.barrier > 0) {
                heal.self.barrier_over = Math.round((o_data[i].num / heal.self.barrier) * 100) + '%';
            }
        } else if (o_data[i].type === "over_heal_party_HoT" || o_data[i].type === "accept_income_over_heal_party_HoT") {
            if (heal.party.hot > 0) {
                heal.party.hot_over = Math.round((o_data[i].num / heal.party.hot) * 100) + '%';
            }
        } else if (o_data[i].type === "over_heal_party_barrier" || o_data[i].type === "accept_income_over_heal_party_barrier") {
            if (heal.party.barrier > 0) {
                heal.party.barrier_over = Math.round((o_data[i].num / heal.party.barrier) * 100) + '%';
            }
        } else if (o_data[i].type === "over_heal_ally_HoT" || o_data[i].type === "accept_income_over_heal_ally_HoT") {
            if (heal.ally.hot > 0) {
                heal.ally.hot_over = Math.round((o_data[i].num / heal.ally.hot) * 100) + '%';
            }
        } else if (o_data[i].type === "over_heal_ally_barrier" || o_data[i].type === "accept_income_over_heal_ally_barrier") {
            if (heal.ally.barrier > 0) {
                heal.ally.barrier_over = Math.round((o_data[i].num / heal.ally.barrier) * 100) + '%';
            }
        } else if (o_data[i].type === "over_heal_object_HoT" || o_data[i].type === "accept_income_over_heal_object_HoT") {
            if (heal.object.hot > 0) {
                heal.object.hot_over = Math.round((o_data[i].num / heal.object.hot) * 100) + '%';
            }
        } else if (o_data[i].type === "over_heal_object_barrier" || o_data[i].type === "accept_income_over_heal_object_barrier") {
            if (heal.object.barrier > 0) {
                heal.object.barrier_over = Math.round((o_data[i].num / heal.object.barrier) * 100) + '%';
            }
        }
    }
    const AllyPartyOptHeal = (prop) => {
        return (
            <>
                {prop.data.num > 0 ?
                    <>
                        <span className={prop.icon}></span>
                        <span>{prop.data.ps + ' '}</span>
                        <span>{' (' + prop.data.Pct + ') O- ' + prop.data.over}</span>
                        {prop.data.hot > 0 ?
                            <>
                                <span>hot</span>
                                <span>{prop.data.hot_ps + ' O-' + prop.data.hot_over}</span>
                            </> : ""}
                        {prop.data.barrier > 0 ?
                            <><span className='icon-shield'></span>
                                <span>{prop.data.barrier_ps}</span>
                            </> : ""}
                    </>
                    : ""}
            </>
        );
    }
    return (
        <>
            <div className="P-horizontalLine flex-center"></div>
            <div className='tooltip-damage-opt'>
                <AllyPartyOptHeal data={heal.self} icon={"icon-me_normal"} />
            </div>
            <div className='tooltip-damage-opt'>
                <AllyPartyOptHeal data={heal.party} icon={"icon-party_normal"} />
            </div>
            <div className='tooltip-damage-opt'>
                <AllyPartyOptHeal data={heal.ally} icon={"icon-alliance_normal"} />
            </div>
            <div className='tooltip-damage-opt'>
                <AllyPartyOptHeal data={heal.object} icon={"icon-maton"} />
            </div>
        </>
    )

}
