import React from "react";
import Err from "../../Assets/img/error.svg";
import "../Css/underDev.css";
export default function UnderDev() {
  return (
    <div className="page__maintance">
      <img className="error-logo" src={Err} />
      <p className="text-under-dev">
        Trang này đang trong quá trình phát tiển. vui lòng quay lại sau
      </p>
    </div>
  );
}
