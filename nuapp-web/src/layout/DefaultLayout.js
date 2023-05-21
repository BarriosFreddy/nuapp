import React, { useEffect } from 'react'
import { AppContent, AppSidebar } from '../components/index'
import { useDispatch } from 'react-redux'
import { getAllItems } from 'src/modules/billing/services/items.service'

const DefaultLayout = (props) => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllItems())
  }, [dispatch])
  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        {/* <AppHeader /> */}
        <div className="body flex-grow-1">
          <AppContent />
        </div>
        {/* <AppFooter /> */}
      </div>
    </div>
  )
}

export default DefaultLayout
