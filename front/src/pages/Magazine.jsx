import { useState, useEffect } from "react";

const MAGAZINE_LIST = [
  {
    id: 1,
    img: "https://ops007.cafe24.com/web/upload/magazine/chatis_example/2024social_contribution.jpg",
    url: "https://ops.co.kr/board/lookbook/2024social_contribution.html",
    title: "2024 사회공헌",
  },
  {
    id: 2,
    img: "https://ops007.cafe24.com/web/upload/magazine/chatis_example/2024valentine.jpg",
    url: "https://ops.co.kr/board/lookbook/2024valentine.html",
    title: "2024 Valentine",
  },
  {
    id: 3,
    img: "https://ops007.cafe24.com/web/upload/magazine/chatis_example/2023christmas.jpg",
    url: "https://ops.co.kr/board/lookbook/2023christmas.html",
    title: "2023 Christmas",
  },
  {
    id: 4,
    img: "https://ops007.cafe24.com/web/upload/magazine/chatis_example/2023_cs_list.jpg",
    url: "https://ops.co.kr/board/lookbook/2023chuseok.html",
    title: "2023 추석",
  },
  {
    id: 5,
    img: "https://ops007.cafe24.com/web/upload/magazine/chatis_example/2023summer_list.jpg",
    url: "https://ops.co.kr/board/lookbook/2023summer.html",
    title: "2023 Summer",
  },
  {
    id: 6,
    img: "https://ops007.cafe24.com/web/upload/magazine/chatis_example/happybrunch_list.jpg",
    url: "https://ops.co.kr/board/lookbook/2023happybrunch.html",
    title: "Happy Brunch",
  },
  {
    id: 7,
    img: "https://ops007.cafe24.com/web/upload/magazine/chatis_example/2023bridalshower_list2.jpg",
    url: "https://ops.co.kr/board/lookbook/2023bridalshower.html",
    title: "2023 Bridal Shower",
  },
  {
    id: 8,
    img: "https://ops007.cafe24.com/web/upload/magazine/chatis_example/2023refreshments_list.jpg",
    url: "https://ops.co.kr/board/lookbook/2023refreshments.html",
    title: "2023 Refreshments",
  },
  {
    id: 9,
    img: "https://ops007.cafe24.com/web/upload/magazine/chatis_example/2023whtieday_list.jpg",
    url: "https://ops.co.kr/board/lookbook/2023whiteday.html",
    title: "2023 White Day",
  },
  {
    id: 10,
    img: "https://ops007.cafe24.com/web/upload/magazine/chatis_example/2023strawberry_list.jpg",
    url: "https://ops.co.kr/board/lookbook/2023strawberry.html",
    title: "2023 Strawberry",
  },
  {
    id: 11,
    img: "https://ops007.cafe24.com/web/upload/magazine/chatis_example/2023carrot_list.png",
    url: "https://ops.co.kr/board/lookbook/2023carrot.html",
    title: "2023 Carrot",
  },
  {
    id: 12,
    img: "https://ops007.cafe24.com/web/upload/magazine/chatis_example/2022christmas_list.jpg",
    url: "https://ops.co.kr/board/lookbook/2022christmas.html",
    title: "2022 Christmas",
  },
  {
    id: 13,
    img: "https://ops007.cafe24.com/web/upload/magazine/chatis_example/2022_suneung_list.jpg",
    url: "https://ops.co.kr/board/lookbook/2022suneung.html",
    title: "2022 수능",
  },
  {
    id: 14,
    img: "https://ops007.cafe24.com/web/upload/magazine/chatis_example/2022chuseok_list.jpg",
    url: "https://ops.co.kr/board/lookbook/2022chuseok.html",
    title: "2022 추석",
  },
  {
    id: 15,
    img: "https://ops007.cafe24.com/web/upload/magazine/chatis_example/2022_summerbest_list.jpg",
    url: "https://ops.co.kr/board/lookbook/2022summerbest.html",
    title: "2022 Summer Best",
  },
  {
    id: 16,
    img: "https://ops007.cafe24.com/web/upload/magazine/chatis_example/2022_hotelvacance_list.jpg",
    url: "https://ops.co.kr/board/lookbook/2022_hotelvacance.html",
    title: "2022 Hotel Vacance",
  },
  {
    id: 17,
    img: "https://ops007.cafe24.com/web/upload/magazine/chatis_example/2022_camping_list.jpg",
    url: "https://ops.co.kr/board/lookbook/2022camping.html",
    title: "2022 Camping",
  },
  {
    id: 18,
    img: "https://ops007.cafe24.com/web/upload/magazine/chatis_example/2022_happychildrensdayl_list.jpg",
    url: "https://ops.co.kr/board/lookbook/2022happychildrensday.html",
    title: "2022 어린이날",
  },
  {
    id: 19,
    img: "https://ops007.cafe24.com/web/upload/magazine/chatis_example/2022_picinicbasket_list0.jpg",
    url: "https://ops.co.kr/board/lookbook/2022picnicbasket.html",
    title: "2022 Picnic Basket",
  },
  {
    id: 20,
    img: "https://ops007.cafe24.com/web/upload/magazine/chatis_example/2022_beginschool_list.jpg",
    url: "https://ops.co.kr/board/lookbook/2022beginschool.html",
    title: "2022 개학",
  },
  {
    id: 21,
    img: "https://ops007.cafe24.com/web/upload/magazine/chatis_example/2022_strawberry_list.jpg",
    url: "https://ops.co.kr/board/lookbook/2022strawberry.html",
    title: "2022 Strawberry",
  },
  {
    id: 22,
    img: "https://ops007.cafe24.com/web/upload/magazine/chatis_example/galette_list.jpg",
    url: "https://ops.co.kr/board/lookbook/2022galette.html",
    title: "2022 Galette",
  },
  {
    id: 23,
    img: "https://ops007.cafe24.com/web/upload/magazine/chatis_example/2021christmas_list_m.jpg",
    url: "https://ops.co.kr/board/lookbook/2021christmas.html",
    title: "2021 Christmas",
  },
  {
    id: 24,
    img: "https://ops007.cafe24.com/web/upload/magazine/chatis_example/2021stollen_list.png",
    url: "https://ops.co.kr/board/lookbook/2021stollen.html",
    title: "2021 Stollen",
  },
  {
    id: 25,
    img: "https://ops007.cafe24.com/web/upload/magazine/chatis_example/2021tea_list.jpg",
    url: "https://ops.co.kr/board/lookbook/2021tea.html",
    title: "2021 Tea",
  },
  {
    id: 26,
    img: "https://ops007.cafe24.com/web/upload/magazine/chatis_example/2021chuseok_list.jpg",
    url: "https://ops.co.kr/board/lookbook/2020chuseok.html",
    title: "2021 추석",
  },
  {
    id: 27,
    img: "https://ops007.cafe24.com/web/upload/magazine/chatis_example/picnic_at_home_list.jpg",
    url: "https://ops.co.kr/board/lookbook/picnic_at_home.html",
    title: "Picnic at Home",
  },
  {
    id: 28,
    img: "https://ops007.cafe24.com/web/upload/magazine/chatis_example/apple_list.jpg",
    url: "https://ops.co.kr/board/lookbook/apple_magazine.html",
    title: "Apple",
  },
];

export default function Magazine() {
  const [loaded, setLoaded] = useState({});
  const [hovered, setHovered] = useState(null);

  const handleLoad = (id) => {
    setLoaded((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <div className="magazine-page">
      {/* ── 헤더 타이틀 영역 ── */}
      <div className="magazine-hero">
        <p className="magazine-sub">Saison de OPS</p>
        <h1 className="magazine-title">MAGAZINE</h1>
        <p className="magazine-desc">
          OPS의 계절과 이야기를 담은 매거진입니다.
        </p>
      </div>

      {/* ── 갤러리 그리드 ── */}
      <div className="magazine-grid">
        {MAGAZINE_LIST.map((item) => (
          <a
            key={item.id}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`magazine-card ${hovered === item.id ? "hovered" : ""}`}
            onMouseEnter={() => setHovered(item.id)}
            onMouseLeave={() => setHovered(null)}
          >
            <div className="magazine-img-wrap">
              {!loaded[item.id] && <div className="magazine-skeleton" />}
              <img
                src={item.img}
                alt={item.title}
                className={`magazine-img ${loaded[item.id] ? "visible" : ""}`}
                onLoad={() => handleLoad(item.id)}
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
              <div className="magazine-overlay">
                <span className="magazine-view-btn">VIEW →</span>
              </div>
            </div>
            <p className="magazine-card-title">{item.title}</p>
          </a>
        ))}
      </div>

      <style>{`
        .magazine-page {
          min-height: 100vh;
          padding-bottom: 80px;
          background: #faf9f7;
        }

        /* ── 히어로 ── */
        .magazine-hero {
          text-align: center;
          padding: 80px 20px 50px;
          border-bottom: 1px solid #e8e4de;
          margin-bottom: 50px;
        }
        .magazine-sub {
          font-size: 12px;
          letter-spacing: 4px;
          color: #b17a52;
          margin-bottom: 12px;
          text-transform: uppercase;
        }
        .magazine-title {
          font-size: 42px;
          font-weight: 300;
          letter-spacing: 10px;
          color: #1a1a1a;
          margin: 0 0 16px;
        }
        .magazine-desc {
          font-size: 13px;
          color: #888;
          letter-spacing: 1px;
        }

        /* ── 그리드 ── */
        .magazine-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 40px;
        }

        @media (max-width: 1024px) {
          .magazine-grid { grid-template-columns: repeat(3, 1fr); }
        }
        @media (max-width: 768px) {
          .magazine-grid { grid-template-columns: repeat(2, 1fr); padding: 0 20px; }
          .magazine-title { font-size: 28px; letter-spacing: 6px; }
        }
        @media (max-width: 480px) {
          .magazine-grid { grid-template-columns: repeat(1, 1fr); }
        }

        /* ── 카드 ── */
        .magazine-card {
          text-decoration: none;
          color: inherit;
          display: block;
          cursor: pointer;
        }

        .magazine-img-wrap {
          position: relative;
          overflow: hidden;
          aspect-ratio: 3 / 4;
          background: #ede9e3;
        }

        /* 스켈레톤 */
        .magazine-skeleton {
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, #ede9e3 25%, #e5e0d9 50%, #ede9e3 75%);
          background-size: 200% 100%;
          animation: shimmer 1.4s infinite;
        }
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        /* 이미지 */
        .magazine-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0;
          transition: opacity 0.4s ease, transform 0.5s ease;
        }
        .magazine-img.visible {
          opacity: 1;
        }
        .magazine-card:hover .magazine-img {
          transform: scale(1.05);
        }

        /* 오버레이 */
        .magazine-overlay {
          position: absolute;
          inset: 0;
          background: rgba(26, 26, 26, 0.45);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .magazine-card:hover .magazine-overlay {
          opacity: 1;
        }

        .magazine-view-btn {
          color: #fff;
          font-size: 12px;
          letter-spacing: 4px;
          border: 1px solid rgba(255,255,255,0.7);
          padding: 10px 20px;
        }

        /* 카드 타이틀 */
        .magazine-card-title {
          margin: 10px 0 0;
          font-size: 12px;
          letter-spacing: 1.5px;
          color: #555;
          text-align: center;
        }
      `}</style>
    </div>
  );
}
