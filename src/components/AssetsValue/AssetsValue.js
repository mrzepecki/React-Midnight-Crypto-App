import React from "react";

const AssetsValue = (props) => {
  const value = parseFloat(props.value).toFixed(2);

  if (value < 0) {
    return (
      <div className="assets-item__value assets-item__value--decrease">
        <span className="assets-item__price">${props.price}</span> ({value}%)
      </div>
    );
  } else {
    return (
      <div className="assets-item__value assets-item__value--increase">
        <span className="assets-item__price">${props.price}</span> ({value}%)
      </div>
    );
  }
};

export default AssetsValue;
