import { PLAYER_PERF_QUERY } from "./logs_query";
import { local } from "../..";

export let logsMode = false;
export async function getAccessToken(clientId, clientSecret) {
    const tokenUrl = 'https://www.fflogs.com/oauth/token';
    const credentials = btoa(`${clientId}:${clientSecret}`);

    try {
        const response = await fetch(tokenUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Basic ${credentials}`
            },
            body: 'grant_type=client_credentials'
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Failed to get access token: ${response.status} - ${errorText}`);
        }

        const data = await response.json();
        logsMode = true;
        return data.access_token;
    } catch (error) {
        console.error('Error getting access token:', error);
        return null;
    }
}

export const getFFLogsAPIv2 = async (accessToken, characterName, serverName, regionName) => {
    if (accessToken) {
        return await getCharacterPerf(accessToken, characterName, serverName, regionName);
    } else {
        console.log('access token not found');
    }
}

async function fetchDataFromFFLogs(accessToken, query, variables = {}) {
    const apiUrl = 'https://www.fflogs.com/api/v2/client';

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify({
                query: query,
                variables: variables
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Failed to fetch data: ${response.status} - ${errorText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data from FF Logs:', error);
        return null;
    }
}

async function getCharacterPerf(accessToken, characterName, serverName, regionName) {

    const variables = {
        characterName: characterName,
        serverName: serverName,
        regionName: regionName,
        metric: local.logsMetricStr
    };

    const data = await fetchDataFromFFLogs(accessToken, PLAYER_PERF_QUERY, variables);

    if (data && data.data && data.data.characterData && data.data.characterData.character) {
        return data
    } else {
        console.log('Character data not found in the response:');
        console.log(JSON.stringify(data, null, 2));
        return null;
    }
}

