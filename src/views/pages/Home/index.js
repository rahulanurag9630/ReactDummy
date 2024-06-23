import React,{useEffect, useState} from "react";
import { Box } from "@material-ui/core";
import Page from "src/component/Page";
import Banner from "./Banner";
import Cookiedialog from "../../../component/Cookiedialog";
import axios from "axios";
import { getApiHandler } from "src/config/service";
function Home(props) {
 const [cookieData,setCookieData]= useState(null)
  const getCookiePolicy = async () => {
 
    const res = await getApiHandler("Cookie-policy");   
    console.log(res, "dddddddddddddddd");
    
   
    if (!res) {
      return;
    }
    console.log(res?.data, "dhwjdghwjg");
    setCookieData(res?.responseBody?.length > 0 ? res?.responseBody[0] : {});
    // setisdata(true)
  };
  useEffect(() => {
    getCookiePolicy();
  },[])
  return (

    <Page title="Health Trust">
   {cookieData && <Cookiedialog cookieData={cookieData} />}
      <Box>
        <Banner />
      </Box>
    </Page>
  );
}

export default Home;     