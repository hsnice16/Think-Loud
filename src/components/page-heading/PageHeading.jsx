import PropTypes from "prop-types";
import classNames from "classnames";
import { Box } from "@mui/material";
import styles from "./PageHeading.module.css";

export const PageHeading = ({ children, className }) => {
  return (
    <Box
      pb={0.5}
      px={2}
      pt={2}
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
  children: <></>,
  className: "",
};
