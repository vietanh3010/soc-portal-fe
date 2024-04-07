import useEsClient from "@/http/useEs.client";
import { EsResponse, RequestItem } from "@/types/response.type";
import { MetricForm } from "@/types/types";
import { RequestBody } from "@elastic/elasticsearch/lib/Transport";

type ResultMetricService = {
    getAllData: (payload: MetricForm[]) => Promise<EsResponse<RequestItem>>,
    aggData: (payload: MetricForm[]) => Promise<EsResponse<RequestItem>>,
}
const useMetricService = (): ResultMetricService => {
    const esClient = useEsClient();

    const getAllData = (payload: MetricForm[]): Promise<EsResponse<RequestItem>> => {
        console.log(payload)
        const body: RequestBody = {
            "query": {
                "match_all": {}
            }
        }
        return esClient.post(
            `/_search?pretty&size=100`,
            body,
        )
    }

    const aggData = (payload: MetricForm[]): Promise<EsResponse<RequestItem>> => {
        console.log(payload)
        const FIELD_NAME = "value";
        const aggDataBody = payload.reduce((p, c) => ({
            ...p,
            [`${c.metric}_${FIELD_NAME}`]: {
                [c.metric]: { field: FIELD_NAME }
            }
        }), {})
        const body: RequestBody = {
            "size": 0,
            "aggs": {
                "timestamp": {
                    "terms": {
                        "field": "timestamp",
                        "size": 100,
                        "order": { "_key": "asc" }
                    },
                    "aggs": aggDataBody
                }
            }
        }
        return esClient.post(
            `/_search?pretty`,
            body,
        )
    }

    return {
        getAllData,
        aggData,
    }
}

export default useMetricService;