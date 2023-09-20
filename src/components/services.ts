
/**
 * @description Save Token
 */
const saveToken = (token: string) => {
    localStorage.setItem("token", token);
};

/**
 * @description Save Temporarily
 */
const saveTokenForSession = (sessionToken: string) => {
    sessionStorage.setItem("sessionToken", sessionToken);
};

/**
 * @description Remove all items from localStorage and sessionStorage
 */
const logout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("session-token");
};


export const accountServices = {
    saveToken, saveTokenForSession, logout
};