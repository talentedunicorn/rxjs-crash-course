import { Observable } from 'rxjs'
import { addToList } from './lib/domUtils'

const containerEl = document.getElementById('app')
const listEl = containerEl.querySelector('ol');
const listClasses = ['p-4', 'rounded'];

const obervable = Observable.create((observer: any) => {
  try {
    observer.next('Hallow')
    observer.next('Are you there?')
    observer.complete()
    observer.next('I will no show up!')
  } catch (error) {
    observer.error(error)
  }
});

obervable.subscribe(
  (x: any) => addToList(listEl, x, [...listClasses, 'bg-white']),
  (error: any) => console.error(error),
  () => addToList(listEl, 'Completed', [...listClasses, 'bg-green-400', 'text-white']))
