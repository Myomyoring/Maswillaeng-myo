import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import { DELETE_TOKEN } from "../store/Auth";
import AuthContext from "../context/AuthContextProvider";
import axios from "axios";

const Header = ({ userId }) => {
  // 로그인 & 로그아웃
  const authenticated = useSelector((state) => state.authToken.authenticated);
  const dispatch = useDispatch();
  const { isLoggedIn, logoutHandler, token, setIsLoggedIn } =
    useContext(AuthContext);
  const [nickname, setNickName] = useState({});

  const handleLogout = async () => {
    // const res = await axios.post(`/api/auth/logout`, {
    //   userId: userId,
    // });
    logoutHandler();
    dispatch(DELETE_TOKEN());
    window.location.assign("/LoginForm");
  };

  const getLoginMember = async () => {
    try {
      const res = await axios.get(`/api/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data.nickname;
    } catch (error) {
      console.error(error);
    }
  };

  // 현재 로그인한 유저 닉네임 가져오기
  useEffect(() => {
    getLoginMember().then((member) => setNickName(member));
  }, [userId]);

  return (
    <div className="relative bg-main font-extrabold">
      <div className="border-b-zinc-400 border-t-stone-600 flex h-20  items-center justify-between border-t-4 border-b-2 ">
        <div>
          <Link to={"/"}>Mashillaeng</Link>
        </div>
        <div className="flex items-center gap-40">
          <FiSearch className="font-bold text-red-500" />
          <Link to={"/"}>Board</Link>
          {isLoggedIn ? (
            <>
              <Link to={`/UserPage/${nickname}`}>MyPage</Link>
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <Link to={"/LoginForm"}>Login</Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
