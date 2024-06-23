// import React, { useContext } from "react";
// import { Redirect } from "react-router-dom";
// import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
// import { AuthContext } from "src/context/Auth";

// export default function AuthGuard(props) {
//   const { children } = props;
//   const { pathname } = useLocation();
//   const auth = useContext(AuthContext);
//   const nonGuardedPaths = ["/login", "/"]; //included all non guarded path
//   const guardedPaths = ["/patient-dashboard"]; //included all guarded path

//   if (!auth.userLoggedIn && guardedPaths.includes(pathname)) {
//     return <Redirect to="/" />;
//   }

//   if (nonGuardedPaths.includes(pathname)) {
//     if (localStorage.getItem("userRole") === "PAT") {
//       return <Redirect to="/patient-dashboard" />;
//     }
//     if (localStorage.getItem("userRole") === "DOC") {
//       return <Redirect to="/doctor-appoinment" />;
//     }
//   }

//   return <>{children}</>;
// }
