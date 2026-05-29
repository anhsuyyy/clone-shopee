import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, clearError } from "../../features/auth/authSlice";

export default function BodyLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [localError, setLocalError] = useState("");

  const { status, error: serverError } = useSelector((state) => state.auth);
  const isLoading = status === "loading";

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // Lấy đường dẫn trước đó từ state, nếu không có thì mặc định về trang chủ "/"
  const from = location.state?.from?.pathname || "/";

  const handleLogin = async (e) => {
    e.preventDefault(); // Ngăn chặn hành vi submit mặc định của form
    setLocalError("");
    dispatch(clearError());

    if (!username || !password) {
      setLocalError(
        "Vui lòng nhập đầy đủ Email/Số điện thoại/Tên đăng nhập và Mật khẩu.",
      );
      return;
    }

    const result = await dispatch(loginUser({ username, password }));
    if (loginUser.fulfilled.match(result)) {
      // Quay lại trang trước đó hoặc về trang chủ
      navigate(from, { replace: true });
    }
  };

  return (
    <>
      <div className="flex justify-center items-center h-[600px] bg-[#ee4d2d]">
        <div
          className="h-[500px] w-[1040px] relative "
          style={{
            backgroundImage:
              "url(https://down-vn.img.susercontent.com/file/sg-11134004-820nd-mncwwwyg78qref)",
          }}
        >
          <div className="h-[600px] w-full lg:h-[500px] lg:w-[400px] bg-white absolute top-[-50px] left-0  lg:left-[600px]! lg:top-0 flex flex-col">
            <div className="flex justify-between px-[30px] py-[22px] items-center">
              <div className="flex items-center gap-2 text-xl font-medium">
                Đăng nhập
              </div>
              <div className="flex gap-2">
                <div className="flex items-center justify-center gap-2 box-border bg-[#fefaec] border border-[#ffbf00] text-[#ffbf00] w-[120px] text-sm p-1">
                  Đăng nhập <br /> với mã QR
                </div>
                <a className="text-3xl flex items-center gap-2 !text-[#ee4d2d]">
                  <FontAwesomeIcon icon="qrcode" />
                </a>
              </div>
            </div>
            {/* Form đăng nhập */}
            <form
              onSubmit={handleLogin}
              className="px-[30px] pb-[30px] flex flex-col gap-3"
            >
              <div className="flex items-center justify-center">
                <input
                  className="w-[100%] border rounded-sm border-[#a09f9f] p-[10px] focus:!border-[#ee4d2d] outline-none"
                  type="text"
                  placeholder="Email/Số điện thoại/Tên đăng nhập"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="flex items-center justify-center">
                <input
                  className="w-[100%] border rounded-sm border-[#a09f9f] p-[10px] focus:!border-[#ee4d2d] outline-none"
                  type="password" // Đổi sang type="password" để ẩn mật khẩu
                  placeholder="Mật khẩu"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {/* Hiển thị lỗi từ Local hoặc Server */}
              <div className="min-h-[42px] flex items-center">
                {(localError || serverError) && (
                  <p className="text-[#ff424e] text-[12px] leading-tight m-0">
                    {localError || serverError}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-center">
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`bg-[#ee4d2d] rounded-sm w-[100%] h-[40px] text-white font-semibold text-[15px] transition-opacity ${isLoading ? "opacity-70 cursor-not-allowed" : "hover:opacity-90"}`}
                >
                  {isLoading ? "ĐANG ĐĂNG NHẬP..." : "ĐĂNG NHẬP"}
                </button>
              </div>
              <div className="flex justify-between text-sm">
                <Link
                  to="#"
                  className="text-decoration-none text-blue-600 hover:underline"
                >
                  Quên mật khẩu
                </Link>
                <Link
                  to="#"
                  className="text-decoration-none text-blue-600 hover:underline"
                >
                  Đăng nhập với SMS
                </Link>
              </div>
              <div className="flex content-center justify-center items-center gap-2">
                <div className="bg-[#dbdbdb] h-[1px] w-[30%] my-2"></div>
                <div>Hoặc</div>
                <div className="bg-[#dbdbdb] h-[1px] w-[30%] my-2"></div>
              </div>
              {/* Các nút đăng nhập bằng mạng xã hội */}
              <div className="flex gap-2">
                <button className="flex-1 flex items-center justify-center gap-2 border border-gray-300 rounded-sm h-[40px] text-[14px] text-gray-700 font-normal hover:bg-gray-50 transition-colors">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Facebook_f_logo_%282019%29.svg/1280px-Facebook_f_logo_%282019%29.svg.png?utm_source=vi.wiktionary.org&utm_campaign=index&utm_content=thumbnail"
                    alt="Facebook"
                    className="w-5 h-5"
                  />
                  Facebook
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 border border-gray-300 rounded-sm h-[40px] text-[14px] text-gray-700 font-normal hover:bg-gray-50 transition-colors">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/3840px-Google_%22G%22_logo.svg.png"
                    alt="Google"
                    className="w-5 h-5"
                  />
                  Google
                </button>
              </div>
              <div className="text-center text-sm mt-2">
                Bạn mới biết đến Shopee?{" "}
                <Link to="/register" className="text-[#ee4d2d] hover:underline">
                  Đăng ký
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
