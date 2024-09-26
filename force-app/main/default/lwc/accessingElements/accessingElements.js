import { LightningElement } from 'lwc';

export default class AccessingElements extends LightningElement {
    userList = ["virat","rohit","dhoni","sachin"]
    fetchDetails(){
        let elem = this.template.querySelector('h1')
        elem.style.border = "1px solid red"
        console.log(elem.innerText)

        let elemAll = this.template.querySelectorAll('.name')
        Array.from(elemAll).forEach(item => {
            console.log(item.innerText)
            item.setAttribute("title",item.innerText)
        });

        let dom = this.template.querySelector('.child')
        dom.innerHTML = '<p>i am child dom</p>'
    }
}