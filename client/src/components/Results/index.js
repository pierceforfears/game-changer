import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import "./style.css";

const useStyles = makeStyles({
  card: {
    maxWidth: 345
  },
  media: {
    height: 140
  }
});

export default function Results() {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image="/static/images/cards/contemplative-reptile.jpg"
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Lizard
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

// function Results(props) {
//   return (
//     <div className="card">
//       <div className="img-container">
//         <img alt={props.title} src={props.image} />
//       </div>
//       <div className="content">
//         <ul>
//           <li>
//             <strong>Title:</strong> {props.title}
//           </li>
//           <li>
//             <strong>Description:</strong> {props.description}
//           </li>
//           <li>
//             <strong>Price:</strong> {props.price}
//           </li>
//         </ul>
//       </div>
//     </div>
//   );
// }

// export default Results;
