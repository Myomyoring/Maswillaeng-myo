import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useAuth } from '../../../contexts/ProvideAuthContext';
import { useRouter } from '../../../hooks/useRouter';
import { postService } from '../../../services/firebaseService/post.firebase.service';
import WriteContentsPresenter from '../presenters/WriteContents.presenter';
import { WRITE_MESSAGE } from '../../../constants';

import EditorBox from '../containers/Editor.container';

export default function WriteContentsContainer() {
  const { postId, writer } = useParams();
  const { authRouteTo } = useRouter();
  const { currentUser } = useAuth();
  const { userId, nickname } = currentUser();

  const [newPostId, setNewPostId] = useState(null);
  const [postForm, setPostForm] = useState({
    category: '',
    title: '',
    createDate: '',
  });
  const { category, title } = postForm;
  const [editorValue, setEditorValue] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const imageList = [];
  useEffect(() => {
    if (!postId) return;
    setPostData();
  }, [postId]);

  const getPost = async () => {
    try {
      const response = await postService.getPost({ postId });
      if (response.exists()) {
        if (writer !== nickname) {
          authRouteTo(`/`);
          alert(WRITE_MESSAGE.WRITER_ERROR);
          return;
        }
        const { category, title, createDate, content, thumbnail } = response.data();
        return { category, title, createDate, content, thumbnail };
      }
    } catch (error) {
      console.log(error.code);
    }
  };

  const setPostData = async () => {
    const { category, title, createDate, content, thumbnail } = await getPost();
    setPostForm({
      category: category,
      title: title,
      createDate: createDate,
    });
    setEditorValue(content);
    setThumbnail(thumbnail);
  };

  const setThumbnailImage = (imgList) => {
    if (imgList.length > 0) {
      setThumbnail(imgList[0]);
    }
  };

  const getCreateNewPostId = async () => {
    // submit 동작 없이 url 이동할 경우 정크 데이터 제거해야 함
    const response = await postService.savePost({
      userId: '',
      category: '',
      title: '',
      thumbnail: '',
      content: '',
    });
    return response.id;
  };

  const onChange = (event) => {
    const { name, value } = event.target;
    setPostForm({ ...postForm, [name]: value });
  };

  const onUpdate = async () => {
    try {
      await postService.updatePost({
        postId,
        userId,
        title,
        category,
        thumbnail,
        content: editorValue,
        createDate: postForm.createDate,
      });
      authRouteTo(`/board/${postId}/${writer}`);
      alert(WRITE_MESSAGE.UPDATE_SUCCESS_MESSAGE);
    } catch (error) {
      console.log(error);
    }
  };

  const onSave = async () => {
    try {
      await postService.updatePost({
        postId: newPostId,
        userId,
        category,
        title,
        thumbnail,
        content: editorValue,
        createDate: Date(),
      });
      authRouteTo(`/`);
      alert(WRITE_MESSAGE.WRITE_SUCCESS_MESSAGE);
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (category === '' || title === '') {
      alert(WRITE_MESSAGE.EMPTY_MESSAGE);
      return;
    }
    postId ? onUpdate() : onSave();
  };

  return (
    <WriteContentsPresenter
      {...{
        onSubmit,
        onChange,
        category,
        title,
      }}
    >
      <EditorBox {...{ editorValue, setEditorValue, imageList, setThumbnailImage, setNewPostId, getCreateNewPostId }} />
    </WriteContentsPresenter>
  );
}
