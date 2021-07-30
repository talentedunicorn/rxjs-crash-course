import { AsyncSubject } from 'rxjs'
import { addToList } from './lib/domUtils'

const containerEl = document.getElementById('app')
const listEl = containerEl.querySelector('ol');
const listClasses = ['p-4', 'rounded-md'];
const addListItem = (data: string, classes: string[]) => addToList(listEl, data, classes)

// AsyncSubject only sends last item of stream and when .complete() is called
const subject = new AsyncSubject()
subject.next('Testing')

subject.subscribe(
  (data:string) => addListItem(data, [...listClasses, 'bg-white']),
  (err) => addListItem(`${err}`, [...listClasses, 'bg-red-200']),
  () => addListItem('Completed', [...listClasses, 'bg-blue-400']) 
)
subject.next('First thing sent!')
subject.next('... warming up observer 2')

const subscription2 = subject.subscribe(
  (data: string) => addListItem(data, [...listClasses, 'bg-black', 'text-white'])
)

subject.next('Second thing goes here')
subject.next('Third thing is cool')
subject.complete()

subscription2.unsubscribe()

subject.next('Last thing sent')
subject.complete()
