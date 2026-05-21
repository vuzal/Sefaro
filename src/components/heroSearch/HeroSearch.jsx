import React from "react";
import "./HeroSearch.css";


export default function HeroSearch({onSearch , onOpenQuiz}) {
    const [query, setQuery] = React.useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if(query.trim()) {
            onSearch(query.trim());
        }
    };

    return(
        <section className="hero">
            <div className="hero_overlay"></div>
            <div className="hero_content">
                <h1 className="hero_title">Where to next?</h1>
                <p className="hero_subtitle">Discover destinations, plan your trip, and stay on budget</p>
                <form  className="hero_search-form" onSubmit={handleSubmit}>
                    <input type="text" className="hero_input" placeholder="Search city or country..." value={query} onChange={(e) => setQuery(e.target.value)} />
                    <button type="submit" className="hero_btn">Search</button>
                </form>
                <button className="hero_quiz-trigger" onClick={onOpenQuiz}>
                    ❓ Not sure where to go? Take a 30-sec quiz
                </button>
            </div>
        </section>
    )
}