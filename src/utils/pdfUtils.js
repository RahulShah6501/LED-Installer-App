import { jsPDF } from "jspdf";

export const exportToPDF = (projectData, diagramImage) => {
  const doc = new jsPDF();

  // Add project details to the PDF
  doc.text(`Project Title: ${projectData.projectTitle}`, 10, 10);
  doc.text(`Designer Name: ${projectData.designerName}`, 10, 20);
  doc.text(`Department: ${projectData.department}`, 10, 30);
  doc.text(`Screen MFR: ${projectData.screenMFR}`, 10, 40);
  doc.text(`Date: ${projectData.date}`, 10, 50);

  // If diagram image is available, add it to the PDF
  if (diagramImage) {
    doc.addImage(diagramImage, 'JPEG', 10, 60, 180, 160); // Adjust position and size as needed
  }

  // Save the PDF
  doc.save('project_details.pdf');
};
