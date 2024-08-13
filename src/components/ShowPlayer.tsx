import { Player } from "../models/Sentence";
import "../css/Players.css"

export const ShowPlayer = (props: { player: Player }) => {
  return (
    < div className="player-card">
      <h3>
        {props.player.first_name} {props.player.last_name}
      </h3>
      <p>Height: {props.player.h_in} inches</p>
    </div>
  );
}