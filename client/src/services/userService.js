import api from "../config/axios";
export function getUsers() {
  return api.get("/users");
}
export function createUser(userData) {
  return api.post("/users/create", userData);
}
export function updateUser(id, userData) {
  return api.put(`/users/${id}`, userData);
}
