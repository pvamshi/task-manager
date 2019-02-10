export interface TaskModel {
  text: string;
  id: string;
}

export enum Keys {
  Enter = 'Enter',
  Backspace = 'Backspace',
  ArrowUp = 'ArrowUp',
  ArrowDown = 'ArrowDown',
}
export interface UserActionEvent {
  key: Keys;
  cursorRelativePosition: number;
  text: string[];
}
