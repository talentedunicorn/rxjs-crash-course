import { Observable, share, Subscription } from 'rxjs'
import { addToList } from './lib/domUtils'

const containerEl = document.getElementById('app')
const listEl = containerEl.querySelector('ol');
const listClasses = ['p-4', 'rounded'];

const observable = Observable.create((observer: any) => {
  try {
    observer.next('Hallow')
    observer.next('Are you there?')
    setInterval(() => {
      observer.next('Am i?')
    }, 2000)
  } catch (error) {
    observer.error(error)
  }
});

const sharedObservable = observable.pipe(share()) // Hot: Output values emitted when the subscription is created - see line 31

const subscription: Subscription = sharedObservable
  .subscribe(
    (x: any) => addToList(listEl, x, [...listClasses, 'bg-white']),
    (error: any) => console.error(error),
    () => addToList(listEl, 'Completed', [...listClasses, 'bg-green-400', 'text-white']))


setTimeout(() => {
  // Cold: Output values emitted BEFORE the subscription is created
  const subscription2 = sharedObservable.subscribe((x:any) => addToList(listEl, x, [...listClasses, 'bg-pink-300']))
}, 1000)
