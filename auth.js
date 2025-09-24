import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { 
    getAuth, 
    signInWithEmailAndPassword, 
    signOut,
    onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";

// Your actual Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyAKUe5yv0-fMeyMHwXVmUVerGE8nalpJxs",
    authDomain: "decor8-b14e8.firebaseapp.com",
    projectId: "decor8-b14e8",
    storageBucket: "decor8-b14e8.appspot.com",
    messagingSenderId: "301302844702",
    appId: "1:301302844702:web:7376ed27571e8d40cccd0f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Check authentication state on page load
onAuthStateChanged(auth, (user) => {
    if (user) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', user.email);
        displayUserInfo();
    } else {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userEmail');
    }
});

// Protect pages - call this on every protected page
export async function protectPage() {
    const currentUser = auth.currentUser;
    if (!currentUser) {
        window.location.href = 'login.html';
        return false;
    }
    return true;
}

// Login function
export async function login(email, password) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', user.email);

        window.location.href = 'products.html';
    } catch (error) {
        console.error('Login error:', error.code, error.message);
        showError('Login failed: ' + error.message);
    }
}

// Logout function
export async function logout() {
    try {
        await signOut(auth);
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userEmail');
        window.location.href = 'index.html';
    } catch (error) {
        console.error('Logout error:', error);
    }
}

// Show error message
function showError(message) {
    // Remove existing error messages
    const existing = document.querySelector('.error-message');
    if (existing) existing.remove();

    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.style.color = 'red';
    errorDiv.style.padding = '10px';
    errorDiv.style.margin = '10px 0';
    errorDiv.style.border = '1px solid red';
    errorDiv.style.borderRadius = '5px';
    errorDiv.textContent = message;

    // Append to body or above form if exists
    const form = document.querySelector('form');
    if (form) form.parentNode.insertBefore(errorDiv, form);
    else document.body.prepend(errorDiv);
}

// Display user info on protected pages
export function displayUserInfo() {
    const userEmail = localStorage.getItem('userEmail');
    const userInfoElement = document.getElementById('user-info');
    if (userEmail && userInfoElement) {
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

// Make functions globally available
window.login = login;
window.logout = logout;
window.protectPage = protectPage;
window.displayUserInfo = displayUserInfo;

