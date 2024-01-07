import React, { useEffect } from 'react'
import {
  CAlert,
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login } from 'src/modules/core/services/auth.service'
import { setLoading } from 'src/modules/core/reducers/auth.reducer'
import { Navigate } from 'react-router-dom'

const Login = () => {
  const dispatch = useDispatch()
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
  const loginSuccess = useSelector((state) => state.auth.loginSuccess)
  const loading = useSelector((state) => state.auth.loading)
  const [userAccountLogin, setUserAccountLogin] = useState({
    email: '',
    password: '',
  })

  useEffect(() => () => dispatch(setLoading(false)), [dispatch])

  const onChangeInput = ({ target }) => {
    const { name, value } = target
    setUserAccountLogin({
      ...userAccountLogin,
      [name]: value,
    })
  }

  const onClickLogin = async () => dispatch(login(userAccountLogin))

  const onKeyDownLogin = ({ keyCode }) => keyCode === 13 && onClickLogin()

  return isLoggedIn ? (
    <Navigate to={'/billing'} />
  ) : (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={6}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Iniciar sessión</h1>
                    <p className="text-medium-emphasis">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        name="email"
                        onChange={onChangeInput}
                        placeholder="Email"
                        autoComplete="email"
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        name="password"
                        onChange={onChangeInput}
                        placeholder="Password"
                        autoComplete="current-password"
                        onKeyDown={onKeyDownLogin}
                      />
                    </CInputGroup>
                    {!loginSuccess && (
                      <CAlert color="danger">Correo electrónico y/o clave incorrecta</CAlert>
                    )}
                    <CRow>
                      <CCol xs={12} className="text-right">
                        <CButton color="link" className="px-0">
                          ¿Olvidaste tu clave?
                        </CButton>
                      </CCol>
                    </CRow>
                    <br />
                    <CRow>
                      <CCol xs={12}>
                        <div className="d-grid">
                          <CButton
                            size="lg"
                            onClick={onClickLogin}
                            color="primary"
                            className="px-4"
                            disabled={loading}
                          >
                            ACCEDER
                          </CButton>
                        </div>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
