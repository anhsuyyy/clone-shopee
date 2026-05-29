import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

// 1. Import hàm library từ core
import { library } from "@fortawesome/fontawesome-svg-core";
// 2. Import các icon bạn muốn dùng chung
import {
  faCartShopping,
  faBagShopping,
  faMagnifyingGlass,
  faArrowRotateLeft,
  faTruckMoving,
  faShieldHalved,
  faCircleChevronRight,
  faBell,
  faCircleQuestion,
  faChevronRight,
  faChevronLeft,
  faQrcode,
  faCheck,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";
// 3. Thêm các icon này vào thư viện toàn cục
library.add(
  faCartShopping,
  faBagShopping,
  faMagnifyingGlass,
  faFacebook,
  faInstagram,
  faArrowRotateLeft,
  faTruckMoving,
  faShieldHalved,
  faCircleChevronRight,
  faBell,
  faCircleQuestion,
  faChevronRight,
  faChevronLeft,
  faQrcode,
  faCheck,
  faStar,
);
//
import { Provider } from "react-redux";
import { store } from "./app/store";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);
