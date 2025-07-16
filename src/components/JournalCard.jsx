import React from "react";

export default function JournalCard({ journal, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-md hover:shadow-xl transition flex flex-col justify-between">
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{journal.title}</h3>
        <p className="text-gray-600 text-sm mb-4">{journal.content}</p>
        <p className="text-xs text-gray-400">{journal.date}</p>
      </div>
      <div className="mt-4 flex gap-3 justify-end">
        <button
          onClick={onEdit}
          className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full hover:bg-blue-200"
        >
          ✏️ Edit
        </button>
        <button
          onClick={onDelete}
          className="text-sm bg-red-100 text-red-800 px-3 py-1 rounded-full hover:bg-red-200"
        >
          🗑️ Delete
        </button>
      </div>
    </div>
  );
}
