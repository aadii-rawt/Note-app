import React, { useContext, useEffect, useState } from "react";
import "../Components/CSS/Home.css";
import TextInput from "../Components/TextInput";
import Notes from "../Components/Notes";
import EmptyNotes from "../Components/EmptyNotes";
import PinNotes from "../Components/PinNotes";
import EditNote from "../Components/EditNote";
import { DataContext } from "../Context/DataContext";
import { LightbulbOutlined } from "@mui/icons-material";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import ShimmerEffect from "../Components/ShimmerEffect";
import { useNavigate } from "react-router-dom";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";

function Home() {
  const [loading, setLoading] = useState(true);
  const { notes, setNotes, pinNotes, searchQuery } = useContext(DataContext);
  const [user] = useAuthState(auth);

  const navigate = useNavigate();
  if (!user) {
    navigate("/login");
  }

  useEffect(() => {
    // fetch data from database
    const notesQuery = query(
      collection(db, `users/${user?.uid}/notes`),
      orderBy("timestamp", "desc")
    );
    const unsubscribe = onSnapshot(notesQuery, (snapshot) => {
      const notesData = snapshot.docs.map((doc) => ({
        id: doc.id,
        image: doc.data().image,
        text: doc.data().text,
        title: doc.data().title,
        color: doc.data().color,
        timestamp: doc.data().timestamp,
      }));
      setNotes(notesData);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [db, user]);

  const [isEditNote, setIsEditNote] = useState(false);
  const [selectedEditNote, setselectedEditNote] = useState({});
  function HandleEditeNote(note) {
    setIsEditNote(!isEditNote);
    setselectedEditNote(note);
  }

  const colors = [
    "#E3DCD1",
    "#D0E4D0",
    "#A7D3C8",
    "#CAB5D3",
    "#E9D3CF",
    "#fff",
  ];
  function handleColorChange(note, color) {
    updateDoc(doc(db, `users/${user?.uid}/notes/${note.id}`), {
      color: color,
    });
  }
  return (
    <main>
      {loading ? (
        <ShimmerEffect />
      ) : (
        <>
          <TextInput />
          <PinNotes />
          {pinNotes.length > 0 && (
            <p className="note-title" style={{ color: "var(--text-color" }}>
              OTHERS
            </p>
          )}
          {notes.length > 0 || pinNotes.length > 0 ? (
            <div className="notes">
              {notes
                .filter((note) => note.text.includes(searchQuery))
                .map((note, index) => {
                  return (
                    <Notes
                      key={index}
                      note={note}
                      HandleEditeNote={HandleEditeNote}
                      onChangeColor={handleColorChange}
                      colors={colors}
                    />
                  );
                })}
            </div>
          ) : (
            <EmptyNotes
              icon={
                <LightbulbOutlined
                  style={{ fontSize: "10rem", fill: "#E5E5E5" }}
                />
              }
              title="Notes you add appear here"
            />
          )}
          {isEditNote && (
            <EditNote
              path="notes"
              selectedEditNote={selectedEditNote}
              isEditNote={isEditNote}
              setIsEditNote={setIsEditNote}
            />
          )}
        </>
      )}
    </main>
  );
}

export default Home;
