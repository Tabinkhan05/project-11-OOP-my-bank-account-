import { log } from "console";
import inquirer from "inquirer";

interface BankAccount {
    account_number: number;
    account_balance: number;
    cash_withdraw(amount: number): void;
    cash_deposit(amount: number): void;
    balance_check(): void;
}

class BankAccount implements BankAccount {
    account_number: number;
    account_balance: number;

    constructor(account_number: number, account_balance: number) {
        this.account_number = account_number;
        this.account_balance = account_balance;
    }

    cash_withdraw(amount: number): void {
        if (this.account_balance >= amount) {
            this.account_balance -= amount;
            console.log(`Withdrawal of $${amount} successful. Remaining balance is: $${this.account_balance}`);
        } else {
            console.log("Insufficient balance.");
        }
    }

    cash_deposit(amount: number): void {
        if (amount > 100) {
            amount -= 1; 
        }
        this.account_balance += amount;
        console.log(`Deposit of $${amount} successful. Remaining balance is: $${this.account_balance}`);
    }

    balance_check(): void {
        console.log(`Your current balance is $${this.account_balance}`);
    }
}

class Customer {
    firstname: string;
    lastname: string;
    gender: string;
    age: number;
    contactnumber: number;
    account: BankAccount;

    constructor(
        firstname: string,
        lastname: string,
        gender: string,
        age: number,
        contactnumber: number,
        account: BankAccount
    ) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.gender = gender;
        this.age = age;
        this.contactnumber = contactnumber;
        this.account = account;
    }
}

const accounts: BankAccount[] = [
    new BankAccount(1122, 3000),
    new BankAccount(2233, 5000),
    new BankAccount(3344, 7000),
    new BankAccount(4455, 9000),
];

const customers: Customer[] = [
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
        } else {
            console.log("Invalid account number, please try again.");
        }
    }
}

service();











































































