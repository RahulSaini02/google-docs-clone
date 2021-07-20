import Button from "@material-tailwind/react/Button";
import Icon from "@material-tailwind/react/Icon";
import Modal from "@material-tailwind/react/Modal";
import ModalBody from "@material-tailwind/react/ModalBody";
import ModalFooter from "@material-tailwind/react/ModalFooter";

import Image from "next/image";
import { useSession, getSession } from "next-auth/client";
import firebase from "firebase";
import { useCollectionOnce } from "react-firebase-hooks/firestore";

import Header from "../components/Header";
import Login from "../components/Login";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import DocumentRow from "../components/DocumentRow";

export default function Home() {
  const [session] = useSession();
  if (!session) return <Login />;

  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showRenameModal, setShowRenameModal] = useState(false);
  const [docId, setDocId] = useState(null);

  const [input, setInput] = useState("");

  const [snapshot] = useCollectionOnce(
    db
      .collection("userDocs")
      .doc(session.user.email)
      .collection("docs")
      .orderBy("timestamp", "desc")
  );

  const [files, setFiles] = useState([]);

  useEffect(() => {
    snapshot?.docs.map((doc) => setFiles((files) => [...files, doc]));
  }, [snapshot]);

  // Create Document
  const createDocument = () => {
    if (!input) return;

    db.collection("userDocs").doc(session.user.email).collection("docs").add({
      fileName: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setInput("");
    setShowModal(false);
  };

  // Delete Document
  const deleteDocument = () => {
    db.collection("userDocs")
      .doc(session.user.email)
      .collection("docs")
      .doc(docId)
      .delete();

    setDocId(null);
    setShowDeleteModal(false);
  };

  // Rename Document
  const renameDocument = () => {
    db.collection("userDocs")
      .doc(session.user.email)
      .collection("docs")
      .doc(docId)
      .set(
        {
          fileName: input,
        },
        {
          merge: true,
        }
      );
    setDocId(null);
    setShowRenameModal(false);
  };

  const modal = (
    <Modal size="sm" active={showModal} toggler={() => setShowModal(false)}>
      <ModalBody>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          type="text"
          className="outline-none w-full"
          placeholder="Enter name of document..."
          onKeyDown={(e) => e.key === "Enter" && createDocument()}
        />
      </ModalBody>
      <ModalFooter>
        <Button
          color="blue"
          buttonType="link"
          onClick={() => setShowModal(false)}
          ripple="dark"
        >
          Cancel
        </Button>
        <Button color="blue" onClick={() => createDocument()} ripple="light">
          Create
        </Button>
      </ModalFooter>
    </Modal>
  );

  const deleteModal = (
    <Modal
      size="sm"
      active={showDeleteModal}
      toggler={() => setShowDeleteModal(false)}
    >
      <ModalBody>
        <h2>Do you want to delete this document?</h2>
      </ModalBody>
      <ModalFooter>
        <Button
          color="blue"
          buttonType="link"
          onClick={() => setShowDeleteModal(false)}
          ripple="dark"
        >
          Cancel
        </Button>
        <Button color="blue" onClick={() => deleteDocument()} ripple="light">
          Delete
        </Button>
      </ModalFooter>
    </Modal>
  );

  const renameModal = (
    <Modal
      size="sm"
      active={showRenameModal}
      toggler={() => setShowRenameModal(false)}
    >
      <ModalBody>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          type="text"
          className="outline-none w-full"
          placeholder="Enter name of document..."
          onKeyDown={(e) => e.key === "Enter" && renameDocument()}
        />
      </ModalBody>
      <ModalFooter>
        <Button
          color="blue"
          buttonType="link"
          onClick={() => setShowRenameModal(false)}
          ripple="dark"
        >
          Cancel
        </Button>
        <Button color="blue" onClick={() => renameDocument()} ripple="light">
          Rename
        </Button>
      </ModalFooter>
    </Modal>
  );

  return (
    <div className="w-[100%]">
      <Header />

      {modal}
      {deleteModal}
      {renameModal}

      <section className="bg-[#F8F9FA] pb-10 px-10">
        <div className="max-w-3xl mx-auto">
          <div className="py-6 flex items-center justify-between">
            <h2 className="text-gray-700 text-lg">Start a new document</h2>
            <Button
              color="gray"
              buttonType="outline"
              rounded={true}
              iconOnly={true}
              ripple="dark"
              className="h-16 w-16 border-0"
            >
              <Icon name="more_vert" size="2xl" color="gray" />
            </Button>
          </div>
          <div>
            <div
              className="relative h-36 w-28 cursor-pointer border-2 hover:border-blue-700"
              onClick={() => setShowModal(true)}
            >
              <Image src="https://links.papareact.com/pju" layout="fill" />
            </div>
            <p className="ml-2 mt-2 font-semibold text-sm text-gray-700">
              Blank
            </p>
          </div>
        </div>
      </section>
      <section className="bg-white px-10 md:px-0">
        <div className="max-w-3xl mx-auto py-8">
          <div className="flex items-center pb-5 justify-between text-gray-700 text-sm">
            <h2 className="font-medium flex-grow">My Documents</h2>
            <div className="flex items-center">
              <p className="mr-5">Date Created</p>
              <Icon name="folder" size="3xl" color="gray" />
            </div>
          </div>
          {files?.map((doc) => (
            <DocumentRow
              key={doc.id}
              id={doc.id}
              fileName={doc.data().fileName}
              timestamp={doc.data().timestamp}
              deleteModal={setShowDeleteModal}
              renameModal={setShowRenameModal}
              setDocId={setDocId}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}
