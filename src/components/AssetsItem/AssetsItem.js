import AssetsValue from "../AssetsValue/AssetsValue";
import "./AssetsItem.scss";
import { XYPlot, LineSeries } from "react-vis";
import "../../../node_modules/react-vis/dist/style.css";
import { useEffect, useState } from "react";

const AssetsItem = (props) => {
  const [chartData, setChartData] = useState([]);
  let price = parseFloat(props.price).toFixed(2);

  async function getChartData() {
    const start = Date.now() - 3600 * 1000 * 24;
    const end = Date.now();
    const url = `https://api.coincap.io/v2/assets/${props.id}/history?interval=h1&start=${start}&end=${end}`;

    await fetch(url, {})
      .then((response) => response.json())
      .then((data) => {
        let formattedChartData = data.data.map((item) => {
          return { y: item.priceUsd, x: item.time };
        });
        setChartData(formattedChartData);
      })
      .catch((err) => console.warn(err));
  }

  useEffect(() => {
    if (props.showCharts) {
      getChartData();
    }
  }, [props.showCharts]);

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
