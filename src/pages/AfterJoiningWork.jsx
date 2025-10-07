// import React, { useState, useEffect } from 'react';
// import { Filter, Search, Clock, CheckCircle, X } from 'lucide-react';
// import useDataStore from '../store/dataStore';
// import toast from 'react-hot-toast';  

// const AfterJoiningWork = () => {
//   const [activeTab, setActiveTab] = useState("pending");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [showModal, setShowModal] = useState(false);
//   const [selectedItem, setSelectedItem] = useState(null);
//   const [pendingData, setPendingData] = useState([]);
//   const [historyData, setHistoryData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [tableLoading, setTableLoading] = useState(false);
//   const [submitting, setSubmitting] = useState(false);
//   const [error, setError] = useState(null);

// const [formData, setFormData] = useState({
//   checkSalarySlipResume: false,
//   offerLetterReceived: false,
//   welcomeMeeting: false,
//   biometricAccess: false,
//   punchCode: "", // Add punch code field
//   officialEmailId: false,
//   emailId: "",
//   emailPassword: "",
//   assignAssets: false,
//   // Remove image upload fields and replace with input fields
//   laptop: "",
//   mobile: "",
//   vehicle: "",
//   other: "",
//   // Keep these for manual image upload
//   manualImage: null,
//   manualImageUrl: "",
//   pfEsic: false,
//   companyDirectory: false,
//   assets: [],
// });

//   // Google Drive folder ID for storing images
//   const DRIVE_FOLDER_ID = "13yz6WomFmu7PMWQnAg_7JKKNKD9lbm6p";

//   const fetchJoiningData = async () => {
//     setLoading(true);
//     setTableLoading(true);
//     setError(null);

//     try {
//       const response = await fetch(
//         "https://script.google.com/macros/s/AKfycbyPX2PreyvGFcx8V5Jv7R2TwZgMOiEzCKSKntbTzy1ElMSvmgiWCJ1O_CHG6DStW48hlQ/exec?sheet=JOINING&action=fetch"
//       );

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const result = await response.json();
//       console.log("Raw JOINING API response:", result);

//       if (!result.success) {
//         throw new Error(
//           result.error || "Failed to fetch data from JOINING sheet"
//         );
//       }

//       const rawData = result.data || result;

//       if (!Array.isArray(rawData)) {
//         throw new Error("Expected array data not received");
//       }

//       const headers = rawData[5];
//       const dataRows = rawData.length > 6 ? rawData.slice(6) : [];

//       const getIndex = (headerName) => {
//         const index = headers.findIndex(
//           (h) =>
//             h && h.toString().trim().toLowerCase() === headerName.toLowerCase()
//         );
//         return index;
//       };

//       const processedData = dataRows.map((row) => ({
//         timestamp: row[getIndex("Timestamp")] || "",
//         serialNumber: row[getIndex("serialNumber")] || "",
//         indentNo: row[getIndex("Indent No")] || "",
//         enquiryNo: row[getIndex("Enquiry No")] || "",
//         candidateName: row[getIndex("Name As Per Aadhar")] || "",
//         fatherName: row[getIndex("Father Name")] || "",
//         dateOfJoining: row[getIndex("Date Of Joining")] || "",
//         joiningPlace: row[getIndex("Joining Place")] || "",
//         designation: row[getIndex("Designation")] || "",
//         salary: row[getIndex("Department")] || "",
//         aadharPhoto: row[getIndex("Aadhar Frontside Photo")] || "",
//         panCard: row[getIndex("Pan card")] || "",
//         candidatePhoto: row[getIndex("Candidate's Photo")] || "",
//         currentAddress: row[getIndex("Current Address")] || "",
//         addressAsPerAadhar: row[getIndex("Address As Per Aadhar Card")] || "",
//         bodAsPerAadhar: row[getIndex("Date Of Birth As Per Aadhar Card")] || "",
//         gender: row[getIndex("Gender")] || "",
//         mobileNo: row[getIndex("Mobile No.")] || "",
//         familyMobileNo: row[getIndex("Family Mobile No.")] || "",
//         relationWithFamily:
//           row[getIndex("Relationship With Family Person")] || "",
//         pfId: row[getIndex("Past Pf Id No. (If Any)")] || "",
//         accountNo: row[getIndex("Current Bank A.C No.")] || "",
//         ifscCode: row[getIndex("Ifsc Code")] || "",
//         branchName: row[getIndex("Branch Name")] || "",
//         passbookPhoto: row[getIndex("Photo Of Front Bank Passbook")] || "",
//         email: row[getIndex("Personal Email-Id")] || "",
//         esicNo: row[getIndex("ESIC No (IF Any)")] || "",
//         qualification: row[getIndex("Highest Qualification")] || "",
//         pfEligible: row[getIndex("PF Eligible")] || "",
//         esicEligible: row[getIndex("ESIC Eligible")] || "",
//         companyName: row[getIndex("Joining Company Name")] || "",
//         emailToBeIssue: row[getIndex("Email ID To Be Issue")] || "",
//         issueMobile: row[getIndex("Issue Mobile")] || "",
//         issueLaptop: row[getIndex("Issue Laptop")] || "",
//         aadharNo: row[getIndex("Aadhar Card No")] || "",
//         modeOfAttendance: row[getIndex("Mode Of Attendance")] || "",
//         quaficationPhoto: row[getIndex("Quafication Photo")] || "",
//         paymentMode: row[getIndex("Payment Mode")] || "",
//         salarySlip: row[getIndex("Salary Slip")] || "",
//         resumeCopy: row[getIndex("Resume Copy")] || "",
//         plannedDate: row[getIndex("Planned Date")] || "",
//         actual: row[getIndex("Actual")] || "",
//       }));

//       const pendingTasks = processedData.filter(
//         (task) => task.plannedDate && !task.actual
//       );
//       console.log("Processed joining data:", processedData);
//       setPendingData(pendingTasks);

//       const historyTasks = processedData.filter(
//         (task) => task.plannedDate && task.actual
//       );
//       setHistoryData(historyTasks);
//     } catch (error) {
//       console.error("Error fetching joining data:", error);
//       setError(error.message);
//       toast.error(`Failed to load joining data: ${error.message}`);
//     } finally {
//       setLoading(false);
//       setTableLoading(false);
//     }
//   };

//   // Fetch previous assets data from Assets sheet
// const fetchAssetsData = async (employeeId) => {
//   try {
//     const response = await fetch(
//       "https://script.google.com/macros/s/AKfycbyPX2PreyvGFcx8V5Jv7R2TwZgMOiEzCKSKntbTzy1ElMSvmgiWCJ1O_CHG6DStW48hlQ/exec?sheet=Assets&action=fetch"
//     );

//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     const result = await response.json();
    
//     if (!result.success) {
//       return null;
//     }

//     const data = result.data || result;
//     if (!Array.isArray(data) || data.length < 2) {
//       return null;
//     }

//     // Find the row with matching employee ID (column B, index 1)
//     const matchingRow = data.find((row, index) => {
//       if (index === 0) return false; // Skip header row
//       return row[1]?.toString().trim() === employeeId?.toString().trim();
//     });

//     if (matchingRow) {
//       return {
//         punchCode: matchingRow[10] || "", // Column K (index 10)
//         emailId: matchingRow[3] || "",
//         emailPassword: matchingRow[4] || "",
//         laptop: matchingRow[5] || "",
//         mobile: matchingRow[6] || "",
//         vehicle: matchingRow[7] || "",
//         other: matchingRow[8] || "",
//         manualImageUrl: matchingRow[9] || ""
//       };
//     }

//     return null;
//   } catch (error) {
//     console.error("Error fetching assets data:", error);
//     return null;
//   }
// };


//   // Upload image to Google Drive
//   const uploadImageToDrive = async (file, fileName) => {
//     try {
//       const reader = new FileReader();
//       return new Promise((resolve, reject) => {
//         reader.onload = async () => {
//           try {
//             const base64Data = reader.result;
//             const response = await fetch(
//               "https://script.google.com/macros/s/AKfycbyPX2PreyvGFcx8V5Jv7R2TwZgMOiEzCKSKntbTzy1ElMSvmgiWCJ1O_CHG6DStW48hlQ/exec",
//               {
//                 method: "POST",
//                 headers: {
//                   "Content-Type": "application/x-www-form-urlencoded",
//                 },
//                 body: new URLSearchParams({
//                   action: "uploadFile",
//                   base64Data: base64Data,
//                   fileName: fileName,
//                   mimeType: file.type,
//                   folderId: DRIVE_FOLDER_ID,
//                 }).toString(),
//               }
//             );

//             const result = await response.json();
//             if (result.success) {
//               resolve(result.fileUrl);
//             } else {
//               reject(new Error(result.error || "Upload failed"));
//             }
//           } catch (error) {
//             reject(error);
//           }
//         };
//         reader.onerror = () => reject(new Error("Failed to read file"));
//         reader.readAsDataURL(file);
//       });
//     } catch (error) {
//       throw new Error(`Upload failed: ${error.message}`);
//     }
//   };

//   useEffect(() => {
//     fetchJoiningData();
//   }, []);

// const handleAfterJoiningClick = async (item) => {
//   // Reset form data first
//   setFormData({
//     checkSalarySlipResume: false,
//     offerLetterReceived: false,
//     welcomeMeeting: false,
//     biometricAccess: false,
//     punchCode: "", // Initialize punch code
//     officialEmailId: false,
//     emailId: "",
//     emailPassword: "",
//     assignAssets: false,
//     laptop: "",
//     mobile: "",
//     vehicle: "",
//     other: "",
//     manualImage: null,
//     manualImageUrl: "",
//     pfEsic: false,
//     companyDirectory: false,
//     assets: [],
//   });
    
//     setSelectedItem(item);
//     setShowModal(true);
//     setLoading(true);

//     try {
//       // Fetch previous assets data first
//       const assetsData = await fetchAssetsData(item.serialNumber);

//       const fullDataResponse = await fetch(
//         "https://script.google.com/macros/s/AKfycbyPX2PreyvGFcx8V5Jv7R2TwZgMOiEzCKSKntbTzy1ElMSvmgiWCJ1O_CHG6DStW48hlQ/exec?sheet=JOINING&action=fetch"
//       );

//       if (!fullDataResponse.ok) {
//         throw new Error(`HTTP error! status: ${fullDataResponse.status}`);
//       }

//       const fullDataResult = await fullDataResponse.json();
//       const allData = fullDataResult.data || fullDataResult;

//       // Look for header row with "SKA-Joining ID" instead of "Employee ID"
//       let headerRowIndex = allData.findIndex((row) =>
//         row.some((cell) =>
//           cell?.toString().trim().toLowerCase().includes("serialNumber")
//         )
//       );
//       if (headerRowIndex === -1) headerRowIndex = 5;

//       const headers = allData[headerRowIndex].map((h) => h?.toString().trim());

//       // Use "SKA-Joining ID" instead of "Employee ID"
//       const employeeIdIndex = headers.findIndex(
//         (h) => h?.toLowerCase() === "serialNumber"
//       );
//       if (employeeIdIndex === -1) {
//         throw new Error("Could not find 'serialNumber' column");
//       }

//       const rowIndex = allData.findIndex(
//         (row, idx) =>
//           idx > headerRowIndex &&
//           row[employeeIdIndex]?.toString().trim() ===
//             item.serialNumber?.toString().trim()
//       );

//       if (rowIndex === -1)
//         throw new Error(`Employee ${item.serialNumber} not found`);

//       // Updated column indices
//       const actualColumnIndex = 27; // Column AB (0-based index: 27)
//       const startColumnIndex = 29; // Column AD (0-based index: 29)

// const currentValues = {
//     checkSalarySlipResume:
//       allData[rowIndex][startColumnIndex] // Column AD
//         ?.toString()
//         .trim()
//         .toLowerCase() === "yes",
//     offerLetterReceived:
//       allData[rowIndex][startColumnIndex + 1] // Column AE
//         ?.toString()
//         .trim()
//         .toLowerCase() === "yes",
//     welcomeMeeting:
//       allData[rowIndex][startColumnIndex + 2] // Column AF
//         ?.toString()
//         .trim()
//         .toLowerCase() === "yes",
//     biometricAccess:
//       allData[rowIndex][startColumnIndex + 3] // Column AG
//         ?.toString()
//         .trim()
//         .toLowerCase() === "yes",
//     officialEmailId:
//       allData[rowIndex][startColumnIndex + 4] // Column AH
//         ?.toString()
//         .trim()
//         .toLowerCase() === "yes",
//     assignAssets:
//       allData[rowIndex][startColumnIndex + 5] // Column AI
//         ?.toString()
//         .trim()
//         .toLowerCase() === "yes",
//     pfEsic:
//       allData[rowIndex][startColumnIndex + 6] // Column AJ
//         ?.toString()
//         .trim()
//         .toLowerCase() === "yes",
//     companyDirectory:
//       allData[rowIndex][startColumnIndex + 7] // Column AK
//         ?.toString()
//         .trim()
//         .toLowerCase() === "yes",
//   };

//       // Merge with assets data if available
//   const finalFormData = {
//     ...currentValues,
//     punchCode: assetsData?.punchCode || "", // Add punch code
//     emailId: assetsData?.emailId || "",
//     emailPassword: assetsData?.emailPassword || "",
//     laptop: assetsData?.laptop || "",
//     mobile: assetsData?.mobile || "",
//     vehicle: assetsData?.vehicle || "",
//     other: assetsData?.other || "",
//     manualImageUrl: assetsData?.manualImageUrl || "",
//     manualImage: null,
//     assets: [],
//   };

//   setFormData(prev => ({
//     ...prev,
//     ...finalFormData
//   }));

//     } catch (error) {
//       console.error("Error fetching current values:", error);
//       // Keep the default reset values if there's an error
//       toast.error("Failed to load current values");
//     } finally {
//       setLoading(false);
//     }
//   };

//     const handleCheckboxChange = (name) => {
//     setFormData((prev) => ({
//       ...prev,
//       [name]: !prev[name],
//     }));
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleImageUpload = (e, fieldName) => {
//     const file = e.target.files[0];
//     if (file) {
//       setFormData((prev) => ({
//         ...prev,
//         [fieldName]: file,
//       }));
//     }
//   };

//   // Save assets data to Assets sheet
// const saveAssetsData = async (employeeId, employeeName, assetsData) => {
//   try {
//     const now = new Date();
//     const timestamp = `${now.getDate().toString().padStart(2, '0')}/${(now.getMonth() + 1).toString().padStart(2, '0')}/${now.getFullYear()} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
    
//     const rowData = [
//       timestamp,
//       employeeId,
//       employeeName,
//       assetsData.emailId || "",
//       assetsData.emailPassword || "",
//       assetsData.laptop || "", // Changed from image URL to text input
//       assetsData.mobile || "", // Changed from image URL to text input
//       assetsData.vehicle || "", // Changed from image URL to text input
//       assetsData.other || "", // Changed from image URL to text input
//       assetsData.manualImageUrl || "",
//       assetsData.punchCode || "" // Add punch code to column K
//     ];

//       // First, check if record exists
//       const existingData = await fetchAssetsData(employeeId);
      
//       if (existingData) {
//         // Update existing record - find the row and update it
//         const fetchResponse = await fetch(
//           "https://script.google.com/macros/s/AKfycbyPX2PreyvGFcx8V5Jv7R2TwZgMOiEzCKSKntbTzy1ElMSvmgiWCJ1O_CHG6DStW48hlQ/exec?sheet=Assets&action=fetch"
//         );
//         const result = await fetchResponse.json();
//         const data = result.data || result;
        
//         const rowIndex = data.findIndex((row, index) => {
//           if (index === 0) return false; // Skip header
//           return row[1]?.toString().trim() === employeeId?.toString().trim();
//         });

//         if (rowIndex !== -1) {
//           // Update existing row
//           const response = await fetch(
//             "https://script.google.com/macros/s/AKfycbyPX2PreyvGFcx8V5Jv7R2TwZgMOiEzCKSKntbTzy1ElMSvmgiWCJ1O_CHG6DStW48hlQ/exec",
//             {
//               method: "POST",
//               headers: {
//                 "Content-Type": "application/x-www-form-urlencoded",
//               },
//               body: new URLSearchParams({
//                 sheetName: "Assets",
//                 action: "update",
//                 rowIndex: (rowIndex + 1).toString(),
//                 rowData: JSON.stringify(rowData),
//               }).toString(),
//             }
//           );
//           return await response.json();
//         }
//       }
      
//       // Insert new record
//       const response = await fetch(
//         "https://script.google.com/macros/s/AKfycbyPX2PreyvGFcx8V5Jv7R2TwZgMOiEzCKSKntbTzy1ElMSvmgiWCJ1O_CHG6DStW48hlQ/exec",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/x-www-form-urlencoded",
//           },
//           body: new URLSearchParams({
//             sheetName: "Assets",
//             action: "insert",
//             rowData: JSON.stringify(rowData),
//           }).toString(),
//         }
//       );

//       return await response.json();
//     } catch (error) {
//       throw new Error(`Failed to save assets data: ${error.message}`);
//     }
//   };


// const handleSubmit = async (e) => {
//   e.preventDefault();
//   setLoading(true);
//   setSubmitting(true);

//   if (!selectedItem.serialNumber || !selectedItem.candidateName) {
//     toast.error("Please fill all required fields");
//     setSubmitting(false);
//     return;
//   }

//   try {
//     // Upload manual image if new file selected (only for company directory)
//     let manualImageUrl = formData.manualImageUrl;
//     if (formData.manualImage) {
//       try {
//         manualImageUrl = await uploadImageToDrive(
//           formData.manualImage,
//           `${selectedItem.serialNumber}_manual_${Date.now()}.${formData.manualImage.name.split('.').pop()}`
//         );
//       } catch (error) {
//         toast.error(`Failed to upload manual image: ${error.message}`);
//       }
//     }

//     // Save assets data (now with text inputs instead of images)
//     await saveAssetsData(selectedItem.serialNumber, selectedItem.candidateName, {
//       emailId: formData.emailId,
//       emailPassword: formData.emailPassword,
//       laptop: formData.laptop,
//       mobile: formData.mobile,
//       vehicle: formData.vehicle,
//       other: formData.other,
//       manualImageUrl: manualImageUrl,
//       punchCode: formData.punchCode // Include punch code
//     });

//     // Continue with existing logic for updating JOINING sheet
//     const fullDataResponse = await fetch(
//       "https://script.google.com/macros/s/AKfycbyPX2PreyvGFcx8V5Jv7R2TwZgMOiEzCKSKntbTzy1ElMSvmgiWCJ1O_CHG6DStW48hlQ/exec?sheet=JOINING&action=fetch"
//     );
//     if (!fullDataResponse.ok) {
//       throw new Error(`HTTP error! status: ${fullDataResponse.status}`);
//     }

//     const fullDataResult = await fullDataResponse.json();
//     const allData = fullDataResult.data || fullDataResult;
//     let headerRowIndex = allData.findIndex((row) =>
//       row.some((cell) =>
//         cell?.toString().trim().toLowerCase().includes("serialNumber")
//       )
//     );
//     if (headerRowIndex === -1) headerRowIndex = 5;

//     const headers = allData[headerRowIndex].map((h) => h?.toString().trim());
//     const employeeIdIndex = headers.findIndex(
//       (h) => h?.toLowerCase() === "serialNumber"
//     );
//     if (employeeIdIndex === -1) {
//       throw new Error("Could not find 'serialNumber' column");
//     }

//     const rowIndex = allData.findIndex(
//       (row, idx) =>
//         idx > headerRowIndex &&
//         row[employeeIdIndex]?.toString().trim() ===
//           selectedItem.serialNumber?.toString().trim()
//     );
//     if (rowIndex === -1)
//       throw new Error(`Employee ${selectedItem.serialNumber} not found`);

//     const now = new Date();
//     // Format for display: DD/MM/YYYY
//     const formattedTimestamp = `${now.getDate()}/${
//       now.getMonth() + 1
//     }/${now.getFullYear()}`;
    
//     // Format for Google Sheets as a proper date object (YYYY-MM-DD format)
//     const formattedDateForSheets = `${now.getFullYear()}-${(now.getMonth() + 1)
//       .toString()
//       .padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}`;

//     const allFieldsYes =
//       formData.checkSalarySlipResume &&
//       formData.offerLetterReceived &&
//       formData.welcomeMeeting &&
//       formData.biometricAccess &&
//       formData.officialEmailId &&
//       formData.assignAssets &&
//       formData.pfEsic &&
//       formData.companyDirectory;

//     // Updated column indices
//     const actualColumnIndex = 27; // Column AB (0-based index: 27)
//     const startColumnIndex = 29; // Column AD (0-based index: 29)

//     const updatePromises = [];

//     if (allFieldsYes) {
//       updatePromises.push(
//         fetch(
//           "https://script.google.com/macros/s/AKfycbyPX2PreyvGFcx8V5Jv7R2TwZgMOiEzCKSKntbTzy1ElMSvmgiWCJ1O_CHG6DStW48hlQ/exec",
//           {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/x-www-form-urlencoded",
//             },
//             body: new URLSearchParams({
//               sheetName: "JOINING",
//               action: "updateCell",
//               rowIndex: (rowIndex + 1).toString(),
//               columnIndex: (actualColumnIndex + 1).toString(), // Column AB
//               value: formattedDateForSheets, // Send as YYYY-MM-DD format
//             }).toString(),
//           }
//         )
//       );
//     }

//     const fields = [
//       { value: formData.checkSalarySlipResume ? "Yes" : "No", offset: 0 }, // Column AD
//       { value: formData.offerLetterReceived ? "Yes" : "No", offset: 1 }, // Column AE
//       { value: formData.welcomeMeeting ? "Yes" : "No", offset: 2 }, // Column AF
//       { value: formData.biometricAccess ? "Yes" : "No", offset: 3 }, // Column AG
//       { value: formData.officialEmailId ? "Yes" : "No", offset: 4 }, // Column AH
//       { value: formData.assignAssets ? "Yes" : "No", offset: 5 }, // Column AI
//       { value: formData.pfEsic ? "Yes" : "No", offset: 6 }, // Column AJ
//       { value: formData.companyDirectory ? "Yes" : "No", offset: 7 }, // Column AK
//     ];

//     fields.forEach((field) => {
//       updatePromises.push(
//         fetch(
//           "https://script.google.com/macros/s/AKfycbyPX2PreyvGFcx8V5Jv7R2TwZgMOiEzCKSKntbTzy1ElMSvmgiWCJ1O_CHG6DStW48hlQ/exec",
//           {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/x-www-form-urlencoded",
//             },
//             body: new URLSearchParams({
//               sheetName: "JOINING",
//               action: "updateCell",
//               rowIndex: (rowIndex + 1).toString(),
//               columnIndex: (startColumnIndex + field.offset + 1).toString(),
//               value: field.value,
//             }).toString(),
//           }
//         )
//       );
//     });

//     const responses = await Promise.all(updatePromises);
//     const results = await Promise.all(responses.map((r) => r.json()));

//     const hasError = results.some((result) => !result.success);
//     if (hasError) {
//       console.error("Some cell updates failed:", results);
//       throw new Error("Some cell updates failed");
//     }

//     if (allFieldsYes) {
//       toast.success("All conditions met! Data saved and actual date updated successfully.");
//     } else {
//       toast.success(
//         "Data saved successfully. Actual date will be updated when all conditions are met."
//       );
//     }

//     setShowModal(false);
//     fetchJoiningData();
//   } catch (error) {
//     console.error("Update error:", error);
//     toast.error(`Update failed: ${error.message}`);
//   } finally {
//     setLoading(false);
//     setSubmitting(false);
//   }
// };


// const formatDOB = (dateString) => {
//   if (!dateString) return "";

//   // Handle the format "2021-11-01"
//   if (dateString.includes('-')) {
//     const parts = dateString.split('-');
//     if (parts.length === 3) {
//       const day = parts[2];
//       const month = parts[1];
//       const year = parts[0].slice(-2); // Get last 2 digits of year
//       return `${day}/${month}/${year}`;
//     }
//   }

//   // Fallback for other formats
//   const date = new Date(dateString);
//   if (isNaN(date.getTime())) {
//     return dateString;
//   }

//   const day = date.getDate();
//   const month = date.getMonth() + 1; // Months are 0-indexed, so add 1
//   const year = date.getFullYear().toString().slice(-2);

//   return `${day}/${month}/${year}`;
// };

//   const filteredPendingData = pendingData.filter((item) => {
//     const matchesSearch =
//       item.candidateName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       item.serialNumber?.toLowerCase().includes(searchTerm.toLowerCase());
//     return matchesSearch;
//   });

//   const filteredHistoryData = historyData.filter((item) => {
//     const matchesSearch =
//       item.candidateName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       item.serialNumber?.toLowerCase().includes(searchTerm.toLowerCase());
//     return matchesSearch;
//   });

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <h1 className="text-2xl font-bold  ">After Joining Work</h1>
//       </div>

//       <div className="bg-white  p-4 rounded-lg shadow flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 md:space-x-4">
//         <div className="flex flex-1 max-w-md">
//           <div className="relative w-full">
//             <input
//               type="text"
//               placeholder="Search Something..."
//               className="w-full pl-10 pr-4 py-2 border border-gray-300   rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white   text-gray-500    "
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//             <Search
//               size={20}
//               className="absolute left-3 top-1/2 transform -translate-y-1/2  text-gray-500  "
//             />
//           </div>
//         </div>
//       </div>

//       <div className="bg-white  rounded-lg shadow overflow-hidden">
//         <div className="border-b border-gray-300  ">
//           <nav className="flex -mb-px">
//             <button
//               className={`py-4 px-6 font-medium text-sm border-b-2 ${
//                 activeTab === "pending"
//                   ? "border-indigo-500 text-indigo-600"
//                   : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
//               }`}
//               onClick={() => setActiveTab("pending")}
//             >
//               <Clock size={16} className="inline mr-2" />
//               Pending ({filteredPendingData.length})
//             </button>
//             <button
//               className={`py-4 px-6 font-medium text-sm border-b-2 ${
//                 activeTab === "history"
//                   ? "border-indigo-500 text-indigo-600"
//                   : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
//               }`}
//               onClick={() => setActiveTab("history")}
//             >
//               <CheckCircle size={16} className="inline mr-2" />
//               History ({filteredHistoryData.length})
//             </button>
//           </nav>
//         </div>

//         <div className="p-6">
//           {activeTab === "pending" && (
//             <div className="overflow-x-auto">
//               <table className="min-w-full divide-y divide-white">
//                 <thead className="bg-gray-100">
//                   <tr>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Action
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Serial Number
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Name
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Father Name
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Date Of Joining
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Designation
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Department
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-white">
//                   {tableLoading ? (
//                     <tr>
//                       <td colSpan="7" className="px-6 py-12 text-center">
//                         <div className="flex justify-center flex-col items-center">
//                           <div className="w-6 h-6 border-4 border-indigo-500 border-dashed rounded-full animate-spin mb-2"></div>
//                           <span className="text-gray-600 text-sm">
//                             Loading pending calls...
//                           </span>
//                         </div>
//                       </td>
//                     </tr>
//                   ) : error ? (
//                     <tr>
//                       <td colSpan="7" className="px-6 py-12 text-center">
//                         <p className="text-red-500">Error: {error}</p>
//                         <button
//                           onClick={fetchJoiningData}
//                           className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
//                         >
//                           Retry
//                         </button>
//                       </td>
//                     </tr>
//                   ) : filteredPendingData.length > 0 ? (
//                     filteredPendingData.map((item, index) => (
//                       <tr key={index} className="hover:bg-white">
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <button
//                             onClick={() => handleAfterJoiningClick(item)}
//                             className="px-3 py-1 bg-indigo-700 text-white rounded-md text-sm"
//                           >
//                             Process
//                           </button>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                           {item.serialNumber}
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                           {item.candidateName}
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                           {item.fatherName}
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                           {formatDOB(item.dateOfJoining)}
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                           {item.designation}
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                           {item.salary}
//                         </td>
//                       </tr>
//                     ))
//                   ) : (
//                     <tr>
//                       <td colSpan="7" className="px-6 py-12 text-center">
//                         <p className="text-gray-500">
//                           No pending after joining work found.
//                         </p>
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           )}

//           {activeTab === "history" && (
//             <div className="overflow-x-auto">
//               <table className="min-w-full divide-y   divide-white  ">
//                 <thead className="bg-gray-100  ">
//                   <tr>
//                     <th className="px-6 py-3 text-left text-xs font-medium  text-gray-500 uppercase tracking-wider">
//                       Employee ID
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium  text-gray-500 uppercase tracking-wider">
//                       Name
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium  text-gray-500 uppercase tracking-wider">
//                       Designation
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium  text-gray-500 uppercase tracking-wider">
//                       Date Of Joining
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium  text-gray-500 uppercase tracking-wider">
//                       Status
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y   divide-white  ">
//                   {tableLoading ? (
//                     <tr>
//                       <td colSpan="5" className="px-6 py-12 text-center">
//                         <div className="flex justify-center flex-col items-center">
//                           <div className="w-6 h-6 border-4 border-indigo-500 border-dashed rounded-full animate-spin mb-2"></div>
//                           <span className="text-gray-600 text-sm">
//                             Loading call history...
//                           </span>
//                         </div>
//                       </td>
//                     </tr>
//                   ) : filteredHistoryData.length === 0 ? (
//                     <tr>
//                       <td colSpan="5" className="px-6 py-12 text-center">
//                         <p className="text-gray-500">No call history found.</p>
//                       </td>
//                     </tr>
//                   ) : (
//                     filteredHistoryData.map((item, index) => (
//                       <tr key={index} className="hover:bg-white hover: ">
//                         <td className="px-6 py-4 whitespace-nowrap text-sm  text-gray-500">
//                           {item.serialNumber}
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm  text-gray-500">
//                           {item.candidateName}
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm  text-gray-500">
//                           {item.designation}
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                           {formatDOB(item.dateOfJoining)}
//                         </td>

//                         <td className="px-6 py-4 whitespace-nowrap text-sm  text-gray-500">
//                           <span className="px-2 py-1 text-xs rounded-full bg-green-500 font-semibold  text-white">
//                             Completed
//                           </span>
//                         </td>
//                       </tr>
//                     ))
//                   )}
//                 </tbody>
//               </table>
//               {filteredHistoryData.length === 0 && (
//                 <div className="px-6 py-12 text-center">
//                   <p className=" text-gray-500  ">
//                     No after joining work history found.
//                   </p>
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//       </div>

//       {showModal && selectedItem && (
//         <div className="fixed inset-0 modal-backdrop flex items-center justify-center z-50 p-4 overflow-y-auto">
//           <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl my-8">
//             <div className="flex justify-between items-center p-6 border-b">
//               <h3 className="text-lg font-medium text-gray-500">
//                 After Joining Work Checklist
//               </h3>
//               <button
//                 onClick={() => setShowModal(false)}
//                 className="text-gray-500"
//               >
//                 <X size={20} />
//               </button>
//             </div>
//             <form
//               onSubmit={handleSubmit}
//               className="p-6 space-y-4 max-h-[80vh] overflow-y-auto"
//             >
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-500 mb-1">
//                     Employee ID (कर्मचारी आईडी)
//                   </label>
//                   <input
//                     type="text"
//                     value={selectedItem.serialNumber}
//                     disabled
//                     className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white text-gray-500"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-500 mb-1">
//                     Name (नाम)
//                   </label>
//                   <input
//                     type="text"
//                     value={selectedItem.candidateName}
//                     disabled
//                     className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white text-gray-500"
//                   />
//                 </div>
//               </div>

//               <div className="space-y-3">
//                 <h4 className="text-md font-medium text-gray-500">
//                   Checklist Items (चेकलिस्ट आइटम)
//                 </h4>
//                 {[
//                   {
//                     key: "checkSalarySlipResume",
//                     label: "Check Salary Slip & Resume Copy (वेतन पर्ची और बायोडाटा कॉपी)",
//                   },
//                   {
//                     key: "offerLetterReceived",
//                     label: "Offer Letter Received (प्रस्ताव पत्र प्राप्त हुआ)",
//                   },
//                   { key: "welcomeMeeting", label: "Welcome Meeting (स्वागत बैठक)" },
//                   { key: "biometricAccess", label: "Biometric Access बॉयोमीट्रिक ऐक्सेस" },
//                 ].map((item) => (
//                   <div key={item.key} className="flex items-center">
//                     <input
//                       type="checkbox"
//                       id={item.key}
//                       checked={formData[item.key]}
//                       onChange={() => handleCheckboxChange(item.key)}
//                       className="h-4 w-4 text-gray-500 focus:ring-blue-500 border-gray-300 rounded bg-white"
//                     />
//                     <label
//                       htmlFor={item.key}
//                       className="ml-2 text-sm text-gray-500"
//                     >
//                       {item.label}
//                     </label>
//                   </div>
//                 ))}
//                 {formData.biometricAccess && (
//                   <div className="mt-2 ml-6 p-3 bg-gray-50 rounded-md">
//                     <div className="grid grid-cols-1 gap-3">
//                       <div>
//                         <label className="block text-sm font-medium text-gray-500 mb-1">
//                           Punch Code
//                         </label>
//                         <input
//                           type="text"
//                           name="punchCode"
//                           value={formData.punchCode}
//                           onChange={handleInputChange}
//                           className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
//                           placeholder="Enter punch code"
//                         />
//                       </div>
//                     </div>
//                   </div>
//                 )}
//                 {/* Official Email ID Section */}
//                 <div className="space-y-3">
//                   <div className="flex items-center">
//                     <input
//                       type="checkbox"
//                       id="officialEmailId"
//                       checked={formData.officialEmailId}
//                       onChange={() => handleCheckboxChange("officialEmailId")}
//                       className="h-4 w-4 text-gray-500 focus:ring-blue-500 border-gray-300 rounded bg-white"
//                     />
//                     <label
//                       htmlFor="officialEmailId"
//                       className="ml-2 text-sm text-gray-500"
//                     >
//                       Official Email ID (ऑफ़िशियल ईमेल आईडी)
//                     </label>
//                   </div>

//                   {formData.officialEmailId && (
//                     <div className="mt-2 ml-6 grid grid-cols-1 md:grid-cols-2 gap-3 p-3 bg-gray-50 rounded-md">
//                       <div>
//                         <label className="block text-sm font-medium text-gray-500 mb-1">
//                           Email ID
//                         </label>
//                         <input
//                           type="text"
//                           name="emailId"
//                           value={formData.emailId}
//                           onChange={handleInputChange}
//                           className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
//                           placeholder="Enter email ID"
//                         />
//                       </div>
//                       <div>
//                         <label className="block text-sm font-medium text-gray-500 mb-1">
//                           Password
//                         </label>
//                         <input
//                           type="password"
//                           name="emailPassword"
//                           value={formData.emailPassword}
//                           onChange={handleInputChange}
//                           className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
//                           placeholder="Enter password"
//                         />
//                       </div>
//                     </div>
//                   )}
//                 </div>
//                 <div className="flex items-center">
//                   <input
//                     type="checkbox"
//                     id="assignAssets"
//                     checked={formData.assignAssets}
//                     onChange={() => handleCheckboxChange("assignAssets")}
//                     className="h-4 w-4 text-gray-500 focus:ring-blue-500 border-gray-300 rounded bg-white"
//                   />
//                   <label
//                     htmlFor="assignAssets"
//                     className="ml-2 text-sm text-gray-500"
//                   >
//                     Assign Assets (असाइन एसेट्स)
//                   </label>
//                 </div>
//                 {formData.assignAssets && (
//                   <div className="mt-2 ml-6 grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 bg-gray-50 rounded-md">
//                     {[
//                       { id: "laptop", label: "Laptop" },
//                       { id: "mobile", label: "Mobile" },
//                       { id: "vehicle", label: "Vehicle" },
//                       { id: "other", label: "SIM" },
//                     ].map((asset) => (
//                       <div key={asset.id} className="space-y-2">
//                         <label className="block text-sm font-medium text-gray-500">
//                           {asset.label}
//                         </label>
//                         <input
//                           type="text"
//                           name={asset.id}
//                           value={formData[asset.id]}
//                           onChange={handleInputChange}
//                           className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
//                           placeholder={`Enter ${asset.label} details`}
//                         />
//                       </div>
//                     ))}
//                   </div>
//                 )}
//                 <div className="flex items-center">
//                   <input
//                     type="checkbox"
//                     id="pfEsic"
//                     checked={formData.pfEsic}
//                     onChange={() => handleCheckboxChange("pfEsic")}
//                     className="h-4 w-4 text-gray-500 focus:ring-blue-500 border-gray-300 rounded bg-white"
//                   />
//                   <label
//                     htmlFor="pfEsic"
//                     className="ml-2 text-sm text-gray-500"
//                   >
//                     PF / ESIC (पी.एफ./ई.एस.आई.सी.)
//                   </label>
//                 </div>
//                 {/* Company Directory Section */}
//                 <div className="space-y-3">
//                   <div className="flex items-center">
//                     <input
//                       type="checkbox"
//                       id="companyDirectory"
//                       checked={formData.companyDirectory}
//                       onChange={() => handleCheckboxChange("companyDirectory")}
//                       className="h-4 w-4 text-gray-500 focus:ring-blue-500 border-gray-300 rounded bg-white"
//                     />
//                     <label
//                       htmlFor="companyDirectory"
//                       className="ml-2 text-sm text-gray-500"
//                     >
//                       Company Directory (कंपनी निर्देशिका)
//                     </label>
//                   </div>

//                   {formData.companyDirectory && (
//                     <div className="mt-2 ml-6 p-3 bg-gray-50 rounded-md">
//                       <div className="space-y-2">
//                         <label className="block text-sm font-medium text-gray-500">
//                           Manual
//                         </label>
//                         <div className="space-y-2">
//                           <div className="flex items-center">
//                             <input
//                               type="file"
//                               id="manualImage"
//                               accept="image/*"
//                               onChange={(e) =>
//                                 handleImageUpload(e, "manualImage")
//                               }
//                               className="hidden"
//                             />
//                             <label
//                               htmlFor="manualImage"
//                               className="cursor-pointer bg-white border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-50 flex items-center"
//                             >
//                               <svg
//                                 className="w-4 h-4 mr-1"
//                                 fill="none"
//                                 stroke="currentColor"
//                                 viewBox="0 0 24 24"
//                                 xmlns="http://www.w3.org/2000/svg"
//                               >
//                                 <path
//                                   strokeLinecap="round"
//                                   strokeLinejoin="round"
//                                   strokeWidth="2"
//                                   d="M12 6v6m0 0v6m0-6h6m-6 0H6"
//                                 ></path>
//                               </svg>
//                               {formData.manualImage
//                                 ? "Change Manual"
//                                 : formData.manualImageUrl
//                                 ? "Replace Manual"
//                                 : "Upload Manual"}
//                             </label>
//                           </div>
//                           {/* Show existing manual image if available */}
//                           {formData.manualImageUrl && !formData.manualImage && (
//                             <div className="mt-2">
//                               <img
//                                 src={formData.manualImageUrl}
//                                 alt="Existing Manual"
//                                 className="h-32 w-full object-contain rounded border"
//                                 onError={(e) => {
//                                   e.target.style.display = "none";
//                                 }}
//                               />
//                               <p className="text-xs text-gray-500 mt-1">
//                                 Current manual image
//                               </p>
//                             </div>
//                           )}
//                           {/* Show new selected manual image preview */}
//                           {formData.manualImage && (
//                             <div className="mt-2">
//                               <img
//                                 src={URL.createObjectURL(formData.manualImage)}
//                                 alt="New Manual"
//                                 className="h-32 w-full object-contain rounded border"
//                               />
//                               <p className="text-xs text-green-600 mt-1">
//                                 New manual image selected
//                               </p>
//                             </div>
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               </div>

//               <div className="flex justify-end space-x-2 pt-4">
//                 <button
//                   type="button"
//                   onClick={() => setShowModal(false)}
//                   className="px-4 py-2 border border-gray-300 rounded-md text-gray-500 hover:bg-gray-50"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className={`px-4 py-2 text-white bg-indigo-700 rounded-md hover:bg-indigo-800 min-h-[42px] flex items-center justify-center ${
//                     submitting ? "opacity-90 cursor-not-allowed" : ""
//                   }`}
//                   disabled={submitting}
//                 >
//                   {submitting ? (
//                     <div className="flex items-center">
//                       <svg
//                         className="animate-spin h-4 w-4 text-white mr-2"
//                         xmlns="http://www.w3.org/2000/svg"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                       >
//                         <circle
//                           className="opacity-25"
//                           cx="12"
//                           cy="12"
//                           r="10"
//                           stroke="currentColor"
//                           strokeWidth="4"
//                         ></circle>
//                         <path
//                           className="opacity-75"
//                           fill="currentColor"
//                           d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                         ></path>
//                       </svg>
//                       <span>Submitting...</span>
//                     </div>
//                   ) : (
//                     "Submit"
//                   )}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AfterJoiningWork;




import React, { useState, useEffect } from 'react';
import { Filter, Search, Clock, CheckCircle, X } from 'lucide-react';
import useDataStore from '../store/dataStore';
import toast from 'react-hot-toast';  

const AfterJoiningWork = () => {
  const [activeTab, setActiveTab] = useState("pending");
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [pendingData, setPendingData] = useState([]);
  const [historyData, setHistoryData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tableLoading, setTableLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [reportingOfficers, setReportingOfficers] = useState([]);

const [formData, setFormData] = useState({
  employeeCode: "",
  salaryConfirmation: "", // "Yes" or "No"
  salaryAmount: "", // New field for salary input when Yes is selected
  reportingOfficer: "",
  pf: "",
  baseAddress: "",
  idProofCopy: null,
  joiningLetter: null,
  biometricAccess: false,
  punchCode: "",
  officialEmailId: false,
  emailId: "",
  emailPassword: "",
  laptop: "",
  mobile: "",
  assignAssets: false,
  manualImage: null,
  manualImageUrl: "",
  assets: [],
});




const fetchReportingOfficers = async () => {
  try {
    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbyPX2PreyvGFcx8V5Jv7R2TwZgMOiEzCKSKntbTzy1ElMSvmgiWCJ1O_CHG6DStW48hlQ/exec?sheet=Master&action=fetch"
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    
    if (result.success && result.data) {
      // Column B se data lena hai (index 1)
      const officers = result.data
        .slice(1) // Skip header row
        .map(row => row[1]) // Column B (index 1)
        .filter(officer => officer && officer.trim() !== "");
      
      setReportingOfficers(officers);
    }
  } catch (error) {
    console.error("Error fetching reporting officers:", error);
    toast.error("Failed to load reporting officers");
  }
};

// Call this in useEffect
useEffect(() => {
  fetchJoiningData();
  fetchReportingOfficers(); // Add this line
}, []);



  // Google Drive folder ID for storing images
  const DRIVE_FOLDER_ID = "1O0D_zo4dr9qYLq6GKS2jubR5WUXhV0lB";

const fetchJoiningData = async () => {
  setLoading(true);
  setTableLoading(true);
  setError(null);

  try {
    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbyPX2PreyvGFcx8V5Jv7R2TwZgMOiEzCKSKntbTzy1ElMSvmgiWCJ1O_CHG6DStW48hlQ/exec?sheet=JOINING&action=fetch"
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log("Raw JOINING API response:", result);

    if (!result.success) {
      throw new Error(result.error || "Failed to fetch data from JOINING sheet");
    }

    const rawData = result.data || result;

    if (!Array.isArray(rawData)) {
      throw new Error("Expected array data not received");
    }

    console.log("Total rows:", rawData.length);
    console.log("First few rows:", rawData.slice(0, 7));

    // Adjust header row index if needed
    let headerRowIndex = 5;
    const headers = rawData[headerRowIndex];
    console.log("Headers:", headers);

    const dataRows = rawData.length > 6 ? rawData.slice(6) : [];
    console.log("Data rows count:", dataRows.length);
    console.log("First data row:", dataRows[0]);

    const processedData = dataRows.map((row, idx) => {
      const item = {
        timestamp: row[0] || "",
        joiningNo: row[1] || "", // Column B
        candidateName: row[2] || "", // Column C
        fatherName: row[3] || "",
        dateOfJoining: row[4] || "",
        designation: row[5] || "",
        aadharPhoto: row[6] || "",
        candidatePhoto: row[7] || "",
        currentAddress: row[8] || "",
        bodAsPerAadhar: row[9] || "",
        gender: row[10] || "",
        mobileNo: row[11] || "",
        familyMobileNo: row[12] || "",
        relationWithFamily: row[13] || "",
        accountNo: row[14] || "",
        ifscCode: row[15] || "",
        branchName: row[16] || "",
        passbookPhoto: row[17] || "",
        email: row[18] || "",
        qualification: row[19] || "",
        salary: row[20] || "",
        aadharNo: row[21] || "",
        resumeCopy: row[22] || "",
        plannedDate: row[25] || "",        // Column Z (index 25)
        actual: row[26] || "",
        employeeCode: row[28] || "",               // Column AA (index 26)
      };
      
      // Log first item for debugging
      if (idx === 0) {
        console.log("First processed item:", item);
      }
      
      return item;
    });

    // UPDATED LOGIC: Show in pending only if plannedDate exists BUT actual is empty
    const pendingTasks = processedData.filter(
      (task) => task.plannedDate && !task.actual
    );
    
    console.log("Pending tasks found:", pendingTasks.length);
    console.log("First pending task:", pendingTasks[0]);
    
    setPendingData(pendingTasks);

    // UPDATED LOGIC: Show in history only if BOTH plannedDate AND actual are filled
    const historyTasks = processedData.filter(
      (task) => task.plannedDate && task.actual
    );
    
    console.log("History tasks found:", historyTasks.length);
    
    setHistoryData(historyTasks);
    
  } catch (error) {
    console.error("Error fetching joining data:", error);
    setError(error.message);
    toast.error(`Failed to load joining data: ${error.message}`);
  } finally {
    setLoading(false);
    setTableLoading(false);
  }
};

const fetchAssetsData = async (employeeId) => {
  try {
    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbyPX2PreyvGFcx8V5Jv7R2TwZgMOiEzCKSKntbTzy1ElMSvmgiWCJ1O_CHG6DStW48hlQ/exec?sheet=Assets&action=fetch"
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    
    if (!result.success) {
      return null;
    }

    const data = result.data || result;
    if (!Array.isArray(data) || data.length < 2) {
      return null;
    }

    const matchingRow = data.find((row, index) => {
      if (index === 0) return false;
      return row[1]?.toString().trim() === employeeId?.toString().trim();
    });

    if (matchingRow) {
      return {
        punchCode: matchingRow[10] || "",
        emailId: matchingRow[3] || "",
        emailPassword: matchingRow[4] || "",
        laptop: matchingRow[5] || "",
        mobile: matchingRow[6] || "",
        manualImageUrl: matchingRow[9] || "",
        salaryConfirmation: matchingRow[11] || "", // Column L
        reportingOfficer: matchingRow[12] || "", // Column M
        pf: matchingRow[13] || "", // Column N
        baseAddress: matchingRow[14] || "", // Column O
        idProofCopyUrl: matchingRow[15] || "", // Column P
        joiningLetterUrl: matchingRow[16] || "" // Column Q
      };
    }

    return null;
  } catch (error) {
    console.error("Error fetching assets data:", error);
    return null;
  }
};


  // Upload image to Google Drive
  const uploadImageToDrive = async (file, fileName) => {
    try {
      const reader = new FileReader();
      return new Promise((resolve, reject) => {
        reader.onload = async () => {
          try {
            const base64Data = reader.result;
            const response = await fetch(
              "https://script.google.com/macros/s/AKfycbyPX2PreyvGFcx8V5Jv7R2TwZgMOiEzCKSKntbTzy1ElMSvmgiWCJ1O_CHG6DStW48hlQ/exec",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/x-www-form-urlencoded",
                },
                body: new URLSearchParams({
                  action: "uploadFile",
                  base64Data: base64Data,
                  fileName: fileName,
                  mimeType: file.type,
                  folderId: DRIVE_FOLDER_ID,
                }).toString(),
              }
            );

            const result = await response.json();
            if (result.success) {
              resolve(result.fileUrl);
            } else {
              reject(new Error(result.error || "Upload failed"));
            }
          } catch (error) {
            reject(error);
          }
        };
        reader.onerror = () => reject(new Error("Failed to read file"));
        reader.readAsDataURL(file);
      });
    } catch (error) {
      throw new Error(`Upload failed: ${error.message}`);
    }
  };

  useEffect(() => {
    fetchJoiningData();
  }, []);

const handleAfterJoiningClick = async (item) => {
  // Debug logs
  console.log("handleAfterJoiningClick called with item:", item);
  console.log("item.joiningNo:", item.joiningNo);
  
  if (!item || !item.joiningNo) {
    toast.error("Invalid item data. Please refresh and try again.");
    return;
  }

  // IMPORTANT: Set selectedItem FIRST before opening modal
  setSelectedItem(item);
  setShowModal(true);
  setLoading(true);

  // Reset form data AFTER setting selectedItem
  setFormData({
    employeeCode: "",
    salaryConfirmation: "",
    salaryAmount: "",
    reportingOfficer: "",
    pf: "",
    baseAddress: item.currentAddress || "",
    idProofCopy: null,
    joiningLetter: null,
    biometricAccess: false,
    punchCode: "",
    officialEmailId: false,
    emailId: "",
    emailPassword: "",
    laptop: "",
    mobile: "",
    manualImage: null,
    manualImageUrl: "",
    assignAssets: false,
    assets: [],
  });

  try {
    const assetsData = await fetchAssetsData(item.joiningNo);

    const fullDataResponse = await fetch(
      "https://script.google.com/macros/s/AKfycbyPX2PreyvGFcx8V5Jv7R2TwZgMOiEzCKSKntbTzy1ElMSvmgiWCJ1O_CHG6DStW48hlQ/exec?sheet=JOINING&action=fetch"
    );

    if (!fullDataResponse.ok) {
      throw new Error(`HTTP error! status: ${fullDataResponse.status}`);
    }

    const fullDataResult = await fullDataResponse.json();
    const allData = fullDataResult.data || fullDataResult;

    let headerRowIndex = 5;
    const headers = allData[headerRowIndex].map((h) => h?.toString().trim());

    const serialNumberIndex = headers.findIndex(
      (h) => h?.toLowerCase() === "serialnumber"
    );
    
    if (serialNumberIndex === -1) {
      throw new Error("Could not find 'serialNumber' column");
    }

    const rowIndex = allData.findIndex(
      (row, idx) =>
        idx > headerRowIndex &&
        row[serialNumberIndex]?.toString().trim() ===
          item.joiningNo?.toString().trim()
    );

    if (rowIndex === -1) {
      console.warn(`Employee ${item.joiningNo} not found in sheet`);
    } else {
      // Column indices for reading existing data
      const biometricColumnIndex = 31; // Column AF
      const officialEmailColumnIndex = 32; // Column AG
      const assignAssetsColumnIndex = 33; // Column AH

      const currentValues = {
        biometricAccess:
          allData[rowIndex][biometricColumnIndex]
            ?.toString()
            .trim()
            .toLowerCase() === "yes",
        officialEmailId:
          allData[rowIndex][officialEmailColumnIndex]
            ?.toString()
            .trim()
            .toLowerCase() === "yes",
        assignAssets:
          allData[rowIndex][assignAssetsColumnIndex]
            ?.toString()
            .trim()
            .toLowerCase() === "yes",
      };

      const finalFormData = {
        ...currentValues,
        salaryConfirmation: assetsData?.salaryConfirmation || "",
        salaryAmount: assetsData?.salaryAmount || "",
        reportingOfficer: assetsData?.reportingOfficer || "",
        pf: assetsData?.pf || "",
        baseAddress: item.currentAddress || assetsData?.baseAddress || "",
        punchCode: assetsData?.punchCode || "",
        emailId: assetsData?.emailId || "",
        emailPassword: assetsData?.emailPassword || "",
        laptop: assetsData?.laptop || "",
        mobile: assetsData?.mobile || "",
        manualImageUrl: assetsData?.manualImageUrl || "",
        idProofCopy: null,
        joiningLetter: null,
        manualImage: null,
        assets: [],
      };

      setFormData(prev => ({
        ...prev,
        ...finalFormData
      }));
    }

  } catch (error) {
    console.error("Error fetching current values:", error);
    toast.error("Failed to load current values");
  } finally {
    setLoading(false);
  }
};

    const handleCheckboxChange = (name) => {
    setFormData((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (e, fieldName) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        [fieldName]: file,
      }));
    }
  };

const saveAssetsData = async (employeeId, employeeName, assetsData) => {
  try {
    const now = new Date();
    const timestamp = `${now.getDate().toString().padStart(2, '0')}/${(now.getMonth() + 1).toString().padStart(2, '0')}/${now.getFullYear()} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
    
    const rowData = [
      timestamp, // Column A
      employeeId, // Column B
      employeeName, // Column C
      assetsData.emailId || "", // Column D
      assetsData.emailPassword || "", // Column E
      assetsData.laptop || "", // Column F
      assetsData.mobile || "", // Column G
      "", // Column H - removed vehicle
      "", // Column I - removed other/SIM
      assetsData.manualImageUrl || "", // Column J
      assetsData.punchCode || "", // Column K
      assetsData.salaryConfirmation || "", // Column L - New
      assetsData.reportingOfficer || "", // Column M - New
      assetsData.pf || "", // Column N - New
      assetsData.baseAddress || "", // Column O - New
      assetsData.idProofCopyUrl || "", // Column P - New
      assetsData.joiningLetterUrl || "", // Column Q - New
    ];

    // Existing update/insert logic remains same...
    const existingData = await fetchAssetsData(employeeId);
    
    if (existingData) {
      const fetchResponse = await fetch(
        "https://script.google.com/macros/s/AKfycbyPX2PreyvGFcx8V5Jv7R2TwZgMOiEzCKSKntbTzy1ElMSvmgiWCJ1O_CHG6DStW48hlQ/exec?sheet=Assets&action=fetch"
      );
      const result = await fetchResponse.json();
      const data = result.data || result;
      
      const rowIndex = data.findIndex((row, index) => {
        if (index === 0) return false;
        return row[1]?.toString().trim() === employeeId?.toString().trim();
      });

      if (rowIndex !== -1) {
        const response = await fetch(
          "https://script.google.com/macros/s/AKfycbyPX2PreyvGFcx8V5Jv7R2TwZgMOiEzCKSKntbTzy1ElMSvmgiWCJ1O_CHG6DStW48hlQ/exec",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
              sheetName: "Assets",
              action: "update",
              rowIndex: (rowIndex + 1).toString(),
              rowData: JSON.stringify(rowData),
            }).toString(),
          }
        );
        return await response.json();
      }
    }
    
    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbyPX2PreyvGFcx8V5Jv7R2TwZgMOiEzCKSKntbTzy1ElMSvmgiWCJ1O_CHG6DStW48hlQ/exec",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          sheetName: "Assets",
          action: "insert",
          rowData: JSON.stringify(rowData),
        }).toString(),
      }
    );

    return await response.json();
  } catch (error) {
    throw new Error(`Failed to save assets data: ${error.message}`);
  }
};

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setSubmitting(true);

  // Validation
  console.log("handleSubmit called");
  console.log("selectedItem:", selectedItem);
  console.log("selectedItem.joiningNo:", selectedItem?.joiningNo);
  console.log("selectedItem.candidateName:", selectedItem?.candidateName);

  if (!selectedItem) {
    toast.error("No item selected. Please try again.");
    setSubmitting(false);
    setLoading(false);
    return;
  }

  if (!selectedItem.joiningNo) {
    toast.error("Joining number is missing. Please try again.");
    setSubmitting(false);
    setLoading(false);
    return;
  }

  if (!selectedItem.candidateName) {
    toast.error("Candidate name is missing. Please try again.");
    setSubmitting(false);
    setLoading(false);
    return;
  }

  try {
    // Upload images if present
    let idProofCopyUrl = "";
    let joiningLetterUrl = "";
    let manualImageUrl = formData.manualImageUrl;

    if (formData.idProofCopy) {
      try {
        idProofCopyUrl = await uploadImageToDrive(
          formData.idProofCopy,
          `${selectedItem.joiningNo}_idproof_${Date.now()}.${formData.idProofCopy.name.split('.').pop()}`
        );
      } catch (error) {
        toast.error(`Failed to upload ID proof: ${error.message}`);
      }
    }

    if (formData.joiningLetter) {
      try {
        joiningLetterUrl = await uploadImageToDrive(
          formData.joiningLetter,
          `${selectedItem.joiningNo}_joining_${Date.now()}.${formData.joiningLetter.name.split('.').pop()}`
        );
      } catch (error) {
        toast.error(`Failed to upload joining letter: ${error.message}`);
      }
    }

    if (formData.manualImage) {
      try {
        manualImageUrl = await uploadImageToDrive(
          formData.manualImage,
          `${selectedItem.joiningNo}_manual_${Date.now()}.${formData.manualImage.name.split('.').pop()}`
        );
      } catch (error) {
        toast.error(`Failed to upload manual image: ${error.message}`);
      }
    }

    // Save to Assets sheet
    await saveAssetsData(selectedItem.joiningNo, selectedItem.candidateName, {
      salaryConfirmation: formData.salaryConfirmation,
      salaryAmount: formData.salaryAmount,
      reportingOfficer: formData.reportingOfficer,
      pf: formData.pf,
      baseAddress: formData.baseAddress,
      idProofCopyUrl: idProofCopyUrl,
      joiningLetterUrl: joiningLetterUrl,
      emailId: formData.emailId,
      emailPassword: formData.emailPassword,
      laptop: formData.laptop,
      mobile: formData.mobile,
      manualImageUrl: manualImageUrl,
      punchCode: formData.punchCode
    });

    // Update JOINING sheet - Get row index
    const fullDataResponse = await fetch(
      "https://script.google.com/macros/s/AKfycbyPX2PreyvGFcx8V5Jv7R2TwZgMOiEzCKSKntbTzy1ElMSvmgiWCJ1O_CHG6DStW48hlQ/exec?sheet=JOINING&action=fetch"
    );
    
    if (!fullDataResponse.ok) {
      throw new Error(`HTTP error! status: ${fullDataResponse.status}`);
    }

    const fullDataResult = await fullDataResponse.json();
    const allData = fullDataResult.data || fullDataResult;
    let headerRowIndex = 5;

    const headers = allData[headerRowIndex].map((h) => h?.toString().trim());
    const serialNumberIndex = headers.findIndex(
      (h) => h?.toLowerCase() === "serialnumber"
    );
    
    if (serialNumberIndex === -1) {
      throw new Error("Could not find 'serialNumber' column");
    }

    const rowIndex = allData.findIndex(
      (row, idx) =>
        idx > headerRowIndex &&
        row[serialNumberIndex]?.toString().trim() ===
          selectedItem.joiningNo?.toString().trim()
    );
    
    if (rowIndex === -1) {
      throw new Error(`Employee ${selectedItem.joiningNo} not found`);
    }

    // Helper function to update a single cell
    const updateCell = (columnIndex, value) => {
      return fetch(
        "https://script.google.com/macros/s/AKfycbyPX2PreyvGFcx8V5Jv7R2TwZgMOiEzCKSKntbTzy1ElMSvmgiWCJ1O_CHG6DStW48hlQ/exec",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            sheetName: "JOINING",
            action: "updateCell",
            rowIndex: (rowIndex + 1).toString(),
            columnIndex: columnIndex.toString(),
            value: value,
          }).toString(),
        }
      );
    };

    // Prepare all updates
    const updatePromises = [];

    // Calculate salary value
    const salaryValue = formData.salaryConfirmation === "Yes" 
      ? formData.salaryAmount 
      : formData.salaryConfirmation;

    // Current date/time for Actual column
    const now = new Date();
    const actualDate = `${now.getDate().toString().padStart(2, '0')}/${(now.getMonth() + 1).toString().padStart(2, '0')}/${now.getFullYear()} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

    // All basic updates with CORRECT column numbers
    const updates = [
      { col: 27, val: actualDate },                                 // AA - Actual (Column 27, 0-indexed)
      { col: 29, val: formData.employeeCode },                      // AB - Employee Code
      { col: 30, val: salaryValue },                                // AC - Salary
      { col: 31, val: formData.reportingOfficer },                  // AD - Reporting Officer
      { col: 32, val: formData.baseAddress },                       // AE - Base Address
      { col: 33, val: formData.biometricAccess ? formData.punchCode : "" },    // AF - Biometric
      { col: 36, val: formData.laptop },                            // AJ - Assign Assets/Laptop Details
      { col: 37, val: formData.mobile },                            // AK - Mobile Number
      { col: 39, val: formData.pf },                                // AM - PF / ESIC
    ];

    // Push all basic updates
    updates.forEach(update => {
      updatePromises.push(updateCell(update.col, update.val));
    });

    // Conditional updates for Email
    if (formData.officialEmailId) {
      updatePromises.push(updateCell(34, formData.emailId));        // AG - Email
      updatePromises.push(updateCell(35, formData.emailPassword));  // AH - Password
    }

    // Conditional updates for documents
    if (idProofCopyUrl) {
      updatePromises.push(updateCell(40, idProofCopyUrl));  // AN - ID Proof
    }

    if (joiningLetterUrl) {
      updatePromises.push(updateCell(41, joiningLetterUrl)); // AO - Joining Letter
    }

    // Execute all updates
    const responses = await Promise.all(updatePromises);
    const results = await Promise.all(responses.map((r) => r.json()));

    const hasError = results.some((result) => !result.success);
    if (hasError) {
      console.error("Some cell updates failed:", results);
      throw new Error("Some cell updates failed");
    }

    toast.success("Data saved successfully!");
    setShowModal(false);
    fetchJoiningData();
    
  } catch (error) {
    console.error("Update error:", error);
    toast.error(`Update failed: ${error.message}`);
  } finally {
    setLoading(false);
    setSubmitting(false);
  }
};


const formatDOB = (dateString) => {
  if (!dateString) return "";

  // Handle the format "2021-11-01"
  if (dateString.includes('-')) {
    const parts = dateString.split('-');
    if (parts.length === 3) {
      const day = parts[2];
      const month = parts[1];
      const year = parts[0].slice(-2); // Get last 2 digits of year
      return `${day}/${month}/${year}`;
    }
  }

  // Fallback for other formats
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return dateString;
  }

  const day = date.getDate();
  const month = date.getMonth() + 1; // Months are 0-indexed, so add 1
  const year = date.getFullYear().toString().slice(-2);

  return `${day}/${month}/${year}`;
};

  const filteredPendingData = pendingData.filter((item) => {
    const matchesSearch =
      item.candidateName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.serialNumber?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const filteredHistoryData = historyData.filter((item) => {
    const matchesSearch =
      item.candidateName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.serialNumber?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold  ">After Joining Work</h1>
      </div>

      <div className="bg-white  p-4 rounded-lg shadow flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 md:space-x-4">
        <div className="flex flex-1 max-w-md">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search Something..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300   rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white   text-gray-500    "
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search
              size={20}
              className="absolute left-3 top-1/2 transform -translate-y-1/2  text-gray-500  "
            />
          </div>
        </div>
      </div>

      <div className="bg-white  rounded-lg shadow overflow-hidden">
        <div className="border-b border-gray-300  ">
          <nav className="flex -mb-px">
            <button
              className={`py-4 px-6 font-medium text-sm border-b-2 ${
                activeTab === "pending"
                  ? "border-indigo-500 text-indigo-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
              onClick={() => setActiveTab("pending")}
            >
              <Clock size={16} className="inline mr-2" />
              Pending ({filteredPendingData.length})
            </button>
            <button
              className={`py-4 px-6 font-medium text-sm border-b-2 ${
                activeTab === "history"
                  ? "border-indigo-500 text-indigo-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
              onClick={() => setActiveTab("history")}
            >
              <CheckCircle size={16} className="inline mr-2" />
              History ({filteredHistoryData.length})
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === "pending" && (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-white">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Serial Number
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Father Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date Of Joining
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Designation
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Department
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white">
                  {tableLoading ? (
                    <tr>
                      <td colSpan="7" className="px-6 py-12 text-center">
                        <div className="flex justify-center flex-col items-center">
                          <div className="w-6 h-6 border-4 border-indigo-500 border-dashed rounded-full animate-spin mb-2"></div>
                          <span className="text-gray-600 text-sm">
                            Loading pending calls...
                          </span>
                        </div>
                      </td>
                    </tr>
                  ) : error ? (
                    <tr>
                      <td colSpan="7" className="px-6 py-12 text-center">
                        <p className="text-red-500">Error: {error}</p>
                        <button
                          onClick={fetchJoiningData}
                          className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                        >
                          Retry
                        </button>
                      </td>
                    </tr>
) : (
  filteredPendingData.length > 0 ? (
    filteredPendingData.map((item, index) => {
      // Debug log to see what's in item
      console.log(`Row ${index} item:`, item);
      
      return (
        <tr key={index} className="hover:bg-white">
          <td className="px-6 py-4 whitespace-nowrap">
            <button
              onClick={() => {
                console.log("Process button clicked for:", item);
                handleAfterJoiningClick(item);
              }}
              className="px-3 py-1 bg-indigo-700 text-white rounded-md text-sm"
            >
              Process
            </button>
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {item.joiningNo || "N/A"}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {item.candidateName || "N/A"}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {item.fatherName || "N/A"}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {formatDOB(item.dateOfJoining)}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {item.designation || "N/A"}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {item.salary || "N/A"}
          </td>
        </tr>
      );
    })
  ) : (
    <tr>
      <td colSpan="7" className="px-6 py-12 text-center">
        <p className="text-gray-500">
          No pending after joining work found.
        </p>
      </td>
    </tr>
  )
)}
                </tbody>
              </table>
            </div>
          )}

        {activeTab === "history" && (
  <div className="overflow-x-auto">
    <table className="min-w-full divide-y divide-white">
      <thead className="bg-gray-100">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Employee Code
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Name
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Designation
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Date Of Joining
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Status
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-white">
        {tableLoading ? (
          <tr>
            <td colSpan="5" className="px-6 py-12 text-center">
              <div className="flex justify-center flex-col items-center">
                <div className="w-6 h-6 border-4 border-indigo-500 border-dashed rounded-full animate-spin mb-2"></div>
                <span className="text-gray-600 text-sm">
                  Loading call history...
                </span>
              </div>
            </td>
          </tr>
        ) : filteredHistoryData.length === 0 ? (
          <tr>
            <td colSpan="5" className="px-6 py-12 text-center">
              <p className="text-gray-500">No call history found.</p>
            </td>
          </tr>
        ) : (
          filteredHistoryData.map((item, index) => (
            <tr key={index} className="hover:bg-white">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {item.employeeCode || "N/A"}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {item.candidateName}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {item.designation}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {formatDOB(item.dateOfJoining)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <span className="px-2 py-1 text-xs rounded-full bg-green-500 font-semibold text-white">
                  Completed
                </span>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  </div>
)}
        </div>
      </div>

    {showModal && selectedItem && (
  <div className="fixed inset-0 modal-backdrop flex items-center justify-center z-50 p-4 overflow-y-auto">
    <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl my-8">
      <div className="flex justify-between items-center p-6 border-b">
        <h3 className="text-lg font-medium text-gray-500">
          After Joining Work Checklist
        </h3>
        <button
          onClick={() => setShowModal(false)}
          className="text-gray-500"
        >
          <X size={20} />
        </button>
      </div>
      <form
        onSubmit={handleSubmit}
        className="p-6 space-y-4 max-h-[80vh] overflow-y-auto"
      >
        {/* Basic Information */}
      {/* Basic Information */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  <div>
    <label className="block text-sm font-medium text-gray-500 mb-1">
      Serial Number
    </label>
    <input
      type="text"
      value={selectedItem.joiningNo}
      disabled
      className="w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-50 text-gray-500"
    />
  </div>
  <div>
    <label className="block text-sm font-medium text-gray-500 mb-1">
      Employee Code *
    </label>
    <input
      type="text"
      name="employeeCode"
      value={formData.employeeCode}
      onChange={handleInputChange}
      className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white text-gray-700"
      placeholder="Enter Employee Code"
      required
    />
  </div>
  <div>
    <label className="block text-sm font-medium text-gray-500 mb-1">
      Employee Name
    </label>
    <input
      type="text"
      value={selectedItem.candidateName}
      disabled
      className="w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-50 text-gray-500"
    />
  </div>
  <div>
    <label className="block text-sm font-medium text-gray-500 mb-1">
      Designation
    </label>
    <input
      type="text"
      value={selectedItem.designation}
      disabled
      className="w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-50 text-gray-500"
    />
  </div>
 
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">
              Reporting Officer *
            </label>
            <select
              name="reportingOfficer"
              value={formData.reportingOfficer}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white text-gray-700"
              required
            >
              <option value="">Select Reporting Officer</option>
              {reportingOfficers.map((officer, index) => (
                <option key={index} value={officer}>
                  {officer}
                </option>
              ))}
            </select>
          </div>
         <div>
  <label className="block text-sm font-medium text-gray-500 mb-1">
    Salary Confirmation *
  </label>
  <select
    name="salaryConfirmation"
    value={formData.salaryConfirmation}
    onChange={handleInputChange}
    className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white text-gray-700"
    required
  >
    <option value="">Select</option>
    <option value="Yes">Yes</option>
    <option value="No">No</option>
  </select>
</div>

{/* Show Salary Input only when Yes is selected */}
{formData.salaryConfirmation === "Yes" && (
  <div>
    <label className="block text-sm font-medium text-gray-500 mb-1">
      Salary Amount *
    </label>
    <input
      type="text"
      name="salaryAmount"
      value={formData.salaryAmount}
      onChange={handleInputChange}
      className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white text-gray-700"
      placeholder="Enter salary amount"
      required
    />
  </div>
)}
        </div>

        {/* Bank Details (Pre-filled) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">
              Bank Account No.
            </label>
            <input
              type="text"
              value={selectedItem.accountNo}
              disabled
              className="w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-50 text-gray-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">
              IFSC Code
            </label>
            <input
              type="text"
              value={selectedItem.ifscCode}
              disabled
              className="w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-50 text-gray-500"
            />
          </div>
        </div>

        {/* PF */}
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">
              PF Number
            </label>
            <input
              type="text"
              name="pf"
              value={formData.pf}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white text-gray-700"
              placeholder="Enter PF number"
            />
          </div>
        </div>

        {/* Base Address */}
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">
              Base Address
            </label>
            <textarea
              name="baseAddress"
              value={formData.baseAddress}
              onChange={handleInputChange}
              rows={3}
              className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white text-gray-700"
              placeholder="Enter base address"
            />
          </div>
        </div>

        {/* Document Uploads */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">
              ID Proof Copy
            </label>
            <input
              type="file"
              id="idProofCopy"
              accept="image/*,application/pdf"
              onChange={(e) => handleImageUpload(e, "idProofCopy")}
              className="hidden"
            />
            <label
              htmlFor="idProofCopy"
              className="cursor-pointer bg-white border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-50 flex items-center justify-center"
            >
              <svg
                className="w-4 h-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              {formData.idProofCopy ? formData.idProofCopy.name : "Upload ID Proof"}
            </label>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">
              Joining Letter
            </label>
            <input
              type="file"
              id="joiningLetter"
              accept="image/*,application/pdf"
              onChange={(e) => handleImageUpload(e, "joiningLetter")}
              className="hidden"
            />
            <label
              htmlFor="joiningLetter"
              className="cursor-pointer bg-white border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-50 flex items-center justify-center"
            >
              <svg
                className="w-4 h-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              {formData.joiningLetter ? formData.joiningLetter.name : "Upload Joining Letter"}
            </label>
          </div>
        </div>

        {/* Checklist Items */}
        <div className="space-y-3">
          <h4 className="text-md font-medium text-gray-500">
            Checklist Items
          </h4>
          
          {/* Biometric Access */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="biometricAccess"
              checked={formData.biometricAccess}
              onChange={() => handleCheckboxChange("biometricAccess")}
              className="h-4 w-4 text-gray-500 focus:ring-blue-500 border-gray-300 rounded bg-white"
            />
            <label
              htmlFor="biometricAccess"
              className="ml-2 text-sm text-gray-500"
            >
              Biometric Access
            </label>
          </div>
          {formData.biometricAccess && (
            <div className="mt-2 ml-6 p-3 bg-gray-50 rounded-md">
              <div className="grid grid-cols-1 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    Punch Code
                  </label>
                  <input
                    type="text"
                    name="punchCode"
                    value={formData.punchCode}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                    placeholder="Enter punch code"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Official Email ID */}
          <div className="space-y-3">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="officialEmailId"
                checked={formData.officialEmailId}
                onChange={() => handleCheckboxChange("officialEmailId")}
                className="h-4 w-4 text-gray-500 focus:ring-blue-500 border-gray-300 rounded bg-white"
              />
              <label
                htmlFor="officialEmailId"
                className="ml-2 text-sm text-gray-500"
              >
                Official Email ID
              </label>
            </div>
            {formData.officialEmailId && (
              <div className="mt-2 ml-6 grid grid-cols-1 md:grid-cols-2 gap-3 p-3 bg-gray-50 rounded-md">
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    Email ID
                  </label>
                  <input
                    type="text"
                    name="emailId"
                    value={formData.emailId}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                    placeholder="Enter email ID"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    name="emailPassword"
                    value={formData.emailPassword}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                    placeholder="Enter password"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Assign Assets */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="assignAssets"
              checked={formData.assignAssets}
              onChange={() => handleCheckboxChange("assignAssets")}
              className="h-4 w-4 text-gray-500 focus:ring-blue-500 border-gray-300 rounded bg-white"
            />
            <label
              htmlFor="assignAssets"
              className="ml-2 text-sm text-gray-500"
            >
              Assign Assets
            </label>
          </div>
          {formData.assignAssets && (
            <div className="mt-2 ml-6 grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 bg-gray-50 rounded-md">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-500">
                  Laptop
                </label>
                <input
                  type="text"
                  name="laptop"
                  value={formData.laptop}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                  placeholder="Enter laptop details"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-500">
                  Mobile
                </label>
                <input
                  type="text"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                  placeholder="Enter mobile details"
                />
              </div>
              {/* Manual Image Upload for Company Directory */}
              <div className="col-span-2 space-y-2">
                <label className="block text-sm font-medium text-gray-500">
                  Upload Manual/Document
                </label>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      type="file"
                      id="manualImage"
                      accept="image/*,application/pdf"
                      onChange={(e) => handleImageUpload(e, "manualImage")}
                      className="hidden"
                    />
                    <label
                      htmlFor="manualImage"
                      className="cursor-pointer bg-white border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-50 flex items-center"
                    >
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                      </svg>
                      {formData.manualImage
                        ? "Change Manual"
                        : formData.manualImageUrl
                        ? "Replace Manual"
                        : "Upload Manual"}
                    </label>
                  </div>
                  {formData.manualImageUrl && !formData.manualImage && (
                    <div className="mt-2">
                      <img
                        src={formData.manualImageUrl}
                        alt="Existing Manual"
                        className="h-32 w-full object-contain rounded border"
                        onError={(e) => {
                          e.target.style.display = "none";
                        }}
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Current manual image
                      </p>
                    </div>
                  )}
                  {formData.manualImage && (
                    <div className="mt-2">
                      <img
                        src={URL.createObjectURL(formData.manualImage)}
                        alt="New Manual"
                        className="h-32 w-full object-contain rounded border"
                      />
                      <p className="text-xs text-green-600 mt-1">
                        New manual image selected
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Form Actions */}
        <div className="flex justify-end space-x-2 pt-4">
          <button
            type="button"
            onClick={() => setShowModal(false)}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-500 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className={`px-4 py-2 text-white bg-indigo-700 rounded-md hover:bg-indigo-800 min-h-[42px] flex items-center justify-center ${
              submitting ? "opacity-90 cursor-not-allowed" : ""
            }`}
            disabled={submitting}
          >
            {submitting ? (
              <div className="flex items-center">
                <svg
                  className="animate-spin h-4 w-4 text-white mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <span>Submitting...</span>
              </div>
            ) : (
              "Submit"
            )}
          </button>
        </div>
      </form>
    </div>
  </div>
)}
    </div>
  );
};

export default AfterJoiningWork;