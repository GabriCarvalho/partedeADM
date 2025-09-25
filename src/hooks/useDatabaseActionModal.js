// src/hooks/useDatabaseActionModal.js
import { useState } from "react";

export const useDatabaseActionModal = () => {
  const [modalInfo, setModalInfo] = useState(null);

  const showDbModal = (title, description) =>
    setModalInfo({ title, description });
  const closeDbModal = () => setModalInfo(null);

  return { modalInfo, showDbModal, closeDbModal };
};
