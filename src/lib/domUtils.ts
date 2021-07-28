export const addToList = (container: HTMLElement, value: string, classes?: string[]):void => {
  const newEl = document.createElement('li')
  newEl.classList.add(...classes)
  const text = document.createTextNode(value)
  newEl.appendChild(text)
  container.appendChild(newEl)
}
