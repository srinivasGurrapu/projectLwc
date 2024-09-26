import { LightningElement } from 'lwc';

export default class DATABINDING extends LightningElement {
    fullname = 'zero to hero'
    title = 'aura'
    changeMethod(event){
        this.title = event.target.value
    }
}