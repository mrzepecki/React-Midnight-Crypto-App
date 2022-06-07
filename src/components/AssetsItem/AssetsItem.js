import AssetsValue from "../AssetsValue/AssetsValue";
import "./AssetsItem.scss";
import { XYPlot, LineSeries } from "react-vis";
import "../../../node_modules/react-vis/dist/style.css";
import { useState } from "react";

const AssetsItem = (props) => {
  let price = parseFloat(props.price).toFixed(2);

  const [chartData, setChartData] = useState([]);

  console.log(props.showCharts);

  if (props.showCharts) {
    const start = Date.now() - 3600 * 1000 * 24;
    const end = Date.now();
    fetch(
      `https://api.coincap.io/v2/assets/${props.id}/history?interval=h1&start=${start}&end=${end}`
    )
      .then((response) => response.json())
      .then((data) => {
        setChartData(
          data.data.map((item) => {
            return { y: item.priceUsd, x: item.time };
          })
        );
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="assets-item">
      <div className="assets-item__data">
        <div className="assets-item__heading">
          <div className="assets-item__symbol">{props.symbol}</div>
          <h2 className="assets-item__name">{props.name}</h2>
        </div>
        <div>
          <AssetsValue price={price} value={props.change} />
        </div>
      </div>
      <div className="assets-item__chart">
        <XYPlot height={100} width={300} stroke="#6427a3">
          <LineSeries data={chartData} />
        </XYPlot>
      </div>
    </div>
  );
};

export default AssetsItem;
