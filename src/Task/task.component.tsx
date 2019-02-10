import * as React from 'react';
import { Keys } from 'src/models';
import { Props } from '.';
import './task.style.css';
export class Task extends React.Component<Props, {}> {
  private element: React.RefObject<HTMLDivElement>;

  constructor(props: Props) {
    super(props);
    this.handleKeyup = this.handleKeyup.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.element = React.createRef();
  }
  public render(): JSX.Element {
    return (
      <span
        contentEditable={true}
        suppressContentEditableWarning={true}
        onKeyDown={this.handleKeyup}
        onBlur={this.handleChange}
        ref={this.element}
      >
        {this.props.task.text}
      </span>
    );
  }

  public componentDidMount() {
    if (this.props.focus) {
      (this.element.current as any).focus();
    }
  }

  private handleChange(event: React.SyntheticEvent) {
    console.log('changed');
    const el = event.nativeEvent as any;
    this.props.save(this.props.taskIndex, el.target.outerText);
  }

  private handleKeyup(event: React.SyntheticEvent) {
    const el = event.nativeEvent as any;
    if (el.key in Keys) {
      event.preventDefault();
      this.props.handleKeyEvent(this.props.taskIndex, {
        cursorRelativePosition: (document.getSelection() as any).anchorOffset,
        key: el.key,
        text: el.target.outerText,
      });
    }
  }
}
