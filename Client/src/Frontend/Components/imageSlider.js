import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import Menubar from './Menubar';
import img1 from '../Assets/1.jpg';
import img2 from '../Assets/2.webp';
import img3 from '../Assets/3.jpg';
import E_Sidebar from '../E_Comp/E_Slidebar';
import { useLocation } from 'react-router-dom';


const ImageSlider = () => {
  let slideIndex = 0;
  //to render E_Sidebar or HR_Sidebar
  const location = useLocation();
  const bar=location.state.bar;
  
  const showSlides = () => {
    let i;
    const slides = document.getElementsByClassName("mySlides");
    
    // Check if any slides are found
    if (slides.length === 0) {
      return;
    }
  
    slideIndex++;
    if (slideIndex > slides.length) {
      slideIndex = 1;
    }
  
    // Hide all slides first
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
  
    // Display the current slide
    slides[slideIndex - 1].style.display = "block";
  
    setTimeout(showSlides, 2000); // Change image every 2 seconds
  };
  

  useEffect(() => {
    showSlides();
  }, []);

  return (
    <>
    <body className="flex bg-gray-100 min-h-screen">
        <aside className="hidden sm:flex sm:flex-col">
          <a
            href="#"
            className="inline-flex items-center justify-center h-20 w-60 bg-purple-600 hover:bg-purple-500 focus:bg-purple-500"
          >
            <svg fill="none" viewBox="0 0 64 64" className="h-12 w-12">
              <title>Company logo</title>
              <path
                d="M32 14.2c-8 0-12.9 4-14.9 11.9 3-4 6.4-5.6 10.4-4.5 2.3.6 4 2.3 5.7 4 2.9 3 6.3 6.4 13.7 6.4 7.9 0 12.9-4 14.8-11.9-3 4-6.4 5.5-10.3 4.4-2.3-.5-4-2.2-5.7-4-3-3-6.3-6.3-13.7-6.3zM17.1 32C9.2 32 4.2 36 2.3 43.9c3-4 6.4-5.5 10.3-4.4 2.3.5 4 2.2 5.7 4 3 3 6.3 6.3 13.7 6.3 8 0 12.9-4 14.9-11.9-3 4-6.4 5.6-10.4 4.5-2.3-.6-4-2.3-5.7-4-2.9-3-6.3-6.4-13.7-6.4z"
                fill="#fff"
              />
            </svg>
          </a>
          {bar==="E_Sidebar" ? <E_Sidebar /> : <Sidebar />}
        </aside>

        <div className="flex-grow text-gray-800">
<Menubar/>        
      <div className="slideshow-container">
        <div className="mySlides fade">
          <div className="numbertext">1 / 3</div>
          <img src={img1} style={{ width: '100%' }} alt="Slide 1" />
          <div className="text"></div>
        </div>

        <div className="mySlides fade">
          <div className="numbertext">2 / 3</div>
          <img src={img2} style={{ width: '100%' }} alt="Slide 2" />
          <div className="text"></div>
        </div>

        <div className="mySlides fade">
          <div className="numbertext">3 / 3</div>
          <img src={img3} style={{ width: '100%' }} alt="Slide 3" />
          <div className="text"></div>
        </div>
      </div>
      <br />


    </div>
      </body>
    </>
  );
};

export default ImageSlider;
