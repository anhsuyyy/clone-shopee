import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  toggleCheckAll,
  selectIsAllChecked,
  selectCartSummary,
  removeCheckedItems,
} from "./cartSlice";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function CartSummary() {
  const dispatch = useDispatch();
  const isAllChecked = useSelector(selectIsAllChecked);
  const { totalAmount, checkedCount } = useSelector(selectCartSummary);
  const { user } = useSelector((state) => state.auth);
  const cartItems = useSelector((state) => state.cart.items);
  const [showToast, setshowToast] = useState(false);

  if (cartItems.length === 0) return null;

  return (
    <div className="w-full fixed sm:sticky bottom-0 left-0 z-40 bg-white border-t border-gray-200 sm:border-none shadow-[0_-3px_12px_rgba(0,0,0,0.06)] sm:shadow-sm rounded-sm">
      <div className="container mx-auto px-1 lg:px-4! py-3 flex flex-col gap-3">
        {/* Thanh Voucher Giảm Giá nhỏ phía trên */}
        <div className="flex items-center justify-between text-xs sm:text-sm pb-1.5 border-b border-gray-100 text-gray-700 select-none">
          <div className="flex items-center gap-1.5">
            <span className="text-[#ee4d2d] text-sm">🎟️</span>
            <span className="text-[13px]">Shopee Voucher</span>
          </div>
          <button className="text-blue-500 hover:text-blue-600 text-[13px]">
            Chọn hoặc nhập mã
          </button>
        </div>

        {/* Khối Thông Số Check Tổng Tiền Chính */}
        <div className="flex items-center justify-between gap-1 sm:gap-0">
          {/* Cụm Chọn Tất Cả phía bên trái */}
          <div className="flex items-center gap-3 text-gray-800 text-sm select-none">
            <input
              type="checkbox"
              id="globalCartCheckAll"
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
            <label
              htmlFor="globalCartCheckAll"
              className="cursor-pointer text-[13px] sm:text-sm hidden sm:inline"
            >
              Chọn Tất Cả ({cartItems.length})
            </label>

            {/* Nút Xóa các mục đã chọn */}
            <button
              onClick={() => {
                if (
                  window.confirm(`Bạn có chắc muốn xóa những sản phẩm đã chọn?`)
                ) {
                  dispatch(removeCheckedItems({ userId: user?.email }));
                }
              }}
              disabled={checkedCount === 0}
              className={`ml-4 hidden sm:inline text-[13px] sm:text-sm transition-colors ${
                checkedCount > 0
                  ? "text-gray-800 hover:text-[#ee4d2d] cursor-pointer"
                  : "text-gray-300 cursor-not-allowed"
              }`}
            >
              Xóa
            </button>
          </div>

          {/* Cụm Hiển Thị Số Tiền + Nút Đặt Hàng Mua Hàng */}
          <div className="flex items-center justify-between gap-3 ml-auto">
            <div className="flex flex-col items-end leading-tight">
              <div className="text-[13px] sm:text-base text-gray-900 flex items-center gap-1">
                <span className="hidden lg:block">
                  Tổng thanh toán ({checkedCount} sản phẩm):
                </span>
                <span>Tổng</span>
                <span className="text-[#ee4d2d] text-base sm:text-xl font-semibold">
                  ₫{totalAmount.toLocaleString()}
                </span>
              </div>
            </div>
            {showToast && (
              <div className="fixed inset-0 flex items-center justify-center z-200 pointer-events-none">
                <div className="bg-black/70 text-white px-12 py-10 rounded-sm flex flex-col items-center gap-4 shadow-2xl transition-all duration-300">
                  <div className="w-16 h-16 rounded-full bg-[#22c55e] flex items-center justify-center text-3xl border-2 border-white">
                    <FontAwesomeIcon icon="check" />
                  </div>
                  <p className="text-lg font-normal tracking-wide">
                    Đặt hàng thành công
                  </p>
                </div>
              </div>
            )}
            {/* Button Submit Mua Hàng */}
            <button
              disabled={checkedCount === 0}
              onClick={() => {
                setshowToast(true);
                setTimeout(() => setshowToast(false), 2000);
              }}
              className="bg-[#ee4d2d] text-white text-xs sm:text-sm font-medium px-2 sm:px-3! md:px-4! lg:px-6! xl:px-8! py-2.5 rounded-sm hover:bg-[#d73211] transition-all disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed flex-shrink-0 uppercase"
            >
              Thanh toán
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
