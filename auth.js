import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { 
    getAuth, 
    signInWithEmailAndPassword, 
    signOut,
    onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";

// Your Firebase config (replace with your actual config)
const firebaseConfig = {
    apiKey: "your-api-key",
    authDomain: "your-project.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "123456789",
    appId: "your-app-id"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Check authentication state on page load
function checkAuth() {
    return new Promise((resolve) => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('userEmail', user.email);
                resolve(true);
            } else {
                // User is signed out
                localStorage.removeItem('isLoggedIn');
                localStorage.removeItem('userEmail');
                resolve(false);
            }
        });
    });
}

// Protect pages - call this on every protected page
async function protectPage() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const currentUser = auth.currentUser;
    
    // If not logged in locally AND not logged in with Firebase
    if (!isLoggedIn && !currentUser) {
        window.location.href = 'login.html';
        return false;
    }
    
    // If logged in with Firebase but not in localStorage
    if (currentUser && !isLoggedIn) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', currentUser.email);
    }
    
    return true;
}

// Login function
async function login(email, password) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        // Store login status in localStorage
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', user.email);
        
        // Redirect to products page
        window.location.href = 'products.html';
        
    } catch (error) {
        console.error('Login error:', error);
        showError('Login failed: ' + error.message);
        return false;
    }
}

// Logout function
async function logout() {
    try {
        await signOut(auth);
        // Clear local storage
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userEmail');
        
        // Redirect to home page
        window.location.href = 'index.html';
    } catch (error) {
        console.error('Logout error:', error);
    }
}

// Show error message
function showError(message) {
    // Remove any existing error messages
    const existingError = document.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Create new error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.style.color = 'red';
    errorDiv.style.padding = '10px';
    errorDiv.style.margin = '10px 0';
    errorDiv.style.border = '1px solid red';
    errorDiv.style.borderRadius = '5px';
    errorDiv.textContent = message;
    
    // Insert at the top of the form
    const form = document.querySelector('form');
    if (form) {
        form.parentNode.insertBefore(errorDiv, form);
    }
}

// Display user info on protected pages
function displayUserInfo() {
    const userEmail = localStorage.getItem('userEmail');
    if (userEmail) {
        const userInfoElement = document.getElementById('user-info');
        if (userInfoElement) {
            userInfoElement.innerHTML = `
                <div style="background: #f0f0f0; padding: 10px; margin-bottom: 20px; border-radius: 5px;">
                    <span>Welcome, ${userEmail}</span>
                    <button onclick="logout()" style="float: right; padding: 5px 10px; background: #ff4444; color: white; border: none; border-radius: 3px; cursor: pointer;">
                        Logout
                    </button>
                </div>
            `;
        }
    }
}

// Make functions available globally
window.login = login;
window.logout = logout;
window.protectPage = protectPage;
window.displayUserInfo = displayUserInfo;
window.checkAuth = checkAuth;

// Initialize auth check when script loads
checkAuth();
