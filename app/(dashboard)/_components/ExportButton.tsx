// ExportButton.tsx
"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import * as XLSX from "xlsx";

const ExportButton = ({ rows, columns }: any) => {
  function handleExport() {
    // Create a new workbook
    const wb = XLSX.utils.book_new();

    // Flatten the data and include the submitted field
    const flatData = rows.map((row: { [x: string]: any; submitted: any }) => [
      ...columns.map((col: { id: string | number }) => row[col.id]),
      row.submitted,
    ]);

    // Add a specific header for the submitted date column
    const headers = [
      ...columns.map((col: { label: any }) => col.label),
      "Submitted at",
    ];

    // Convert rows and columns to a worksheet
    const ws = XLSX.utils.json_to_sheet([headers, ...flatData]);

    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(wb, ws, "Submissions");

    // Save the workbook as an Excel file
    XLSX.writeFile(wb, "form-submissions.xlsx");
  }

  return (
    <Button variant={"default"} onClick={handleExport}>
      Export to Excel
    </Button>
  );
};

export default ExportButton;
