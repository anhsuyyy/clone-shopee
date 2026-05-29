import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectProductById } from "../../features/product/productSlice";
import { addToCart, setCartItems } from "../../features/cart/cartSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cookies from "js-cookie";
import Header from "../../components/Layout/Header";
import Footer from "../../components/Layout/Footer";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const product = useSelector(selectProductById(id));
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariation, setSelectedVariation] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [showVariationError, setShowVariationError] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Khi load trang, đồng bộ giỏ hàng từ cookie của user này
  useEffect(() => {
    const cartKey = user ? `cart_${user.email}` : "cart_guest";
    const storedCart = Cookies.get(cartKey);
    // Đảm bảo xóa sạch giỏ hàng acc cũ nếu acc mới không có dữ liệu
    dispatch(setCartItems(storedCart ? JSON.parse(storedCart) : []));
  }, [user, dispatch]);

  // Reset ảnh active và cuộn lên đầu trang khi chuyển sang sản phẩm khác (Chuẩn UX Shopee)
  useEffect(() => {
    if (activeImageIndex !== 0);
    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (!product)
    return <div className="p-20 text-center">Sản phẩm không tồn tại</div>;

  const variations = ["Màu Trắng", "Màu Xanh", "Màu Vàng", "Màu Đỏ"];

  const productImages = [
    product.image,
    "https://picsum.photos/600/600?random=101",
    "https://picsum.photos/600/600?random=102",
    "https://picsum.photos/600/600?random=103",
    "https://picsum.photos/600/600?random=104",
  ];

  const handleAddToCart = (isBuyNow = false) => {
    if (!isLoggedIn) {
      navigate("/login", {
        state: { from: { pathname: window.location.pathname } },
      });
      return;
    }

    if (!selectedVariation) {
      setShowVariationError(true);
      return;
    }

    dispatch(
      addToCart({
        product: { ...product, quantity, classification: selectedVariation },
        userId: user.email,
      }),
    );

    if (isBuyNow) {
      navigate("/cart");
    } else {
      setShowToast(true);
      // Tự động ẩn box sau 2 giây
      setTimeout(() => setShowToast(false), 2000);
    }
  };

  return (
    <div className="bg-[#f5f5f5] min-h-screen">
      <Header />
      {showToast && (
        <div className="fixed inset-0 flex items-center justify-center z-[200] pointer-events-none">
          <div className="bg-black/70 text-white px-12 py-10 rounded-sm flex flex-col items-center gap-4 shadow-2xl transition-all duration-300">
            <div className="w-16 h-16 rounded-full bg-[#22c55e] flex items-center justify-center text-3xl border-2 border-white">
              <FontAwesomeIcon icon="check" />
            </div>
            <p className="text-lg font-normal tracking-wide">
              Sản phẩm đã được thêm vào Giỏ hàng
            </p>
          </div>
        </div>
      )}
      <main className="container mx-auto px-0 sm:px-4 py-4" role="main">
        {/* 1. Breadcrumbs */}
        <nav
          className="flex items-center gap-2 text-[13px] mb-4 px-3 overflow-hidden whitespace-nowrap"
          aria-label="Breadcrumb"
        >
          <Link
            to="/"
            className="text-[#0055aa] hover:text-[#ee4d2d] transition-colors no-underline"
          >
            Shopee
          </Link>
          <FontAwesomeIcon
            icon="chevron-right"
            className="text-[9px] text-gray-400"
          />
          {product.category && (
            <>
              <Link
                to="#"
                className="text-[#0055aa] hover:text-[#ee4d2d] transition-colors no-underline"
              >
                {product.category}
              </Link>
              <FontAwesomeIcon
                icon="chevron-right"
                className="text-[9px] text-gray-400"
              />
            </>
          )}
          {product.subCategory && (
            <>
              <Link
                to="#"
                className="text-[#0055aa] hover:text-[#ee4d2d] transition-colors no-underline"
              >
                {product.subCategory}
              </Link>
              <FontAwesomeIcon
                icon="chevron-right"
                className="text-[9px] text-gray-400"
              />
            </>
          )}
          <span className="text-gray-500 truncate max-w-[150px] sm:max-w-[300px] md:max-w-[450px]">
            {product.name}
          </span>
        </nav>

        {/* 2. Main Product Section */}
        <article
          className="bg-white p-0 sm:p-5 rounded-sm shadow-sm grid grid-cols-12 gap-8"
          itemScope
          itemType="https://schema.org/Product"
        >
          {/* Bên trái: Ảnh sản phẩm */}
          <div className="col-span-12 md:col-span-5">
            <div className="relative group cursor-zoom-in">
              <img
                src={productImages[activeImageIndex]}
                alt={`Hình ảnh sản phẩm ${product.name}`}
                itemProp="image"
                className="w-full aspect-square object-cover border border-gray-100"
              />
            </div>
            {/* Mock Thumbnails bên dưới ảnh chính */}
            <div className="grid grid-cols-5 gap-2 mt-2">
              {productImages.map((img, index) => (
                <div
                  key={index}
                  onMouseEnter={() => setActiveImageIndex(index)}
                  onClick={() => setActiveImageIndex(index)}
                  className={`aspect-square border-2 ${activeImageIndex === index ? "border-[#ee4d2d]" : "border-transparent hover:border-[#ee4d2d]"} cursor-pointer transition-all overflow-hidden`}
                >
                  <img
                    src={img}
                    className="w-full h-full object-cover"
                    alt={`Ảnh thu nhỏ ${index + 1}`}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Bên phải: Thông tin chi tiết */}
          <div className="px-3 sm:p-0 col-span-12 md:col-span-7 flex flex-col gap-4">
            <div
              className="text-sm sm:text-base md:text-lg font-bold text-gray-900 leading-tight"
              itemProp="name"
            >
              <span className="bg-[#ee4d2d] text-white text-[10px] px-1.5 py-0.5 rounded-sm mr-2 font-medium uppercase align-middle">
                Yêu thích+
              </span>
              {product.name}
            </div>

            {/* Rating Bar */}
            <div className="flex items-center gap-4 text-[10px] sm:text-[12px] md:text-[14px] lg:text-[16px]">
              <div className="flex items-center text-[#ee4d2d] border-r pr-4 border-gray-200">
                <span className="underline mr-1 text-base">5.0</span>
                {[...Array(5)].map((_, i) => (
                  <FontAwesomeIcon key={i} icon="star" className="text-xs" />
                ))}
              </div>
              <div className="border-r pr-4 border-gray-200">
                <span className="underline text-gray-800">2.1k</span>{" "}
                <span className="text-gray-500">Đánh giá</span>
              </div>
              <div>
                <span className="text-gray-800">{product.sold || "1.2k"}</span>{" "}
                <span className="text-gray-500">Đã bán</span>
              </div>
            </div>

            {/* Price Box */}
            <div
              className="bg-[#fafafa] p-3 flex items-center gap-3"
              itemProp="offers"
              itemScope
              itemType="https://schema.org/Offer"
            >
              <span className="text-gray-400 line-through text-base font-normal">
                ₫{(product.price * 1.5).toLocaleString()}
              </span>
              <span
                className="text-[#ee4d2d] text-3xl font-medium"
                itemProp="price"
              >
                ₫{product.price.toLocaleString()}
              </span>
              <meta itemProp="priceCurrency" content="VND" />
              <span className="bg-[#ee4d2d] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-sm uppercase tracking-tighter">
                Giảm {Math.floor(Math.random() * 100)}%
              </span>
            </div>

            {/* Vận chuyển & Phân loại */}
            <div className="px-0 sm:px-4 flex flex-col gap-6 mt-2">
              {/* Vận chuyển */}
              <div className="flex items-start gap-10">
                <span className="text-gray-500 text-sm w-24 flex-shrink-0">
                  Vận Chuyển
                </span>
                <div className="flex items-center gap-2 text-sm text-gray-800 font-normal">
                  Không hỗ trợ
                </div>
              </div>

              {/* An tâm mua sắm section */}
              <div className="flex items-start !items-center gap-10 group relative">
                <span className="text-gray-500 text-sm w-24 flex-shrink-0 cursor-pointer">
                  An tâm mua sắm cùng Shopee
                </span>
                <div className="flex items-center gap-2 cursor-help">
                  <span className="text-[14px] text-gray-800 group-hover:text-[#ee4d2d] transition-colors">
                    Trả hàng miễn phí 15 ngày • Bảo hiểm Thiệt hại sản phẩm
                  </span>
                </div>
              </div>

              {/* Phân loại hàng */}
              <div
                className={`flex items-start gap-10 p-2 -m-2 transition-all duration-300 rounded-sm ${showVariationError ? "bg-[#fff5f1]" : ""}`}
              >
                <span className="text-gray-500 text-sm w-24 flex-shrink-0 pt-2">
                  Màu sắc
                </span>
                <div className="flex flex-col gap-2">
                  <div className="flex flex-wrap gap-2">
                    {variations.map((v) => (
                      <button
                        key={v}
                        onClick={() => {
                          setSelectedVariation(v);
                          setShowVariationError(false);
                        }}
                        className={` w-20 sm:w-25 py-1.5 border text-[10px]! sm:text-[12px]! lg:text-[14px]! flex items-center justify-center transition-all rounded-sm hover:border-[#ee4d2d]! hover:text-[#ee4d2d] ${selectedVariation === v ? 'border-[#ee4d2d]! text-[#ee4d2d] relative after:content-["✓"] after:absolute after:bottom-0 after:right-0 after:bg-[#ee4d2d] after:text-white after:text-[8px] after:w-3 after:h-3 after:flex after:items-center after:justify-center' : "border-gray-200 text-gray-800"}`}
                      >
                        {v}
                      </button>
                    ))}
                  </div>
                  {showVariationError && (
                    <p className="text-[#ee4d2d] text-sm mt-1">
                      Vui lòng chọn Phân loại hàng
                    </p>
                  )}
                </div>
              </div>

              {/* Số lượng */}
              <div className="flex items-center gap-10">
                <span className="text-gray-500 text-sm w-24 flex-shrink-0">
                  Số lượng
                </span>
                <div className="flex items-center border border-gray-300 rounded-sm overflow-hidden h-5 sm:h6 lg:h-8">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-2 sm:px-3 lg:px-4 border-r border-gray-300 hover:bg-gray-50 transition"
                  >
                    -
                  </button>
                  <input
                    type="text"
                    value={quantity}
                    readOnly
                    className="w-6 sm:w-8 lg:w-10 text-center outline-none text-xs! sm:text-sm! lg:text-base!"
                  />
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-2 sm:px-3 lg:px-4 border-l border-gray-300 hover:bg-gray-50 transition"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pb-5 px-4">
              <button
                onClick={() => handleAddToCart(false)}
                className="flex-1 h-12 border border-[#ee4d2d] bg-[#ffeee8] text-[#ee4d2d] rounded-sm hover:bg-[#fff5f1] transition flex items-center justify-center gap-2 font-normal text-xs! lg:text-base!"
              >
                <FontAwesomeIcon icon="cart-plus" className="text-lg" />
                Thêm Vào Giỏ Hàng
              </button>
              <button
                onClick={() => handleAddToCart(true)}
                className="flex-1 h-12 bg-[#ee4d2d] text-white rounded-sm hover:opacity-95 transition shadow-sm font-normal text-xs! lg:text-base!"
              >
                Mua Ngay
              </button>
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
