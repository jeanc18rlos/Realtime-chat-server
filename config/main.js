module.exports = {
    // Setting port for the server
    'port': process.env.PORT || 3000,
    // Secret key for JWT signing and encryption
    'secret': 'MySecret',
    // sendgrid api key
    'sendGridKey': '',
    // Database connection information
    'database': 'mongodb://devhack:HAck2018@ds233212.mlab.com:33212/2acestesting'
}