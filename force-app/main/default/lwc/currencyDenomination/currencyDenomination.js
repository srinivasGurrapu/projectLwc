import { LightningElement, track, api, wire } from 'lwc';
import { getRelatedListRecords } from 'lightning/uiRelatedListApi';
import { updateRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

const FIELDS = [
    'Denomination__c.X1_USD__c', 'Denomination__c.X5_USD__c', 'Denomination__c.X10_USD__c',
    'Denomination__c.X1_CAD__c', 'Denomination__c.X5_CAD__c', 'Denomination__c.X10_CAD__c', 
    'Denomination__c.X50INR__c', 'Denomination__c.X100INR__c', 'Denomination__c.X200INR__c', 'Denomination__c.X500INR__c'
];

export default class CurrencyDenomination extends LightningElement {
    @api recordId;
    @track isModalOpen = false;
    @track usDenominations = [];
    @track canadaDenominations = [];
    @track indianDenominations = [];

    usdToInrRate = 80;
    cadToInrRate = 60;

    handleOpenModal() {
        this.isModalOpen = true;
    }

    handleCloseModal() {
        this.isModalOpen = false;
    }

    @wire(getRelatedListRecords, { parentRecordId: '$recordId', relatedListId: 'Denominations__r', fields: FIELDS })
    wiredRecord({ error, data }) {
        if (data) {
            const denominationRecord = data.records[0].fields;
            this.usDenominations = [
                { id: 1, recordId: data.records[0].id, label: '1$ X', value: denominationRecord.X1_USD__c.value, total: denominationRecord.X1_USD__c.value * 1, currencyType: 'USD' },
                { id: 5, recordId: data.records[0].id, label: '5$ X', value: denominationRecord.X5_USD__c.value, total: denominationRecord.X5_USD__c.value * 5, currencyType: 'USD' },
                { id: 10, recordId: data.records[0].id, label: '10$ X', value: denominationRecord.X10_USD__c.value, total: denominationRecord.X10_USD__c.value * 10, currencyType: 'USD' }
            ];

            this.canadaDenominations = [
                { id: 1, recordId: data.records[0].id, label: '1$ X', value: denominationRecord.X1_CAD__c.value, total: denominationRecord.X1_CAD__c.value * 1, currencyType: 'CAD' },
                { id: 5, recordId: data.records[0].id, label: '5$ X', value: denominationRecord.X5_CAD__c.value, total: denominationRecord.X5_CAD__c.value * 5, currencyType: 'CAD' },
                { id: 10, recordId: data.records[0].id, label: '10$ X', value: denominationRecord.X10_CAD__c.value, total: denominationRecord.X10_CAD__c.value * 10, currencyType: 'CAD' }
            ];

            this.indianDenominations = [
                { id: 50, recordId: data.records[0].id, label: '50R X', value: denominationRecord.X50INR__c.value, total: denominationRecord.X50INR__c.value * 50 },
                { id: 100, recordId: data.records[0].id, label: '100R X', value: denominationRecord.X100INR__c.value, total: denominationRecord.X100INR__c.value * 100 },
                { id: 200, recordId: data.records[0].id, label: '200R X', value: denominationRecord.X200INR__c.value, total: denominationRecord.X200INR__c.value * 200 },
                { id: 500, recordId: data.records[0].id, label: '500R X', value: denominationRecord.X500INR__c.value, total: denominationRecord.X500INR__c.value * 500 }
            ];
        } else if (error) {
            console.error('Error fetching currency denominations:', error);
        }
    }

    handleUSChange(event) {
        const denomination = this.usDenominations.find(item => item.id == event.target.dataset.id);
        if (denomination) {
            denomination.value = event.target.value;
            denomination.total = denomination.value * denomination.id;
            this.usDenominations = [...this.usDenominations];
        }
    }

    handleCANADAChange(event) {
        const denomination = this.canadaDenominations.find(item => item.id == event.target.dataset.id);
        if (denomination) {
            denomination.value = event.target.value;
            denomination.total = denomination.value * denomination.id;
            this.canadaDenominations = [...this.canadaDenominations];
        }
    }

    handleINDIAChange(event) {
        const denomination = this.indianDenominations.find(item => item.id == event.target.dataset.id);
        if (denomination) {
            denomination.value = event.target.value;
            denomination.total = denomination.value * denomination.id;
            this.indianDenominations = [...this.indianDenominations];
        }
    }

    handleSave() {
        let updatedRecords = [];

        const allDenominations = [
            ...this.usDenominations,
            ...this.canadaDenominations,
            ...this.indianDenominations
        ];

        allDenominations.forEach(item => {
            let fieldsToUpdate = { Id: item.recordId };
            if (item.currencyType === 'USD') {
                if (item.id === 1) {
                    fieldsToUpdate.X1_USD__c = item.value;
                } else if (item.id === 5) {
                    fieldsToUpdate.X5_USD__c = item.value;
                } else if (item.id === 10) {
                    fieldsToUpdate.X10_USD__c = item.value;
                }
            } else if (item.currencyType === 'CAD') {
                if (item.id === 1) {
                    fieldsToUpdate.X1_CAD__c = item.value;
                } else if (item.id === 5) {
                    fieldsToUpdate.X5_CAD__c = item.value;
                } else if (item.id === 10) {
                    fieldsToUpdate.X10_CAD__c = item.value;
                }
            } else if (item.label.includes('R X')) {
                if (item.id === 50) {
                    fieldsToUpdate.X50INR__c = item.value;
                } else if (item.id === 100) {
                    fieldsToUpdate.X100INR__c = item.value;
                } else if (item.id === 200) {
                    fieldsToUpdate.X200INR__c = item.value;
                } else if (item.id === 500) {
                    fieldsToUpdate.X500INR__c = item.value;
                }
            }

            updatedRecords.push({ fields: fieldsToUpdate });
        });

        const promises = updatedRecords.map(record => updateRecord(record));

        Promise.all(promises)
            .then(() => {
                this.handleCloseModal();
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Records updated successfully',
                        variant: 'success'
                    })
                );
            })
            .catch(error => {
                console.error('Error updating records:', error);
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error',
                        message: 'Error updating records',
                        variant: 'error'
                    })
                );
            });
    }

    handleCancel() {
        this.handleCloseModal();
    }

    get totalUSD() {
        return this.usDenominations.reduce((acc, item) => acc + item.total, 0);
    }

    get totalCAD() {
        return this.canadaDenominations.reduce((acc, item) => acc + item.total, 0);
    }

    get totalINR() {
        return this.indianDenominations.reduce((acc, item) => acc + item.total, 0);
    }

    get converttototalINR() {
        const convertedUSDToINR = this.totalUSD * this.usdToInrRate;
        const convertedCADToINR = this.totalCAD * this.cadToInrRate;
        return convertedUSDToINR + convertedCADToINR + this.totalINR;
    }
}
