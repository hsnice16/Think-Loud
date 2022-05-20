import PropTypes from "prop-types";
import { crossSearch } from "assets";
import { CustomButton } from "components";
import styles from "./NotFound.module.css";
import { useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { useDocumentTitle, useScrollToTop } from "custom-hooks";

export const NotFound = ({ documentTitle, h1Text }) => {
  useScrollToTop();
  const navigate = useNavigate();
  useDocumentTitle(documentTitle || "Page Not Found");

  return (
    <>
      <img
        loading="lazy"
        alt="not found"
        src={crossSearch}
        className={styles.notFound_img}
      />

      <Box className={styles.notFound_text}>
        <Typography component="h1" fontWeight="bold" variant="h3">
          {h1Text || "This page isn't available. Sorry about that."}
        </Typography>

        <CustomButton
          className={styles.notFound_btn}
          onClick={() => {
            navigate(-1, { replace: true });
          }}
        >
          Go Back
        </CustomButton>
      </Box>
    </>
  );
};

NotFound.propTypes = {
  h1Text: PropTypes.string,
  documentTitle: PropTypes.string,
};

NotFound.defaultProps = {
  h1Text: "",
  documentTitle: "",
};
