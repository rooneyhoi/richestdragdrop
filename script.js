const draggable_list = document.getElementById('draggable-list');
const check = document.getElementById('check');

const richestPeople = [
  'Jeff Bezos',
  'Elon Musk',
  'Bill Gates',
  'Jack Ma',
  'Marc Zukerbeg',
  'Kim Jong Un',
  'Michael Jodan',
  'Hillary Clinton',
  'Elizabeth Taylor',
  'Phong Thien Nguyen',
  'Binh Truong'
];

// store the list items
const listItems = [];
let dragStartIndex;

createList();

function createList(){
  [...richestPeople]
  .map(a => ({ value: a, sort: Math.random() }))
  .sort((fistEl, secondEl) => fistEl.sort - secondEl.sort)
  .map(a => a.value)
  .forEach((person, index) => {
    const listItem = document.createElement('li');

    listItem.setAttribute('data-index', index);
    listItem.innerHTML = `
      <span class="number">${index + 1}</span>
      <div class="draggable" draggable="true">
        <p class="person-name">${person}</p>
        <i class="fa fa-grip-lines"></i>
      </div>
    `;

    listItems.push(listItem);
    draggable_list.appendChild(listItem);
  })

  addEventListeners();
}

function addEventListeners(){
  const draggables = document.querySelectorAll('.draggable');
  const dragListItems = document.querySelectorAll('.draggable-list li');

  draggables.forEach(draggable => {
    draggable.addEventListener('dragstart', dragStart);
  })

  dragListItems.forEach(item => {
    item.addEventListener('dragover', dragOver);
    item.addEventListener('drop', dragDrop);
    item.addEventListener('dragenter', dragEnter);
    item.addEventListener('dragleave', dragLeave);
  })
}

function dragStart(){
  // console.log('event: ', 'drag start');
  dragStartIndex = +this.closest('li').getAttribute('data-index');
  console.log(dragStartIndex);
}

function dragEnter(){
  // console.log('event: ', 'drag enter');
  this.classList.add('over');
}

function dragLeave(){
  // console.log('event: ', 'drag leave');
  this.classList.remove('over');
}

function dragOver(e){
  // console.log('event: ', 'drag over');
  e.preventDefault();
}

function dragDrop(){
  // console.log('event: ', 'drag drop');
  const dragEndIndex = +this.getAttribute('data-index');
  swapItems(dragStartIndex, dragEndIndex);

  this.classList.remove('over');
}

function swapItems(fromIndex, toIndex){
  const itemOne = listItems[fromIndex].querySelector('.draggable');
  const itemTwo = listItems[toIndex].querySelector('.draggable');

  listItems[fromIndex].appendChild(itemTwo);
  listItems[toIndex].appendChild(itemOne);
}

check.addEventListener('click', checkOrder);

function checkOrder(){
  listItems.forEach((listItem, index) => {
    const personName = listItem.querySelector('.draggable')
    .innerText.trim();

    if (personName !== richestPeople [index]){
      listItem.classList.add('wrong');
    }
    else {
      listItem.classList.remove('wrong');
      listItem.classList.add('right');
    }
  });
}