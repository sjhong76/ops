import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { axiosGet} from "../utils/dataFetch.js"

const COMMUNITY_MENUS = [
  { label: "NOTICE",       path: "/community/notice",   catKey: "notice" },
  { label: "OPS MAGAZINE", path: "/community/magazine", catKey: "magazine" },
  { label: "Q&A",          path: "/community/q&a",      catKey: "q&a" },
  { label: "매장안내",     path: "/community/guide",    catKey: "guide" },
  { label: "RVIP 전용",    path: "/community/rvip",     catKey: "rvip" },
  { label: "FAQ",          path: "/community/faq",      catKey: "faq" },
  { label: "EVENT",        path: "/community/event",    catKey: "event" }
];

// 💡 App.jsx가 던져준 category props를 여기서 받습니다!
export default function Community({ prdlist, category = "community" }) {
  
  const [event, setEvent] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (category === "event") {
      setLoading(true)
      axiosGet('/community/event')
        .then((data) => {
          setEvent(data)
        })
        .catch ((err) => {
          console.error(err)
        })
        .finally(()=> {
          setLoading(false)
        })
    }
  }, [category])

  return (
    <div id="wrap">
      <div id="container">
        <main id="contents2" className="blanktop">
          <div className="subcategory">
            <ul className="subcategorylist">
              {COMMUNITY_MENUS.map(({ label, path, catKey }) => {
                const isActive = category === catKey;

                return (
                  <li key={label} className="subcategoryitem">
                    <Link 
                      to={path} 
                      className={`subcategorylink ${isActive ? "on" : ""}`}
                    >
                      {label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* ── 💡 카테고리별 컨텐츠 분기 구역 ── */}
        <div className="community-content-area" style={{ marginTop: "30px" }}>
            {/* ── 💡 커뮤니티 메인 홈 영역 (바로가기 카드 버튼 메뉴판) ── */}
            {category === "community" && (
            <div className="community-main-portal" style={{ marginTop: "20px" }}>
                <div 
                className="community-grid-container" 
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", // 💡 반응형 그리드: 화면 크기에 맞춰 알아서 정렬
                    gap: "20px",
                    padding: "10px 0"
                }}
                >
                {COMMUNITY_MENUS.map(({ label, path }) => (
                    <Link
                    key={label}
                    to={path}
                    className="community-portal-card">
                    <div className='community-portal-card-first'>
                        {label.charAt(0)} {/* 메뉴의 첫 글자만 따서 아이콘처럼 출력 (예: NOTICE -> N) */}
                    </div>
                    <span style={{ fontSize: "15px", letterSpacing: "0.5px" }}>{label}</span>
                    </Link>
                ))}
                </div>
            </div>
            )}
            {category === "notice"   && <div>📢 공지사항 리스트 디자인 영역</div>}
            {category === "magazine" && <div><h1>준비 중입니다</h1></div>}
            {category === "q&a"      && <div>❓ 유저 1:1 질문 답변 게시판 영역</div>}
            {category === "guide"    && <div>📍 전국 OPS 오프라인 매장 안내 지도 영역</div>}
            {category === "rvip"     && <div><h1>준비 중입니다</h1></div>}
            {category === "faq"      && <div>💬 자주 묻는 질문 아코디언 영역</div>}
            {category === "event"    && 
            <div className="event-list-container">
      
            {event.map((event) => (
                <div key={event.id} className="event-card-item">
                    <div className="event-img-box">
                        <img src={event.imgUrl} alt={event.title} />
                    </div>
                </div>
            ))} 
            </div>}
        </div>

        </main>
      </div>
    </div>
  );
}