import inquirer from "inquirer";
class BankAccount {
    account_number;
    account_balance;
    constructor(account_number, account_balance) {
        this.account_number = account_number;
        this.account_balance = account_balance;
    }
    cash_withdraw(amount) {
        if (this.account_balance >= amount) {
            this.account_balance -= amount;
            console.log(`Withdrawal of $${amount} successful. Remaining balance is: $${this.account_balance}`);
        }
        else {
            console.log("Insufficient balance.");
        }
    }
    cash_deposit(amount) {
        if (amount > 100) {
            amount -= 1;
        }
        this.account_balance += amount;
        console.log(`Deposit of $${amount} successful. Remaining balance is: $${this.account_balance}`);
    }
    balance_check() {
        console.log(`Your current balance is $${this.account_balance}`);
    }
}
class Customer {
    firstname;
    lastname;
    gender;
    age;
    contactnumber;
    account;
    constructor(firstname, lastname, gender, age, contactnumber, account) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.gender = gender;
        this.age = age;
        this.contactnumber = contactnumber;
        this.account = account;
    }
}
const accounts = [
    new BankAccount(1122, 3000),
    new BankAccount(2233, 5000),
    new BankAccount(3344, 7000),
    new BankAccount(4455, 9000),
];
const customers = [
    new Customer("Babar", "Azam", "male", 27, 3178390297, accounts[0]),
    new Customer("Shaheen", "Afridi", "male", 25, 3124567335, accounts[1]),
    new Customer("Naseem", "Shah", "male", 23, 3132314908, accounts[2]),
];
async function service() {
    while (true) {
        const account_number_input = await inquirer.prompt([{
                name: "account_number",
                type: "number",
                message: "Enter your account number:"
            }]);
        const customer = customers.find(customer => customer.account.account_number === account_number_input.account_number);
        if (customer) {
            console.log(`Welcome, ${customer.firstname} ${customer.lastname}!\n`);
            const answer = await inquirer.prompt([{
                    name: "select",
                    type: "list",
                    message: "Select your operation:",
                    choices: ["deposit", "withdraw", "check balance", "exit"]
                }]);
            switch (answer.select) {
                case "deposit":
                    const deposit_amount = await inquirer.prompt([{
                            name: "amount",
                            type: "number",
                            message: "Enter the amount to deposit:"
                        }]);
                    customer.account.cash_deposit(deposit_amount.amount);
                    break;
                case "withdraw":
                    const withdraw_amount = await inquirer.prompt([{
                            name: "amount",
                            type: "number",
                            message: "Enter the amount to withdraw:"
                        }]);
                    customer.account.cash_withdraw(withdraw_amount.amount);
                    break;
                case "check balance":
                    customer.account.balance_check();
                    break;
                case "exit":
                    console.log("Exiting bank.");
                    console.log("Thank you for using our bank services.");
                    return;
                default:
                    console.log("Invalid selection.");
            }
        }
        else {
            console.log("Invalid account number, please try again.");
        }
    }
}
service();
