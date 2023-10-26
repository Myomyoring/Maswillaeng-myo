import { categories } from '../../../constants';
import ButtonBox from '../ButtonBox';
import TitleBox from '../TitleBox';
import Editor from '../containers/Editor.container';

export default function WriteContentsPresenter({
  handleSubmit,
  handleChange,
  category,
  title,
  editorValue,
  setEditorValue,
  imageList,
  setThumbnailImage,
}) {
  return (
    <>
      <TitleBox categories={categories} onChange={handleChange} category={category} title={title} />
      <Editor
        editorValue={editorValue}
        setEditorValue={setEditorValue}
        imageList={imageList}
        setThumbnail={setThumbnailImage}
      />
      <ButtonBox onPostSubmit={handleSubmit} />
    </>
  );
}
