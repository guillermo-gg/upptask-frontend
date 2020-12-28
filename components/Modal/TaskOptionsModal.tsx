import { boardContext } from "context/board/board.context";
import {
  tasksContext,
  UpdateBoardDetailsCallback,
} from "context/tasks/tasks.context";
import React, {
  FunctionComponent,
  useCallback,
  useContext,
  useEffect,
} from "react";
import { useImmer } from "use-immer";
import Modal from "./Modal";

type TaskOptionsModalProps = {
  // Will contain columnId when visible, and undefined when not.
  isVisible: boolean;
  columnId: string;
  onClose: () => void;

  // If initial values: update modal.
  initialValues?: {
    id: string;
    title: string;
    description?: string;
  };
};
const TaskOptionsModal: FunctionComponent<TaskOptionsModalProps> = ({
  isVisible,
  columnId,
  onClose,
  initialValues,
}) => {
  const { addTaskToColumn, updateTaskDetails } = useContext(tasksContext);

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
      updateTaskDetails(modalInputs, initialValues.id, columnId);
      resetInputs();
      onClose();
    } else {
      addTaskToColumn(modalInputs, columnId);
      resetInputs();
      onClose();
    }
  };

  return (
    <Modal
      onClose={onClose}
      isVisible={isVisible}
      title={initialValues ? "Edit task" : "Add new task"}
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

export default TaskOptionsModal;
