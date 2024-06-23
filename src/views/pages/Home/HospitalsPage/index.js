import { Box } from "@material-ui/core";
import React from "react";
import HospitalService from "./HospitalService";
import HospitalCarousel from "./HospitalCarousel";

const Doctors = () => {
  const hospitalsCategories = {
    name: "HOSPITALS",
    title: "Top Hospitals Available For Near Your3333",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
  };
  return (
    <Box>
      <HospitalCarousel bannerType="Hospital" />
      <HospitalService />
    </Box>
  );
};

export default Doctors;
