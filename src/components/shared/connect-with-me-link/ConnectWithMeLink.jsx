import PropTypes from "prop-types";
import { Box } from "@mui/material";
import { OpenInNewIcon } from "assets";
import styles from "./ConnectWithMeLink.module.css";

export const ConnectWithMeLink = ({ component }) => {
  return (
    <Box sx={{ textAlign: "center" }} component={component}>
      <a
        target="_blank"
        rel="noreferrer"
        href="https://twitter.com/hsnice16"
        className={styles.link_connectWithMe}
      >
        connect with me <OpenInNewIcon />
      </a>
    </Box>
  );
};

ConnectWithMeLink.propTypes = {
  component: PropTypes.string,
};

ConnectWithMeLink.defaultProps = {
  component: "",
};
