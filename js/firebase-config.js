// Initialize Firebase with offline persistence
document.addEventListener('DOMContentLoaded', function() {
    try {
        // Check if Firebase is already loaded
        if (typeof firebase !== 'undefined') {
            // Enable offline persistence
            firebase.firestore().enablePersistence({synchronizeTabs: true})
                .catch(err => {
                    if (err.code === 'failed-precondition') {
                        console.warn('Multiple tabs open, persistence can only be enabled in one tab at a time.');
                    } else if (err.code === 'unimplemented') {
                        console.warn('The current browser does not support offline persistence.');
                    }
                });
                
            // Handle connection state changes
            const connectedRef = firebase.database().ref('.info/connected');
            connectedRef.on('value', (snap) => {
                if (snap.val() === true) {
                    console.log('Connected to Firebase');
                    document.body.classList.remove('offline-mode');
                } else {
                    console.log('Not connected to Firebase');
                    document.body.classList.add('offline-mode');
                }
            });
        }
    } catch (e) {
        console.error('Firebase initialization error:', e);
    }
});
