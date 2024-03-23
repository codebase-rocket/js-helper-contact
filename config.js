// Info: Configuration file
'use strict';


// Export configration as key-value Map
module.exports = {

  // Constraints on Phone Country Code and Number
  PHONE_COUNTRY_LENGTH        : 2,                    // Fixed length. ISO Code.

  // Constraints on Phone Number
  PHONE_NUMBER_MIN_LENGTH     : 3,                    // Minimum length (As per E.164 Format)
  PHONE_NUMBER_MAX_LENGTH     : 11,                   // Maximum length (As per E.164 Format)
  PHONE_NUMBER_SANATIZE_REGX  : /[^0-9]/gi,           // Regular expression for valid Characters. digits. Case Insensitive
  PHONE_NUMBER_CHARSET_REGX   : /^[0-9]*$/,           // Regular expression for valid Characters. digits. Case Insensitive


  // Constraints on Phone (Phone-Country + Phone-Number)
  PHONE_MIN_LENGTH            : 3,                    // Minimum length (As per E.164 Format)
  PHONE_MAX_LENGTH            : 14,                   // Maximum length (As per E.164 Format)
  PHONE_SANATIZE_REGX         : /[^0-9+]/gi,          // Regular expression for valid Characters. digits, +. Case Insensitive
  PHONE_CHARSET_REGX          : /^[0-9+]*$/,          // Regular expression for valid Characters. digits, +. Case Insensitive


  // Constraints on Address
  ADDRESS_TITLE_MIN_LENGTH    : 1,                    // Minimum length (Custom Title)
  ADDRESS_TITLE_MAX_LENGTH    : 30,                   // Maximum length (Custom Title)

  ADDRESS_LOCALITY_MIN_LENGTH : 1,                    // Minimum length (City / Town)
  ADDRESS_LOCALITY_MAX_LENGTH : 100,                  // Maximum length (City / Town)

  ADDRESS_OTHER_MIN_LENGTH    : 1,                    // Minimum length (Address Line 1 or 2 or Extra)
  ADDRESS_OTHER_MAX_LENGTH    : 255,                  // Maximum length (Address Line 1 or 2 or Extra)

  POSTAL_CODE_SANATIZE_REGX   : /[^A-Za-z0-9- ]/gi,   // Regular expression for valid Characters. Alphabets, digits, hyphen, space. Case Sensitive


  // Address Types
  ADDRESS_TYPE: {
    '0': 'other',
    '1': 'office',
    '2': 'home'
  },

};
