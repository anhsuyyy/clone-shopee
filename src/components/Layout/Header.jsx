import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SearchBar from "./SearchBar";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice";

export default function Header({ hasSearch = true }) {
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/"); // Chuyển về trang chủ sau khi đăng xuất
  };

  return (
    <>
      <header className=" bg-linear-to-b from-[#f6402e] to-[#fe6332] text-white text-[13px] sm:text-xs z-[100] sticky top-0 w-full select-none">
        <div className="container mx-auto px-2 sm:px-4">
          {/* THANH PHỤ TRÊN CÙNG (TOP BAR) */}
          <div className="hidden sm:flex justify-between items-center py-1.5 border-b border-white/10  text-[10px] md:text-xs">
            <div className="text-[13px] flex gap-1.5 md:gap-3 items-center min-w-0 overflow-hidden whitespace-nowrap">
              <span className="hover:opacity-80 cursor-pointer flex-shrink-0 ">
                Kênh Người Bán
              </span>
              <span className="w-[1px] h-2.5 bg-white/30 flex-shrink-0"></span>
              {hasSearch ? (
                /* NẾU CÓ SEARCH: Render component SearchBar bình thường */
                <>
                  <span className="hover:opacity-80 cursor-pointer hidden md:inline-block flex-shrink-0">
                    Trở thành Người bán Shopee
                  </span>
                  <span className="w-[1px] h-2.5 bg-white/30 hidden md:inline-block flex-shrink-0"></span>
                </>
              ) : (
                ""
              )}

              <span className="hover:opacity-80 cursor-pointer flex-shrink-0">
                Tải ứng dụng
              </span>
              <span className="w-[1px] h-2.5 bg-white/30 flex-shrink-0"></span>
              <span className="hover:opacity-80 cursor-pointer not-last:flex items-center gap-1 flex-shrink-0">
                Kết nối{" "}
                <span className="font-bold">
                  <FontAwesomeIcon icon={["fab", "facebook"]} />{" "}
                  <FontAwesomeIcon icon={["fab", "instagram"]} />
                </span>
              </span>
            </div>

            <div className="text-[13px] flex gap-2 md:gap-4 items-center flex-shrink-0 ml-2 whitespace-nowrap">
              {hasSearch ? (
                /* NẾU CÓ SEARCH: Render component SearchBar bình thường */
                ""
              ) : (
                <span className="hover:opacity-80 cursor-pointer">
                  <FontAwesomeIcon icon="bell" />
                  Thông Báo
                </span>
              )}
              <span className="hover:opacity-80 cursor-pointer">
                <FontAwesomeIcon icon="circle-question" />
                Hỗ Trợ
              </span>

              <div className="dropdown ">
                <button
                  type="button"
                  className="hover:opacity-80 cursor-pointer btn-xm  dropdown-toggle text-white"
                  data-bs-toggle="dropdown"
                >
                  Tiếng Việt
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="#">
                      Tiếng Việt
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Tiếng Anh
                    </a>
                  </li>
                </ul>
              </div>
              {isLoggedIn ? (
                <div className="flex items-center gap-2">
                  {/* Ảnh đại diện nhỏ */}
                  <div className="w-5 h-5 rounded-full overflow-hidden border border-white/50">
                    <img
                      src="https://down-vn.img.susercontent.com/file/ba61750541620c3290b0e52709292c0d_tn"
                      alt="avatar"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="dropdown">
                    <button
                      type="button"
                      className="hover:opacity-80 cursor-pointer dropdown-toggle text-white border-none bg-transparent text-[13px] p-0"
                      data-bs-toggle="dropdown"
                    >
                      {user?.name || "Người dùng"}
                    </button>
                    <ul className="dropdown-menu shadow-md text-sm">
                      <li>
                        <Link
                          className="dropdown-item py-2 px-4 hover:bg-gray-100"
                          to="/profile"
                        >
                          Tài khoản của tôi
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="dropdown-item py-2 px-4 hover:bg-gray-100"
                          to="/orders"
                        >
                          Đơn mua
                        </Link>
                      </li>
                      <li>
                        <button
                          onClick={handleLogout}
                          className="dropdown-item py-2 px-4 hover:bg-gray-100 w-full text-left"
                        >
                          Đăng xuất
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              ) : (
                <>
                  <Link
                    to="/register"
                    className="font-medium hover:opacity-80 cursor-pointer flex-shrink-0 text-white text-decoration-none"
                  >
                    Đăng Ký
                  </Link>
                  <span className="w-[1px] h-2.5 bg-white/30 flex-shrink-0"></span>
                  <Link
                    to="/login"
                    className="font-medium hover:opacity-80 cursor-pointer flex-shrink-0 text-white text-decoration-none"
                  >
                    Đăng Nhập
                  </Link>
                </>
              )}
            </div>
          </div>
          {hasSearch ? (
            /* NẾU CÓ SEARCH: Render component SearchBar bình thường */
            <SearchBar />
          ) : (
            ""
          )}
        </div>
      </header>
      {hasSearch ? (
        ""
      ) : (
        <div className=" pt-4 pb-3 flex items-center justify-around bg-white">
          {/* Khối Logo + Chữ Giỏ Hàng */}
          <div className=" flex items-center gap-3 sm:gap-4">
            <Link
              to="/"
              className="flex items-center gap-1 sm:gap-2 cursor-pointer flex-shrink-0 !text-[#ee4d2d] text-decoration-none"
            >
              <span className="hidden lg:block text-xl sm:text-2xl md:text-3xl lg:text-4xl">
                <FontAwesomeIcon icon="bag-shopping" />
                Shopee
              </span>
              <span className="lg:hidden">
                <FontAwesomeIcon icon="chevron-left" />
              </span>
              <span className="hidden lg:block w-[1px] h-6 sm:h-8 bg-[#ee4d2d]/40 mx-3 sm:mx-4 flex-shrink-0"></span>
              <span className="text-lg !text-[#ee4d2d] sm:text-xl md:text-2xl  tracking-wide">
                Giỏ Hàng
              </span>
            </Link>
            {/* Vạch phân cách và chữ Giỏ Hàng màu trắng/cam nhẹ */}
          </div>
          <div className=" w-full max-w-[250px] sm:max-w-[350px] md:max-w-[400px] flex bg-white rounded-sm overflow-hidden p-0.5 shadow-sm border border-[#fb5533]">
            <input
              type="text"
              placeholder="Tìm sản phẩm, thương hiệu..."
              className="w-full px-2.5 py-1 sm:py-1.5 text-black outline-none text-xs sm:text-sm placeholder-gray-400 min-w-0"
            />
            <button className="bg-[#fb5533] text-white px-3 sm:px-5 py-1 rounded-sm flex-shrink-0 flex items-center justify-center ">
              <span className="text-xs sm:text-sm">
                <FontAwesomeIcon icon="magnifying-glass" />
              </span>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
