import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { axiosGet } from "../utils/dataFetch.js"

const NOTICE_TAB = ["전체", "[이벤트]", "[매장]", "[배송]", "[공지]"]

const COMMUNITY_MENUS = [
  { label: "NOTICE",       path: "/community/notice",   catKey: "notice" },
  { label: "OPS MAGAZINE", path: "/community/magazine", catKey: "magazine" },
  { label: "Q&A",          path: "/community/q&a",      catKey: "q&a" },
  { label: "매장안내",     path: "/community/guide",    catKey: "guide" },
  { label: "FAQ",          path: "/community/faq",      catKey: "faq" },
  { label: "EVENT",        path: "/community/event",    catKey: "event" }
];

const STORE_LIST = [
  { id: 1,  name: "W 옵스 드마히니",   addr: "부산 남구 분포로 145 스퀘어동 2층 2022호",         tel: "051.621.8118", hours: "10:00 - 22:00", holiday: "명절 휴무", img: "https://m.ops.co.kr/file_data/ops007/gallery/2021/03/26/cf815203c79ab8daf820d7b57f0e784d.jpg" },
  { id: 2,  name: "타임빌라스 수원점", addr: "경기도 수원시 권선구 세화로 134 타임빌라스 수원점 2층", tel: "031.8066.1790", hours: "10:30 - 22:00", holiday: "연중무휴",  img: "https://m.ops.co.kr/file_data/ops007/gallery/2020/04/07/01551daa7fc3c07cb0bdc239f7c0c56f.jpg" },
  { id: 3,  name: "인천 롯데점",       addr: "인천 미추홀구 연남로 35 롯데백화점 인천터미널점 지하1층", tel: "032.242.2037", hours: "평일 10:30-20:00 | 금,토,일 10:30-20:30", holiday: "명절·백화점 휴무일", img: "https://m.ops.co.kr/file_data/ops007/gallery/2020/04/01/4a2976a54cdff97f7a06a2ee750a013f.JPG" },
  { id: 4,  name: "양산점",            addr: "경상남도 양산시 물금읍 야리로 45",                  tel: "055.363.1818", hours: "08:00 - 22:00", holiday: "명절 휴무", img: "https://m.ops.co.kr/file_data/ops007/gallery/2020/04/07/17c1e60a8b9a41ebf016c0b96ea7d3bf.jpg" },
  { id: 5,  name: "서면 롯데점",       addr: "부산 부산진구 가야대로 772 롯데백화점 부산본점 지하1층", tel: "051.810.3018", hours: "평일 10:30-20:00 | 주말 10:30-20:30", holiday: "명절·백화점 휴무일", img: "https://m.ops.co.kr/file_data/ops007/gallery/2020/04/01/236c6b1ee2306aa1a8b52b10042400a6.JPG" },
  { id: 6,  name: "소공 롯데점",       addr: "서울특별시 중구 남대문로 81 롯데백화점 본점 지하1층",  tel: "02.726.4217",  hours: "평일 10:30-20:00 | 주말 10:30-20:30", holiday: "명절·백화점 휴무일", img: "https://m.ops.co.kr/file_data/ops007/gallery/2020/04/01/30fa1300cd62bff7d73e8131cb2a1fc8.JPG" },
  { id: 7,  name: "울산 롯데점",       addr: "울산 남구 삼산로 282 롯데백화점 울산점 지하1층",      tel: "052.960.4780", hours: "평일 10:30-20:00 | 금,토,일 10:30-20:30", holiday: "명절·백화점 휴무일", img: "https://m.ops.co.kr/file_data/ops007/gallery/2021/09/17/195ba491fa9a52f98a8fdd7d5df07b17.jpg" },
  { id: 8,  name: "광복 롯데점",       addr: "부산 중구 중앙대로 2 롯데백화점 광복점 지하1층",      tel: "051.678.3053", hours: "평일 10:30-20:00 | 주말 10:30-20:30", holiday: "명절·백화점 휴무일", img: "https://m.ops.co.kr/file_data/ops007/gallery/2020/04/01/15be806b5da9d954e29ae4b59a33b887.JPG" },
  { id: 9,  name: "구서점",            addr: "부산 금정구 금강로 477 구서골드2상가 105호",          tel: "051.581.7070", hours: "08:00 - 22:00", holiday: "명절 휴무", img: "https://m.ops.co.kr/file_data/ops007/gallery/2020/04/07/9eefb94a8681183fd16ebeb52f29cba3.jpg" },
  { id: 10, name: "엘지점",            addr: "부산 남구 분포로 113 메트로시티상가",                 tel: "051.612.1970", hours: "08:00 - 23:00", holiday: "명절 휴무", img: "https://m.ops.co.kr/file_data/ops007/gallery/2020/09/16/6972b8da2f333477a31a6c41c530b66a.JPG" },
  { id: 11, name: "마린시티점",        addr: "부산 해운대구 마린시티1로 167",                       tel: "051.743.1950", hours: "08:00 - 22:00", holiday: "명절 휴무", img: "https://m.ops.co.kr/file_data/ops007/gallery/2020/04/07/4c340a36b58ad913f291cbc6ef010567.JPG" },
  { id: 12, name: "신도시점",          addr: "부산 해운대구 좌동순환로 237",                        tel: "051.704.2088", hours: "08:00 - 22:00", holiday: "명절 휴무", img: "https://m.ops.co.kr/file_data/ops007/gallery/2020/04/01/7707e9f868ddaa2af5d820279a66b70e.jpg" },
  { id: 13, name: "해운대점",          addr: "부산 해운대구 중동1로 31",                            tel: "051.747.6886", hours: "08:00 - 22:00", holiday: "명절 휴무", img: "https://m.ops.co.kr/file_data/ops007/gallery/2020/04/07/d08e960b099e47dd0e90991751faa154.jpg" },
  { id: 14, name: "남천점",            addr: "부산 수영구 황령대로489번길 37",                      tel: "051.625.4300", hours: "08:00 - 22:00", holiday: "명절 휴무", img: "https://m.ops.co.kr/file_data/ops007/gallery/2021/03/26/a7f5ac76a5be6d35cf4c17b725baa11c.jpg" },
];

const FAQ_LIST = [
  {
    category: "쿠폰/적립금",
    items: [
      { q: "적립금은 어떻게 쌓을 수 있나요?", a: "적립금은 주문결제 및 이벤트 참여 시에 쌓을 수 있습니다. 주문결제 적립금은 실결제금액에 고객등급별 적립율(WELCOME 0.5%, FRIEND 1%, FAMILY 2%, VIP 3%, RVIP 5%)을 곱한 금액으로 지급됩니다." },
      { q: "적립금 유효기간이 있나요?", a: "적립금의 유효기간은 발급일로부터 12개월이며, 유효기간이 적게 남은 적립금부터 자동으로 사용됩니다. 주문 시 지급된 적립금은 주문취소 및 환불 시 차감됩니다." },
      { q: "적립금 유효기간은 어떻게 확인하나요?", a: "적립금의 유효기간은 별도로 확인하실 수 없으나, 금액별 적립내용과 적립일자는 마이페이지 > 적립금 > 적립내역에서 확인 가능합니다." },
      { q: "쿠폰은 어떻게 적용하나요?", a: "주문서의 [할인/부가결제] 섹션 중 쿠폰 칸에서 [쿠폰 적용] 버튼을 눌러 조회하신 후 [적용] 버튼을 누르시면 됩니다. 한 주문 건에 적립금과 쿠폰을 동시에 사용할 수 없는 경우가 있으니 유의 바랍니다." },
      { q: "주문취소/반품 후 사용했던 적립금/쿠폰은 어떻게 되나요?", a: "주문을 취소하신 경우 쿠폰 또는 적립금은 자동으로 복원됩니다. 단, 해당 주문건 구매 시 적립되었던 구매적립금은 주문 취소 처리와 함께 차감됩니다." },
    ]
  },
  {
    category: "주문/결제",
    items: [
      { q: "주문하지 않았는데 주문완료 문자가 왔어요.", a: "상품을 주문하신 고객님이 핸드폰 번호를 잘못 입력하시어 발송되는 경우가 있습니다. 또는 지인분께서 선물하실 경우 수령자 번호로 배송완료 메시지가 발송될 수 있습니다. 자세한 사항은 고객센터(1588-3069)로 문의해주세요." },
      { q: "적립금은 어떻게 적용하나요?", a: "주문서의 [할인/부가결제] 섹션 중 적립금 칸에 1원 단위로 적용이 가능합니다. 보유 적립금 확인 후, 사용하실 적립금을 입력해주시면 됩니다. 한 주문건에 적립금과 쿠폰을 동시에 사용할 수 없는 경우가 있으니 유의 바랍니다." },
    ]
  },
  {
    category: "취소/교환/반품",
    items: [
      { q: "교환/반품 기준이 어떻게 되나요?", a: "베이커리 상품의 특성상 단순 변심으로 인한 반품은 불가합니다. 단, 제품의 하자나 당사의 착오가 있을 시 상품을 받은 날로부터 2일 이내에 문제된 부분을 확인할 수 있는 사진과 함께 카카오톡/네이버톡톡을 통해 문의를 접수해 주시면 신속한 처리를 도와드리겠습니다." },
      { q: "교환/반품 시 배송비가 부과되나요?", a: "베이커리 상품 특성상 단순 변심에 의한 교환/반품은 불가합니다. 판매자 과실(배송중 파손, 상세 정보와 다른 경우, 다른 상품 배송)로 인한 경우에는 배송비를 판매자가 부담합니다." },
      { q: "교환/반품 접수 시 사진을 첨부해야 하나요?", a: "상품의 하자 등의 사유로 교환 또는 반품을 신청하시는 경우, 카카오톡/네이버 톡톡 문의를 통해 해당 사항을 확인할 수 있는 사진을 첨부해주셔야 합니다." },
      { q: "반품 후 카드취소가 아직 안 됐어요.", a: "카드 환불의 경우 카드사 사정에 따라 환불 접수일로부터 영업일 기준 3~7일 정도 소요될 수 있습니다. 7일 이후에도 환불이 되지 않은 경우에는 고객센터(1588-3069)로 연락주시기 바랍니다." },
    ]
  },
];

const EVENT_LIST = [
  { id: 1,  title: "2026 병오년 이벤트",              date: "2025-12-31", status: "진행중",   img: "https://m.ops.co.kr/file_data/ops007/gallery/2025/12/31/7a02b699999b9ec9aa817cd79dd8e8d2.jpg", url: "https://m.ops.co.kr/board/gallery/read.html?no=27274&board_no=8" },
  { id: 2,  title: "구운과자 랜덤 증정",               date: "2025-07-28", status: "진행중",   img: "https://m.ops.co.kr/file_data/ops007/gallery/2025/07/28/6d648dea938ed712e9761a15a15874c2.jpg", url: "https://m.ops.co.kr/board/gallery/read.html?no=16940&board_no=8" },
  { id: 3,  title: "3월 새학기 이벤트",               date: "2025-02-27", status: "진행중",   img: "https://m.ops.co.kr/file_data/ops007/gallery/2025/02/27/a0e9cfe37e5979ecf1104cf078cd7391.jpg", url: "https://m.ops.co.kr/board/gallery/read.html?no=13643&board_no=8" },
  { id: 4,  title: "퓨어롤 출시 구매 인증 이벤트",    date: "2024-10-10", status: "진행중",   img: "https://m.ops.co.kr/file_data/ops007/gallery/2024/10/10/9609ade1cc55e4234ec75a4c758a835a.jpg", url: "https://m.ops.co.kr/board/gallery/read.html?no=13021&board_no=8" },
  { id: 5,  title: "퓨어롤 출시 리그램 이벤트",       date: "2024-10-04", status: "진행중",   img: "https://m.ops.co.kr/file_data/ops007/gallery/2024/10/04/1d324993a6237c8bd562519dc8db896d.jpg", url: "https://m.ops.co.kr/board/gallery/read.html?no=13006&board_no=8" },
  { id: 6,  title: "수능 D-100 행운의 상자 오픈",     date: "2024-08-02", status: "진행중",   img: "https://m.ops.co.kr/file_data/ops007/gallery/2024/08/02/7c406b647b1a0676ce6cefc50cabe4df.jpg", url: "https://m.ops.co.kr/board/gallery/read.html?no=12707&board_no=8" },
  { id: 7,  title: "열대야 행운룰렛",                 date: "2024-07-15", status: "진행중",   img: "https://m.ops.co.kr/file_data/ops007/gallery/2024/07/15/b7c0dd70a95a9ef26e33d027c8cc29ba.jpg", url: "https://m.ops.co.kr/board/gallery/read.html?no=12639&board_no=8" },
  { id: 8,  title: "2026 수능 응원 댓글",             date: "2025-10-13", status: "종료",     img: "https://m.ops.co.kr/file_data/ops007/gallery/2025/10/14/8c49e54f7f8df8f656fd1fb03fcaec84.jpg", url: "https://m.ops.co.kr/board/gallery/read.html?no=27127&board_no=8" },
  { id: 9,  title: "가정의 달 5월, 5.5",              date: "2025-04-30", status: "종료",     img: "https://m.ops.co.kr/file_data/ops007/gallery/2025/04/30/423a63acf2c20c30e63ac5fff3e03fe4.jpg", url: "https://m.ops.co.kr/board/gallery/read.html?no=13883&board_no=8" },
  { id: 10, title: "4월 럭키데이",                    date: "2025-04-01", status: "종료",     img: "https://m.ops.co.kr/file_data/ops007/gallery/2025/04/01/b48a469a2d3024619c7ba6b53eb0dfa6.jpg", url: "https://m.ops.co.kr/board/gallery/read.html?no=13766&board_no=8" },
  { id: 11, title: "만우절 특집 거짓말 콘테스트",     date: "2025-03-19", status: "종료",     img: "https://m.ops.co.kr/file_data/ops007/gallery/2025/03/19/c51c848a7c31d529899cdb16cc3ab946.jpg", url: "https://m.ops.co.kr/board/gallery/read.html?no=13718&board_no=8" },
  { id: 12, title: "소원을 말해봐",                   date: "2024-12-06", status: "종료",     img: "https://m.ops.co.kr/file_data/ops007/gallery/2024/12/06/06b463c0e53170ade1f7125360e4dabb.jpg", url: "https://m.ops.co.kr/board/gallery/read.html?no=13279&board_no=8" },
];

export default function Community({ prdlist, category = "community" }) {
  
  const [noticeTab, setNoticeTab] = useState("전체")
  const [notice, setNotice] = useState([])
  const [event, setEvent] = useState([])
  const [loading, setLoading] = useState(false)
  const { isLoggedIn, userId, role } = useSelector((state) => state.user)

  // Q&A 더미데이터
  const [qnaList, setQnaList] = useState([
    { id: 1, user_id: "hong***", title: "빵 주문 후 교환이 가능한가요?", content: "빵을 주문했는데 다른 제품으로 교환이 가능한지 궁금합니다.", answer: "안녕하세요! 상품 수령 후 2일 이내에 고객센터(1588-3069)로 연락주시면 교환 도와드리겠습니다.", created_at: "2024-03-10" },
    { id: 2, user_id: "kim***", title: "선물 포장 서비스 있나요?", content: "선물용으로 구매하려고 하는데 포장 서비스가 있는지 궁금합니다.", answer: null, created_at: "2024-03-12" },
    { id: 3, user_id: "lee***", title: "배송 기간이 얼마나 걸리나요?", content: "주문 후 보통 며칠 내에 받을 수 있는지 알고 싶습니다.", answer: "평균 2~3 영업일 내에 배송됩니다. 주말/공휴일은 제외됩니다.", created_at: "2024-03-15" },
    { id: 4, user_id: "park***", title: "케이크 주문 시 문구 넣을 수 있나요?", content: "생일 케이크에 이름이나 문구를 넣을 수 있는지 문의드립니다.", answer: null, created_at: "2024-03-18" },
  ])
  const [qnaOpen, setQnaOpen] = useState(null)
  const [faqOpen, setFaqOpen] = useState(null)
  const [eventFilter, setEventFilter] = useState('전체')
  const [showForm, setShowForm] = useState(false)
  const [qnaTitle, setQnaTitle] = useState("")
  const [qnaContent, setQnaContent] = useState("")

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


  }, [category])

  const handleQnaSubmit = () => {
    if (!qnaTitle.trim() || !qnaContent.trim()) return alert("제목과 내용을 입력해주세요.")
    const newItem = {
      id: Date.now(),
      user_id: userId || "익명",
      title: qnaTitle,
      content: qnaContent,
      answer: null,
      created_at: new Date().toISOString().slice(0, 10)
    }
    setQnaList((prev) => [newItem, ...prev])
    setQnaTitle(""); setQnaContent(""); setShowForm(false)
  }

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
            {category === "q&a" && (
              <div className="qna-board">
                <div className="qna-header">
                  <h2 className="qna-title-text">Q&amp;A</h2>
                  {isLoggedIn && (
                    <button className="qna-write-btn" onClick={() => setShowForm(!showForm)}>
                      {showForm ? "닫기" : "질문하기"}
                    </button>
                  )}
                </div>

                {/* 질문 작성 폼 */}
                {showForm && (
                  <div className="qna-form">
                    <input
                      className="qna-input"
                      placeholder="제목을 입력해주세요"
                      value={qnaTitle}
                      onChange={(e) => setQnaTitle(e.target.value)}
                    />
                    <textarea
                      className="qna-textarea"
                      placeholder="문의 내용을 입력해주세요"
                      value={qnaContent}
                      onChange={(e) => setQnaContent(e.target.value)}
                    />
                    <button className="qna-submit-btn" onClick={handleQnaSubmit}>등록</button>
                  </div>
                )}

                {/* Q&A 목록 */}
                {loading ? (
                  <div className="qna-empty">로딩 중...</div>
                ) : qnaList.length === 0 ? (
                  <div className="qna-empty">등록된 Q&amp;A가 없습니다.</div>
                ) : (
                  <div className="qna-list">
                    {qnaList.map((item) => (
                      <div key={item.id} className="qna-item">
                        {/* 질문 행 */}
                        <div className="qna-row" onClick={() => setQnaOpen(qnaOpen === item.id ? null : item.id)}>
                          <span className={`qna-badge ${item.answer ? "answered" : "waiting"}`}>
                            {item.answer ? "답변완료" : "답변대기"}
                          </span>
                          <span className="qna-item-title">{item.title}</span>
                          <span className="qna-item-user">{item.user_id}</span>
                          <span className="qna-arrow">{qnaOpen === item.id ? "▲" : "▼"}</span>
                        </div>

                        {/* 펼쳐진 내용 */}
                        {qnaOpen === item.id && (
                          <div className="qna-detail">
                            <div className="qna-question-box">
                              <span className="qna-q-label">Q</span>
                              <p>{item.content}</p>
                            </div>
                            {item.answer ? (
                              <div className="qna-answer-box">
                                <span className="qna-a-label">A</span>
                                <p>{item.answer}</p>
                              </div>
                            ) : (
                              role === "admin" && (
                                <div className="qna-no-answer">아직 답변이 등록되지 않았습니다.</div>
                              )
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                <style>{`
                  .qna-board { max-width: 900px; margin: 0 auto; padding: 0 20px 60px; }
                  .qna-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
                  .qna-title-text { font-size: 22px; font-weight: bold; letter-spacing: 0.5px; }
                  .qna-write-btn { background: #1a1a1a; color: #fff; border: none; padding: 8px 18px; font-size: 13px; cursor: pointer; letter-spacing: 1px; }
                  .qna-write-btn:hover { background: #b17a52; }

                  .qna-form { background: #faf9f7; border: 1px solid #e5e0d9; padding: 20px; margin-bottom: 24px; display: flex; flex-direction: column; gap: 10px; }
                  .qna-input { border: 1px solid #ddd; padding: 10px 14px; font-size: 14px; outline: none; }
                  .qna-textarea { border: 1px solid #ddd; padding: 10px 14px; font-size: 14px; outline: none; min-height: 100px; resize: vertical; }
                  .qna-submit-btn { background: #b17a52; color: #fff; border: none; padding: 10px 20px; font-size: 13px; cursor: pointer; align-self: flex-end; }
                  .qna-submit-btn:hover { background: #8f5e38; }

                  .qna-empty { text-align: center; padding: 40px; color: #999; font-size: 14px; }

                  .qna-list { border-top: 2px solid #1a1a1a; }
                  .qna-item { border-bottom: 1px solid #e5e0d9; }
                  .qna-row { display: flex; align-items: center; gap: 12px; padding: 16px 10px; cursor: pointer; }
                  .qna-row:hover { background: #faf9f7; }
                  .qna-badge { font-size: 11px; padding: 3px 8px; border-radius: 2px; white-space: nowrap; font-weight: bold; }
                  .qna-badge.answered { background: #1a1a1a; color: #fff; }
                  .qna-badge.waiting  { background: #f0ebe4; color: #888; }
                  .qna-item-title { flex: 1; font-size: 14px; color: #222; }
                  .qna-item-user { font-size: 12px; color: #999; }
                  .qna-arrow { font-size: 11px; color: #aaa; }

                  .qna-detail { background: #faf9f7; padding: 20px 24px; display: flex; flex-direction: column; gap: 14px; }
                  .qna-question-box, .qna-answer-box { display: flex; gap: 16px; align-items: flex-start; }
                  .qna-q-label { font-size: 18px; font-weight: bold; color: #b17a52; min-width: 24px; }
                  .qna-a-label { font-size: 18px; font-weight: bold; color: #1a1a1a; min-width: 24px; }
                  .qna-question-box p, .qna-answer-box p { font-size: 14px; color: #444; line-height: 1.7; margin: 0; }
                  .qna-admin-answer { display: flex; flex-direction: column; gap: 8px; }
                  .qna-no-answer { font-size: 13px; color: #aaa; padding: 10px 0; }
                `}</style>
              </div>
            )}
            {category === "guide" && (
              <div className="guide-board">
                <div className="guide-title-wrap">
                  <h2 className="guide-title">매장안내</h2>
                  <p className="guide-sub">전국 OPS 오프라인 매장을 안내해드립니다.</p>
                </div>
                <div className="guide-grid">
                  {STORE_LIST.map((store) => (
                    <div key={store.id} className="guide-card">
                      <div className="guide-img-wrap">
                        <img src={store.img} alt={store.name} className="guide-img"
                          onError={(e) => { e.target.style.display = "none" }} />
                      </div>
                      <div className="guide-info">
                        <h3 className="guide-name">{store.name}</h3>
                        <ul className="guide-detail">
                          <li><span className="guide-label">주소</span><span>{store.addr}</span></li>
                          <li><span className="guide-label">전화</span><span>{store.tel}</span></li>
                          <li><span className="guide-label">영업</span><span>{store.hours}</span></li>
                          <li><span className="guide-label">휴무</span><span>{store.holiday}</span></li>
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
                <style>{`
                  .guide-board { max-width: 1100px; margin: 0 auto; padding: 0 20px 60px; }
                  .guide-title-wrap { text-align: center; margin-bottom: 40px; }
                  .guide-title { font-size: 22px; font-weight: bold; letter-spacing: 0.5px; margin-bottom: 8px; }
                  .guide-sub { font-size: 13px; color: #999; }
                  .guide-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 30px; }
                  @media (max-width: 768px) { .guide-grid { grid-template-columns: 1fr; } }
                  .guide-card { display: flex; gap: 20px; border-bottom: 1px solid #e5e0d9; padding-bottom: 24px; }
                  .guide-img-wrap { width: 140px; min-width: 140px; height: 110px; overflow: hidden; background: #f0ebe4; flex-shrink: 0; }
                  .guide-img { width: 100%; height: 100%; object-fit: cover; }
                  .guide-info { flex: 1; }
                  .guide-name { font-size: 15px; font-weight: bold; color: #1a1a1a; margin-bottom: 10px; letter-spacing: 0.3px; }
                  .guide-detail { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 4px; }
                  .guide-detail li { display: flex; gap: 10px; font-size: 12px; color: #555; line-height: 1.5; }
                  .guide-label { color: #b17a52; font-weight: bold; min-width: 28px; flex-shrink: 0; }
                `}</style>
              </div>
            )}
            {category === "faq" && (
              <div className="faq-board">
                <div className="faq-title-wrap">
                  <h2 className="faq-title">FAQ</h2>
                  <p className="faq-sub">자주 묻는 질문을 확인해보세요.</p>
                </div>
                {FAQ_LIST.map((group) => (
                  <div key={group.category} className="faq-group">
                    <div className="faq-category-label">{group.category}</div>
                    {group.items.map((item, idx) => {
                      const key = `${group.category}-${idx}`
                      const isOpen = faqOpen === key
                      return (
                        <div key={key} className="faq-item">
                          <div className="faq-question" onClick={() => setFaqOpen(isOpen ? null : key)}>
                            <span className="faq-q-icon">Q</span>
                            <span className="faq-q-text">{item.q}</span>
                            <span className="faq-arrow">{isOpen ? "▲" : "▼"}</span>
                          </div>
                          {isOpen && (
                            <div className="faq-answer">
                              <span className="faq-a-icon">A</span>
                              <p>{item.a}</p>
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                ))}
                <style>{`
                  .faq-board { max-width: 900px; margin: 0 auto; padding: 0 20px 60px; }
                  .faq-title-wrap { text-align: center; margin-bottom: 40px; }
                  .faq-title { font-size: 22px; font-weight: bold; letter-spacing: 0.5px; margin-bottom: 8px; }
                  .faq-sub { font-size: 13px; color: #999; }
                  .faq-group { margin-bottom: 32px; }
                  .faq-category-label { font-size: 12px; font-weight: bold; letter-spacing: 2px; color: #b17a52; border-bottom: 2px solid #1a1a1a; padding-bottom: 10px; margin-bottom: 0; }
                  .faq-item { border-bottom: 1px solid #e5e0d9; }
                  .faq-question { display: flex; align-items: center; gap: 12px; padding: 16px 10px; cursor: pointer; }
                  .faq-question:hover { background: #faf9f7; }
                  .faq-q-icon { font-size: 15px; font-weight: bold; color: #b17a52; min-width: 20px; }
                  .faq-q-text { flex: 1; font-size: 14px; color: #222; }
                  .faq-arrow { font-size: 11px; color: #aaa; }
                  .faq-answer { display: flex; gap: 12px; background: #faf9f7; padding: 16px 20px; align-items: flex-start; }
                  .faq-a-icon { font-size: 15px; font-weight: bold; color: #1a1a1a; min-width: 20px; }
                  .faq-answer p { font-size: 13px; color: #555; line-height: 1.8; margin: 0; }
                `}</style>
              </div>
            )}
            
            {category === "event" && (
              <div className="event-board">
                <div className="event-title-wrap">
                  <h2 className="event-title">EVENT</h2>
                  <p className="event-sub">OPS의 다양한 이벤트를 만나보세요.</p>
                </div>
                <div className="event-filter-wrap">
                  {["전체", "진행중", "종료"].map((f) => (
                    <button
                      key={f}
                      className={`event-filter-btn ${eventFilter === f ? "active" : ""}`}
                      onClick={() => setEventFilter(f)}
                    >{f}</button>
                  ))}
                </div>
                <div className="event-grid">
                  {EVENT_LIST.filter(e => eventFilter === "전체" || e.status === eventFilter).map((item) => (
                    <a key={item.id} href={item.url} target="_blank" rel="noopener noreferrer" className="event-card">
                      <div className="event-img-wrap">
                        <img src={item.img} alt={item.title} className="event-img"
                          onError={(e) => { e.target.style.display = "none" }} />
                        <span className={`event-badge ${item.status === "진행중" ? "on" : "off"}`}>
                          {item.status}
                        </span>
                      </div>
                      <div className="event-info">
                        <p className="event-card-title">{item.title}</p>
                        <p className="event-card-date">{item.date}</p>
                      </div>
                    </a>
                  ))}
                </div>
                <style>{`
                  .event-board { max-width: 1100px; margin: 0 auto; padding: 0 20px 60px; }
                  .event-title-wrap { text-align: center; margin-bottom: 30px; }
                  .event-title { font-size: 22px; font-weight: bold; letter-spacing: 0.5px; margin-bottom: 8px; }
                  .event-sub { font-size: 13px; color: #999; }
                  .event-filter-wrap { display: flex; gap: 8px; margin-bottom: 28px; justify-content: center; }
                  .event-filter-btn { border: 1px solid #ddd; background: #fff; padding: 6px 18px; font-size: 13px; cursor: pointer; color: #888; }
                  .event-filter-btn.active { background: #1a1a1a; color: #fff; border-color: #1a1a1a; }
                  .event-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
                  @media (max-width: 768px) { .event-grid { grid-template-columns: repeat(2, 1fr); } }
                  .event-card { text-decoration: none; color: inherit; display: block; }
                  .event-img-wrap { position: relative; aspect-ratio: 4/3; overflow: hidden; background: #f0ebe4; }
                  .event-img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.3s; }
                  .event-card:hover .event-img { transform: scale(1.04); }
                  .event-badge { position: absolute; top: 10px; left: 10px; font-size: 11px; font-weight: bold; padding: 3px 8px; }
                  .event-badge.on  { background: #b17a52; color: #fff; }
                  .event-badge.off { background: rgba(0,0,0,0.45); color: #fff; }
                  .event-info { padding: 10px 2px 0; }
                  .event-card-title { font-size: 14px; color: #222; margin-bottom: 4px; font-weight: 500; }
                  .event-card-date  { font-size: 12px; color: #aaa; }
                `}</style>
              </div>
            )}
          </div>

        </main>
      </div>
    </div>
  );
}