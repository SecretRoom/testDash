import React, { useState, useEffect } from 'react'
import { getUserData, User } from 'entities/user/model'


const UserProfile = () => {
  const [name, setName] = useState<User["name"]>("")
  useEffect(() => {
    getUserData<User, 'name'>(setName)
  }, [])
  
  return (
    <div>{name}</div>
  )
}

export { UserProfile }