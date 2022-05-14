const months = {
  0: "Jan",
  1: "Feb",
  2: "Mar",
  3: "April",
  4: "May",
  5: "June",
  6: "July",
  7: "Aug",
  8: "Sept",
  9: "Oct",
  10: "Nov",
  11: "Dec",
};

/**
 * getTimeDurationToShow - function to formate a
 *              date into user locale time duration
 *
 * @param {string} dateOfBroadcast
 * @returns a formated time duration string
 */
export const getTimeDurationToShow = (dateOfBroadcast) => {
  const dateOfBroadcastInLocale = new Date(dateOfBroadcast);
  const currLocaleDate = new Date();

  // difference between date of broadcast and current date in milliseconds
  const diffBtwDates = currLocaleDate - dateOfBroadcastInLocale;

  // difference in seconds
  const diffBtwDatesInSec = Math.floor(diffBtwDates / 1000);

  if (diffBtwDatesInSec < 60) {
    return `${diffBtwDatesInSec}sec`;
  } else {
    // difference in minutes
    const diffBtwDatesInMin = Math.floor(diffBtwDatesInSec / 60);

    if (diffBtwDatesInMin < 60) {
      return `${diffBtwDatesInMin}min`;
    } else {
      // difference in hours
      const diffBtwDatesInHours = Math.floor(diffBtwDatesInMin / 60);

      if (diffBtwDatesInHours < 24) {
        return `${diffBtwDatesInHours}h`;
      } else {
        return `${
          months[dateOfBroadcastInLocale.getMonth()]
        } ${dateOfBroadcastInLocale.getDate()}, ${dateOfBroadcastInLocale.getFullYear()}`;
      }
    }
  }
};
