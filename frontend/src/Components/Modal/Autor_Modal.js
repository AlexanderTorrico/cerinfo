import React from 'react';


import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    useDisclosure
  } from "@chakra-ui/react"
import Autor_Form from '../Form/Autor_Form';

function Modal_Autor () {   
    
        const { isOpen, onOpen, onClose } = useDisclosure()

        return (
          <>
            <Button onClick={onOpen}>Open Modal</Button>
      
            <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Registrar Autor</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                   <Autor_Form/>
                </ModalBody>
      
                <ModalFooter>
                  <Button colorScheme="blue" mr={3} onClick={onClose}>
                    Close
                  </Button>
                  <Button variant="ghost">Registrar</Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </>
        )
    
}
export default Modal_Autor;