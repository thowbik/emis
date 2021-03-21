// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
   // loginApiBaseUrl: 'https://emislogin.tnschools.gov.in/emis_login/api/login',
   // apiBaseUrl: 'https://emis1.tnschools.gov.in',
   loginApiBaseUrl: 'http://13.232.216.80/emis_login/api/login',
   apiBaseUrl: 'http://13.232.216.80',
   loginAuthorization: 'EMIS@2019_api',
   loggedInAuthorization: 'EMIS_web@2019_api',

   authorization: 'EMIS_web@2019_api',
   apiBaseUrl1: 'https://24iv009qs1.execute-api.ap-south-1.amazonaws.com/emis-prod',
   getSignedUrlApi: 'https://d8omnqcdi1.execute-api.ap-south-1.amazonaws.com/staging-resource-collection-mgmt/resource-collection-mgmt/resource-preurl',
   readingFileApi: 'https://d8omnqcdi1.execute-api.ap-south-1.amazonaws.com/staging-resource-collection-mgmt/resource-collection-mgmt/resource-listurl',
   // apiBaseUrl: 'http://localhost/emis-code',
   // apiBaseUrl: 'http://10.0.0.52/emis-code',
   // apiBaseUrl: 'http://localhost/EMIIS_CODE/NEW_EMIS/emis-code',

   //loggedInAuthorization : 'rRM6K1cVNk7FpYOavLhja62R540Id76m4OMrABpb',
   authorization1: 'xYwjU0aw0iar8dNgpKrlE39s2pxXdyuk9kqtMVAA',
   dikshaUrl: 'https://preprod.ntp.net.in',
   production: false,
   environment: 'LOCAL',
   showEnvironment: true
};