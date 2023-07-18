import React, {useEffect, useState} from "react";
import Recipe_tab from "../components/board/Recipe_tab";
import CocktailSnack_tab from "../components/board/CocktailSnack_tab";
import Etc_tab from "../components/board/Etc_tab";
import All_tab from "../components/board/All_tab";
import Toggle_tab from "../components/board/Toggle_tab";

const Board = () => {
    // 탭 인덱스 상태변수
    const [index, setIndex] = useState(0);

    return (
        <div className="w-full h-screen items-center justify-center bg-[#FBF9EC] bg-cover ">
            <div>
                {/* 상단 이미지 */}
                <div
                    className="w-full h-28" style={{ backgroundImage: "url(https://cdn.pixabay.com/photo/2015/03/30/12/35/mojito-698499_1280.jpg)" }} />
                {/* 탭 */}
                <Toggle_tab index={ index } setIndex={ setIndex }/>

                {/* 게시판 */}
                <div>
                    <section className="container px-4 mx-auto">
                        { index === 0 ? (
                            <All_tab/>
                        ) : index === 1 ? (
                            <Recipe_tab/>
                        ) : index === 2 ? (
                            <CocktailSnack_tab/>
                        ) : (
                            <Etc_tab/>
                        )
                        }
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Board;