

export type EsResponse<T = any> = {
    took: number;
    hits: {
        total: {
            value: number;
            relation: string;
        };
        hits: Array<{
            _source: T;
        }>;
    },
    aggregations?: EsResponseAggregation,
}

export type EsResponseAggregation = {
    [key: string]: {
        key: string | number,
        doc_count: number,
        buckets: Array<EsResponseAggregation>,

    } & {
        [key: string]: {
            value: number
        }
    }
}


export type RequestItem = {
    description: string;
    value: number,
    timestamp: number;
}