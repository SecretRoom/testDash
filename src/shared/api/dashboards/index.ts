import { Dashboard } from "entities/dashboards/types"
import { Axios } from "shared/utils/fetch"

const DashboardsAPI = {
  getDashboards: async (): Promise<Dashboard[]> => {
    return await Axios.get('/dashboards')
  }
}

export { DashboardsAPI }
