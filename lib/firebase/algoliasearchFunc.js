import { algoliasearch } from "algoliasearch";


const appID = "SBN8HYTHOH";
// API key with `addObject` and `editSettings` ACL
const apiKey = "8441eda8214abd6d0903cf644ee6efdf";
const indexName = "parsindex";

const client = algoliasearch(appID, apiKey);

const searchCollectionsAlgolia = async (searchTerm) => {
  try {
    const { results } = await client.search({requests:[{indexName:indexName,query:searchTerm}]});
    console.log(JSON.stringify(results));

    return results.map(hit => ({
      title: hit.title,
      content: hit.content,
      link: hit.link,
      tag: hit.tag,
    }));
  } catch (error) {
    console.error('Error searching Algolia:', error);
    return [];
  }
};

export default searchCollectionsAlgolia;
