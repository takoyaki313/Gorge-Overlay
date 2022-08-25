const BCName = 'GorgeOverlay_BroadCast';
var BC_Channel = null;
var BC_Enable = false;

function connectBC(connect){
  if(connect){
    BC_Channel = new BroadcastChannel(BCName);
  }else {
    BC_Channel.close;
  }
}
function sendBC(type,object){
  BC_Channel.postMessage({type:type,data:object});
}
