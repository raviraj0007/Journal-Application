


import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import JournalForm from "../components/JournalFormModal";
import {
  getJournals,
  addJournal,
  updateJournal,
  deleteJournal,
} from "../api/journalApi";
import {
  Pencil,
  Star,
  StarOff,
  ArrowLeft,
  Calendar,
  Paperclip,
  MoreVertical,
  Shapes,
  MoreHorizontal,
  Menu,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function JournalList() {
  const { user, setUser } = useContext(UserContext);
  const [journals, setJournals] = useState([]);
  const [editingJournal, setEditingJournal] = useState(false);
  const [selectedSidebar, setSelectedSidebar] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/signup");
    }
  }, [user, navigate]);

  useEffect(() => {
    loadJournals();
    // eslint-disable-next-line
  }, [user]);

  const loadJournals = async () => {
    if (user) {
      try {
        const response = await getJournals(); // No username argument
        setJournals(Array.isArray(response.data) ? response.data : []); // Use response.data
      } catch (err) {
        setJournals([]);
        if (err.response && err.response.status === 401) {
          setUser(null); // log out
          navigate("/signup"); // or navigate("/login")
        }
      }
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this journal?")) {
      deleteJournal(id).then(loadJournals);
    }
  };

  const handleSuccess = (journalData) => {
    const action =
      journalData.id && journals.find((j) => j.id === journalData.id)
        ? updateJournal
        : addJournal;
    action(journalData).then(() => {
      setEditingJournal(false);
      loadJournals();
    });
  };

  // Sidebar items
  const sidebarItems = [
    {
      icon: <Pencil className="w-4 h-4 md:w-5 md:h-5" />, label: "Journals", filled: true,
    },
    {
      icon: <Star className="w-4 h-4 md:w-5 md:h-5" />, label: "favorite", filled: false,
    },
    {
      icon: <StarOff className="w-4 h-4 md:w-5 md:h-5" />, label: "Hide", filled: false,
    },
  ];

  // If not logged in, show message
  if (!user) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="card shadow p-4">
          <h3>User not present, please sign up</h3>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f3edf7] flex flex-col md:flex-row">
      {/* Mobile Menu Button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-full bg-white shadow-lg hover:bg-gray-100 transition-colors"
        >
          {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar - Mobile Overlay */}
      <div className={`md:hidden fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity ${
        sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`} onClick={() => setSidebarOpen(false)} />

      {/* Sidebar */}
      <aside className={`fixed md:relative inset-y-0 left-0 z-40 w-20 md:w-24 bg-[#ede7f6] flex flex-col items-center py-4 space-y-2 transform transition-transform duration-300 ease-in-out ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      }`}>
        {sidebarItems.map((item, idx) => (
          <button
            key={idx}
            className={`flex flex-col items-center w-full py-2 rounded-xl mb-2 transition-all ${
              selectedSidebar === idx
                ? "bg-[#eaddff] text-black"
                : "hover:bg-[#eaddff]/60 text-gray-500"
            }`}
            onClick={() => {
              setSelectedSidebar(idx);
              setSidebarOpen(false); // Close sidebar on mobile after selection
            }}
          >
            <span
              className={`flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full mb-1 ${
                selectedSidebar === idx ? "bg-[#d0bcff]" : "bg-transparent"
              }`}
            >
              {item.icon}
            </span>
            <span className="text-xs font-medium hidden md:block">{item.label}</span>
          </button>
        ))}
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-6 pt-16 md:pt-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-full hover:bg-[#eaddff]">
              <ArrowLeft className="w-5 h-5 md:w-6 md:h-6" />
            </button>
            <h1 className="text-xl md:text-2xl font-bold">Label</h1>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-full hover:bg-[#eaddff]">
              <Calendar className="w-4 h-4 md:w-5 md:h-5" />
            </button>
            <button className="p-2 rounded-full hover:bg-[#eaddff]">
              <Paperclip className="w-4 h-4 md:w-5 md:h-5" />
            </button>
            <button className="p-2 rounded-full hover:bg-[#eaddff]">
              <MoreVertical className="w-4 h-4 md:w-5 md:h-5" />
            </button>
          </div>
        </div>

        {/* Sentiment Header and Emoji Selector */}
        <div className="flex flex-col items-center justify-center mb-6 md:mb-10 pb-4">
          <h2 className="text-2xl md:text-3xl font-bold text-[#6750a4] mb-4 text-center">How's your day?</h2>
          <div className="flex gap-4 md:gap-8 flex-wrap justify-center">
            <div className="flex flex-col items-center">
              <button
                type="button"
                className="text-4xl md:text-6xl px-4 md:px-6 py-2 md:py-3 rounded-full border-4 border-transparent hover:border-[#6750a4] focus:outline-none transition-all duration-150 shadow-md hover:scale-110"
                onClick={() => setEditingJournal({ title: '', content: '', sentiment: 'HAPPY' })}
                aria-label="Happy"
              >
                😀
              </button>
              <span className="text-sm md:text-base mt-2 text-[#6750a4] font-semibold">Happy</span>
            </div>
            <div className="flex flex-col items-center">
              <button
                type="button"
                className="text-4xl md:text-6xl px-4 md:px-6 py-2 md:py-3 rounded-full border-4 border-transparent hover:border-[#6750a4] focus:outline-none transition-all duration-150 shadow-md hover:scale-110"
                onClick={() => setEditingJournal({ title: '', content: '', sentiment: 'SAD' })}
                aria-label="Sad"
              >
                😢
              </button>
              <span className="text-sm md:text-base mt-2 text-[#6750a4] font-semibold">Sad</span>
            </div>
            <div className="flex flex-col items-center">
              <button
                type="button"
                className="text-4xl md:text-6xl px-4 md:px-6 py-2 md:py-3 rounded-full border-4 border-transparent hover:border-[#6750a4] focus:outline-none transition-all duration-150 shadow-md hover:scale-110"
                onClick={() => setEditingJournal({ title: '', content: '', sentiment: 'ANGRY' })}
                aria-label="Angry"
              >
                😡
              </button>
              <span className="text-sm md:text-base mt-2 text-[#6750a4] font-semibold">Angry</span>
            </div>
            <div className="flex flex-col items-center">
              <button
                type="button"
                className="text-4xl md:text-6xl px-4 md:px-6 py-2 md:py-3 rounded-full border-4 border-transparent hover:border-[#6750a4] focus:outline-none transition-all duration-150 shadow-md hover:scale-110"
                onClick={() => setEditingJournal({ title: '', content: '', sentiment: 'ANXIOUS' })}
                aria-label="Anxious"
              >
                😰
              </button>
              <span className="text-sm md:text-base mt-2 text-[#6750a4] font-semibold">Anxious</span>
            </div>
          </div>
        </div>

        {/* Inline Add/Edit Form */}
        {editingJournal !== false && (
          <div className="mb-6">
            <JournalForm
              journal={editingJournal || undefined}
              onCancel={() => setEditingJournal(false)}
              onSuccess={handleSuccess}
            />
          </div>
        )}

        {/* List Section */}
        <div className="space-y-4">
          <div className="flex items-center mb-2">
            <h2 className="text-base md:text-lg font-semibold mr-2">Featured</h2>
            <ArrowLeft className="w-3 h-3 md:w-4 md:h-4 rotate-180 text-gray-400" />
          </div>
          {Array.isArray(journals) && journals.map(j => (
            <div
              key={j.id}
              className="bg-white p-3 md:p-4 rounded-lg shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3 md:gap-4 flex-1 min-w-0">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-[#ece6f0] rounded-lg flex items-center justify-center flex-shrink-0">
                  <Shapes className="w-4 h-4 md:w-6 md:h-6 opacity-40" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-sm md:text-base truncate">{j.title}</h3>
                  <p className="text-xs md:text-sm text-gray-600 line-clamp-2">
                    {j.content?.substring(0, 60) || "Supporting line text lorem ipsum dolor sit amet, consectetur."}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={() => {
                    setEditingJournal(j);
                  }}
                  className="text-gray-500 hover:text-black px-2 py-1 text-sm md:text-base"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(j.id)}
                  className="text-gray-500 hover:text-red-500 px-2 py-1 text-sm md:text-base"
                >
                  Delete
                </button>
                <button className="p-1 md:p-2 rounded-full hover:bg-[#eaddff]">
                  <MoreHorizontal className="w-4 h-4 md:w-5 md:h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}


