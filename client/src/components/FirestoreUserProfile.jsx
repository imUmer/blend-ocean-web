import React, { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase"; // Import Firestore instance

const FirestoreUserProfile = ({ documentId }) => {
  const [documentData, setDocumentData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch the profile image data
  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const docRef = doc(db, "images", documentId); // Replace with your collection name and document ID
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setDocumentData(docSnap.data()); // Save document data
        } else {
          console.error("No such document!");
        }
      } catch (error) {
        console.error("Error fetching document: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDocument();
  }, [documentId]);

  return (
    <div className="flex items-center justify-center">
      <img
            src={
              documentData?.image ||
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwW4kzIb_8SII6G7Bl4BCPfRmLZVVtc2kW6g&s"
            }
            alt="Profile"
            className={`border cursor-pointer object-fit border-lime-500 h-28 rounded-full w-28 hover:opacity-80 hover:shadow-xl 
              ${loading ? "cursor-not-allowed" : ""}
              `}
          />
      <div>
      </div>
    </div>
  );
};

export default FirestoreUserProfile;
