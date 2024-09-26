import { LightningElement, wire, track } from 'lwc';
import getActions from '@salesforce/apex/ActionController.getActions';

export default class DynamicActionButtons extends LightningElement {
    @track actions;
    @track error;
    sObjectType = 'Agreement';  // Define which sObject you want to pass, this can be dynamic as needed

    // Wire service to call the Apex method
    @wire(getActions, { sObjectType: '$sObjectType' })
    wiredActions({ data, error }) {
        if (data) {
            this.actions = data;
            this.error = undefined;
        } else if (error) {
            this.error = error.body.message;
            this.actions = undefined;
        }
    }

    // Handle button click event
    handleActionClick(event) {
        const url = event.currentTarget.dataset.url;
        if (url) {
            window.open(url, '_blank');  // Open the URL in a new tab
        }
    }
}
