type DialogState = {
  isOpen: boolean;
  name?: string;
};

export type DialogsState = {
  addInterviewer: DialogState;
  deleteInterviewer: DialogState;
};
