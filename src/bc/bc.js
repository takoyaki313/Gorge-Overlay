const bc_name = 'Gorge-Overlay-4';

export const G_bc = new BroadcastChannel(bc_name);

export const bc_send = (type, data) =>{
    G_bc.postMessage({ type: type, data: data });
}
