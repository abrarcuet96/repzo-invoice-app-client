import axios from "axios";
import React, { useState } from "react";

const PdfViewer = ({ pdfId }) => {
  const [pdfBase64, setPdfBase64] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchPdf = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await axios.get(`/api/pdf/6761a3fa6e18a6b3919ab237`); // Replace with your backend endpoint
      console.log(response);

      const base64Pdf = response.data; // Assuming the API returns a Base64 string
      console.log(base64Pdf);
      setPdfBase64(base64Pdf);
    } catch (err) {
      setError("Failed to fetch the PDF. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const downloadPdf = () => {
    if (!pdfBase64) return;

    // Create a temporary anchor element for download
    const link = document.createElement("a");
    link.href = pdfBase64;
    link.download = "document.pdf";
    link.click();
  };

  return (
    <div className="pdf-viewer">
      <button
        onClick={fetchPdf}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        View PDF
      </button>

      {loading && <p>Loading PDF...</p>}

      {error && <p className="text-red-500">{error}</p>}

      {pdfBase64 && (
        <div className="mt-4">
          <iframe
            src={pdfBase64}
            title="PDF Viewer"
            className="w-full h-[500px] border"
          ></iframe>
          <button
            onClick={downloadPdf}
            className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            Download PDF
          </button>
        </div>
      )}
    </div>
  );
};

export default PdfViewer;
