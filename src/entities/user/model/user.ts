import localforage from "localforage";

export type User = {
  id: number
  name: string
  login: string
}

export const getUserData = <T>(callBack: (value: T) => void, key?: keyof User) => {
  localforage.getItem<User>('userData').then(function(data) {
    if(data){
      const userData = key ? data[key] as T : data as T
      callBack(userData)
    }
  }).catch(function(err) {
      // This code runs if there were any errors
      console.log(err);
  })
}

export const setUserData = <T>(value: T) => {
  localforage.setItem('userData', value)
}

export const logout = () => {
  return localforage.removeItem('userData', () => {
    localStorage.clear()
  })
}
