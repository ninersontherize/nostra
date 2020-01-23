const nodemailer = require("nodemailer");
const googleAuth = require("./google_auth");

const EMAIL_USERNAME = "nostra.help@gmail.com"
const COMMON_NAME = "Nostra Support"

const nodemailerSettings = {
	host: 'smtp.gmail.com',
	port: 465,
	secure: true,
	service: 'Gmail',
	from: `"${COMMON_NAME}" <${EMAIL_USERNAME}>`, // You actually dont have to do this because Gmail overwrites it with the authenticated user anyway, but it's semantic
	
	auth: {
		type: 'OAuth2',
		user: EMAIL_USERNAME,
		clientId: googleAuth.credentials.web.client_id,
		clientSecret: googleAuth.credentials.web.client_secret,
		refreshToken: googleAuth.tokens.refresh_token,
		accessToken: googleAuth.tokens.access_token,
		expires: googleAuth.tokens.expiry_date
	}
};

const gmailTransport = nodemailer.createTransport(nodemailerSettings);

module.exports = gmailTransport;