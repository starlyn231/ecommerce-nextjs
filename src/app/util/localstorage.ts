"use client"
export const setUserIdInLocalStorage = (userId: string) => {
    localStorage.setItem('userId', userId);
};


export const getUserIdFromLocalStorage = () => {
    return localStorage.getItem('userId');
};