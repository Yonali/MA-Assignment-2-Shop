import { useState, useRef, useEffect } from "react";
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import ChooseUser from "../register/ChooseUser";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

let slideInterval;
const CarauselDataImages = [
  "https://www.google.com/url?sa=i&url=https%3A%2F%2Fhelankashoes.lk%2F&psig=AOvVaw2oTSoPZTjGgrY4QS6NPMoU&ust=1666960030255000&source=images&cd=vfe&ved=0CA0QjRxqFwoTCNiPoZW0gPsCFQAAAAAdAAAAABAE",
  "https://images.unsplash.com/photo-1591604466107-ec97de577aff?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80",

  "https://images.unsplash.com/photo-1502035618526-6b2f1f5bca1b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",

  "https://images.unsplash.com/photo-1597861405049-0b011428568f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",

  "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",

  "https://images.unsplash.com/photo-1558636508-e0db3814bd1d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
];

function Carousel() {
  const [current, setCurrent] = useState(0);
  const carouselRef = useRef();
  const length = CarauselDataImages.length;
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    carouselRef.current.addEventListener("animationend", removeAnimation);
    // startSlider();
  });

  const startSlider = () => {
    slideInterval = setInterval(() => {
      handleClickRight();
    }, 5000);
  };

  const removeAnimation = () => {
    carouselRef.current.classList.remove("fade-anim");
  };

  const handleClickRight = () => {
    let count = (current + 1) % length;
    setCurrent(count);
    carouselRef.current.classList.add("fade-anim");
  };

  // const handleClickLeft = () => {
  //   let count = (current + length - 1) % length;
  //   setCurrent(count);
  //   carouselRef.current.classList.add("fade-anim");
  // };

  return (
    <>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style} className="rounded-lg">
            <ChooseUser />
          </Box>
        </Modal>
      </div>

      <div className="relative flex flex-row  h-1/5 my-0 justify-center items-center">
        <div className="z-10 absolute text-center top-40 bg-white p-6 rounded-xl opacity-90 shadow-inner hover:scale-105">
          <h1 className="text-2xl font-bold py-6">
            Looking for new shoes
          </h1>
          <div className="flex flex-row justify-center">
            <h1 className="text-xl w-96 py-6">
            We pick the very best so you can be assured of the quality. There can be no compromises when it comes to materials, ease of wear, and durability.
            </h1>
          </div>
          <h1 className="text-2xl font-bold  py-6">Shop Now </h1>
          <button
            onClick={handleOpen}
            className="border left-60 w-64 py-2 bg-teal-700 hover:bg-teal-400  text-white"
          >
            Click here
          </button>
        </div>
        {/* <ArrowCircleLeftIcon
          className="absolute top-1/2 left-8 w-screen z-10 cursor-pointer select-none"
          onClick={handleClickLeft}
          />
          <ArrowCircleRightIcon
          className="absolute top-1/2 right-8 w-screen z-10 cursor-pointer select-none"
          onClick={handleClickRight}
        /> */}
        <div ref={carouselRef} className="">
          
          <img
        src="/assets/images/main.jpg"
        alt="collection img"
        className="w-screen h-[720px]  rounded-xl"
      />
        </div>
      </div>
    </>
  );
}

export default Carousel;
