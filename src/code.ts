import { fromEvent } from 'rxjs'
import { addToList } from './lib/domUtils'

const containerEl = document.getElementById('app')
const listEl = containerEl.querySelector('ol');
const listClasses = ['p-4', 'rounded'];

const mouseMovements = fromEvent(document, 'mousemove')

setTimeout(() => {
  const subsription = mouseMovements.subscribe(
    ({ x, y }: MouseEvent) => addToList(listEl, `x:${x}, y:${y}`, [...listClasses, 'bg-white'] )
  )
}, 5000)
