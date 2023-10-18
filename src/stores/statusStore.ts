import { defineStore } from "pinia";

export const useStatusStore = defineStore("status", {
    state: () => ({
        errorLogin: false,
        errorEdit: false,
        errorDelete: false,
        errorRegister: false,
        successRegister: false,
        statusCode: 0,
        errorMessage: "",
        successMessage: "",

    }),
    actions: {
        setErrorLogin(errorLogin: boolean) {
            this.errorLogin = errorLogin;
        },
        setErrorEdit(errorEdit: boolean) {
            this.errorEdit = errorEdit;
        },
        setErrorDelete(errorDelete: boolean) {
            this.errorDelete = errorDelete;
        },
        setErrorRegister(errorRegister: boolean){
            this.errorRegister = errorRegister;
        },
        setSuccessRegister(successRegister: boolean){
            this.successRegister = successRegister;
        },
        setStatusCode(statusCode: number) {
            this.statusCode = statusCode;
        },
        setErrorMessage(errorMessage: string) {
            this.errorMessage = errorMessage;
        },
        setSuccessMessage(successMessage: string) {
            this.successMessage = successMessage;
        },
    },
  });
  