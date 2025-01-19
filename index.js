const resultBox = document.querySelector('.result');
const formBtns = document.querySelector('.form-btns');
const form = document.querySelector('.form');
const takes = document.querySelector('.form-takes');
const bankInput = document.querySelector('.bank-input');

bankInput.value = localStorage.getItem('bank') ?? '';

const result = {
  rr: 0,
  take: 0,
  volume: 0,
  volumeBtc: 0,
};

const setResult = () => {
  resultBox.textContent = '';

  resultBox.insertAdjacentHTML(
    'afterbegin',
    `<div class="result-item">R/R: <strong>${
      Number.isFinite(result.rr) ? result.rr : 0
    }</strong></div>
      <div class="result-item">Объем сделки: <strong>${
        Number.isFinite(result.volume) ? result.volume : 0
      }</strong></div>
      <div class="result-item">Объем сделки к BTC: <strong>${
        Number.isFinite(result.volumeBtc) ? result.volumeBtc : 0
      }</strong></div>
      <div class="result-item">Средний тейк: <strong>${result.take}</strong></div>`
  );
};

const calculate = () => {
  const dataForm = Array.from(new FormData(form));
  result.rr = 0;
  result.take = 0;
  result.volume = 0;

  let percent = 0;
  let risk = 0;
  let bank = 0;
  let buyPrice = 0;
  let stopLoss = 0;
  let btc = 0;

  for (const el of dataForm) {
    const key = el[0];
    const value = +el[1];

    if (key.includes('percent-')) percent = value;
    if (key.includes('price-')) result.take += (percent / 100) * value;
    if (key.includes('buy')) buyPrice = value;
    if (key.includes('stop')) stopLoss = value;
    if (key.includes('risk')) risk = value;
    if (key.includes('bank')) bank = value;
    if (key.includes('btc')) btc = value;
  }

  result.volume = ((risk / 100) * bank) / (buyPrice - stopLoss);
  result.rr = +((result.take - buyPrice) / (buyPrice - stopLoss)).toFixed(2);
  result.volumeBtc = ((risk / 100) * bank) / btc / (buyPrice - stopLoss);

  setResult();
};

const addTake = () => {
  takes.insertAdjacentHTML(
    'beforeend',
    `<div class="form-take">
            <h2>${takes.children.length + 1} тейк</h2>

            <div class="form-take-inputs">
              <label>
                Процент
                <input type="number" name="take-percent-${
                  takes.children.length + 1
                }" step="any" value="100" />
              </label>
              <label>
                Цена продажи
                <input type="number" name="take-price-${takes.children.length + 1}" step="any" />
              </label>
            </div>`
  );
};

const reset = () => {
  takes.textContent = '';
  resultBox.textContent = '';

  form.querySelector('[name="buy-price"]').value = '';
  form.querySelector('[name="stop-loss"]').value = '';
  form.querySelector('[name="btc"]').value = '';

  addTake();
};

form.addEventListener('submit', (e) => {
  e.preventDefault();

  calculate();
});
formBtns.addEventListener('click', (e) => {
  if (e.target.classList.contains('add')) addTake();
  if (e.target.classList.contains('reset')) reset();
});
bankInput.addEventListener('change', (e) => {
  localStorage.setItem('bank', e.target.value);
});
