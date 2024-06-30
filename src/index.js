import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { DefaultView } from './BattleOverlayLayout/OverlayMain.js';
import { loglineQueue_Push, calcClock } from './v4/LogLine/loglineClock.js'
import { Area } from './v4/Area/ChangeZone.js'
import { battle_event } from './v4/timer/timer_format';
import { partyChangeEvent } from './party';
import { GorgeOverlay_Local, GorgeOverlay_LocalStorage } from './localsetting/local';
import { killSound_Load } from './v4/sound';

import { getDatacenters } from './v4/xivapi/api.js';
//import reportWebVitals from './reportWebVitals';
let readLocalData = localStorage.getItem(GorgeOverlay_LocalStorage);

if (readLocalData === null) {
  readLocalData = "{}";
}

export const devMode = {
  webSocket: true,
  logLevel: 0,
  logForceOff: false,
  sampleGet: false,
  sampleType: -1,//default -1
  calcTime: false,
  forceReset: false,
  sampleReadMode: false
};

export const AreaData = new Area();
export let PRIMARY_PLAYER = { nameID: '', name: '', ACT_name: 'YOU' };
export const local = new GorgeOverlay_Local(JSON.parse(readLocalData));
killSound_Load(false);

const root = ReactDOM.createRoot(document.getElementById('root'));
const CalcInterval = 1000; // ms

export const battleEvent = new battle_event();
window.battleEvent_OBJ = battleEvent;
export const rootRender = (data) => {
  if (Object.keys(data).length === 0) {
    data.Encounter = { CurrentZoneName: 'Unknown Area', DURATION: '0' };
    data.Combatant = {};
  }
  root.render(
    <React.StrictMode>
      <DefaultView CombatData={data} />
    </React.StrictMode>
  );
}

//OverlayPlugin API 
if (devMode.webSocket && devMode.sampleType === -1) {//DevMode ACT WebSocket Required Auto Redirect
  if (!window.location.href.includes('OVERLAY_WS')) {
    window.location.href = '?OVERLAY_WS=ws://127.0.0.1:10501/ws&HOST_PORT=ws://127.0.0.1/fake/';
  }
}

window.addOverlayListener('LogLine', (logline) => {
  if (!devMode.logForceOff) {
    loglineQueue_Push(logline.line);
  }
});

window.addOverlayListener('ChangeMap', (minimap) => {
  if (typeof (window.changeArea_Event) === 'undefined') {
    return null;
  }
  window.changeArea_Event(minimap.placeName.toUpperCase());
  if (AreaData.battleId !== minimap.mapID) {
    AreaData.areaset_changeMap = minimap.mapID;
  }
});
const getLanguage = async () => {
  let language = await window.callOverlayHandler({ call: 'getLanguage' });
  local.setLanguage = language.language;
}

window.addOverlayListener('CombatData', (data) => window.EncounterState(data));
window.addOverlayListener("ChangePrimaryPlayer", (player) => {
  PRIMARY_PLAYER.nameID = player.charID.toString(16).toUpperCase();
  PRIMARY_PLAYER.name = player.charName;
  loglineQueue_Push(['101', null, PRIMARY_PLAYER.nameID, PRIMARY_PLAYER.name]);
});

window.addOverlayListener('PartyChanged', (p) => {
  partyChangeEvent(p.party);
});

//////////////////////////////////
setInterval(calcClock, CalcInterval);
window.onload = async () => {
  rootRender({});
  window.startOverlayEvents();
  getLanguage();
  getDatacenters();
}