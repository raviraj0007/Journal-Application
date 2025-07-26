import React from "react";

export default function JournalCard({ journal, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-2xl p-3 md:p-5 shadow-md hover:shadow-xl transition flex flex-col justify-between">
      <div>
        <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2 line-clamp-2">{journal.title}</h3>
        <p className="text-gray-600 text-xs md:text-sm mb-3 md:mb-4 line-clamp-3">{journal.content}</p>
        <p className="text-xs text-gray-400">{journal.date}</p>
      </div>
      <div className="mt-3 md:mt-4 flex gap-2 md:gap-3 justify-end">
        <button
          onClick={onEdit}
          className="text-xs md:text-sm bg-blue-100 text-blue-800 px-2 md:px-3 py-1 md:py-2 rounded-full hover:bg-blue-200 transition-colors"
        >
          ✏️ Edit
        </button>
        <button
          onClick={onDelete}
          className="text-xs md:text-sm bg-red-100 text-red-800 px-2 md:px-3 py-1 md:py-2 rounded-full hover:bg-red-200 transition-colors"
        >
          🗑️ Delete
        </button>
      </div>
    </div>
  );
}
