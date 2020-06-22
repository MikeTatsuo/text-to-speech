import { createElement, Component, SyntheticEvent } from 'react';
import './listen-button.css';
import { ListenButtonProps } from '../../props/listen-button.props';
import { textToSpeech } from '../../service';

export class ListenButton extends Component<ListenButtonProps> {
  constructor(props: any) {
    super(props);

    this.playAudio = this.playAudio.bind(this);
  }

  private playAudio(ev: SyntheticEvent) {
    ev.preventDefault();
    
    textToSpeech(this.props.textToSpeech);
  }

  render() {
    return (
      createElement('button', { className: 'listen-button', onClick: this.playAudio }, 'Ouvir')
    );
  }
}
