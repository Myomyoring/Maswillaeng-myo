import React from 'react';
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';
import tw from 'twin.macro';
import { displayCreatedAt } from '../../utils/displayDate';
import DefaultThumbnail from '../../statics/images/default_thumbnail.png'

const TabBoardStyle = styled.div`
    ${tw`
        m-auto
    `}
`

const Card = styled.span`
    ${tw`
        grid grid-cols-4
        text-center
    `}
`

const CardContents = styled.div`
    ${tw`
        text-sm p-2
    `}

    a { 
        ${tw`
            grid
            font-bold
        `}

        &:hover {
            ${tw`underline`}
        }

        img {
            ${tw`
                w-full h-52
                my-2
                col-span-4
                rounded-lg
                border-solid
            `}
        }

        div {
            ${tw`
                col-span-3
                text-ellipsis overflow-hidden whitespace-nowrap
            `}
        }

        span {
            ${tw`
                text-xxs text-point
            `}    
        }
}
`

const Content = styled.div`
    ${tw`
        p-2
        grid grid-cols-4
        text-xxs text-ellipsis
        overflow-hidden
        whitespace-nowrap 
    `}

`

const HashTag = styled.div`
    ${tw`
        col-span-4
        rounded-md text-xs overflow-hidden whitespace-nowrap text-ellipsis
    `}
`
export default function TabBoard({ data }) {

    return (
    <>
        <TabBoardStyle>
            <Card>
            { data ? (
                data.map( (list) => 
                <CardContents key={ list.id }>
                    <Link to={'/'}>
                        
                        <img src={ list.thumbnail ? list.thumbnail : DefaultThumbnail }/>
                        <div>{ list.title }</div>
                        <span>[-]</span>
                    </Link>
                    <Content>
                        <Link to={'/'}>
                            {list.nickname}                 
                        </Link>
                        <span>{ displayCreatedAt(list.createdDate) }</span>
                        <span>👀 -</span>
                        <span>💗 -</span>
                        <HashTag>해시태그</HashTag>
                    </Content>
                </CardContents>
                    )
                ) : (
                "데이터 없음"
                )}
            </Card>
        </TabBoardStyle>
    </>
    );
}