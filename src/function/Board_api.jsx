import React from 'react';
import Moment from "react-moment";

// 업로드 시간 셋팅
export const displayCreatedAt = (createdDate) => {
    const today = new Date() // 현재 시간
    const timeValue = new Date(createdDate) // 게시물 시간

    // 분 화
    const betweenTime = Math.floor((today.getTime() - timeValue.getTime()) / 1000 / 60);
    // 1분 미만 = 방금 전
    if (betweenTime < 1) return <span>방금 전</span>;
    // 1시간 미만 = ~분 전
    if (betweenTime < 60) {
        return <span>{ betweenTime }분 전</span>;
    }
    // 시간 화
    const betweenTimeHour = Math.floor(betweenTime / 60);
    // 24시간 미만 = ~시간 전
    if (betweenTimeHour < 24) {
        return <span>{ betweenTimeHour }시간 전</span>;
    }
    // 24시간 이상 = YYYY년 MM월 DD일
    return <Moment format="Y년 M월 D일">{ timeValue }</Moment>
};