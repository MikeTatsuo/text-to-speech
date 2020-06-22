import { createElement, Component } from 'react';
import './textarea-wrapper.css';
import { SendButton } from '../send-button/send-button';
import { TextareaWrapperState } from '../../state';

export class TextareaWrapper extends Component<{}, TextareaWrapperState> {
  constructor(props: any) {
    super(props);

    this.state = {
      value: ''
    }

    this.getValue = this.getValue.bind(this);
  }

  private getValue(ev: any) {
    this.setState({ value: ev.target.value });
  }

  render() {
    return (
      createElement('section', { className: 'textarea-wrapper' },
        createElement('h1', { className: 'title' }, 'Comentário'),
        createElement('textarea', { id: 'comment-box', onChange: this.getValue }),
        createElement(SendButton, { textareaValue: this.state.value })
      )
    );
  }
}
