import { Grid } from "@mui/material";
import React,{useEffect, useState} from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useParams } from "react-router-dom";
import axios from "axios";



export default function DetailArticles() {

    const [getArticleDetail,setArticleDetail] = useState([])
    const { username, text, photo, create_at  } = getArticleDetail
    const {id} = useParams()

    const getMore = async ()=>{
        await axios.get(`http://127.0.0.1:8000/articlesDeleteUpdate/${id}`)
        .then((res) => {
          setArticleDetail(res.data)
          console.log(res.data)
        })
        .catch((error) => console.log(error));
    }

   useEffect(()=>{
    getMore()
   },[id])

  return (
    <React.Fragment>
      <Grid container >
        <Grid item xl={12} md={12} xs={12} sm={12} sx={{display:"flex",justifyContent:"center",py:2}}>
            { !getArticleDetail ? <h1>Loading...</h1> :  
          <Card  sx={{ maxWidth: 500,minheight:"550px",boxShadow:'0px 0px 20px grey'}}>
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: red[500], }} aria-label="recipe">
                  R
                </Avatar>
              }
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
              title={username}
              subheader={create_at}
            />
            <CardMedia
              component="img"
              height="330"
              image={photo}
              alt="Paella dish"
            />
            <CardContent>
              <Typography variant="p" color="text.secondary">
                <h6>{text}</h6>
                This impressive paella is a perfect party dish and a fun meal to
                cook together with your guests. Add 1 cup of frozen peas along
                with the mussels, if you like.
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <IconButton aria-label="add to favorites">
                <FavoriteIcon />
              </IconButton>
              <IconButton aria-label="share">
                <ShareIcon />
              </IconButton>
              
            </CardActions>
           
          </Card>}
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
