import PropTypes from "prop-types";
import { followSpinnerGIF, spinnerGIF } from "assets";

export const LoadingSpinner = ({ followSpinner }) => {
  return (
    <img
      alt="loading spinner, gif"
      style={{ marginRight: "0.5rem" }}
      src={followSpinner ? followSpinnerGIF : spinnerGIF}
    />
  );
};

LoadingSpinner.propTypes = {
  followSpinner: PropTypes.bool,
};

LoadingSpinner.defaultProps = {
  followSpinner: false,
};
