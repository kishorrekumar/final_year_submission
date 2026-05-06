import { DataTypes } from 'sequelize';
import sequelize from '../db.js';

const Submission = sequelize.define('Submission', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  studentName: { type: DataTypes.STRING, allowNull: false },
  registerNumber: { type: DataTypes.STRING, allowNull: false },
  yearSection: { type: DataTypes.STRING, allowNull: false },
  projectTitle: { type: DataTypes.STRING, allowNull: false },
  guideName: { type: DataTypes.STRING, allowNull: false },
  
  // File Paths
  review1Ppt: { type: DataTypes.STRING },
  review2Ppt: { type: DataTypes.STRING },
  review3Ppt: { type: DataTypes.STRING },
  review4Ppt: { type: DataTypes.STRING },
  thesisDoc: { type: DataTypes.STRING },
  signedThesisPdf: { type: DataTypes.STRING },
  
  // Section 5: Project Outcome
  outcomeType: { type: DataTypes.STRING }, // 'Journal' or 'Conference'
  conferenceType: { type: DataTypes.STRING }, // 'National' or 'International'
  outcomeProofPdf: { type: DataTypes.STRING },
  outcomeCertificatePdf: { type: DataTypes.STRING },
  
  codingDoc: { type: DataTypes.STRING },
  experimentalScreenshots: { type: DataTypes.STRING },
  
  declaration: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
}, {
  timestamps: true,
});

export default Submission;
