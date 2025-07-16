import React, { useState, useEffect } from "react";

export default function JournalFormModal({ journal, onClose, onSuccess }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (journal) {
      setTitle(journal.title);
      setContent(journal.content);
    } else {
      setTitle("");
      setContent("");
    }
  }, [journal]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newJournal = {
      title,
      content,
      date: new Date().toISOString().split("T")[0],
      id: journal?.id || Math.random().toString(36).substr(2, 9), // temporary ID
    };

    onSuccess(newJournal);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">
          {journal ? "Edit Journal" : "Add New Journal"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Content
            </label>
            <textarea
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={4}
              className="mt-1 w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              {journal ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
