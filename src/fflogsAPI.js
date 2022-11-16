import { SecretTokenV1 } from "./secret";

export const ffXIVAPI = async (name, server) => {
    //name = Namae%20Konnakanzi
    /*
    let data1 = await fetch('https://www.fflogs.com:443/v1/parses/character/'+name+'/'+ server + '/JP?zone=49&api_key='+SecretTokenV1)
        .then((response) => response.body.getReader())
        .then((reader) => {
            // ReadableStream.read()はPromiseを返す。
            // Promiseは{ done, value }として解決される。
            reader.read().then(({ done, value }) => {
                // データを読み込んだとき：doneはfalse, valueは値。
                // データを読み込み終わったとき：doneはtrue, valueはundefined。
                const decoder = new TextDecoder();
                console.log(decoder.decode(value));
            });
        });
        let data2 = await fetch('https://www.fflogs.com:443/v1/zones?api_key='+SecretTokenV1)
        .then((response) => response.body.getReader())
        .then((reader) => {
            // ReadableStream.read()はPromiseを返す。
            // Promiseは{ done, value }として解決される。
            reader.read().then(({ done, value }) => {
                // データを読み込んだとき：doneはfalse, valueは値。
                // データを読み込み終わったとき：doneはtrue, valueはundefined。
                const decoder = new TextDecoder();
                console.log(decoder.decode(value));
            });
        });*/
}
