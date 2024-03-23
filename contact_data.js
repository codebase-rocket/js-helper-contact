// Info: Contains Functions Related to Phone, Email and Address Data-Structures
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
  return ContactData;

};//////////////////////////// Module Exports END //////////////////////////////



///////////////////////////Public Functions START///////////////////////////////
const ContactData = { // Public functions accessible by other modules

  /********************************************************************
  Return Country Contact-Configration Data Object

  @param {String} country_name - Country Name
  @param {Integer} phone_country_calling_code - Country calling code (1 for us, 91 for india, ...)
  @param {Integer} phone_number_min_length - Minimum length of phone number in
  @param {Integer} phone_number_max_length - Phone Country-Code (2 digit ISO code)
  @param {Integer} postal_code_min_length - Phone Country-Code (2 digit ISO code)
  @param {Integer} postal_code_max_length - Phone Number (Without country-code)
  @param {Boolean} is_metric - True if Metric Syatem. False for Imperial
  @param {Boolean} currency_code - Currency Code (3 char ISO 4217)

  @return {Map} - Country contact-configration Data Object in key-value
  *********************************************************************/
  createCountryContactConfigData: function(
    country_name,
    phone_country_calling_code, phone_number_min_length, phone_number_max_length,
    postal_code_min_length, postal_code_max_length, is_metric, currency_code
  ){

    return {
      'country_name': country_name,
      'phone_country_calling_code': phone_country_calling_code,
      'phone_number_min_length': phone_number_min_length,
      'phone_number_max_length': phone_number_max_length,
      'postal_code_min_length': postal_code_min_length,
      'postal_code_max_length': postal_code_max_length,
      'is_metric': is_metric,
      'currency_code': currency_code
    };

  },


  /********************************************************************
  Return Sub-Division Data Object

  @param {String} sub_division_name - Sub-Division Name

  @return {Map} - Sub-Division Data Object in key-value
  *********************************************************************/
  createSubDivisionData: function(
    sub_division_name
  ){

    return {
      'sub_division_name': sub_division_name
    };

  },


  /********************************************************************
  Construct Phone-ID from Phone Country-Code and Phone Number
  (ex. 1.0123456789 => 987654321.1)

  @param {String} phone_country - Phone Country-Code (2 digit ISO code)
  @param {String} phone_number - Phone Number (Without country-code)

  @return {String} - Reversed(PhoneCountryCode.PhoneNumber). Null if Phone-Number is null
  *********************************************************************/
  constructPhoneId: function(phone_country, phone_number){

    // Only if Phone-Number is not null
    if( phone_number ){
      return Lib.Utils.stringReverse( phone_number ) + '.' + phone_country;
    }

    // return null if Phone-Data is null
    return null;

  },


  /********************************************************************
  Deconstruct Phone-ID to Phone Data

  @param {String} phone_id - Phone ID

  @return [String, String] - Phone Country, Phone Number
  *********************************************************************/
  deconstructPhoneId: function(phone_id){

    // Only if Phone-ID is not null
    if( phone_id ){

      // Split phone-number and country-code
      var [phone_number,phone_country] = phone_id.split('.');

      // Return
      return [
        phone_country, // Country-Code
        Lib.Utils.stringReverse( phone_number ) // Reverse Phone Number to fix it
      ];

    }

    // return null if Phone-ID is null
    return [ null, null ];

  },


  /********************************************************************
  Construct Full Phone-Number from Phone Data

  @param {String} phone_country - Phone Country-Code (2 digit ISO code)
  @param {String} phone_number - Phone Number (Without country-code)

  @return {String} - Phone Country-Code + Phone Number. Null if Phone-Data is null
  *********************************************************************/
  constructFullPhoneNumber: function(phone_country, phone_number){

    // Only if Phone-Number is not null
    if( phone_number ){
      return '+' + COUNTRY_DATA[phone_country]['ccc'] + phone_number;
    }

    // return null if Phone-Data is null
    return null;

  },


  /********************************************************************
  Deconstruct Full Phone Number to Phone-Country, Phone-Number

  @param {String} phone - Full Phone Number
  @param {String} phone_country - Phone Country-Code (2 digit ISO code)

  @return {String, String} - Phone Country-Code, Phone Number
  *********************************************************************/
  deconstructFullPhoneNumber: function(phone, phone_country){

    // Only if Phone is not null
    if( phone ){

      // Extract phone-number
      var phone_number = phone.split(
        '+' + COUNTRY_DATA[phone_country]['ccc'] // Get numnber for this Country-Code
      )[1]; // 1st Item of array returned by split

      // Create Phone-Data and return
      return [
        phone_country, // Country-Code
        phone_number // Phone Number with country-Code
      ];

    }

    // return null if phone is null
    return [ null, null ];

  },


  /********************************************************************
  Return Address-Data Object

  @param {Set} data - Raw Data Object

  * @param {String} address_id - System-ID of this Address (Can be Null if use-case doesn't require ID )
  * @param {String} string - Full Address String of an Address
  * @param {String} [title] - (Optional) Custom Title for this address (Ex: ABC Office, John's Home, ...) (Can be Null)
  * @param {String} [type] - (Optional) Address Type - [ENUM] (oth:other (Default) | off:office | hom:home)
  * @param {String} country - Country (ISO Code)
  * @param {String} sub_division - Admin-Area / State / Province / Region (ISO Code)
  * @param {String} locality - City / Town (Free Text)
  * @param {String} [line2] - (Optional) Thoroughfare / Street (Address Line 2) (Free Text)
  * @param {String} line1 - Apartment, Suite, etc. (Address Line 1) (Free Text)
  * @param {String} postal_code - Postal / ZIP Code (Free Text)
  * @param {String} [extra] - (Optional) Landmark/Gate Code/... (Free Text)
  * @param {Number} [latitude] - (Optional) Geo Coordinate - Lattitude
  * @param {Number} [longitude] - (Optional) Geo Coordinate - Longitude
  * @param {Set} provider_data - Temporary Provider Data (for Google, Mapbox, etc)

  @return {Set} - Address Data Object in key-value
  *********************************************************************/
  createAddressData: function(data){

    var ret = {
      'address_id': Lib.Utils.fallback( data['address_id'] ),
    };


    Lib.Utils.setNonEmptyKey( ret, 'string',  data['string'] );
    Lib.Utils.setNonEmptyKey( ret, 'title',  data['title'] );
    Lib.Utils.setNonEmptyKey( ret, 'type',  data['type'] ); // 'other' as Default
    Lib.Utils.setNonEmptyKey( ret, 'country',  data['country'] );
    Lib.Utils.setNonEmptyKey( ret, 'sub_division',  data['sub_division'] );
    Lib.Utils.setNonEmptyKey( ret, 'locality',  data['locality'] );
    Lib.Utils.setNonEmptyKey( ret, 'line1',  data['line1'] );
    Lib.Utils.setNonEmptyKey( ret, 'line2',  data['line2'] );
    Lib.Utils.setNonEmptyKey( ret, 'postal_code',  data['postal_code'] );
    Lib.Utils.setNonEmptyKey( ret, 'extra',  data['extra'] );
    Lib.Utils.setNonEmptyKey( ret, 'latitude',  data['latitude'] );
    Lib.Utils.setNonEmptyKey( ret, 'longitude',  data['longitude'] );
    Lib.Utils.setNonEmptyKey( ret, 'provider_data',  data['provider_data'] );


    return ret;

  },

};///////////////////////////Public Functions END///////////////////////////////



//////////////////////////Private Functions START///////////////////////////////
const _ContactData = {  // Private methods accessible within this modules only
  // None
};/////////////////////////Private Functions END////////////////////////////////
