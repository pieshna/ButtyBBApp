import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay
} from '@chakra-ui/react'

interface ModalPropioProps {
  buttonToShowModalText: string
  titulo: string
  children: React.ReactNode
  onOpen: () => void
  onClose: () => void
  isOpen: boolean
  ocultar?: boolean
}

function ModalPropio({
  buttonToShowModalText,
  titulo,
  children,
  onOpen,
  onClose,
  isOpen,
  ocultar = false
}: ModalPropioProps) {
  return (
    <>
      <Button onClick={onOpen} className={ocultar ? 'd-none' : ''}>
        {buttonToShowModalText}
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{titulo}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{children}</ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ModalPropio
