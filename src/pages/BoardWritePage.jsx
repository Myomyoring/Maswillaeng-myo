import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { categories } from '../constants/index';
import Editor from '../components/boardWrite/Editor';
import { postService } from '../services/post.service';
import { useAuth } from '../context/ProvideAuthContext';

import { styled } from 'styled-components';
import tw from 'twin.macro';
import TitleBox from '../components/boardWrite/TitleBox';
import ButtonBox from '../components/boardWrite/ButtonBox';

const BoardWriteStyle = styled.div`
  ${tw`
        w-2/3 h-full
        m-auto py-20
    `}
`;

export default function BoardWritePage() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const { getUserToken } = useAuth();
  const token = getUserToken();

  const [postForm, setPostForm] = useState({
    category: '',
    title: '',
  });
  const { category, title } = postForm;
  const [editorValue, setEditorValue] = useState('');
  const [thumbnail, setThumbnail] = useState('');

  useEffect(() => {
    getPost();
  }, [postId]);

  const getPost = async () => {
    try {
      const response = await postService.getPost({ postId });
      if (response.statusText === 'OK') {
        setPostForm({
          category: response.data.category,
          title: response.data.title,
        });
        setEditorValue(response.data.content);
        setThumbnail(response.data.thumbnail);
      }
    } catch (err) {
      console.log(err);
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

  const submitHandler = async (e) => {
    e.preventDefault();

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
        console.log(response);
        navigate(`/board/${postId}`, { replace: true });
        alert('게시글 수정 완료');
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        const response = await postService.submitWritePost({ post, token });
        if (response.statusText === 'OK') {
          navigate('/', { replace: true });
          alert('게시글 작성 완료');
        } else alert('게시글 작성 실패');
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <BoardWriteStyle>
      <TitleBox categories={categories} onChange={handleChange} category={category} title={title} />
      <Editor
        token={token}
        editorValue={editorValue}
        setEditorValue={setEditorValue}
        imageList={imageList}
        setThumbnail={setThumbnailImage}
      />
      <ButtonBox onPostSubmit={submitHandler} />
    </BoardWriteStyle>
  );
}
