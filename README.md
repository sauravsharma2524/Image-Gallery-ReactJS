
# React Image Gallery App Documentation

## Overview

This documentation provides an in-depth explanation of the structure and functionality of a React-based image gallery application. The application allows users to search for free stock images using the Pixabay API, view image details in a modal, and share images on social media.

## Table of Contents

1. [Dependencies](#dependencies)
2. [Components](#components)
   - [App Component](#app-component)
3. [State Management](#state-management)
4. [API Integration](#api-integration)
5. [User Interface](#user-interface)
6. [Modal Popup](#modal-popup)
7. [Social Media Sharing](#social-media-sharing)

---

## 1. Dependencies<a name="dependencies"></a>

The application utilizes several external libraries for enhanced functionality:

- **react**: A JavaScript library for building user interfaces.
- **react-share**: A library for implementing social media sharing buttons.
- **file-saver**: A library for saving files locally.
- **Shimmer**: A custom component for displaying loading placeholders.

---

## 2. Components<a name="components"></a>

### App Component<a name="app-component"></a>

The `App` component serves as the main entry point for the application. It manages the state, fetches data from the Pixabay API, and renders the user interface. Key features include:

- **Search Bar**: Allows users to enter search queries to fetch images.
- **Image Gallery**: Displays retrieved images with a hover effect.
- **Modal Popup**: Presents detailed information about a selected image.
- **Social Media Sharing**: Provides buttons for sharing images on LinkedIn, Twitter, and WhatsApp.

---

## 3. State Management<a name="state-management"></a>

The component utilizes the `useState` hook to manage the following state variables:

- **images**: Stores an array of images fetched from Pixabay.
- **searchText**: Holds the user's input for image search.
- **popupContent**: Contains details of the image selected for modal display.
- **showModal**: Determines whether the modal is visible or hidden.

---

## 4. API Integration<a name="api-integration"></a>

The `fetchData` function is responsible for fetching image data from the Pixabay API. It constructs the API endpoint based on the user's search query and updates the `images` state with the retrieved data. The Pixabay API key is utilized for authentication.

---

## 5. User Interface<a name="user-interface"></a>

### Background and Navigation

The background image is set dynamically with a fixed height. A navigation bar at the top provides links for "Homepage," a "Login" button, and a "Create Account" button.

### Search Bar

A search bar allows users to input search queries. The "GO!" button triggers the `handleSearch` function, initiating the image fetching process.

### Image Gallery

The image gallery is displayed when images are available. Images are presented in a responsive grid, and clicking on an image opens the modal with detailed information.

---

## 6. Modal Popup<a name="modal-popup"></a>

The modal popup appears when a user clicks on an image. It displays detailed information about the selected image, including a preview, tags, user details, view count, download count, and like count. Additionally, users can download the image for free and share it on social media.

---

## 7. Social Media Sharing<a name="social-media-sharing"></a>

The modal provides social media sharing buttons for LinkedIn, Twitter, and WhatsApp. Users can click these buttons to share the image on their respective social media platforms.

---

This comprehensive documentation provides an overview of the React image gallery application, explaining its components, state management, API integration, and user interface. Developers can use this documentation as a guide for understanding and maintaining the codebase.