import { useNavigate } from "react-router-dom";

const GoBackButton = ({ loading, navigatePath }) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center gap-4 mb-4">
      <button
        type="button"
        disabled={loading}
        onClick={() => navigate(navigatePath)}
        className="flex items-center px-4 py-2 text-blue-600 bg-blue-50 rounded-lg shadow hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-5 h-5 mr-2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
        {loading ? "Going Back..." : "Back"}
      </button>
    </div>
  );
};
export default GoBackButton;
