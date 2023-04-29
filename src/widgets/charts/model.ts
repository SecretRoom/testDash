import { Chart } from "features/charts/types";
import { forEach, forEachObjIndexed, keys, sum, values } from "ramda";

export const refactData = (items: Chart['items']) => {
  const filteredData: any = {}
  forEach((item:any) => {
    if(typeof item.value === 'object') {
      forEachObjIndexed((val, key) => {
        if(!filteredData[key]){
          filteredData[key] = [{name: item.name, value: val}]
        } else {
          filteredData[key].push({name: item.name, value: val})
        }
        
      }, item.value)
      if(!filteredData['all']){
        filteredData['all'] = [{name: item.name, value: sum(values(item.value))}]
      } else {
        filteredData['all'].push({name: item.name, value: sum(values(item.value))})
      }
    }
  },items)
  if(keys(filteredData).length) return filteredData
  return { def: items }
}
