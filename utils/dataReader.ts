import path from "path";
import { readCSV } from "./csvReader";
import { readXlsxFile } from "./xlsxReader";
import fs from "fs";

export function readData(filePath: string, sheetName?: string) {
    const fileExt = path.extname(filePath).toLowerCase();

    switch (fileExt) {
        case ".csv":
            console.log("reading csv");
            return readCSV(filePath);

        case ".xlsx":
            console.log("reading xlsx");
            return readXlsxFile(filePath, sheetName || "Sheet1");

        case ".json":
            console.log("reading json");
            return JSON.parse(fs.readFileSync(filePath, "utf-8"));

        default:
            throw new Error(`Unsupported file type - ${fileExt}`);
    }
}
