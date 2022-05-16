import PropTypes from "prop-types";
import classNames from "classnames";
import styles from "./BroadcastDialogActions.module.css";
import { CircularProgress, DialogActions } from "@mui/material";
import { isStatusLoading, BROADCAST_MAX_CHARACTERS } from "utils";

import {
  CustomButton,
  LoadingSpinner,
  CircularProgressWithLabel,
} from "components";

export const BroadcastDialogActions = ({
  status,
  btnText,
  onClick,
  postText,
}) => {
  return (
    <DialogActions className={styles.action_broadcast}>
      {BROADCAST_MAX_CHARACTERS - postText.length > 20 ? (
        <CircularProgress
          size="2rem"
          variant="determinate"
          sx={{ marginRight: "1rem" }}
          value={Math.round((postText.length * 100) / BROADCAST_MAX_CHARACTERS)}
        />
      ) : (
        <CircularProgressWithLabel
          value={BROADCAST_MAX_CHARACTERS - postText.length}
        />
      )}

      <CustomButton
        onClick={onClick}
        disabled={postText === "" || isStatusLoading(status)}
        className={classNames(
          styles.btn_broadcast,
          postText === "" || isStatusLoading(status) ? styles.btn_disabled : ""
        )}
      >
        {isStatusLoading(status) && <LoadingSpinner />} {btnText}
      </CustomButton>
    </DialogActions>
  );
};

BroadcastDialogActions.propTypes = {
  onClick: PropTypes.func,
  status: PropTypes.string,
  btnText: PropTypes.string,
  postText: PropTypes.string,
};

BroadcastDialogActions.defaultProps = {
  status: "",
  btnText: "",
  postText: "",
  onClick: () => {},
};
