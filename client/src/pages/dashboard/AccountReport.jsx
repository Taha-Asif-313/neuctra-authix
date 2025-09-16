import React from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { FileJson, FileSpreadsheet, FileText, FileDown } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

const AccountReport = () => {
  const { token } = useAuth();

  const downloadReport = async (format) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/admin/report?format=${format}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          responseType: format === "json" ? "json" : "blob", // blob for files
        }
      );

      if (format === "json") {
        console.log(response.data);
        toast.success("Report fetched (check console)");
        return;
      }

      // Create a file download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `admin-report.${format === "excel" ? "xlsx" : format}`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      toast.success(`Report downloaded as ${format}`);
    } catch (err) {
      console.error("Report error:", err);
      toast.error("Failed to download report");
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold text-white">Admin Report</h2>
      <p className="text-gray-400">Download your full admin data report in different formats.</p>

      <div className="flex flex-wrap gap-4">
        <button
          onClick={() => downloadReport("json")}
          className="flex items-center gap-2 px-4 py-2 bg-zinc-800 text-white rounded-lg hover:bg-primary"
        >
          <FileJson size={18} /> JSON
        </button>
        <button
          onClick={() => downloadReport("csv")}
          className="flex items-center gap-2 px-4 py-2 bg-zinc-800 text-white rounded-lg hover:bg-primary"
        >
          <FileText size={18} /> CSV
        </button>
        <button
          onClick={() => downloadReport("excel")}
          className="flex items-center gap-2 px-4 py-2 bg-zinc-800 text-white rounded-lg hover:bg-primary"
        >
          <FileSpreadsheet size={18} /> Excel
        </button>
        <button
          onClick={() => downloadReport("pdf")}
          className="flex items-center gap-2 px-4 py-2 bg-zinc-800 text-white rounded-lg hover:bg-primary"
        >
          <FileDown size={18} /> PDF
        </button>
      </div>
    </div>
  );
};

export default AccountReport;
