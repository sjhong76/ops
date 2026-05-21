import { useNavigate } from "react-router-dom";

/** 홈 화면 서브배너 3개 아이템 */
export default function Bancon({ banner, i }) {
  const navigate = useNavigate();

  return (
    <div
      className="subbanneritem relative"
      onClick={() => navigate("/shop/cake")}
      style={{ cursor: "pointer" }}
    >
      <a>
        <img src={`/img/banner${i}.jpg`} alt={banner.title} />
        <div className="subbannertxt">
          <div className="subbannertitle">{banner.title}</div>
          <div className="subbannerdesc">{banner.content}</div>
        </div>
      </a>
    </div>
  );
}
