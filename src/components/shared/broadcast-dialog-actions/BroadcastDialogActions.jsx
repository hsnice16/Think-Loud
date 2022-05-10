import PropTypes from "prop-types";
import classNames from "classnames";
import { BROADCAST_MAX_CHARACTERS } from "utils";
import styles from "./BroadcastDialogActions.module.css";
import { CircularProgress, DialogActions } from "@mui/material";
import { CircularProgressWithLabel, CustomButton } from "components";

export const BroadcastDialogActions = ({ postText, btnText }) => {
  return (
    <DialogActions className={styles.action_broadcast}>
      {BROADCAST_MAX_CHARACTERS - postText.length > 20 ? (
        <CircularProgress
          size="2rem"
          sx={{ marginRight: "1rem" }}
          variant="determinate"
          value={Math.round((postText.length * 100) / BROADCAST_MAX_CHARACTERS)}
        />
      ) : (
        <CircularProgressWithLabel
          value={BROADCAST_MAX_CHARACTERS - postText.length}
        />
      )}

      <CustomButton
        disabled={postText === ""}
        className={classNames(
          styles.btn_broadcast,
          postText === "" ? styles.btn_disabled : ""
        )}
      >
        {btnText}
      </CustomButton>
    </DialogActions>
  );
};

BroadcastDialogActions.propTypes = {
  postText: PropTypes.string,
  btnText: PropTypes.string,
};

BroadcastDialogActions.defaultProps = {
  postText: "",
  btnText: "",
};
