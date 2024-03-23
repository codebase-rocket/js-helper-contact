// Info: Test Cases
'use strict';

// Global objects
var Lib = {}; // For dependencies


// Dependencies (Modules that are imported from outside this project)
Lib.Utils = require('js-helper-utils');
Lib.Debug = require('js-helper-debug')(Lib);
[ Lib.Geo, Lib.GeoInput, Lib.GeoData ] = require('js-helper-geo')(Lib);
const [ Contact, ContactInput, ContactData ] = require('js-helper-contact')(Lib);



////////////////////////////SIMILUTATIONS//////////////////////////////////////
// Nothing
///////////////////////////////////////////////////////////////////////////////


/////////////////////////////STAGE SETUP///////////////////////////////////////



///////////////////////////////////////////////////////////////////////////////


/////////////////////////////////TESTS/////////////////////////////////////////

// sanitizePhoneNumber()
Lib.Debug.log( // Output: 9999999999
  "sanitizePhoneNumber('99-(999)-999 99')",
  ContactInput.sanitizePhoneNumber('99-(999)-999 99')
);


// validatePhoneCountry()
Lib.Debug.log( // Output: true
  "validatePhoneCountry('in')",
  ContactInput.validatePhoneCountry('in')
);

Lib.Debug.log( // Output: false
  "validatePhoneCountry('xz')",
  ContactInput.validatePhoneCountry('xz')
);


// validateAddressSubDivision()
Lib.Debug.log( // Output: true
  "validateAddressSubDivision('in', 'dl')",
  ContactInput.validateAddressSubDivision('in', 'dl')
);

Lib.Debug.log( // Output: false
  "validateAddressSubDivision('in', 'xx')",
  ContactInput.validateAddressSubDivision('in', 'xx')
);


// constructPhoneId()
var phone_id = ContactData.constructPhoneId('in', '9876543210');
Lib.Debug.log( // Output: 1234567890.91
  "constructPhoneId('in', '9876543210')",
  phone_id
);

// deconstructPhoneId()
Lib.Debug.log( // Output: { phone_country: 'in', phone_number: '0987654321' }
  "deconstructPhoneId()",
  ContactData.deconstructPhoneId(phone_id)
);


// constructFullPhoneNumber()
Lib.Debug.log( // Output: +919876543210
  "constructFullPhoneNumber()",
  ContactData.constructFullPhoneNumber('in', '9876543210')
);

// deconstructFullPhoneNumber()
Lib.Debug.log( // Output: ['us','09876543210']
  "deconstructFullPhoneNumber('+919876543210','in')",
  ContactData.deconstructFullPhoneNumber('+919876543210','in')
);

// createAddressData()
Lib.Debug.log( // Output: ['us','09876543210']
  "createAddressData()",
  ContactData.createAddressData(
    {
      address_id: null,
      string: '3 Nature Trail, Hamden, Connecticut 06518, United States',
      type: 'hom',
      country: 'us',
      sub_division: 'ct',
      locality: 'New Haven County',
      line1: '3 Nature Trail',
      line2: 'Hamden',
      postal_code: '06518',
      latitude: 41.44037205,
      longitude: -72.953037575,
      provider_data: {
        search_string: '3 Nature Trail, Hamden, Connecticut 06518, United States'

      }
    }
  )
);


// getCountryContactConfigData()
Lib.Debug.log( // Output: {Data Object}
  "getCountryContactConfigData()",
  Contact.getCountryContactConfigData('us')
);


// validatePhoneCountry()
Lib.Debug.log( // Output: true
  "validatePhoneCountry('in')",
  ContactInput.validatePhoneCountry('in')
);


// validatePhoneNumber()
Lib.Debug.log( // Output: true
  "validatePhoneNumber('9876543210')",
  ContactInput.validatePhoneNumber('9876543210')
);


// sanitizePhone()
Lib.Debug.log( // Output: true
  "sanitizePhone('+1987-6543-210')",
  ContactInput.sanitizePhone('+1987-6543-210')
);


// validatePhone()
Lib.Debug.log( // Output: true
  "validatePhone('us', '9876543210')",
  ContactInput.validatePhone('us', '9876543210')
);



// getCountrySubDivisionsList()
// Lib.Debug.log( // Output: {Data Object}
//   "getCountrySubDivisionsList('us')",
//   Contact.getCountrySubDivisionsList('us')
// );


// getCountrySubDivisionData()
// Lib.Debug.log( // Output: {Data Object}
//   "getCountrySubDivisionData('in', 'dl')",
//   Contact.getCountrySubDivisionData('us', 'vi')
// );

/*
// getCountryTimeZones()
Lib.Debug.log( // Output: {Data Object}
  "getCountryTimeZones()",
  Contact.getCountryTimeZones('us')
);
*/

///////////////////////////////////////////////////////////////////////////////
