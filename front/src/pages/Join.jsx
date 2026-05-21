import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Join() {
  const [fade, setFade] = useState("");
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    setFade("end");
    return () => setFade("");
  }, []);

  return (
    <div id="container" className={"start " + fade}>
      <div id="contents" className="blanktop blankbottom join-contents">
        <div className="titlearea">
          <h2>회원가입</h2>
        </div>

        {/* 단계 표시 */}
        <div className="join-step">
          <div className={step === 1 ? "active" : ""}>약관동의</div>
          <div className={step === 2 ? "active" : ""}>정보입력</div>
          <div className={step === 3 ? "active" : ""}>가입완료</div>
        </div>

        {/* ── Step 1 : 약관 동의 ── */}
        {step === 1 && (
          <div className="join-box">
            <h3>전체 동의</h3>
            <label className="join-check">
              <input type="checkbox" /> 이용약관 동의 <span>(필수)</span>
            </label>
            <div className="join-terms">
              제1조 목적<br />
              이 약관은 OPS 온라인몰 서비스 이용과 관련하여 회사와 이용자의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.
            </div>
            <label className="join-check">
              <input type="checkbox" /> 개인정보처리방침 동의 <span>(필수)</span>
            </label>
            <div className="join-terms">
              개인정보 수집 및 이용 목적<br />
              회원가입, 주문, 배송, 고객상담, 서비스 제공을 위해 개인정보를 수집합니다.
            </div>
            <label className="join-check">
              <input type="checkbox" /> 쇼핑정보 수신 동의 <span>(선택)</span>
            </label>
            <div className="join-btns">
              <button onClick={() => setStep(2)} className="join-main-btn">다음</button>
              <button onClick={() => navigate("/")} className="join-sub-btn">취소</button>
            </div>
          </div>
        )}

        {/* ── Step 2 : 정보 입력 ── */}
        {step === 2 && (
          <div className="join-box">
            <h3>회원인증</h3>
            <div className="join-radio">
              <label><input type="radio" name="memberType" defaultChecked /> 개인회원</label>
              <label><input type="radio" name="memberType" /> 사업자회원</label>
              <label><input type="radio" name="memberType" /> 외국인회원</label>
            </div>

            <h3>기본정보</h3>
            <div className="join-form-row">
              <label>아이디 *</label>
              <div className="join-with-btn">
                <input type="text" placeholder="아이디 입력" />
                <button>중복확인</button>
              </div>
            </div>
            <div className="join-form-row">
              <label>비밀번호 *</label>
              <input type="password" placeholder="비밀번호 입력" />
            </div>
            <div className="join-form-row">
              <label>비밀번호 확인 *</label>
              <input type="password" placeholder="비밀번호 재입력" />
            </div>
            <div className="join-form-row">
              <label>이름 *</label>
              <input type="text" placeholder="이름 입력" />
            </div>
            <div className="join-form-row">
              <label>주소 *</label>
              <div className="join-with-btn">
                <input type="text" placeholder="우편번호" />
                <button>우편번호 찾기</button>
              </div>
              <input type="text" placeholder="기본주소" />
              <input type="text" placeholder="상세주소" />
            </div>
            <div className="join-form-row">
              <label>휴대전화 *</label>
              <div className="join-phone">
                <select defaultValue="010">
                  <option>010</option>
                  <option>011</option>
                  <option>016</option>
                </select>
                <input type="text" maxLength={4} />
                <input type="text" maxLength={4} />
                <button>인증번호받기</button>
              </div>
            </div>
            <div className="join-form-row">
              <label>이메일 *</label>
              <div className="join-with-btn">
                <input type="email" placeholder="이메일 입력" />
                <button>중복확인</button>
              </div>
            </div>

            <h3>추가정보</h3>
            <div className="join-form-row">
              <label>성별</label>
              <div className="join-radio">
                <label><input type="radio" name="gender" /> 남자</label>
                <label><input type="radio" name="gender" /> 여자</label>
              </div>
            </div>
            <div className="join-form-row">
              <label>생년월일 *</label>
              <div className="join-birth">
                <label><input type="radio" name="calendar" defaultChecked /> 양력</label>
                <label><input type="radio" name="calendar" /> 음력</label>
                <input type="text" placeholder="년" maxLength={4} />
                <input type="text" placeholder="월" maxLength={2} />
                <input type="text" placeholder="일" maxLength={2} />
              </div>
            </div>
            <div className="join-form-row">
              <label>지역</label>
              <select>
                <option>선택</option>
                <option>서울</option>
                <option>부산</option>
                <option>대구</option>
                <option>인천</option>
                <option>광주</option>
                <option>대전</option>
              </select>
            </div>

            <div className="join-btns">
              <button onClick={() => setStep(3)} className="join-main-btn">회원가입</button>
              <button onClick={() => navigate("/")} className="join-sub-btn">취소</button>
            </div>
          </div>
        )}

        {/* ── Step 3 : 가입 완료 ── */}
        {step === 3 && (
          <div className="join-box join-complete">
            <h3>회원가입이 완료되었습니다.</h3>
            <p>OPS 회원이 되신 것을 환영합니다.</p>
            <button onClick={() => navigate("/Login")} className="join-main-btn">
              로그인하기
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
