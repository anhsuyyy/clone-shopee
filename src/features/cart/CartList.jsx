import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  setCartItems,
  toggleCheckItem,
  toggleCheckAll,
  toggleCheckMultiple,
  updateQuantity,
  removeFromCart,
  selectIsAllChecked,
} from "./cartSlice";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

export default function CartList() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const { user } = useSelector((state) => state.auth);
  const isAllChecked = useSelector(selectIsAllChecked);

  // Nhóm các sản phẩm theo Tên Cửa Hàng (Shop Name) giống Shopee
  const groupedItems = cartItems.reduce((groups, item) => {
    const shop = item.shopName || "Shop Yêu Thích";
    if (!groups[shop]) groups[shop] = [];
    groups[shop].push(item);
    return groups;
  }, {});

  // Khôi phục giỏ hàng từ Cookie khi refresh trang hoặc đổi User
  useEffect(() => {
    const cartKey = user ? `cart_${user.email}` : "cart_guest";
    const storedCart = Cookies.get(cartKey);
    // Luôn cập nhật state: nếu có dữ liệu thì parse, nếu không thì trả về mảng rỗng
    dispatch(setCartItems(storedCart ? JSON.parse(storedCart) : []));
    window.scrollTo(0, 0);
  }, [user, dispatch]);

  // GIAO DIỆN KHI GIỎ HÀNG TRỐNG (Áp dụng CSS chuẩn Shopee)
  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center pt-20 pb-36 bg-[#f5f5f5]">
        {/* Khối hiển thị ảnh dùng CSS Sprite chuẩn kích thước */}
        <div
          className="bg-no-repeat bg-cover mb-4"
          style={{
            width: "6.75rem",
            height: "6.125rem",
            backgroundPosition: "50%",
            backgroundImage:
              "url('https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/cart/ef577a25315c384ed114.png')",
          }}
        />
        <p className="text-[14px] text-gray-500 font-medium mb-4">
          Giỏ hàng của bạn còn trống
        </p>
        <Link
          to="/"
          className="bg-[#ee4d2d] text-white text-[14px] px-10 py-2.5 rounded-sm shadow-xs uppercase font-medium hover:opacity-90 transition inline-block text-center hover:text-white text-decoration-none"
        >
          Mua Ngay
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-3">
      {/* --- PC/TABLET TIÊU ĐỀ: Ẩn hoàn toàn trên Mobile --- */}
      <div className="hidden sm:grid grid-cols-12 bg-white px-3 py-3 text-sm text-gray-500 rounded-sm shadow-xs items-center select-none">
        <div className="col-span-6 flex items-center gap-4">
          <input
            type="checkbox"
            checked={isAllChecked}
            onChange={(e) =>
              dispatch(
                toggleCheckAll({
                  isAllChecked: e.target.checked,
                  userId: user?.email,
                }),
              )
            }
            className="w-4 h-4 accent-[#ee4d2d] cursor-pointer"
          />
          <span className="text-black font-normal">Sản Phẩm</span>
        </div>
        <div className="col-span-2 text-center">Đơn Giá</div>
        <div className="col-span-2 text-center">Số Lượng</div>
        <div className="col-span-1 text-center">Số Tiền</div>
        <div className="col-span-1 text-center">Thao Tác</div>
      </div>

      {/* --- DANH SÁCH ITEM PHÂN THEO SHOP --- */}
      {Object.keys(groupedItems).map((shopName) => (
        <div
          key={shopName}
          className="bg-white rounded-sm shadow-xs p-3 sm:p-4 flex flex-col gap-4"
        >
          {/* Header Cửa hàng */}
          {(() => {
            const shopItems = groupedItems[shopName];
            const allShopChecked = shopItems.every((item) => item.checked);
            const shopIds = shopItems.map((item) => item.id);

            return (
              <div className="flex items-center gap-2 text-sm font-medium pb-2 border-b border-gray-100">
                <input
                  type="checkbox"
                  checked={allShopChecked}
                  onChange={() =>
                    dispatch(
                      toggleCheckMultiple({
                        ids: shopIds,
                        checked: !allShopChecked,
                        userId: user?.email,
                      }),
                    )
                  }
                  className="w-4 h-4 accent-[#ee4d2d] cursor-pointer"
                />
                <span className="bg-[#ee4d2d] text-white text-[10px] px-1 py-0.5 rounded-xs font-semibold scale-90">
                  Mall
                </span>
                <span className="text-gray-800 hover:underline cursor-pointer flex items-center gap-1 text-[13px] sm:text-sm">
                  {shopName}
                  <FontAwesomeIcon
                    icon="chevron-right"
                    className="text-[9px] text-gray-400"
                  />
                </span>
              </div>
            );
          })()}

          {/* Các sản phẩm của Shop này */}
          {groupedItems[shopName].map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-12 gap-3 sm:gap-0 items-center py-2 border-b border-dashed border-gray-100 last:border-none"
            >
              {/* Cột chính: Checkbox + Ảnh + Thông tin sản phẩm */}
              <Link
                to={`/product/${item.id}`}
                className="cursor-pointer text-decoration-none col-span-12 sm:col-span-6 flex gap-3 items-start sm:items-center"
              >
                <div className="col-span-12 sm:col-span-6 flex gap-3 items-start sm:items-center">
                  <input
                    type="checkbox"
                    checked={item.checked}
                    onChange={() =>
                      dispatch(
                        toggleCheckItem({ id: item.id, userId: user?.email }),
                      )
                    }
                    className="w-4 h-4 accent-[#ee4d2d] cursor-pointer sm:mt-0 flex-shrink-0"
                  />
                  <img
                    src={item.image || "https://via.placeholder.com/100"}
                    alt={item.name}
                    className="w-20 h-20 sm:w-24 sm:h-24 object-cover border border-gray-200 rounded-xs flex-shrink-0"
                  />
                  <div className="flex flex-col gap-1 min-w-0">
                    <p className="text-gray-800 text-[13px] sm:text-sm line-clamp-2 leading-tight">
                      {item.name}
                    </p>
                    {item.classification && (
                      <span className="text-[11px] text-gray-500 bg-gray-50 px-1.5 py-0.5 rounded-xs self-start border border-gray-100">
                        Phân loại hàng: {item.classification}
                      </span>
                    )}
                    {/* Đơn giá đặc trưng riêng khi chuyển sang màn hình Mobile */}
                    <span className="text-[#ee4d2d] font-medium text-sm sm:hidden mt-1">
                      ₫{item.price?.toLocaleString()}
                    </span>
                  </div>
                </div>
              </Link>

              {/* Đơn giá (Ẩn trên Mobile) */}
              <div className="hidden sm:block sm:col-span-2 text-center text-gray-800">
                ₫{item.price?.toLocaleString()}
              </div>

              {/* Bộ tăng giảm số lượng (Tối ưu click trên cả Mobile và PC) */}
              <div className="col-span-8 sm:col-span-2 flex justify-start sm:justify-center items-center pl-7 sm:pl-0">
                <div className="flex items-center border border-gray-300 rounded-xs overflow-hidden h-7">
                  <button
                    onClick={() =>
                      dispatch(
                        updateQuantity({
                          id: item.id,
                          quantity: item.quantity - 1,
                          userId: user?.email,
                        }),
                      )
                    }
                    disabled={item.quantity <= 1}
                    className="px-2 bg-gray-50 text-gray-600 hover:bg-gray-100 disabled:opacity-40 h-full w-8 transition select-none"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => {
                      const val = parseInt(e.target.value);
                      if (val > 0)
                        dispatch(
                          updateQuantity({
                            id: item.id,
                            quantity: val,
                            userId: user?.email,
                          }),
                        );
                    }}
                    className="w-12 text-center text-xs border-x border-gray-300 outline-none h-full"
                  />
                  <button
                    onClick={() =>
                      dispatch(
                        updateQuantity({
                          id: item.id,
                          quantity: item.quantity + 1,
                          userId: user?.email,
                        }),
                      )
                    }
                    className="px-2 bg-gray-50 text-gray-600 hover:bg-gray-100 h-full w-8 transition select-none"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Thành tiền (Ẩn trên Mobile) */}
              <div className="hidden sm:block sm:col-span-1 text-center text-[#ee4d2d] font-medium">
                ₫{(item.price * item.quantity).toLocaleString()}
              </div>

              {/* Thao tác xóa */}
              <div className="col-span-4 sm:col-span-1 text-right sm:text-center">
                <button
                  onClick={() =>
                    dispatch(
                      removeFromCart({ id: item.id, userId: user?.email }),
                    )
                  }
                  className="text-gray-500 hover:text-[#ee4d2d] text-xs sm:text-sm transition font-normal"
                >
                  Xóa
                </button>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
