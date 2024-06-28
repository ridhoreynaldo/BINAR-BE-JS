class BankAccount {
    constructor(balance = 0) {
        this.balance = balance;
    }

    deposit(amount) {
        this.balance += amount;
        console.log(`Deposited: ${amount}. New Balance: ${this.balance}`);
    }

    withdraw(amount) {
        if (amount > this.balance) {
            console.log('Insufficient funds');
        } else {
            this.balance -= amount;
            console.log(`Withdrew: ${amount}. New Balance: ${this.balance}`);
        }
    }
}

function asyncDeposit(account, amount) {
    setTimeout(() => {
        account.deposit(amount);
    }, 1000);
}

function asyncWithdraw(account, amount) {
    setTimeout(() => {
        account.withdraw(amount);
    }, 1000);
}
