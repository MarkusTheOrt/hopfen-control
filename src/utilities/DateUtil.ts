export default class DateUtil {
      /**
   * Formats a date into a '2009-01-01' string.
   * @param {Date} date The Date to Format
   */
  static ISODateString = (date = new Date()) => {
    return `${date.getUTCFullYear()}-${
      this.padNumber(
        date.getUTCMonth() + 1,
      )
    }-${this.padNumber(date.getUTCDate())}`;
  };

  /**
   * Formats a date into a '2009-01-01T12:00:00Z' string.
   * @param {Date} date the Date to Format
   */
  static ISOTimeString = (date = new Date()) => {
    return `${this.ISODateString(date)}T${
      this.padNumber(
        date.getUTCHours(),
      )
    }:${this.padNumber(date.getUTCMinutes())}:${
      this.padNumber(
        date.getUTCSeconds(),
      )
    }Z`;
  };

  /**
   * Zero pads a number to the left
   * @param {Number} number the number to pad
   * @param {Number} size the size of the string
   * @returns {String} The padded number
   */
  private static padNumber = (number: Number, size = 2) => {
    let s = "" + number;
    while (s.length < size) {
      s = "0" + s;
    }
    return s;
  };
}