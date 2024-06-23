import { Box } from "@material-ui/core";
import React from "react";
import LandingCarousel from "../Desktop1/LandingCarousel";
import Categories from "./Categories";
import DoctorServices from "./DoctorServices";
import HospitalCarousel from "../HospitalsPage/HospitalCarousel";

const Doctors = () => {
  // const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  // const handleCategorySelect = (categoryId) => {
  //   setSelectedCategoryId(categoryId);
  // };
  return (
    <Box>
      {/* <LandingCarousel /> */}
      <HospitalCarousel bannerType="Doctor" />
      <Categories />
      <Box mt={9}>
        <DoctorServices />
      </Box>
    </Box>
  );
};

export default Doctors;
