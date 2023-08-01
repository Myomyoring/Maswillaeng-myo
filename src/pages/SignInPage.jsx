import React from 'react';
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';
import tw from 'twin.macro';

const Container = styled.div`
    ${tw`
        w-full h-screen
        flex justify-center items-center
        text-center
        bg-cover
        bg-[url('https://cdn.pixabay.com/photo/2018/03/18/18/54/drink-3237895_1280.jpg')]
    `}
`

const Contents = styled.div`
    ${tw`
        px-44 py-20
        items-center
        rounded-xl 
        bg-main bg-opacity-60  
    `}

    * {
        ${tw`
            bg-transparent
        `}
    }

    form > a {
        ${tw`
            text-xs
            px-3
        `}
    }

`

const InputBox = styled.input`
    ${tw`
        w-full
        my-2 px-6 py-2
        block
        bg-white
        rounded-3xl
        border-none
        outline-none
    `}
`

const ErrorBox = styled.div`
    ${tw`
        my-1
        text-sm 
        font-bold text-white
    `}
`

const Button = styled.button`
    ${tw`
        my-2 px-24 py-2
        flex
        bg-point
        text-lg text-white
        rounded-3xl
    `}
`

export default function SignInPage() {


    return (
            <Container>
                <Contents>
                    <Link to={'/'} className='logo' >
                        Mashillaeng
                    </Link>
                    <form>
                        <InputBox type="text" placeholder='아이디' />
                        <InputBox type="password" placeholder='비밀번호' />
                        <ErrorBox>에러메세지</ErrorBox>
                        <Button>로그인</Button>
                        <Link to={'/signup'}>
                            회원가입
                        </Link>
                        <Link to={'/'}>
                            아이디 / 비밀번호 찾기
                        </Link>
                    </form>
                </Contents>
            </Container>
    );
}