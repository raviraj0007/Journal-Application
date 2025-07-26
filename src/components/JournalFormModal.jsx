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
      className="w-full max-w-2xl mx-auto bg-white/80 border border-[#eaddff] rounded-lg px-4 py-4 md:px-6 md:py-5 mb-4 flex flex-col gap-3 md:gap-4 shadow-none"
      style={{ boxShadow: "0 2px 8px 0 rgba(104, 80, 164, 0.04)" }}
    >
      <h2 className="text-base md:text-lg font-semibold mb-1 md:mb-2 text-[#6750a4]">
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
          className="w-full px-3 md:px-4 py-2 md:py-3 text-sm md:text-base border border-[#d0bcff] rounded-md focus:outline-none focus:ring-2 focus:ring-[#d0bcff] bg-[#f6f2ff] text-gray-900 transition"
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
          rows={3}
          className="w-full px-3 md:px-4 py-2 md:py-3 text-sm md:text-base border border-[#d0bcff] rounded-md focus:outline-none focus:ring-2 focus:ring-[#d0bcff] bg-[#f6f2ff] text-gray-900 transition resize-none"
          placeholder="Write your journal entry..."
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Sentiment
        </label>
        <div className="flex gap-2 md:gap-4 mt-1 justify-center md:justify-start">
          {SENTIMENTS.map((s) => (
            <div key={s.value} className="flex flex-col items-center">
              <button
                type="button"
                className={`text-2xl md:text-3xl px-1 md:px-2 py-1 rounded-full border-2 transition focus:outline-none ${
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
      <div className="flex flex-col sm:flex-row justify-end gap-2 md:gap-3 mt-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 md:px-5 py-2 md:py-3 rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 transition font-medium text-sm md:text-base order-2 sm:order-1"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 md:px-5 py-2 md:py-3 rounded-md bg-[#6750a4] text-white font-semibold hover:bg-[#4f378b] transition text-sm md:text-base order-1 sm:order-2"
        >
          {journal ? "Update" : "Create"}
        </button>
      </div>
    </form>
  );
}
