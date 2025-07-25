import React, { useState, useEffect } from "react";

export default function JournalForm({ journal, onCancel, onSuccess }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [sentiment, setSentiment] = useState(null);

  useEffect(() => {
    if (journal) {
      setTitle(journal.title);
      setContent(journal.content);
      setSentiment(journal.sentiment);
    } else {
      setTitle("");
      setContent("");
      setSentiment(null);
    }
  }, [journal]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newJournal = {
      title,
      content,
      date: new Date().toISOString(), // ISO 8601 string for LocalDateTime
      sentiment: sentiment // Use the selected sentiment
    };
    onSuccess(newJournal);
  };

  const SENTIMENTS = [
    { label: "😀", value: "HAPPY", name: "Happy" },
    { label: "😢", value: "SAD", name: "Sad" },
    { label: "😡", value: "ANGRY", name: "Angry" },
    { label: "😰", value: "ANXIOUS", name: "Anxious" },
  ];

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-2xl mx-auto bg-white/80 border border-[#eaddff] rounded-lg px-6 py-5 mb-4 flex flex-col gap-4 shadow-none"
      style={{ boxShadow: "0 2px 8px 0 rgba(104, 80, 164, 0.04)" }}
    >
      <h2 className="text-lg font-semibold mb-2 text-[#6750a4]">
        {journal ? "Edit Journal" : "Add New Journal"}
      </h2>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Title
        </label>
        <input
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 border border-[#d0bcff] rounded-md focus:outline-none focus:ring-2 focus:ring-[#d0bcff] bg-[#f6f2ff] text-gray-900 transition"
          placeholder="Enter journal title"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Content
        </label>
        <textarea
          required
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={4}
          className="w-full px-4 py-2 border border-[#d0bcff] rounded-md focus:outline-none focus:ring-2 focus:ring-[#d0bcff] bg-[#f6f2ff] text-gray-900 transition"
          placeholder="Write your journal entry..."
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Sentiment
        </label>
        <div className="flex gap-4 mt-1">
          {SENTIMENTS.map((s) => (
            <div key={s.value} className="flex flex-col items-center">
              <button
                type="button"
                className={`text-3xl px-2 py-1 rounded-full border-2 transition focus:outline-none ${
                  sentiment === s.value
                    ? "border-[#6750a4] bg-[#ede7f6]"
                    : "border-transparent hover:border-gray-300"
                }`}
                onClick={() => setSentiment(s.value)}
                aria-label={s.value}
              >
                {s.label}
              </button>
              <span className={`text-xs mt-1 ${sentiment === s.value ? "text-[#6750a4] font-semibold" : "text-gray-500"}`}>{s.name}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-end gap-3 mt-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-5 py-2 rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 transition font-medium"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-5 py-2 rounded-md bg-[#6750a4] text-white font-semibold hover:bg-[#4f378b] transition"
        >
          {journal ? "Update" : "Create"}
        </button>
      </div>
    </form>
  );
}
