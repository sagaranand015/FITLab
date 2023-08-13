// ** Demo Components Imports
import { useAuth } from 'src/configs/authProvider'
import { useEffect, useState } from 'react'
import HomePage from "./homepage"
import NearByGyms from './near-gyms'

const Dashboard = () => {

  const { providerClient, currentAccount, setCurrentAccount } = useAuth()
  const [accountConnected, setAccountConnected] = useState(false)

  useEffect(async () => {
    console.log("current account on dashboard page is: ", currentAccount)
    if (currentAccount) {
      setAccountConnected(true)
    } else {
      setAccountConnected(false)
    }
  }, [currentAccount])

  return (
    <div>
      {accountConnected ? (
        <div>
          <NearByGyms></NearByGyms>
        </div>
      ) :
        (
          <div>
            <HomePage></HomePage>
          </div>
        )
      }
    </div >
  )
}

export default Dashboard
