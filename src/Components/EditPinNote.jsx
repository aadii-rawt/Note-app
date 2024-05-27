// import React, { useContext, useState } from "react";
// import { DeleteRounded, ImageOutlined } from "@mui/icons-material";
// import { createPortal } from "react-dom";
// import { doc, updateDoc } from "firebase/firestore";
// import { useAuthState } from "react-firebase-hooks/auth";
// import { auth, db, imgDb } from "../firebase";
// import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
// import { DataContext } from "../Context/DataContext";
// function EditPinNote({
//   selectedEditNote,
//   isEditNote,
//   setIsEditNote,
// }) {
//   const { handleEditImage } = useContext(DataContext);
//   const [title, setTitle] = useState(selectedEditNote.title);
//   const [text, setText] = useState(selectedEditNote.text);
//   const [noteImg, setNoteImg] = useState(selectedEditNote.image);
//   const [uploadedImg, setUploadedImg] = useState("");
//   const [user] = useAuthState(auth)
//   // update pin note content
//   function HandleUpdate() {
//     updateDoc(doc(db, `users/${user?.uid}/pinNotes/${selectedEditNote.id}`), {
//       id: selectedEditNote.id,
//       image: uploadedImg,
//       text: text,
//       title: title,
//     })
//     setIsEditNote(!isEditNote);
//   }
//   // Update image
//   // async function HandleNoteImage(e) {
//   //   var filepath = e.target.files[0];
//   //   const imgs = ref(imgDb, `imgs/${crypto.randomUUID()}`);
//   //   const data = await uploadBytes(imgs, filepath);
//   //   const val = await getDownloadURL(data.ref);
//   //   setUploadedImg(val);
//   //   setNoteImg(URL.createObjectURL(filepath));
//   // }
//   return createPortal(
//       <div className="edit-note pin-note"
//         onClick={() => setIsEditNote(!isEditNote)}>
//         <div className="edit-box" onClick={(e) => e.stopPropagation()}>
//           <div className="edit-input">
//             {noteImg && (
//               <div className="update-note-img">
//                 <img src={noteImg} alt="" />
//                 <div className="edit-btns">
//                   <div className="tool-icon">
//                     <input
//                       type="file"
//                       id="image"
//                       className="img-input"
//                       onChange={(e) => handleEditImage(e,setUploadedImg,setNoteImg)} />
//                     <ImageOutlined
//                       className="icon"
//                       style={{ fontSize: "1.3rem" }} />
//                   </div>
//                   <div className="tool-icon" onClick={() => setNoteImg("")}>
//                     <DeleteRounded
//                       className="icon"
//                       style={{ fontSize: "1.3rem" }} />
//                   </div>
//                 </div>
//               </div>
//             )}
//             <form>
//               <input
//                 id="update-title"
//                 onChange={(e) => setTitle(e.target.value)}
//                 name="title"
//                 value={title}
//                 placeholder="Title" />
//               <textarea
//                 id="modalContent"
//                 onChange={(e) => setText(e.target.value)}
//                 value={text}
//                 name="content"
//                 placeholder="Add a note..."
//                 rows="4" />
//             </form>
//           </div>
//           <div className="update-btn">
//             <button onClick={HandleUpdate}>Close</button>
//           </div>
//         </div>
//       </div>,
//       document.getElementById("portal")
//     );
// }

// export default EditPinNote;
