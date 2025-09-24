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

// Monitor auth state
onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in
        displayUserInfo(user);
    } else {
        // User is signed out
        displayUserInfo(null);
    }
});

// Login function
export async function login(email, password) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        displayUserInfo(user);
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
        displayUserInfo(null);
        window.location.href = 'index.html';
    } catch (error) {
        console.error('Logout error:', error);
    }
}

// Protect page
export async function protectPage() {
    const user = auth.currentUser;
    if (!user) {
        window.location.href = 'login.html';
        return false;
    }
    return true;
}

// Show error message
function showError(message) {
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

    const form = document.querySelector('form');
    if (form) form.parentNode.insertBefore(errorDiv, form);
    else document.body.prepend(errorDiv);
}

// Display user info
export function displayUserInfo(user) {
    const userInfoElement = document.getElementById('user-info');
    if (!userInfoElement) return;

    if (user) {
        const nameOrEmail = user.displayName || user.email;
        userInfoElement.innerHTML = `
            <div style="background: #f0f0f0; padding: 10px; margin-bottom: 20px; border-radius: 5px;">
                <span>Welcome, ${nameOrEmail}</span>
                <button onclick="logout()" style="float: right; padding: 5px 10px; background: #ff4444; color: white; border: none; border-radius: 3px; cursor: pointer;">
                    Logout
                </button>
            </div>
        `;
    } else {
        userInfoElement.innerHTML = '';
    }
}

// Make functions global
window.login = login;
window.logout = logout;
window.protectPage = protectPage;
window.displayUserInfo = displayUserInfo;

