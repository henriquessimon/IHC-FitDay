export function saveUser(userData) {

    localStorage.setItem(
        "currentUser",
        JSON.stringify(userData)
    );
}

export function getUser() {

    return JSON.parse(
        localStorage.getItem("currentUser")
    );
}

export function isAuthenticated() {

    return !!localStorage.getItem("currentUser");
}

export function logout() {

    localStorage.removeItem("currentUser");
}

export function getCurrentUserRoutine() {

    const currentUser =
        JSON.parse(
            localStorage.getItem("currentUser")
        );

    if (!currentUser) return [];

    const users =
        JSON.parse(
            localStorage.getItem("users")
        ) || [];

    const user =
        users.find(user =>
            user.email === currentUser.email
        );

    return user?.rotina || [];
}