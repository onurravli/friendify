import "./App.css";
import { useState } from "react";
import axios from "axios";
import Card from "./Card";

async function getAccessToken(cookie) {
    try {
        const res = await axios.get(`https://friendify-api.vercel.app/get_access_token/${cookie}`);
        console.log("Access token has been retrieved successfully.")
        return res.data;
    } catch {
        console.log("An error occurred while getting access token.");
        exit();
    }
}

async function getFriendActivity(accessToken) {
    try {
        const res = await axios.get(
            `https://friendify-api.vercel.app/get_friend_activity/${accessToken}`
        );
        console.log("Friend activity has been retrieved successfully.")
        return res.data.friends.reverse();
    } catch {
        console.log("An error occurred while getting friend activity.");
        exit();
    }
}

function App() {
    const [accessToken, setAccessToken] = useState("");
    const [cookie, setCookie] = useState("");
    const [friendActivity, setFriendActivity] = useState([]);
    return (
        <div className="container">
            <form className="form">
                <div className="formGroup">
                    <label htmlFor="cookie">Cookie</label>
                    <input
                        type="text"
                        id="cookie"
                        className="cookie"
                        onChange={(e) => {
                            setCookie(e.target.value);
                        }}
                    />
                </div>
                <div className="formGroup">
                    <button
                        type="button"
                        className="btn"
                        onClick={async () => {
                            const accessToken = (await getAccessToken(cookie))["accessToken"];
                            setAccessToken(accessToken);
                            const friendActivity = await getFriendActivity(accessToken);
                            setFriendActivity(friendActivity);
                        }}
                    >
                        Get Friend Activity
                    </button>
                </div>
                <div className="cards">
                    {friendActivity.map((i) => {
                        return <Card key={i.timestamp} props={i} />;
                    })}
                </div>
            </form>
        </div>
    );
}

export default App;
