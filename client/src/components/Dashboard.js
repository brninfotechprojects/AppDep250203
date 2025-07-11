import React from 'react'
import { useSelector } from 'react-redux'
import TopNavigation from './TopNavigation';

function Dashboard() {
    let userDetails = useSelector((store)=>{
        return store.userDetails;
    })
  return (
    <div>
        <TopNavigation></TopNavigation>
      <h1>Dashboard Page</h1>
      <h1>{userDetails.firstName}{userDetails.lastName}</h1>
      <img src={`http://localhost:3333/${userDetails.profilePic}`} alt=''></img>
    </div>
  )
}

export default Dashboard
