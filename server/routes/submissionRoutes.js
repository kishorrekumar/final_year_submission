import express from 'express';
import { upload, submitProject, getSubmissions, getSubmissionById } from '../controllers/submissionController.js';

const router = express.Router();

// Define expected file fields
const fileFields = [
  { name: 'review1Ppt', maxCount: 1 },
  { name: 'review2Ppt', maxCount: 1 },
  { name: 'review3Ppt', maxCount: 1 },
  { name: 'review4Ppt', maxCount: 1 },
  { name: 'thesisDoc', maxCount: 1 },
  { name: 'signedThesisPdf', maxCount: 1 },
  { name: 'outcomeProofPdf', maxCount: 1 },
  { name: 'outcomeCertificatePdf', maxCount: 1 },
  { name: 'codingDoc', maxCount: 1 },
  { name: 'projectVideo', maxCount: 1 },
  { name: 'experimentalScreenshots', maxCount: 1 },
];

router.post('/', upload.fields(fileFields), submitProject);
router.get('/', getSubmissions);
router.get('/:id', getSubmissionById);

export default router;
