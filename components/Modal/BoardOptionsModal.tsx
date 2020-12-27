import { boardContext } from "context/board/board.context";
import { UpdateBoardDetailsCallback } from "context/tasks/tasks.context";
import React, {
  FunctionComponent,
  useCallback,
  useContext,
  useEffect,
} from "react";
import { useImmer } from "use-immer";
import Modal from "./Modal";

type BoardOptionsModalProps = {
  isVisible: boolean;
  onClose: () => void;

  // If initial values: update modal.
  initialValues?: {
    title: string;
    description?: string;
  };
  // Used on update:
  updateBoardDetails?: UpdateBoardDetailsCallback;
};
const BoardOptionsModal: FunctionComponent<BoardOptionsModalProps> = ({
  isVisible,
  onClose,
  initialValues,
  updateBoardDetails,
}) => {
  const { createBoard } = useContext(boardContext);

  const [modalInputs, updateModalInputs] = useImmer({
    title: initialValues?.title ?? "",
    description: initialValues?.description ?? "",
  });

  const resetInputs = useCallback(() => {
    updateModalInputs((draft) => {
      draft.title = initialValues?.title ?? "";
      draft.description = initialValues?.description ?? "";
    });
  }, [initialValues?.description, initialValues?.title, updateModalInputs]);

  useEffect(() => {
    resetInputs();
  }, [initialValues, resetInputs]);

  const updateTitle = (newValue: string) => {
    updateModalInputs((draft) => {
      draft.title = newValue;
    });
  };

  const updateDescription = (newValue: string) => {
    updateModalInputs((draft) => {
      draft.description = newValue;
    });
  };

  const handleSubmit = () => {
    if (initialValues) {
      updateBoardDetails(modalInputs).then(() => {
        resetInputs();
        onClose();
      });
    } else {
      createBoard(modalInputs).then(() => {
        resetInputs();
        onClose();
      });
    }
  };

  return (
    <Modal
      onClose={onClose}
      isVisible={isVisible}
      title={initialValues ? "Edit board" : "Add new board"}
      buttonPrimary={{
        text: "Save",
        onClick: handleSubmit,
        disabled: !modalInputs.title,
      }}
      buttonSecondary={{
        text: "Cancel",
        onClick: onClose,
      }}
    >
      <Modal.Input
        value={modalInputs.title}
        setValue={updateTitle}
        placeholder="Title"
        label="Title"
      />
      <Modal.Input
        value={modalInputs.description}
        setValue={updateDescription}
        placeholder="Description"
        label="Description"
        isTextArea
      />
    </Modal>
  );
};

export default BoardOptionsModal;
