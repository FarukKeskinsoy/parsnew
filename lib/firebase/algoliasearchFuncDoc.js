import { algoliasearch } from "algoliasearch";


const appID = "SBN8HYTHOH";
// API key with `addObject` and `editSettings` ACL
const apiKey = "8441eda8214abd6d0903cf644ee6efdf";
const indexName = "parsindex";
//const indexName = "test-index";


const client = algoliasearch(appID, apiKey);


const searchCollectionsAlgoliaDoc = async (searchTerm) => {
  try {
    const { results } = await client.search({requests:[{indexName,query:searchTerm}]});
console.log(results[0].hits)
    return results[0]?.hits.map(hit => ({
      title: hit.title,
      content: hit.content,
      link: `${hit.route}/${hit.url}-${hit.id}`,
      tag: hit.route,
      image:hit.image
    }));
  } catch (error) {
    console.error('Error searching Algolia:', error);
    return [];
  }
};

export default searchCollectionsAlgoliaDoc;
