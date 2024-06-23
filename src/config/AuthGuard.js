import React, { useContext } from "react";
import { Redirect, useLocation } from "react-router-dom";
import { AuthContext } from "src/context/Auth";

export default function AuthGuard({ children }) {
  const location = useLocation();
  const auth = useContext(AuthContext);

  const nonGuardedPaths = ["/login", "/"];
  const guardedPaths = [
    // "/patient-dashboard",
    "/health-record",
    "/requestpolicy",
    "/prescription",
    "/appointment",
    "/editprofile",
    "/editdoctorprofile",
    "/change-password",
    "/labreport ",
    "/policy-listing",
    "/dashboard",
    "/view-policy",
    "/pharmaceutical-dashboard",
    "/pharmaceutical-product-list",
    "/pharmaceutical-order-list",
    "/pharmaceutical-view-order",
    "/doctor-appoinment",
    "/doctor-patient-list",
    "/prescriptions",
    "/laboratory-patient-list",
    "/pharmaceutical-add-product",
    "/pharmaceutical-edit-product",
    "/pharmaceutical-view-product",
    "/Add-policy",
    "/edit-policy",
    "/customer-list",
    "/healthreportmanage",
    "/orderdetail",
    "/delevaryaddress",
    "/addnewaddress",
    "/mycart",
    "/myorder",
  ];

  if (!auth.userLoggedIn && guardedPaths.includes(location.pathname)) {
    return <Redirect to="/" />;
  }

  if (nonGuardedPaths.includes(location.pathname)) {
    if (localStorage.getItem("userRole") === "PAT") {
      return <Redirect to="/patient-dashboard" />;
    }
    if (localStorage.getItem("userRole") === "DOC") {
      return <Redirect to="/doctor-appointment" />;
    }
  }

  return <>{children}</>;
}
