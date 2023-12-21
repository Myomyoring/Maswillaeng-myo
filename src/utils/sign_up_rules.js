export const emailRule = (email) => /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);

export const passwordRule = (password) => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/.test(password);

export const nicknameRule = (nickname) => /^[가-힣a-zA-Z0-9]{2,10}$/.test(nickname);

export const phoneNumberRule = (phoneNumber) => /^01(0|1|6|7|8|9)\d{7,8}$/.test(phoneNumber);
