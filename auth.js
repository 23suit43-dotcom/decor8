import { auth } from "./firebase.js";
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";

// Register a new user
export async function registerUser(email, password) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log("User registered:", userCredential.user);
        return { success: true, user: userCredential.user };
    } catch (error) {
        console.error("Registration error:", error.message);
        return { success: false, error: error.message };
    }
}

// Login existing user
export async function loginUser(email, password) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log("User logged in:", userCredential.user);
        return { success: true, user: userCredential.user };
    } catch (error) {
        console.error("Login error:", error.message);
        return { success: false, error: error.message };
    }
}

// Logout user
export async function logoutUser() {
    try {
        await signOut(auth);
        console.log("User logged out");
        return { success: true };
    } catch (error) {
        console.error("Logout error:", error.message);
        return { success: false, error: error.message };
    }
}

// Check if user is logged in
export function checkAuthState(callback) {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            console.log("User is logged in:", user.email);
            callback(true, user);
        } else {
            console.log("User is logged out");
            callback(false, null);
        }
    });
}

// Get current user
export function getCurrentUser() {
    return auth.currentUser;
}
