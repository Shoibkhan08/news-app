import * as React from "react";
import Card from "./Card";
import { Grid } from "@mui/material";
import AddModel from '../model/AddModel'

export default function Articles({user_id,setValues,setUserid,isToggled,openSlider,closeSlider, editArticle,handleFileChange,fetchArticlesDetail, getData, handleBlur, handleChange, handleSubmit, values, setReload, reload }) {
  const loader = <div style={{width:'100%',height:'100vh',display:'flex',placeItems:'center',justifyContent:'center'}}><h2>loading..</h2></div> 
  const category = "Add Articles"
  const carddata = React.useMemo(()=>{
    return(
      <>
      {!getData ? loader : getData.map((data) => (
            <Grid item xl={3} md={4} sm={6} xs={12} key={data.id} py={2} sx={{ display: "flex", justifyContent: "center" }}>
              <Card  user_id={user_id} editArticle={editArticle} fetchArticlesDetail={fetchArticlesDetail} setReload={setReload} reload={reload} data={data} />
            </Grid>
          )
        )}
      </>
    )
  },[getData])

  return (
    <>
      <Grid container >
        
        <Grid item xl={12} md={12} p={2}><AddModel setUserid={setUserid} setValues={setValues} handleFileChange={handleFileChange} category={category} isToggled={isToggled} openSlider={openSlider} closeSlider={closeSlider}  handleBlur={handleBlur} handleChange={handleChange} handleSubmit={handleSubmit} values={values}/></Grid>
        
        {carddata}
        
      </Grid>
    </>
  );
}
