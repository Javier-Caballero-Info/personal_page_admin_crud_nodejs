/*
 * src/config/database.js 
 **/

export default {
    databaseURL: {
        doc: 'Url for Firebase database',
        format: String,
        default: '',
        env: 'DATABASE_URL'
    },
    private_key_id: {
        doc: 'Firebase private key id',
        format: String,
        default: '',
        env: 'DB_PRIVATE_KEY_ID'
    },
    private_key: {
        doc: 'Firebase private key',
        format: String,
        default: "",
        env: 'DB_PRIVATE_KEY'
    },
    client_email: {
        doc: 'Firebase client email',
        format: String,
        default: '',
        env: 'DB_CLIENT_EMAIL'
    },
    client_id: {
        doc: 'Firebase client id',
        format: String,
        default: '',
        env: 'DB_CLIENT_ID'
    },

}
