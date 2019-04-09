var webPush = require('web-push');
var pushSubscription = {
    "endpoint": "https://android.googleapis.com/gcm/send/c8NE3K_7d7A:APA91bHWfNmm-xazQ9yVm1KQlGOzlalBNHOfkud4ddPfay2HVvBR3gg2EIRwDbzEzE__28M-mDpAgpRbwY6sgTRdYdBsTAjFfF1vWhdnk-4MomtZBvzQrLF1g6oRSEfxf0_l76PEsSyF",
    "keys": {
        "p256dh": "BJLubiBgqj7/nMhCZ4tNW7RQfqNPHP4/HLiewGRRuEjHZWWOBo8lfN+uzrntR9EC1AS3ML7UkFTY36Ty3WtI35U=",
        "auth": "bDxUNQQQ2kC5YqP4taoeLg=="
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