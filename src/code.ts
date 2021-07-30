import { Observable, Subject, skipUntil } from 'rxjs'
import { addToList } from './lib/domUtils'

const containerEl = document.getElementById('app')
const listEl = containerEl.querySelector('ol');
const listClasses = (bg?: string) => ['p-4', 'rounded-md', bg ? `bg-${bg}`: 'bg-white'];
const addListItem = (data: string, classes: string[]) => addToList(listEl, data, classes)

const ob1 = new Observable((data: any) => {
  let i: number = 1
  setInterval(() => data.next(i++), 1000)
})

const ob2 = new Subject;

setTimeout(() => {
  ob2.next('Is me, Subject')
}, 3000)

// sub2 has to emit value before sub1 can produce value i.e. after 3s
const ob3 = ob1.pipe(skipUntil(ob2))

const sub = ob3.subscribe((data: string) => addListItem(data, listClasses()))


setTimeout(() => {
  sub.unsubscribe()
}, 11000)
