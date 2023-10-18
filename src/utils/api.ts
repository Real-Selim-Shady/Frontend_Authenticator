import axios from "axios";


//Register User in database
interface UserToRegister {
  firstName: string,
  lastName: string,
  userName: string;
  password: string;
}

export async function registerUser(userToRegister: UserToRegister) {
  const response = await axios({
    method: "post",
    url: "http://localhost:3000/api/registerUser",
    headers: {
      "Content-Type": "application/json",
    },
    data: userToRegister
  });
  return response;
}


//Log User 
interface UserToConnect {
  userName: string;
  password: string;
};

export async function connectUser(userToConnect:UserToConnect){
  const response = await axios({
    method: "post",
    url: "http://localhost:3000/api/login",
    headers: {
      "Content-Type": "application/json",
    },
    data: userToConnect
  });
  return response;
}

//Retrieve User Data
export async function retrieveData(userId: string, token: string) {
  const response = await axios({
    method: "get",
    url: `http://localhost:3000/api/findUser/${userId}`,
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
  });
  return response;
}

//Edit User in database
interface UserToEdit {
  firstName: string,
  lastName: string,
  userName: string;
  password?: string;
}


export async function editData(userId: string, token: string, userToEdit: UserToEdit ) {
  const response = await axios({
    method: "put",
    url: `http://localhost:3000/api/editUser/${userId}`,
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    data: userToEdit
  });
  return response;
}


//Delete User in database
export async function deleteUser(userId: string, token: string){
  const response = await axios({
    method: "delete",
    url: `http://localhost:3000/api/deleteUser/${userId}`,
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
  });
  return response;
}

