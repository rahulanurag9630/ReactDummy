import React, { lazy } from "react";
import { Redirect } from "react-router-dom";
import HomeLayout from "src/layouts/HomeLayout";
import LoginLayout from "src/layouts/LoginLayout";
import DashboardLayout from "src/layouts/DashboardLayout";
import AuthGuard from "./config/AuthGuard";
// import AuthGuard from "./component/AuthGuard";

export const routes = [
  {
    exact: true,
    path: "/login",
    layout: LoginLayout,
    component: lazy(() => import("src/views/pages/Auth/Login")),
  },
  {
    exact: true,
    path: "/select-user-type",
    layout: LoginLayout,
    component: lazy(() => import("src/views/pages/Auth/login/UserType")),
  },
  {
    exact: true,
    path: "/patient-dashboard",
    layout: DashboardLayout,

    component: lazy(() =>
      import("src/views/pages/Dashboard/PatientModule/Dash")
    ),
    // guard: AuthGuard,
  },
  {
    exact: true,
    path: "/health-record",
    layout: DashboardLayout,
    component: lazy(() =>
      import("src/views/pages/Dashboard/PatientModule/HealthRecord")
    ),
    guard: AuthGuard,
  },
  {
    exact: true,
    path: "/requestpolicy",
    layout: DashboardLayout,
    component: lazy(() =>
      import("src/views/pages/Dashboard/PatientModule/RequestPolicy")
    ),
    guard: AuthGuard,
  },
  {
    exact: true,
    path: "/prescription",
    layout: DashboardLayout,
    component: lazy(() =>
      import("src/views/pages/Dashboard/PatientModule/Prescription")
    ),
    guard: AuthGuard,
  },
  {
    exact: true,
    path: "/appointment",
    layout: DashboardLayout,
    component: lazy(() =>
      import("src/views/pages/Dashboard/PatientModule/AppointMent")
    ),
    guard: AuthGuard,
  },
  {
    exact: true,
    path: "/editprofile",
    layout: DashboardLayout,
    component: lazy(() =>
      import("src/views/pages/Dashboard/PatientModule/EditProfile")
    ),
    guard: AuthGuard,
  },
  {
    exact: true,
    path: "/editdoctorprofile",
    layout: DashboardLayout,
    component: lazy(() =>
      import("src/views/pages/Home/DoctorsPage/EditDoctorProfile")
    ),
    guard: AuthGuard,
  },
  {
    exact: true,
    path: "/change-password",
    layout: DashboardLayout,
    component: lazy(() =>
      import("src/views/pages/Dashboard/PatientModule/changePassword")
    ),
    guard: AuthGuard,
  },
  {
    exact: true,
    path: "/labreport",
    layout: DashboardLayout,
    component: lazy(() =>
      import("src/views/pages/Dashboard/PatientModule/LabReport")
    ),
    guard: AuthGuard,
  },
  {
    exact: true,
    path: "/policy-listing",
    layout: DashboardLayout,
    component: lazy(() =>
      import(
        "src/views/pages/Dashboard/InsuranceModule/PolicyListing/PolicyListing"
      )
    ),
    guard: AuthGuard,
  },
  {
    exact: true,
    path: "/dashboard",
    layout: DashboardLayout,
    component: lazy(() =>
      import("src/views/pages/Dashboard/InsuranceModule/Dash")
    ),
    guard: AuthGuard,
  },
  {
    exact: true,
    path: "/view-policy",
    layout: DashboardLayout,
    component: lazy(() =>
      import(
        "src/views/pages/Dashboard/InsuranceModule/PolicyListing/ViewPolicy"
      )
    ),
    guard: AuthGuard,
  },
  {
    exact: true,
    path: "/pharmaceutical-dashboard",
    layout: DashboardLayout,
    component: lazy(() =>
      import(
        "src/views/pages/Dashboard/PharmaceuticalModule/PharmaceuticalDash"
      )
    ),
    guard: AuthGuard,
  },
  {
    exact: true,
    path: "/pharmaceutical-product-list",
    layout: DashboardLayout,
    component: lazy(() =>
      import(
        "src/views/pages/Dashboard/PharmaceuticalModule/Product/ProductList"
      )
    ),
    guard: AuthGuard,
  },
  {
    exact: true,
    path: "/pharmaceutical-order-list",
    layout: DashboardLayout,
    component: lazy(() =>
      import(
        "src/views/pages/Dashboard/PharmaceuticalModule/OrderListing/OrderList"
      )
    ),
  },
  {
    exact: true,
    path: "/pharmaceutical-view-order",
    layout: DashboardLayout,
    component: lazy(() =>
      import(
        "src/views/pages/Dashboard/PharmaceuticalModule/OrderListing/ViewOrder"
      )
    ),
  },
  {
    exact: true,
    path: "/doctor-appoinment",
    layout: DashboardLayout,
    component: lazy(() =>
      import("src/views/pages/Dashboard/DoctorModule/DoctorAppoinment")
    ),
    // guard: AuthGuard,
  },
  {
    exact: true,
    path: "/doctor-patient-list",
    layout: DashboardLayout,
    component: lazy(() =>
      import("src/views/pages/Dashboard/DoctorModule/PatientList")
    ),
    guard: AuthGuard,
  },
  // {
  //   exact: true,
  //   path: "/upload-prescription",
  //   layout: DashboardLayout,
  //   component: lazy(() =>
  //     import("src/views/pages/Dashboard/DoctorModule/UploadPrescription")
  //   ),
  //   // guard: AuthGuard,
  // },
  {
    exact: true,
    path: "/prescriptions",
    layout: DashboardLayout,
    component: lazy(() =>
      import("src/views/pages/Dashboard/DoctorModule/Prescription")
    ),
    guard: AuthGuard,
  },
  {
    exact: true,
    path: "/laboratory-patient-list",
    layout: DashboardLayout,
    component: lazy(() =>
      import("src/views/pages/Dashboard/LaboratoryModule/PatientList")
    ),
    guard: AuthGuard,
  },
  {
    exact: true,
    path: "/pharmaceutical-add-product",
    layout: DashboardLayout,
    component: lazy(() =>
      import(
        "src/views/pages/Dashboard/PharmaceuticalModule/Product/AddProduct"
      )
    ),
    guard: AuthGuard,
  },
  {
    exact: true,
    path: "/pharmaceutical-edit-product",
    layout: DashboardLayout,
    component: lazy(() =>
      import(
        "src/views/pages/Dashboard/PharmaceuticalModule/Product/EditProduct"
      )
    ),
    guard: AuthGuard,
  },
  {
    exact: true,
    path: "/pharmaceutical-view-product",
    layout: DashboardLayout,
    component: lazy(() =>
      import(
        "src/views/pages/Dashboard/PharmaceuticalModule/Product/ViewProduct"
      )
    ),
    guard: AuthGuard,
  },
  {
    exact: true,
    path: "/Add-policy",
    layout: DashboardLayout,
    component: lazy(() =>
      import(
        "src/views/pages/Dashboard/InsuranceModule/PolicyListing/AddPolicy"
      )
    ),
    guard: AuthGuard,
  },
  {
    exact: true,
    path: "/edit-policy",
    layout: DashboardLayout,
    component: lazy(() =>
      import(
        "src/views/pages/Dashboard/InsuranceModule/PolicyListing/EditPolicy"
      )
    ),
    guard: AuthGuard,
  },
  {
    exact: true,
    path: "/customer-list",
    layout: DashboardLayout,
    component: lazy(() =>
      import(
        "src/views/pages/Dashboard/InsuranceModule/CustomerListing/CustomerList"
      )
    ),
    guard: AuthGuard,
  },
  {
    exact: true,
    path: "/sign-up",
    layout: LoginLayout,
    component: lazy(() => import("src/views/pages/Auth/signup/PatientSignUp")),
  },

  {
    exact: true,
    path: "/doc-sign-up",
    layout: LoginLayout,
    component: lazy(() => import("src/views/pages/Auth/signup/DoctorSignUp")),
  },
  {
    exact: true,
    path: "/reset-password",
    layout: LoginLayout,
    component: lazy(() => import("src/views/pages/Auth/ResetPassword")),
  },
  {
    exact: true,
    path: "/forget-password",
    layout: LoginLayout,
    component: lazy(() => import("src/views/pages/Auth/Forget")),
  },
  {
    exact: true,
    path: "/verify-otp",
    layout: LoginLayout,
    component: lazy(() => import("src/views/pages/Auth/Verifyotp")),
  },
  {
    exact: true,
    path: "/change-password",
    layout: LoginLayout,
    component: lazy(() => import("src/views/pages/Auth/ChangePassword")),
  },
  {
    exact: true,
    path: "/bookappointment",
    // layout: HomeLayout,
    component: lazy(() => import("src/views/pages/Home/BookAppointment")),
  },
  {
    exact: true,
    path: "/healthreportmanage",
    layout: HomeLayout,
    component: lazy(() => import("src/views/pages/Home/HealthReportManage")),
    guard: AuthGuard,
  },

  {
    exact: true,
    path: "/orderdetail",
    layout: HomeLayout,
    component: lazy(() => import("src/views/pages/Home/OrderDetail")),
    guard: AuthGuard,
  },
  {
    exact: true,
    path: "/doctors-page",
    layout: HomeLayout,
    component: lazy(() => import("src/views/pages/Home/DoctorsPage/index")),
  },
  {
    exact: true,
    path: "/all-doctors",
    layout: HomeLayout,
    component: lazy(() =>
      import("src/views/pages/Home/DoctorsPage/AllDoctors")
    ),
  },
  {
    exact: true,
    path: "/hospitals-page",
    layout: HomeLayout,
    component: lazy(() => import("src/views/pages/Home/HospitalsPage/index")),
  },
  {
    exact: true,
    path: "/all-hospitals",
    layout: HomeLayout,
    component: lazy(() =>
      import("src/views/pages/Home/HospitalsPage/AllHospitals")
    ),
  },
  {
    exact: true,
    path: "/all-features",
    layout: HomeLayout,
    component: lazy(() => import("src/views/pages/Home/Desktop1/AllFeatures")),
  },
  {
    exact: true,
    path: "/laboratory-listing",
    layout: HomeLayout,
    component: lazy(() =>
      import("src/views/pages/Home/LaboratoryList/LaboratoryListing")
    ),
  },
  {
    exact: true,
    path: "/all-laboratory",
    layout: HomeLayout,
    component: lazy(() =>
      import("src/views/pages/Home/LaboratoryList/AllLaboratories")
    ),
  },
  {
    exact: true,
    path: "/product-list",
    layout: HomeLayout,
    // component: lazy(() =>
    //   import("src/views/pages/Home/HospitalsPage/HospitalsPage4/Index")
    // ),
    component: lazy(() =>
      import("src/views/pages/Home/HospitalsPage/MedicalListing/index.js")
    ),
  },
  {
    exact: true,
    path: "/medical-product",
    layout: HomeLayout,
    component: lazy(() =>
      import("src/views/pages/Home/HospitalsPage/HospitalsPage4/Index")
    ),
    // component: lazy(() =>
    //   import("src/views/pages/Home/HospitalsPage/MedicalListing/index.js")
    // ),
  },
  {
    exact: true,
    path: "/all-categories",
    layout: HomeLayout,
    component: lazy(() =>
      import(
        "src/views/pages/Home/HospitalsPage/HospitalsPage4/AllCategoryCarousel"
      )
    ),
  },
  {
    exact: true,
    path: "/hospitals-description",
    layout: HomeLayout,
    component: lazy(() =>
      import("src/views/pages/Home/HospitalsPage/HospitalPage2/index")
    ),
  },
  {
    exact: true,
    path: "/insurance-policy",
    layout: HomeLayout,
    component: lazy(() =>
      import("src/views/pages/Home/Insurance/InsurancePolicy")
    ),
  },
  {
    exact: true,
    path: "/all-insurance",
    layout: HomeLayout,
    component: lazy(() =>
      import("src/views/pages/Home/Insurance/InsuranceList")
    ),
  },
  {
    exact: true,
    path: "/insurance-description",
    layout: HomeLayout,
    component: lazy(() =>
      import("src/views/pages/Home/Insurance/InsuranceDescription")
    ),
  },
  {
    exact: true,
    path: "/hospitals-page3",
    layout: HomeLayout,
    component: lazy(() =>
      import("src/views/pages/Home/HospitalsPage/HospitalsPage3/index")
    ),
  },
  {
    exact: true,
    path: "/view-doctors-categories",
    layout: HomeLayout,
    component: lazy(() =>
      import("src/views/pages/Home/DoctorsPage/ViewCategories")
    ),
  },
  {
    exact: true,
    path: "/productdescription",
    layout: HomeLayout,
    component: lazy(() => import("src/views/pages/Home/ProductDescription")),
  },
  {
    exact: true,
    path: "/delevaryaddress",
    layout: HomeLayout,
    component: lazy(() => import("src/views/pages/Home/DelevaryAddress")),
    guard: AuthGuard,
  },
  {
    exact: true,
    path: "/addnewaddress",
    layout: HomeLayout,
    component: lazy(() => import("src/views/pages/Home/AddNewAddress")),
    guard: AuthGuard,
  },
  {
    exact: true,
    path: "/mycart",
    layout: HomeLayout,
    component: lazy(() => import("src/views/pages/Home/MyCart")),
    guard: AuthGuard,
  },
  {
    exact: true,
    path: "/myorder",
    layout: HomeLayout,
    component: lazy(() => import("src/views/pages/Home/MyOrder")),
    guard: AuthGuard,
  },
  {
    exact: true,
    path: "/",
    layout: HomeLayout,
    component: lazy(() => import("src/views/pages/Home")),
  },
  {
    exact: true,
    path: "/404",
    component: lazy(() => import("src/views/errors/NotFound")),
  },
  {
    exact: true,
    path: "/my-account",
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/Profile/MyAccount")),
  },
  {
    exact: true,
    path: "/terms-and-conditions",
    layout: HomeLayout,
    component: lazy(() => import("src/views/pages/static/TermsAndCondition")),
  },
  {
    exact: true,
    path: "/about",
    layout: HomeLayout,
    component: lazy(() => import("src/views/pages/static/About")),
  },
  {
    exact: true,
    path: "/aboutus",
    layout: HomeLayout,
    component: lazy(() => import("src/views/pages/static/About")),
  },
  {
    exact: true,
    path: "/privacy",
    layout: HomeLayout,
    component: lazy(() => import("src/views/pages/static/PrivacyPolicy")),
  },
  {
    exact: true,
    path: "/faqs",
    layout: HomeLayout,
    component: lazy(() => import("src/views/pages/static/Faq")),
  },
  {
    exact: true,
    path: "/contact-us",
    layout: HomeLayout,
    component: lazy(() => import("src/views/pages/static/ContactUs")),
  },
  {
    exact: true,
    path: "/past-history",
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/Dashboard/Pasthistory")),
  },
  {
    exact: true,
    path: "/cookies-policy",
    layout: HomeLayout,
    component: lazy(() => import("src/views/pages/static/CookiesPolicy")),
  },

  {
    component: () => <Redirect to="/404" />,
  },
];
