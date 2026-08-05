import * as adminService from "../services/dashboard.service.js";
export async function getDashboardStats(req, res) {
  try {
    const stats = await adminService.getDashboardStats();
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
