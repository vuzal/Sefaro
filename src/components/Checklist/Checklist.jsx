import { useState, useEffect } from 'react';
import { getVisaInfo } from '../../services/mockVisaData';
import './Checklist.css';

function Checklist({ country }) {
    const [checks, setChecks] = useState({
        passport: false,
        visa: false,
        insurance: false,
        ticket: false
    });

    const [visaInfo, setVisaInfo] = useState(null); 
    const [loading, setLoading] = useState(true);   

    useEffect(() => {
        setLoading(true);
        getVisaInfo(country)
            .then(function (data) {
                setVisaInfo(data);
                setLoading(false);
            })
            .catch(function () {
                setVisaInfo({ required: true, type: "Unknown", processing: "-", note: "Error loading data" });
                setLoading(false);
            });
    }, [country]); 

    function handleCheckChange(key) {
        setChecks(function (prev) {
            var newChecks = { ...prev };
            newChecks[key] = !prev[key]; 
            return newChecks;
        });
    }

    const completed = Object.values(checks).filter(function (val) { return val === true; }).length;
    const total = Object.keys(checks).length;
    const progress = (completed / total) * 100;

    return (
        <div className="checklist">
            <h3 className="checklist-title">✈️ Travel Checklist</h3>

            <div className="progress-bar">
                <div className="progress-fill" style={{ width: progress + '%' }}></div>
            </div>
            <p className="progress-text">{completed} of {total} items ready</p>

            <div className="checklist-items">
                <label className="check-item">
                    <input type="checkbox" checked={checks.passport} onChange={() => handleCheckChange('passport')} />
                    <span>Valid Passport</span>
                </label>
                <label className="check-item">
                    <input type="checkbox" checked={checks.visa} onChange={() => handleCheckChange('visa')} />
                    <span>Visa Approved</span>
                </label>
                <label className="check-item">
                    <input type="checkbox" checked={checks.insurance} onChange={() => handleCheckChange('insurance')} />
                    <span>Travel Insurance</span>
                </label>
                <label className="check-item">
                    <input type="checkbox" checked={checks.ticket} onChange={() => handleCheckChange('ticket')} />
                    <span>Flight Ticket</span>
                </label>
            </div>

            <div className="visa-info">
                <h4>🛂 Visa Requirement for {country}</h4>
                {loading ? (
                    <p>Loading visa info...</p>
                ) : (
                    <>
                        <p className={visaInfo.required ? 'visa-required' : 'visa-ok'}>
                            {visaInfo.required ? '⚠️ Visa Required' : '✅ No Visa Needed'}
                        </p>
                        <p><strong>Type:</strong> {visaInfo.type}</p>
                        <p><strong>Processing Time:</strong> {visaInfo.processing}</p>
                        <p className="visa-note"><em>{visaInfo.note}</em></p>
                    </>
                )}
            </div>
        </div>
    );
}

export default Checklist;