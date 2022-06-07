import { useEffect, useMemo, useState } from "react";
import AssetsItem from "../AssetsItem/AssetsItem";
import "./AssetsList.scss";

const AssetsList = (props) => {
  const [data, setData] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const searchData = useMemo(
    () => data.filter(({ name }) => name.toLowerCase().includes(searchValue)),
    [searchValue, data]
  );

  const searchValueHandler = (e) => {
    setSearchValue(e.target.value.toLowerCase());
  };

  const getData = () => {
    fetch("https://api.coincap.io/v2/assets")
      .then((response) => response.json())
      .then((data) => setData(data.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="assets-list__search">
        <input
          type="text"
          value={searchValue}
          placeholder="Search assets by name"
          onChange={searchValueHandler}
        />
      </div>

      <div className="assets-list">
        {searchData.map((asset) => {
          return (
            <AssetsItem
              key={asset.id}
              id={asset.id}
              symbol={asset.symbol}
              name={asset.name}
              price={asset.priceUsd}
              change={asset.changePercent24Hr}
              showCharts={props.showCharts}
            />
          );
        })}
      </div>
    </>
  );
};

export default AssetsList;
