import React from 'react';

const MyPageToggle = ({userContent ,setUserContent}) => {
    const contentToggle = () => {
        setUserContent(!userContent);
    }
    return (
        <>
            <div className="w-full h-20 flex text-center p-5">
                <div
                    className={userContent ? "w-1/2 mx-3" : "font-bold w-1/2 mx-3 border-b-2 border-b-[#EA4E4E]"}>
                    <button onClick={contentToggle}>
                        작성한 글
                    </button>
                </div>
                <div
                    className={userContent ? "font-bold w-1/2 mx-3 border-b-2 border-b-[#EA4E4E]" : "w-1/2 mx-3"}>
                    <button onClick={contentToggle}>
                        좋아요한 글
                    </button>
                </div>
            </div>
        </>
    );
};

export default MyPageToggle;