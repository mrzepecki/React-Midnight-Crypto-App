import logo from "../../img/logo.svg";
import "./Header.scss";

function Header(props) {
  const optionsHandler = () => {
    return props.onShowCharts(!props.showCharts);
  };

  return (
    <div className="header">
      <div className="header__logo">
        <img src={logo} alt="Midnight, crypto list" />
      </div>
      <div>
        {!props.showCharts && (
          <button className="header__button" onClick={optionsHandler}>
            Load 24h charts
          </button>
        )}
      </div>
    </div>
  );
}

export default Header;
