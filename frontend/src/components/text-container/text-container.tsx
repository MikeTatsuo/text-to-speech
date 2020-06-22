import { createElement, Component } from 'react';
import './text-container.css';
import { ListenButton } from '../listen-button/listen-button';
import { TextContainerProps } from '../../props';

export class TextContainer extends Component<TextContainerProps> {
  render() {
    return (
      createElement('div', { className: 'text-container' },
        createElement('p', { className: 'text' }, this.props.text),
        createElement(ListenButton, {textToSpeech: this.props.text})
      )
    );
  }
}
