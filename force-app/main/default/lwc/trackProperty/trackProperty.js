import { LightningElement,track } from 'lwc';

export default class TrackProperty extends LightningElement {
    @track Address = {
        City:"Guntur",
        Pincode:522426,
        Country:"India"
    }
trackHandler(event){
    this.Address.City = event.target.value
	// this.Address ={...this.Address, "city":event.target.value}
}

}