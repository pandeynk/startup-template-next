"use client";

import { useEffect, useState } from "react";
import { db, collection, getDocs, query, orderBy } from "../../firebase"; // Ensure the path is correct
import { Timestamp } from "firebase/firestore";

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  timestamp: Timestamp;
}

const Contacts = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);

  useEffect(() => {
    const fetchContacts = async () => {
      const q = query(collection(db, "contacts"), orderBy("timestamp", "desc"));
      const querySnapshot = await getDocs(q);
      setContacts(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Contact[]
      );
    };
    fetchContacts();
  }, []);

  return (
    <div className="container mx-auto px-8 py-16">
      <h4 className="mb-8 mt-11 text-2xl font-bold">Contact Queries</h4>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="border-gray-300 border-b-2 px-6 py-3">Name</th>
              <th className="border-gray-300 border-b-2 px-6 py-3">Email</th>
              <th className="border-gray-300 border-b-2 px-6 py-3">Phone</th>
              <th className="border-gray-300 border-b-2 px-6 py-3">Message</th>
              <th className="border-gray-300 border-b-2 px-6 py-3">
                Timestamp
              </th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <tr key={contact.id}>
                <td className="border-gray-200 border-b px-6 py-4">
                  {contact.name}
                </td>
                <td className="border-gray-200 border-b px-6 py-4">
                  {contact.email}
                </td>
                <td className="border-gray-200 border-b px-6 py-4">
                  {contact.phone}
                </td>
                <td className="border-gray-200 border-b px-6 py-4">
                  {contact.message}
                </td>
                <td className="border-gray-200 border-b px-6 py-4">
                  {new Date(contact.timestamp.toDate()).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Contacts;
