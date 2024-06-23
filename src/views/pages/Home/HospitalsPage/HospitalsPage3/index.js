import {
  Box,
  Button,
  Container,
  Typography,
  makeStyles,
} from "@material-ui/core";
import React from "react";
import HospitalCarousel from "src/views/pages/Home/HospitalsPage/HospitalCarousel";
import SearchTextFields from "../../SearchTextFields";
import AppointMent from "../../AppointMent";
import DoctorsNews from "../../DoctorsPage/DoctorsNews";
import { Pagination } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  page3Container: {
    "& .belowCarousel": {
      "& .insurance": {
        "& h2": {
          color: theme.palette.primary.dark,
          fontSize: "42px",
          fontWeight: 600,
          marginBottom: "35px",
        },
        "& p": {
          color: theme.palette.text.secondary,
        },
      },
      "& .viewAllBoxService": {
        flexWrap: "wrap",
        "& .pagination": {
          marginTop: "15px",
          width: "fit-content",
          "& button": {
            padding: "7px 14px",
            height: "auto",
            color: theme.palette.text.secondary,
          },
          "& .MuiPaginationItem-page.Mui-selected": {
            backgroundColor: theme.palette.primary.main,
            color: "white",
          },
        },
      },
    },
  },
}));

const Index = () => {
  const classes = useStyles();
  return (
    <>
      <Box mb={5}>
        <HospitalCarousel />
      </Box>
      <Container maxWidth="xlg" className={classes.page3Container}>
        <Box className="belowCarousel">
          <Box mb={5} className="insurance">
            <Typography variant="h2">Insurance Agencies</Typography>
            <Typography variant="body2">
              In publishing and graphic design, Lorem ipsum is a placeholder
              text commonly used to demonstrate the visual form of a document or
              a typeface without relying on meaningful content. Lorem ipsum may
              be used as a placeholder before final copy is available.In
              publishing and graphic design, Lorem ipsum is a placeholder text
              commonly used to demonstrate the visual form of a document or a
              typeface without relying on meaningful content. Lorem ipsum may be
              used as a placeholder before final copy is available.
            </Typography>
          </Box>
          <Box>
            <SearchTextFields />
          </Box>
          <Box>
            <AppointMent />
          </Box>
          <Box mt={4} className={`viewAllBoxService displaySpacebetween`}>
            <Button variant="contained">View All</Button>
            <Pagination
              count={22}
              shape="rounded"
              size="small"
              className="pagination"
            />
          </Box>
        </Box>
      </Container>
      <DoctorsNews />
    </>
  );
};

export default Index;
