import multer from 'multer';
import path from 'path';
import fs from 'fs';
import Submission from '../models/Submission.js';

const sectionMap = {
  review1Ppt: 'Review PPT Uploads',
  review2Ppt: 'Review PPT Uploads',
  review3Ppt: 'Review PPT Uploads',
  review4Ppt: 'Review PPT Uploads',
  thesisDoc: 'Thesis Submission',
  signedThesisPdf: 'Thesis Submission',
  outcomeProofPdf: 'Project Outcome',
  outcomeCertificatePdf: 'Project Outcome',
  codingDoc: 'Coding & Implementation',
  experimentalScreenshots: 'Experimental Results',
};

// Configure multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const regNo = req.body.registerNumber || 'Unknown_Register_Number';
    const section = sectionMap[file.fieldname] || 'Other';
    const uploadPath = path.join('server/uploads', regNo, section);
    
    fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

export const upload = multer({ storage: storage });

export const submitProject = async (req, res) => {
  try {
    const { studentName, registerNumber, yearSection, projectTitle, guideName, outcomeType, conferenceType } = req.body;

    // Check if declaration is checked
    if (req.body.declaration !== 'true') {
      return res.status(400).json({ message: 'Declaration must be accepted.' });
    }

    // Get file paths if they exist
    const getPath = (fieldname) => req.files[fieldname] ? req.files[fieldname][0].path : null;

    const submissionData = {
      studentName,
      registerNumber,
      yearSection,
      projectTitle,
      guideName,
      declaration: true,
      review1Ppt: getPath('review1Ppt'),
      review2Ppt: getPath('review2Ppt'),
      review3Ppt: getPath('review3Ppt'),
      review4Ppt: getPath('review4Ppt'),
      thesisDoc: getPath('thesisDoc'),
      signedThesisPdf: getPath('signedThesisPdf'),
      outcomeType,
      conferenceType: conferenceType === 'undefined' ? null : conferenceType,
      outcomeProofPdf: getPath('outcomeProofPdf'),
      outcomeCertificatePdf: getPath('outcomeCertificatePdf'),
      codingDoc: getPath('codingDoc'),
      experimentalScreenshots: getPath('experimentalScreenshots'),
    };

    const newSubmission = await Submission.create(submissionData);

    res.status(201).json({ message: 'Submission successful', submission: newSubmission });
  } catch (error) {
    console.error('Submission error:', error);
    res.status(500).json({ message: 'Error processing submission', error: error.message });
  }
};

export const getSubmissions = async (req, res) => {
  try {
    const submissions = await Submission.findAll({
      order: [['createdAt', 'DESC']]
    });
    res.json(submissions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching submissions' });
  }
};

export const getSubmissionById = async (req, res) => {
  try {
    const submission = await Submission.findByPk(req.params.id);
    if (!submission) {
      return res.status(404).json({ message: 'Submission not found' });
    }
    res.json(submission);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching submission details' });
  }
};
