import axios from "axios";

// 로그인
export const getLogin = async (email, password) => {
    return await axios.post("/api/auth/login", {
            email: email,
            password: password,
        })
        .then((res) => {
            return res.data;
        }).catch((err) => {
            console.log("로그인 실패")
        })
}