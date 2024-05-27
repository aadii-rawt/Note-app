import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../Context/DataContext";
import PinedNotes from "./PinedNotes";
import EditNote from "./EditNote";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

function PinNotes({ HandleEditeNote }) {
  const { pinNotes, setPinNotes, searchQuery } = useContext(DataContext);

  const [user] = useAuthState(auth);
  useEffect(() => {
    // fetch data from database
    const notesQuery = query(
      collection(db, `users/${user?.uid}/pinNotes`),
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
      setPinNotes(notesData);
    });
    return () => unsubscribe();
  }, [db, user]);

  const [isEditPintNote, setIsEditPinNote] = useState(false);
  const [selectedNote, setSelectedNote] = useState({});
  function HandleEditeNote(note) {
    setIsEditPinNote(!isEditPintNote);
    setSelectedNote(note);
  }
  // change note theme
  const colors = [
    "#E3DCD1",
    "#D0E4D0",
    "#A7D3C8",
    "#CAB5D3",
    "#E9D3CF",
    "#fff",
  ];
  function handleColorChange(note, color) {
    updateDoc(doc(db, `users/${user?.uid}/pinNotes/${note.id}`), {
      color: color,
    });
  }
  return (
    <>
      <div>
        {pinNotes.length > 0 && (
          <>
            <p className="note-title" style={{ color: "var(--text-color" }}>
              PINNED
            </p>
            <div className="notes">
              {pinNotes
                .filter((note) => note.text.includes(searchQuery))
                .map((note, index) => {
                  return (
                    <PinedNotes
                      key={index}
                      note={note}
                      HandleEditeNote={HandleEditeNote}
                      onChangeColor={handleColorChange}
                      colors={colors}
                    />
                  );
                })}
            </div>
          </>
        )}
      </div>
      {isEditPintNote && (
        <EditNote
          path="pinNotes"
          selectedEditNote={selectedNote}
          isEditNote={isEditPintNote}
          setIsEditNote={setIsEditPinNote}
        />
      )}
    </>
  );
}

export default PinNotes;
