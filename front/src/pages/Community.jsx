import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { axiosGet } from "../utils/dataFetch.js"

const NOTICE_TAB = ["전체", "[이벤트]", "[매장]", "[배송]", "[공지]"]

const COMMUNITY_MENUS = [
  { label: "NOTICE",       path: "/community/notice",   catKey: "notice" },
  { label: "OPS MAGAZINE", path: "/community/magazine", catKey: "magazine" },
  { label: "Q&A",          path: "/community/q&a",      catKey: "q&a" },
  { label: "매장안내",     path: "/community/guide",    catKey: "guide" },
  { label: "RVIP 전용",    path: "/community/rvip",     catKey: "rvip" },
  { label: "FAQ",          path: "/community/faq",      catKey: "faq" },
  { label: "EVENT",        path: "/community/event",    catKey: "event" }
];

export default function Community({ prdlist, category = "community" }) {
  
  const [noticeTab, setNoticeTab] = useState("전체")
  const [notice, setNotice] = useState([])
  const [event, setEvent] = useState([])
  const [loading, setLoading] = useState(true)

  const filterNotice = notice.filter((item) => {
      if (noticeTab === "전체") return true
      return item.type === noticeTab
  })

  useEffect(() => {
    if (category === "notice") {
      setLoading(true)
      axiosGet('/community/notice')
        .then((data) => {
          // 💡 상단 고정 정렬 알고리즘 (ID 1~4번은 최상단 배치, 5번부터는 하단 배치)
          const fixedId = data.filter(item => item.id >= 1 && item.id <= 4);
          const notFixedId = data.filter(item => item.id >= 5);
          setNotice([...fixedId, ...notFixedId])
        })
        .catch((err) => {
          console.error("공지사항 로딩 실패:", err)
        })
        .finally(() => {
          setLoading(false)
        })
    }

    if (category === "event") {
      setLoading(true)
      axiosGet('/community/event')
        .then((data) => {
          setEvent(data)
        })
        .catch ((err) => {
          console.error("이벤트 로딩 실패:", err)
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }, [category])

  return (
    <div id="wrap">
      <div id="container">
        <main id="contents2" className="blanktop">
          
          {/* 서브 서브네비게이션 탭 바 */}
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

          <div className="community-content-area" style={{ marginTop: "30px" }}>
            
            {category === "community" && (
              <div className="community-main-portal" style={{ marginTop: "20px" }}>
                <div 
                  className="community-grid-container" 
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", 
                    gap: "20px",
                    padding: "10px 0"
                  }}
                >
                  {COMMUNITY_MENUS.map(({ label, path }) => (
                    <Link key={label} to={path} className="community-portal-card">
                      <div className='community-portal-card-first'>
                        {label.charAt(0)}
                      </div>
                      <span style={{ fontSize: "15px", letterSpacing: "0.5px" }}>{label}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {category === "notice" && (
              <div className='notice-board'>
                <div style={{ display: "flex", justifyContent: "center", textAlign: "center", fontSize: "22px", fontWeight: "bold", marginBottom: "20px", letterSpacing: "0.5px" }}>
                  NOTICE
                </div>

                <div className='notice-tab'>
                  {NOTICE_TAB.map((tab) => {
                    const isTab = noticeTab === tab;
                    return (
                      <button
                        key={tab}
                        className={`notice-filter-btn ${isTab ? "active" : ""}`}
                        onClick={() => setNoticeTab(tab)}
                      >
                        {tab}
                      </button>
                    );
                  })}
                </div>

                <div className="notice-list">
                  {loading ? (
                    <div style={{ textAlign: "center", padding: "30px", color: "#999" }}>로딩 중...</div>
                  ) : filterNotice.length === 0 ? (
                    <div style={{ textAlign: "center", padding: "30px", color: "#999" }}>등록된 공지사항이 없습니다.</div>
                  ) : (
                    filterNotice.map((item) => {
                      const isPinned = item.id >= 1 && item.id <= 4;

                      return (
                        <div key={item.id} className={`notice-item ${isPinned ? "pinned-row" : ""}`}>
                          <h3>
                            {noticeTab === "전체" && (
                              <span style={{ color: isPinned ? "#000" : "#555", fontWeight: isPinned ? "bold" : "normal", marginRight: "8px" }}>
                                {item.type}
                              </span>
                            )}
                            {item.title}
                          </h3>
                          <div className="notice-meta">
                            <span>{item.writer}</span>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            )}

            {category === "magazine" && <div><h1>준비 중입니다</h1></div>}
            {category === "q&a"      && <div>❓ 유저 1:1 질문 답변 게시판 영역</div>}
            {category === "guide"    && <div>📍 전국 OPS 오프라인 매장 안내 지도 영역</div>}
            {category === "rvip"     && <div><h1>준비 중입니다</h1></div>}
            {category === "faq"      && <div>💬 자주 묻는 질문 아코디언 영역</div>}
            
            {category === "event" && (
              <div className="event-list-container">
                {loading ? (
                  <div style={{ textAlign: "center", padding: "30px", color: "#999" }}>로딩 중...</div>
                ) : event.length === 0 ? (
                  <div style={{ textAlign: "center", padding: "30px", color: "#999" }}>진행 중인 이벤트가 없습니다.</div>
                ) : (
                  event.map((eventItem) => (
                    <div key={eventItem.id} className="event-card-item">
                      <div className="event-img-box">
                        <img src={eventItem.imgurl} alt={eventItem.title} />
                      </div>
                    </div>
                  ))
                )} 
              </div>
            )}
          </div>

        </main>
      </div>
    </div>
  );
}