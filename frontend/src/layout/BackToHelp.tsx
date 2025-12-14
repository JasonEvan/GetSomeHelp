import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function BackToHelp() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/help")}
      className="group flex items-center gap-2 text-sm text-gray-600 hover:text-[#7C3AED] transition-colors mb-6"
    >
      <ArrowLeft 
        size={18} 
        className="transition-transform group-hover:-translate-x-1" 
      />
      Back to Help
    </button>
  );
}