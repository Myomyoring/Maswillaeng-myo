import { deleteObject, ref, uploadBytesResumable } from 'firebase/storage';
import { db, storage } from '../../firebase-config';
import { addDoc, collection, deleteDoc, query, where } from 'firebase/firestore';

export const imageService = {
  deleteImage({ type, fileName }) {
    return deleteObject(ref(storage, `${type}/${fileName}`));
  },
  uploadImage({ type, fileName, file }) {
    return uploadBytesResumable(ref(storage, `${type}/${fileName}`), file);
  },
  setImage({ filename, url }) {
    return addDoc(collection(db, 'images'), { filename, url });
  },
  removeImage({ filename }) {
    return deleteDoc(query(collection(db, 'images'), where('filename', '==', filename)));
  },
};
