import React, { useEffect, useCallback, useState } from 'react';
import { useInput } from '../hooks';
import { useHistory } from 'react-router-dom';
import { useMemberDispatch } from '../contexts/MemberContext';
import { apiFetch } from '../apis';
import { SignUpStyle } from './style/SignUp.style';

function SignUp() {
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');
  const [passwordCheck, onChangePasswordCheck] = useInput('');
  const [name, onChangeName] = useInput('');
  const [isCorrectPassword, setIsCorrectPassword] = useState(false);

  const history = useHistory();
  const dispatch = useMemberDispatch();

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (!email.trim() || !password.trim() || !name.trim()) {
        alert('필수 항목을 채워주세요');
        return;
      }
      if (!isCorrectPassword) {
        alert('비밀번호를 확인해주세요.');
        return;
      }
      try {
        const reponse = await apiFetch({
          url: '/users',
          method: 'POST',
          body: {
            email,
            password,
            name,
          },
        });

        history.push('/');
      } catch (e) {
        console.error(e.message);
        alert('예기치 못 한 에러가 발생했습니다.');
      }
    },
    [email, password, passwordCheck, name]
  );

  useEffect(() => {
    password === passwordCheck
      ? setIsCorrectPassword(true)
      : setIsCorrectPassword(false);
  }, [password, passwordCheck]);

  return (
    <SignUpStyle>
      <section className="sign-up">
        <header className="latte-header">
          <h1>BOOSTWORLD - 회원 가입</h1>
          <hr />
        </header>

        <section className="signup-section">
          <header className="signup-header">
            <h2>프로필 입력</h2>
          </header>
          <hr />

          <section>
            <form className="signup-form" onSubmit={onSubmit}>
              <div>
                <label htmlFor="email">이메일 아이디</label>
                <input
                  id="email"
                  type="text"
                  value={email}
                  onChange={onChangeEmail}
                />
              </div>
              <div>
                <label htmlFor="password">비밀번호</label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={onChangePassword}
                />
              </div>
              <div>
                <label htmlFor="password-check">비밀번호 확인</label>
                <input
                  id="password-check"
                  type="password"
                  value={passwordCheck}
                  onChange={onChangePasswordCheck}
                />
              </div>
              {!isCorrectPassword && (
                <div className="check-password">
                  비밀번호와 확인이 일치하지 않습니다.
                </div>
              )}
              <div>
                <label htmlFor="name">이름</label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={onChangeName}
                />
              </div>
              <button className="signup-button">
                <a>회원가입</a>
              </button>
            </form>
          </section>
        </section>
      </section>
    </SignUpStyle>
  );
}

export default SignUp;
