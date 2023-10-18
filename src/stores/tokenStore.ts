import { defineStore } from "pinia";

export const useTokenStore = defineStore("token", {
    state: () => ({
        token: "",
    }),
    actions: {
        setToken(token: string) {
            this.token = token;
        },
        removeToken() {
            this.token = "";
        },
        loadToken() {
            const token = localStorage.getItem("token");
            if (token !== null && token.length > 0 ) {
                this.setToken(token);
            }else{
                this.setToken("");
            }
        }

    },
  });
  