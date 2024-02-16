import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { onSnapshot } from 'firebase/firestore';

import { likeService } from '../../../services/firebaseService/like.firebase.service';
import { postService } from '../../../services/firebaseService/post.firebase.service';
import { useAuth } from '../../../contexts/ProvideAuthContext';
import { useRouter } from '../../../hooks/useRouter';
import { WRITE_MESSAGE } from '../../../constants';

import EditorBox from '../containers/Editor.container';
import WriteContentsPresenter from '../presenters/WriteContents.presenter';

export default function WriteContentsContainer() {
  const { postId, writer } = useParams();
  const { authRouteTo } = useRouter();
  const { currentUser } = useAuth();
  const { userId, nickname } = currentUser();

  const [submitState, setSubmitState] = useState(false);
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
    if (postId) {
      setPostData();
    } else {
      getCreateNewPostId();
    }
  }, []);

  useEffect(() => {
    return () => {
      if (newPostId && !submitState) {
        postService.deletePost({ postId: newPostId });
      }
    };
  }, [newPostId, submitState]);

  const setPostData = async () => {
    try {
      const postQuery = postService.getPostQuery({ postId });
      onSnapshot(postQuery, (snapshot) => {
        if (!snapshot.empty) {
          if (writer !== nickname) {
            authRouteTo(`/`);
            alert(WRITE_MESSAGE.WRITER_ERROR);
            return;
          }
          const { category, title, createDate, content, thumbnail } = snapshot.data();
          setPostForm({
            category: category,
            title: title,
            createDate: createDate,
          });
          setEditorValue(content);
          setThumbnail(thumbnail);
        }
      });
    } catch (error) {
      console.log(error.code);
    }
  };

  const getCreateNewPostId = async () => {
    const response = await postService.savePost({
      userId: '',
      category: '',
      title: '',
      thumbnail: '',
      content: '',
    });
    const postQuery = postService.getPostQuery({ postId: response.id });
    onSnapshot(postQuery, (snapshot) => {
      setNewPostId(snapshot.id);
    });
  };

  const setThumbnailImage = (imgList) => {
    if (imgList.length > 0) {
      setThumbnail(imgList[0]);
    }
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
      setSubmitState(true);
      await postService.updatePost({
        postId: newPostId,
        userId,
        category,
        title,
        thumbnail,
        content: editorValue,
        createDate: Date(),
      });
      await likeService.createLikeDoc({ postId: newPostId });
      if (submitState) {
        authRouteTo(`/`);
        alert(WRITE_MESSAGE.WRITE_SUCCESS_MESSAGE);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (category === '' || title === '') {
      alert(WRITE_MESSAGE.EMPTY_MESSAGE);
      return;
    }
    postId ? await onUpdate() : await onSave();
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
      {(newPostId || postId) && (
        <EditorBox {...{ editorValue, setEditorValue, imageList, setThumbnailImage, newPostId }} />
      )}
    </WriteContentsPresenter>
  );
}
