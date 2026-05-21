import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  // ── refs: 에러 시 해당 input으로 포커스 이동
  const idRef  = useRef(null);
  const pwdRef = useRef(null);

  // ── 입력값 상태
  const [formData, setFormData] = useState({ id: "", pwd: "" });

  // ── 에러 메시지 상태
  const [errors, setErrors] = useState({ id: "", pwd: "" });

  // 입력 변경 시 에러 초기화
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ id: "", pwd: "" });
  };

  // 로그인 제출
  const handleLoginSubmit = (e) => {
    e.preventDefault();

    // 아이디 검사
    if (!formData.id) {
      setErrors((prev) => ({ ...prev, id: "아이디를 입력해주세요" }));
      idRef.current.focus();
      return;
    }
    // 비밀번호 검사
    if (!formData.pwd) {
      setErrors((prev) => ({ ...prev, pwd: "비밀번호를 입력해주세요" }));
      pwdRef.current.focus();
      return;
    }

    // TODO: 서버 로그인 API 연동 예정
    alert("로그인 성공!");
    navigate("/");
  };

  return (
    <div id="container">
      <div id="contents" className="blanktop blankbottom">
        <div className="titlearea">
          <h2>Login</h2>
        </div>

        <form onSubmit={handleLoginSubmit}>
          <div className="login">
            <fieldset className="form">

              {/* ── 아이디 입력 ── */}
              <div className="id">
                <input
                  ref={idRef}
                  id="memberid"
                  name="id"
                  value={formData.id}
                  onChange={handleFormChange}
                  placeholder="아이디"
                  type="text"
                />
              </div>
              {errors.id && (
                <span className="login-error">{errors.id}</span>
              )}

              {/* ── 비밀번호 입력 ── */}
              <div className="password">
                <input
                  ref={pwdRef}
                  id="memberpasswd"
                  name="pwd"
                  value={formData.pwd}
                  onChange={handleFormChange}
                  placeholder="Password"
                  type="password"
                />
              </div>
              {errors.pwd && (
                <span className="login-error">{errors.pwd}</span>
              )}

              {/* ── 아이디 저장 ── */}
              <p className="loginsecurity">
                <input
                  id="memberchecksaveid0"
                  name="checksaveid"
                  type="checkbox"
                  value="T"
                  style={{ marginTop: "3px" }}
                />
                <label htmlFor="memberchecksaveid0">아이디 저장</label>
                <span className="secret">보안접속</span>
              </p>

              {/* ── 로그인 버튼 ── */}
              <div className="loginbutton">
                <button type="submit" className="btnsubmit gfull sizel">
                  로그인
                </button>
              </div>

              {/* ── 하단 링크 ── */}
              <ul className="loginutill">
                <li><a>아이디 찾기</a></li>
                <li><a>비밀번호 찾기</a></li>
                <li>
                  <a onClick={() => navigate("/Join")} style={{ cursor: "pointer" }}>
                    회원가입
                  </a>
                </li>
              </ul>

            </fieldset>
          </div>
        </form>
      </div>
    </div>
  );
}
