import path from 'path';
import fs from 'fs';
import XLSX from 'xlsx';


export const getXLXStoJSON = (fileLocation: string, backToRootFolderPath: string) => {
     // Ensure the correct path by resolving it to the root folder where uploads are stored
     const uploadsDirectory = path.resolve(__dirname, backToRootFolderPath); // Move up from src to root
     const filePath = path.join(uploadsDirectory, path.basename(fileLocation)); // Ensure correct file name
     console.log('🚀 ~ File Path:', filePath);

     // Check if the file exists at the specified location
     if (!fs.existsSync(filePath)) {
          throw new Error(`File not found: ${filePath}`);
     }

     // Read the workbook
     const workbook = XLSX.readFile(filePath);

     // Get the first sheet name
     const sheetName = workbook.SheetNames[0];

     // Get the worksheet
     const worksheet = workbook.Sheets[sheetName];

     // Convert the worksheet to JSON
     const jsonData = XLSX.utils.sheet_to_json(worksheet);
     return jsonData;
};
