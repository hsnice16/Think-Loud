import PropTypes from "prop-types";
import classNames from "classnames";
import { Box, Typography } from "@mui/material";
import styles from "./BroadcastBoxHeader.module.css";

export const BroadcastBoxHeader = ({
  pText,
  h2Text,
  children,
  className,
  linkProps,
}) => {
  return (
    <Box className={classNames(styles.header, className)}>
      <Box className={styles.name}>
        <Typography component="h2" {...linkProps}>
          {h2Text}
        </Typography>
        <Typography component="p">{pText}</Typography>
      </Box>

      {children}
    </Box>
  );
};

BroadcastBoxHeader.propTypes = {
  pText: PropTypes.string,
  children: PropTypes.node,
  h2Text: PropTypes.string,
  className: PropTypes.string,
  linkProps: PropTypes.object,
};

BroadcastBoxHeader.defaultProps = {
  pText: "",
  h2Text: "",
  className: "",
  linkProps: {},
  children: <></>,
};
