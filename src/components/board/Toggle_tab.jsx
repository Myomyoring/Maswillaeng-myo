import React, {useEffect, useState} from 'react';
const Toggle_tab = ({index, setIndex}) => {

    const board_tab = [
        {
            id: 0,
            title: "ALL",
        },
        {
            id: 1,
            title: "RECIPE",
        },
        {
            id: 2,
            title: "COCKTAIL / SNACK",
        },
        {
            id: 3,
            title: "ETC",
        },
    ];

    return (
        <>
            <div className="w-full h-20">
                <ul className="m-auto flex justify-around pt-6 cursor-pointer">
                    {board_tab.map((item) => (
                        <li className={
                            index === item.id ? "font-bold opacity-100" : "opacity-40"
                        }
                            key={item.id}
                            onClick={() => setIndex(item.id)}
                        >
                            {item.title}
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default Toggle_tab;
