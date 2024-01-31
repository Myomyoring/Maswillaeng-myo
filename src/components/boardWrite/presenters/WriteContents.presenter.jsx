import { categories } from '../../../constants';
import ButtonBox from '../ButtonBox';
import EditorBox from '../containers/Editor.container';
import TitleBox from '../TitleBox';

export default function WriteContentsPresenter({
  onSubmit,
  onChange,
  category,
  title,
  editorValue,
  setEditorValue,
  imageList,
  setThumbnailImage,
}) {
  return (
    <>
      <TitleBox categories={categories} onChange={onChange} category={category} title={title} />
      <EditorBox
        editorValue={editorValue}
        setEditorValue={setEditorValue}
        imageList={imageList}
        setThumbnail={setThumbnailImage}
      />
      <ButtonBox onSubmit={onSubmit} />
    </>
  );
}
