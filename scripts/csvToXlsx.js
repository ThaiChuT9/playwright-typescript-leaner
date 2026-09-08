const XLSX = require("xlsx");
const path = require("path");

const csvPath = path.resolve(__dirname, "../test_data/LoginData.csv");
const xlsxPath = path.resolve(__dirname, "../test_data/loginData.xlsx");

// Read the CSV file
const workbook = XLSX.readFile(csvPath);

// Write it out as a proper .xlsx file
XLSX.writeFile(workbook, xlsxPath);

console.log(`Successfully created: ${xlsxPath}`);
