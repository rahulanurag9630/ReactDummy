// export const url = "http://172.16.6.13:8000/api/v1"; //Shanu Bhai
// export const url = "http://172.16.6.35:5000/api/v1"; //saif
// export const url = "http://172.16.6.13:3000/api/v1";
// export const url = "http://172.16.6.141:8000/api/v1"; //sukrit sir
// export const url = "http://172.16.6.141:8000/api/v1"; //sukrit sir

//Staging url...

export const url = "https://pyhospital-management.mobiloitte.io/api/v1";
export const mediaUrl = "https://pyhospital-management.mobiloitte.io";

// export const url="http://172.16.6.35:9000/api/v1"
// export const mediaUrl="http://172.16.6.35:9000";
// export const url="http://172.16.6.86:9000/api/v1";
// export const mediaUrl="http://172.16.6.86:9000";
// export const mediaUrl = "http://172.16.6.41:8000";
// export const mediaUrl = "http://172.16.6.35:5000"; //saif

// export const url="http://172.16.6.141:5000/api/v1"
// export const mediaUrl="http://172.16.6.141:5000"
// export const url="http://172.16.6.13:8000/api/v1";
// export const mediaUrl="http://172.16.6.13:8000"

export const ApiConfig = {
  // Guest

  //Landing and Static
  "infrastructure-list": `${url}/guest/infrastructure-list/`,
  "key-features": `${url}/guest/key-features/`,
  "banner-list": `${url}/guest/banner-list/`,
  "testimonials-list": `${url}/guest/testimonials-list/`,
  "About-Us": `${url}/guest/About-Us/`,
  "Cookie-policy": `${url}/guest/CookiesPolicy/`,
  "Privacy-Policy": `${url}/guest/Privacy-Policy/`,
  Faq: `${url}/guest/FAQs/`,
  "Tearms-And-Conditions": `${url}/guest/Tearms-And-Conditions/`,
  "hospital-listing": `${url}/guest/AllHospitals-View/`,
  "hospital-view": `${url}/guest/Hospital`,
  "medical-category": `${url}/landing/product-categories/`,
  "product-list": `${url}/landing/pharmacy-products-filtered_by-category/`,
  "hospital-doctor-list": `${url}/guest/hospital_Doctor`,
  "insurance-listing": `${url}/guest/Insurance-Policy-Listing/`,
  insuranceDescription: `${url}/landing/insurance/`,
  subscribe: `${url}/guest/subscribe-to-newsletter/`,
  "insurance-policy-options": `${url}/patient/view-requested-policy-filter-options/`,
  contactUs: `${url}/guest/GetInTouch-add-data/`,
  country: `${url}/guest/countries/`,
  state: `${url}/guest/states/`,
  city: `${url}/guest/cities/`,
  doctorDetails: `${url}/doctor/view-detail/`,
  getContactUsDetails: `${url}/guest/ContactUs/`,

  //Auth
  signup: `${url}/patient/signup/`,
  signupdoc: `${url}/doctor/signup/`,
  verifyOtp: `${url}/patient/forgot-password-otp-verify/`,
  verifyOtpsignup: `${url}/patient/otp-verification/`,

  login: `${url}/login/`,
  resendOtp: `${url}/patient/resend-otp/`,
  forgotPassword: `${url}/patient/forgot-password/`,
  forgotPasswordVerify: `${url}/patient/forgot-password-otp-verify/`,
  doctorList: `${url}/doctor/hospital-list/`,
  specialization: `${url}/doctor/specialization-list/`,
  changePassword: `${url}/patient/change-password/`,
  notifications: `${url}/notifications/`,
  readNotification: `${url}/notifications-mark-as-read/`,
  clearAllNotification: `${url}/notifications/clear-all`,

  //Profile
  getProfileData: `${url}/patient/view-current-patient-user-detail/`,
  getProfileDoctor: `${url}/doctor/view-current-doctor-user-detail/`,
  updateProfileData: `${url}/patient/update-profile/`,

  //patient
  patientDashboard: `${url}/patient/dashboard/`,
  bookAppointment: `${url}/patient/create-appointment/`,
  appointmentList: `${url}/patient/appointments/`,
  downloadCsv: `${url}/patient/appointments/csv/`,
  prescriptionList: `${url}/patient/prescriptions_list/`,
  downloadPrescriptionCsv: `${url}/patient/download-prescriptionList-csv/`,
  downloadPrescriptionById: `${url}/patient/download-prescription-file/`,
  doctorPrescriptionById: `${url}/doctor/download-prescription-file/`,
  viewPrescription: `${url}/patient/view-prescription-file/`,
  doctorLists: `${url}/patient/doctor-list/`,
  getHealthDataForPatient: `${url}/patient/health-record-details/`,
  createHealthRecordData: `${url}/patient/create-health-record/`,
  uploadScanImage: `${url}/patient/scan-image-upload`,
  uploadLabReport: `${url}/patient/lab-reports-upload`,
  "patient-viewrequest-policy": `${url}/patient/view-requested-policy/`,
  "patient-viewrequest-policy-options": `${url}/patient/view-requested-policy-filter-options/`,
  getScanFiles: `${url}/patient/view-scan-image`,
  getLabReportFiles: `${url}/patient/view-lab-reports`,
  viewCart: `${url}/patient/view-cart/`,
  getMedicalDescription: `${url}/patient/product-details/`,
  createCart: `${url}/patient/add-to-cart/`,
  placeOrder: `${url}/patient/placed-order/`,
  myOrder: `${url}/patient/order-list/`,
  deleteAppointment: `${url}/patient/delete-appointment/`,
  handleCheckForAppointment: `${url}/patient/change-appointment-status-to-cancle/`,
  handleCheckInStatus: `${url}/patient/check-in-status/`,
  deleteScanFile: `${url}/patient/delete-scan-image`,
  deleteLabFile: `${url}/patient/delete-lab-reports`,
  uploadImge: `${url}/patient/update-profile-picture-only/`,
  addAddress: `${url}/patient/create-delivery-address/`,
  updateAddress: `${url}/patient/update-delivery-address/`,
  deleteAddress: `${url}/patient/delete-delivery-address/`,
  orderDetailById: `${url}/patient/order-detail-byid/`,
  cancelOrder: `${url}/patient/cancel-order/`,
  reOrder: `${url}/patient/reorder-order/`,
  laboratory: `${url}/laboratory/laboratorycompany/`,
  laboratoryInfo: `${url}/laboratory/laboratorycompany/details/`,

  fetchAllAddress: `${url}/patient/all-delivery-addresses/`,
  deleteCartItem: `${url}/patient/delete-cart-item/`,
  updateCartItem: `${url}/patient/update-cart-product-quantity/`,
  laboratoryList: `${url}/patient/patient-labreports-listing`,
  downloadCsvLab: `${url}/patient/download-lab-reports`,
  downloadLabById: `${url}/patient/download-labreports-listing-report`,
  viewlabById: `${url}/patient/view-labreports-listing-report`,
  setDefaultAddress: `${url}/patient/set-default-address/`,
  //doctor
  previewData: `${url}/patient/preview/`,
  doctorCategory: `${url}/guest/CategoryAndFeatureView-View/`,
  "doctor-patient-list": `${url}/doctor/patients_list/`,
  doctorPatientCsv: `${url}/doctor/download-patients-csv/`,
  "appointments-opdIpd": `${url}/doctor/appointments_list_for_doctor/`,
  "download-csv": `${url}/doctor/download-appointments-csv/`,
  uploadPrescriptionFile: `${url}/doctor/upload-prescription/`,
  handlecancelDoctorAppointment: `${url}/doctor/cancel-appointment-status/`,
  handleConfirmDoctorAppointment: `${url}/doctor/confirm-appointment-status/`,
  handleCompleteDoctorAppointment: `${url}/doctor/complete-appointment-status/`,
  viewPatientHealth: `${url}/doctor/patient-health-record-by-id/`,
  markAsFavDoctor: `${url}/patient/add-doctor-to-wishlist/`,
  removeFavDoctor: `${url}/patient/remove-doctor-from-wishlist/`,
  markAsInsuranceFav: `${url}/patient/add-insurance-to-wishlist/`,
  removeInsuranceFav: `${url}/patient/remove-insurance-from-wishlist/`,
  markAsLabFav: `${url}/patient/patient_intrested_laboratory/`,
  removeLabFav: `${url}/patient/patient_intrested_laboratory_remove/`,
  purchasePolicy: `${url}/patient/make-request-policy/`,
  updateDocProfile: `${url}/doctor/update-doc-profile/`,
  uploadMedicinesReport: `${url}/doctor/upload-prescription2/`,
  searchMedicines: `${url}/doctor/search-medicines/`,
  patientDoctorDetails: `${url}/doctor/prescription-detail/`,
  doctorUploadHealthRecord: `${url}/doctor/upate-patient-health-record/`,
};
