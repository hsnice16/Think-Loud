import PropTypes from "prop-types";
import classNames from "classnames";
import { Box, Typography } from "@mui/material";
import styles from "./BroadcastBoxHeader.module.css";

export const BroadcastBoxHeader = ({ children, h2Text, pText, className }) => {
  return (
    <Box className={classNames(styles.header, className)}>
      <Box className={styles.name}>
        <Typography component="h2">{h2Text}</Typography>
        <Typography component="p">{pText}</Typography>
      </Box>

      {children}
    </Box>
  );
};

BroadcastBoxHeader.propTypes = {
  children: PropTypes.node,
  h2Text: PropTypes.string,
  pText: PropTypes.string,
  className: PropTypes.string,
};

BroadcastBoxHeader.defaultProps = {
  children: <></>,
  h2Text: "",
  pText: "",
  className: "",
};
