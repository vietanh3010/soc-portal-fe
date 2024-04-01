import {
    ErrorBoundary,
    Facet, Paging, PagingInfo, Results, ResultsPerPage, SearchBox, SearchProvider, Sorting, WithSearch
} from "@elastic/react-search-ui";
import {
    Layout
} from "@elastic/react-search-ui-views";
import "@elastic/react-search-ui-views/lib/styles/styles.css";
import { SearchDriverOptions } from "@elastic/search-ui";
import AppSearchAPIConnector from "@elastic/search-ui-app-search-connector";
import React, { memo, useEffect } from "react";
import Client from '@elastic/search-application-client'

function getConfig(): any {
    return {
        "resultFields": [
            "additional_urls",
            "body_content",
            "domains",
            "headings",
            "last_crawled_at",
            "links",
            "meta_description",
            "meta_keywords",
            "title",
            "url",
            "url_host",
            "url_path",
            "url_path_dir1",
            "url_path_dir2",
            "url_path_dir3",
            "url_port",
            "url_scheme",
            "id"
          ],
        "sortFields": [
    
        ],
        "facets": [
    
        ],
        "titleField": "title",
        "urlField": "url"
    }
}

function buildFacetConfigFromConfig() {
    const config = getConfig();
  
    const facets = (config.facets || []).reduce((acc, n) => {
      acc = acc || {};
      acc[n] = {
        type: "value",
        size: 100
      };
      return acc;
    }, undefined);
  
    return facets;
  }

  function buildSearchOptionsFromConfig() {
    const config = getConfig();
    const searchFields = (config.searchFields || config.fields || []).reduce(
      (acc, n) => {
        acc = acc || {};
        acc[n] = {};
        return acc;
      },
      undefined
    );
  
    const resultFields = (config.resultFields || config.fields || []).reduce(
      (acc, n) => {
        acc = acc || {};
        acc[n] = {
          raw: {},
          snippet: {
            size: 100,
            fallback: true
          }
        };
        return acc;
      },
      undefined
    );
  
    // We can't use url, thumbnail, or title fields unless they're actually
    // in the reuslts.
    if (config.urlField) {
      resultFields[config.urlField] = {
        raw: {},
        snippet: {
          size: 100,
          fallback: true
        }
      };
    }
  
    if (config.thumbnailField) {
      resultFields[config.thumbnailField] = {
        raw: {},
        snippet: {
          size: 100,
          fallback: true
        }
      };
    }
  
    if (config.titleField) {
      resultFields[config.titleField] = {
        raw: {},
        snippet: {
          size: 100,
          fallback: true
        }
      };
    }
  
    const searchOptions = {};
    searchOptions.result_fields = resultFields;
    searchOptions.search_fields = searchFields;
    return searchOptions;
  }

  function buildAutocompleteQueryConfig() {
    const querySuggestFields = getConfig().querySuggestFields;
    if (
      !querySuggestFields ||
      !Array.isArray(querySuggestFields) ||
      querySuggestFields.length === 0
    ) {
      return {};
    }
  
    return {
      suggestions: {
        types: {
          documents: {
            fields: getConfig().querySuggestFields
          }
        }
      }
    };
  }
const connector = new AppSearchAPIConnector({
    searchKey: "search-koi766xvr7xupep6mqyxbgdq",
    engineName: "test-es",
    endpointBase: "https://soc-cmc.ent.asia-southeast1.gcp.elastic-cloud.com",
    
  });

  const config = {
    searchQuery: {
      facets: buildFacetConfigFromConfig(),
      ...buildSearchOptionsFromConfig()
    },
    autocompleteQuery: buildAutocompleteQueryConfig(),
    apiConnector: connector,
    alwaysSearchOnInitialLoad: true
  };
  
  function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function buildSortOptionsFromConfig() {
    const config = getConfig();
    return [
      {
        name: "Relevance",
        value: "",
        direction: ""
      },
      ...(config.sortFields || []).reduce<any>((acc, sortField) => {
        acc.push({
          name: `${capitalizeFirstLetter(sortField)} ASC`,
          value: sortField,
          direction: "asc"
        });
        acc.push({
          name: `${capitalizeFirstLetter(sortField)} DESC`,
          value: sortField,
          direction: "desc"
        });
        return acc;
      }, [])
    ];
  }
  function getFacetFields() {
    return getConfig().facets || [];
  }

  // test

//   const request = Client(
//     "test-es",
//     "https://soc-cmc.ent.asia-southeast1.gcp.elastic-cloud.com",
//     "search-koi766xvr7xupep6mqyxbgdq",
//   )
const EsHome = (): JSX.Element => {
    

    // useEffect(() => {
    //     async function test() {
    //         const results = await request()
    //             .query('cloud')
    //             .addParameter('domains', 'headings')
    //             .search()

    //         console.log({results})
    //     }
    //     test();
    // }, [])
   

    return (
        <SearchProvider config={config}>
      <WithSearch mapContextToProps={({ wasSearched }) => ({ wasSearched })}>
        {({ wasSearched }) => {
          return (
            <div className="App">
              <ErrorBoundary>
                <Layout
                  header={<SearchBox autocompleteSuggestions={true} />}
                  sideContent={
                    <div>
                      {wasSearched && (
                        <Sorting
                          label={"Sort by"}
                          sortOptions={buildSortOptionsFromConfig()}
                        />
                      )}
                      {getFacetFields().map(field => (
                        <Facet key={field} field={field} label={field} />
                      ))}
                    </div>
                  }
                  bodyContent={
                    <Results
                      titleField={getConfig().titleField}
                      urlField={getConfig().urlField}
                      thumbnailField={getConfig().thumbnailField}
                      shouldTrackClickThrough={true}
                    />
                  }
                  bodyHeader={
                    <React.Fragment>
                      {wasSearched && <PagingInfo />}
                      {wasSearched && <ResultsPerPage />}
                    </React.Fragment>
                  }
                  bodyFooter={<Paging />}
                />
              </ErrorBoundary>
            </div>
          );
        }}
      </WithSearch>
    </SearchProvider>
      )
}

export default memo(EsHome)