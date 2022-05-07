import { useState } from "react";
import styles from "./Landing.module.css";
import { logoPNG, thinkJPG } from "assets";
import { useDocumentTitle } from "custom-hooks";
import { Box, Grid, Typography } from "@mui/material";
import {
  BroadcastBtnSx,
  ConnectWithMeLink,
  CustomButton,
  SignInDialog,
} from "components";

export const Landing = () => {
  const [openSignInDialog, setOpenSignInDialog] = useState(false);
  useDocumentTitle("Join today");

  return (
    <Box pb={4}>
      <SignInDialog
        openSignInDialog={openSignInDialog}
        setOpenSignInDialog={setOpenSignInDialog}
      />

      <Grid container minHeight="100vh" mb={1} component="main">
        <Grid item sm={6}>
          <img src={thinkJPG} alt="think poster" className={styles.thinkImg} />
        </Grid>
        <Grid item sm={6} p={6}>
          <img className={styles.logoImg} src={logoPNG} alt="think loud logo" />

          <Box>
            <Typography variant="h1" component="h1" className={styles.text}>
              Think Loud today
            </Typography>
            <Typography variant="h2" component="h2" className={styles.text}>
              Join
            </Typography>

            <CustomButton
              sxStyles={{
                ...BroadcastBtnSx,
                fontSize: "2rem",
                padding: "0.3rem 2rem",
              }}
            >
              Sign Up now
            </CustomButton>
          </Box>

          <Box>
            <Typography variant="h3" component="h3" className={styles.text}>
              Already have an account?
            </Typography>

            <CustomButton
              onClick={() => setOpenSignInDialog(true)}
              className={styles.btn_logIn}
            >
              Log In
            </CustomButton>
          </Box>
        </Grid>
      </Grid>

      <ConnectWithMeLink component="footer" />
    </Box>
  );
};
