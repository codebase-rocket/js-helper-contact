// Info: Boilerplate library. Contains functions related to Phone, Email and Address
'use strict';

// Shared Dependencies (Managed by Loader)
var Lib = {};

// Private Dependencies - Parts of same library (Managed by Loader)
var ContactInput;
var ContactData;

// Exclusive Dependencies
var CONFIG = require('./config'); // Loader can override it with Custom-Config
const COUNTRY_DATA = require('./data/index.js')();

/////////////////////////// Module-Loader START ////////////////////////////////

  /********************************************************************
  Load dependencies and configurations

  @param {Set} shared_libs - Reference to libraries already loaded in memory by other modules
  @param {Set} config - Custom configuration in key-value pairs

  @return nothing
  *********************************************************************/
  const loader = function(shared_libs, config){

    // Shared Dependencies (Must be loaded in memory already)
    Lib.Utils = shared_libs.Utils;
    Lib.Debug = shared_libs.Debug;
    [Lib.Geo, Lib.GeoInput, Lib.GeoData] = [shared_libs.Geo, shared_libs.GeoInput, shared_libs.GeoData];

    // Override default configuration
    if( !Lib.Utils.isNullOrUndefined(config) ){
      Object.assign(CONFIG, config); // Merge custom configuration with defaults
    }

    // Private Dependencies
    ContactInput = require('./contact_input')(Lib, CONFIG);
    ContactData = require('./contact_data')(Lib, CONFIG);

  };

//////////////////////////// Module-Loader END /////////////////////////////////



///////////////////////////// Module Exports START /////////////////////////////
module.exports = function(shared_libs, config){

  // Run Loader
  loader(shared_libs, config);

  // Return Public Funtions of this module
  return [Contact, ContactInput, ContactData];

};//////////////////////////// Module Exports END //////////////////////////////



///////////////////////////Public Functions START///////////////////////////////
const Contact = { // Public functions accessible by other modules

  /********************************************************************
  Return Country specifc contact-configration Data Object

  @param {String} country_code - Country ISO Code (2 digit ISO code)

  @return {Map} - Country contact-configration Data Object in key-value
  @return {Boolean} - false is country code not found in known list of countries
  *********************************************************************/
  getCountryContactConfigData: function(country_code){

    // Check if country-code is in known liat of countries
    if( country_code in COUNTRY_DATA ){

      return ContactData.createCountryContactConfigData(
        COUNTRY_DATA[country_code]['cn'],
        COUNTRY_DATA[country_code]['ccc'],
        COUNTRY_DATA[country_code]['plmin'],
        COUNTRY_DATA[country_code]['plmax'],
        COUNTRY_DATA[country_code]['pclmin'],
        COUNTRY_DATA[country_code]['pclmax'],
        COUNTRY_DATA[country_code]['mtc'],
        COUNTRY_DATA[country_code]['cur'],
      );

    }


    // Reach here means country-code not found
    return false;

  },


  /********************************************************************
  Return List of sub-divisions of a country

  @param {String} country_code - Country ISO Code (2 digit ISO code)

  @return {Map} - List of Sub-Diviosion ISO code and their data in key-value
  @return {Boolean} - false is country code not found in known list of countries
  *********************************************************************/
  getCountrySubDivisionsList: function(country_code){

    // Check if country-code is in known liat of countries
    if( country_code in COUNTRY_DATA ){

      // Buffer for Translated DataSet
      var sub_divisions = {};

      // Iterate each item and do DataSet Translation
      for( let sub_division in COUNTRY_DATA[country_code]['sd'] ){
        sub_divisions[sub_division] = ContactData.createSubDivisionData( // Data Translator
          COUNTRY_DATA[country_code]['sd'][sub_division]['sdn']
        )
      }

      // Return Data
      return sub_divisions;

    }


    // Reach here means country-code not found
    return false;

  },


  /********************************************************************
  Return specific sub-division's data

  @param {String} country_code - Country ISO Code (2 digit ISO code)
  @param {String} sub_division - Sub-Division ISO Code (2 digit ISO code)

  @return {Map} - Sub-Division data in key-value
  @return {Boolean} - false if sub-division/country-code code not found
  *********************************************************************/
  getCountrySubDivisionData: function(country_code, sub_division){

    if(
      country_code in COUNTRY_DATA && // Check if country-code is in known liat of countries
      sub_division in COUNTRY_DATA[country_code]['sd'] // Check if Sub-Division is in list
    ){

      // Return Data
      return ContactData.createSubDivisionData( // Data Translator
        COUNTRY_DATA[country_code]['sd'][sub_division]['sdn']
      )

    }


    // Reach here means country-code/Sub-division not found
    return false;

  },


  /********************************************************************
  Return List of Timezones in a country

  @param {String} country_code - Country ISO Code (2 digit ISO code)

  @return {String[]} - List of Timezones IANA code
  @return {Boolean} - false is country code not found in known list of countries
  *********************************************************************/
  getCountryTimeZones: function(country_code){

    // Check if country-code is in known liat of countries
    if( country_code in COUNTRY_DATA ){
      return COUNTRY_DATA[country_code]['tz'];
    }


    // Reach here means country-code not found
    return false;

  },

};///////////////////////////Public Functions END///////////////////////////////



//////////////////////////Private Functions START///////////////////////////////
const _Contact = {  // Private methods accessible within this modules only
  // None
};/////////////////////////Private Functions END////////////////////////////////
