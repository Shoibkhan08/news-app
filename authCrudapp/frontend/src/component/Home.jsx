
import React, { useState } from "react";
import Articles from "./pages/Articles";
import axios from "axios";
import { useFormik } from 'formik';
import useToggle from "./hooks/useToggle";


export default function Home( {user,setReload, reload,fetchArticlesDetail}) {
  const [getData, setData] = useState();
  const [file, setFile] = useState(null)
  const [getId, setGetId] = useState(null)
  const {isToggled,openSlider,closeSlider} = useToggle();

  const BASE_URL = import.meta.env.VITE_APP_BASE_URL//api key

  const fetchArticles = async () => {
      axios.get(`${BASE_URL}/articles/`,{
          headers: {
            'Accept': 'application/json', 
            'Content-Type': 'multipart/form-data',
            }
        })
        .then((res) => {
          setData(res.data);
        })
        .catch((error) => console.log(error));
    
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);// Store the selected file in state
  };

  const { handleBlur , handleChange, handleSubmit, values,setValues } = useFormik({
    initialValues: {
      user:"",
      photo:"",
      text:"",
    },
    onSubmit:async(value,action)=>{
      const formData = new FormData();
      formData.append('user', values.user);
      formData.append('photo', file); // Append the file object
      formData.append('text', values.text);
      if (!getId) {
        await axios.post(`${BASE_URL}/articles/`,formData,{
          headers: {
            'Accept': 'application/json', 
            'Content-Type': 'multipart/form-data',
            }
         })
          .then((res)=>{
            setReload(!reload)
            action.resetForm()
          }
          )
          .catch((error)=>{console.log(error)})
      } else {
        await axios.put(`${BASE_URL}/articlesDeleteUpdate/${getId}/`,formData,{
          headers: {
            'Accept': 'application/json', 
            'Content-Type': 'multipart/form-data',
            }
         })
          .then((res)=>{
            setReload(!reload)
            action.resetForm()
          }
          )
          .catch((error)=>{console.log(error)})
      }
     
    }
  })

  const setUserid = ()=>{
    setValues({user:user.user_id})
  }

  const editArticle = (data)=>{
    setGetId(data.id)
    setValues({user:data.user,photo:data.photo,text:data.text})
    openSlider()
    
  }

  React.useEffect(() => {
    fetchArticles();
  }, [reload]);

  return (
    <React.Fragment>
      <Articles isToggled={isToggled} user_id={user.user_id} setValues={setValues} setUserid={setUserid} openSlider={openSlider} closeSlider={closeSlider} editArticle={editArticle} handleFileChange={handleFileChange} fetchArticlesDetail={fetchArticlesDetail} setReload={setReload} reload={reload} getData={getData} handleBlur={handleBlur} handleChange={handleChange} handleSubmit={handleSubmit} values={values} />
    </React.Fragment>
  );
}
