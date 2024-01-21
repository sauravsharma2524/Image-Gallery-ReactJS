// Import necessary React hooks and external libraries
import React, { useState, useEffect } from "react";
import { saveAs } from "file-saver";
import Shimmer from "./Shimmer";

// Import social media sharing components from react-share library
import {
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import { TwitterIcon, LinkedinIcon, WhatsappIcon } from "react-share";

// Main functional component for the Image Gallery App
function App() {
  // State variables to manage images, search text, popup content, and modal visibility
  const [images, setImages] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [popupContent, setPopupContent] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // Function to update popup content based on the selected image
  const changeContent = (image) => {
    setPopupContent([image]);
  };

  // Function to handle image search based on the current search text
  const handleSearch = () => {
    fetchData();
  };

  // Fetch data on component mount to display initial images
  useEffect(() => {
    fetchData();
  }, []);

  // Log updated images state when it changes
  useEffect(() => {
    console.log("Updated images:", images);
  }, [images]);

  // Asynchronous function to fetch image data from Pixabay API
  const fetchData = async () => {
    try {
      const data = await fetch(
        `https://pixabay.com/api/?key=41895964-86156f7fb1628b239ba229320&q=${searchText}&image_type=photo&pretty=true`
      );
      const json = await data.json();

      console.log(json?.hits);

      // Update state with the array of hits (images)
      setImages(json?.hits);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // JSX rendering for the main application
  return (
    <>
      {/* Webpage layout with a background image, navigation bar, and search bar */}
      <div
        className="flex font-sans flex-col items-center justify-center text-white relative"
        style={{
          // Set dynamic background image using inline styles
          backgroundImage: `url("https://cdn.pixabay.com/photo/2024/01/05/14/41/ai-generated-8489630_1280.png")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          width: "100%",
          height: "55vh", // Adjusted to take the full viewport height
          position: "relative",
        }}
      >
        {/* Navigation Bar */}
        <div className="top-0 left-0 right-0 bg-transparent text-lg drop-shadow-lg backdrop-blur-md border border-white rounded-lg mx-auto flex items-center justify-between w-[96vw] sm:w-[80vw] md:w-[90vw] lg:w-[90vw] xl:w-[95vw] h-16 p-4 z-10">
          <div>Homepage</div>
          <div>
            {/* Login button */}
            <button className="font-semibold">Login</button>

            {/* Create Account button */}
            <button
              className="rounded-lg hover:scale-105 border font-semibold border-white p-1 mx-2 md:mx-4 lg:mx-6"
              style={{ borderWidth: "3px" }}
            >
              Create Account
            </button>
          </div>
        </div>
        {/* Header Text */}
        <div className="font-bold my-8 text-center text-2xl md:text-3xl lg:text-4xl xl:text-6xl ">
          <span>Discover Over 2,000,000 </span>
          <br />
          <span>Free Stock Images</span>
        </div>
        {/* Search Bar */}
        <div className="relative flex items-center w-full md:w-[70vw] lg:w-[60vw] xl:w-[50vw]">
          {/* Search input */}
          <input
            className="bg-transparent placeholder:text-lg placeholder-white w-full h-14 p-3 text-xl drop-shadow-2xl backdrop-blur-lg border rounded-lg border-white outline-none"
            type="text"
            placeholder="Search"
            style={{
              position: "relative",
              borderWidth: "1px",
            }}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />

          {/* Go! button */}
          <button
            onClick={handleSearch}
            className="rounded-lg hover:scale-95 border absolute right-2 font-semibold border-white px-3 "
            style={{ borderWidth: "3px" }}
          >
            GO!
          </button>
        </div>
      </div>

      {/* Conditional rendering based on the availability of images */}
      {images.length === 0 ? (
        // Display Shimmer component while images are being loaded
        <Shimmer />
      ) : (
        // Render image gallery when images are available
        <div className="flex flex-wrap justify-center">
          {/* Map through images array and display each image in a card */}
          {images.map((image) => (
            <div
              key={image.id}
              className="m-1 w-[300px] hover:opacity-90 cursor-pointer bg-contain"
            >
              {image.previewURL ? (
                // Display image with onClick event to open modal on click
                <img
                  onClick={() => {
                    changeContent(image);
                    setShowModal(true);
                  }}
                  className="object-cover w-[300px] h-[300px] p-2 rounded-2xl"
                  src={image.webformatURL}
                  alt="image"
                />
              ) : (
                // Display loading message if previewURL is not available
                <p>Loading</p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Modal popup displayed when showModal state is true */}
      {showModal && (
        <div className="bg-black backdrop-blur-sm bg-opacity-30 h-[screen] inset-0 fixed flex justify-center items-center">
          {/* Modal content */}
          <div className="bg-white rounded-lg m-3 inset-15 fixed xl:w-[80vw] w-[auto] flex flex-col">
            <div>
              {/* Map through popupContent array and display detailed information for the selected image */}
              {popupContent.map((info) => {
                return (
                  <div className="" key={info.id}>
                    {/* Header section of the modal with image ID and close button */}
                    <div className="text-black flex p-4 rounded-t-xl items-center justify-between bg-[#f0f0f0]">
                      <p className="text-lg font-md">Preview ID: {info.id}</p>
                      <button
                        className="hover:scale-110 border-2 px-2 border-slate-950 rounded-lg text-xl place-self-end"
                        onClick={() => setShowModal(false)}
                      >
                        x
                      </button>
                    </div>

                    {/* Main content section of the modal */}
                    <div className="text:lg p-2 w-full xl:flex-row lg:flex-row flex-col flex text-black font-semibold">
                      <div>
                        {/* Display image preview, tags, and other information */}
                        <img
                          className="xl:h-[50vh] md:h-[50vh] h-[30vh] xl:w-[30vw] lg:h-[30vh] lg:w-[50vw] w-[60vw] border-2 border-white p-1 m-3 rounded-2xl bg-center bg-cover"
                          style={
                            {
                              // objectFit: "auto",
                              // backgroundSize: "conatain"
                            }
                          }
                          src={info.previewURL}
                          alt="Image"
                        />

                        <p className="text-base p-4">
                          Tags:{" "}
                          <span className="xl:text-lg lg:text-lg md:text-lg text-sm">
                            {info.tags}
                          </span>
                        </p>
                      </div>

                      {/* Information section in the modal */}
                      <div className="w-1/2 text-center xl:mt-10 mx-auto xl:mx-auto">
                        <p className="text-2xl lg:flex hidden text-zinc-700 xl:flex flex-col text-center">
                          Information
                          {/* User details displayed in a flex container */}
                          <div className="xl:flex lg:flex lg:justify-center lg:text-center hidden xl:justify-center xl:text-center">
                            <p className="xl:px-4 xl:py-2 text-zinc-500 text-xs font-semibold">
                              User
                              <p className="text-zinc-700 text-base">
                                {info.user}
                              </p>
                            </p>

                            <p className="px-4 py-2 text-zinc-500 text-xs font-semibold">
                              user ID
                              <p className="text-zinc-700 text-base">
                                {info.user_id}
                              </p>
                            </p>
                            <p className="px-4 py-2 text-zinc-500 text-xs font-semibold">
                              Type
                              <p className="text-zinc-700 text-base">
                                {info.type}
                              </p>
                            </p>
                          </div>
                          {/* Image statistics displayed in a flex container */}
                          <div className="xl:flex lg:flex lg:justify-center lg:text-center hidden xl:justify-center xl:text-center">
                            <p className="px-6 py-2 text-zinc-500 text-xs font-semibold">
                              Views
                              <p className="text-zinc-700 text-base">
                                {info.views}
                              </p>
                            </p>

                            <p className="px-6 py-2 text-zinc-500 text-xs font-semibold">
                              Downloads
                              <p className="text-zinc-700 text-base">
                                {info.downloads}
                              </p>
                            </p>
                            <p className="px-6 py-2 text-zinc-500 text-xs font-semibold">
                              Likes
                              <p className="text-zinc-700 text-base">
                                {info.likes}
                              </p>
                            </p>
                          </div>
                        </p>
                        {/* Download button for the image */}
                        <button
                          className="text-white p-3 hover:bg-green-400 relative lg:mx-2 xl:px-12 xl:text-lg text-base bg-green-500 rounded-xl"
                          onClick={() => {
                            saveAs(info.previewURL, info.user);
                          }}
                        >
                          Download for Free!
                        </button>
                        {/* Share Now section with social media sharing buttons */}
                        <div className="mt-4">
                          <p className="xl:text-lg m-1 p-2 xl:w-1/2 lg:w-1/2 md:w-1/2 text-center mx-auto rounded-lg text-white bg-blue-600">
                            Share Now
                          </p>
                          <div className="">
                            {/* WhatsApp share button */}
                            <WhatsappShareButton url={window.location.href}>
                              <WhatsappIcon size={35} round={true} />
                            </WhatsappShareButton>{" "}
                            &nbsp;
                            {/* LinkedIn share button */}
                            <LinkedinShareButton url={window.location.href}>
                              <LinkedinIcon size={35} round={true} />
                            </LinkedinShareButton>{" "}
                            &nbsp;
                            {/* Twitter share button */}
                            <TwitterShareButton url={window.location.href}>
                              <TwitterIcon size={35} round={true} />
                            </TwitterShareButton>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// Export the App component for use in other parts of the application
export default App;
