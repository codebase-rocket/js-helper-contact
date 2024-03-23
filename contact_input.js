// Info: Contains Functions Related to Phone, Email and Address Input Data Cleanup and Validations
'use strict';

// Shared Dependencies (Managed by Main Entry Module & Loader)
var Lib;

// Exclusive Dependencies
var CONFIG; // (Managed by Main Entry Module & Loader)
const COUNTRY_DATA = require('./data/index.js')();


/////////////////////////// Module-Loader START ////////////////////////////////

  /********************************************************************
  Load dependencies and configurations

  @param {Set} shared_libs - Reference to libraries already loaded in memory by other modules
  @param {Set} config - Custom configuration in key-value pairs

  @return nothing
  *********************************************************************/
  const loader = function(shared_libs, config){

    // Shared Dependencies (Managed my Main Entry Module)
    Lib = shared_libs;

    // Configuration (Managed my Main Entry Module)
    CONFIG = config;

  };

//////////////////////////// Module-Loader END /////////////////////////////////



///////////////////////////// Module Exports START /////////////////////////////
module.exports = function(shared_libs, config){

  // Run Loader
  loader(shared_libs, config);

  // Return Public Funtions of this module
  return ContactInput;

};//////////////////////////// Module Exports END //////////////////////////////



///////////////////////////Public Functions START///////////////////////////////
const ContactInput = { // Public functions accessible by other modules

  /********************************************************************
  Return cleaned Phone Number (Without Country-Code) for non-sql purposes
  Remove all the dangerous characters excluding those who satisfy RegExp

  @param {String} phone_number - Phone Number to be cleaned

  @return {String} - Sanitized string
  *********************************************************************/
  sanitizePhoneNumber: function(phone_number){

    // Clean and return
    return Lib.Utils.sanitizeUsingRegx(phone_number, CONFIG.PHONE_NUMBER_SANATIZE_REGX);

  },


  /********************************************************************
  Check if Country-Code is in known list of countries

  @param {String} phone_country - Phone Country-Code (2 digit ISO code)

  @return {Boolean} - true on success
  @return {Boolean} - false if validation fails
  *********************************************************************/
  validatePhoneCountry: function(phone_country){

    // Check if Country-Code is in known list of countries
    return (phone_country in COUNTRY_DATA);

  },


  /********************************************************************
  Check if Country-Code is in known list of countries

  @param {String} country - Country-Code (2 digit ISO code)

  @return {Boolean} - true on success
  @return {Boolean} - false if validation fails
  *********************************************************************/
  validateCountry: function(country){

    // Check if Country-Code is in known list of countries
    return (country in COUNTRY_DATA);

  },


  /********************************************************************
  Check if valid Phone-Number (As per E.164 Format)
  Note: This doesnot validate phone-number length for specific country

  @param {String} phone_number - Phone Number (Without country-code)

  @return {Boolean} - true on success
  @return {Boolean} - false if validation fails
  *********************************************************************/
  validatePhoneNumber: function(phone_number){

    // Check if text-length in within Minimum and Maximum string length
    return Lib.Utils.validateStringRegx(
      phone_number,
      CONFIG.PHONE_NUMBER_CHARSET_REGX,
      CONFIG.PHONE_NUMBER_MIN_LENGTH,    // Minimum Required length of Phone Number
      CONFIG.PHONE_NUMBER_MAX_LENGTH     // Maximum Allowed length of Phone Number
    );

  },


  /********************************************************************
  Return cleaned Phone-Number Without Country-Code for non-sql purposes
  Remove all the dangerous characters excluding those who satisfy RegExp

  @param {String} phone - Phone-Number with Optional Country-Code

  @return {String} - Sanitized string
  *********************************************************************/
  sanitizePhone: function(phone){

    // Clean and return
    return Lib.Utils.sanitizeUsingRegx(phone, CONFIG.PHONE_SANATIZE_REGX);

  },


  /********************************************************************
  Check if valid Phone-Country & Phone-Number

  @param {String} phone_country - Phone Country-Code (2 digit ISO code)
  @param {String} phone_number - Phone Number (Without country-code)

  @return {Boolean} - true on success
  @return {Boolean} - false if validation fails
  *********************************************************************/
  validatePhone: function(phone_country, phone_number){

    // Check phone-number length for specific country
    return (
      (phone_country in COUNTRY_DATA) && // Country-Code not found in known list of countries
      Lib.Utils.validateString(
        phone_number,
        COUNTRY_DATA[phone_country]['plmin'],    // Minimum Required length of Phone Number in this specific country
        COUNTRY_DATA[phone_country]['plmax']     // Maximum Allowed length of Phone Number in this specific country
      )
    );

  },


  /********************************************************************
  Check if valid Phone-Number Charset

  @param {String} phone_number - Phone Number (Without country-code)

  @return {Boolean} - true on success
  @return {Boolean} - false if validation fails
  *********************************************************************/
  validatePhoneCharset: function(phone_number){

    // Check phone-number Charset
    return (
      CONFIG.PHONE_CHARSET_REGX.test(phone_number)
    );

  },


  /********************************************************************
  Check if valid Phone-Country & Phone-Number

  @param {String} phone_country - Phone Country-Code (2 digit ISO code)
  @param {String} phone_number - Phone Number (Without country-code)

  @return {Boolean} - true on success
  @return {Boolean} - false if validation fails
  *********************************************************************/
  validatePhoneMinLength: function(phone_country, phone_number){

    // Check phone-number length for specific country
    return (
      (phone_country in COUNTRY_DATA) && // Country-Code not found in known list of countries
      Lib.Utils.validateString(
        phone_number,
        COUNTRY_DATA[phone_country]['plmin'], // Minimum Required length of Phone Number in this specific country
        null // Maximum Allowed length of Phone Number in this specific country
      )
    );

  },


  /********************************************************************
  Check if valid Phone-Country & Phone-Number

  @param {String} phone_country - Phone Country-Code (2 digit ISO code)
  @param {String} phone_number - Phone Number (Without country-code)

  @return {Boolean} - true on success
  @return {Boolean} - false if validation fails
  *********************************************************************/
  validatePhoneMaxLength: function(phone_country, phone_number){

    // Check phone-number length for specific country
    return (
      (phone_country in COUNTRY_DATA) && // Country-Code not found in known list of countries
      Lib.Utils.validateString(
        phone_number,
        null, // Minimum Required length of Phone Number in this specific country
        COUNTRY_DATA[phone_country]['plmax'] // Maximum Allowed length of Phone Number in this specific country
      )
    );

  },


  /********************************************************************
  Check if email is in valid format or not

  @param {String} email - Email ID to be checked
  @param {Number} [max_length] - (Optional) maximum allowed length

  @return {Boolean} - true on success
  @return {Boolean} - false if validation fails
  *********************************************************************/
  validateEmail: function(email, max_length) {

    // Check Max length limit. No need to check Min length (automatically done in valid email format check).
    if( Lib.Utils.isNullOrUndefined(max_length) && email.length > max_length ){
      return false; // If email length is greater then allowed length
    }

    // Regx for email validation
    //Link: https://stackoverflow.com/a/1373724
    //Modified to accept minimum 2 char tld and reject tld with - minus sign
    //List of all TLD http://data.iana.org/TLD/tlds-alpha-by-domain.txt
    const email_regx = new RegExp( /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9]{2,}?/, `i` ); //Regular Expression for valid email. Case Insensitive

    // Check if its a valid email (Note: alternate is using filter_var())
    if( !email_regx.test(email) ){
      return false; // If failed to match email format
    }


    // Reach here means all validations passed
    return true; // Validation successful

  },


  /********************************************************************
  Return cleaned postal-code for non-sql purposes
  Remove all the dangerous characters excluding those who satisfy RegExp

  @param {String} postal_code - Postal Code to be cleaned

  @return {String} - Sanitized string
  *********************************************************************/
  sanitizeAddressPostalCode: function(postal_code){

    // Clean and return
    return Lib.Utils.sanitizeUsingRegx(postal_code, CONFIG.POSTAL_CODE_SANATIZE_REGX);

  },


  /********************************************************************
  Check if Address-Title string length is within limits

  @param {String} address_title - Address Title (free text)

  @return {Boolean} - true on success
  @return {Boolean} - false if validation fails
  *********************************************************************/
  validateAddressTitle: function(address_title){

    // Check Address-Title string length (Only if not null)
    if(
      !Lib.Utils.isNullOrUndefined(address_title) && // Only if not Null
      !Lib.Utils.validateString( // Check string length
        address_title,
        CONFIG.ADDRESS_TITLE_MIN_LENGTH,    // Minimum Required length
        CONFIG.ADDRESS_TITLE_MAX_LENGTH     // Maximum Allowed length
      )
    ){
      return false;
    }


    // Reach here means all validations passed
    return true; // Validation successful

  },


  /********************************************************************
  Check if Address-Type is known to system

  @param {Int} address_type - Address Type - Emum (0:other (Default) | 1:office | 2:home)

  @return {Boolean} - true on success
  @return {Boolean} - false if validation fails
  *********************************************************************/
  validateAddressType: function(address_type){

    // Check Address-Type in List of its types
    if( !(address_type.toString() in CONFIG.ADDRESS_TYPE) ){
      return false;
    }


    // Reach here means all validations passed
    return true; // Validation successful

  },


  /********************************************************************
  Check if Country-Code is in known list of countries

  @param {String} address_country - Address Country-Code (2 digit ISO code)

  @return {Boolean} - true on success
  @return {Boolean} - false if validation fails
  *********************************************************************/
  validateAddressCountry: function(address_country){

    // Check if Country-Code is in known list of countries
    if( !(address_country in COUNTRY_DATA) ){
      return false;
    }


    // Reach here means all validations passed
    return true; // Validation successful

  },


  /********************************************************************
  Check if Sub-Division-Code is in known list of Sub-Division for this country

  @param {String} address_country - Address Country-Code (2 digit ISO code)
  @param {String} address_sub_division - Address Admin-Area / State / Province / Region (2 digit ISO code)

  @return {Boolean} - true on success
  @return {Boolean} - false if validation fails
  *********************************************************************/
  validateAddressSubDivision: function(address_country, address_sub_division){

    // Check if sub-division is in this country
    if(
      !(address_country in COUNTRY_DATA) || // Check for country first
      !(address_sub_division in COUNTRY_DATA[address_country]['sd']) // Now check if this sub-division exists in the country
    ){
      return false;
    }


    // Reach here means all validations passed
    return true; // Validation successful

  },


  /********************************************************************
  Check if Postal-Code string length is within limits for this country

  @param {String} address_country - Address Country-Code (2 digit ISO code)
  @param {String} postal_code - Postal Code to be checked

  @return {Boolean} - true on success
  @return {Boolean} - false if validation fails
  *********************************************************************/
  validateAddressPostalCode: function(address_country, postal_code){

    // Check Postal-Code string length
    if(
      !(address_country in COUNTRY_DATA) || // Check for country first
      !Lib.Utils.validateString( // Check postal-code string length
        postal_code,
        COUNTRY_DATA[address_country].pclmin,    // Minimum Required length of Postal Code in specifc country
        COUNTRY_DATA[address_country].pclmax     // Maximum Allowed length of Postal Code in specifc country
      )
    ){
      return false;
    }


    // Reach here means all validations passed
    return true; // Validation successful

  },


  /********************************************************************
  Check if Locality string length is within limits

  @param {String} address_locality - Address Locality (free text)

  @return {Boolean} - true on success
  @return {Boolean} - false if validation fails
  *********************************************************************/
  validateAddressLocality: function(address_locality){

    // Check Locality string length
    if(
      !Lib.Utils.validateString( // Check string length
        address_locality,
        CONFIG.ADDRESS_LOCALITY_MIN_LENGTH,    // Minimum Required length
        CONFIG.ADDRESS_LOCALITY_MAX_LENGTH     // Maximum Allowed length
      )
    ){
      return false;
    }


    // Reach here means all validations passed
    return true; // Validation successful

  },


  /********************************************************************
  Check if Address-Line-2 string length is within limits

  @param {String} address_line2 - Address Line-2 (free text)

  @return {Boolean} - true on success
  @return {Boolean} - false if validation fails
  *********************************************************************/
  validateAddressLine2: function(address_line2){

    // Check Address-Line-2 string length (Only if not null)
    if(
      !Lib.Utils.isNullOrUndefined(address_line2) && // Only if not Null
      !Lib.Utils.validateString( // Check string length
        address_line2,
        CONFIG.ADDRESS_OTHER_MIN_LENGTH,    // Minimum Required length
        CONFIG.ADDRESS_OTHER_MAX_LENGTH     // Maximum Allowed length
      )
    ){
      return false;
    }


    // Reach here means all validations passed
    return true; // Validation successful

  },


  /********************************************************************
  Check if Address-Line-1 string length is within limits

  @param {String} address_line1 - Address Line-1 (free text)

  @return {Boolean} - true on success
  @return {Boolean} - false if validation fails
  *********************************************************************/
  validateAddressLine1: function(address_line1){

    // Check Address-Line-1 string length
    if(
      !Lib.Utils.validateString( // Check string length
        address_line1,
        CONFIG.ADDRESS_OTHER_MIN_LENGTH,    // Minimum Required length
        CONFIG.ADDRESS_OTHER_MAX_LENGTH     // Maximum Allowed length
      )
    ){
      return false;
    }


    // Reach here means all validations passed
    return true; // Validation successful

  },


  /********************************************************************
  Check if Address-Extra string length is within limits

  @param {String} address_extra - Address Locality (free text)

  @return {Boolean} - true on success
  @return {Boolean} - false if validation fails
  *********************************************************************/
  validateAddressExtra: function(address_extra){

    // Check Address-Extra string length (Only if not null)
    if(
      !Lib.Utils.isNullOrUndefined(address_extra) && // Only if not Null
      !Lib.Utils.validateString( // Check string length
        address_extra,
        CONFIG.ADDRESS_OTHER_MIN_LENGTH,    // Minimum Required length
        CONFIG.ADDRESS_OTHER_MAX_LENGTH     // Maximum Allowed length
      )
    ){
      return false;
    }


    // Reach here means all validations passed
    return true; // Validation successful

  },


  /********************************************************************
  Check if each address feild is valid

  @param {Map} address_data - Address Data

  @return {Boolean} - true on success
  @return {Boolean} - false if validation fails
  *********************************************************************/
  validateAddress: function(address_data){

    // Check each feild
    if(
      !ContactInput.validateAddressTitle( // Check Address Type
        address_data['address_title']
      ) ||
      !ContactInput.validateAddressType( // Check Country
        address_data['address_type']
      ) ||
      !ContactInput.validateAddressCountry( // Check Country
        address_data['address_country']
      ) ||
      !ContactInput.validateAddressSubDivision( // Check Sub-Division
        address_data['address_country'],
        address_data['address_sub_division']
      ) ||
      !ContactInput.validateAddressLocality( // Check Locality
        address_data['address_locality']
      ) ||
      !ContactInput.validateAddressPostalCode( // Check Postal-Code
        address_data['address_country'],
        address_data['postal_code']
      ) ||
      !ContactInput.validateAddressLine2( // Check Address-Line-2
        address_data['address_line2']
      ) ||
      !ContactInput.validateAddressLine1( // Check Address-Line-1
        address_data['address_line1']
      ) ||
      !ContactInput.validateAddressExtra( // Check Address-Extra (Landmark, Gate Code, etc.)
        address_data['address_extra']
      ) ||
      !Lib.GeoInput.validateLatitude( // Check Address-Lattitude
        address_data['address_latitude']
      ) ||
      !Lib.GeoInput.validateLongitude( // Check Address-Longitude
        address_data['address_longitude']
      )
    ){
      return false;
    }


    // Reach here means all validations passed
    return true; // Validation successful

  },

};///////////////////////////Public Functions END///////////////////////////////



//////////////////////////Private Functions START///////////////////////////////
const _ContactInput = {  // Private methods accessible within this modules only
  // None
};/////////////////////////Private Functions END////////////////////////////////
