import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const idRef  = useRef(null);
  const pwdRef = useRef(null);

  const [formData, setFormData] = useState({ id: "", pwd: "" });
  const [errors,   setErrors]   = useState({ id: "", pwd: "" });

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ id: "", pwd: "" });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    // ── 클라이언트 validation
    if (!formData.id) {
      setErrors((p) => ({ ...p, id: "아이디를 입력해주세요" }));
      idRef.current.focus();
      return;
    }
    if (!formData.pwd) {
      setErrors((p) => ({ ...p, pwd: "비밀번호를 입력해주세요" }));
      pwdRef.current.focus();
      return;
    }

    // ── 서버 로그인 API 연동
    try {
      const res  = await fetch("/api/auth/login", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ id: formData.id, pwd: formData.pwd }),
      });
      const data = await res.json();

      if (!res.ok) {
        // 서버에서 401 등 에러 응답
        setErrors((p) => ({ ...p, pwd: data.message || "로그인에 실패했습니다." }));
        return;
      }

      // 로그인 성공 → 토큰 저장
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("userId",      data.userId);
      alert("로그인 성공!");
      navigate("/");
    } catch (err) {
      console.error("로그인 오류:", err);
      setErrors((p) => ({ ...p, pwd: "서버 연결에 실패했습니다." }));
    }
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

              {/* 아이디 */}
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
              {errors.id && <span className="login-error">{errors.id}</span>}

              {/* 비밀번호 */}
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
              {errors.pwd && <span className="login-error">{errors.pwd}</span>}

              <p className="loginsecurity">
                <input id="memberchecksaveid0" name="checksaveid" type="checkbox" value="T" />
                <label htmlFor="memberchecksaveid0">아이디 저장</label>
                <span className="secret">보안접속</span>
              </p>

              <div className="loginbutton">
                <button type="submit" className="btnsubmit gfull sizel">
                  로그인
                </button>
              </div>

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
