import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth',{
    state: () => ({
        isAuth:false,
        user: {
            name: "John Doe"
            
        }
    }),
});