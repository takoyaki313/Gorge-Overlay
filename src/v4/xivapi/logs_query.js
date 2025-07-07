//https://ja.fflogs.com/v2-api-docs/ff/query.doc.html

export const REGION_SERVERLIST_QUERY = `
query {
  worldData {
    regions {
				name
			  compactName
			  subregions{
					name
					servers(limit:99){
						data{
							name
						}
					}
				}
			}
  }
}
`;

export const PLAYER_PERF_QUERY = `
query ($characterName:String!,$serverName:String!,$regionName:String!,$metric:CharacterRankingMetricType){
  characterData {
		character(name:$characterName,
			serverSlug:$serverName,
			serverRegion:$regionName
		){
			hidden
			name
			lodestoneID
			canonicalID
			zoneRankings (
				metric:$metric
			)
		}
  }
}
`;

/*
export const ZONE_ID_LIST_QUERY = `
query {
  worldData {
    zones {
			name
			id
			encounters{
				id
				name
			}
			frozen
			difficulties{
				id
				name
				sizes
				}
			}
  }
}
`;*/
