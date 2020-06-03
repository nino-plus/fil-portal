import * as functions from 'firebase-functions';
const algoliasearch = require('algoliasearch');

const ALGOLIA_ID = functions.config().algolia.app_id;
const ALGOLIA_ADMIN_KEY = functions.config().algolia.api_key;
const client = algoliasearch(ALGOLIA_ID, ALGOLIA_ADMIN_KEY);
const index = client.initIndex('articles');

export const addRecord = functions
  .region('asia-northeast1')
  .firestore.document('articles/{id}')
  .onCreate((snap, context) => {
    const data = snap.data() as {
      supplier: string;
      name: string;
      composition: string;
      season: string;
      type: string;
      gauges: string[];
      otherFeatures: string[];
      userId: string;
      articleId: string;
    };
    const item = {
      ...data,
      objectID: data.articleId,
    };
    return index.saveObject(item);
  });
