// import React, { useContext, useState } from "react";
// import { DeleteRounded, ImageOutlined } from "@mui/icons-material";
// import { createPortal } from "react-dom";
// import { doc, updateDoc } from "firebase/firestore";
// import { auth, db } from "../firebase";
// import { useAuthState } from "react-firebase-hooks/auth";

// function EditArchive({ selectedNote, noteEdit, isEditArchive, setIsEditArchive }) {
//   const [title, setTitle] = useState(selectedNote.title);
//   const [text, setText] = useState(selectedNote.text);
//   const [noteImg, setNoteImg] = useState(selectedNote.image)
//   const [user] = useAuthState(auth)
//   // update note content
//   function HandleUpdate() {
//     // noteEdit.map((noteItem) => {
//     //   if (noteItem.id === selectedNote.id) {
//     //     noteItem.title = title
//     //     noteItem.text = text
//     //     noteItem.image = noteImg
//     //   }
//     // })
//     updateDoc(doc(db, `users/${user?.uid}/archiveNotes/${selectedNote.id}`), {
//       id: selectedNote.id,
//       image: noteImg,
//       text: text,
//       title: title,
//     })
//     setIsEditArchive(!isEditArchive);
//   }
//   // update image
//   function HandleNoteImage(e) {
//     const filepath = URL.createObjectURL(e.target.files[0])
//     setNoteImg(filepath)
//     // noteEdit.map((noteItem) => {
//     //   if (noteItem.id === selectedNote.id) {
//     //     noteItem.image = noteImg
//     //   }
//     // })
//     updateDoc(doc(db, `users/${user?.uid}/notes/${selectedNote.id}`), {
//       id: selectedNote.id,
//       image: noteImg,
//       text: text,
//       title: title,
//     })
//   }

//   return (
//     createPortal(
//       <div className="edit-note pin-note" onClick={() => setIsEditArchive(!isEditArchive)}>
//         <div className="edit-box" onClick={(e) => e.stopPropagation()}>
//           <div className="edit-input">
//             {
//               noteImg &&
//               <div className="update-note-img">
//                 <img src={noteImg} alt="" />
//                 <div className="edit-btns">
//                   <div className="tool-icon">
//                     <input type="file" id="image" className="img-input" onChange={(e) => HandleNoteImage(e, selectedNote)} />
//                     <ImageOutlined className="icon" style={{ fontSize: "1.3rem" }} />
//                   </div>
//                   <div className="tool-icon" onClick={() => setNoteImg('')}>
//                     <DeleteRounded className="icon" style={{ fontSize: "1.3rem" }} />
//                   </div>
//                 </div>
//               </div>
//             }
//             <form>
//               <input
//                 id="update-title"
//                 onChange={(e) => setTitle(e.target.value)}
//                 name="title"
//                 value={title}
//                 placeholder="Title"/>
//               <textarea
//                 id="modalContent"
//                 onChange={(e) => setText(e.target.value)}
//                 value={text}
//                 name="content"
//                 placeholder="Add a note..."
//                 rows="4"/>
//             </form>
//           </div>
//           <div className="update-btn">
//             <button onClick={HandleUpdate} >Close</button>
//           </div>
//         </div>
//       </div>,
//       document.getElementById('portal')
//     )
//   );
// }

// export default EditArchive;
