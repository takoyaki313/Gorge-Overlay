import React from 'react';
import { serverList } from "../v4/xivapi/api";
import { getFFLogsAPIv2 } from "../v4/xivapi/logsV2";
import { AllianceMember } from '../party';
import { TooltipJSX } from "./tooltip/tooltip";
import { getAccessToken } from '../v4/xivapi/logsV2';
import { local } from '..';
import './css/logs.css'
import '../index.css'
export const logsData = new Map();
class logsLayout {
    constructor( playerName, server) {
        this.name = playerName;
        this.server = server;
        this.nameID = String(this.name).replace("'", "") + server;

        if (typeof (serverList[this.server]) !== 'undefined') {
            this.dc = serverList[this.server].dc;
            this.region = serverList[this.server].region;
        } else {
            this.dc = '';
            this.region = '';
        }
        this.res = [];
    }
}

export const logsDataCreate = async () => {
    if (local.logsClientID === "" || local.logsSecretID === "") {
        return null;
    }

    let logs = [];

    let playerList = [];
    if (logsData.size > 150) {
        //Reset  
        logsData.clear();
    }
    AllianceMember.forEach((value, key) => {
        if (value.inParty) {
            let uKey = value.name + value.server;
            if (!logsData.has(uKey)) {
                playerList.push(new logsLayout(value.name, value.server));
            }
        }
    });

    if (playerList.length > 0) {
        // すべてのAPIリクエストを同時に実行し、結果をlogsに格納
        const accessToken = await getAccessToken(local.logsClientID, local.logsSecretID);
        const promises = playerList.map(async (player) => {
            let data = new logsLayout(player.name, player.server);
            data.res = await getFFLogsAPIv2(accessToken, data.name, data.server, data.region);
            return data;
        });
        logs = await Promise.all(promises);
    }
    for (let i = 0; logs.length > i; i++) {
        logsData.set(logs[i].name + logs[i].server, logs[i]);
    }
}

export const OverlayLogsPlayer = () => {

    let partyLogsData = [];
    AllianceMember.forEach((value, key) => {
        if (value.inParty) {
            let uKey = value.name + value.server;
            if (logsData.has(uKey)) {
                partyLogsData.push(logsData.get(uKey));
            }
        }
    });

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            {partyLogsData.map((data) => {

                let playerData = new playerLogsData(data.res === null ? {} : data.res.data);
                let background_color_row = "dps-background-gradient-" + playerData.avgBestPerfColor;
                let gage_offset = Math.abs((playerData.avgBestPerf) - 100) - 2;
                return (
                    <li className='li_space gageRelative' key={data.nameID + data.server + '-logs'} style={{ flexWrap: 'wrap' }}>
                        <div className={'gegeAbs ' + background_color_row} style={{ right: gage_offset + '%' }}></div>
                        <OverlayLogsPlayerRow data={data} playerData={playerData} />
                    </li>
                )
            })}
        </div>);
}

const OverlayLogsPlayerRow = (prop) => {
    let data = prop.data;
    let playerData = prop.playerData;
    return (
        <>
            <div className="logsRowTop">
                <a href={"https://www.fflogs.com/character/id/" + playerData.logsID} target="_blank" rel="noopener noreferrer" style={{ "color": "var(--default-color)", "textDecoration": "none" }}>
                    <TooltipJSX b_class="" setID={data.nameID + 'logs_name'} text={data.name} icon={""} html={data.server + " / " + data.dc} />
                </a>
                <TooltipJSX b_class="leftPadding" setID={data.nameID + 'logs_job'} text={playerData.hidden ? "Hidden" : playerData.bestJob} icon={""} html={""} />
                {playerData.hidden ? "hidden" :
                    <>
                        <TooltipJSX b_class="dataRight flex-center" class={"perf-color-" + playerData.avgBestPerfColor} setID={data.nameID + 'logs_allPerf'} text={playerData.avgBestPerf} icon={""} html={<><div>Metric : {playerData.metric}</div><br /><span>Median : </span><span className={'perf-color-' + playerData.avgMedianPerfColor}>{playerData.avgMedianPerf}</span></>} />
                        <TooltipJSX b_class="dataRight flex-center" setID={data.nameID + 'logs_allStars'} text={"★ " + playerData.allStarPoint} icon={""} html={playerData.allStarsDetail} />
                    </>
                }
            </div>
            {playerData.hidden ? "" : <>
                <div className="logsRowDivLine"></div>
                <div className="logsRowBottom">
                    {playerData.zoneData.map((zoneData, index) => {
                        return (
                            <div key={playerData.name + "-zoneDetail-" + index} style={{ "width": "100%", "display": "flex" }}>
                                <span style={{ "paddingRight": "0.4rem" }}>{zoneData.index + ". "}</span><TooltipJSX class={"perf-color-" + zoneData.rankPercentColor + " flex-center"} setID={data.nameID + zoneData.index + '-zone-' + index} text={zoneData.bestPerf} icon={""} html={zoneData.zoneLogDetail} />
                            </div>
                        )
                    })}
                </div>
            </>}
        </>
    );
}

class playerLogsData {
    constructor(data) {
        if (data === null) {
            return null;
        }
        this.logsID = typeof (data.characterData.character.canonicalID) === 'undefined' ? "" : data.characterData.character.canonicalID;
        this.name = typeof (data.characterData.character.name) === 'undefined' ? "" : data.characterData.character.name;
        this.lodestoneID = typeof (data.characterData.character.lodestoneID) === 'undefined' ? "" : data.characterData.character.lodestoneID;
        this.logsVisible = typeof (data.characterData.character.hidden) === 'undefined' ? false : !data.characterData.character.hidden;
        this.metric = typeof (data.characterData.character.zoneRankings.metric) === 'undefined' ? "" : data.characterData.character.zoneRankings.metric;
        this.avgBestPerf = typeof (data.characterData.character.zoneRankings.bestPerformanceAverag) === "undefined" ? "" : data.characterData.character.zoneRankings.bestPerformanceAverag.toFixed(2);
        this.avgBestPerfColor = fflogsPerfColor(this.avgBestPerf);
        this.avgMedianPerf = typeof (data.characterData.character.zoneRankings.medianPerformanceAverage) === 'undefined' ? "" : data.characterData.character.zoneRankings.medianPerformanceAverage.toFixed(2);
        this.avgMedianPerfColor = fflogsPerfColor(this.avgMedianPerf);
        this.bestJob = typeof(data.characterData.character.zoneRankings.allStars[0].spec) === 'undefined' ? "" : data.characterData.character.zoneRankings.allStars[0].spec;
        this.allStarPoint = typeof(data.characterData.character.zoneRankings.allStars[0].points) === 'undefined'? "" : data.characterData.character.zoneRankings.allStars[0].points.toFixed(1);
        this.allStarsDetail = DataGridDisplay(typeof(data.characterData.character.zoneRankings.allStars[0])==='undefined'?null:data.characterData.character.zoneRankings.allStars[0]);
        this.zoneData = [];
        this.hidden = typeof(data.characterData.character.hidden) === 'undefined' ? false : data.characterData.character.hidden;
        if(typeof(data.characterData.character.zoneRankings.rankings)=== 'undefined'?null:data.characterData.character.zoneRankings.rankings.length===0){
            return null;
        }

        for (let i = 0; i < data.characterData.character.zoneRankings.rankings.length; i++) {
            this.zoneData.push(new zoneLogsData(data.characterData.character.zoneRankings.rankings[i], i));
        }
    }
}

class zoneLogsData {
    constructor(data, index) {
        this.bestPerf = "-"
        this.rankPercentColor = ""
        this.zoneLogDetail = DataGridDisplay(data);
        this.index = index + 1;

        if (data.allStars !== null) {
            this.bestPerf = data.rankPercent.toFixed(2);
            this.rankPercentColor = fflogsPerfColor(this.bestPerf);

        }

    }

}

export const fflogsPerfColor = (perf) => {
    if (perf === null) {
        return ('');
    }
    if (perf >= 100) {
        return ('yellow');
    }
    else if (perf >= 99) {
        return ('pink');
    }
    else if (perf >= 95) {
        return ('orange');
    }
    else if (perf >= 80) {
        return ('purple');
    }
    else if (perf >= 50) {
        return ('blue');
    }
    else if (perf >= 25) {
        return ('green');
    }
    else {
        return ('gray');
    }
}

const DataGridDisplay = (data) => {
    if (typeof data !== 'object' || data === null || Object.keys(data).length === 0) {
        return <p>no data</p>;
    }

    // 各アイテムのキーと値を再帰的にレンダリングするヘルパーコンポーネント
    const renderItem = (item, level = 0) => {
        return Object.entries(item).map(([key, value]) => {
            const isNestedObject = typeof value === 'object' && value !== null && !Array.isArray(value);
            const isArray = Array.isArray(value);

            return (
                <React.Fragment key={key}>
                    <div className={`grid-key level-${level}`}>
                        <strong>{key}:</strong>
                    </div>
                    <div className={`grid-value level-${level}`}>
                        {isNestedObject ? (
                            <div className="nested-grid-container">
                                {renderItem(value, level + 1)}
                            </div>
                        ) : isArray ? (
                            <div className="array-container">
                                {value.length === 0 ? (
                                    <span>[]</span>
                                ) : (
                                    value.map((arrayItem, idx) => (
                                        <div key={idx} className="array-item-wrapper">
                                            {typeof arrayItem === 'object' && arrayItem !== null ? (
                                                <>
                                                    <p className="array-item-header">--- Item {idx + 1} ---</p>
                                                    <div className="nested-grid-container">
                                                        {renderItem(arrayItem, level + 1)}
                                                    </div>
                                                </>
                                            ) : (
                                                <span style={{ "marginLeft": "0.2rem" }}>{arrayItem}</span>
                                            )}
                                        </div>
                                    ))
                                )}
                            </div>
                        ) : (
                            <span style={{ "marginLeft": "0.2rem" }}>{value}</span>
                        )}
                    </div>
                </React.Fragment>
            );
        });
    };

    return (
        <div className="logs-grid-container">
            {renderItem(data)}
        </div>
    );
};