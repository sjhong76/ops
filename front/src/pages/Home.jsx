import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import bannerdata from "../bannerdata";
import instadata  from "../instadata";

import Product  from "../components/Product";
import Bancon   from "../components/Bancon";
import Instacon from "../components/Instacon";

const SLIDES = [1, 2, 3, 4];

function priceChange(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default function Home({ prdlist }) {
  const navigate = useNavigate();

  /* ── 메인 슬라이더 ── */
  const [index, setIndex] = useState(1);

  const prevHandler = () => setIndex((cur) => (cur === 1 ? 4 : cur - 1));
  const nextHandler = () => setIndex((cur) => (cur === 4 ? 1 : cur + 1));

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((cur) => (cur === 4 ? 1 : cur + 1));
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  /* ── MD Choice ── */
  const [qttval,   setQttval]   = useState(1);
  const [imgindex, setImgindex] = useState(1);
  const mdPrice = qttval * 8000;

  const downqttHandler = () => {
    if (qttval === 1) alert("최소 주문수량은 1개 입니다.");
    else setQttval((q) => q - 1);
  };
  const upqttHandler = () => setQttval((q) => q + 1);

  // 슬라이드 translateX 값 매핑
  const translateMap = { 1: "0%", 2: "-100%", 3: "-200%", 4: "-300%" };

  return (
    <div id="wrap">
      <div id="container">
        <main id="contents">

          {/* ──────────────────────────────────
              메인 슬라이더
          ────────────────────────────────── */}
          <div className="mainbanner relative">
            <div className="mainbannercontainer swipercontainer swipercontainerfade">
              <div className="mainbannerwrapper swiperwrapper" style={{ cursor: "pointer" }}>
                {SLIDES.map((n) => (
                  <div
                    key={n}
                    className={"mainbanneritem swiperslide " + (index === n ? "on" : "")}
                    style={{
                      width: "100%",
                      transform: `translate3d(${translateMap[n]}, 0px, 0px)`,
                      transition: "1s",
                    }}
                  >
                    <a><img src={`/img/sliderimg${n}.jpg`} alt={`slide${n}`} /></a>
                  </div>
                ))}

                <div className="mainbannernav mainbannernavprev" onClick={prevHandler}>
                  <img src="/img/prev.png" alt="prev" />
                </div>
                <div className="mainbannernav mainbannernavnext" onClick={nextHandler}>
                  <img src="/img/next.png" alt="next" />
                </div>

                <div className="mainbannerpager">
                  {SLIDES.map((n) => (
                    <span
                      key={n}
                      className={"swiperpaginationbullet " + (index === n ? "active" : "")}
                      onClick={() => setIndex(n)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ──────────────────────────────────
              서브 배너 3개
          ────────────────────────────────── */}
          <section className="subbanner section scrolleffect on">
            <div className="subbannercontainer">
              <div className="subbannerlist inline">
                {bannerdata.map((b, i) => (
                  <Bancon key={b.id} banner={b} i={i + 1} />
                ))}
              </div>
            </div>
          </section>

          {/* ──────────────────────────────────
              OPS Video
          ────────────────────────────────── */}
          <section className="section">
            <div className="maintitlewrap scrolleffect on">
              <div className="maintitle textcenter">OPS Video</div>
            </div>
            <div className="videowrap">
              <iframe
                width="1180"
                height="664"
                src="https://www.youtube.com/embed/aK1Eny1LRuo?si=uN_Opd0upkqLgUDU"
                title="[OPS] 맛과 영양을 함께 챙긴 건강간식 학원전"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              />
            </div>
          </section>

          {/* ──────────────────────────────────
              Best Sellers
          ────────────────────────────────── */}
          <section className="section ecbaseproduct">
            <div className="maintitlewrap scrolleffect on">
              <div className="mainsubtitle textcenter">이달의 베스트 아이템</div>
              <div className="maintitle textcenter">Best Sellers</div>
            </div>
            <div className="productcontainer scrolleffect on">
              <ul className="prdlist grid4">
                {prdlist.slice(0, 8).map((product) => (
                  <Product key={product.id} product={product} />
                ))}
              </ul>
            </div>
          </section>

          {/* ──────────────────────────────────
              New Arrivals
          ────────────────────────────────── */}
          <section className="section ecbaseproduct">
            <div className="maintitlewrap scrolleffect on">
              <div className="mainsubtitle textcenter">새로나온 신상품</div>
              <div className="maintitle textcenter">New Arrivals</div>
            </div>
            <div className="productcontainer scrolleffect on">
              <ul className="prdlist grid4">
                {prdlist.slice(8, 16).map((product) => (
                  <Product key={product.id} product={product} />
                ))}
              </ul>
            </div>
          </section>

          {/* ──────────────────────────────────
              MD Choice
          ────────────────────────────────── */}
          <div className="newproducts section relative">
            <div className="maintitlewrap scrolleffect on">
              <div className="mainsubtitle textcenter">이건 꼭 사야돼!</div>
              <div className="maintitle textcenter">MD Choice</div>
            </div>
            <div className="newproductcontent scrolleffect relative on">
              <div id="mainprddetail" className="xansproductdetail">
                <div className="detailarea flex flexvcenter">

                  {/* 이미지 영역 */}
                  <div className="imgarea">
                    <div className="prdimg">
                      <div className="thumbnail">
                        <a onClick={() => navigate("/detail/16")} style={{ cursor: "pointer" }}>
                          <img src={`/img/choice${imgindex}.jpg`} alt="MD Choice" />
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* 정보 영역 */}
                  <div className="infoarea">
                    <div className="mainoptcontent">
                      <div className="headingarea"><h1>뺑 드 세글</h1></div>
                      <div className="pricearea"><p>₩8,000</p></div>
                      <div id="totalproducts">
                        <table>
                          <colgroup>
                            <col style={{ width: "142px" }} />
                            <col style={{ width: "147px" }} />
                            <col style={{ width: "137px" }} />
                          </colgroup>
                          <tbody>
                            <tr>
                              <td>뺑 드 세글</td>
                              <td>
                                <span className="quantity">
                                  <input id="quantity" value={qttval} type="text" readOnly />
                                  <a className="up quantityup" onClick={upqttHandler}>수량증가</a>
                                  <a className="down quantitydown" onClick={downqttHandler}>수량감소</a>
                                </span>
                              </td>
                              <td className="right">
                                <span className="quantityprice">₩{priceChange(mdPrice)}</span>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div id="totalprice" className="totalprice">
                      <strong className="title">TOTAL</strong>
                      <span className="total">
                        <strong><em>₩{priceChange(mdPrice)}</em></strong> ({qttval}개)
                      </span>
                    </div>
                    <div className="productaction xansproductaction">
                      <div className="flex">
                        <a className="btnsubmit gfull sizel">
                          <span id="actionbuy">바로구매</span>
                        </a>
                        <span className="gactionbuttoncolumn">
                          <button type="button" className="btnnormal sizel actioncart">
                            <span>
                              <img src="/img/iconcart.svg" style={{ width: "15px", height: "15px" }} alt="cart" />
                            </span>
                          </button>
                          <button type="button" className="btnnormal sizel actionwish">
                            <span>
                              <img src="/img/heart.png" style={{ width: "14px", height: "14px" }} alt="wish" />
                            </span>
                          </button>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 썸네일 이미지 목록 */}
                <div className="listimg">
                  <div className="inner">
                    <ul className="list">
                      {[1, 2, 3, 4].map((n) => (
                        <li key={n} className="listitem">
                          <img
                            src={`/img/choice${n}.jpg`}
                            alt={`choice${n}`}
                            onMouseEnter={() => setImgindex(n)}
                            style={{ cursor: "pointer" }}
                          />
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ──────────────────────────────────
              Instagram
          ────────────────────────────────── */}
          <div className="instagram section sectionnomargin">
            <div className="maintitlewrap scrolleffect on">
              <div className="mainsubtitle textcenter">@opsbakery_</div>
              <div className="maintitle textcenter">instagram</div>
            </div>
            <div className="instagramfeed scrolleffect on">
              <div style={{ marginLeft: "-5px" }}>
                <ul className="mediagrid clearfix">
                  {instadata.map((item, i) => (
                    <Instacon key={i} insta={item} i={i + 1} />
                  ))}
                </ul>
              </div>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}
