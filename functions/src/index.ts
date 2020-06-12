import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
export * from './article.function';

export { addRecord } from './algolia';
export { removeIndex } from './algolia';
export { updateIndex } from './algolia';

admin.initializeApp();
const db = admin.firestore();

export const createUser = functions.auth.user().onCreate((user) => {
  return db.doc(`users/${user.uid}`).set({
    email: user.email,
    userId: user.uid,
    createdAt: new Date(),
  });
});

export const deleteUser = functions.auth.user().onDelete((user) => {
  return db.doc(`users/${user.uid}`).delete();
});
