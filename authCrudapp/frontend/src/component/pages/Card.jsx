import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function CardDetail({
  data,
  setReload,
  reload,
  fetchArticlesDetail,
  editArticle,
  user_id
}) {

  return (
    <Card sx={{ maxWidth: 400, boxShadow: "0px 0px 20px grey" }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={data.username}
        subheader={data.create_at}
      />
      <CardMedia
        component="img"
        height="194"
        image={data.photo}
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {data.text}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the
          mussels, if you like.
        </Typography>
      </CardContent>
      <CardActions disableSpacing sx={{ py:2,display:'flex',justifyContent:'space-between' }}>
        {user_id == data.user ?
        <Typography sx={{ padding: " 0px 10px", color: "#fff" }} >
            <Button
              sx={{ marginRight:2 }}
              variant="outlined"
              color="error"
              onClick={() => editArticle(data)}
            >
              Edit
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={() => {
                setReload(!reload);
                fetchArticlesDetail(data.id);
              }}
            >
              Delete
            </Button>
        </Typography> : ''}
        <Typography
          sx={{
            padding: " 0px 20px 0 0",
            color: "#fff",
          }}
        >
          <Button variant="contained" >
            <Link to={`/${data.id}`} style={{ color: "#fff" }}>
              Read...
            </Link>
          </Button>
        </Typography>
      </CardActions>
    </Card>
  );
}
