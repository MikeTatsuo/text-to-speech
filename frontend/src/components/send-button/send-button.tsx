import { createElement, Component, SyntheticEvent } from 'react';
import './send-button.css';
import { SendButtonProps } from '../../props';
import { addText } from '../../service';

export class SendButton extends Component<SendButtonProps>{
  constructor(props: any) {
    super(props);

    this.sendText = this.sendText.bind(this)
  }

  private sendText(ev: SyntheticEvent) {
    ev.preventDefault();

    addText(this.props.textareaValue);
  }

  render() {
    return (
      createElement('button', { className: 'send-button', onClick: this.sendText }, 'Cadastrar')
    );
  }
}
