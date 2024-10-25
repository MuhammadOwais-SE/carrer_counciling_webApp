// models/UserProfile.js
const mongoose = require('mongoose');

const UserProfileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  careerInterests: {
    type: [String], // Array of interests, passions, or hobbies
    required: true,
  },
  subjectPreference: {
    type: String, // Options: 'Technical' or 'Non-Technical'
    required: true,
  },
  workPreference: {
    type: String, // Options: 'Sitting' or 'Physical'
    required: true,
  },
  enjoymentActivities: {
    type: [String], // Array of activities they enjoy
    required: true,
  },
  interests: {
    type: [String], // Array of general interests
    required: true,
  },
  skills: {
    technicalSkills: {
      type: [String], // Array of technical skills
      required: true,
    },
    softSkills: {
      type: [String], // Array of soft skills
      required: true,
    },
    strengths: {
      type: [String], // Array of strengths
      required: true,
    },
    weaknesses: {
      type: [String], // Array of weaknesses
      required: true,
    },
  },
  personalityTraits: {
    type: [String], // Array of traits like 'Introverted', 'Analytical', 'Creative', etc.
    required: true,
  },
  workExperience: [
    {
      jobTitle: String,
      company: String,
      responsibilities: [String], // Array of responsibilities in each role
      achievements: [String], // Array of achievements in each role
      duration: String, // e.g., "Jan 2021 - Dec 2022"
    },
  ],
}, { timestamps: true });

module.exports = mongoose.model('UserProfile', UserProfileSchema);
