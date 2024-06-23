import { Box } from "@material-ui/core";
import React from "react";
import HospitalCarousel from "../HospitalCarousel";
import MaxHospital from "./MaxHospital";
import HospitalImages from "../HospitalImages";

const index = () => {
  return (
    <Box>
      <HospitalCarousel bannerType="Hospital" />
      {/* <HospitalImages /> */}
      <MaxHospital />
    </Box>
  );
};

export default index;
