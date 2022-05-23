import PropTypes from "prop-types";
import classNames from "classnames";
import { Box } from "@mui/material";
import styles from "./PageHeading.module.css";

export const PageHeading = ({ children, className }) => {
  return (
    <Box
      px={2}
      pt={2}
      pb={0.5}
      className={classNames(styles.page_heading, className)}
    >
      {children}
    </Box>
  );
};

PageHeading.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

PageHeading.defaultProps = {
  className: "",
  children: <></>,
};
