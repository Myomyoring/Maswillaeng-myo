import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ButtonBox from './ButtonBox';
import Editor from './Editor';
import TitleBox from './TitleBox';

import { categories } from '../../constants/index';
import { postService } from '../../services/post.service';
import { useAuth } from '../../context/ProvideAuthContext';

export default function WriteContents({ postId }) {
  const navigate = useNavigate();
  const { getUserToken, currentUser } = useAuth();
  const token = getUserToken();
  const { nickname } = currentUser();

  const [postForm, setPostForm] = useState({
    category: '',
    title: '',
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
      if (response.statusText === 'OK') {
        if (response.data.nickname !== nickname) {
          navigate(`/`, { replace: true });
          alert('작성자가 아닙니다.');
          return;
        }
        setPostForm({
          category: response.data.category,
          title: response.data.title,
        });
        setEditorValue(response.data.content);
        setThumbnail(response.data.thumbnail);
      }
    } catch (error) {
      console.log(error);
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

  const submitHandler = async (event) => {
    event.preventDefault();

    if (category === '' || title === '') {
      alert('카테고리 또는 제목을 설정해주세요.');
      return;
    }
    if (!token) return;

    const post = new FormData();
    post.append('title', title);
    post.append('content', editorValue);
    post.append('category', category);
    post.append('thumbnail', thumbnail);

    if (postId) {
      try {
        const response = await postService.submitModifyPost({ postId, post, token });
        navigate(`/board/${postId}`, { replace: true });
        alert('게시글 수정 완료');
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const response = await postService.submitWritePost({ post, token });
        if (response.statusText === 'OK') {
          navigate(`/`, { replace: true });
          alert('게시글 작성 완료');
        } else alert('게시글 작성 실패');
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <>
      <TitleBox categories={categories} onChange={handleChange} category={category} title={title} />
      <Editor
        token={token}
        editorValue={editorValue}
        setEditorValue={setEditorValue}
        imageList={imageList}
        setThumbnail={setThumbnailImage}
      />
      <ButtonBox onPostSubmit={submitHandler} />
    </>
  );
}
