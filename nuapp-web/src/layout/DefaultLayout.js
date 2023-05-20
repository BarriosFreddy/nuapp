import React from 'react'
import { AppContent, AppSidebar } from '../components/index'

const DefaultLayout = (props) => {
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
