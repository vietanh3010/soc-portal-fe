import { AppConfig } from "@/common/AppConfig";
import useEsClient from "@/http/useEs.client";

type ResultMetricService = {
    getData: (payload: any) => Promise<any>
}
const useMetricService = (): ResultMetricService => {
    const esClient = useEsClient();

    const getData = (payload: any) => {
        return esClient.post(
            `${AppConfig.ES.ES_ENDPOINT_BASE}/api/as/v1/engines/${AppConfig.ES.ES_ENGINE_NAME}/search.json`,
            payload,
            {
                "Authorization": `Bearer ${AppConfig.ES.ES_SEARCH_KEY}`
            }
        )
    }

    return {
        getData
    }
}

export default useMetricService;