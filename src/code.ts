import { Observable, merge } from 'rxjs'
import { addToList } from './lib/domUtils'

const containerEl = document.getElementById('app')
const listEl = containerEl.querySelector('ol');
const listClasses = (bg?: string) => ['p-4', 'rounded-md', bg ? `bg-${bg}`: 'bg-white'];
const addListItem = (data: string, classes: string[]) => addToList(listEl, data, classes)

const sub1 = new Observable((observer: any) => {
  observer.next('Hello, Operator')
})

const sub2 = new Observable((observer: any) => {
  observer.next('Who is this?')
})

// This subscription will have values from both sub1 and sub2
const mergedSub = merge(sub1, sub2)

mergedSub.subscribe(
  (data: any) => {
    addListItem(data, listClasses())
  },
)

sub2.subscribe((data: string) => addListItem(data, listClasses('blue-200')))
