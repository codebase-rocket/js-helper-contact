// Info: Consolidator for countries data
'use strict';

// Ref: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
// Ref: https://www.npmjs.com/package/countries-and-timezones

module.exports = function(country_code){
  return {
    'ca': require('./country/ca'),
    'in': require('./country/in'),
    'lk': require('./country/lk'),
    'mx': require('./country/mx'),
    'uk': require('./country/uk'),
    'us': require('./country/us'),
    'sa': require('./country/sa'),
    'ae': require('./country/ae'),
  }
};
