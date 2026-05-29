import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
export default function HeaderLogin() {
  return (
    <>
      <div className=" pt-4 pb-3 flex items-center justify-around bg-white">
        {/* Khối Logo + Chữ Giỏ Hàng */}
        <div className="flex items-center gap-3 sm:gap-4">
          <Link
            to="/"
            className="flex items-center gap-1 sm:gap-2 cursor-pointer flex-shrink-0 !text-[#ee4d2d] text-decoration-none"
          >
            <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl">
              <FontAwesomeIcon icon="bag-shopping" />
              Shopee
            </span>
            <span className="text-sm sm:text-lg md:text-xl lg:text-3xl font-semibold tracking-tight hidden xs:inline-block">
              Shopee
            </span>
          </Link>
          <div className="text-black text-sm sm:text-lg md:text-xl lg:text-3xl tracking-tight ">
            Đăng nhập
          </div>
        </div>
        <div className=" cursor-pointer flex items-center gap-2 sm:gap-3  ">
          <a
            className="text-[#fb5533]!"
            style={{ textDecoration: "none" }}
            target="/blank"
            href="https://help.shopee.vn/portal/4/vn/s"
          >
            Bạn cần giúp đỡ?
          </a>
        </div>
      </div>
    </>
  );
}
