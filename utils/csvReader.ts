import fs from "fs";
import path from "path";
import { parse } from "csv-parse/sync";

export function readCSV(filePath: string): any[] {
    const fileContent = fs.readFileSync(path.resolve(filePath), "utf-8");
    const records = parse(fileContent, {
        columns: true,
        skip_empty_lines: true,
    });
    return records;
}