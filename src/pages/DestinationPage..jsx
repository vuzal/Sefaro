import { useParams, useNavigate } from "react-router-dom";
import "./DestinationPage.css";

export default function DestinationPage() {
    const { city } = useParams();
    const navigate = useNavigate();

    return (
        <div className="dest-page">
            <button className="back-btn" onClick={() => navigate('/')}>
                Back to Home
            </button>

            <div className="dest-header">
                <h1 className="city-title">{city}</h1>
                <p className="country-sub">Country & weather info will appear here soon</p>
            </div>

            <div className="dest-body">
                <p>This page will show live weather, budget calculator, checklist, and city photos.</p>
                <p>API integration starts in the next step!</p>
            </div>
        </div>
    )
}