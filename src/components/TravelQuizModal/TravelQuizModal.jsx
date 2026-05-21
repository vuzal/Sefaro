import React from "react";
import "./TravelQuizModal.css";
import { getQuizRecommendation } from "../../services/mockApi";

export default function TravelQuizModal({ isOpen, onClose }) {
    const [step, setStep] = React.useState(0);
    const [recommendation, setRecommendation] = React.useState(null);
    const [loading, setLoading] = React.useState(false);

    if (!isOpen) return null;

    const questions = [
        { q: "What's your preferred travel vibe?", opts: ["Beach & Relax", "City & Culture", "Nature & Adventure"] },
        { q: "What's your budget level?", opts: ["Budget-friendly", "Mid-range", "Luxury"] },
        { q: "How long is your trip?", opts: ["Weekend (1-3 days)", "Short (4-7 days)", "Long (8+ days)"] }
    ];

    function handleNext() {
        if (step < questions.length - 1) {
            setStep(step + 1);
        } else {
            setLoading(true);
            getQuizRecommendation()
                .then((res) => {
                    setRecommendation(res);
                    setLoading(false);
                })
                .catch(() => {
                    setRecommendation("Sorry, something went wrong. Please try again.");
                    setLoading(false);
                });
        }

    }

    function handleReset() {
        setStep(0);
        setRecommendation(null);
        setLoading(false);
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div modal-card onClick={(e) => e.stopPropagation}>
                <button className="modal-close" onClick={onClose}>×</button>

                {loading ? (
                    <div className="modal-loading">Finding your perfect destination...</div>
                ) : recommendation ? (
                    <div className="modal-result">
                        <h2 className="result-title">🌍 We Recommend</h2>
                        <p className="result-text">{recommendation}</p>
                        <button className="result-btn" onClick={handleReset}>
                            Try Again
                        </button>
                    </div>
                ) :
                    (
                        <>
                            <h2 className="modal-title">Where should I go?</h2>
                            <p className="modal-step">Question {step + 1} of {questions.length}</p>
                            <p className="modal-question">{questions[step].q}</p>
                            <div className="modal-options">
                                {
                                    questions[step].opts.map((opt, i) => (
                                        <button key={i} className="modal-option-btn" onClick={handleNext}>
                                            {opt}
                                        </button>
                                    ))
                                }
                            </div>
                        </>
                    )}
            </div>
        </div>
    )
}