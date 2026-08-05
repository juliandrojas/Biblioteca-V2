import api from "../config/axios";
export function getDashboardStats() {
  return api.get("/admin/dashboard/stats");
}
