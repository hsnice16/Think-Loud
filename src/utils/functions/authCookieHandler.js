/**
 * authCookieHandler - function
 *
 * @returns handler functions related to cookie
 */
export const authCookieHandler = () => {
  const userUsernameCookieKey = "ThinkLoudUserUsername";
  const userAuthTokenCookieKey = "ThinkLoudUserAuthToken";

  /**
   * setCookies - function to set cookies value
   *
   * @param {Object} cookiesValue - object containing all the
   *                                values to set in cookies
   * @param {boolean} rememberMe - is rememberMe checked or not
   */
  const setCookies = (cookiesValue, rememberMe) => {
    const { userAuthToken, userUsername } = cookiesValue;

    let maxAge = "";
    if (rememberMe) {
      // for 2 days
      maxAge = `max-age=${60 * 60 * 24 * 2};`;
    }

    document.cookie = `${userUsernameCookieKey}=${encodeURIComponent(
      userUsername
    )};${maxAge}secure`;

    document.cookie = `${userAuthTokenCookieKey}=${encodeURIComponent(
      userAuthToken
    )};${maxAge}secure`;
  };

  /**
   * getCookies - function to get cookies value
   *
   * @returns an object having form {
   *    userUsername,
   *    userAuthToken,
   * }
   */
  const getCookies = () => {
    const allCookies = {
      userUsername: "",
      userAuthToken: "",
    };

    document.cookie.split(";").forEach((cookie) => {
      let [key, value] = cookie.split("=");
      value = decodeURIComponent(value);

      switch (key.trim()) {
        case userUsernameCookieKey:
          allCookies.userUsername = value;
          break;

        case userAuthTokenCookieKey:
          allCookies.userAuthToken = value;
          break;

        default:
          console.log("not a valid cookie");
      }
    });

    return allCookies;
  };

  /**
   * eraseCookies - function to erase cookies value
   */
  const eraseCookies = () => {
    [userAuthTokenCookieKey, userUsernameCookieKey].forEach((cookieKey) => {
      document.cookie = `${cookieKey}=;max-age=0`;
    });
  };

  const cookieHandler = {
    getCookies,
    setCookies,
    eraseCookies,
  };

  return cookieHandler;
};
