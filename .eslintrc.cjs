/* eslint-env node */

module.exports = {
  // 프로젝트의 사용 환경
  env: { browser: true, es2020: true },
  // 확장 설정
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
  ],
  // 자바스크립트 버전, 모듈 사용 여부 등을 설정
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh'],
  // extends와 plugins에 대한 세부 설정을 변경하는 코드를 넣을 수 있다.
  // 값을 0으로 주면 에러 검출을 하지 않고, 1로 주면 경고, 2로 주면 에러를 표시
  // https://eslint.org/docs/latest/rules/
  rules: {
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    // 들여쓰기 깊이 제한
    'max-depth': ['error', 2],
    // 함수의 매개변수 개수 제한
    'max-params': ['error', 3],
    // 함수의 길이 제한
    'max-lines-per-function': ['error', { max: 500 }],
  },
};
