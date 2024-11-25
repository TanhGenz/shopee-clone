// file lam thu vien cho func refresh exios => refresh token => o moi file

import axios from "axios";
import { jwtDecode } from "jwt-decode";
// import { loginSuccess } from "./redux/authSlice"; 

  // REFRESH TOKEN 
  const refreshToken = async () => {
    try{
      const res = await axios.post("http://localhost:8000/v1/auth/refresh",{
        withCredentials: true,
      });
      return res.data;
    }catch(err){
      console.log(err);
    }
  }

export const createAxios = (user, dispatch, stateSuccess) => {
    const newInstance = axios.create();
    newInstance.interceptors.request.use(
        async(config) => {
          // /1000 = value exp in jwt.io
          let date = new Date();
          // jwt het han hay khong download package jwt-decode
          const decoedToken = jwtDecode(user?.accessToken);
          // tra lai data = jwt.io
          if (decoedToken.exp < date.getTime() / 1000) {
            // data chua new access token, new refresh token
            const data = await refreshToken();
            // het han => refresh token => update current user by new access token, new refresh token
            const refreshUser ={
              ...user, 
              accessToken: data.accessToken,
              // refreshToken: data.refreshToken,
            };
            dispatch(stateSuccess(refreshUser));
            // mun refresh fai tao header moi bang access token moi
            config.headers["token"] = "Bearer" + data.accessToken;
          }
          return config;
        },
        (err) => {
          return Promise.reject(err);
        }
      );
      return newInstance;
};





//   // trc khi gui req => interceptors se check co nhung gi trong day
//   // new axios
//   axiosJWT.interceptors.request.use(
//     async(config) => {
//       // /1000 = value exp in jwt.io
//       let date = new Date();
//       // jwt het han hay khong download package jwt-decode
//       const decoedToken = jwtDecode(user?.accessToken);
//       // tra lai data = jwt.io
//       if (decoedToken.exp < date.getTime() / 1000) {
//         // data chua new access token, new refresh token
//         const data = await refreshToken();
//         // het han => refresh token => update current user by new access token, new refresh token
//         const refreshUser ={
//           ...user, 
//           accessToken: data.accessToken,
//           // refreshToken: data.refreshToken,
//         };
//         dispatch(loginSuccess(refreshUser));
//         // mun refresh fai tao header moi bang access token moi
//         config.headers["token"] = "Bearer" + data.accessToken;
//       }
//       return config;
//     },
//     (err) => {
//       return Promise.reject(err);
//     }
//   );
