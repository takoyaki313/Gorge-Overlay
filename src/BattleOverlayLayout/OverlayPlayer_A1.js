import { TooltipJSX } from './tooltip/tooltip';

export const NormalAdvance = (prop) => {
    let data = prop.data;

    return (
        <div className='AdvancedPvP'>
            <div className='optionalArea'>
                <div className="percentArea">
                    <TooltipJSX setID={data.nameID + 'PercentArea'} class='flex-center' icon="icon-call_missed_outgoing smallPadding" text={data.overHealPct} html={'OverHealPct'} />
                </div>
                <div className="portionNum">
                    <TooltipJSX icon="icon-whatshot smallPadding" class='flex-center' setID={data.nameID + 'Frasco'} text={data.kaiki} html={""} />
                    <TooltipJSX icon="icon-Frasco smallPadding" class='flex-center' setID={data.nameID + 'Frasco'} text={data.portion} html={""} />
                </div>
                <div className="limitbreakNum">
                    <TooltipJSX icon="icon-limitbreak smallPadding" class='flex-center' setID={data.nameID + 'LimitBreak'} text={data.limitbreakNum + " - " + data.last_limitbreak + 's'} html={data.limitbreak_Tooltip} />
                </div>
            </div>
            <div className='incomeArea'>
                <div className='incomeNumber'>{data.accept_income_damage}</div>
                <div className="verticalLine" ></div>
                <div className='incomeNumber'>{data.accept_income_heal}</div>
            </div>
        </div>
    )
}