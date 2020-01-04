import React from "react";
import Card from "@material-ui/core/Grid";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const Game = props => {
  return (
    <div>
      {props.game ? (
        <Card>
          <CardMedia
            style={{ height: 0, paddingTop: "56.25%" }}
            image={props.game.fields.gameImage.fields.file.url}
            title={props.game.fields.title}
          />
          <CardContent>
            <Typography guttorBottom variant="headline" component="h2">
              {props.game.fields.title}
            </Typography>
            <Typography component="p">
              {props.game.fields.description}
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              size="small"
              color="primary"
              href={props.game.fields.url}
              target="_blank"
            >
              Go to Game
            </Button>
          </CardActions>
        </Card>
      ) : null}
    </div>
  );
};

export default Game;
