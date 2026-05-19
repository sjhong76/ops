import "./App.css";
import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

import data from "./data/products";
import Detail from "./pages/Detail";
import instadata from "./instadata";
import bannerdata from "./bannerdata";
import Cart from "./pages/Cart";
import ShopList from "./pages/ShopList";

function App() {
  let [res1, setRes1] = useState([
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
  ]);

  // 최상단으로 가기
  const Ceiling = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // 헤더
  let navigate = useNavigate();

  let [sswitch, setSswitch] = useState(false);

  // 슬라이더
  const [index, setIndex] = useState(1);

  if (index == 5) {
    setIndex(1);
  }

  const prevHandler = () => {
    if (index === 1) {
      setIndex(4);
    } else {
      setIndex(index - 1);
    }
  };

  const nextHandler = () => {
    if (index === 4) {
      setIndex(1);
    } else {
      setIndex(index + 1);
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((currentIndex) => {
        if (currentIndex === 4) {
          return 1;
        } else {
          return currentIndex + 1;
        }
      });
    }, 4000);

    return () => {
      clearInterval(timer);
    };
  }, [index]);

  // 배너 3개
  let [banner] = useState(bannerdata);

  // 상품
  let [prdlist, setPrdlist] = useState(data);

  // MD 초이스
  const [qttval, setQttval] = useState(1);
  const price1 = qttval * 8000;

  function priceChange(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const lastprice = "₩" + priceChange(price1);

  const downqttHandler = () => {
    if (qttval == 1) {
      alert("최소 주문수량은 1개 입니다.");
    } else {
      setQttval(qttval - 1);
    }
  };

  const upqttHandler = () => {
    setQttval(qttval + 1);
  };

  const [imgindex, setImgindex] = useState(1);

  const imgindexHandler1 = () => {
    setImgindex(1);
  };

  const imgindexHandler2 = () => {
    setImgindex(2);
  };

  const imgindexHandler3 = () => {
    setImgindex(3);
  };

  const imgindexHandler4 = () => {
    setImgindex(4);
  };

  // 인스타
  let [insta] = useState(instadata);

  // 푸터
  const [listshow, setListshow] = useState(false);

  return (
    <div className="App">
      <>
        <body>
          <header className="header relative">
            <div className="headerwrap fixed">
              <div className="container flex flexvcenter">
                <div>
                  <ul className="flex">
                    <li className="categoryitem">
                      <a
                        className="categorylink"
                        onClick={() => {
                          navigate("/About");
                        }}
                      >
                        ABOUT US
                      </a>
                    </li>
                    <li className="categoryitem">
                      <a
                        className="categorylink"
                        onClick={() => {
                          navigate("/shop/bread");
                        }}
                      >
                        SHOP
                      </a>
                      <div className="subcategory">
                        <ul className="subcategorylist">
                          <li className="subcategoryitem">
                            <a
                              className="subcategorylink"
                              onClick={() => {
                                navigate("/shop/bread");
                              }}
                            >
                              빵
                            </a>
                          </li>
                          <li className="subcategoryitem">
                            <a
                              className="subcategorylink"
                              onClick={() => {
                                navigate("/shop/cookie");
                              }}
                            >
                              쿠키
                            </a>
                          </li>
                          <li className="subcategoryitem">
                            <a
                              className="subcategorylink"
                              onClick={() => {
                                navigate("/shop/chocolate");
                              }}
                            >
                              초콜렛
                            </a>
                          </li>
                          <li className="subcategoryitem">
                            <a
                              className="subcategorylink"
                              onClick={() => {
                                navigate("/shop/gift");
                              }}
                            >
                              선물세트
                            </a>
                          </li>
                          <li className="subcategoryitem">
                            <a
                              className="subcategorylink"
                              onClick={() => {
                                navigate("/shop/cake");
                              }}
                            >
                              케이크
                            </a>
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li className="categoryitem">
                      <a
                        className="categorylink"
                        onClick={() => {
                          navigate("/Login");
                        }}
                      >
                        COMMUNITY
                      </a>
                      <div className="subcategory">
                        <ul className="subcategorylist">
                          <li className="subcategoryitem">
                            <a
                              className="subcategorylink"
                              onClick={() => {
                                navigate("/Login");
                              }}
                            >
                              NOTICE
                            </a>
                          </li>
                          <li className="subcategoryitem">
                            <a
                              className="subcategorylink"
                              onClick={() => {
                                navigate("/Login");
                              }}
                            >
                              REVIEWS
                            </a>
                          </li>
                          <li className="subcategoryitem">
                            <a
                              className="subcategorylink"
                              onClick={() => {
                                navigate("/Login");
                              }}
                            >
                              Q&A
                            </a>
                          </li>
                          <li className="subcategoryitem">
                            <a
                              className="subcategorylink"
                              onClick={() => {
                                navigate("/Login");
                              }}
                            >
                              매장안내
                            </a>
                          </li>
                          <li className="subcategoryitem">
                            <a
                              className="subcategorylink"
                              onClick={() => {
                                navigate("/Login");
                              }}
                            >
                              RVIP 전용
                            </a>
                          </li>
                          <li className="subcategoryitem">
                            <a
                              className="subcategorylink"
                              onClick={() => {
                                navigate("/Login");
                              }}
                            >
                              FAQ
                            </a>
                          </li>
                          <li className="subcategoryitem">
                            <a
                              className="subcategorylink"
                              onClick={() => {
                                navigate("/Login");
                              }}
                            >
                              EVENT
                            </a>
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li className="categoryitem">
                      <a
                        className="categorylink"
                        onClick={() => {
                          navigate("/Member");
                        }}
                      >
                        MEMBERSHIP
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="toplogo">
                  <a
                    className="toplogolink flex flexvcenter flexhcenter"
                    onClick={() => {
                      navigate("/");
                    }}
                  >
                    <img src="../img/logo.png"></img>
                  </a>
                </div>
                <div className="rightmenu flex flexvcenter">
                  <div>
                    <a
                      className="usermenulink"
                      onClick={() => {
                        navigate("/Login");
                      }}
                    >
                      Login{" "}
                    </a>
                    <span className="slash">/ </span>
                    <a
                      className="usermenulink"
                      onClick={() => {
                        navigate("/Join");
                      }}
                    >
                      {" "}
                      Join{" "}
                    </a>
                  </div>
                  <div className="iconmenu flex flexvcenter">
                    <a
                      className="iconmenuitem"
                      onClick={() => {
                        setSswitch(true);
                      }}
                    >
                      <img
                        src="../img/search.png"
                        style={{ width: "18px", height: "18px" }}
                      ></img>
                    </a>
                    <a
                      className="iconmenuitem"
                      onClick={() => {
                        navigate("/Login");
                      }}
                    >
                      <img
                        src="../img/heart.png"
                        style={{ width: "18px", height: "18px" }}
                      ></img>
                    </a>
                    <a
                      className="iconmenuitem"
                      onClick={() => {
                        navigate("/Cart");
                      }}
                    >
                      <img
                        src="../img/cart.png"
                        style={{ width: "20px", height: "20px" }}
                      ></img>
                    </a>
                  </div>
                </div>
              </div>
              {/* 서치 박스 */}
              <div className={"search " + (sswitch == true ? "on" : null)}>
                <div className="container">
                  <div className="searchform relative flex flexvcenter">
                    <fieldset className="searchfield">
                      <input
                        id="keyword"
                        name="keyword"
                        type="text"
                        placeholder="무엇을 찾아드릴까요?"
                        className="searchinput"
                      ></input>
                    </fieldset>
                    <span
                      className="searchclose"
                      onClick={() => setSswitch(false)}
                    >
                      <img src="../img/close.png"></img>
                    </span>
                  </div>
                </div>
              </div>
              <div
                className={"searchbg " + (sswitch == true ? "on" : null)}
              ></div>
            </div>
          </header>

          <Routes>
            <Route
              path="/"
              element={
                <div>
                  <div id="wrap">
                    <div id="container">
                      <main id="contents">
                        {/* 슬라이더 */}
                        <div className="mainbanner relative">
                          <div className="mainbannercontainer swipercontainer swipercontainerfade">
                            <div
                              className="mainbannerwrapper swiperwrapper"
                              style={{ cursor: "pointer" }}
                            >
                              <div
                                className={
                                  "mainbanneritem swiperslide " +
                                  (index == 1 ? "on" : null)
                                }
                                style={{
                                  width: "100%",
                                  transform: "translate3d(0px, 0px, 0px)",
                                  transition: "1s",
                                }}
                              >
                                <a>
                                  <img src="../img/sliderimg1.jpg" />
                                </a>
                              </div>
                              <div
                                className={
                                  "mainbanneritem swiperslide " +
                                  (index == 2 ? "on" : null)
                                }
                                style={{
                                  width: "100%",
                                  transform: "translate3d(-100%, 0px, 0px)",
                                  transition: "1s",
                                }}
                              >
                                <a>
                                  <img src="../img/sliderimg2.jpg" />
                                </a>
                              </div>
                              <div
                                className={
                                  "mainbanneritem swiperslide " +
                                  (index == 3 ? "on" : null)
                                }
                                style={{
                                  width: "100%",
                                  transform: "translate3d(-200%, 0px, 0px)",
                                  transition: "1s",
                                }}
                              >
                                <a>
                                  <img src="../img/sliderimg3.jpg" />
                                </a>
                              </div>
                              <div
                                className={
                                  "mainbanneritem swiperslide " +
                                  (index == 4 ? "on" : null)
                                }
                                style={{
                                  width: "100%",
                                  transform: "translate3d(-300%, 0px, 0px)",
                                  transition: "1s",
                                }}
                              >
                                <a>
                                  <img src="../img/sliderimg4.jpg" />
                                </a>
                              </div>
                              <div
                                className="mainbannernav mainbannernavprev"
                                onClick={prevHandler}
                              >
                                <img src="../img/prev.png" />
                              </div>
                              <div
                                className="mainbannernav mainbannernavnext"
                                onClick={nextHandler}
                              >
                                <img src="../img/next.png" />
                              </div>
                              <div className="mainbannerpager">
                                <span
                                  className={
                                    "swiperpaginationbullet " +
                                    (index == 1 ? "active" : null)
                                  }
                                  onClick={() => {
                                    setIndex(1);
                                  }}
                                ></span>
                                <span
                                  className={
                                    "swiperpaginationbullet " +
                                    (index == 2 ? "active" : null)
                                  }
                                  onClick={() => {
                                    setIndex(2);
                                  }}
                                ></span>
                                <span
                                  className={
                                    "swiperpaginationbullet " +
                                    (index == 3 ? "active" : null)
                                  }
                                  onClick={() => {
                                    setIndex(3);
                                  }}
                                ></span>
                                <span
                                  className={
                                    "swiperpaginationbullet " +
                                    (index == 4 ? "active" : null)
                                  }
                                  onClick={() => {
                                    setIndex(4);
                                  }}
                                ></span>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* 배너 3개 */}
                        <section className="subbanner section scrolleffect on">
                          <div className="subbannercontainer">
                            <div className="subbannerlist inline">
                              {banner.map((a, i) => {
                                return <Bancon banner={banner[i]} i={i + 1} />;
                              })}
                            </div>
                          </div>
                        </section>
                        {/* 비디오 */}
                        <section className="section">
                          <div className="maintitlewrap scrolleffect on">
                            <div className="maintitle textcenter">
                              OPS Video
                            </div>
                          </div>
                          <div className="videowrap">
                            <a>
                              <iframe
                                width="1180"
                                height="664"
                                src="https://www.youtube.com/embed/aK1Eny1LRuo?si=uN_Opd0upkqLgUDU"
                                title="[OPS] 맛과 영양을 함께 챙긴 건강간식 학원전"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                              ></iframe>
                            </a>
                          </div>
                        </section>
                        {/* 베스트셀러 */}
                        <section className="section ecbaseproduct">
                          <div className="maintitlewrap scrolleffect on">
                            <div className="mainsubtitle textcenter">
                              이달의 베스트 아이템
                            </div>
                            <div className="maintitle textcenter">
                              Best Sellers
                            </div>
                          </div>
                          <div className="productcontainer scrolleffect on">
                            <ul className="prdlist grid4">
                              {prdlist.slice(0, 8).map((a, i) => {
                                return (
                                  <Product
                                    prdlist={prdlist[i]}
                                    res1={res1}
                                    i={i + 1}
                                  />
                                );
                              })}
                            </ul>
                          </div>
                        </section>
                        {/* 신상품 */}
                        <section className="section ecbaseproduct">
                          <div className="maintitlewrap scrolleffect on">
                            <div className="mainsubtitle textcenter">
                              새로나온 신상품
                            </div>
                            <div className="maintitle textcenter">
                              New Arrivals
                            </div>
                          </div>
                          <div className="productcontainer scrolleffect on">
                            <ul className="prdlist grid4">
                              {prdlist.slice(8, 16).map((a, i) => {
                                return (
                                  <Product
                                    prdlist={prdlist[i + 8]}
                                    res1={res1}
                                    i={i + 9}
                                  />
                                );
                              })}
                            </ul>
                          </div>
                        </section>
                        {/* MD 초이스 */}
                        <div className="newproducts section relative">
                          <div className="maintitlewrap scrolleffect on">
                            <div className="mainsubtitle textcenter">
                              이건 꼭 사야돼!
                            </div>
                            <div className="maintitle textcenter">
                              MD Choice
                            </div>
                          </div>
                          <div className="newproductcontent scrolleffect relative on">
                            <div
                              id="mainprddetail"
                              className="xansproductdetail"
                            >
                              <div className="detailarea flex flexvcenter">
                                <div className="imgarea">
                                  <div className="prdimg">
                                    <div className="thumbnail">
                                      <a
                                        onClick={() => {
                                          navigate("/detail/16");
                                        }}
                                      >
                                        <img
                                          src={
                                            "../img/choice" + imgindex + ".jpg"
                                          }
                                        />
                                      </a>
                                    </div>
                                  </div>
                                </div>
                                <div className="infoarea">
                                  <div className="mainoptcontent">
                                    <div className="headingarea">
                                      <h1>뺑 드 세글</h1>
                                    </div>
                                    <div className="pricearea">
                                      <p>₩8,000</p>
                                    </div>
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
                                                <input
                                                  id="quantity"
                                                  value={qttval}
                                                  type="text"
                                                ></input>
                                                <a
                                                  className="up quantityup"
                                                  onClick={upqttHandler}
                                                >
                                                  수량증가
                                                </a>
                                                <a
                                                  className="down quantitydown"
                                                  onClick={downqttHandler}
                                                >
                                                  수량감소
                                                </a>
                                              </span>
                                            </td>
                                            <td className="right">
                                              <span className="quantityprice">
                                                {lastprice}
                                              </span>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </div>
                                  </div>
                                  <div id="totalprice" className="totalprice">
                                    <strong className="title">TOTAL</strong>
                                    <span className="total">
                                      <strong>
                                        <em>{lastprice}</em>
                                      </strong>{" "}
                                      ({qttval}개)
                                    </span>
                                  </div>
                                  <div className="productaction xansproductaction">
                                    <div className="flex">
                                      <a className="btnsubmit gfull sizel">
                                        <span id="actionbuy">바로구매</span>
                                      </a>
                                      <span className="gactionbuttoncolumn">
                                        <button
                                          type="button"
                                          className="btnnormal sizel actioncart"
                                        >
                                          <span>
                                            <img
                                              src="../img/iconcart.svg"
                                              style={{
                                                width: "15px",
                                                height: "15px",
                                              }}
                                            />
                                          </span>
                                        </button>
                                        <button
                                          type="button"
                                          className="btnnormal sizel actionwish"
                                        >
                                          <span>
                                            <img
                                              src="../img/heart.png"
                                              style={{
                                                width: "14px",
                                                height: "14px",
                                              }}
                                            />
                                          </span>
                                        </button>
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="listimg">
                                <div className="inner">
                                  <ul className="list">
                                    <li className="listitem">
                                      <img
                                        src="../img/choice1.jpg"
                                        onMouseEnter={imgindexHandler1}
                                      />
                                    </li>
                                    <li className="listitem">
                                      <img
                                        src="../img/choice2.jpg"
                                        onMouseEnter={imgindexHandler2}
                                      />
                                    </li>
                                    <li className="listitem">
                                      <img
                                        src="../img/choice3.jpg"
                                        onMouseEnter={imgindexHandler3}
                                      />
                                    </li>
                                    <li className="listitem">
                                      <img
                                        src="../img/choice4.jpg"
                                        onMouseEnter={imgindexHandler4}
                                      />
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* 인스타 */}
                        <div className="instagram section sectionnomargin">
                          <div className="maintitlewrap scrolleffect on">
                            <div className="mainsubtitle textcenter">
                              @opsbakery_
                            </div>
                            <div className="maintitle textcenter">
                              instagram
                            </div>
                          </div>
                          <div className="instagramfeed scrolleffect on">
                            <div style={{ marginLeft: "-5px" }}>
                              <ul className="mediagrid clearfix">
                                {insta.map((a, i) => {
                                  return (
                                    <Instacon insta={insta[i]} i={i + 1} />
                                  );
                                })}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </main>
                    </div>
                  </div>
                </div>
              }
            />

            <Route path="/shop" element={<ShopList prdlist={prdlist} category="전체" />} />
            <Route path="/shop/bread" element={<ShopList prdlist={prdlist} category="빵" />} />
            <Route path="/shop/cookie" element={<ShopList prdlist={prdlist} category="쿠키" />} />
            <Route path="/shop/chocolate" element={<ShopList prdlist={prdlist} category="초콜렛" />} />
            <Route path="/shop/gift" element={<ShopList prdlist={prdlist} category="선물세트" />} />
            <Route path="/shop/cake" element={<ShopList prdlist={prdlist} category="케이크" />} />

            <Route path="/detail/:id" element={<Detail prdlist={prdlist} />} />

            <Route path="/cart" element={<Cart />} />

            <Route path="/About" element={<About />}>
              <Route path="member" element={<div>멤버</div>} />
              <Route path="location" element={<div>위치</div>} />
            </Route>

            <Route path="/Member" element={<Member />} />

            <Route path="/Login" element={<Login />} />

            <Route path="/Join" element={<Join />} />
          </Routes>

          <footer className="footer">
            <div className="footerinner">
              <div className="container containerfooter clearfix">
                <div className="footerleft pullleft">
                  <div className="footerlogo">
                    <a>
                      <img src="../img/logo.png" />
                    </a>
                  </div>
                  <p className="footertxt">
                    Copyright © OPS(옵스) .All rights reserved.
                  </p>
                  <div
                    className="policy relative"
                    onMouseEnter={() => {
                      setListshow(true);
                    }}
                    onMouseLeave={() => {
                      setListshow(false);
                    }}
                  >
                    <a className="policyabout">About</a>
                    <ul
                      className={
                        "policylist " + (listshow == true ? "on" : null)
                      }
                    >
                      <li className="policyitem">
                        <a className="policylink">Privacy policy</a>
                      </li>
                      <li className="policyitem">
                        <a className="policylink">Agreement</a>
                      </li>
                      <li className="policyitem">
                        <a className="policylink">Guide</a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="footerright pullright clearfix">
                  <div className="footercolumn pullleft">
                    <div className="footertitle">Customer center</div>
                    <p className="footertxt">1588. 3069</p>
                    <p className="footertxt">AM 09:30 - PM 05:30</p>
                  </div>
                  <div className="footercolumn pullleft">
                    <div className="footertitle">Company info</div>
                    <p className="footertxt">상호명 : 옵스(OPS)</p>
                    <p className="footertxt">대표 : 김상용</p>
                    <p className="footertxt">
                      주소 : 부산광역시 남구 신선로 201 (감만동) 1동
                    </p>
                    <p className="footertxt">사업자 등록번호 : 617-81-25278</p>
                    <p className="footertxt">
                      통신판매신고번호 : 제 2014-부산남구-6호
                    </p>
                    <p className="footertxt">이메일 : MALL@OPS.CO.KR</p>
                  </div>
                  <div className="footercolumn pullleft">
                    <div className="footertitle">Shop menu</div>
                    <ul className="footernav">
                      <li>
                        <a className="footerlink footertxt">Notice</a>
                      </li>
                      <li>
                        <a className="footerlink footertxt">My page</a>
                      </li>
                      <li>
                        <a className="footerlink footertxt">Q&A</a>
                      </li>
                      <li>
                        <a className="footerlink footertxt">FAQ</a>
                      </li>
                    </ul>
                  </div>
                  <div className="footercolumn pullleft">
                    <div className="footertitle">Follow us</div>
                    <ul className="footernav">
                      <li>
                        <a className="footerlink footertxt">Instagram</a>
                      </li>
                      <li>
                        <a className="footerlink footertxt">Youtube</a>
                      </li>
                      <li>
                        <a className="footerlink footertxt">Smartstore</a>
                      </li>
                      <li>
                        <a className="footerlink footertxt">Facebook</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </footer>

          <div className="scrollbtn relative flex flexvcenter flexhcenter on">
            <img src="../img/up.png" onClick={Ceiling} />
          </div>
        </body>
      </>
    </div>
  );
}

function Bancon(props) {
  let navigate = useNavigate();

  return (
    <>
      <div
        className="subbanneritem relative"
        onClick={() => {
          navigate("/shop/cake");
        }}
      >
        <a>
          <img src={"../img/banner" + props.i + ".jpg"}></img>
          <div className="subbannertxt">
            <div className="subbannertitle">{props.banner.title}</div>
            <div className="subbannerdesc">{props.banner.content}</div>
          </div>
        </a>
      </div>
    </>
  );
}

function Product(props) {
  const prices = props.prdlist.price;

  let navigate = useNavigate();

  function priceChange(number) {
    return prices.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const lastprice = "₩" + priceChange(prices);

  return (
    <>
      <li
        className="slideprditem swiperslide1"
        onClick={() => {
          navigate("/detail/" + props.res1[props.i - 1]);
        }}
      >
        <div className="thumbnail">
          <a>
            <img src={props.prdlist.imgurl} />
          </a>
          <div className="iconbox">
            <span className="cart">
              <img src="" />
            </span>
          </div>
        </div>
        <div className="description">
          <a>
            <strong className="name">
              <span
                style={{
                  fontSize: "13px",
                  color: "#555555",
                  fontWeight: "bold",
                }}
              >
                {props.prdlist.title}
              </span>
            </strong>
            <ul className="spec">
              <li className="productprice">
                <span style={{ fontSize: "13px", color: "#555555" }}>
                  {lastprice}
                </span>
              </li>
            </ul>
            <div className="icon">
              <img src={props.prdlist.icon} />
            </div>
          </a>
        </div>
      </li>
    </>
  );
}

function Instacon(props) {
  return (
    <>
      <li className="medialistitem noborder" style={{ width: "25%" }}>
        <div className="mediaimagewrapper" style={{ margin: "0 0 5px 5px" }}>
          <div className="thumbnailwrapper">
            <a className="thumbnail hovercaption">
              <figure className="thumbnailimage">
                <img
                  src={"../img/insta" + props.i + ".png"}
                  className="objectfit"
                />
                <div className="captionoverlay">
                  <div className="captiondetails">
                    <div className="longcaption">{props.insta.content}</div>
                  </div>
                </div>
              </figure>
            </a>
          </div>
        </div>
      </li>
    </>
  );
}

function About() {
  let [fade, setFade] = useState("");

  useEffect(() => {
    setFade("end");
    return () => {
      setFade("");
    };
  }, []);

  return (
    <>
      <div id="container" className={"start " + fade}>
        <div id="contents" className="blanktop blankbottom">
          <div className="titlearea">
            <h2>About OPS</h2>
          </div>
          <div className="mallcenter">
            <div className="img">
              <img src="../img/company.jpg" style={{ marginTop: "100px" }} />
            </div>
          </div>
        </div>
      </div>

      <Outlet></Outlet>
    </>
  );
}

function Member() {
  let [fade, setFade] = useState("");

  useEffect(() => {
    setFade("end");
    return () => {
      setFade("");
    };
  }, []);

  return (
    <>
      <div id="container" className={"start " + fade}>
        <div id="contents" className="blanktop blankbottom">
          <div className="titlearea">
            <h2>Membership</h2>
          </div>
          <div className="mallcenter">
            <div className="img">
              <img src="../img/membership.jpg" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function ShopBread(props) {
  let [fade, setFade] = useState("");
  let navigate = useNavigate();

  useEffect(() => {
    setFade("end");
    return () => {
      setFade("");
    };
  }, []);

  const breadList = props.prdlist
    .filter((item) => item.category === "빵")
    .map((item, index) => ({
      ...item,
      review: [12, 16, 46, 24, 9, 31, 18, 7, 22, 13][index] || 5,
    }));

  function priceChange(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  return (
    <>
      <div id="container" className={"start " + fade}>
        <div id="contents" className="blanktop blankbottom">
          <div className="titlearea shop-titlearea">
            <h2>Bread</h2>
            <p>OPS의 대표 빵 상품을 만나보세요.</p>
          </div>

          <div className="shop-bread-wrap">
            <ul className="shop-bread-grid">
              {breadList.map((item) => (
                <li
                  key={item.id}
                  className="shop-bread-card"
                  onClick={() => {
                    navigate("/detail/" + item.id);
                  }}
                >
                  <div className="shop-bread-thumb">
                    <img src={item.imgurl} alt={item.title} />
                    <span className="shop-cart-icon">
                      <img src="../img/iconcart.svg" alt="cart" />
                    </span>
                  </div>
                  <div className="shop-bread-info">
                    <strong>{item.title}</strong>
                    <p>{priceChange(item.price)}원</p>
                    <div className="shop-review">
                      REVIEWS <span>{item.review}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

function Join() {
  let [fade, setFade] = useState("");
  let [step, setStep] = useState(1);
  let navigate = useNavigate();

  useEffect(() => {
    setFade("end");
    return () => {
      setFade("");
    };
  }, []);

  return (
    <>
      <div id="container" className={"start " + fade}>
        <div id="contents" className="blanktop blankbottom join-contents">
          <div className="titlearea">
            <h2>회원가입</h2>
          </div>

          <div className="join-step">
            <div className={step === 1 ? "active" : ""}>약관동의</div>
            <div className={step === 2 ? "active" : ""}>정보입력</div>
            <div className={step === 3 ? "active" : ""}>가입완료</div>
          </div>

          {step === 1 && (
            <div className="join-box">
              <h3>전체 동의</h3>
              <label className="join-check"><input type="checkbox" /> 이용약관 동의 필수</label>
              <div className="join-terms">제1조 목적<br />이 약관은 OPS 온라인몰 서비스 이용과 관련하여 회사와 이용자의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.</div>
              <label className="join-check"><input type="checkbox" /> 개인정보처리방침 동의 필수</label>
              <div className="join-terms">개인정보 수집 및 이용 목적<br />회원가입, 주문, 배송, 고객상담, 서비스 제공을 위해 개인정보를 수집합니다.</div>
              <label className="join-check"><input type="checkbox" /> 쇼핑정보 수신 동의 선택</label>
              <div className="join-btns"><button onClick={() => setStep(2)} className="join-main-btn">다음</button><button onClick={() => navigate("/")} className="join-sub-btn">취소</button></div>
            </div>
          )}

          {step === 2 && (
            <div className="join-box">
              <h3>회원인증</h3>
              <div className="join-radio"><label><input type="radio" name="memberType" defaultChecked /> 개인회원</label><label><input type="radio" name="memberType" /> 사업자회원</label><label><input type="radio" name="memberType" /> 외국인회원</label></div>
              <h3>기본정보</h3>
              <div className="join-form-row"><label>아이디 *</label><div className="join-with-btn"><input type="text" /><button>중복확인</button></div></div>
              <div className="join-form-row"><label>비밀번호 *</label><input type="password" /></div>
              <div className="join-form-row"><label>비밀번호 확인 *</label><input type="password" /></div>
              <div className="join-form-row"><label>이름 *</label><input type="text" /></div>
              <div className="join-form-row"><label>주소 *</label><div className="join-with-btn"><input type="text" placeholder="우편번호" /><button>우편번호</button></div><input type="text" placeholder="기본주소" /><input type="text" placeholder="상세주소" /></div>
              <div className="join-form-row"><label>휴대전화 *</label><div className="join-phone"><select defaultValue="010"><option>010</option><option>011</option><option>016</option></select><input type="text" /><input type="text" /><button>인증번호받기</button></div></div>
              <div className="join-form-row"><label>이메일 *</label><div className="join-with-btn"><input type="email" /><button>중복확인</button></div></div>
              <h3>추가정보</h3>
              <div className="join-form-row"><label>성별</label><div className="join-radio"><label><input type="radio" name="gender" /> 남자</label><label><input type="radio" name="gender" /> 여자</label></div></div>
              <div className="join-form-row"><label>생년월일 *</label><div className="join-birth"><label><input type="radio" name="calendar" defaultChecked /> 양력</label><label><input type="radio" name="calendar" /> 음력</label><input type="text" placeholder="년" /><input type="text" placeholder="월" /><input type="text" placeholder="일" /></div></div>
              <div className="join-form-row"><label>지역</label><select><option>선택</option><option>서울</option><option>부산</option><option>대구</option><option>인천</option></select></div>
              <div className="join-btns"><button onClick={() => setStep(3)} className="join-main-btn">회원가입</button><button onClick={() => navigate("/")} className="join-sub-btn">취소</button></div>
            </div>
          )}

          {step === 3 && (
            <div className="join-box join-complete">
              <h3>회원가입이 완료되었습니다.</h3>
              <p>OPS 회원이 되신 것을 환영합니다.</p>
              <button onClick={() => navigate("/Login")} className="join-main-btn">로그인하기</button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function Login() {
  let [fade, setFade] = useState("");

  useEffect(() => {
    setFade("end");
    return () => {
      setFade("");
    };
  }, []);

  return (
    <>
      <>
        <div id="container" className={"start " + fade}>
          <div id="contents" className="blanktop blankbottom">
            <div className="titlearea">
              <h2>Login</h2>
            </div>
            <form>
              <div>
                <div className="login">
                  <fieldset className="form">
                    <div className="id">
                      <input
                        id="memberid"
                        name="memberid"
                        placeholder="아이디"
                        type="text"
                      ></input>
                    </div>
                    <div className="password">
                      <input
                        id="memberpasswd"
                        name="memberpasswd"
                        placeholder="Password"
                        type="password"
                      ></input>
                    </div>
                    <p className="loginsecurity">
                      <input
                        id="memberchecksaveid0"
                        name="checksaveid"
                        type="checkbox"
                        value="T"
                        style={{ marginTop: "3px" }}
                      ></input>
                      <label>아이디 저장</label>
                      <span className="secret">보안접속</span>
                    </p>
                    <div className="loginbutton">
                      <a className="btnsubmit gfull sizel">로그인</a>
                    </div>
                    <ul className="loginutill">
                      <li>
                        <a>아이디 찾기</a>
                      </li>
                      <li>
                        <a>비밀번호찾기</a>
                      </li>
                      <li>
                        <a>비밀번호찾기</a>
                      </li>
                    </ul>
                  </fieldset>
                </div>
              </div>
            </form>
          </div>
        </div>
      </>
    </>
  );
}

export default App;
