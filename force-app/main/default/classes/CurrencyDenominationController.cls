public with sharing class CurrencyDenominationController {
    @AuraEnabled(cacheable=true)
    public static Denomination__c getDenominations(Id accountId) {
        return [
            SELECT Id,
                X1_USD__c, X5_USD__c, X10_USD__c, Total_USD__c,
                X1_CAD__c, X5_CAD__c, X10_CAD__c, Total_CAD__c,
                X50INR__c, X100INR__c, X200INR__c, X500INR__c, Total_INR__c
            FROM Denomination__c
            WHERE Account__c = :accountId
            LIMIT 1
        ];
    }
}
