const express = require('express');
const router = express.Router();
const { exec } = require('child_process');
const path = require('path');

// Endpoint to execute the JavaScript file
router.post('/execute-script', (req, res) => {
    // Extract parameters from the request body
    const { studyFolderPath, dicomServerUrl, outputJsonFilePath } = req.body;

    console.log("dirname", __dirname);
    const scriptPath = path.join(__dirname, 'dicomjson-generator.js');
    console.log("scriptpath: ", scriptPath);

    // Command to execute the JavaScript file with parameters
    // const command = `node dicomjson-generator.js ${studyFolderPath} ${dicomServerUrl} ${outputJsonFilePath}`;
    const command = `node ${scriptPath} ${studyFolderPath} ${dicomServerUrl} ${outputJsonFilePath}`;
    console.log(command);

    // Execute the command
    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing script: ${error.message}`);
            return res.status(500).json({ error: 'Internal server error' });
        }
        if (stderr) {
            console.error(`Script stderr: ${stderr}`);
            return res.status(500).json({ error: 'Internal server error' });
        }
        console.log(`Script output: ${stdout}`);
        
        // Send a success response
        res.status(200).json({ message: 'Script executed successfully' });
    });
});

module.exports = router;
