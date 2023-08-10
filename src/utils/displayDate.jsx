/* https://kdinner.tistory.com/68 */

export const displayCreatedAt = (createdDate) => {
  const today = new Date();
  const timeValue = new Date(createdDate);

  // 분 화
  const betweenTime = Math.floor((today.getTime() - timeValue.getTime()) / 1000 / 60);
  if (betweenTime < 1) return <span>방금 전</span>;
  if (betweenTime < 60) {
    return <span>{betweenTime}분 전</span>;
  }
  // 시간 화
  const betweenTimeHour = Math.floor(betweenTime / 60);
  if (betweenTimeHour < 24) {
    return <span>{betweenTimeHour}시간 전</span>;
  }

  // 24시간 이상 = YYYY년 MM월 DD일
  const year = timeValue.getFullYear();
  const month = timeValue.getMonth() + 1;
  const day = timeValue.getDate();
  return <span>{`${year}년 ${month}월 ${day}일`}</span>;
};

// YYYY. MM. DD 오전/오후 hh:mm:ss
export const diplayBoardDetailDate = (boardDate) => {
  const timeValue = new Date(boardDate);

  return timeValue.toLocaleString();
};
