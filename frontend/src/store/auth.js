import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth',{
    state: () => ({
        isAuth:false,
        isReader:false,
        user: {
            AdminName: "John Doe",
            ReaderName:"Tom Shaw"
            
        }
    }),
});