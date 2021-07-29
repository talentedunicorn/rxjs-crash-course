import { ReplaySubject } from 'rxjs'
import { addToList } from './lib/domUtils'

const containerEl = document.getElementById('app')
const listEl = containerEl.querySelector('ol');
const listClasses = ['p-4', 'rounded-md'];
const addListItem = (data: string, classes: string[]) => addToList(listEl, data, classes)

// ReplaySubject allows to set number of events to be buffered
const subject = new ReplaySubject(3)
subject.next('Testing')

subject.subscribe(
  (data:string) => addListItem(data, [...listClasses, 'bg-white']),
  (err) => addListItem(`${err}`, [...listClasses, 'bg-red-200']),
  () => addListItem('Completed', [...listClasses, 'bg-blue']) 
)
subject.next('First thing sent!')
subject.next('... warming up observer 2')

const subscription2 = subject.subscribe(
  (data: string) => addListItem(data, [...listClasses, 'bg-black', 'text-white'])
)

subject.next('Second thing goes here')
subject.next('Third thing is cool')

subscription2.unsubscribe()

subject.next('Last thing sent')
