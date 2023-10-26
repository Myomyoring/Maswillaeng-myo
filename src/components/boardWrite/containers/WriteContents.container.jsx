import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Navi } from '../../common/Navi';
import { useAuth } from '../../../context/ProvideAuthContext';
import { postService } from '../../../services/firebaseService/post.firebase.service';
import WriteContentsPresenter from '../presenters/WriteContents.presenter';

export default function WriteContentsContainer() {
  const { postId, writer } = useParams();
  const { authNavi } = Navi();
  const { currentUser } = useAuth();
  const { id, nickname } = currentUser();

  const [postForm, setPostForm] = useState({
    category: '',
    title: '',
    createDate: '',
  });
  const { category, title } = postForm;
  const [editorValue, setEditorValue] = useState('');
  const [thumbnail, setThumbnail] = useState('');

  useEffect(() => {
    if (!postId) return;
    getPost();
  }, [postId]);

  const getPost = async () => {
    try {
      const response = await postService.getPost({ postId });
      if (response.exists()) {
        if (writer !== nickname) {
          authNavi(`/`);
          alert('작성자가 아닙니다.');
          return;
        }
        const data = response.data();
        setPostForm({
          category: data.category,
          title: data.title,
          createDate: data.createDate,
        });
        setEditorValue(data.content);
        setThumbnail(data.thumbnail);
      }
    } catch (error) {
      console.log(error.code);
    }
  };

  const [imageList] = useState([]);

  const setThumbnailImage = (imgList) => {
    if (imgList.length > 0) {
      setThumbnail(imgList[0]);
    }
  };

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setPostForm({ ...postForm, [name]: value });
    console.log(postForm);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (category === '' || title === '') {
      alert('카테고리 또는 제목을 설정해주세요.');
      return;
    }

    if (postId) {
      try {
        await postService.updatePost({
          postId,
          userId: id,
          title,
          category,
          thumbnail,
          content: editorValue,
          createDate: postForm.createDate,
        });
        authNavi(`/board/${postId}/${writer}`);
        alert('게시글 수정 완료');
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        await postService.savePost({
          userId: id,
          category,
          title,
          thumbnail,
          content: editorValue,
        });
        authNavi(`/`);
        alert('게시글 작성 완료');
      } catch (error) {
        console.log(error.code);
      }
    }
  };
  return (
    <WriteContentsPresenter
      {...{
        handleSubmit,
        handleChange,
        category,
        title,
        editorValue,
        setEditorValue,
        imageList,
        setThumbnailImage,
      }}
    />
  );
}
