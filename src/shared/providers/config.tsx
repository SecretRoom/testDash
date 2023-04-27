import React from "react";
import { NavlinkData } from "./types";
import { FiSettings, FiTrendingUp } from "react-icons/fi";

export const routes: NavlinkData[] = [
  { path: '/', key: 'dashboard_page', name: 'Dashboard', icon: FiTrendingUp  },
  { path: '/test',  key: 'test_page', name: 'test', icon: FiSettings  },

];
