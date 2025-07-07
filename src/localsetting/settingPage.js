import './setting.css'

import { TooltipJSX } from "../BattleOverlayLayout/tooltip/tooltip"
import React, { useState } from 'react';
import { local } from '..';

export const SettingPageStart = (prop) => {
    const [tabs_kind, tabs] = useState('General');
    const tabs_change = (event) => {
        tabs(event.target.value);
    }
    let tabs_Text = [];
    if (local.AddInMode) {
        tabs_Text = ['General', 'FL', 'RW', 'CC', 'Plugin']
    } else {
        tabs_Text = ['General', 'FL', 'RW', 'CC']
    }

    return (
        <div id="settingPage">
            <header>
                <div>GorgeOverlay-4</div>
                <div onClick={() => { prop.setting(false) }}>
                    <TooltipJSX b_class="flex-center" icon="icon-arrow-right" setID={'setting_close'} html={"close"} />
                </div>
            </header>

            <div id="settingTabs">
                {tabs_Text.map((item) => {
                    return (
                        <div key={item}>
                            <input
                                id={"setting-tabs-" + item}
                                type="radio"
                                value={item}
                                onChange={tabs_change}
                                checked={item === tabs_kind}
                                style={{ display: "none" }}
                            />
                            <label htmlFor={"setting-tabs-" + item}>{item}</label>
                        </div>
                    );
                })}
            </div>
            <div className='horizontalLine flex-center' style={{ backgroundColor: 'gray' }}></div>
            {tabs_kind === 'General' ? <PvESettingPage /> : ""}
            {tabs_kind === 'FL' ? <FLSettingPage /> : ""}
            {tabs_kind === 'RW' ? <RWSettingPage /> : ""}
            {tabs_kind === 'CC' ? <CCSettingPage /> : ""}
            {tabs_kind === 'Plugin' ? <ADSettingPage /> : ""}
        </div>
    )
}
const PvESettingPage = () => {
    return (
        <div>
            <SettingTextInput
                ja_main={"ACT上で設定した名前"}
                ja_sub={"/Options/Data Correction/Miscellaneous"}
                en_main={"Name set on ACT"}
                en_sub={"Options/Data Correction/Miscellaneous"}
                local={(t) => local.setACTName = t}
                init={local.root_ACTName}
                lang={local.language}
            />
            <div className='horizontalLine flex-center' style={{ backgroundColor: 'gray' }}></div>
            <SettingNumberInput
                ja_main={"PvEレイアウト時の最大表示数"}
                ja_sub={"最大何人分表示するかを指定します"}
                en_main={"Overlay layout type in FL"}
                en_sub={"Specify the maximum number of people to display"}
                local={(v) => local.setPvEMax = v}
                min={1}
                init={local.pveMax}
                lang={local.language}
            />
            <SettingNumberInput
                ja_main={"PvEでのレイアウト"}
                ja_sub={"mode_1 / mode_2"}
                en_main={"Overlay layout type in PvE"}
                en_sub={"mode_1 / mode_2"}
                local={(v) => local.setPvE_Layout = v}
                init={local.pve_Layout}
                min={1}
                max={2}
                lang={local.language}
            />
            <SettingToggleInput
                ja_main={"PvEでの合計DPSの表示"}
                ja_sub={"消すことでスペースを節約できます"}
                en_main={"Displaying Total DPS in PvE"}
                en_sub={"Save space by turning off"}
                local={(v) => local.setPvE_TeamView = v}
                uID={"pve_TeamView"}
                init={local.pve_TeamView}
                lang={local.language}
            />
            <div className='horizontalLine flex-center' style={{ backgroundColor: 'gray' }}></div>
            <SettingToggleInput
                ja_main={"チームの合計表示のアイコン表示"}
                ja_sub={"消すことでスペースを節約できます"}
                en_main={"Icon display for team total display"}
                en_sub={"Save space by turning off"}
                local={(v) => local.setTeamSymbol = v}
                uID={"teamSymbol"}
                init={local.teamSymbol}
                lang={local.language}
            />
            <SettingNumberInput
                ja_main={"オーバーレイの拡大縮小"}
                ja_sub={"リロードが必要"} a
                en_main={"Scaling the overlay"}
                en_sub={"reload required"}
                local={(v) => local.setRootFontSize = v}
                max={32}
                min={10}
                init={local.rootFontSize}
                lang={local.language}
            />
            <div className='horizontalLine flex-center' style={{ backgroundColor: 'gray' }}></div>
            <SettingToggleInput
                ja_main={"アライアンスの表示"}
                ja_sub={"Aアライアンス, Bアライアンス..."}
                en_main={"Display of alliance affiliation"}
                en_sub={"Something like A alliance or B alliance."}
                local={(v) => local.setalliance_event = v}
                uID={"alliance_event"}
                init={local.alliance_event}
                lang={local.language}
            />
            <SettingTextInput
                ja_main={"Logs Client_ID（V2）"}
                ja_sub={"LogsでClient IDを取得し入力"}
                en_main={"Logs Client ID (V2)"}
                en_sub={"Obtain and enter the Client ID in the logs"}
                local={(t) => local.setLogsClientID = t}
                init={local.logsClientID}
                lang={local.language}
            />
            <SettingTextInput
                ja_main={"Logs Secret_ID（V2）"}
                ja_sub={"LogsでSecret IDを取得し入力"}
                en_main={"Logs Secret ID (V2)"}
                en_sub={"Obtain and enter the Secret ID in the logs"}
                local={(t) => local.setLogsSecretID = t}
                init={local.logsSecretID}
                lang={local.language}
            />
            <SettingNumberInput
                ja_main={"logsの基準とするMetric"}
                ja_sub={"1=rdps, 2=adps, 3=ndps, 4=cdps"} a
                en_main={"Metric to be used as the basis for logs"}
                en_sub={"1=rdps, 2=adps, 3=ndps, 4=cdps"}
                local={(v) => local.setLogsMetric = v}
                max={4}
                min={1}
                init={local.logsMetric}
                lang={local.language}
            />
            <div className='horizontalLine flex-center' style={{ backgroundColor: 'gray' }}></div>
            <SettingToggleInput
                ja_main={"DevelopMode"}
                ja_sub={""}
                en_main={"DevelopMode"}
                en_sub={"secret"}
                local={(v) => local.setAddInMode = v}
                uID={"devMode"}
                init={local.AddInMode}
                lang={local.language}
            />
        </div>
    )
}
const FLSettingPage = () => {
    return (
        <div>
            <SettingNumberInput
                ja_main={"FLでのレイアウト"}
                ja_sub={"mode_1 / mode_2"}
                en_main={"Overlay layout type in FL"}
                en_sub={"mode_1 / mode_2"}
                local={(v) => local.setFL_Layout = v}
                init={local.fl_layout}
                min={1}
                max={2}
                lang={local.language}
            />
            <SettingToggleInput
                ja_main={"味方チームデータの合計を表示"}
                ja_sub={"味方チームのDPSやキル数の合計を上部に表示します"}
                en_main={"Displays ally team data totals"}
                en_sub={"Displays the total DPS and kills of the ally team at the top"}
                local={(v) => local.setFL_AllyData = v}
                uID={"fl-allyData"}
                init={local.fl_allyData}
                lang={local.language}
            />
            <SettingNumberInput
                ja_main={"味方の表示行数"}
                ja_sub={"最大何人分表示するかを指定します"}
                en_main={"Number of rows displayed by ally"}
                en_sub={"Specify the maximum number of people to display"}
                local={(v) => local.setFL_AllyMax = v}
                min={0}
                init={local.fl_allyMax}
                lang={local.language}
            />
            <SettingToggleInput
                ja_main={"敵チームデータの合計を表示"}
                ja_sub={"敵チームのDPSやキル数の合計を上部に表示します"}
                en_main={"Displays enemy team data totals"}
                en_sub={"Displays the total DPS and kills of the enemy team at the top"}
                local={(v) => local.setFL_EnemyData = v}
                uID={"fl-enemyData"}
                init={local.fl_enemyData}
                lang={local.language}
            />
            <SettingNumberInput
                ja_main={"敵の表示行数"}
                ja_sub={"敵何人分表示するかを指定します"}
                en_main={"Number of rows displayed by enemy"}
                en_sub={"Specify the maximum number of people to display"}
                local={(v) => local.setFL_EnemyMax = v}
                min={0}
                init={local.fl_enemyMax}
                lang={local.language}
            />
            <SettingToggleInput
                ja_main={"味方のリザルトページでの表示"}
                ja_sub={"リザルト後に表示行数を無視して表示します"}
                en_main={"Display of ally's result page"}
                en_sub={"Ignore the number of lines displayed after the result"}
                local={(v) => local.setFL_ResultAllAlly = v}
                uID={"fl-resultAllAlly"}
                init={local.fl_resultAllAlly}
                lang={local.language}
            />
            <SettingToggleInput
                ja_main={"敵のリザルトページでの表示"}
                ja_sub={"リザルト後に表示行数を無視して表示します"}
                en_main={"Display of enemy's result page"}
                en_sub={"Ignore the number of lines displayed after the result"}
                local={(v) => local.setFL_ResultAllEnemy = v}
                uID={"fl-resultAllEnemy"}
                init={local.fl_resultAllEnemy}
                lang={local.language}
            />
            <SettingToggleInput
                ja_main={"[me]プレイヤーの追加表示"}
                ja_sub={"追加の表示スペースを最初から表示します"}
                en_main={"[me] Additional player display"}
                en_sub={"Additional display space is shown from the beginning"}
                local={(v) => local.setFL_AdvancedOverlay_me = v}
                uID={"fl-AdvancedOverlayMe"}
                init={local.fl_advancedOverlay_me}
                lang={local.language}
            />
            <SettingToggleInput
                ja_main={"[Party]プレイヤーの追加表示"}
                ja_sub={"追加の表示スペースを最初から表示します"}
                en_main={"[Party] Additional player display"}
                en_sub={"Additional display space is shown from the beginning"}
                local={(v) => local.setFL_AdvancedOverlay_party = v}
                uID={"fl-AdvancedOverlayParty"}
                init={local.fl_advancedOverlay_party}
                lang={local.language}
            />
            <SettingToggleInput
                ja_main={"[Alliance]プレイヤーの追加表示"}
                ja_sub={"追加の表示スペースを最初から表示します"}
                en_main={"[Alliance] Additional player display"}
                en_sub={"Additional display space is shown from the beginning"}
                local={(v) => local.setFL_AdvancedOverlay_ally = v}
                uID={"fl-AdvancedOverlayAlliance"}
                init={local.fl_advancedOverlay_ally}
                lang={local.language}
            />
            <SettingToggleInput
                ja_main={"[Enemy]プレイヤーの追加表示"}
                ja_sub={"追加の表示スペースを最初から表示します"}
                en_main={"[Enemy] Additional player display"}
                en_sub={"Additional display space is shown from the beginning"}
                local={(v) => local.setFL_AdvancedOverlay_enemy = v}
                uID={"fl-AdvancedOverlayEnemy"}
                init={local.fl_advancedOverlay_enemy}
                lang={local.language}
            />
            <SettingToggleInput
                ja_main={"追加スペースのポーション数表示"}
                ja_sub={"オフにすることでスペースを確保できます"}
                en_main={"Added potion count display"}
                en_sub={"can save space by turning it off"}
                local={(v) => local.setFL_AdvancedOverlay_slim = v}
                uID={"fl-AdvancedOverlaySlim"}
                init={local.fl_advancedOverlay_slim}
                lang={local.language}
            />
        </div>
    )
}
const RWSettingPage = () => {
    return (
        <div>
            <SettingNumberInput
                ja_main={"RWでのレイアウト"}
                ja_sub={"mode_1 / mode_2"}
                en_main={"Overlay layout type in RW"}
                en_sub={"mode_1 / mode_2"}
                local={(v) => local.setRW_Layout = v}
                init={local.rw_layout}
                min={1}
                max={2}
                lang={local.language}
            />
            <SettingToggleInput
                ja_main={"味方チームデータの合計を表示"}
                ja_sub={"味方チームのDPSやキル数の合計を上部に表示します"}
                en_main={"Displays ally team data totals"}
                en_sub={"Displays the total DPS and kills of the ally team at the top"}
                local={(v) => local.setRW_AllyData = v}
                uID={"rw-allyData"}
                init={local.rw_allyData}
                lang={local.language}
            />
            <SettingNumberInput
                ja_main={"味方の表示行数"}
                ja_sub={"最大何人分表示するかを指定します"}
                en_main={"Number of rows displayed by ally"}
                en_sub={"Specify the maximum number of people to display"}
                local={(v) => local.setRW_AllyMax = v}
                min={0}
                init={local.rw_allyMax}
                lang={local.language}
            />
            <SettingToggleInput
                ja_main={"敵チームデータの合計を表示"}
                ja_sub={"敵チームのDPSやキル数の合計を上部に表示します"}
                en_main={"Displays enemy team data totals"}
                en_sub={"Displays the total DPS and kills of the enemy team at the top"}
                local={(v) => local.setRW_EnemyData = v}
                uID={"rw-enemyData"}
                init={local.rw_enemyData}
                lang={local.language}
            />
            <SettingNumberInput
                ja_main={"敵の表示行数"}
                ja_sub={"敵何人分表示するかを指定します"}
                en_main={"Number of rows displayed by enemy"}
                en_sub={"Specify the maximum number of people to display"}
                local={(v) => local.setRW_EnemyMax = v}
                min={0}
                init={local.rw_enemyMax}
                lang={local.language}
            />
            <SettingToggleInput
                ja_main={"味方のリザルトページでの表示"}
                ja_sub={"リザルト後に表示行数を無視して表示します"}
                en_main={"Display of ally's result page"}
                en_sub={"Ignore the number of lines displayed after the result"}
                local={(v) => local.setRW_ResultAllAlly = v}
                uID={"rw-resultAllAlly"}
                init={local.rw_resultAllAlly}
                lang={local.language}
            />
            <SettingToggleInput
                ja_main={"敵のリザルトページでの表示"}
                ja_sub={"リザルト後に表示行数を無視して表示します"}
                en_main={"Display of enemy's result page"}
                en_sub={"Ignore the number of lines displayed after the result"}
                local={(v) => local.setRW_ResultAllEnemy = v}
                uID={"rw-resultAllEnemy"}
                init={local.rw_resultAllEnemy}
                lang={local.language}
            />
            <SettingToggleInput
                ja_main={"[me]プレイヤーの追加表示"}
                ja_sub={"追加の表示スペースを最初から表示します"}
                en_main={"[me] Additional player display"}
                en_sub={"Additional display space is shown from the beginning"}
                local={(v) => local.setRW_AdvancedOverlay_me = v}
                uID={"rw-AdvancedOverlayMe"}
                init={local.rw_advancedOverlay_me}
                lang={local.language}
            />
            <SettingToggleInput
                ja_main={"[Party]プレイヤーの追加表示"}
                ja_sub={"追加の表示スペースを最初から表示します"}
                en_main={"[Party] Additional player display"}
                en_sub={"Additional display space is shown from the beginning"}
                local={(v) => local.setRW_AdvancedOverlay_party = v}
                uID={"rw-AdvancedOverlayParty"}
                init={local.rw_advancedOverlay_party}
                lang={local.language}
            />
            <SettingToggleInput
                ja_main={"[Alliance]プレイヤーの追加表示"}
                ja_sub={"追加の表示スペースを最初から表示します"}
                en_main={"[Alliance] Additional player display"}
                en_sub={"Additional display space is shown from the beginning"}
                local={(v) => local.setRW_AdvancedOverlay_ally = v}
                uID={"rw-AdvancedOverlayAlliance"}
                init={local.rw_advancedOverlay_ally}
                lang={local.language}
            />
            <SettingToggleInput
                ja_main={"[Enemy]プレイヤーの追加表示"}
                ja_sub={"追加の表示スペースを最初から表示します"}
                en_main={"[Enemy] Additional player display"}
                en_sub={"Additional display space is shown from the beginning"}
                local={(v) => local.setRW_AdvancedOverlay_enemy = v}
                uID={"rw-AdvancedOverlayEnemy"}
                init={local.rw_advancedOverlay_enemy}
                lang={local.language}
            />
            <SettingToggleInput
                ja_main={"追加スペースのポーション数表示"}
                ja_sub={"オフにすることでスペースを確保できます"}
                en_main={"Added potion count display"}
                en_sub={"can save space by turning it off"}
                local={(v) => local.setRW_AdvancedOverlay_slim = v}
                uID={"rw-AdvancedOverlaySlim"}
                init={local.rw_advancedOverlay_slim}
                lang={local.language}
            />
            <SettingToggleInput
                ja_main={"テンション20以降のキルサウンド"}
                ja_sub={"テンション20以降のキルにサウンドを再生します"}
                en_main={"Kill sound after Tension 20"}
                en_sub={"Play a sound on kills after Tension 20"}
                local={(v) => local.setRW_killSound = v}
                uID={"rw-killSound"}
                init={local.rw_killSound}
                lang={local.language}
            />
            <SettingNumberInput
                ja_main={"キルサウンドの音量"}
                ja_sub={"再生時の音量を指定します 0-100"}
                en_main={"kill sound volume"}
                en_sub={"Specifies the playback volume 0-100"}
                local={(v) => local.setRW_killSound_Volume = v}
                min={0}
                max={100}
                init={local.rw_killSound_Volume}
                lang={local.language}
            />
            <SettingTextInput
                ja_main={"キル時に再生する音楽"}
                ja_sub={"[Network FIle] キルしたときに再生する音声ファイルを指定します"}
                en_main={"Music to play on kill"}
                en_sub={"[Network FIle] Specifies the audio file to play when killed"}
                local={(t) => local.setRW_killSound_Path = t}
                init={local.rw_killSound_Path}
                lang={local.language}
            />
        </div>
    )
}
const CCSettingPage = () => {
    return (
        <div>
            <SettingNumberInput
                ja_main={"CCでのレイアウト"}
                ja_sub={"mode_1 / mode_2"}
                en_main={"Overlay layout type in CC"}
                en_sub={"mode_1 / mode_2"}
                local={(v) => local.setCC_Layout = v}
                init={local.cc_layout}
                min={1}
                max={2}
                lang={local.language}
            />
            <SettingToggleInput
                ja_main={"味方チームデータの合計を表示"}
                ja_sub={"味方チームのDPSやキル数の合計を上部に表示します"}
                en_main={"Displays ally team data totals"}
                en_sub={"Displays the total DPS and kills of the ally team at the top"}
                local={(v) => local.setCC_AllyData = v}
                uID={"cc-allyData"}
                init={local.cc_allyData}
                lang={local.language}
            />
            <SettingNumberInput
                ja_main={"味方の表示行数"}
                ja_sub={"最大何人分表示するかを指定します"}
                en_main={"Number of rows displayed by ally"}
                en_sub={"Specify the maximum number of people to display"}
                local={(v) => local.setCC_AllyMax = v}
                min={0}
                init={local.cc_allyMax}
                lang={local.language}
            />
            <SettingToggleInput
                ja_main={"敵チームデータの合計を表示"}
                ja_sub={"敵チームのDPSやキル数の合計を上部に表示します"}
                en_main={"Displays enemy team data totals"}
                en_sub={"Displays the total DPS and kills of the enemy team at the top"}
                local={(v) => local.setCC_EnemyData = v}
                uID={"cc-enemyData"}
                init={local.cc_enemyData}
                lang={local.language}
            />
            <SettingNumberInput
                ja_main={"敵の表示行数"}
                ja_sub={"敵何人分表示するかを指定します"}
                en_main={"Number of rows displayed by enemy"}
                en_sub={"Specify the maximum number of people to display"}
                local={(v) => local.setCC_EnemyMax = v}
                min={0}
                init={local.cc_enemyMax}
                lang={local.language}
            />
            <SettingToggleInput
                ja_main={"味方のリザルトページでの表示"}
                ja_sub={"リザルト後に表示行数を無視して表示します"}
                en_main={"Display of ally's result page"}
                en_sub={"Ignore the number of lines displayed after the result"}
                local={(v) => local.setCC_ResultAllAlly = v}
                uID={"cc-resultAllAlly"}
                init={local.cc_resultAllAlly}
                lang={local.language}
            />
            <SettingToggleInput
                ja_main={"敵のリザルトページでの表示"}
                ja_sub={"リザルト後に表示行数を無視して表示します"}
                en_main={"Display of enemy's result page"}
                en_sub={"Ignore the number of lines displayed after the result"}
                local={(v) => local.setCC_ResultAllEnemy = v}
                uID={"cc-resultAllEnemy"}
                init={local.cc_resultAllEnemy}
                lang={local.language}
            />
            <SettingToggleInput
                ja_main={"[me]プレイヤーの追加表示"}
                ja_sub={"追加の表示スペースを最初から表示します"}
                en_main={"[me] Additional player display"}
                en_sub={"Additional display space is shown from the beginning"}
                local={(v) => local.setCC_AdvancedOverlay_me = v}
                uID={"cc-AdvancedOverlayMe"}
                init={local.cc_advancedOverlay_me}
                lang={local.language}
            />
            <SettingToggleInput
                ja_main={"[Party]プレイヤーの追加表示"}
                ja_sub={"追加の表示スペースを最初から表示します"}
                en_main={"[Party] Additional player display"}
                en_sub={"Additional display space is shown from the beginning"}
                local={(v) => local.setCC_AdvancedOverlay_party = v}
                uID={"cc-AdvancedOverlayParty"}
                init={local.cc_advancedOverlay_party}
                lang={local.language}
            />
            <SettingToggleInput
                ja_main={"[Alliance]プレイヤーの追加表示"}
                ja_sub={"追加の表示スペースを最初から表示します"}
                en_main={"[Alliance] Additional player display"}
                en_sub={"Additional display space is shown from the beginning"}
                local={(v) => local.setCC_AdvancedOverlay_ally = v}
                uID={"cc-AdvancedOverlayAlliance"}
                init={local.cc_advancedOverlay_ally}
                lang={local.language}
            />
            <SettingToggleInput
                ja_main={"[Enemy]プレイヤーの追加表示"}
                ja_sub={"追加の表示スペースを最初から表示します"}
                en_main={"[Enemy] Additional player display"}
                en_sub={"Additional display space is shown from the beginning"}
                local={(v) => local.setCC_AdvancedOverlay_enemy = v}
                uID={"cc-AdvancedOverlayEnemy"}
                init={local.cc_advancedOverlay_enemy}
                lang={local.language}
            />
            <SettingToggleInput
                ja_main={"追加スペースのポーション数表示"}
                ja_sub={"オフにすることでスペースを確保できます"}
                en_main={"Added potion count display"}
                en_sub={"can save space by turning it off"}
                local={(v) => local.setCC_AdvancedOverlay_slim = v}
                uID={"cc-AdvancedOverlaySlim"}
                init={local.cc_advancedOverlay_slim}
                lang={local.language}
            />
        </div>
    )
}
const ADSettingPage = () => {
    return (
        <div>
            <div className='horizontalLine flex-center' style={{ backgroundColor: 'gray' }}></div>
            <SettingToggleInput
                ja_main={"sampleLogMode"}
                ja_sub={"Debugging"}
                en_main={"sampleLogMode"}
                en_sub={"Debugging"}
                local={(v) => local.setsampleMode = v}
                uID={"a_sampleLogMode"}
                init={local.sampleMode}
                lang={local.language}
            />
            <div className='horizontalLine flex-center' style={{ backgroundColor: 'gray' }}></div>
            <div style={{ padding: "0.5rem", fontSize: "0.7rem", userSelect: "text" }}>https://takoyaki313.github.io/Gorge-Overlay/TargetMP/</div>
            <SettingNumberInput
                ja_main={"MP表示アドインの文字サイズ"}
                ja_sub={"TargetMP"}
                en_main={"MP display add-in font size"}
                en_sub={"TargetMP"}
                local={(v) => local.setaddInFontSize_MP = v}
                max={256}
                min={10}
                init={local.addInFontSize_MP}
                lang={local.language}
            />
            <SettingToggleInput
                ja_main={"残りポーション数"}
                ja_sub={"TargetMP"}
                en_main={"Number of remaining potions"}
                en_sub={"TargetMP"}
                local={(v) => local.setaddInMP_Portion = v}
                uID={"a_addInMP_Portion"}
                init={local.addInMP_Portion}
                lang={local.language}
            />
            <div className='horizontalLine flex-center' style={{ backgroundColor: 'gray' }}></div>
            <div style={{ padding: "0.5rem", fontSize: "0.7rem", userSelect: "text" }}>https://takoyaki313.github.io/Gorge-Overlay/targetName/</div>
            <SettingNumberInput
                ja_main={"ターゲット名アドイン文字サイズ"}
                ja_sub={"targetName"}
                en_main={"Target name add-in font size"}
                en_sub={"targetName"}
                local={(v) => local.setaddInTargetName = v}
                max={256}
                min={6}
                init={local.addInTargetName}
                lang={local.language}
            />
            <div className='horizontalLine flex-center' style={{ backgroundColor: 'gray' }}></div>
            <div style={{ padding: "0.5rem", fontSize: "0.7rem", userSelect: "text" }}>https://takoyaki313.github.io/Gorge-Overlay/IntLB/</div>
            <SettingNumberInput
                ja_main={"LB数値表示アドイン文字サイズ"}
                ja_sub={"IntLB"}
                en_main={"LB numerical display add-in font size"}
                en_sub={"IntLB"}
                local={(v) => local.setaddInIntLB = v}
                max={256}
                min={6}
                init={local.addInIntLB}
                lang={local.language}
            />
            <div className='horizontalLine flex-center' style={{ backgroundColor: 'gray' }}></div>
            <div style={{ padding: "0.5rem", fontSize: "0.7rem", userSelect: "text" }}>https://takoyaki313.github.io/Gorge-Overlay/targetmarker/</div>
            <SettingNumberInput
                ja_main={"マーカーアドインの文字サイズ"}
                ja_sub={"targetmarker"}
                en_main={"Target marker add-in font size"}
                en_sub={"targetmarker"}
                local={(v) => local.setaddInTargetMarker_Size = v}
                max={256}
                min={6}
                init={local.addInTargetMarker_Size}
                lang={local.language}
            />
            <SettingToggleInput
                ja_main={"マーカーアドインの方向"}
                ja_sub={"下から = ON 上から = OFF"}
                en_main={"Marker add-in direction"}
                en_sub={"From bottom = ON From top = OFF"}
                local={(v) => local.setaddInTargetMarker_Reverse = v}
                uID={"a_targetReverse"}
                init={local.addInTargetMarker_Reverse}
                lang={local.language}
            />
            <SettingToggleInput
                ja_main={"マーカーアドインのPvEでの表示"}
                ja_sub={"PvEでもマーカーアドインを表示する"}
                en_main={"Marker Add-in Display in PvE"}
                en_sub={"Display marker add-ins in PvE"}
                local={(v) => local.setaddInTargetMarker_PvE = v}
                uID={"a_targetPvE"}
                init={local.addInTargetMarker_PvE}
                lang={local.language}
            />
            <SettingToggleInput
                ja_main={"マーカーアドインのPvEで0件の場合非表示"}
                ja_sub={"0件の場合は非表示にします"}
                en_main={"Marker Add-in PvE: Hide if 0"}
                en_sub={"If there are 0 items, they will be hidden"}
                local={(v) => local.setaddInTargetMarker_PvEHide = v}
                uID={"a_targetPvEHide"}
                init={local.addInTargetMarker_PvEHide}
                lang={local.language}
            />
            <div className='horizontalLine flex-center' style={{ backgroundColor: 'gray' }}></div>
            <div style={{ padding: "0.5rem", fontSize: "0.7rem", userSelect: "text" }}>https://takoyaki313.github.io/Gorge-Overlay/TargetFrom/</div>
            <SettingNumberInput
                ja_main={"ターゲット人数の文字サイズ"}
                ja_sub={"右下の1.5倍のサイズになります"}
                en_main={"TargetFrom add-in font size"}
                en_sub={"Size is 1.5 times the lower right"}
                local={(v) => local.setaddInTargetFrom_Size = v}
                max={256}
                min={8}
                init={local.addInTargetFrom_Size}
                lang={local.language}
            />
            <SettingNumberInput
                ja_main={"ターゲット人数の文字サイズ(左下）"}
                ja_sub={"隠すときは0を指定してください"}
                en_main={"TargetFrom add-in font size(Bottom left)"}
                en_sub={"Hide by specifying 0"}
                local={(v) => local.setaddInTargetFrom_Size2 = v}
                max={256}
                min={0}
                init={local.addInTargetFrom_Size2}
                lang={local.language}
            />
            <SettingNumberInput
                ja_main={"更新レート(ms)"}
                ja_sub={""}
                en_main={"Update rate (ms)"}
                en_sub={""}
                local={(v) => local.setad_tf_updateMS = v}
                max={3000}
                min={100}
                init={local.ad_tf_updateMS}
                lang={local.language}
            />
            <SettingTextInput
                ja_main={"閾値に達した時のサウンド"}
                ja_sub={"[Network FIle] 指定した閾値に達すると再生します"}
                en_main={"Sound when threshold is reached"}
                en_sub={"[Network FIle] Plays when the specified threshold is reached"}
                local={(t) => local.setad_tf_sound_Path = t}
                init={local.ad_tf_sound_Path}
                lang={local.language}
            />
            <SettingNumberInput
                ja_main={"閾値サウンド音量(0-100)"}
                ja_sub={""}
                en_main={"Threshold sound volume (0-100)"}
                en_sub={""}
                local={(v) => local.setad_tf_Volume = v}
                max={100}
                min={0}
                init={local.ad_tf_Volume}
                lang={local.language}
            />
            <SettingTextInput
                ja_main={"閾値に達した時のサウンド(急増)"}
                ja_sub={"[Network FIle] 指定した閾値に達すると再生します"}
                en_main={"Sound when threshold is reached(Rapid increase)"}
                en_sub={"[Network FIle] Plays when the specified threshold is reached"}
                local={(t) => local.setad_tf_sound_Path2 = t}
                init={local.ad_tf_sound_Path2}
                lang={local.language}
            />
            <SettingNumberInput
                ja_main={"閾値サウンド音量(0-100)"}
                ja_sub={""}
                en_main={"Threshold sound volume (0-100)"}
                en_sub={""}
                local={(v) => local.setad_tf_Volume2 = v}
                max={100}
                min={0}
                init={local.ad_tf_Volume2}
                lang={local.language}
            />
            <SettingNumberInput
                ja_main={"急増判定値"}
                ja_sub={"10回の平均からの差"}
                en_main={"Rapid increase determination value"}
                en_sub={"Difference from the average of 10 times"}
                local={(v) => local.setad_tf_inc_num = v}
                max={100}
                min={0}
                init={local.ad_tf_inc_num}
                lang={local.language}
            />
            <SettingNumberInput
                ja_main={"警告サウンド再生基準値(RW)"}
                ja_sub={"Reset when it reaches 0"}
                en_main={"Warning playback reference value(RW)"}
                en_sub={"Reset when it reaches 0"}
                local={(v) => local.setad_tf_rw_num = v}
                max={100}
                min={0}
                init={local.ad_tf_rw_num}
                lang={local.language}
            />
            <SettingNumberInput
                ja_main={"警告サウンド再生基準値(CC)"}
                ja_sub={"Reset when it reaches 0"}
                en_main={"Warning playback reference value(CC)"}
                en_sub={"Reset when it reaches 0"}
                local={(v) => local.setad_tf_cc_num = v}
                max={100}
                min={0}
                init={local.ad_tf_cc_num}
                lang={local.language}
            />
            <SettingNumberInput
                ja_main={"警告サウンド再生基準値(FL)"}
                ja_sub={"Reset when it reaches 0"}
                en_main={"Warning playback reference value(FL)"}
                en_sub={"Reset when it reaches 0"}
                local={(v) => local.setad_tf_fl_num = v}
                max={100}
                min={0}
                init={local.ad_tf_fl_num}
                lang={local.language}
            />
        </div>

    )
}

const SettingToggleInput = (prop) => {
    let text = { main: "", sub: "" };
    const [inputToggle, setToggle] = useState(prop.init);
    const updateCheck = (e) => {
        setToggle(e.target.checked);
        prop.local(e.target.checked);
    }
    if (prop.lang === 'Japanese') {
        text.main = prop.ja_main;
        text.sub = prop.ja_sub;
    } else {
        text.main = prop.en_main;
        text.sub = prop.en_sub;
    }
    return (
        <div className="setting-Toggle">
            <label htmlFor={"Setting-Toggle-" + prop.uID} style={{ marginBottom: "0.5rem" }}>{text.main}</label>
            <span style={{ gridRow: "1/3", gridColumn: "2/3" }}>
                <input id={"Setting-Toggle-" + prop.uID} type="checkbox" onChange={updateCheck} checked={inputToggle} />
                <label className="Setting-ToggleLabel" htmlFor={"Setting-Toggle-" + prop.uID}></label>
            </span>

            <label htmlFor={"Setting-Toggle-" + prop.uID} style={{ fontSize: "0.6rem" }}>{text.sub}</label>
        </div>
    )
}
/*
const SettingSelectInput = (prop) => {
    let text = { main: "", sub: "" };
    const [inputText, setText] = useState(prop.init);
    const updateCheck = (e) => {
        setText(e.target.value);
        prop.local(e.target.value);
    }
    if (prop.lang === 'Japanese') {
        text.main = prop.ja_main;
        text.sub = prop.ja_sub;
    } else {
        text.main = prop.en_main;
        text.sub = prop.en_sub;
    }
    return (
        <div className="setting-Text">
            <span style={{ marginBottom: "0.5rem" }}>{text.main}</span>
            <span style={{ fontSize: "0.6rem" }}>{text.sub}</span>
            <select value={inputText} onChange={(e) => updateCheck(e)}>
                {prop.pulldown.map((item) => {
                    return (
                        <option key={"Setting_P_" + item} value={item}>{item}</option>
                    )
                })}
            </select>
        </div>
    )
}
*/
const SettingTextInput = (prop) => {
    let text = { main: "", sub: "" };
    const [inputText, setText] = useState(prop.init);
    const updateCheck = (e) => {
        setText(e.target.value);
        prop.local(e.target.value);
    }
    if (prop.lang === 'Japanese') {
        text.main = prop.ja_main;
        text.sub = prop.ja_sub;
    } else {
        text.main = prop.en_main;
        text.sub = prop.en_sub;
    }
    return (
        <div className="setting-Text">
            <span style={{ marginBottom: "0.5rem" }}>{text.main}</span>
            <span style={{ fontSize: "0.6rem" }}>{text.sub}</span>
            <input type='text' value={inputText} onChange={(e) => updateCheck(e)}></input>
        </div>
    )
}

const SettingNumberInput = (prop) => {
    let text = { main: "", sub: "" };
    const [inputNum, setVal] = useState(prop.init);
    const updateCheck = (e) => {
        setVal(e.target.value);
        prop.local(Number(e.target.value));
    }
    if (prop.lang === 'Japanese') {
        text.main = prop.ja_main;
        text.sub = prop.ja_sub;
    } else {
        text.main = prop.en_main;
        text.sub = prop.en_sub;
    }
    let min = "";
    if (typeof (prop.min) === "number") {
        min = prop.min;
    }
    let max = "";
    if (typeof (prop.max) === "number") {
        max = prop.max;
    }
    return (
        <div className="setting-Number">
            <span>{text.main}</span>
            <input type='number' style={{ gridRow: "1/3", gridColumn: "2/3" }} min={min} max={max} value={inputNum} onChange={(e) => updateCheck(e)}></input>
            <span style={{ gridColumn: "1/2", fontSize: "0.6rem" }}>{text.sub}</span>
        </div>
    )
}