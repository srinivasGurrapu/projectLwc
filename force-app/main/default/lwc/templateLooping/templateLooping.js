import { LightningElement } from 'lwc';

export default class TemplateLooping extends LightningElement {
    carList = ['Audi','Ford','Ferrari','Maruthi','Mercedes','Hyundai']

    ceoList = [
        {
            id:1,
            company:'Google',
            Name:'Sundar Pichhai'
        },

        {
            id:2,
            company:'Amazon',
            Name:'Jeff Bezos'
        },
        {
            id:3,
            company:'Facebook',
            Name:'Mark Juckerberg'
        },
        {
            id:4,
            company:'Apple',
            Name:'Tim Cook'
        },
        {
            id:5,
            company:'Microsoft',
            Name:'Bill Gates'
        }
    ]
}