import { TooltipJSX } from './tooltip/tooltip';

export const GorgeAdvance = (prop) => {
    let data = prop.data;
    return (
        <div className='AdvancedPvP'>
            <div className='optionalArea'>

                <TooltipJSX icon="icon-person1 smallPadding" class='flex-center' setID={data.nameID + 'person_damage'} text={data.damage_person} html={data.damage_person_Tooltip} />
                <TooltipJSX icon="icon-hammer smallPadding" class='flex-center' setID={data.nameID + 'robot_damage'} text={data.damage_robot} html={data.damage_robot_Tooltip} />
                <TooltipJSX b_class={"matonTower"} icon="icon-maton smallPadding" class='flex-center' setID={data.nameID + 'object_damage'} text={data.damage_maton + " + " + data.damage_tower} html={data.damage_maton_Tooltip} />
                {prop.slim ?
                    <div className="portionNum PortionNum2">
                        <TooltipJSX icon="icon-Frasco smallPadding" class='flex-center' setID={data.nameID + 'Frasco'} text={data.kaiki + "(" + data.portion + ")"} html={data.portion_Tooltip} />
                    </div>
                    : ""}
                <div className="limitbreakNumA2">
                    <TooltipJSX icon="smallPadding" class='flex-center' setID={data.nameID + 'LimitBreak'} text={"L-" + data.limitbreakNum} html={data.limitbreak_Tooltip} />
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