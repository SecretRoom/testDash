import { DashboardsAPI } from "shared/api/dashboards"

const getDashboardsA = () => {
  return DashboardsAPI.getDashboards()
}

export { getDashboardsA }