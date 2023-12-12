"use client";
import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import Image from "next/image";

const ImageModal = ({ image }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
//   console.log(image)
  return (
    <>
      {/* <Button onPress={onOpen}>Open Modal</Button> */}
      <img
        src={image}
        alt="postimage"
        // width={900}
        // height={900}
        onClick={onOpen}
        className="w-96 h-auto cursor-pointer"
      />
      <Modal
        backdrop="opaque"
        isOpen={isOpen}
        size="full"
        onOpenChange={onOpenChange}
        motionProps={{
          variants: {
            enter: {
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.3,
                ease: "easeOut",
              },
            },
            exit: {
              y: -20,
              opacity: 0,
              transition: {
                duration: 0.2,
                ease: "easeIn",
              },
            },
          },
        }}
      >
        <ModalContent className="bg-none">
          {(onClose) => (
            <>
             {/*  <ModalHeader className="flex flex-col gap-1 bg-none">
                Modal Title
              </ModalHeader> */}
              <ModalBody className="justify-center bg-black">
                <img
                  src={image}
                  alt="ImageContent"
                  // width={900}
                  // height={900}
                  className="w-auto h-auto self-center"
                />
              </ModalBody>
             {/*  <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </ModalFooter> */}
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ImageModal;
