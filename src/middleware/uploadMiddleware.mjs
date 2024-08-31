import multer from 'multer';
import express from "express";
import path from 'path';

const profilePicture = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/profilePictures/'); // Directory to save the uploaded files
  },
  filename: (req, file, cb) => {
    const username = req.body.username; // Get userId from the request object
    const uniqueSuffix = `${username}_profilePicture`;
    cb(null, `${uniqueSuffix}${path.extname(file.originalname)}`);
  }
});

// Initialize multer with the storage configuration
const profilePictureUpload = multer({ 
  storage: profilePicture,
  limits: { fileSize: 1 * 1024 * 1024 }, // Limit file size to 1 MB
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith('image')) {
      req.fileValidationError = 'Only image files are allowed!';
      return cb(null, false);
    }
    cb(null, true);
  }
});
export default profilePictureUpload;