import api from "../config/axios";
export function getCategories() {
  return api.get("/categories");
}
export function createCategory(categoryData) {
  return api.post("/categories", categoryData);
}
export function updateCategory(categoryId, categoryData) {
  return api.put(`/categories/${categoryId}`, categoryData);
}
export function deleteCategory(categoryId) {
  return api.delete(`/categories/${categoryId}`);
}
