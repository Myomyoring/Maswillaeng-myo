import CommentWriterPresenter from '../presenters/CommentWriter.presenter';

export default function CommentWriterContainer({ onSaveComment, comment, setComment, isLoading }) {
  const onChange = (event) => {
    const { value } = event.target;
    setComment(value);
  };

  return <CommentWriterPresenter {...{ comment, onChange, onSaveComment, isLoading }} />;
}
