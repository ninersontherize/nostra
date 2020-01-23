const googleAuth = require("google-auth-library");
const Credentials =  require("google-auth-library/build/src/auth/credentials");

const scope = "https://mail.google.com/";

/**
* Step 0: Create OAuth2 credentials at the Google Console (make sure to download JSON, not only just get key and secret)
*/

const credentials = {
  "web": {
    "client_id":"1015508077263-ajpq8vcb3bgctn0bpe1u0m9d1gilr8cu.apps.googleusercontent.com",
    "project_id":"nostra-266019",
    "auth_uri":"https://accounts.google.com/o/oauth2/auth",
    "token_uri":"https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs",
    "client_secret":"R3X5h2HjoT0pnjVbEwpumNGO",
    "redirect_uris":["https://www.nostra.gg/home"],
    "javascript_origins":["https://www.nostra.gg"]
  }
};

/**
* Step 1: Authorize in the browser
*/

function getAuthorizeUrl(callback) {
  const oauth2Client = new googleAuth.OAuth2Client(credentials.web.client_id, credentials.web.client_secret, credentials.web.redirect_uris[0]);

  const authUrl = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: scope
  });

  callback(null, authUrl);
}

//getAuthorizeUrl((err,url) => {
//  if (err) return console.log(err);
//  console.log("Auth url is: ", url);
//});

/**
* Step 2: Get auth token
*/

/**
* Paste in your one-time use authorization code here
*/
const code = "4/vwEfwVoq6Xc_dWIPMdLJm_mgBfM43-HneUu5vjXfbl9oJKB9wF8uzxwpme9nEd7UWhV9ajb-LZEgHsdnf_JEKKs";

function getAccessToken(callback) {
  const oauth2Client = new googleAuth.OAuth2Client(credentials.web.client_id, credentials.web.client_secret, credentials.web.redirect_uris[0]);

  oauth2Client.getToken(code, (err, token) => {
    if(err) return console.log(err);
    callback(null, token);
  });
}

getAccessToken((err, token) => {
  if(err) return console.log(err);
  console.log("Auth token is: ", token);
});

/**
 * Step 3: Save access and refresh tokens as an export for Nodemailer
*/

/**
 * Paste your credentials here as this object.
 */

const tokens = { 
  access_token: 'ya29.Il-7BxQYBBo0HAjbIlhmoHdyVxSCR5ulGfKYPn9ecQKnwbBbGo_lS2HcWSEojmNsSN88uaQjleDaJd-m0PpHWI0p_ojoIu0ps3VG5m0fNfWtS-3gwO5mtK57IChMDktUwA',
  refresh_token: '1//061pS2BotKq7NCgYIARAAGAYSNwF-L9Ir1D28wJAbUoLIC78Zhstln7Go84p4_-v5Fy8TOexhyMvydI3wr21cPLfxyzOviePCEkw',
  scope: 'https://mail.google.com/',
  token_type: 'Bearer',
  expiry_date: 1579817461403 
};

module.exports = {credentials, tokens};