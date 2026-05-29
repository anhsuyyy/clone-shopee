import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectDailyDiscoverProducts,
  selectDailyDiscoverVisibleCount,
  loadMoreDailyDiscover,
} from "../../features/product/productSlice";
import ProductCard from "../../components/Common/ProductCard";

const DailyDiscover = () => {
  const dispatch = useDispatch();
  const allDailyProducts = useSelector(selectDailyDiscoverProducts);
  const visibleCount = useSelector(selectDailyDiscoverVisibleCount);
  const displayedProducts = allDailyProducts.slice(0, visibleCount);

  return (
    <div className="container w-full bg-gray-50  px-0 pb-12">
      {/* Thanh Gợi ý hôm nay - Sticky vào đáy Header 
        Giả sử Header của bạn cao 64px (top-16), hãy điều chỉnh top-[height] cho khớp thực tế
      */}
      <div className=" sticky top-19 sm:top-29 z-30 bg-white border-b-2 border-orange-500 shadow-sm">
        <div className=" max-w-[1200px] mx-auto ">
          <div className="flex justify-center items-center h-14 pt-1.5">
            <h2 className="text-orange-600! font-medium text-lg tracking-wider uppercase">
              Gợi ý hôm nay
            </h2>
          </div>
        </div>
      </div>

      {/* Lưới danh sách sản phẩm */}
      <div className="container max-w-[1200px] mx-auto mt-4 p-0">
        {/* Responsive Cột:
          - Màn hình cực nhỏ (xs): 2 cột
          - Màn hình nhỏ (sm): 3 cột
          - Màn hình vừa (md): 4 cột
          - Màn hình lớn trở lên (lg): Đạt tối đa 6 cột chuẩn đề bài
        */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2.5">
          {displayedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Nút Xem Thêm */}
        {visibleCount < allDailyProducts.length && (
          <div className="flex justify-center mt-8">
            <button
              onClick={() => dispatch(loadMoreDailyDiscover())}
              className="px-36 py-2.5 bg-white border border-gray-300 text-gray-600 hover:bg-gray-50 rounded-sm shadow-sm text-sm transition-colors duration-150 min-w-[240px]"
            >
              Xem Thêm
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DailyDiscover;
