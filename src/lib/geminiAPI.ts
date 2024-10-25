// pages/api/gemini.js
export default async function handler(req: Request, res: Response) {
    const {
      name,
      age,
      gender,
      careerInterests,
      subjectPreference,
      workPreference,
      enjoymentActivities,
      interests,
      skills,
      personalityTraits,
      workExperience,
    } = req.body;
  
    try {
      const response = await fetch('https://gemini-api.example.com/career-matching', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.GEMINI_API_KEY}`, 
        },
        body: JSON.stringify({
          name,
          age,
          gender,
          careerInterests,
          subjectPreference,
          workPreference,
          enjoymentActivities,
          interests,
          skills,
          personalityTraits,
          workExperience,
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        res.status(200).json({ success: true, recommendations: data });
      } else {
        res.status(400).json({ success: false, error: data });
      }
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }
  