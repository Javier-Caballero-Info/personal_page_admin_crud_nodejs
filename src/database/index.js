/*
 * src/database/index.js 
 **/

function Database ({ databaseURL, private_key_id, private_key, client_email, client_id }) {

    // Initialize dependencies
    const firebase = require("firebase-admin");

    const serviceAccount = {
        "private_key_id": private_key_id,
        "private_key": private_key.toString().replace(/\\n/g , '\n'),
        "client_email": client_email,
        "client_id": client_id
    }

    console.log('\n==================================================================================')
    console.log(serviceAccount)
    console.log('==================================================================================\n')

    // Initialize the app with a service account, granting admin privileges
    firebase.initializeApp({
        credential: firebase.credential.cert(serviceAccount),
        databaseURL: databaseURL
    });

    // As an admin, the app has access to read and write all data, regardless of Security Rules
    return firebase.database().ref("/");
}

export default Database
