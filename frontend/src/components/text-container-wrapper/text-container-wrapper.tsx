import { createElement, Component } from 'react';
import './text-container-wrapper.css';
import { TextContainer } from '../text-container/text-container';
import { Text } from '../../model';
import { getAll, textsSubject } from '../../service';
import { TextContainerWrapperState } from '../../state';

export class TextContainerWrapper extends Component<{}, TextContainerWrapperState> {
  constructor(
    public props: any
  ) {
    super(props);

    this.state = {
      texts: []
    };
  }
  
  private renderTextContainer(texts: Text[]) {
    return texts.map(({ id, text }: Text) => createElement(TextContainer, { key: id, text: text }));
  }
  
  componentDidMount() {
    getAll();
    textsSubject.subscribe((texts: Text[]) => {
      this.setState({ texts: texts });
    });
  }

  render() {
    return (
      createElement('section', { className: 'texts-wrapper' },
        createElement('h1', { className: 'texts-title' }, 'Comentários'),
        this.renderTextContainer(this.state.texts)
      )
    );
  }
}
