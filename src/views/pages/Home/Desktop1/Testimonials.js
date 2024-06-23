// import React, { useEffect, useRef, useState } from "react";
// import {
//   Avatar,
//   Box,
//   CircularProgress,
//   Grid,
//   Typography,
//   makeStyles,
// } from "@material-ui/core";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import Slider from "react-slick";
// import axios from "axios";
// import { ApiConfig, mediaUrl } from "../../../../config/apiConfig";

// const useStyles = makeStyles((theme) => ({
//   slideContainer: {
//     position: "relative",
//     backgroundImage: "url(images/Green.png)",
//     backgroundSize: "cover",
//     backgroundPosition: "center",
//     display: "flex",
//     alignItems: "center",
//     height: "555px",
//     "& h2, & p": {
//       color: "white",
//       textAlign: "center",
//     },
//   },
//   overlayBox: {
//     position: "absolute",
//     gap: "30px",
//     zIndex: 1,
//     width: "100%",
//     [theme.breakpoints.only("xs")]: {
//       gap: "9px",
//     },
//     "& h5": {
//       letterSpacing: "5.06px",
//       color: theme.palette.background.default,
//       fontSize: "22px",
//     },
//     "& h2": {
//       fontFamily: "Calistoga",
//       marginBottom: "50px",
//     },
//     "& h3": {
//       fontSize: "32px",
//       fontWeight: 400,
//       color: theme.palette.background.default,
//       textAlign: "center",
//       width: "70%",
//       marginTop: "18px",
//     },
//     "& p": {
//       fontFamily: "Calistoga",
//     },
//   },
//   testimonialAll: {
//     "& .slick-next:hover , & .slick-next , & .slick-next:focus , & .slick-next:hover":
//       {
//         backgroundImage: "url('/images/rightBtn.png')",
//         backgroundRepeat: "no-repeat",
//         height: "60px",
//         right: "25px",
//         width: "60px",
//         borderRadius: "50%",
//       },
//     "& .slick-prev, & .slick-prev:hover, & .slick-prev:hover, & .slick-prev:focus":
//       {
//         zIndex: "20",
//         left: "25px",
//         backgroundImage: "url('/images/leftBtn.png')",
//         backgroundRepeat: "no-repeat",
//         height: "60px",
//         width: "60px",
//         borderRadius: "50%",
//         content: " ",
//       },
//     "& .slick-next:before, & .slick-prev:before": {
//       color: "transparent",
//     },
//   },
// }));

// const Testimonials = () => {
//   const classes = useStyles();
//   const [testimonialList, setTestimonialList] = useState([]);
//   const [isDataLoading, setIsDataLoading] = useState(false);
//   const sliderRef = useRef();

//   useEffect(() => {
//     getTestimonialList();
//   }, []);

//   var settings = {
//     dots: false,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//   };

//   const getTestimonialList = async () => {
//     setIsDataLoading(true);
//     try {
//       const res = await axios({
//         url: ApiConfig["testimonials-list"],
//         method: "GET",
//       });
//       setIsDataLoading(false);
//       if (res?.data?.ResponseCode == 200) {
//         let resData = res?.data?.ResponseBody;
//         setTestimonialList(resData || []);
//       }
//     } catch (error) {
//       setIsDataLoading(false);
//       console.log(error);
//     }
//   };

//   return (
//     <>
//       {testimonialList.length > 0 && (
//         <Slider {...settings} className={classes.testimonialAll}>
//           {isDataLoading ? (
//             <Grid container justifyContent="center" alignItems="center">
//               {/* <CircularProgress /> */}
//             </Grid>
//           ) : (
//             testimonialList.map((testimonial, index) => (
//               <div key={index}>
//                 <div className={classes.slideContainer}>
//                   <Box className={`${classes.overlayBox} displayColumnCenter`}>
//                     <Typography variant="h5">Testimonials</Typography>
//                     {/* <Typography variant="h2">{testimonial.name}</Typography> */}
//                     <Avatar
//                       src={
//                         testimonial?.image
//                           ? `${mediaUrl}${testimonial.image}`
//                           : "/image/avatar.png"
//                       }
//                       style={{
//                         height: "80px",
//                         width: "80px",
//                       }}
//                     />
//                     {/* <img alt="" width="100px" height="100px" /> */}
//                     <Typography variant="h3">
//                       {testimonial?.description?.length > 200
//                         ? testimonial?.description?.slice(0, 200) + "..."
//                         : testimonial?.description}
//                     </Typography>
//                     <Typography variant="body2">
//                       author:{" "}
//                       {testimonial?.name
//                         ? testimonial.name.split(" ").slice(0, 25).join(" ") +
//                           "..."
//                         : ""}
//                     </Typography>
//                   </Box>
//                 </div>
//               </div>
//             ))
//           )}
//         </Slider>
//       )}
//     </>
//   );
// };

// export default Testimonials;
