import localforage from "localforage";
import * as R from 'ramda'
import { Dashboard } from "./types";


export const getDashboardById = <T>(callBack: (value: T) => void, id?: Dashboard['id']) => {
  localforage.getItem<Dashboard[]>('dashboards').then(function(data) {
    if(data){
      callBack(id ? <T>R.find(R.propEq('id', id))(data) : <T>data)
    }
  }).catch(function(err) {
      // This code runs if there were any errors
      console.log(err);
  })
}

const setDashboards = <T>(value: T) => {
  localforage.setItem('dashboards', value)
}

export { setDashboards }