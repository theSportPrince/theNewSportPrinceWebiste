import React, { useEffect, useState } from "react";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBTypography,
  MDBIcon,
} from "mdb-react-ui-kit";
import { Box, Typography, TextField, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import "./Profile.css";
import axios from "axios";
import { ChatState } from "../../Context/ChatProvider";
import { Modal } from "@mui/material";
import "./UpdateProfileBox.css";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import SuccessNotifier from "../ToastNotifications/SuccessNotifier";
import ErrorNotifier from "../ToastNotifications/ErrorNotifier";

export default function PersonalProfile() {
  const [userData, setUserData] = useState([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const { user, setUser } = ChatState();
  console.log(user?._id);
  const [openModal, setOpenModal] = useState(false);
  const [fileData, setFileData] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobileNumber: "",
    aboutUs: "",
    instagramLink: "",
    facebookLink: "",
  });

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setFileData(file);
  };

  // const fetchUserProfile = async () => {
  //   try {
  //     const response = await axios.get(
  //       `${process.env.REACT_APP_BASE_URL}/api/user/profile?id=${user._id}`
  //     );
  //     console.log("this is user", response.data);
  //     setUserData(response?.data?.user);
  //     setLoading(false);
  //     setIsSuccess(true);
  //     setSuccessMessage("User Profile Data fetched Sucessfully");
  //   } catch (error) {
  //     setHasError(true);
  //     setErrorMessage("error:", error);
  //     setLoading(false);
  //   }
  // };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      let imageUrl = "";
      if (fileData) {
        // Convert uploaded file to data URL
        const reader = new FileReader();
        reader.onload = (event) => {
          imageUrl = event.target.result;
          console.log("Image URL:", imageUrl);

          // Update the form data with the image URL
          const updatedData = {
            ...formData,
            profileImage: imageUrl,
          };

          // Send updated data to the backend
          sendUpdatedData(updatedData);
        };
        reader.readAsDataURL(fileData);
      } else {
        // If no file uploaded, send the form data without the image URL
        sendUpdatedData(formData);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }

    setOpenModal(false); // Close the modal after form submission
  };

  const sendUpdatedData = async (updatedData) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/api/user/update?id=${user._id}`,
        updatedData
      );
      console.log("Updated data:", response.data);
      setIsSuccess(true);
      setSuccessMessage("User data updated sucessfullu");
    } catch (error) {
      setHasError(true);
      setErrorMessage("Error updating profile:", error);
      console.error("Error updating profile:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/api/user/profile?id=${user._id}`
        );
        console.log("this is user", response.data);
        setUserData(response?.data?.user);
        setLoading(false);
        setIsSuccess(true);
        setSuccessMessage("User Profile Data fetched Sucessfully");
      } catch (error) {
        setHasError(true);
        setErrorMessage("error:", error);
        setLoading(false);
      }
    };

    if (user?._id) {
      fetchUserProfile();
    }
  }, [user?._id]);
  return (
    <Box
      sx={{
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        backgroundColor: "#DDDDDD",
        width: "100%",
        height: "80vh",
        display: "flex",
      }}
    >
      {hasError && (
        <ErrorNotifier {...{ message: errorMessage, setHasError }} />
      )}

      {isSuccess && (
        <SuccessNotifier {...{ message: successMessage, setIsSuccess }} />
      )}
      {!userData ? (
        <Typography variant="h5">Loading...</Typography>
      ) : (
        <div class="card">
          <button class="mail" onClick={() => setOpenModal(true)}>
            {/* <svg
              className="lucide lucide-user"
              stroke-linejoin="round"
              stroke-linecap="round"
              stroke-width="2"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 24 24"
              height="24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 12A4 4 0 1 0 8 8a4 4 0 0 0 4 4z"></path>
              <path
                fill="none"
                d="M22 20v-2c0-3.16-1.96-5.86-4.78-6.82C17.91 10.55 16.06 10 14 10s-3.91.55-3.22 1.18C3.96 12.12 2 14.82 2 18v2"
              ></path>
            </svg> */}
            <EditIcon sx={{ fontSize: "25px" }} />
          </button>
          <div class="profile-pic">
            <img src={userData.img_url} />
          </div>
          <div class="bottom">
            <div class="content">
              <span class="name">
                {userData?.firstName} {userData?.lastName}{" "}
              </span>
              <span class="about-me">Mobile:+91 {userData?.mobileNumber}</span>
              <span class="about-me">Email:{userData?.email}</span>
              <span class="about-me">{userData?.about}</span>
            </div>
            <div class="bottom-bottom">
              <div class="social-links-container">
                <a
                  href={userData?.instagram}
                  style={{ textDecoration: "none" }}
                >
                  <InstagramIcon />
                </a>
                <a
                  href={userData?.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: "none" }}
                >
                  <FacebookIcon />
                </a>
              </div>
              {/* <button class="button">Contact Me</button> */}
            </div>
          </div>
          <Modal
            open={openModal}
            onClose={() => setOpenModal(false)}
            sx={{ justifyContent: "center", display: "flex" }}
          >
            <div className="container">
              <div className="heading">Update Profile</div>
              <form className="form" action="">
                <input
                  placeholder="First Name"
                  id="firstName"
                  name="firstName"
                  type="text"
                  className="input"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required=""
                />
                <input
                  placeholder="Last Name"
                  id="lastName"
                  name="lastName"
                  type="text"
                  className="input"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required=""
                />
                <input
                  placeholder="Email"
                  id="email"
                  name="email"
                  type="email"
                  className="input"
                  value={formData.email}
                  onChange={handleInputChange}
                  required=""
                />
                <input
                  placeholder="Mobile Number"
                  id="mobileNumber"
                  name="mobileNumber"
                  type="text"
                  className="input"
                  value={formData.mobileNumber}
                  onChange={handleInputChange}
                  required=""
                />
                <textarea
                  placeholder="About Us"
                  id="aboutUs"
                  name="aboutUs"
                  className="input"
                  value={formData.aboutUs}
                  onChange={handleInputChange}
                  required=""
                ></textarea>
                <input
                  placeholder="Instagram Link"
                  id="instagramLink"
                  name="instagramLink"
                  type="text"
                  className="input"
                  value={formData.instagramLink}
                  onChange={handleInputChange}
                  required=""
                />
                <input
                  placeholder="Facebook Link"
                  id="facebookLink"
                  name="facebookLink"
                  type="text"
                  className="input"
                  value={formData.facebookLink}
                  onChange={handleInputChange}
                  required=""
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="input-file"
                />
                <input
                  value="Update"
                  type="submit"
                  className="login-button"
                  onClick={handleFormSubmit}
                />
              </form>
            </div>
          </Modal>
        </div>
      )}
    </Box>
  );
}
