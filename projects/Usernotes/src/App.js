import { useState, useMemo, useRef, useEffect } from "react";

const categories = ["Personal", "Home", "Business"];

export default function App() {
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem("notes");
    return saved ? JSON.parse(saved) : [];
  });

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("Personal");
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");

  const titleRef = useRef(null);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const filteredNotes = useMemo(() => {
    return notes.filter(note =>
      note.title.toLowerCase().includes(search.toLowerCase()) ||
      note.content.toLowerCase().includes(search.toLowerCase())
    );
  }, [notes, search]);

  const saveNote = () => {
    if (!title || !content) return;

    if (editId) {
      setNotes(notes.map(note => note.id === editId ? { ...note, title, content, category } : note));
      setEditId(null);
    } else {
      setNotes([...notes, { id: Date.now(), title, content, category, date: new Date().toLocaleDateString() }]);
    }

    setTitle("");
    setContent("");
    setCategory("Personal");
    titleRef.current.focus();
  };

  const editNote = (note) => {
    setTitle(note.title);
    setContent(note.content);
    setCategory(note.category);
    setEditId(note.id);
    titleRef.current.focus();
  };

  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* <====> */}
      <div className="bg-white shadow p-4 flex flex-col sm:flex-row gap-4 items-center">
        <input
          type="text"
          placeholder="Search notes..."
          className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

     {/* <====> */}
      <div className="max-w-6xl mx-auto p-6">
        <div className="bg-white p-6 rounded-xl shadow mb-6">
          <input
            ref={titleRef}
            type="text"
            placeholder="Title"
            className="w-full mb-3 px-4 py-2 border rounded-lg"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            placeholder="Content"
            className="w-full mb-3 px-4 py-2 border rounded-lg"
            rows="3"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>

          <select
            className="w-full mb-3 px-4 py-2 border rounded-lg"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          <button
            onClick={saveNote}
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
          >
            {editId ? "Update Note" : "Add Note"}
          </button>
        </div>

          {/* <====> */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredNotes.map(note => (
            <div key={note.id} className="bg-white p-5 rounded-xl shadow relative">
              <span className="text-xs bg-blue-100 text-blue-600 px-3 py-1 rounded-full">{note.category}</span>
              <h3 className="text-lg font-semibold mt-2">{note.title}</h3>
              <p className="text-gray-500 mb-4">{note.content}</p>
              <div className="text-sm text-gray-400 mb-2">{note.date}</div>

              <div className="flex gap-2 absolute top-3 right-3">
                <button onClick={() => editNote(note)} className="text-blue-500">✎</button>
                <button onClick={() => deleteNote(note.id)} className="text-red-500">✕</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
