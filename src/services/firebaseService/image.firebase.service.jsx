import { deleteObject, ref, uploadBytesResumable } from 'firebase/storage';
import { db, storage } from '../../firebase-config';
import { addDoc, collection, deleteDoc, query, where } from 'firebase/firestore';

export const imageService = {
  deleteImage({ type, filename }) {
    return deleteObject(ref(storage, `${type}/${filename}`));
  },
  uploadImage({ type, filename, file }) {
    return uploadBytesResumable(ref(storage, `${type}/${filename}`), file);
  },
  setImage({ filename, url }) {
    return addDoc(collection(db, 'images'), { filename, url });
  },
  removeImage({ filename }) {
    return deleteDoc(query(collection(db, 'images'), where('filename', '==', filename)));
  },
};
