import { deleteObject, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../../firebase-config';

export const imageService = {
  deleteImage({ type, fileName }) {
    return deleteObject(ref(storage, `${type}/${fileName}`));
  },
  uploadImage({ type, fileName, file }) {
    return uploadBytesResumable(ref(storage, `${type}/${fileName}`), file);
  },
};
