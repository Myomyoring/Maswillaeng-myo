import { categories } from '../../../constants';
import ButtonBox from '../ButtonBox';
import EditorBox from '../containers/Editor.container';
import TitleBox from '../TitleBox';

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
      <EditorBox
        editorValue={editorValue}
        setEditorValue={setEditorValue}
        imageList={imageList}
        setThumbnail={setThumbnailImage}
      />
      <ButtonBox onPostSubmit={handleSubmit} />
    </>
  );
}
