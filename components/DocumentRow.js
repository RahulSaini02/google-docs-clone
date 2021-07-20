import Button from "@material-tailwind/react/Button";
import Icon from "@material-tailwind/react/Icon";

import { useRouter } from "next/dist/client/router";
import { useState } from "react";

function DocumentRow({
  id,
  fileName,
  timestamp,
  deleteModal,
  renameModal,
  setDocId,
}) {
  const router = useRouter();
  const [dropDown, setDropDown] = useState(false);

  const deleteHandler = () => {
    setDocId(id);
    deleteModal(true);
  };

  const renameHandler = () => {
    setDocId(id);
    renameModal(true);
  };
  return (
    <div className="relative flex items-center p-2 rounded-lg hover:bg-gray-100 cursor-pointer text-sm">
      <Icon name="article" size="2xl" color="blue" />
      <p
        className="flex-grow pl-5 w-10 pr-10 truncate"
        onClick={() => router.push(`doc/${id}`)}
      >
        {fileName}
      </p>
      <p className="pr-5">{timestamp?.toDate().toLocaleDateString()}</p>
      <Button
        color="gray"
        buttonType="outline"
        rounded={true}
        iconOnly={true}
        ripple="dark"
        className="dropdown relative h-16 w-16 border-0 hover:block"
        onClick={() => setDropDown(!dropDown)}
      >
        <Icon name="more_vert" size="2xl" color="gray" />
        <ul className="dropdown-menu absolute bottom-10 -left-12 hidden text-gray-700 pt-1">
          <li onClick={() => renameHandler()}>
            <a
              className="rounded-t bg-gray-200 text-gray-600 hover:text-white hover:bg-blue-400 py-2 px-4 block whitespace-no-wrap"
              href="#"
            >
              Rename
            </a>
          </li>
          <li onClick={() => deleteHandler()}>
            <a
              className="bg-gray-200 text-gray-600 hover:text-white hover:bg-blue-400 py-2 px-4 block whitespace-no-wrap"
              href="#"
            >
              Delete
            </a>
          </li>
        </ul>
      </Button>
    </div>
  );
}

export default DocumentRow;
