


import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import JournalFormModal from "../components/JournalFormModal";
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
  Square,
  Circle,
  MoreHorizontal,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function JournalList() {
  const { user, setUser } = useContext(UserContext);
  const [journals, setJournals] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingJournal, setEditingJournal] = useState(null);
  const [selectedSidebar, setSelectedSidebar] = useState(0);

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
      setShowModal(false);
      loadJournals();
    });
  };

  // Sidebar items
  const sidebarItems = [
    {
      icon: <Pencil className="w-5 h-5" />, label: "Label", filled: true,
    },
    {
      icon: <Star className="w-5 h-5" />, label: "Label", filled: false,
    },
    {
      icon: <StarOff className="w-5 h-5" />, label: "Label", filled: false,
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
    <div className="min-h-screen bg-[#f3edf7] flex">
      {/* Sidebar */}
      <aside className="w-24 bg-[#ede7f6] flex flex-col items-center py-4 space-y-2">
        {sidebarItems.map((item, idx) => (
          <button
            key={idx}
            className={`flex flex-col items-center w-full py-2 rounded-xl mb-2 transition-all ${
              selectedSidebar === idx
                ? "bg-[#eaddff] text-black"
                : "hover:bg-[#eaddff]/60 text-gray-500"
            }`}
            onClick={() => setSelectedSidebar(idx)}
          >
            <span
              className={`flex items-center justify-center w-10 h-10 rounded-full mb-1 ${
                selectedSidebar === idx ? "bg-[#d0bcff]" : "bg-transparent"
              }`}
            >
              {item.icon}
            </span>
            <span className="text-xs font-medium">{item.label}</span>
          </button>
        ))}
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-full hover:bg-[#eaddff]">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-2xl font-bold">Label</h1>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-full hover:bg-[#eaddff]">
              <Calendar className="w-5 h-5" />
            </button>
            <button className="p-2 rounded-full hover:bg-[#eaddff]">
              <Paperclip className="w-5 h-5" />
            </button>
            <button className="p-2 rounded-full hover:bg-[#eaddff]">
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Featured Journals */}
        <div className="flex space-x-4 overflow-x-auto mb-6 pb-2">
          {[0, 1, 2, 3, 4].map((idx) => (
            <div
              key={idx}
              className="min-w-[150px] h-[120px] bg-[#ece6f0] rounded-2xl flex flex-col items-center justify-center space-y-2"
            >
              <Shapes className="w-8 h-8 opacity-40" />
              <div className="flex gap-2">
                <Circle className="w-6 h-6 opacity-30" />
                <Square className="w-6 h-6 opacity-30" />
              </div>
            </div>
          ))}
          <button className="min-w-[60px] h-[120px] flex items-center justify-center text-[#6750a4] font-medium hover:underline bg-transparent">
            Show all
          </button>
        </div>

        {/* List Section */}
        <div className="space-y-4">
          <div className="flex items-center mb-2">
            <h2 className="text-lg font-semibold mr-2">Featured</h2>
            <ArrowLeft className="w-4 h-4 rotate-180 text-gray-400" />
          </div>
          {Array.isArray(journals) && journals.map(j => (
            <div
              key={j.id}
              className="bg-white p-4 rounded-lg shadow-sm flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#ece6f0] rounded-lg flex items-center justify-center">
                  <Shapes className="w-6 h-6 opacity-40" />
                </div>
                <div>
                  <h3 className="font-medium">{j.title}</h3>
                  <p className="text-sm text-gray-600">
                    {j.content?.substring(0, 60) || "Supporting line text lorem ipsum dolor sit amet, consectetur."}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setEditingJournal(j);
                    setShowModal(true);
                  }}
                  className="text-gray-500 hover:text-black px-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(j.id)}
                  className="text-gray-500 hover:text-red-500 px-2"
                >
                  Delete
                </button>
                <button className="p-2 rounded-full hover:bg-[#eaddff]">
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Add Button */}
        <button
          onClick={() => {
            setEditingJournal(null);
            setShowModal(true);
          }}
          className="mt-6 bg-black text-white px-5 py-2 rounded-lg hover:bg-gray-800 transition"
        >
          Add Journal
        </button>

        {showModal && (
          <JournalFormModal
            journal={editingJournal}
            onClose={() => setShowModal(false)}
            onSuccess={handleSuccess}
          />
        )}
      </main>
    </div>
  );
}


