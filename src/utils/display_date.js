/* https://kdinner.tistory.com/68 */

export const DisplayPostDate = (createdDate) => {
  const today = new Date();
  const timeValue = new Date(createdDate);

  // 분 화
  const betweenTime = Math.floor((today.getTime() - timeValue.getTime()) / 1000 / 60);
  if (betweenTime < 1) return '방금 전';
  if (betweenTime < 60) {
    return `${betweenTime}분 전`;
  }
  // 시간 화
  const betweenTimeHour = Math.floor(betweenTime / 60);
  if (betweenTimeHour < 24) {
    return `${betweenTimeHour}시간 전`;
  }
  // 24시간 이상 = YYYY년 MM월 DD일
  const year = timeValue.getFullYear();
  const month = timeValue.getMonth() + 1;
  const day = timeValue.getDate();
  return `${year}년 ${month}월 ${day}일`;
};
// YYYY. MM. DD 오전/오후 hh:mm:ss
export const DisplayFullDate = (boardDate) => {
  const timeValue = new Date(boardDate);

  return timeValue.toLocaleString();
};
