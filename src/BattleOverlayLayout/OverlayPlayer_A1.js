import { TooltipJSX } from './tooltip/tooltip';

export const NormalAdvance = (prop) => {
    let data = prop.data;
    return (
        <div className='AdvancedPvP'>
            <div className='optionalArea'>
                <div className="percentArea">
                    {/*<TooltipJSX setID={data.nameID + 'PercentArea'} class='flex-center' icon="icon-call_missed_outgoing smallPadding" text={data.overHealPct} html={'OverHealPct'} />*/}
                </div>
                {prop.slim?
                    <div className="portionNum">
                        <TooltipJSX icon="icon-whatshot smallPadding" class='flex-center' setID={data.nameID + 'Kaiki'} text={data.kaiki} html={data.portion_Tooltip} />
                        <TooltipJSX icon="icon-Frasco smallPadding" class='flex-center' setID={data.nameID + 'Frasco'} text={data.portion} html={data.portion_Tooltip} />
                    </div>
                :""}
                <div className="limitbreakNum">
                    <TooltipJSX icon="icon-limitbreak smallPadding" class='flex-center' setID={data.nameID + 'LimitBreak'} text={data.limitbreakNum + " - " + data.last_limitbreak + 's'} html={data.limitbreak_Tooltip} />
                </div>
            </div>
            <div className='incomeArea'>
                <TooltipJSX icon="" class='flex-center' setID={data.nameID + 'incomeDamage'} text={data.accept_income_damage} html={data.accept_income_damage_Tooltip} />
                <div className="verticalLine" ></div>
                <TooltipJSX icon="" class='flex-center' setID={data.nameID + 'incomeHeal'} text={data.accept_income_heal} html={data.accept_income_heal_Tooltip} />
            </div>
        </div>
    )
}