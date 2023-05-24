import React, { useEffect } from 'react'
import { AppContent, AppSidebar } from '../components/index'
import { useDispatch } from 'react-redux'
import { getAllItems } from 'src/modules/billing/services/items.service'
import { ErrorBoundary } from 'react-error-boundary'

const DefaultLayout = (props) => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllItems())
  }, [dispatch])
  return (
    <div>
      <ErrorBoundary fallback={<h1>Algo salió mal!</h1>}>
        <AppSidebar />
        <div className="wrapper d-flex flex-column min-vh-100 bg-light">
          {/* <AppHeader /> */}
          <div className="body flex-grow-1">
            <AppContent />
          </div>
          {/* <AppFooter /> */}
        </div>
      </ErrorBoundary>
    </div>
  )
}

export default DefaultLayout
