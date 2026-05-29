import React from "react";

const Footer = () => {
  return (
    <footer className=" w-full bg-[#fbfbfb] text-[#000000a6] text-xs font-sans border-t-4 border-[#ee4d2d] pt-10 pb-8 mt-10">
      {/* Phần 1: Các cột thông tin danh mục */}
      <div className="container max-w-[1200px] mx-auto px-4 pb-10  text-black ">
        <h6 className="font-bold">SHOPEE - GÌ CŨNG CÓ, MUA HẾT Ở SHOPEE</h6>
        <p>
          Shopee - ứng dụng mua sắm trực tuyến thú vị, tin cậy, an toàn và miễn
          phí! Shopee là nền tảng giao dịch trực tuyến hàng đầu ở Đông Nam Á, có
          trụ sở chính ở Singapore, đã có mặt ở khắp các khu vực Singapore,
          Malaysia, Indonesia, Thái Lan, Philippines, Đài Loan, Campuchia,
          Brazil, México, Colombia, & Chile. Với sự đảm bảo của Shopee, bạn sẽ
          mua hàng trực tuyến an tâm và nhanh chóng hơn bao giờ hết!
        </p>
        <h6>MUA SẮM VÀ BÁN HÀNG ONLINE ĐƠN GIẢN, NHANH CHÓNG VÀ AN TOÀN</h6>
        <p>
          Nếu bạn đang tìm kiếm một trang web để mua và bán hàng trực tuyến thì
          Shopee.vn là một sự lựa chọn tuyệt vời dành cho bạn. Shopee là trang
          thương mại điện tử cho phép người mua và người bán tương tác và trao
          đổi dễ dàng thông tin về sản phẩm và chương trình khuyến mãi của shop.
          Do đó, việc mua bán trên Shopee trở nên nhanh chóng và đơn giản hơn.
          Bạn có thể trò chuyện trực tiếp với nhà bán hàng để hỏi trực tiếp về
          mặt hàng cần mua. Còn nếu bạn muốn tìm mua những dòng sản phẩm chính
          hãng, uy tín, Shopee Mall chính là sự lựa chọn lí tưởng dành cho bạn.
          Để bạn có thể dễ dàng khi tìm hiểu và sử dụng sản phẩm, Shopee Blog -
          trang blog thông tin chính thức của Shopee - sẽ giúp bạn có thể tìm
          được cho mình các kiến thức về xu hướng thời trang, review công nghệ,
          mẹo làm đẹp, tin tức tiêu dùng và deal giá tốt bất ngờ.
        </p>
        <p>
          Đến với Shopee, cơ hội để trở thành một nhà bán hàng dễ dàng hơn bao
          giờ hết. Chỉ với vài thao tác trên ứng dụng, bạn đã có thể đăng bán
          ngay những sản phẩm của mình. Không những thế, các nhà bán hàng có thể
          tự tạo chương trình khuyến mãi trên Shopee để thu hút người mua với
          những sản phẩm có mức giá hấp dẫn. Khi đăng nhập tại Shopee Kênh người
          bán, bạn có thể dễ dàng phân loại sản phẩm, theo dõi đơn hàng, chăm
          sóc khách hàng và cập nhập ngay các hoạt động của shop.
          <p>
            Bên cạnh đó, Shopee hợp tác với nhiều đơn vị vận chuyển uy tín trên
            thị trường như SPX,... nhằm cung cấp dịch vu giao nhận và vận chuyển
            tiện lợi cho cả khách hàng và người bán. Cùng với nhiều ưu đãi với
            chi phí giao hàng hợp lý, Shopee đảm bảo cho khách hàng trải nghiệm
            mua sắm thuận tiện nhất.
          </p>
        </p>
      </div>
      <div className="container max-w-[1200px] mx-auto px-4 grid grid-cols-1 md:grid-cols-5 gap-6 pb-10 border-b border-[#0000000f]">
        {/* Cột 1: Chăm sóc khách hàng */}

        <div>
          <p className="font-bold text-[#000000cc] mb-3 uppercase text-[13px] tracking-wider">
            DỊCH VỤ KHÁCH HÀNG
          </p>
          <ul className="space-y-2 text-[#0000008a] p-0">
            <li className="hover:text-[#ee4d2d] cursor-pointer">
              Trung Tâm Trợ Giúp
            </li>
            <li className="hover:text-[#ee4d2d] cursor-pointer">Shopee Blog</li>
            <li className="hover:text-[#ee4d2d] cursor-pointer">Shopee Mall</li>
            <li className="hover:text-[#ee4d2d] cursor-pointer">
              Hướng Dẫn Mua Hàng
            </li>
            <li className="hover:text-[#ee4d2d] cursor-pointer">
              Hướng Dẫn Bán Hàng
            </li>
            <li className="hover:text-[#ee4d2d] cursor-pointer">Thanh Toán</li>
            <li className="hover:text-[#ee4d2d] cursor-pointer">
              Chăm Sóc Khách Hàng
            </li>
            <li className="hover:text-[#ee4d2d] cursor-pointer">
              Chính Sách Bảo Hành
            </li>
          </ul>
        </div>

        {/* Cột 2: Về Shopee */}
        <div>
          <p className="font-bold text-[#000000cc] mb-3 uppercase text-[13px] tracking-wider">
            Shopee việt nam
          </p>
          <ul className="space-y-2 text-[#0000008a] p-0">
            <li className="hover:text-[#ee4d2d] cursor-pointer">
              Giới Thiệu Về Shopee Việt Nam
            </li>
            <li className="hover:text-[#ee4d2d] cursor-pointer">Tuyển Dụng</li>
            <li className="hover:text-[#ee4d2d] cursor-pointer">
              Điều Khoản Shopee
            </li>
            <li className="hover:text-[#ee4d2d] cursor-pointer">
              Chính Sách Bảo Mật
            </li>
            <li className="hover:text-[#ee4d2d] cursor-pointer">Chính Hãng</li>
            <li className="hover:text-[#ee4d2d] cursor-pointer">
              Kênh Người Bán
            </li>
            <li className="hover:text-[#ee4d2d] cursor-pointer">Flash Sales</li>
          </ul>
        </div>

        {/* Cột 3: Thanh toán & Vận chuyển */}
        <div>
          <p className="font-bold text-[#000000cc] mb-3 uppercase text-[13px] tracking-wider">
            Thanh toán
          </p>
          <div className="grid grid-cols-3 gap-2 mb-4 ">
            <span className="flex justify-center bg-white p-1 roundedShadow shadow-sm text-center border border-gray-100 font-bold text-[10px] text-blue-800">
              <img
                src="https://down-vn.img.susercontent.com/file/d4bbea4570b93bfd5fc652ca82a262a8"
                alt=""
              />
            </span>
            <span className="flex justify-center bg-white p-1 roundedShadow shadow-sm text-center border border-gray-100 font-bold text-[10px] text-red-500">
              <img
                src="https://down-vn.img.susercontent.com/file/a0a9062ebe19b45c1ae0506f16af5c16"
                alt=""
              />
            </span>
            <span className="bg-white flex justify-center p-1 roundedShadow shadow-sm text-center border border-gray-100 font-bold text-[10px] text-orange-500">
              <img
                src="https://down-vn.img.susercontent.com/file/38fd98e55806c3b2e4535c4e4a6c4c08"
                alt=""
              />
            </span>

            <span className="bg-white flex justify-center p-1 roundedShadow shadow-sm text-center border border-gray-100 font-bold text-[10px] text-orange-500">
              <img
                src="https://down-vn.img.susercontent.com/file/bc2a874caeee705449c164be385b796c"
                alt=""
              />
            </span>
            <span className="bg-white flex justify-center p-1 roundedShadow shadow-sm text-center border border-gray-100 font-bold text-[10px] text-orange-500">
              <img
                src="https://down-vn.img.susercontent.com/file/2c46b83d84111ddc32cfd3b5995d9281"
                alt=""
              />
            </span>
            <span className="bg-white flex justify-center p-1 roundedShadow shadow-sm text-center border border-gray-100 font-bold text-[10px] text-orange-500">
              <img
                src="https://down-vn.img.susercontent.com/file/5e3f0bee86058637ff23cfdf2e14ca09"
                alt=""
              />
            </span>
            <span className="bg-white flex justify-center p-1 roundedShadow shadow-sm text-center border border-gray-100 font-bold text-[10px] text-orange-500">
              <img
                src="https://down-vn.img.susercontent.com/file/9263fa8c83628f5deff55e2a90758b06"
                alt=""
              />
            </span>
            <span className="bg-white flex justify-center p-1 roundedShadow shadow-sm text-center border border-gray-100 font-bold text-[10px] text-orange-500">
              <img
                src="https://down-vn.img.susercontent.com/file/0217f1d345587aa0a300e69e2195c492"
                alt=""
              />
            </span>
            <span className="bg-white flex justify-center p-1 roundedShadow shadow-sm text-center border border-gray-100 font-bold text-[10px] text-orange-500">
              <img
                src="https://down-vn.img.susercontent.com/file/vn-11134258-81ztc-mmzpe4fr56o297"
                alt=""
              />
            </span>
          </div>
          <p className="font-bold text-[#000000cc] mb-3 uppercase text-[13px] tracking-wider">
            Đơn vị vận chuyển
          </p>
          <div className="grid grid-cols-3 gap-2">
            <span className="bg-white p-1 roundedShadow shadow-sm text-center border border-gray-100 font-medium text-[9px] text-orange-600 flex justify-center">
              <img
                src="https://down-vn.img.susercontent.com/file/vn-11134258-7ras8-m20rc1wk8926cf"
                alt=""
              />
            </span>
            <span className="bg-white p-1 roundedShadow shadow-sm text-center border border-gray-100 font-medium text-[9px] text-green-600 flex justify-center ">
              <img
                src="https://down-vn.img.susercontent.com/file/vn-50009109-64f0b242486a67a3d29fd4bcf024a8c6"
                alt=""
              />
            </span>
            <span className="bg-white p-1 roundedShadow shadow-sm text-center border border-gray-100 font-medium text-[9px] text-blue-500 flex justify-center">
              <img
                src="https://down-vn.img.susercontent.com/file/59270fb2f3fbb7cbc92fca3877edde3f"
                alt=""
              />
            </span>
          </div>
        </div>

        {/* Cột 4: Theo dõi chúng tôi */}
        <div>
          <p className="font-bold text-[#000000cc] mb-3 uppercase text-[13px] tracking-wider">
            Theo dõi shopee
          </p>
          <ul className="space-y-2 text-[#0000008a] p-0">
            <li className="flex items-center gap-2 hover:text-[#ee4d2d] cursor-pointer">
              <span className="text-sm ">
                <img
                  src="https://down-vn.img.susercontent.com/file/2277b37437aa470fd1c71127c6ff8eb5"
                  alt=""
                />
              </span>{" "}
              Facebook
            </li>
            <li className="flex items-center gap-2 hover:text-[#ee4d2d] cursor-pointer">
              <span className="text-sm">
                <img
                  src="https://down-vn.img.susercontent.com/file/5973ebbc642ceee80a504a81203bfb91"
                  alt=""
                />
              </span>{" "}
              Instagram
            </li>
            <li className="flex items-center gap-2 hover:text-[#ee4d2d] cursor-pointer">
              <span className="text-sm">
                <img
                  src="https://down-vn.img.susercontent.com/file/f4f86f1119712b553992a75493065d9a"
                  alt=""
                />
              </span>
              Linkedln
            </li>
          </ul>
        </div>

        {/* Cột 5: Tải ứng dụng */}
        <div>
          <p className="font-bold text-[#000000cc] mb-3 uppercase text-[13px] tracking-wider">
            Tải ứng dụng Shopee ngay
          </p>
          <div className="flex gap-2">
            {/* Giả lập mã QR */}
            <div className="w-20 h-20 bg-white p-0.5 border border-gray-200 flex items-center justify-center text-[10px] text-center font-mono text-gray-400 select-none">
              <img
                src="https://down-vn.img.susercontent.com/file/a5e589e8e118e937dc660f224b9a1472"
                alt=""
              />
            </div>
            {/* Các chợ ứng dụng */}
            <div className="flex flex-col justify-between py-0.5">
              <span className="bg-white px-2 py-1 border border-gray-200 rounded-sm text-[9px] font-medium cursor-pointer hover:shadow-sm">
                <img
                  src="https://down-vn.img.susercontent.com/file/ad01628e90ddf248076685f73497c163"
                  alt=""
                />
              </span>
              <span className="bg-white px-2 py-1 border border-gray-200 rounded-sm text-[9px] font-medium cursor-pointer hover:shadow-sm">
                <img
                  src="https://down-vn.img.susercontent.com/file/ae7dced05f7243d0f3171f786e123def"
                  alt=""
                />
              </span>
              <span className="bg-white px-2 py-1 border border-gray-200 rounded-sm text-[9px] font-medium cursor-pointer hover:shadow-sm">
                <img
                  src="https://down-vn.img.susercontent.com/file/35352374f39bdd03b25e7b83542b2cb0"
                  alt=""
                />
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Phần 2: Quốc gia & Bản quyền công ty */}
      <div className="max-w-[1200px] mx-auto px-4 pt-8 text-[#0000008a] text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-4 text-[13px]">
        <div>
          © {new Date().getFullYear()} Shopee. Tất cả các quyền được bảo lưu.
        </div>
        <div className="flex flex-wrap justify-center gap-x-2 gap-y-1 text-xs text-[#000000aa]">
          <span>Quốc gia & Khu vực:</span>
          <span className="hover:text-[#ee4d2d] cursor-pointer border-r border-gray-300 pr-2">
            Singapore
          </span>
          <span className="hover:text-[#ee4d2d] cursor-pointer border-r border-gray-300 pr-2">
            Indonesia
          </span>
          <span className="hover:text-[#ee4d2d] cursor-pointer border-r border-gray-300 pr-2">
            Đài Loan
          </span>
          <span className="hover:text-[#ee4d2d] cursor-pointer border-r border-gray-300 pr-2">
            Thái Lan
          </span>
          <span className="hover:text-[#ee4d2d] cursor-pointer">Việt Nam</span>
        </div>
      </div>

      {/* Phần 3: Chính sách thông tin chi tiết công ty ở đáy */}
      <div className="max-w-[1200px] mx-auto px-4 mt-10 text-center text-[11px] text-[#00000073] space-y-4">
        <div className="flex justify-center gap-6 uppercase font-medium">
          <span className="hover:text-[#ee4d2d] cursor-pointer">
            Chính sách bảo mật
          </span>
          <span className="border-r border-gray-300"></span>
          <span className="hover:text-[#ee4d2d] cursor-pointer">
            Quy chế hoạt động
          </span>
          <span className="border-r border-gray-300"></span>
          <span className="hover:text-[#ee4d2d] cursor-pointer">
            Chính sách vận chuyển
          </span>
          <span className="border-r border-gray-300"></span>
          <span className="hover:text-[#ee4d2d] cursor-pointer">
            Chính sách trả hàng và hoàn tiền
          </span>
        </div>
        <div className="flex justify-center m-0  gap-5">
          <div className="w-[120px] h-[75px]">
            <a
              className="w-full h-full flex items-center justify-center" // Thêm dòng này để căn giữa thẻ <a>
              target="_blank"
              rel="noopener noreferrer"
              href="http://online.gov.vn/Home/WebDetails/18367"
            >
              <img
                src="https://webmedia.com.vn/images/2021/09/logo-da-dang-ky-bo-cong-thuong-mau-do.jpg"
                alt=""
              />
            </a>
          </div>
          <div className="w-[120px] h-[75px]">
            <a
              className="w-full h-full flex items-center justify-center" // Thêm dòng này để căn giữa thẻ <a>
              target="_blank"
              rel="noopener noreferrer"
              href="http://online.gov.vn/Home/AppDetails/29"
            >
              <img
                src="https://cdn.dangkywebsitevoibocongthuong.com/wp-content/uploads/2018/06/huong-dan-dang-ky-website-voi-Bo-Cong-Thuong-3.png"
                alt=""
              />
            </a>
          </div>
          <div className="w-[120px] h-[75px]">
            <a
              className="w-full h-full flex items-center justify-center" // Thêm dòng này để căn giữa thẻ <a>
              target="_blank"
              rel="noopener noreferrer"
              href="https://help.shopee.vn/portal/4/"
            >
              <img
                className=" h-[60%] object-cover"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpcRV1PbI1KYQAw-CIvFP6AqULB02iHOU8rg&s"
                alt=""
              />
            </a>
          </div>
        </div>
        <div className="space-y-1 text-[#000000c6]">
          <p className="font-semibold text-[#000000]">Công ty TNHH Shopee</p>
          <p>
            Địa chỉ: Tầng 4-5-6, Tòa nhà Capital Place, số 29 đường Liễu Giai,
            Phường Ngọc Khánh, Quận Ba Đình, Thành phố Hà Nội, Việt Nam.
          </p>
          <p>
            Chăm sóc khách hàng: Gọi tổng đài Shopee (miễn phí) hoặc Trò chuyện
            với Shopee ngay trên Trung tâm trợ giúp
          </p>
          <p>Chịu Trách Nhiệm Quản Lý Nội Dung: Nguyễn Bùi Anh Tuấn</p>
          <p>
            Mã số doanh nghiệp: 0106773786 do Sở Kế hoạch và Đầu tư TP Hà Nội
            cấp lần đầu ngày 10/02/2015
          </p>
          <p>© 2015 - Bản quyền thuộc về Công ty TNHH Shopee</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
