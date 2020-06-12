import * as functions from 'firebase-functions';
import { updateIndex, removeIndex } from './algolia';

export const updateArticleMeta = functions.firestore
  .document('articles/{articleId}')
  .onUpdate(async (change, context) => {
    const newData = change.after.data();

    if (!newData) {
      throw new Error('データが存在しません');
    }

    return updateIndex(newData);
  });

export const deleteArticle = functions.firestore
  .document('articles/{articleId}')
  .onDelete(async (snapshot, context) => {
    return removeIndex(context.params.articleId);
  });
