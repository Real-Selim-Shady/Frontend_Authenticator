import { defineStore } from "pinia";

interface User {
    firstName: string;
    lastName: string;
    userName: string;
}


export const useUserStore = defineStore("user", {
    state: () => ({
        editAction: false,
        deleteAction: false,
        user:{
            firstName:"",
            lastName:"",
            userName:"",
        }
    }),
    actions: {
        setEditAction(editAction: boolean) {
            this.editAction = editAction;
        },
        setDeleteAction(deleteAction: boolean) {
            this.deleteAction = deleteAction;
        },
        setUserAction(user: User) {
            this.user = user;
        },
    },
  });
  