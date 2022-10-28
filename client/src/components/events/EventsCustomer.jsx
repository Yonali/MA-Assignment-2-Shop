import React, { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import Shakir from "../../Shakir.jpg";
import SearchIcon from "@mui/icons-material/Search";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

// import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import axios from "axios";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";

// import PageHeader from "../../../components/PagesHeader/PageHeader";
import Button from "../button/Button";
// import avatar from "../../documents/avatar.jpg";
// import avatar2 from "../../documents/avatar2.png";
// import avatar3 from "../../documents/avatar3.png";
// import avatar4 from "../../documents/avatar4.jpg";
// import avatar5 from "../../documents/avatar5.jpg";

import Rate from "../rate/Rate";

//import pho2 from "../../documents/pho2.jpg";

import { Link } from "react-router-dom";

const API_URL = "http://localhost:4000/api/customerevent";
const IMG_URL2 = "http://localhost:4000/api/serviceprovider/portfolioimages";
const IMAGE_URL = "http://localhost:4000/api/users/profilepicture/";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
// function EventsCustomer(props) {
function EventsCustomer({ userid, data }) {
  const [popup, setPopup] = useState(false);
  const [popupS, setPopupS] = useState(false);
  //const [service, setService] = useState(false);

  const [serviceRegister, setServiceRegister] = useState(true);
  const [value, setValue] = React.useState(0);
  const [cevent, setCevent] = React.useState([]);
  const [id, setId] = useState();

  const [servicesError, setServicesError] = useState("");
  const [ratingsError, setRatingsError] = useState("");
  const [eventsError, setEventsError] = useState("");
  const [services, setServices] = useState([]);
  const [ratings, setRatings] = useState([]);

  const [events, setEvents] = useState([]);
  const [events2, setEvents2] = useState([]);
  const [eventDetail, setEventDetails] = useState();
  const [rateValue, setRateValue] = useState(1);
  const [itemData, setItemData] = useState([]);
  const [image, setImage] = useState("");


  const getProfilePic = async () => {
    const res = await axios.get(IMAGE_URL);
    setImage(res.data.image);
  };
  // const getProfilePic = async () => {
  //   const res = await axios.get(IMAGE_URL + sender);
  //   setImage(res.data.image);
  // };

  const File_Url = "http://localhost:4000/profilePics/";


  let hall = false;
  let decoration = false;
  let refreshment = false;
  let photography = false;
  let oneabove = false;
  let twoabove = false;
  let threeabove = false;
  let fourabove = false;
  let fivestars = false;

  if (services.includes("hall")) {
    hall = true;
    //  console.log(hall);
  }
  if (services.includes("decoration")) {
    decoration = true;
  }
  if (services.includes("refreshment")) {
    refreshment = true;
  }
  if (services.includes("photography")) {
    photography = true;
  }
  // if (services.includes("hall2")) {
  //   hall2 = true;
  // }
  // if (services.includes("decoration2")) {
  //   decoration2 = true;
  // }
  // if (services.includes("refreshment2")) {
  //   refreshment2 = true;
  // }
  // if (services.includes("photography2")) {
  //   photography2 = true;
  // }

  if (ratings.includes("oneabove")) {
    oneabove = true;
  }
  if (ratings.includes("twoabove")) {
    twoabove = true;
  }
  if (ratings.includes("threeabove")) {
    threeabove = true;
  }
  if (ratings.includes("fourabove")) {
    fourabove = true;
  }
  if (ratings.includes("fivestars")) {
    fivestars = true;
  }
  async function fetchCevent() {
    try {
      const res = await axios.get(API_URL);
      setEvents(res.data);
      setEvents2(res.data);
    } catch (error) {
      console.error(error.message);
    }

    // const res = await axios.post(API_URL, {
    //   id: id,
    // });
    // setCevent(res.data);
  }
  let _userid = 0;
  function getspid(userid) {
    _userid = userid;
  }
  const [portfolio_images, setPortfolio_images] = useState([]);

  async function getportfolioimages(uid) {
    try {
      const res = await axios.get(IMG_URL2 + "/" + uid);
      setPortfolio_images(res.data);
      //console.log('got images from file path');
    } catch (error) {
      console.error(error.message);
      //console.log('error  getting portfolio images from file path');
    }
  }

  useEffect(() => {
    getportfolioimages(_userid);
  }, []);

  const serviceList = (e) => {
    if (services.includes(e.target.value)) {
      setServices(services.filter((g) => g !== e.target.value));
    } else if (!services.includes(e.target.value)) {
      setServices([...services, e.target.value]);
    }
  };

  const ratingsList = (e) => {
    if (ratings.includes(e.target.value)) {
      setRatings(ratings.filter((g) => g !== e.target.value));
    } else if (!ratings.includes(e.target.value)) {
      setRatings([...ratings, e.target.value]);
    }
  };

  useEffect(() => {
    fetchCevent();
    getportfolioimages(userid);
  }, [userid]);

  // const getportfolioimages = async (uid) => {
  //   try {
  //     const res = await axios.get(IMG_URL2 + "/" + uid);
  //     setItemData(res.data);
  //   } catch (error) {
  //     console.error(error.message);
  //   }
  // };
  function getspimg(id) {}

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handlePopup = () => {
    setPopup(!popup);
  };
  const handlePopupS = () => {
    setPopupS(!popupS);
  };
  const getEventByName = (e) => {
    if (e.target.value == "") {
      setEvents(events2);
    } else {
      setEvents([]);
      events2.map((item) => {
        if (item.name.toLowerCase().includes(e.target.value.toLowerCase())) {
          setEvents((events) => [...events, item]);
        }
      });
    }
  };

  return (
    <div className=" relative p-5 w-full ml-28 mt-14 md:mt-0 mb-2 h-full">
      {/* <div className={serviceRegister ? "hidden" : "flex p-1 md:px-4 py-2 "}> */}
      <div className="relative w-64 mt-6 mb-6">
        <label className="relative block">
          <span className="sr-only">Search</span>
          <span className="absolute inset-y-0 left-0 flex items-center pl-2">
            <SearchIcon
              className="!h-5 !w-5 fill-slate-300"
              viewBox="0 0 20 20"
            />
          </span>
          <input
            className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
            placeholder="Search for Items..."
            type="text"
            name="search"
            onChange={(e) => {
              getEventByName(e);
            }}
          />
        </label>
      </div>
      {/* </div> */}


      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="MEN'S" {...a11yProps(0)} />
            <Tab label="WOMEN'S" {...a11yProps(1)} />
            <Tab label="KID'S" {...a11yProps(2)} />
            {/* <Tab label="ENGAGEMENT" {...a11yProps(3)} />
            <Tab label="OTHER OCCASION" {...a11yProps(4)} /> */}
            {/* <Tab label="RECEPTION Testing" {...a11yProps(5)} /> */}
          </Tabs>
        </Box>

        <div className="flex flex-row gap-1">
          {/* <div className="flex flex-row gap-1 lg:flex-nowrap justify-center"> */}
          {/* <div
          className="flex flex-wrap
         gap-1"
        > */}
          <div>
            <br />
            <h3 class="mb-4 font-semibold text-gray-900 dark:text-white">
              Sizes
            </h3>

            <ul class="w-48 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
              <li class="w-full rounded-t-lg border-b border-gray-200 ">
                <div class="flex items-center pl-3">
                  <input
                    id="hall"
                    type="checkbox"
                    value="hall"
                    onClick={(e) => {
                      serviceList(e);
                      setServicesError("");
                    }}
                    class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-blue-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <label
                    for="hall"
                    class="py-3 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Large
                  </label>
                </div>
              </li>
              <li class="w-full rounded-t-lg border-b border-gray-200 ">
                <div class="flex items-center pl-3">
                  <input
                    id="decoration"
                    type="checkbox"
                    value="decoration"
                    onClick={(e) => {
                      serviceList(e);
                      setServicesError("");
                    }}
                    class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-blue-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <label
                    for="decoration"
                    class="py-3 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Medium
                  </label>
                </div>
              </li>
              <li class="w-full rounded-t-lg border-b border-gray-200 ">
                <div class="flex items-center pl-3">
                  <input
                    id="photography"
                    type="checkbox"
                    value="photography"
                    onClick={(e) => {
                      serviceList(e);
                      setServicesError("");
                    }}
                    class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-blue-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <label
                    for="photography"
                    class="py-3 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Small
                  </label>
                </div>
              </li>
            </ul>

            {/* <br />
            <h3 class="mb-4 font-semibold text-gray-900 dark:text-white">
              Customer Ratings
            </h3> */}
            {/* <ul class="w-48 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
              <li class="w-full rounded-t-lg border-b border-gray-200">
                <div class="flex items-center pl-3">
                  <input
                    id="oneabove"
                    type="checkbox"
                    value="oneabove"
                    onClick={(e) => {
                      ratingsList(e);
                      setRatingsError("");
                    }}
                    class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-blue-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <label
                    for="oneabove"
                    class="py-3 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    1 & above
                  </label>
                </div>
              </li>
              <li class="w-full rounded-t-lg border-b border-gray-200">
                <div class="flex items-center pl-3">
                  <input
                    id="twoabove"
                    type="checkbox"
                    value="twoabove"
                    onClick={(e) => {
                      ratingsList(e);
                      setRatingsError("");
                    }}
                    class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-blue-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <label
                    for="twoabove"
                    class="py-3 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    2 & above
                  </label>
                </div>
              </li>
              <li class="w-full rounded-t-lg border-b border-gray-200">
                <div class="flex items-center pl-3">
                  <input
                    id="threeabove"
                    type="checkbox"
                    value="threeabove"
                    onClick={(e) => {
                      ratingsList(e);
                      setRatingsError("");
                    }}
                    class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-blue-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <label
                    for="threeabove"
                    class="py-3 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    3 & above
                  </label>
                </div>
              </li>
              <li class="w-full rounded-t-lg border-b border-gray-200">
                <div class="flex items-center pl-3">
                  <input
                    id="fourabove"
                    type="checkbox"
                    value="fourabove"
                    onClick={(e) => {
                      ratingsList(e);
                      setRatingsError("");
                    }}
                    class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-blue-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <label
                    for="fourabove"
                    class="py-3 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    4 & above
                  </label>
                </div>
              </li>
              <li class="w-full rounded-t-lg border-b border-gray-200">
                <div class="flex items-center pl-3">
                  <input
                    id="fivestars"
                    type="checkbox"
                    value="fivestars"
                    onClick={(e) => {
                      ratingsList(e);
                      setRatingsError("");
                    }}
                    class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-blue-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <label
                    for="fivestars"
                    class="py-3 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    5
                  </label>
                </div>
              </li>
            </ul> */}
          </div>
          <div>
            <TabPanel value={value} index={0}>
              <div
                className="flex m-5 flex-wrap 
              gap-1"
              >
                
         <div class="w-72 bg-white rounded-lg border border-gray-200 shadow-md ">
                  
                  <div class="p-5">
                    <a href="#">
                      <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
                        Shoes
                      </h5>
                    </a>
                    {/* <p class="mb-3 font-normal text-gray-700 ">7</p> */}
                    
                    <Link
                      to="/customerserviceportfolio"
                      class="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-teal-700 rounded-lg hover:bg-teal-500 focus:ring-4 focus:outline-none focus:ring-blue-300"
                    >
                      Add to cart                   
                        <path
                          fill-rule="evenodd"
                          d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                          clip-rule="evenodd"
                        ></path>
                      {/* </svg> */}
                    </Link>
                    <Link
                      to="/customerserviceportfolio"
                      class="inline-flex ml-1 items-center py-2 px-3 text-sm font-medium text-center text-white bg-teal-700 rounded-lg hover:bg-teal-500 focus:ring-4 focus:outline-none focus:ring-blue-300"
                    >
                      Buy
                      <svg
                        class="ml-2 -mr-1 w-4 h-4"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                    </Link>
                  </div>
                  <a href="#">
                    <img
                      class="rounded-t-lg"
                      src="/assets/images/tab1_1.jpg"
                      alt=""
                      className=" w-72 h-60"
                    />
                  </a>
                </div>
                <div class="w-72 bg-white rounded-lg border border-gray-200 shadow-md ">
                  
                  <div class="p-5">
                    <a href="#">
                      <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
                        Shoes
                      </h5>
                    </a>
                    {/* <p class="mb-3 font-normal text-gray-700 ">7</p> */}
                    
                    <Link
                      to="/customercart"
                      class="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-teal-700 rounded-lg hover:bg-teal-500 focus:ring-4 focus:outline-none focus:ring-blue-300"
                    >
                      Add to cart
                      <svg
                        class="ml-2 -mr-1 w-4 h-4"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                    </Link>
                  </div>
                  <a href="#">
                    <img
                      class="rounded-t-lg"
                      src="/assets/images/tab1_2.jpg"
                      alt=""
                      className=" w-72 h-60"
                    />
                  </a>
                </div>
                <div class="w-72 bg-white rounded-lg border border-gray-200 shadow-md ">
                  
                  <div class="p-5">
                    <a href="#">
                      <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
                        Shoes
                      </h5>
                    </a>
                    {/* <p class="mb-3 font-normal text-gray-700 ">7</p> */}
                    
                    <Link
                      to="/customerserviceportfolio"
                      class="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-teal-700 rounded-lg hover:bg-teal-500 focus:ring-4 focus:outline-none focus:ring-blue-300"
                    >
                      Add to cart
                      <svg
                        class="ml-2 -mr-1 w-4 h-4"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                    </Link>
                  </div>
                  <a href="#">
                    <img
                      class="rounded-t-lg"
                      src="/assets/images/tab1_3.jpg"
                      alt=""
                      className=" w-72 h-60"
                    />
                  </a>
                </div>
                <div class="w-72 bg-white rounded-lg border border-gray-200 shadow-md ">
                  
                  <div class="p-5">
                    <a href="#">
                      <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
                       Shoes
                      </h5>
                    </a>
                    {/* <p class="mb-3 font-normal text-gray-700 ">7</p> */}
                    
                    <Link
                      to="/customerserviceportfolio"
                      class="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-teal-700 rounded-lg hover:bg-teal-500 focus:ring-4 focus:outline-none focus:ring-blue-300"
                    >
                      Add to cart
                      <svg
                        class="ml-2 -mr-1 w-4 h-4"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                    </Link>
                  </div>
                  <a href="#">
                    <img
                      class="rounded-t-lg"
                      src="/assets/images/tab1_4.jpg"
                      alt=""
                      className=" w-72 h-60"
                    />
                  </a>
                </div>

                {
                 ((hall === false) && (decoration === false) &&(refreshment === false) &&(photography === false) &&(oneabove === false) &&(twoabove === false) &&(threeabove === false) &&(fourabove === false)&&(fivestars === false) )
                ?
                events.map(
                  (event) =>
                      // console.log(avg),
                    event.birthday === true && (
                      <div class="w-72 bg-white rounded-lg border m-3 border-gray-200 shadow-md">
                        <a href="#">
                          {/* <ImageListItem key={event.img}> */}
                          {getspid(event.userid)}
                          <img
                            class="rounded-t-lg"
                            // src={
                            //   "http://localhost:4000/" +
                            //   event.userid +
                            //   "/" +
                            //  // portfolio_images[0]
                            //  "cate3.jpg"
                            // }
                            src={File_Url + image}

                            alt=""
                            className=" w-72 h-60"
                          />
                          {/* </ImageListItem> */}
                        </a>
                        <div class="p-5">
                          <a href="#">
                            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
                              {/* CHE Studio */}
                              {event.name}
                            </h5>
                          </a>
                          {/* <p class="mb-3 font-normal text-gray-700 ">{event.userid}</p> */}
                          {/* <Rate /> */}
                          <Rating
                            name="text-feedback"                         
                            value={rateValue}
                            precision={0.1}
                            emptyIcon={
                              <StarIcon
                                style={{ opacity: 0.55 }}
                                fontSize="inherit"
                              />
                            }
                            // onChange={(e) => {
                            //   setRateValue(e.target.value);
                            // }}
                          />
                          <span class="bg-blue-100 mt-0 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">
                              {/* {event.rating} */}
                              5.0
                            </span>
                          <Link
                            to={"/customerserviceportfolio/"+event.userid}
                            class="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-cyan-500 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
                          >
                            See Portfolio
                            <svg
                              aria-hidden="true"
                              class="ml-2 -mr-1 w-4 h-4"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                clip-rule="evenodd"
                              ></path>
                            </svg>
                          </Link>
                        </div>
                      </div>
                    )
                  // ))
                )
                :


                  events.map(
                    (event) =>
                        // console.log(avg),
                      event.birthday === true && (
                      ((event.refreshment === true && refreshment === true) ||
                        (event.decoration === true && decoration === true) ||
                        (event.hallservices === true && hall === true) ||
                        (event.photography === true && photography === true))
                        
                        ||
                        ((event.avg == 5 && fivestars === true) ||
                          (event.avg == 4 && fourabove === true) ||
                          (event.avg == 3 && threeabove === true) ||
                          (event.avg == 2 && twoabove === true) ||
                          (event.avg == 1 && oneabove === true)))
                        && (
                        <div class="w-72 bg-white rounded-lg border m-3 border-gray-200 shadow-md">
                          <a href="#">
                            {/* <ImageListItem key={event.img}> */}
                            {getspid(event.userid)}
                            <img
                              class="rounded-t-lg"
                              src={
                                "http://localhost:4000/" +
                                event.userid +
                                "/" +
                               // portfolio_images[0]
                               "cate3.jpg"
                              }
                              alt=""
                              className=" w-72 h-60"
                            />
                            {/* </ImageListItem> */}
                          </a>
                          <div class="p-5">
                            <a href="#">
                              <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
                                {/* CHE Studio */}
                                {event.name}
                              </h5>
                            </a>
                            {/* <p class="mb-3 font-normal text-gray-700 ">{event.userid}</p> */}
                            {/* <Rate /> */}
                            <Rating
                              name="text-feedback"                         
                              value={rateValue}
                              precision={0.1}
                              emptyIcon={
                                <StarIcon
                                  style={{ opacity: 0.55 }}
                                  fontSize="inherit"
                                />
                              }
                              // onChange={(e) => {
                              //   setRateValue(e.target.value);
                              // }}
                            />
                            <span class="bg-blue-100 mt-0 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">
                                {/* {event.rating} */}
                                5.0
                              </span>
                            <Link
                              to={"/customerserviceportfolio/"+event.userid}
                              class="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-cyan-500 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
                            >
                              See Portfolio
                              <svg
                                aria-hidden="true"
                                class="ml-2 -mr-1 w-4 h-4"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fill-rule="evenodd"
                                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                  clip-rule="evenodd"
                                ></path>
                              </svg>
                            </Link>
                          </div>
                        </div>
                      )
                    // ))
                  )
                }
              </div>
            </TabPanel>

            <TabPanel value={value} index={1}>
              <div
                className="flex m-5 flex-wrap 
              gap-1"
              >
                <div class="w-72 bg-white rounded-lg border border-gray-200 shadow-md ">
                  
                  <div class="p-5">
                    <a href="#">
                      <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
                        Heels
                      </h5>
                    </a>
                    {/* <p class="mb-3 font-normal text-gray-700 ">7</p> */}
                    
                    <Link
                      to="/customerserviceportfolio"
                      class="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-teal-700 rounded-lg hover:bg-teal-500 focus:ring-4 focus:outline-none focus:ring-blue-300"
                    >
                      Add to cart
                      <svg
                        class="ml-2 -mr-1 w-4 h-4"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                    </Link>
                  </div>
                  <a href="#">
                    <img
                      class="rounded-t-lg"
                      src="/assets/images/tab2_1.jpg"
                      alt=""
                      className=" w-72 h-60"
                    />
                  </a>
                </div>
                <div class="w-72 bg-white rounded-lg border border-gray-200 shadow-md ">
                  
                  <div class="p-5">
                    <a href="#">
                      <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
                        Heels
                      </h5>
                    </a>
                    {/* <p class="mb-3 font-normal text-gray-700 ">7</p> */}
                    
                    <Link
                      to="/customerserviceportfolio"
                      class="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-teal-700 rounded-lg hover:bg-teal-500 focus:ring-4 focus:outline-none focus:ring-blue-300"
                    >
                      Add to cart
                      <svg
                        class="ml-2 -mr-1 w-4 h-4"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                    </Link>
                  </div>
                  <a href="#">
                    <img
                      class="rounded-t-lg"
                      src="/assets/images/tab2_2.jpg"
                      alt=""
                      className=" w-72 h-60"
                    />
                  </a>
                </div>
                <div class="w-72 bg-white rounded-lg border border-gray-200 shadow-md ">
                  
                  <div class="p-5">
                    <a href="#">
                      <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
                        Heels
                      </h5>
                    </a>
                    {/* <p class="mb-3 font-normal text-gray-700 ">7</p> */}
                    
                    <Link
                      to="/customerserviceportfolio"
                      class="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-teal-700 rounded-lg hover:bg-teal-500 focus:ring-4 focus:outline-none focus:ring-blue-300"
                    >
                      Add to cart
                      <svg
                        class="ml-2 -mr-1 w-4 h-4"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                    </Link>
                  </div>
                  <a href="#">
                    <img
                      class="rounded-t-lg"
                      src="/assets/images/tab2_3.jpg"
                      alt=""
                      className=" w-72 h-60"
                    />
                  </a>
                </div>
                <div class="w-72 bg-white rounded-lg border border-gray-200 shadow-md ">
                  
                  <div class="p-5">
                    <a href="#">
                      <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
                        Heels
                      </h5>
                    </a>
                    {/* <p class="mb-3 font-normal text-gray-700 ">7</p> */}
                    
                    <Link
                      to="/customerserviceportfolio"
                      class="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-teal-700 rounded-lg hover:bg-teal-500 focus:ring-4 focus:outline-none focus:ring-blue-300"
                    >
                      Add to cart
                      <svg
                        class="ml-2 -mr-1 w-4 h-4"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                    </Link>
                  </div>
                  <a href="#">
                    <img
                      class="rounded-t-lg"
                      src="/assets/images/tab2_4.jpg"
                      alt=""
                      className=" w-72 h-60"
                    />
                  </a>
                </div>
                {
                 ((hall === false) && (decoration === false) &&(refreshment === false) &&(photography === false) &&(oneabove === false) &&(twoabove === false) &&(threeabove === false) &&(fourabove === false)&&(fivestars === false) )
                ?
                events.map(
                  (event) =>
                      // console.log(avg),
                    event.wedding === true && (
                      <div class="w-72 bg-white rounded-lg border m-3 border-gray-200 shadow-md">
                        <a href="#">
                          {/* <ImageListItem key={event.img}> */}
                          {getspid(event.userid)}
                          <img
                            class="rounded-t-lg"
                            src={
                              "http://localhost:4000/" +
                              event.userid +
                              "/" +
                             // portfolio_images[0]
                             "cate3.jpg"
                            }
                            alt=""
                            className=" w-72 h-60"
                          />
                          {/* </ImageListItem> */}
                        </a>
                        <div class="p-5">
                          <a href="#">
                            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
                              {/* CHE Studio */}
                              {event.name}
                            </h5>
                          </a>
                          {/* <p class="mb-3 font-normal text-gray-700 ">{event.userid}</p> */}
                          {/* <Rate /> */}
                          <Rating
                            name="text-feedback"                         
                            value={rateValue}
                            precision={0.1}
                            emptyIcon={
                              <StarIcon
                                style={{ opacity: 0.55 }}
                                fontSize="inherit"
                              />
                            }
                            // onChange={(e) => {
                            //   setRateValue(e.target.value);
                            // }}
                          />
                          <span class="bg-blue-100 mt-0 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">
                              {/* {event.rating} */}
                              5.0
                            </span>
                          <Link
                            to={"/customerserviceportfolio/"+event.userid}
                            class="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-cyan-500 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
                          >
                            See Portfolio
                            <svg
                              aria-hidden="true"
                              class="ml-2 -mr-1 w-4 h-4"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                clip-rule="evenodd"
                              ></path>
                            </svg>
                          </Link>
                        </div>
                      </div>
                    )
                  // ))
                )
                :


                  events.map(
                    (event) =>
                        // console.log(avg),
                      event.wedding === true && (
                      ((event.refreshment === true && refreshment === true) ||
                        (event.decoration === true && decoration === true) ||
                        (event.hallservices === true && hall === true) ||
                        (event.photography === true && photography === true))
                        
                       ||
                        ((event.avg == 5 && fivestars === true) ||
                          (event.avg == 4 && fourabove === true) ||
                          (event.avg == 3 && threeabove === true) ||
                          (event.avg == 2 && twoabove === true) ||
                          (event.avg == 1 && oneabove === true)))
                        && (
                        <div class="w-72 bg-white rounded-lg border m-3 border-gray-200 shadow-md">
                          <a href="#">
                            {/* <ImageListItem key={event.img}> */}
                            {getspid(event.userid)}
                            <img
                              class="rounded-t-lg"
                              src={
                                "http://localhost:4000/" +
                                event.userid +
                                "/" +
                               // portfolio_images[0]
                               "cate3.jpg"
                              }
                              alt=""
                              className=" w-72 h-60"
                            />
                            {/* </ImageListItem> */}
                          </a>
                          <div class="p-5">
                            <a href="#">
                              <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
                                {/* CHE Studio */}
                                {event.name}
                              </h5>
                            </a>
                            {/* <p class="mb-3 font-normal text-gray-700 ">{event.userid}</p> */}
                            {/* <Rate /> */}
                            <Rating
                              name="text-feedback"                         
                              value={rateValue}
                              precision={0.1}
                              emptyIcon={
                                <StarIcon
                                  style={{ opacity: 0.55 }}
                                  fontSize="inherit"
                                />
                              }
                              // onChange={(e) => {
                              //   setRateValue(e.target.value);
                              // }}
                            />
                            <span class="bg-blue-100 mt-0 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">
                                {/* {event.rating} */}
                                5.0
                              </span>
                            <Link
                              to={"/customerserviceportfolio/"+event.userid}
                              class="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-cyan-500 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
                            >
                              See Portfolio
                              <svg
                                aria-hidden="true"
                                class="ml-2 -mr-1 w-4 h-4"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fill-rule="evenodd"
                                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                  clip-rule="evenodd"
                                ></path>
                              </svg>
                            </Link>
                          </div>
                        </div>
                      )
                    // ))
                  )
                }
              </div>
            </TabPanel>

            <TabPanel value={value} index={2}>
              <div
                className="flex m-5 flex-wrap 
              gap-1"
              >
                <div class="w-72 bg-white rounded-lg border border-gray-200 shadow-md ">
                  
                  <div class="p-5">
                    <a href="#">
                      <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
                        Heels
                      </h5>
                    </a>
                    {/* <p class="mb-3 font-normal text-gray-700 ">7</p> */}
                    
                    <Link
                      to="/customerserviceportfolio"
                      class="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-teal-700 rounded-lg hover:bg-teal-500 focus:ring-4 focus:outline-none focus:ring-blue-300"
                    >
                      Add to cart
                      <svg
                        class="ml-2 -mr-1 w-4 h-4"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                    </Link>
                  </div>
                  <a href="#">
                    <img
                      class="rounded-t-lg"
                      src="/assets/images/tab3_1.jpg"
                      alt=""
                      className=" w-72 h-60"
                    />
                  </a>
                </div>
                <div class="w-72 bg-white rounded-lg border border-gray-200 shadow-md ">
                  
                  <div class="p-5">
                    <a href="#">
                      <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
                        Heels
                      </h5>
                    </a>
                    {/* <p class="mb-3 font-normal text-gray-700 ">7</p> */}
                    
                    <Link
                      to="/customerserviceportfolio"
                      class="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-teal-700 rounded-lg hover:bg-teal-500 focus:ring-4 focus:outline-none focus:ring-blue-300"
                    >
                      Add to cart
                      <svg
                        class="ml-2 -mr-1 w-4 h-4"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                    </Link>
                  </div>
                  <a href="#">
                    <img
                      class="rounded-t-lg"
                      src="/assets/images/tab3_2.jpg"
                      alt=""
                      className=" w-72 h-60"
                    />
                  </a>
                </div>
                <div class="w-72 bg-white rounded-lg border border-gray-200 shadow-md ">
                  
                  <div class="p-5">
                    <a href="#">
                      <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
                        Heels
                      </h5>
                    </a>
                    {/* <p class="mb-3 font-normal text-gray-700 ">7</p> */}
                    
                    <Link
                      to="/customerserviceportfolio"
                      class="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-teal-700 rounded-lg hover:bg-teal-500 focus:ring-4 focus:outline-none focus:ring-blue-300"
                    >
                      Add to cart
                      <svg
                        class="ml-2 -mr-1 w-4 h-4"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                    </Link>
                  </div>
                  <a href="#">
                    <img
                      class="rounded-t-lg"
                      src="/assets/images/tab3_3.jpg"
                      alt=""
                      className=" w-72 h-60"
                    />
                  </a>
                </div>
                <div class="w-72 bg-white rounded-lg border border-gray-200 shadow-md ">
                  
                  <div class="p-5">
                    <a href="#">
                      <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
                        Heels
                      </h5>
                    </a>
                    {/* <p class="mb-3 font-normal text-gray-700 ">7</p> */}
                    
                    <Link
                      to="/customerserviceportfolio"
                      class="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-teal-700 rounded-lg hover:bg-teal-500 focus:ring-4 focus:outline-none focus:ring-blue-300"
                    >
                      Add to cart
                      <svg
                        class="ml-2 -mr-1 w-4 h-4"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                    </Link>
                  </div>
                  <a href="#">
                    <img
                      class="rounded-t-lg"
                      src="/assets/images/tab3_4.jpg"
                      alt=""
                      className=" w-72 h-60"
                    />
                  </a>
                </div>
                 {
                 ((hall === false) && (decoration === false) &&(refreshment === false) &&(photography === false) &&(oneabove === false) &&(twoabove === false) &&(threeabove === false) &&(fourabove === false)&&(fivestars === false) )
                ?
                events.map(
                  (event) =>
                      // console.log(avg),
                    event.reception === true && (
                      <div class="w-72 bg-white rounded-lg border m-3 border-gray-200 shadow-md">
                        <a href="#">
                          {/* <ImageListItem key={event.img}> */}
                          {getspid(event.userid)}
                          <img
                            class="rounded-t-lg"
                            src={
                              "http://localhost:4000/" +
                              event.userid +
                              "/" +
                              portfolio_images[event.userid]
                            //  "cate3.jpg"
                            }
                            alt=""
                            className=" w-72 h-60"
                          />
                          {/* </ImageListItem> */}
                        </a>
                        <div class="p-5">
                          <a href="#">
                            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
                              {/* CHE Studio */}
                              {event.name}
                            </h5>
                          </a>
                          {/* <p class="mb-3 font-normal text-gray-700 ">{event.userid}</p> */}
                          {/* <Rate /> */}
                          <Rating
                            name="text-feedback"                         
                            value={rateValue}
                            precision={0.1}
                            emptyIcon={
                              <StarIcon
                                style={{ opacity: 0.55 }}
                                fontSize="inherit"
                              />
                            }
                            // onChange={(e) => {
                            //   setRateValue(e.target.value);
                            // }}
                          />
                          <span class="bg-blue-100 mt-0 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">
                              {/* {event.rating} */}
                              5.0
                            </span>
                          <Link
                            to={"/customerserviceportfolio/"+event.userid}
                            class="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-cyan-500 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
                          >
                            See Portfolio
                            <svg
                              aria-hidden="true"
                              class="ml-2 -mr-1 w-4 h-4"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                clip-rule="evenodd"
                              ></path>
                            </svg>
                          </Link>
                        </div>
                      </div>
                    )
                  // ))
                )
                :


                  events.map(
                    (event) =>
                        // console.log(avg),
                      event.reception === true && (
                      ((event.refreshment === true && refreshment === true) ||
                        (event.decoration === true && decoration === true) ||
                        (event.hallservices === true && hall === true) ||
                        (event.photography === true && photography === true))
              
                       ||
                        ((event.avg == 5 && fivestars === true) ||
                          (event.avg == 4 && fourabove === true) ||
                          (event.avg == 3 && threeabove === true) ||
                          (event.avg == 2 && twoabove === true) ||
                          (event.avg == 1 && oneabove === true)))
                        && (
                        <div class="w-72 bg-white rounded-lg border m-3 border-gray-200 shadow-md">
                          <a href="#">
                            {/* <ImageListItem key={event.img}> */}
                            {getspid(event.userid)}
                            <img
                              class="rounded-t-lg"
                              src={
                                "http://localhost:4000/" +
                                event.userid +
                                "/" +
                               portfolio_images[event.userid]
                               //"cate3.jpg"
                              }
                              alt=""
                              className=" w-72 h-60"
                            />
                            {/* </ImageListItem> */}
                          </a>
                          <div class="p-5">
                            <a href="#">
                              <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
                                {/* CHE Studio */}
                                {event.name}
                              </h5>
                            </a>
                            {/* <p class="mb-3 font-normal text-gray-700 ">{event.userid}</p> */}
                            {/* <Rate /> */}
                            <Rating
                              name="text-feedback"                         
                              value={rateValue}
                              precision={0.1}
                              emptyIcon={
                                <StarIcon
                                  style={{ opacity: 0.55 }}
                                  fontSize="inherit"
                                />
                              }
                              // onChange={(e) => {
                              //   setRateValue(e.target.value);
                              // }}
                            />
                            <span class="bg-blue-100 mt-0 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">
                                {/* {event.rating} */}
                                5.0
                              </span>
                            <Link
                              to={"/customerserviceportfolio/"+event.userid}
                              class="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-cyan-500 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
                            >
                              See Portfolio
                              <svg
                                aria-hidden="true"
                                class="ml-2 -mr-1 w-4 h-4"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fill-rule="evenodd"
                                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                  clip-rule="evenodd"
                                ></path>
                              </svg>
                            </Link>
                          </div>
                        </div>
                      )
                    // ))
                  )
                }
              </div>
            </TabPanel>

          
          </div>

          {/* </div> */}
        </div>
      </Box>
    </div>
  );
}

export default EventsCustomer;