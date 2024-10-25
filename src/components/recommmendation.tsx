"use client";
import { useState, useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';

export default function Recommendations() {
  const [form, setForm] = useState({
    name: '',
    age: '',
    gender: '',
    careerInterests: '',
    subjectPreference: '',
    workPreference: '',
    enjoymentActivities: '',
    interests: '',
    skills: '',
    personalityTraits: '',
    workExperience: '',
  });
  const [recommendations, setRecommendations] = useState([]);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/gemini', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setRecommendations(data.recommendations);
        setError('');
      } else {
        setError('No recommendations found.');
      }
    } catch (error) {
      setError('Failed to fetch recommendations.');
    }
  };

  return (
    <div>
      <h1>Career Recommendations</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        <input type="number" name="age" placeholder="Age" value={form.age} onChange={handleChange} required />
        <input type="text" name="gender" placeholder="Gender" value={form.gender} onChange={handleChange} required />
        <input type="text" name="careerInterests" placeholder="Career Interests" value={form.careerInterests} onChange={handleChange} required />
        <input type="text" name="subjectPreference" placeholder="Technical or Non-Technical" value={form.subjectPreference} onChange={handleChange} required />
        <input type="text" name="workPreference" placeholder="Sitting or Physical Work" value={form.workPreference} onChange={handleChange} required />
        <input type="text" name="enjoymentActivities" placeholder="Enjoyable Activities" value={form.enjoymentActivities} onChange={handleChange} required />
        <input type="text" name="interests" placeholder="Interests" value={form.interests} onChange={handleChange} required />
        <input type="text" name="skills" placeholder="Skills & Abilities" value={form.skills} onChange={handleChange} required />
        <input type="text" name="personalityTraits" placeholder="Personality Traits" value={form.personalityTraits} onChange={handleChange} required />
        <textarea name="workExperience" placeholder="Work Experience" value={form.workExperience} onChange={handleChange} />
        
        <button type="submit">Get Recommendations</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {recommendations.length > 0 && (
        <div>
          <h2>Recommended Careers</h2>
          <ul>
            {recommendations.map((rec, index) => (
              <li key={index}>{rec.career}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Chart for visualizing recommendations */}
      <RecommendationChart recommendations={recommendations} />
    </div>
  );
}

function RecommendationChart({ recommendations }) {
  const chartRef = useRef(null);

  useEffect(() => {
    if (recommendations.length > 0) {
      const ctx = chartRef.current.getContext('2d');
      
      const labels = recommendations.map((rec) => rec.career);
      const data = recommendations.map((rec) => rec.matchPercentage); // Assuming Gemini API returns a match percentage

      new Chart(ctx, {
        type: 'bar',
        data: {
          labels,
          datasets: [
            {
              label: 'Match Percentage',
              data,
              backgroundColor: 'rgba(75, 192, 192, 0.6)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
  }, [recommendations]);

  return <canvas ref={chartRef} />;
}
