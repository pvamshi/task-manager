import { EditableText } from '@blueprintjs/core';
import * as React from 'react';
import { TaskModel } from './models';
export interface TaskProps {
  task: TaskModel;
  update(updatedText: string): void;
}

class Task extends React.Component<TaskProps, any> {
  constructor(props: TaskProps) {
    super(props);
    this.updateText = this.updateText.bind(this);
  }
  public render() {
    return (
      <div style={{ display: 'block' }}>
        <EditableText
          placeholder="type text"
          value={this.props.task && this.props.task.text}
          onChange={this.updateText}
        />
      </div>
    );
  }
  private updateText(v: string) {
    console.log(v, this);
    // this.setstate({ text: v });
    this.props.update(v);
  }
}

export default Task;
