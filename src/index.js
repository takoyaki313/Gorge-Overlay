import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { DefaultView } from './OverlayMain.js';
import { loglineQuene_Push , calcClock} from './v4/LogLine/loglineClock.js'
import { Area } from './v4/Area/ChangeZone.js'
import { maindata } from './v4/maindataFormat.js';
import { battle_event } from './v4/LogLine/loglineGrobal.js';
import { partyChangeEvent } from './party';

//import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
const CalcInterval = 1000; // ms
window.devMode = {
  webSocket: false,
  logLevel: 0,
  logForceOff: false,
  sampleType: -1,
};
window.Area = new Area();
window.TBD = new maindata();
window.PRIMARY_PLAYER = {nameID:'',name:'',ACT_name:'YOU'};
window.BATTLE_EVENT = new battle_event();
window.OWNER_LIST = [];

window.AllianceMember = [];

export const rootRender = (data) => {
  if (Object.keys(data).length === 0) {
    data.Encounter = { CurrentZoneName: 'Unknown Area', DURATION: '0' };
    data.Combatant = {};
    console.warn('DefaltValue');
  }
  root.render(
    <React.StrictMode>
      <DefaultView CombatData={data} />
    </React.StrictMode>
  );
}
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();

//OverlayPlugin API 
if (window.devMode.webSocket) {//DevMode ACT WebSocket Required Auto Redirect
  if (!window.location.href.includes('OVERLAY_WS')) {
    window.location.href = '?OVERLAY_WS=ws://127.0.0.1:10501/ws&HOST_PORT=ws://127.0.0.1/fake/';
  }
}

window.addOverlayListener('LogLine', (logline) => {
  if (!window.devMode.logForceOff) {
    loglineQuene_Push(logline.line);
  }
});

window.addOverlayListener('ChangeZone', (zone) => window.Area.areaset_Override= zone.zoneID);
window.addOverlayListener('CombatData', (data) => window.EncounterState(data));
window.addOverlayListener("ChangePrimaryPlayer", (player) => {
  window.PRIMARY_PLAYER.nameID = player.charID.toString(16).toUpperCase();
    window.PRIMARY_PLAYER.name = player.charName;
    loglineQuene_Push(['101', null, window.PRIMARY_PLAYER.nameID, window.PRIMARY_PLAYER.name]);
});
window.addOverlayListener('EnmityTargetData', (data) => {
  //console.log(data);
});
window.addOverlayListener('PartyChanged', (p) => partyChangeEvent(p.party));
window.startOverlayEvents();

//////////////////////////////////
setInterval(calcClock, CalcInterval);

rootRender({});
