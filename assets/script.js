// Data
const account1 = {
    owner: 'Jonas Schmedtmann',
    movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
    interestRate: 1.2, // %
    pin: 1111,

    movementsDates: [
        '2019-11-18T21:31:17.178Z',
        '2019-12-23T07:42:02.383Z',
        '2020-01-28T09:15:04.904Z',
        '2020-04-01T10:17:24.185Z',
        '2020-05-08T14:11:59.604Z',
        '2020-05-27T17:01:17.194Z',
        '2020-07-11T23:36:17.929Z',
        '2020-07-12T10:51:36.790Z',
      ],
      currency: 'EUR',
      locale: 'pt-PT', // de-DE
  };
  
  const account2 = {
    owner: 'Jessica Davis',
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1.5,
    pin: 2222,

    movementsDates: [
        '2019-11-01T13:15:33.035Z',
        '2019-11-30T09:48:16.867Z',
        '2019-12-25T06:04:23.907Z',
        '2020-01-25T14:18:46.235Z',
        '2020-02-05T16:33:06.386Z',
        '2020-04-10T14:43:26.374Z',
        '2020-06-25T18:49:59.371Z',
        '2020-07-26T12:01:20.894Z',
      ],
      currency: 'USD',
      locale: 'en-US',
  };
  
  const account3 = {
    owner: 'Steven Thomas Williams',
    movements: [200, -200, 340, -300, -20, 50, 400, -460],
    interestRate: 0.7,
    pin: 3333,
  };
  
  const account4 = {
    owner: 'Sarah Smith',
    movements: [430, 1000, 700, 50, 90],
    interestRate: 1,
    pin: 4444,
  };328

  const accounts = [account1,account2,account3,account4]
  console.log(accounts)



// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const formatMovementDate = (date) => {
    const calcDaysPassed = (date1, date2) => 
    Math.round(Math.abs(date2 - date1)/(1000 *60 * 60 * 24));
  
  const dayPassed = calcDaysPassed(new Date(), date);
  console.log('dayss',dayPassed);
  if(dayPassed ===0 )return 'Today';
  if(dayPassed === 1 )return 'Yesterday';
  if(dayPassed <= 7 )return `${dayPassed} days ago`;
    else {
        const day = `${date.getDate()}`.padStart(2,0);
        const month = `${date.getMonth()+1}`.padStart(2,0);
        const year = date.getFullYear();
        return displayDate = `${day}/${month}/${year}`;
    }

}

  const displayMovements = (acc, sort = false) => {


    containerMovements.innerHTML = '';

    const movs = sort 
    ? acc.movements.slice().sort((a,b)=> a-b)
    : acc.movements;

    movs.forEach(function(mov,i) {
        const type = mov > 0 ? 'deposit' : 'withdrawal';
          
        const date = new Date(acc.movementsDates[i]);
        const displayDate = formatMovementDate(date)
       console.log('date',date)
        const html =
            `
            <div class="movements__row">
            <div class="movements__type movements__type--${type}">
              ${i+1} ${type}
            </div>
            <div class="movements__date">${displayDate}</div>

            
            <div class="movements__value">${mov} &euro;</div>
          </div>
            `;

            containerMovements.insertAdjacentHTML 
            ('afterbegin',html)
    });
  };
//   displayMovements(account1.movements);

  const calcDisplayBalance = (acc) => {
    acc.balance = acc.movements.reduce((acc, mov)=> 
    acc+mov,0);
    labelBalance.innerHTML = `${acc.balance} &euro;`
}

const calcDisplaySummary = (acc) => {
   const incomes = acc.movements.filter(mov => mov >0)
   .reduce((acc,mov) => acc + mov,0);
   labelSumIn.innerHTML = `${incomes} &euro;`

   const negIncomes = acc.movements.filter(mov => mov < 0)
   .reduce((acc, mov) => acc + mov, 0);
   labelSumOut.innerHTML = `${Math.abs(negIncomes)} &euro; `

   const interest = acc.movements
    .filter(mov => mov >0)
    .map(deposit => deposit * acc.interestRate/100)
    .filter((int,i,arr) => {
        console.log(arr);
        return int >=1;
    })
    .reduce((acc, int) => acc + int, 0);
    labelSumInterest.innerHTML = `${interest}`

}

// const labelSumInterest 


const createUsersnames = (accs) => {
    accs.forEach(function(acc) {
        acc.username = acc.owner
        .toLowerCase().split(' ').map(name =>  name[0])
            .join('');
    })

};
createUsersnames(accounts);

const updateUI = (acc) => {
    //Display movements
        displayMovements(acc)
    //Display balance
        calcDisplayBalance(acc)
    //Display Summary
        calcDisplaySummary(acc)
}

const startLogOutTimer = ()=> {

    const tick = () => {

   
    const min = String(Math.trunc(time / 60)).padStart(2,0);

    const sec = String(time%60).padStart(2,0);

    labelTimer.innerHTML = `${min}:${sec}`;
    // decrease time


    if(time === 0){
        clearInterval(timer);
        labelWelcome.textContent = 
        'Log in to get started'

        containerApp.style.opacity = 0
    }
    time--;
 }


    let time = 30;
    tick()
    const timer = setInterval(tick,1000); 
    return timer
};


const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];



console.log(movements)



const movementUSDfor =[]
for (const mov of movements) movementUSDfor.push(mov)
console.log(movementUSDfor);

const movementsDescriptions =  movements.map(
    (mov,i) => 
    `Movement ${i + 1}: You ${mov >0? 'deposited ' : 
    'withdrew '}${Math.abs(mov)}`)

console.log(movementsDescriptions)


const deposits = movements.filter(mov =>{
    return mov > 0;
})
console.log(movements);
console.log(deposits);

const depositsFor = [];
for (const mov of movements) if (mov > 0){
    depositsFor.push(mov)
}
console.log(depositsFor)

const withdrawals = movements.filter(mov =>  mov < 0)

console.log(withdrawals)

const balance = movements.reduce((acc,cur) =>  acc + cur
     ,0)
     console.log(balance)


// const eurToUsd = 1.1;
// const movementToUsd = movements.map(function(mov){
//     return mov * eurToUsd;
// })

const eurToUsd = 1.1;
const totalDepositInUSD = movements
    .filter(mov => mov > 0)
    .map((mov,i,arr) => {
        console.log(arr)
        return mov * eurToUsd
    })
    .reduce((acc,mov) => acc+ mov, 0);
    
console.log(totalDepositInUSD);

const firstWithdrawal = movements.find(mov => mov < 0)
console.log(movements);
console.log(firstWithdrawal);

console.log(accounts);

const account = accounts.find(acc => acc.owner ===
    'Jessica Davis')
    // console.log('currentAccount',currentAccount);


    // EVENT HANDLER LOGIN

    let currentAccount, timer;

// currentAccount = account1;
// updateUI(currentAccount);
// containerApp.style.opacity = 100

    const now = new Date();
    const options = {
        hour: 'numeric',
        minute: 'numeric',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        weekday: 'long'
    }
    labelDate.textContent = new Intl.DateTimeFormat
    ('en-US',options).format(now)

    btnLogin.addEventListener('click', function(e){
        e.preventDefault();
        console.log('Login');

    //    metodo find mette in azione un match tra il valore digitato dall'utente e quello presente nell'Array, una volta trovato te lo ritorna, e se la condizione dopo IF combacia con la stessa password 

       currentAccount = accounts.find(
           acc => acc.username === 
        inputLoginUsername.value);
        console.log('balance',account.balance)

        if(currentAccount?.pin === Number(inputLoginPin.value)){
            // Display a WELCOME MESSAGE
            labelWelcome.textContent = 
            `Welcome back, 
            ${currentAccount.owner.split(' ')[0]} `;
            containerApp.style.opacity = 100
            
            // create current date

            const now = new Date()
            const day = `${now.getDate()}`.padStart(2,0);
            const month = `${now.getMonth()+1}`.padStart(2,0);
            const year = `${now.getFullYear(),setInterval(1000)}`.padStart(2,0);
            const hour = `${now.getHours()}`.padStart(2,0);
            const min = setInterval(() =>`${now.getMinutes()}`.padStart(2,0),1000);

            labelDate.innerHTML = `${day}/${month}/${year}, ${hour}:${min}`

            //Clear input fields
            inputLoginUsername.value = inputLoginPin.value = '';
            inputLoginPin.blur();
            
            if(timer) clearInterval(timer)
            timer = startLogOutTimer();

            
            updateUI(currentAccount)
        }
    })
    btnTransfer.addEventListener('click', function(e){
        e.preventDefault();
        const amount = Number(inputTransferAmount.value);
        const receiverAccount = accounts.find(acc => 
        acc.username === inputTransferTo.value);
        inputTransferAmount.value = inputTransferTo.value = '';

        if(amount > 0 &&  currentAccount.balance >= amount
            && receiverAccount?.username !== currentAccount.username){
        //    DOING TRANSFER
            currentAccount.movements.push(-amount);
            receiverAccount.movements.push(amount);
            //Add Transfer Date
            currentAccount.movementsDates.push(new Date().toISOString())
            receiverAccount.movementsDates.push(new Date().toISOString())
        // UPDATE UI
            updateUI(currentAccount)
        }else{
            console.log("t'attacchi")
        }
    })


    // LOAN METHOD
    btnLoan.addEventListener('click',function(e){
        e.preventDefault();
        const loanAmount =  Number(inputLoanAmount.value);
        if(loanAmount > 0 && currentAccount.movements.some(mov => mov >=loanAmount /10)){
            setTimeout(function(){
                
           
            //add movement
            currentAccount.movements.push(loanAmount);

            //Add Transfer Date
            currentAccount.movementsDates.push(new Date().toISOString())

            //update UI
            updateUI(currentAccount)
        }, 2500);
    }
    
        inputLoanAmount.value = ''
    });
    // CLOSE ACCOUNT METHOD

    btnClose.addEventListener('click',function(e){
        e.preventDefault()
        if(
            inputCloseUsername.value === currentAccount.username
            && Number(inputClosePin.value) === currentAccount.pin){
        const index = accounts.findIndex(
            acc => acc.username === currentAccount.username
            );

            accounts.splice(index, 1); 
            console.log(accounts)    
            }
    })

    const anyDeposits = movements.some(mov => mov>0)
    console.log(anyDeposits);


    console.log('sortMov',movements)

    let sorted = false
        btnSort.addEventListener('click',function(e){
            e.preventDefault();
            displayMovements(currentAccount.movements, !sorted)
        sorted = !sorted;
        })


        const bankDepositSum = accounts
        .flatMap(acc => acc.movements)
        .filter(mov => mov > 0)
        .reduce((sum, cur) => sum+cur,0)
        console.log('bankDepositSum)',bankDepositSum);

        const numDeposits1000 = accounts
        .flatMap(acc =>acc.movements)
        .reduce((count, cur) =>(cur >= 1000 ? count+2: count),0);
        console.log('numDeposits1000',numDeposits1000);

