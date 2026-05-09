import React from "react";
import "./Header.css";

export default function Header() {
    return(
        <header className="header">
            <div className="header_container">
                <div className="header_logo">
                    <span className="header_logo-icon">✈️</span>
                    <span className="header_logo-text">Sefaro</span>
                </div>

                <nav className="header_nav">
                    <a href="#" className="header_link active">Home</a>
                    <a href="#" className="header_link">Destinations</a>
                    <a href="#" className="header_link">Planner</a>
                    <a href="#" className="header_link">Budget</a>
                    <a href="#" className="header_link">My Trips</a>
                </nav>
                <button className="header_cta">Login</button>
            </div>
        </header>
    )
}