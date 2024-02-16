export const CONFIRM_MESSAGE = {
  DUPLICATE_ERROR: '이미 존재합니다',
  EMAIL_RULE_ERROR: '올바른 형식으로 작성해주세요',
  NICKNAME_RULE_ERROR: '2~10자리의 한글이나 영문으로 이루어진 닉네임을 작성해주세요.',
  PASS_MESSAGE: '사용 가능',
  PASSWORD_CONFIRM_ERROR: '비밀번호가 일치하지 않습니다.',
  PASSWORD_EMPTY_ERROR: '비밀번호를 입력해주세요',
  PASSWORD_RULE_ERROR: '영문과 숫자를 포함하여 8~15자를 작성해주세요',
  PASSWORD_PASS_MESSAGE: '비밀번호가 일치합니다',
  PHONE_NUMBER_RULE_ERROR: "'-' 를 제외한 10~11자의 올바른 핸드폰 번호를 작성해주세요.",
  MEMBER_DELETE_ERROR: '탈퇴를 처리하는 중 문제가 생겼습니다.',
  MEMBER_DELETE_MESSAGE: '정말 탈퇴하시겠습니까?',
  MEMBER_DELETE_SUCCESS_MESSAGE: '이용해주셔서 감사합니다.',
  CLIPBOARD_MESSAGE: '클립보드에 링크가 복사 되었습니다.',
  POST_DELETE_CONFIRM_MESSAGE: '정말 게시물을 삭제하시겠습니까?',
  POST_DELETE_SUCCESS_MESSAGE: '삭제 되었습니다.',
  COMMENT_EMPTY_ERROR: '댓글을 입력해주세요',
  COMMENT_DELETE_CONFIRM_MESSAGE: '정말 댓글을 삭제하시겠습니까?',
};

export const LOGIN_MESSAGE = {
  DISCORDANCE: '아이디 또는 비밀번호를 확인해주세요',
  EMPTY: '아이디 또는 비밀번호를 입력해주세요',
  SUCCESS: '로그인 성공',
};

export const SIGN_UP_GUIDE = {
  INTRODUCTION: '* 최대 30자까지 입력',
  NICKNAME: '* 한글, 영문 2~10자 입력',
  PASSWORD: '* 영문, 숫자 포함 8~16자 입력',
  PHONE_NUMBER: 'ex) 01012345678',
  SIGN_UP_SUCCESS_MESSAGE: '회원가입 성공',
};

export const WRITE_MESSAGE = {
  WRITER_ERROR: '작성자가 아닙니다',
  EMPTY_MESSAGE: '카테고리 또는 제목을 설정해주세요.',
  WRITE_SUCCESS_MESSAGE: '게시글 작성 완료',
  UPDATE_SUCCESS_MESSAGE: '게시글 수정 완료',
};

export const USER_MESSAGE = {
  EDIT_PROFILE_SUCCESS_MESSAGE: '프로필 수정이 완료되었습니다. 다시 로그인 해주세요!',
  EDIT_PROFILE_ERROR: '입력한 정보를 다시 확인해주세요.',
};

export const ETC_MESSAGE = {
  BOARD_EMPTY: '작성한 게시물이 없습니다',
  NOTHING_LIKE_POST: '좋아한 게시물이 없습니다',
  FIRST_POST: '첫 게시물을 작성해주세요 🍹',
  PREPARING: '준비 중 입니다',
};

export const categories = [
  {
    id: 0,
    title: 'ALL',
    name: '',
  },
  {
    id: 1,
    title: 'RECIPE',
    name: 'RECIPE',
  },
  {
    id: 2,
    title: 'COCKTAIL / SNACK',
    name: 'COCKTAIL',
  },
  {
    id: 3,
    title: 'ETC',
    name: 'ETC',
  },
];

export const userCategories = [
  {
    id: 0,
    title: '좋아요 한 글',
    name: 'like',
  },
  {
    id: 1,
    title: '작성한 글',
    name: 'write',
  },
];
