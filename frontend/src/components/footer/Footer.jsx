import "./footer.css";
export default function Footer() {
  return (
    <div className="bg-gray-100 py-10">
      <div className="container container_Footer mx-auto">
        <div className="grid grid-cols-5 gap-6 total_Column">
          {/* Column 1 */}
          <div>
            <h1 className="text-lg font-bold mb-4">Chăm sóc khách hàng</h1>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <a href="#" className="hover:text-orange-500">
                  Trung tâm trợ giúp
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-500">
                  Shopee Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-500">
                  Shopee Mall
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-500">
                  Hướng Dẫn Mua Hàng
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-500">
                  Thanh Toán
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-500">
                  Shopee Xu
                </a>
              </li>
            </ul>
          </div>
          {/* Column 2 */}
          <div>
            <h1 className="text-lg font-bold mb-4">Về Shopee</h1>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <a href="#" className="hover:text-orange-500">
                  Giới Thiệu Về Shopee Việt Nam
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-500">
                  Tuyển Dụng
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-500">
                  Điều Khoản Shopee
                </a>
              </li>
            </ul>
          </div>
          {/* Column 3 */}
          <div>
            <h1 className="text-lg font-bold mb-4">Thanh Toán</h1>
            <div className="grid-container">
              <img
                src="https://down-vn.img.susercontent.com/file/d4bbea4570b93bfd5fc652ca82a262a8"
                alt="payment"
              />
              <img
                src="https://down-vn.img.susercontent.com/file/a0a9062ebe19b45c1ae0506f16af5c16"
                alt="payment"
              />
              <img
                src="https://down-vn.img.susercontent.com/file/38fd98e55806c3b2e4535c4e4a6c4c08"
                alt="payment"
              />
              <img
                src="https://down-vn.img.susercontent.com/file/bc2a874caeee705449c164be385b796c"
                alt="payment"
              />
              <img
                src="https://down-vn.img.susercontent.com/file/2c46b83d84111ddc32cfd3b5995d9281"
                alt="payment"
              />
              <img
                src="https://down-vn.img.susercontent.com/file/5e3f0bee86058637ff23cfdf2e14ca09"
                alt="payment"
              />
              <img
                src="https://down-vn.img.susercontent.com/file/9263fa8c83628f5deff55e2a90758b06"
                alt="payment"
              />
              <img
                src="https://down-vn.img.susercontent.com/file/0217f1d345587aa0a300e69e2195c492"
                alt="payment"
              />
            </div>
          </div>
          {/* Column 4 */}
          <div>
            <h1 className="text-lg font-bold mb-4">Theo dõi chúng tôi</h1>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <i className="fab fa-facebook"></i>{" "}
                <a href="#" className="hover:text-orange-500">
                  Facebook
                </a>
              </li>
              <li>
                <i className="fab fa-instagram"></i>{" "}
                <a href="#" className="hover:text-orange-500">
                  Instagram
                </a>
              </li>
            </ul>
          </div>
          {/* Column 5 */}
          <div>
            <h1 className="text-lg font-bold mb-4">Tải ứng dụng Shopee</h1>
            <div className="flex items-center">
              <img
                src="https://down-vn.img.susercontent.com/file/a5e589e8e118e937dc660f224b9a1472"
                alt="qr"
                className="w-16 h-16"
              />
              <div className="ml-4">
                <img
                  src="https://down-vn.img.susercontent.com/file/ad01628e90ddf248076685f73497c163"
                  alt="app store"
                  className="mb-2"
                />
                <img
                  src="https://down-vn.img.susercontent.com/file/ae7dced05f7243d0f3171f786e123def"
                  alt="google play"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
