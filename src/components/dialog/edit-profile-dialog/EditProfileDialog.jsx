import axios from "axios";
import PropTypes from "prop-types";
import { useReducer } from "react";
import classNames from "classnames";
import { useProfile } from "context";
import { useSelector } from "react-redux";
import { FilledAccountCircleIcon } from "assets";
import styles from "./EditProfileDialog.module.css";

import {
  isStatusLoading,
  BIO_MAX_CHARACTERS,
  API_TO_POST_EDITED_USER_PROFILE,
} from "utils";

import {
  FormError,
  InputFile,
  FormWrapper,
  CustomButton,
  LoadingSpinner,
  DialogActionsCloseIcon,
} from "components";

import {
  authReducer,
  ACTION_TYPE_ERROR,
  ACTION_TYPE_LOADING,
  ACTION_TYPE_SUCCESS,
  editProfileInitialReducerState,
  ACTION_TYPE_ENTER_FORM_DETAILS,
} from "reducer";

import {
  Box,
  Avatar,
  Dialog,
  TextField,
  Typography,
  DialogActions,
  DialogContent,
  InputAdornment,
} from "@mui/material";

export const EditProfileDialog = ({
  profileData,
  profileDispatch,
  openEditProfileDialog,
  setOpenEditProfileDialog,
}) => {
  const { userAuthToken } = useSelector((state) => state.user);
  const [state, dispatch] = useReducer(authReducer, {
    ...editProfileInitialReducerState,
    ...profileData,
    fullName: `${profileData.firstName} ${profileData.lastName}`,
  });

  const { dispatch: profileContextDispatch } = useProfile();
  const {
    bio,
    bgPic,
    error,
    status,
    fullName,
    username,
    profilePic,
    websiteURL,
  } = state;

  const handleInputChange = (event) => {
    if (status === "error") {
      dispatch({ type: ACTION_TYPE_SUCCESS });
    }

    if (event.target.name === "bio") {
      if (BIO_MAX_CHARACTERS - event.target.value.length >= 0) {
        dispatch({
          type: ACTION_TYPE_ENTER_FORM_DETAILS,
          payload: { bio: event.target.value },
        });
      }
    } else {
      dispatch({
        type: ACTION_TYPE_ENTER_FORM_DETAILS,
        payload: { [event.target.name]: event.target.value },
      });
    }
  };

  const handleFileInputChange = (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      const reader = new FileReader();

      reader.addEventListener("load", () => {
        const uploaded_image = reader.result;
        dispatch({
          type: ACTION_TYPE_ENTER_FORM_DETAILS,
          payload: { [event.target.name]: uploaded_image },
        });
      });

      reader.readAsDataURL(selectedFile);
    }
  };

  const handleClose = () => {
    setOpenEditProfileDialog(false);
  };

  const handleSaveClick = async () => {
    if (fullName === "") {
      dispatch({ type: ACTION_TYPE_ERROR, payload: "Please Enter Your Name" });
    } else {
      const splittedName = fullName.split(" ");
      const [firstName = "", lastName = ""] = [
        splittedName[0],
        splittedName.slice(1).join(" "),
      ];
      const userData = {
        bio,
        bgPic,
        lastName,
        firstName,
        profilePic,
        websiteURL,
      };
      const config = { headers: { authorization: userAuthToken } };
      const { api, propertyToGet } = API_TO_POST_EDITED_USER_PROFILE;

      try {
        dispatch({ type: ACTION_TYPE_LOADING });

        const response = await axios.post(api, { userData }, config);

        dispatch({ type: ACTION_TYPE_SUCCESS });
        profileDispatch({
          type: ACTION_TYPE_SUCCESS,
          payload: response.data[propertyToGet],
        });
        profileContextDispatch({
          type: ACTION_TYPE_SUCCESS,
          payload: response.data[propertyToGet],
        });
        handleClose();
      } catch (error) {
        dispatch({
          type: ACTION_TYPE_ERROR,
          payload: error.message,
        });
      }
    }
  };

  return (
    <Dialog
      onClose={handleClose}
      open={openEditProfileDialog}
      className={styles.dialogContainer}
    >
      <Box display="flex" alignItems="center">
        <DialogActionsCloseIcon handleClose={handleClose} />

        <Typography component="h1" fontWeight="bold" variant="h4">
          Edit
        </Typography>
      </Box>

      <DialogContent className={styles.dialogContent}>
        <Box position="relative" px={1}>
          <Box className={styles.background_img}>
            {bgPic && (
              <Avatar
                src={bgPic}
                variant="square"
                alt={`${username} avatar`}
                sx={{ height: "100%", width: "100%" }}
              />
            )}

            <InputFile inputName="bgPic" handleChange={handleFileInputChange} />
          </Box>
          <Box ml={2} className={styles.profile_pic}>
            {profilePic ? (
              <Avatar
                src={profilePic}
                alt={`${username} avatar`}
                sx={{ height: "100%", width: "100%" }}
              />
            ) : (
              <FilledAccountCircleIcon className={styles.accountCircle_icon} />
            )}

            <InputFile
              inputName="profilePic"
              handleChange={handleFileInputChange}
            />
          </Box>
        </Box>

        <FormWrapper>
          {status === "error" && <FormError errorToShow={error} />}

          <TextField
            type="text"
            label="Name"
            name="fullName"
            value={fullName}
            onChange={handleInputChange}
            InputLabelProps={{ shrink: true }}
            placeholder="Your Name... (firstname lastname)"
          />

          <TextField
            multiline
            name="bio"
            label="Bio"
            type="text"
            minRows={3}
            maxRows={4}
            value={bio}
            placeholder="Your Bio..."
            onChange={handleInputChange}
            InputLabelProps={{ shrink: true }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Typography component="p" className={styles.bioText_count}>
                    {`${bio.length} / ${BIO_MAX_CHARACTERS}`}
                  </Typography>
                </InputAdornment>
              ),
            }}
          />

          <TextField
            type="url"
            name="websiteURL"
            value={websiteURL}
            label="Website URL"
            onChange={handleInputChange}
            InputLabelProps={{ shrink: true }}
            placeholder="Your Website URL... (https://mywebsite.com)"
          />
        </FormWrapper>
      </DialogContent>

      <DialogActions className={styles.action_save}>
        <CustomButton
          onClick={handleSaveClick}
          disabled={isStatusLoading(status)}
          className={classNames(
            styles.btn_save,
            isStatusLoading(status) ? styles.btn_disabled : ""
          )}
        >
          {isStatusLoading(status) && <LoadingSpinner />}
          Save
        </CustomButton>
      </DialogActions>
    </Dialog>
  );
};

EditProfileDialog.propTypes = {
  profileData: PropTypes.shape({
    bio: PropTypes.string,
    bgPic: PropTypes.string,
    email: PropTypes.string,
    password: PropTypes.string,
    username: PropTypes.string,
    lastName: PropTypes.string,
    followers: PropTypes.array,
    following: PropTypes.array,
    bookmarks: PropTypes.array,
    firstName: PropTypes.string,
    profilePic: PropTypes.string,
    websiteURL: PropTypes.string,
  }),
  profileDispatch: PropTypes.func,
  openEditProfileDialog: PropTypes.bool,
  setOpenEditProfileDialog: PropTypes.func,
};

EditProfileDialog.defaultProps = {
  profileData: {
    bio: "",
    bgPic: "",
    email: "",
    password: "",
    username: "",
    lastName: "",
    firstName: "",
    followers: [],
    following: [],
    bookmarks: [],
    profilePic: "",
    websiteURL: "",
  },
  profilDispatch: () => {},
  openEditProfileDialog: false,
  setOpenEditProfileDialog: () => {},
};
