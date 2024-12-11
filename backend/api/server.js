const fs = require('fs');
const path = require('path');
const csv = require('csv-parser'); // Import the csv-parser library

// Helper function to parse CSV
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

// Export handler for Vercel serverless function
module.exports = async (req, res) => {
  if (req.method === 'GET') {
    try {
      const filePath = path.join(__dirname, '..', 'equipment.csv'); // Adjust path for Vercel
      const equipmentData = await parseCSV(filePath); // Parse the CSV data
      res.status(200).json(equipmentData); // Send the parsed data as JSON
    } catch (error) {
      console.error('Error reading the CSV file:', error);
      res.status(500).json({ error: 'Failed to load equipment data.' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};
