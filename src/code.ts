import { from, pluck } from 'rxjs'
import { addToList } from './lib/domUtils'

const containerEl = document.getElementById('app')
const listEl = containerEl.querySelector('ol');
const listClasses = (bg?: string) => ['p-4', 'rounded-md', bg ? `bg-${bg}`: 'bg-white'];
const addListItem = (data: string, classes: string[]) => addToList(listEl, data, classes)

const testData = [
  {
    first: 'Lim', last: 'Kee', age: 43,
  },
  {
    first: 'Tina', last: 'Turners', age: 32,
  },
  {
    first: 'Lance', last: 'Joy', age: 23,
  }
]

from(testData)
  .pipe(pluck('first'))
  .subscribe((first: string) => addListItem(first, listClasses()))
from(testData)
  .pipe(pluck('last'))
  .subscribe((last: string) => addListItem(last, listClasses('gray-300')))
