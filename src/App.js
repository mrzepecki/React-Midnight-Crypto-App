import { useState } from "react";
import AssetsList from "./components/AssetsList/AssetsList";
import Header from "./components/Header/Header";

function App() {
  const [showCharts, setShowCharts] = useState(false);

  const changedOptions = (state) => {
    setShowCharts(state);
  };

  return (
    <div className="App">
      <Header showCharts={showCharts} onShowCharts={changedOptions} />
      <AssetsList showCharts={showCharts} />
    </div>
  );
}

export default App;
