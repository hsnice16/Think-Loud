import PropTypes from "prop-types";
import styles from "./EmptyBookmark.module.css";
import { Box, Typography } from "@mui/material";

export const EmptyBookmark = ({ imgSrc, imgAlt, h1Text, h2Text }) => {
  return (
    <>
      <img
        loading="lazy"
        src={imgSrc}
        alt={imgAlt}
        className={styles.emptyBookmark_img}
      />

      <Box className={styles.emptyBookmark_text}>
        <Typography component="h1" fontWeight="bold" variant="h3">
          {h1Text}
        </Typography>
        <Typography component="h2" variant="h4">
          {h2Text}
        </Typography>
      </Box>
    </>
  );
};

EmptyBookmark.propTypes = {
  imgSrc: PropTypes.string,
  imgAlt: PropTypes.string,
  h1Text: PropTypes.string,
  h2Text: PropTypes.string,
};

EmptyBookmark.defaultProps = {
  imgSrc: "",
  imgAlt: "",
  h1Text: "",
  h2Text: "",
};
