const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser'); // Import the csv-parser library

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS
app.use(cors());

// Read the CSV file and parse it
const parseCSV = (filePath) => {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => results.push(data)) // Push each row of data into the results array
      .on('end', () => resolve(results)) // Resolve the promise when parsing is done
      .on('error', (err) => reject(err)); // Reject the promise if an error occurs
  });
};

// API endpoint to fetch equipment data
app.get('/equipment', async (req, res) => {
  try {
    const filePath = path.join(__dirname, 'equipment.csv'); // Specify path to CSV file
    const equipmentData = await parseCSV(filePath); // Parse the CSV data
    res.json(equipmentData); // Send the parsed data as JSON
  } catch (error) {
    console.error('Error reading the CSV file:', error);
    res.status(500).json({ error: 'Failed to load equipment data.' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
