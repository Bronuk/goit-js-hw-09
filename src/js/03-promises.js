import Notiflix from 'notiflix';

  const promisesForm = document.querySelector('.form')
  const submitButton = document.querySelector('.form button')

// promisesForm.addEventListener('submit', (e)=>{
//   e.preventDefault;
// });

  submitButton.addEventListener('click', submitForm);

  function submitForm(event){
  event.preventDefault();
  // console.log('click performed');
  let delayValue = promisesForm.delay.value;
  let stepValue = promisesForm.step.value;
  let amountValue = promisesForm.amount.value;
  // console.log(delayValue);
  // let createArray = [delayValue, stepValue, amountValue];
  // console.log(createArray);
  callPromises(delayValue, stepValue, amountValue);
  }

  function createPromise(position, delay) {
    return new Promise((resolve, reject)=>{
      const shouldResolve = Math.random() > 0.3;
        setTimeout(() => {
          if (shouldResolve) {
            resolve({position,delay});
          } else {
            reject({position,delay});
          }
        }, delay);
    })
  }

  function callPromises(delayInput, stepInput, amountInput) {
  let position = 0;
  let delay = parseInt(delayInput);
    for(let i = 0; i < amountInput; i++){
      position+=1;
      createPromise(position, delay).then(({ position, delay }) => {
        Notiflix.Notify.success('Created promise');
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
        })
        .catch(({ position, delay }) => {
          Notiflix.Notify.failure('Did not create promise');
          console.log(`❌ Rejected promise ${position} in ${delay}ms`);
        });
        delay += parseInt(stepInput);
    }
  }