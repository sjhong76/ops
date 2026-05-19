import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItem } from "../store";

function Detail(props) {
  let { id } = useParams();

  const selProduct = props.prdlist.find((x) => x.id === Number(id));
  let dispatch = useDispatch();

  let navigate = useNavigate();

  const productprice = Number(selProduct?.price);
  const [qttval, setQttval] = useState(1);
  const price1 = qttval * productprice;

  function priceChange(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const lastprice = priceChange(price1);
  const lastprice2 = priceChange(productprice);

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

  let [detailselect1, setDetailselect1] = useState(false);
  let [detailselect2, setDetailselect2] = useState(false);
  let [detailselect3, setDetailselect3] = useState(false);

  let [fade, setFade] = useState("");

  useEffect(() => {
    setFade("end");
    return () => {
      setFade("");
    };
  }, []);

  let [basketlayer, setBasketlayer] = useState(false);

  const cartHandler = () => {
    dispatch(
      addItem({
        id: selProduct?.id || 0,
        imgurl: selProduct?.imgurl
          ? selProduct.imgurl.replace("img/", "")
          : "",
        name: selProduct?.title || "",
        count: qttval,
        ogprice: productprice,
        price: price1,
      })
    )
  }

  console.log(qttval)



  return (
    <>
      <div id="wrap" className={"start " + fade}>
        <div id="container">
          <main id="contents2">
            <div
              className={
                "xansproductbasketadd ecbaselayer " +
                (basketlayer == true ? "on" : null)
              }
            >
              <div className="header">
                <h3>ADD BASKET</h3>
              </div>
              <div className="content">
                <img src="../img/img_basket.png" />
                <p>장바구니에 상품이 정상적으로 담겼습니다.</p>
              </div>
              <div className="ecbasebutton">
                <a
                  className="tinybutton01"
                  onClick={() => {
                    navigate("/Cart");
                  }}
                >
                  장바구니 이동
                </a>
                <a
                  className="tinybutton03"
                  onClick={() => setBasketlayer(false)}
                >
                  쇼핑계속하기
                </a>
              </div>
              <a className="close" onClick={() => setBasketlayer(false)}>
                <img src="../img/btn_close.gif" />
              </a>
            </div>
            <div className="path">
              <ol>
                <li>
                  <a href="/">홈</a>
                </li>
                <li>
                  <a>{selProduct?.category}</a>
                </li>
              </ol>
            </div>
            <div className="xansproductdetail">
              <div className="imgarea">
                <div className="clearfix">
                  <div className="prdimg">
                    <div className="thumbnail swipercontainer">
                      <ul className="swiperwrapper">
                        <li className="swiperslide2">
                          <img src={selProduct?.imgurl}></img>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="infoarea">
                <div className="mainoptcontent">
                  <div className="headingarea">
                    <h1>{selProduct?.title}</h1>
                  </div>
                  <div className="pricearea">
                    <p>₩{lastprice2}</p>
                  </div>
                  <table>
                    <tbody style={{ display: "block" }}>
                      <tr>
                        <th>
                          <span className="purchasedetail">유통기한</span>
                        </th>
                        <td>
                          <span className="purchasedetail">
                            {selProduct?.edate}
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <th>
                          <span className="purchasedetail">보관방법</span>
                        </th>
                        <td>
                          <span className="purchasedetail">
                            {selProduct?.smethod}
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <th>
                          <span className="purchasedetail">배송비</span>
                        </th>
                        <td>
                          <span className="purchasedetail">
                            {" "}
                            3,000원 (30,000원 이상 구매 시 무료)
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div id="totalproducts">
                    <table>
                      <colgroup>
                        <col style={{ width: "142px" }} />
                        <col style={{ width: "147px" }} />
                        <col style={{ width: "137px" }} />
                      </colgroup>
                      <tbody>
                        <tr>
                          <td>{selProduct?.title}</td>
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
                            <span className="quantityprice">₩{lastprice}</span>
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
                      <em>₩{lastprice}</em>
                    </strong>{" "}
                    ({qttval}개)
                  </span>
                </div>
                <div className="productaction xansproductaction">
                  <div className="flex">
                    <a
                      className="btnsubmit gfull sizel"
                      onClick={() => {
                        cartHandler();
                        navigate("/Cart");
                      }}
                    >
                      <span id="actionbuy">바로구매</span>
                    </a>
                    <span className="gactionbuttoncolumn">
                      <button
                        type="button"
                        className="btnnormal sizel actioncart"
                        onClick={() => {
                          cartHandler();
                          setBasketlayer(true);
                        }}
                      >
                        <span>
                          <img
                            src="../img/iconcart.svg"
                            style={{ width: "15px", height: "15px" }}
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
                            style={{ width: "14px", height: "14px" }}
                          />
                        </span>
                      </button>
                    </span>
                  </div>
                </div>
              </div>
              <div className="xansproductadditional">
                <div className="additionalinner">
                  <div id="prdDetail" className="productdetail tabcontent">
                    <div>
                      <div style={{ textAlign: "center" }}>
                        <img
                          src="../img/products_detail1.jpg"
                          className="descimg"
                        />
                        <img
                          src={
                            "../img/product" + (Number(id) + 1) + "_detail1.jpg"
                          }
                          className=""
                        />
                        <img
                          src={
                            "../img/product" + (Number(id) + 1) + "_detail2.jpg"
                          }
                          className="descimg"
                        />
                        <img
                          src="../img/products_detail2.png"
                          className="descimg"
                        />
                      </div>
                    </div>
                  </div>
                  <div id="purchaseinfo">
                    <div
                      className={
                        "ecbasefold " +
                        (detailselect1 == true ? "selected" : null)
                      }
                      onClick={() => {
                        setDetailselect1(!detailselect1);
                      }}
                    >
                      <div className="title">
                        <h2>상품결제정보</h2>
                      </div>
                      <div className="contents">
                        <div className="info">
                          고액결제의 경우 안전을 위해 카드사에서 확인전화를 드릴
                          수도 있습니다. 확인과정에서 도난 카드의 사용이나 타인
                          명의의 주문등 정상적인 주문이 아니라고 판단될 경우
                          임의로 주문을 보류 또는 취소할 수 있습니다.
                        </div>
                      </div>
                    </div>
                    <div
                      className={
                        "ecbasefold " +
                        (detailselect2 == true ? "selected" : null)
                      }
                      onClick={() => {
                        setDetailselect2(!detailselect2);
                      }}
                    >
                      <div className="title">
                        <h2>픽업안내</h2>
                      </div>
                      <div className="contents">
                        <div className="info">
                          발송일 지정을 원하시는 경우 주문 즉시 쇼핑몰
                          Q&A게시판(말머리: 배송일예약)에 문의를 남겨주세요.
                          배송메시지 또는 메시지카드 란에 발송일 요청 시 반영이
                          어렵습니다.
                        </div>
                      </div>
                    </div>
                    <div
                      className={
                        "ecbasefold " +
                        (detailselect3 == true ? "selected" : null)
                      }
                      onClick={() => {
                        setDetailselect3(!detailselect3);
                      }}
                    >
                      <div className="title">
                        <h2>교환 및 반품정보</h2>
                      </div>
                      <div className="contents">
                        <div className="info">
                          <strong>교환 및 반품이 가능한 경우</strong>
                          <br />
                          - 상품을 공급 받으신 날로부터 7일이내 단, 가전제품의
                          <br />
                          &nbsp;&nbsp;경우 포장을 개봉하였거나 포장이 훼손되어
                          상품가치가 상실된 경우에는 교환/반품이 불가능합니다.
                          <br />
                          - 공급받으신 상품 및 용역의 내용이 표시.광고 내용과
                          <br />
                          &nbsp;&nbsp;다르거나 다르게 이행된 경우에는 공급받은
                          날로부터 3월이내, 그사실을 알게 된 날로부터 30일이내
                          <br />
                          <br />
                          <strong>교환 및 반품이 불가능한 경우</strong>
                          <br />
                          - 고객님의 책임 있는 사유로 상품등이 멸실 또는 훼손된
                          경우. 단, 상품의 내용을 확인하기 위하여
                          <br />
                          &nbsp;&nbsp;포장 등을 훼손한 경우는 제외
                          <br />
                          - 포장을 개봉하였거나 포장이 훼손되어 상품가치가
                          상실된 경우
                          <br />
                          &nbsp;&nbsp;(예 : 가전제품, 식품, 음반 등, 단
                          액정화면이 부착된 노트북, LCD모니터, 디지털 카메라
                          등의 불량화소에
                          <br />
                          &nbsp;&nbsp;따른 반품/교환은 제조사 기준에 따릅니다.)
                          <br />- 고객님의 사용 또는 일부 소비에 의하여 상품의
                          가치가 현저히 감소한 경우 단, 화장품등의 경우
                          시용제품을 <br />
                          &nbsp;&nbsp;제공한 경우에 한 합니다.
                          <br />
                          - 시간의 경과에 의하여 재판매가 곤란할 정도로 상품등의
                          가치가 현저히 감소한 경우
                          <br />
                          - 복제가 가능한 상품등의 포장을 훼손한 경우
                          <br />
                          &nbsp;&nbsp;(자세한 내용은 고객만족센터 1:1
                          E-MAIL상담을 이용해 주시기 바랍니다.)
                          <br />
                          <br />
                          ※ 고객님의 마음이 바뀌어 교환, 반품을 하실 경우
                          상품반송 비용은 고객님께서 부담하셔야 합니다.
                          <br />
                          &nbsp;&nbsp;(색상 교환, 사이즈 교환 등 포함)
                          <br />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div id="prdreview" className="ecbasefold2">
                    <div className="title titlenonfold flex flexvcenter flexhcenter relative">
                      <h2>
                        상품리뷰
                        <span className="boardcount">0</span>
                      </h2>
                    </div>
                    <div className="reviewsummary flex flexvcenter flexhcenter">
                      <div className="reviewsummarycolumn textcenter">
                        <div className="reviewsummarytitle">리뷰 평점</div>
                        <div className="reviewsummarystar relative">
                          <div className="reviewsummaryscore"></div>
                          <div className="reviewsummarybg"></div>
                        </div>
                        <div className="reviewsummaryrate flex flexvcenter flexhcenter">
                          <div className="reviewsummaryper">0</div>
                          <div className="reviewsummarytotal">5</div>
                        </div>
                      </div>
                      <div className="reviewsummarycolumn textcenter">
                        <div className="reviewsummarytitle">전체 리뷰수</div>
                        <div className="reviewsummarycounticon"></div>
                        <div className="reviewsummaryrate flex flexvcenter flexhcenter">
                          <div className="reviewsummarycount">5</div>
                        </div>
                      </div>
                      <div className="reviewsummarycolumn textcenter">
                        <div className="reviewsummarytitle">평점 비율</div>
                        <div className="flex flexhcenter">
                          <div className="reviewsummarypoint point5">
                            <div className="reviewsummarygraph">
                              <div
                                className="reviewsummaryprogress"
                                style={{ height: "20%" }}
                              ></div>
                            </div>
                          </div>
                          <div className="reviewsummarypoint point4">
                            <div className="reviewsummarygraph">
                              <div
                                className="reviewsummaryprogress"
                                style={{ height: "20%" }}
                              ></div>
                            </div>
                          </div>
                          <div className="reviewsummarypoint point3">
                            <div className="reviewsummarygraph">
                              <div
                                className="reviewsummaryprogress"
                                style={{ height: "20%" }}
                              ></div>
                            </div>
                          </div>
                          <div className="reviewsummarypoint point2">
                            <div className="reviewsummarygraph">
                              <div
                                className="reviewsummaryprogress"
                                style={{ height: "20%" }}
                              ></div>
                            </div>
                          </div>
                          <div className="reviewsummarypoint point1">
                            <div className="reviewsummarygraph">
                              <div
                                className="reviewsummaryprogress"
                                style={{ height: "20%" }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="contents2">
                      <p className="nodata">게시물이 없습니다</p>
                      <div className="ecbasebutton">
                        <span className="gright">
                          <a className="btnnormalfix sizem">전체 보기</a>
                          <a className="btnsubmitfix sizem">리뷰작성</a>
                        </span>
                      </div>
                      <div className="ecbasepagination typelist">
                        <a></a>
                        <a></a>
                        <ol>
                          <li>
                            <a className="this">1</a>
                          </li>
                        </ol>
                        <a></a>
                        <a></a>
                      </div>
                    </div>
                  </div>
                  <div id="prdqna" className="ecbasefold2">
                    <div className="title titlenonfold flex flexvcenter flexhcenter relative">
                      <h2>
                        상품문의
                        <span className="boardcount">0</span>
                      </h2>
                    </div>
                    <div className="contents2">
                      <p className="nodata">게시물이 없습니다</p>
                      <div className="ecbasebutton">
                        <span className="gright">
                          <a className="btnnormalfix sizem">전체 보기</a>
                          <a className="btnsubmitfix sizem">상품문의하기</a>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export default Detail;
