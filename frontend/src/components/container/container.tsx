import {createElement, Component} from 'react';
import './container.css';
import { TextareaWrapper } from '../textarea-wrapper/textarea-wrapper';
import { TextContainerWrapper } from '../text-container-wrapper/text-container-wrapper';

export class Container extends Component {
  render() {
    return (createElement('main', { className: 'app-main' },
      createElement(TextareaWrapper),
      createElement('div', { className: 'divider' }),
      createElement(TextContainerWrapper)
    ));
  }
}
