import { v4 as uuid } from "uuid";

export const SignInDialogData = {
  buttonData: [
    {
      _id: uuid(),
      btnText: "Log In",
      sxStyles: { margin: "1rem 0 0.5rem" },
    },
    {
      _id: uuid(),
      btnText: "Log In as a Guest",
      sxStyle: { margin: "0.5rem 0 0" },
    },
  ],
};
