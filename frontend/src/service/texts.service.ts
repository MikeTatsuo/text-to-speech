import { BehaviorSubject } from 'rxjs';
import { Text } from '../model';
import { get, add } from './api.service';
import { Endpoints } from '../endpoints';

const { TEXTS } = Endpoints;
export const textsSubject = new BehaviorSubject<Text[]>([]);

export function getAll() {
  return get(`${TEXTS}`)
    .then((resp: Text[]) => {
      textsSubject.next(resp);
    });
}

export function addText(data: string) {
  add(`${TEXTS}`, { text: data })
    .then((resp: Text) => {
      textsSubject.next([...textsSubject.value, resp]);
    });
}
