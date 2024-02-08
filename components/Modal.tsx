"use client";
import React, { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
} from "./ui/alert-dialog"; // Sesuaikan path sesuai dengan struktur proyek Anda
import { Button } from "./ui/button";

interface ModalProps {
  isOpen: boolean;
}

const CustomModal = () => {
  const [modalRendered, setModalRendered] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isClose, setIsClose] = useState(false);

  useEffect(() => {
    const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile/i.test(
      navigator.userAgent
    );
    // Tampilkan modal saat halaman pertama kali dirender dan modal belum dirender sebelumnya
    if (!modalRendered && !isOpen && !isClose && isMobile) {
      setModalRendered(true);
      setIsOpen(true);
    }
  }, [modalRendered, isOpen, isClose] || []);

  const handleCloseModal = () => {
    setModalRendered(false);
    setIsOpen(false);
    setIsClose(true);
  };
  return (
    <AlertDialog open={modalRendered}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-center">
            Informasi Penting
          </AlertDialogTitle>
        </AlertDialogHeader>

        <AlertDialogDescription>
          <p className="text-center">
            Disarankan agar menggunakan PC/Laptop agar lebih maksimal.
            Dikarenakan masih dalam tahap pengembangan. <br />
            Terima kasih.
          </p>
        </AlertDialogDescription>

        <AlertDialogFooter className="sm:justify-center">
          <AlertDialogTrigger>
            <Button variant="destructive" onClick={handleCloseModal}>
              Tutup
            </Button>
          </AlertDialogTrigger>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CustomModal;
