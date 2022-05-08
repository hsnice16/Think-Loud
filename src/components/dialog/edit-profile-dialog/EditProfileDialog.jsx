import { useState } from "react";
import PropTypes from "prop-types";
import { BIO_MAX_CHARACTERS } from "utils";
import { FilledAccountCircleIcon } from "assets";
import styles from "./EditProfileDialog.module.css";

import { CustomButton, DialogActionsCloseIcon, FormWrapper } from "components";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";

export const EditProfileDialog = ({
  openEditProfileDialog,
  setOpenEditProfileDialog,
  newProfileData,
  setNewProfileData,
}) => {
  const [bioText, setBioText] = useState(newProfileData.bio);

  const handleBioTextChange = (event) => {
    if (BIO_MAX_CHARACTERS - event.target.value.length >= 0) {
      setBioText(event.target.value);
      setNewProfileData((prevData) => ({
        ...prevData,
        bio: event.target.value.trim(),
      }));
    }
  };

  const handleNewProfileDataChange = (event) => {
    setNewProfileData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value.trim(),
    }));
  };

  const handleClose = () => {
    setOpenEditProfileDialog(false);
  };

  return (
    <Dialog
      open={openEditProfileDialog}
      onClose={handleClose}
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
          <Box className={styles.background_img}></Box>
          <Box ml={2} className={styles.profile_pic}>
            <FilledAccountCircleIcon className={styles.accountCircle_icon} />
          </Box>
        </Box>

        <FormWrapper>
          <TextField
            label="Name"
            name="name"
            type="text"
            placeholder="Your Name..."
            value={newProfileData.name}
            onChange={handleNewProfileDataChange}
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            label="Bio"
            type="text"
            multiline
            minRows={3}
            maxRows={4}
            placeholder="Your Bio..."
            value={bioText}
            onChange={handleBioTextChange}
            InputLabelProps={{ shrink: true }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Typography component="p" className={styles.bioText_count}>
                    {`${bioText.length} / ${BIO_MAX_CHARACTERS}`}
                  </Typography>
                </InputAdornment>
              ),
            }}
          />

          <TextField
            label="Website URL"
            name="websiteURL"
            type="url"
            value={newProfileData.websiteURL}
            onChange={handleNewProfileDataChange}
            placeholder="Your Website URL..."
            InputLabelProps={{ shrink: true }}
          />
        </FormWrapper>
      </DialogContent>

      <DialogActions className={styles.action_save}>
        <CustomButton className={styles.btn_save} onClick={handleClose}>
          Save
        </CustomButton>
      </DialogActions>
    </Dialog>
  );
};

EditProfileDialog.propTypes = {
  openEditProfileDialog: PropTypes.bool,
  setOpenEditProfileDialog: PropTypes.func,
  newProfileData: PropTypes.shape({
    name: PropTypes.string,
    bio: PropTypes.string,
    websiteURL: PropTypes.string,
  }),
  setNewProfileData: PropTypes.func,
};

EditProfileDialog.defaultProps = {
  openEditProfileDialog: false,
  setOpenEditProfileDialog: () => {},
  newProfileData: {
    name: "",
    bio: "",
    websiteURL: "",
  },
  setNewProfileData: () => {},
};
