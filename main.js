var webPush = require('web-push');
var pushSubscription = {
    "endpoint": "https://android.googleapis.com/gcm/send/fqJXDNQc-1c:APA91bH5-ezsWN__H1j-vJPZ41Tl8zXHkqI7qHpPDYUTrEAwjVIN29th-KadHvpUR-JgKapEA1UL3Fw7ivx3uFWgkT8UQRB3hFGedrDDfCfno76KDcexJq4euX8brSu_P8Tmd-eC5_2F",
    "keys": {
        "p256dh": "BKYA/CTlNr/iLD8POkMUr/J0CdXxBX+miFQYeaJbRFX6P8tJD166zEflL3OXkAvUfnuRMcDnDLjLJmMjY+1DFkk=",
        "auth": "KN4XVIWnqnaZoXKcby11ag=="
    }
};
var payload = 'Here is a payload!';
var options = {
    gcmAPIKey: 'AIzaSyCHv9Td81zbf5KGbdiYGGHpiMTOheru43I',
    TTL: 60
};
webPush.sendNotification(
    pushSubscription,
    payload,
    options
);