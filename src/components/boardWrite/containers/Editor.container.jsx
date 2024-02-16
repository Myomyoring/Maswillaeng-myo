import { useMemo, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { getDownloadURL } from 'firebase/storage';

import { imageService } from '../../../services/firebaseService/image.firebase.service.jsx';
import EditorPresenter from '../presenters/Editor.presenter';

export default function EditorContainer({ editorValue, setEditorValue, imageList, setThumbnailImage, newPostId }) {
  const { postId } = useParams();
  const quillRef = useRef(null);

  const onChange = (quillValue) => {
    setEditorValue(quillValue);
  };

  const imageHandler = async () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.onchange = async () => {
      const file = input.files[0];
      try {
        const uploadTask = await imageService.uploadImage({
          type: 'post_images',
          fileName: `${postId ? postId : newPostId}/${file.name}`,
          file,
        });
        const url = await getDownloadURL(uploadTask.ref);
        imageList.push(url);
        setThumbnailImage(imageList);
        const range = quillRef.current.getEditor().getSelection();
        quillRef.current.getEditor().insertEmbed(range.index, 'image', url);
        input.value = '';
      } catch (error) {
        console.log(error.code);
      }
    };
    input.click();
  };

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          ['bold', 'italic', 'underline', 'strike'],
          ['link'],
          [
            {
              color: [
                '#000000',
                '#e60000',
                '#ff9900',
                '#ffff00',
                '#008a00',
                '#0066cc',
                '#9933ff',
                '#ffffff',
                '#facccc',
                '#ffebcc',
                '#ffffcc',
                '#cce8cc',
                '#cce0f5',
                '#ebd6ff',
                '#bbbbbb',
                '#f06666',
                '#ffc266',
                '#ffff66',
                '#66b966',
                '#66a3e0',
                '#c285ff',
                '#888888',
                '#a10000',
                '#b26b00',
                '#b2b200',
                '#006100',
                '#0047b2',
                '#6b24b2',
                '#444444',
                '#5c0000',
                '#663d00',
                '#666600',
                '#003700',
                '#002966',
                '#3d1466',
                'custom-color',
              ],
            },
          ],
          ['image'],
        ],
        handlers: {
          image: imageHandler,
        },
      },
    }),
    [],
  );
  return <EditorPresenter {...{ modules, quillRef, editorValue, onChange }} />;
}
