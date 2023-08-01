// import { createContext, useContext, useState } from "react";

// // 전역 컨텍스트 생성
// const authContext = createContext();

// // 유저 권한 함수
// function useProvideAuth() {
//     const [user, setUser] = useState(null);

//     // 유저 토큰 가져오기
//     const getUserToken = async (token) => {
//         if(!token) return false;
//     }

//     // 로그인
//     const signIn = async callback => {
//         const { token } = localStorage.getItem('accessToken');
//         const user = await getUserToken(token);
//         if (!user) return;

//         setUser(user);
//         callback?.();
//     }

//     // 로그아웃
//     const signOut = callback => {
//         localStorage.clear();
//         setUser(null);
//         callback?.();
//     }

//     return { user, signIn, signOut };
// }


// function ProvideAuth({ children }) {
//     const auth = useProvideAuth();
//     return <authContext.Provider value={auth}>{children}</authContext.Provider>
// }

// function useAuth() {
//     return useContext(authContext);
// }

// export { ProvideAuth, useAuth };