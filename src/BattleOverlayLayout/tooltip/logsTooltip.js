import { logsData } from "../logsPlayer";
import { PRIMARY_PLAYER } from "../..";
import { fflogsPerfColor } from "../logsPlayer";
import React from "react";

export const LogsTooltipLayout = (prop) => {
    //prop data
    let name = prop.name;

    if (name === PRIMARY_PLAYER.ACT_name) {
        name = PRIMARY_PLAYER.name;
    }
    let isFound = false;
    let data = {}


    logsData.forEach((value, key) => {
        if (value.name === name) {
            data = value;
            isFound = true;
        }
    });

    if (isFound) {
        if (data.res.data.characterData.character.hidden) {
            return (<>Logs-Hidden</>);
        }

        let zoneRanking = data.res.data.characterData.character.zoneRankings;
        if (zoneRanking.bestPerformanceAverage === null) {
            return (<>Logs-No-data(No uploaded)</>);
        }

        let bestPerfColor = fflogsPerfColor(zoneRanking.bestPerformanceAverage);
        let medianPerfColor = fflogsPerfColor(zoneRanking.medianPerformanceAverage);

        return (<div>
            <div className="tooltip-log-top">
                <span>{data.server}</span>
                <span>{data.dc}</span>
            </div>
            <div className="P-horizontalLine flex-center"></div>
            <div className="tooltip-log-center">
                <span>{zoneRanking.metric}</span>
                <span>{zoneRanking.allStars[0].spec}</span>
                <span className={"perf-color-" + bestPerfColor}>{zoneRanking.bestPerformanceAverage.toFixed(2)}</span>
                <span className={"perf-color-" + medianPerfColor}>({zoneRanking.medianPerformanceAverage.toFixed(2)})</span>
                <span>★{zoneRanking.allStars[0].points.toFixed(1)}</span>
            </div>
            <div className="tooltip-log-Bottom">
                {zoneRanking.rankings.map((encounter) => {

                    return (
                        <React.Fragment key={data.ACT_name + "-" + encounter.encounter.id}>
                            <span key={encounter.encounter.ID + "-" + data.name}>{encounter.encounter.name === null ? "" : encounter.encounter.name}</span>
                            <span style={{ "marginLeft": "0.4rem" }}>{encounter.spec === null ? "-" : encounter.spec}</span>
                            <span style={{ "marginLeft": "0.4rem" }} className={"perf-color-" + fflogsPerfColor(encounter.rankPercent)}>{encounter.rankPercent === null ? "-" : encounter.rankPercent.toFixed(2)}</span>
                            <span className={"perf-color-" + fflogsPerfColor(encounter.medianPercent)}>{encounter.medianPercent === null ? "-" : "(" + encounter.medianPercent.toFixed(2) + ")"}</span>
                            <span>{encounter.allStars === null ? "-" : "★" + encounter.allStars.points.toFixed(2)}</span>
                        </React.Fragment>
                    )
                })}
            </div>
        </div>);
    } else {
        return (<>Not Found (Lodestone Hidden?)</>)
    }
}