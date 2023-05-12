import "./App.css";
import { useState } from "react";
import axios from "axios";
import Card from "./Card";

async function getAccessToken(cookie) {
    const res = await axios.get(`https://friendify-api.vercel.app/get_access_token/${cookie}`);
    return res.data;
}

async function getFriendActivity(accessToken) {
    const res = await axios.get(
        `https://friendify-api.vercel.app/get_friend_activity/${accessToken}`
    );
    return res.data.friends.reverse();
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
                        }}
                    >
                        Get Access Token
                    </button>
                </div>
                <div className="formGroup">
                    <label htmlFor="accessToken">Access Token</label>
                    <input
                        type="text"
                        id="accessToken"
                        className="accessToken"
                        value={accessToken}
                        readOnly
                    />
                </div>
                <div className="formGroup">
                    <button
                        type="button"
                        className="btn"
                        onClick={() => {
                            getFriendActivity(accessToken).then((res) => {
                                setFriendActivity(res);
                                console.log(res);
                            });
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
