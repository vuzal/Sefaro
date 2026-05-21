import { useState } from 'react';
import './TripPlanner.css';

function TripPlanner(){
    const [activities, setActivities]=useState([]);
    const [selectedDay, setSelectedDay]=useState(1);
    const [newActivity, setNewActivity]=useState('');

    const handleAdd=()=>{
        if(newActivity.trim()==='')return;

        const updateActivites=[...activities,{
            day: selectedDay,
            text: newActivity,
            id: Date.now()
        }];
        setActivities(updateActivites);
        setNewActivity('')
    };

    const handleRemove=(id)=>{
        const filtered=activities.filter(act=>act.id!==id);
        setActivities(filtered);
    };

    const days=[... new Set(activities.map(a=>a.day))].sort((a,b)=>a-b);

    return(
        <div className="planner">
      <h3 className="planner-title">🗓️ Trip Planner</h3>
      
      {/* Input sahələri */}
      <div className="planner-inputs">
        <div className="input-group">
          <label>Day</label>
          <input 
            type="number" 
            min="1" 
            value={selectedDay} 
            onChange={(e) => setSelectedDay(parseInt(e.target.value) || 1)} 
          />
        </div>
        <div className="input-group" style={{ flex: 2 }}>
          <label>Activity</label>
          <input 
            type="text" 
            value={newActivity} 
            onChange={(e) => setNewActivity(e.target.value)} 
            placeholder="e.g., Visit Old City, Lunch at..." 
          />
        </div>
        <button className="add-btn" onClick={handleAdd}>Add</button>
      </div>

      {/* Plan siyahısı */}
      <div className="planner-list">
        {days.length === 0 ? (
          <p className="empty-msg">No activities added yet. Start planning your day!</p>
        ) : (
          days.map((day) => (
            <div key={day} className="day-block">
              <h4>Day {day}</h4>
              <ul className="activity-list">
                {activities
                  .filter((act) => act.day === day)
                  .map((act) => (
                    <li key={act.id} className="activity-item">
                      <span>{act.text}</span>
                      <button className="remove-btn" onClick={() => handleRemove(act.id)}>×</button>
                    </li>
                  ))}
              </ul>
            </div>
          ))
        )}
      </div>
    </div>
  );

}

export default TripPlanner;