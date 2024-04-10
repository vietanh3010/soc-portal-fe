import { AppConfig } from "@/common/AppConfig";
import useEsClient from "@/http/useEs.client";
import { EsResponse, RequestItem } from "@/types/response.type";
import { MetricForm } from "@/types/types";
import { RequestBody } from "@elastic/elasticsearch/lib/Transport";

type ResultMetricService = {
    getAllData: (payload: MetricForm[]) => Promise<EsResponse<RequestItem>>,
    aggData: (payload: MetricForm[]) => Promise<EsResponse<RequestItem>>,
    getFields: () => Promise<string[]>,
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
            AppConfig.ES.SEARCH,
            body,
        )
    }

    const aggData = (payload: MetricForm[]): Promise<EsResponse<RequestItem>> => {
        const aggDataBody = payload.reduce((p, c) => ({
            ...p,
            [`${c.aggregation}:${c.field}`]: {
                [c.aggregation]: { field: c.field }
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
            AppConfig.ES.SEARCH,
            body,
        )
    }

    const getFields = (): Promise<string[]> => {

        return esClient.get(AppConfig.ES.GET_FIELDS);
    }

    return {
        getAllData,
        aggData,
        getFields
    }
}

export default useMetricService;