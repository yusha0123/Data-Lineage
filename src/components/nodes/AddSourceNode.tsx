export default function AddSourceNode() {
  return (
    <div className="w-60 h-32 bg-green-100 border-2 border-dashed border-green-500 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-green-200">
      <div className="w-12 h-12 rounded-full flex border-2 border-gray-600 items-center justify-center mb-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 text-gray-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
      </div>
      <span className="text-gray-700 font-semibold">ADD SOURCE</span>
    </div>
  );
}
