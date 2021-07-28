import { Observable, Subscription } from 'rxjs'
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
    }, 1000)
  } catch (error) {
    observer.error(error)
  }
});

const subscription: Subscription = observable.subscribe(
  (x: any) => addToList(listEl, x, [...listClasses, 'bg-white']),
  (error: any) => console.error(error),
  () => addToList(listEl, 'Completed', [...listClasses, 'bg-green-400', 'text-white']))

const subscription2 = observable.subscribe((x: any) => addToList(listEl, x, [...listClasses, 'bg-pink-300']))

subscription.add(subscription2) // Attaching subscription2 to subscription so it gets unsubscribed as well

setTimeout(() => { subscription.unsubscribe() }, 6000)
