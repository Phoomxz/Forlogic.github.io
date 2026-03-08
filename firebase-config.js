// Firebase Configuration
const firebaseConfig = {
    apiKey: 'YOUR_API_KEY',
    authDomain: 'YOUR_AUTH_DOMAIN',
    databaseURL: 'YOUR_DATABASE_URL',
    projectId: 'YOUR_PROJECT_ID',
    storageBucket: 'YOUR_STORAGE_BUCKET',
    messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
    appId: 'YOUR_APP_ID'
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Reference to the database
const database = firebase.database();

// Function to count visitors
function trackVisitor() {
    const currentDateTime = '2026-03-08 08:24:52'; // Current Date and Time
    const userLogin = 'Phoomxz'; // Current User's Login

    database.ref('visitors/').push({
        dateTime: currentDateTime,
        user: userLogin
    }).then(() => {
        console.log('Visitor tracked successfully');
    }).catch((error) => {
        console.error('Error tracking visitor:', error);
    });
}

// Track visitor on page load
window.onload = trackVisitor;
