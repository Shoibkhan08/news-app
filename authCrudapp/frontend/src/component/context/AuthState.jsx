import React,{ useState } from 'react'
import authContext from './authcontext'
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import { jwtDecode } from "jwt-decode";

 const AuthState = (props) => {
    const token = localStorage.getItem('token')
    const [user, setUser] = useState(token ? jwtDecode(token) : "null")
    const [reload, setReload] = useState(false)
    const location = useLocation()
  
    const BASE_URL = import.meta.env.VITE_APP_BASE_URL

  //login and register API
    const { handleChange, handleBlur, handleSubmit, values } = useFormik({//login and register API
      
      initialValues: {
        username: "",
        email:"",
        password: "",
      },
      onSubmit: (value,action) => {
        if (location.pathname === '/signup') {
          axios.post(`${BASE_URL}/register/`,{username:value.username,email:value.email,password:value.password},{
            headers: {
              Accept: "application/json",
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => {
            action.resetForm()
            setReload(!reload)
            })
            .catch((err) => {
              console.log(err);
              });
        } else {
          axios.post(`${BASE_URL}/login/`,{ username: value.username, password: value.password },
            {
              headers: {
                Accept: "application/json",
                "Content-Type": "multipart/form-data",
              },
            }
          )
          .then((response) => {
            localStorage.setItem("token", response.data.access);
            setUser(jwtDecode(response.data.access))
            window.location.href = "/";
            action.resetForm()
            setReload(!reload)
          })
          .catch((error) => {
            console.log(error);
          });
        }
      },
    });
    //get More Article
    const fetchArticlesDetail= async (id)=>{
        await axios.delete(`${BASE_URL}/articlesDeleteUpdate/${id}/`)
          .then((res) => {
            setReload(!reload)
          })
          .catch((error) => console.log(error));
      
    }
  return (
    <authContext.Provider value={{user,reload, setReload,values,handleChange,handleBlur,handleSubmit,fetchArticlesDetail,}}>
        {props.children}
    </authContext.Provider>
  )
}
export default AuthState;
