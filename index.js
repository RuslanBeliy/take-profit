const takes = document.getElementById('list');
const addButton = document.querySelector('.add');
const resetButton = document.querySelector('.reset');
const calculateButton = document.querySelector('.calculate');

let countTakes = 1;
let result = 0;

const addTake = () => {
  countTakes += 1;
  takes.insertAdjacentHTML(
    'beforeend',
    `<li>
          <h2>${countTakes} тейк</h2>

          <div class="inputs">
            <label>
              Процент
              <input type="number" />
            </label>
            <label>
              Цена
              <input type="number" />
              </label>
          </div>
        </li>`
  );
};

const setResult = () => {
  const wrap = document.querySelector('.wrap');
  if (wrap.lastElementChild.tagName === 'H2') wrap.lastElementChild.remove();
  wrap.insertAdjacentHTML('beforeend', `<h2>Результат: ${result}</h2>`);
};

const reset = () => {
  takes.textContent = '';
  countTakes = 0;
  result = 0;
  setResult();
};

const calculate = () => {
  result = 0;

  document.querySelectorAll('.inputs').forEach((el) => {
    const percent = +el.firstElementChild.children[0].value;
    const price = +el.lastElementChild.children[0].value;

    result = (percent / 100) * price + result;
  });

  setResult();
};

addButton.addEventListener('click', addTake);
resetButton.addEventListener('click', reset);
calculateButton.addEventListener('click', calculate);
