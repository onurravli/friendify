import "./Card.css";
import { BsMusicNoteList } from "react-icons/bs";
import { BiAlbum } from "react-icons/bi";
import { RiGroupFill } from "react-icons/ri";
import { AiFillInfoCircle } from "react-icons/ai";
import { AiFillClockCircle } from "react-icons/ai";

function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Month starts from 0
    const year = String(date.getFullYear());
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    const formattedString = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
    return formattedString;
}

function Card({ props }) {
    return (
        <div className="card">
            <div className="image">
                <img src={props.user.imageUrl} alt={props.user.name} />
            </div>
            <div className="content">
                <div className="username">
                    <p>{props.user.name}</p>
                </div>
                <div className="trackInfo">
                    <div className="trackName">
                        <p>
                            <BsMusicNoteList className="icon" />
                            {props.track.name}
                        </p>
                    </div>
                    <div className="albumName">
                        <p>
                            <BiAlbum className="icon" />
                            {props.track.album.name}
                        </p>
                    </div>
                    <div className="artistName">
                        <p>
                            <RiGroupFill className="icon" />
                            {props.track.artist.name}
                        </p>
                    </div>
                    <div className="context">
                        <p>
                            <AiFillInfoCircle className="icon" />
                            {props.track.context.name}
                        </p>
                    </div>
                </div>
                <div className="timestamp">
                    <p>
                        <AiFillClockCircle className="icon" />
                        {formatTimestamp(props.timestamp)}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Card;
