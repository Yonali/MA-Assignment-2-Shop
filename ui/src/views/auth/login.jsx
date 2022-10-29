import React, { useState } from 'react';
import './login.css';
import auth from "../../apis/modules/auth";
import { SigningForm } from '../../validations/index'
import { Formik, Form, Field } from 'formik'

export function Login() {


  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const login = async (data) => {
    try {
      let payload = {
        email: data.email,
        password: data.password
      }
      let respond = await auth.login(payload)
      console.log(respond.data.data.user.role)
      localStorage.setItem('JWT', respond.data.token)
      if(respond.data.data.user.role === 'owner'){
        window.location = '/homeowner'
      }else {
        window.location = '/homeclient'
      }

    } catch (e) {
      setError('Your user name or password is incorrect')
    }
  }

  return (
    <>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <title>Login Page</title>
        <link href="https://fonts.googleapis.com/css?family=Karla:400,700&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdn.materialdesignicons.com/4.8.95/css/materialdesignicons.min.css" />
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" />
      </head>

      <body style={{ paddingTop: '3em' }}>
        <main class="d-flex align-items-center min-vh-100 py-3 py-md-0">
          <div class="container" >
            <div class="card login-card">
              <div class="row no-gutters">
                <div class="col-md-5">
                  <img src="https://i.postimg.cc/XqdvQ77h/image-processing20190919-32761-1ls35ew.gif" alt="" class="login-card-img" />
                </div>
                <div class="col-md-7">
                  <div class="card-body">
                    <div class="logo">
                      <a href="/"><img src="https://i.postimg.cc/rsPvKTyp/CA.png" alt="Logo" /></a>
                    </div>
                    <p class="login-card-description">Sign into your account</p>
                    <Formik
                      initialValues={{
                        email: '',
                        password: ''
                      }}
                      validationSchema={SigningForm}
                      onSubmit={values => {
                        login(values)
                      }}
                    >
                      {({ errors, touched }) => (
                        <Form>
                          <div>
                            <Field type="email" name="email" id="email" class="form-control" placeholder="Email Address" />
                            {errors.email && touched.email ? <p id={"login-error"} class="text-danger">{errors.email}</p> : null}
                          </div>
                          <div>
                            <Field type="password" name="password" id="password" class="form-control" placeholder="Password" />
                            {errors.password && touched.password ? <p id={"login-error"} class="text-danger">{errors.password}</p> : null}
                            {error ? <p id={"login-error"} class="text-danger">{error}</p> : null}

                          </div>

                          <button type="submit" class="btn btn-block login-btn mb-4">Login</button>
                        </Form>
                      )}
                    </Formik>
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    {/* <a href="#" class="forgot-password-link">Forgot password?</a> */}
                    <p class="login-card-footer-text">Don't have an account? <a href="/register" class="text-reset">Register here</a></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"></script>
      </body>
    </>

  )
}
