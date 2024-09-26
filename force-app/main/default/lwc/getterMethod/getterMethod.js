import { LightningElement } from 'lwc';

export default class GetterMethod extends LightningElement {
    user = ["Virat","Rohit","Dhoni"]
num1 = 10
num2 = 20
get firstUser(){
    return this.user[0]
}
get multiply(){
    return this.num1*this.num2
}
}