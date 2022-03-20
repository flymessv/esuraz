setTimeout(() => {
    console.log('Loading...');
}, 300);
setTimeout(() => {
    console.log('Processing...');
}, 900);
setTimeout(() =>{
    console.log('[Владимир] - bot activated!');
}, 1200);
const { VK } = require('vk-io');
const vk = new VK();
const commands = [];
const request = require('prequest');
let user = new VK();
const requests = require('request');
const fs = require("fs");
const rq = require("prequest");
const bot_owner = 181184435;
const {Keyboard} = require('vk-io');
let giving = false;
var wall_to_send = '';

let autos  = require('./autos.json')
let users = require('./users.json');
let buttons = [];

setInterval(async () => {
    await saveUsers();
    console.log('saved');
}, 5000); //30000

async function saveUsers()
{
    require('fs').writeFileSync('./autos.json', JSON.stringify(autos, null, '\t'));
    require('fs').writeFileSync('./users.json', JSON.stringify(users, null, '\t'));
    return true;
}


vk.setOptions({ token: '/', pollingGroupId: 181184435 });
const { updates, snippets } = vk;
updates.startPolling();
updates.on('message', async (message) => {
    if(Number(message.senderId) <= 0) return;
    if(/\[club181184435\|(.*)\]/i.test(message.text)) message.text = message.text.replace(/\[club181184435\|(.*)\]/ig, '').trim();

    if(!users.find(x=> x.id === message.senderId))
    {
        const [user_info] = await vk.api.users.get({ user_id: message.senderId });
        const date = new Date();

        users.push({
            id: message.senderId,
            idtwo: message.Id,
            uid: users.length,
            admin: false,
            admreg: false,
            regDate: `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`,
            ban: false,
            tag: user_info.first_name,
            employee1: false,
            employee2: false,
            employee3: false,
            employee4: false,
            employee5: false,
            employee6: false,
            employee7: false,
            empl1: 0,
            empl2: 0,
            empl3: 0,
            empl4: 0,
            empl5: 0,
            empl6: 0,
            empl7: 0,
            online: false,
            registeredauto: 0,
            wantto: -999,
            wanttoTIME: -999,
            wanttoLAST: -999,
            wanttoTIMELAST: -999,
            zakaz: false,
            keyboard1: false,
            keyboard2: false,
            keyboard3: false,
            keyboard4: false,
            keyboard5: false,
            keyboard6: false,
            keyboard7: false,
        });
    }
    message.user = users.find(x=> x.id === message.senderId);
    const bot = (text, params) => {
        return message.send(`${message.user.mention ? `@id${message.user.id} (${message.user.tag})` : `${message.user.tag}`}, ${text}`, params);
    }
    if(message.user.ban)return message.send(`Вы забанены.`)

const command = commands.find(x=> x[0].test(message.text));
if(!command) return;
message.args = message.text.match(command[0]);
await command[1](message, bot);
console.log(`Executed: ${message.user.tag}, ${message.user.uid}: ${message.text}`)

});
const cmd = {
    hear: (p, f) => {
        commands.push([p, f]);
    }
}
/*       var kbd2 = JSON.stringify(
        {
            "type": "carousel",
            "elements": [{
                "photo_id": `${auto.photo_id}`,
                "title": `${auto.name_auto}`,
                "description": `${auto.photo_disc}`,
                "action": {
                    "type": "open_photo"
                },
                "buttons": [{
                    "action": {
                        "type": "text",
                        "label": "Текст кнопки 🌚",
                        "payload": "{}"
                    }
                }]
            }
            ]
        }
)*/

cmd.hear(/^(?:старт|помощь|help|команды|comands|comand|command|commands|обновить)$/i, async (message, bot) => {
     message.user.wantto = -999;
    return bot(`здравствуйте! Рады Вас видеть!`,
    {
        keyboard:JSON.stringify(
        {
            "one_time": false,
            "buttons": [
            [
            {
                "action":{
                    "type": "text",
                    "payload": "{\"button\": \"6\"}",
                    "label": `Аренда`,
                },
                "color": `positive`
            },
            ],
            [
            {
                "action":{
                    "type": "text",
                    "payload": "{\"button\": \"6\"}",
                    "label": "О нас",
                },
                "color": `primary`,
            },
            {
                "action": {
                    "type": "text",
                    "payload": "{\"button\": \"6\"}",
                    "label": "Устроиться",
                },
                "color": `primary`,
            }
            ],     
            [
            {
                "action": {
                    "type": "text",
                    "payload": "{\"button\": \"6\"}",
                    "label": `Профиль` 
                },
                "color": `primary`
            }
            ],
            [
            {
                "action": {
                    "type": "text",
                    "payload": "{\"button\": \"6\"}",
                    "label": `${message.user.admin == true ? `Acomands` : `Недоступно`}` 
                },
                "color": `${message.user.admin == true ? `positive` : `negative`}`
            },
            {
                "action": {
                    "type": "text",
                    "payload": "{\"button\": \"6\"}",
                    "label": `${message.user.employee1 == true ? `СотрCommands` : message.user.employee2 == true ? `СотрCommands` : message.user.employee3 == true ? `СотрCommands` : 
                        message.user.employee4 == true ? `СотрCommands` : message.user.employee5 == true ? `СотрCommands` : message.user.employee6 == true ? `СотрCommands` : message.user.employee7 == true ? 
                        `СотрCommands` : `Недоступно`}` 
                },
                "color": `${message.user.employee1 == true ? `positive` : message.user.employee2 == true ? `positive` : message.user.employee3 == true ?`positive` : 
                        message.user.employee4 == true ? `positive` : message.user.employee5 == true ? `positive` : message.user.employee6 == true ? `positive` : message.user.employee7 == true ? 
                        `positive` : `negative`}` 
            }
            ],     
            ],
        })
    })

});
cmd.hear(/^(?:О)\s(нас)$/i, async (message, bot) => {
    return bot (`ProvDrive - сервис, работающий на всех серверах MTA Province. У нас Вы можете арендовать различные автомобили. Все цены и информацию Вы можете узнать в личных сообщениях/на стене сообщества.`)
});
cmd.hear(/^(?:Устроиться)$/i, async (message, bot) => {
    return bot(`устроиться Вы можете по следующей ссылке: https://vk.com/app5619682_-210741294. 
        Либо перейти в нашу группу ВКонтакте и по разделу "Трудоустройство" оформить заявку.`)
});




cmd.hear(/^(?:Профиль|profile)$/i, async (message, bot) => {
     message.user.wantto = -999;
        return bot(`Ваш профиль:
            1. Ваш UID - ${message.user.uid}.
            2. Ваша роль - ${message.user.employee1 == true ? 'Сотрудник' : message.user.employee2 == true ? 'Сотрудник' :
            message.user.employee3 == true ? 'Сотрудник' : message.user.employee4 == true ? 'Сотрудник' :
            message.user.employee5 == true ? 'Сотрудник' : message.user.employee6 == true ? 'Сотружник' : message.user.employee7 == true ?
            'Сотрудник' : 'заказчик'}
            3. Администратор - ${((message.user.admin == true) && (message.user.uid == 0)) ? 'Главный администратор' : message.user.admin == true ? 'Да' : 'Нет'}`,
                {
        keyboard:JSON.stringify(
        {
            "one_time": false,
            "buttons": [
            [
            {
                "action":{
                    "type": "text",
                    "payload": "{\"button\": \"6\"}",
                    "label": `Аренда`,
                },
                "color": `positive`
            },
            ],
            [
            {
                "action":{
                    "type": "text",
                    "payload": "{\"button\": \"6\"}",
                    "label": "О нас",
                },
                "color": `primary`,
            },
            {
                "action": {
                    "type": "text",
                    "payload": "{\"button\": \"6\"}",
                    "label": "Устроиться",
                },
                "color": `primary`,
            }
            ],     
            [
            {
                "action": {
                    "type": "text",
                    "payload": "{\"button\": \"6\"}",
                    "label": `Профиль` 
                },
                "color": `primary`
            }
            ],
            [
            {
                "action": {
                    "type": "text",
                    "payload": "{\"button\": \"6\"}",
                    "label": `${message.user.admin == true ? `Acomands` : `Недоступно`}` 
                },
                "color": `${message.user.admin == true ? `positive` : `negative`}`
            },
            {
                "action": {
                    "type": "text",
                    "payload": "{\"button\": \"6\"}",
                    "label": `${message.user.employee1 == true ? `СотрCommands` : message.user.employee2 == true ? `СотрCommands` : message.user.employee3 == true ? `СотрCommands` : 
                        message.user.employee4 == true ? `СотрCommands` : message.user.employee5 == true ? `СотрCommands` : message.user.employee6 == true ? `СотрCommands` : message.user.employee7 == true ? 
                        `СотрCommands` : `Недоступно`}` 
                },
                "color": `${message.user.employee1 == true ? `positive` : message.user.employee2 == true ? `positive` : message.user.employee3 == true ?`positive` : 
                        message.user.employee4 == true ? `positive` : message.user.employee5 == true ? `positive` : message.user.employee6 == true ? `positive` : message.user.employee7 == true ? 
                        `positive` : `negative`}` 
            }
            ],     
            ],
        })
    })
});
//save: vk.api.messages.send({ user_id: message.user.id, message: `Да это же сам [id${message.user.id}|${message.user.tag}]!! `, 

cmd.hear(/^(?:Аренда)$/i, async (message, bot) => {
     message.user.wantto = -999;
return bot(`Выбирая сервер, Вы подтверждаете, что имеете жильё или гостиницу на данном сервере. Без жилья или гостиницы мы не сможем Вам выдать автомобиль, так устроена система проекта.
    Пожалуйста, выберите сервер:`,
     {
        keyboard:JSON.stringify(
        {
            "one_time": false,
            "buttons": [
            [
            {
                "action":{
                    "type": "text",
                    "payload": "{\"button\": \"6\"}",
                    "label": "Сервер 1",
                },
                "color": `primary`,
            },
            {
                "action":{
                    "type": "text",
                    "payload": "{\"button\": \"6\"}",
                    "label": "Сервер 2",
                },
                "color": `primary`,
            },
            {
                "action":{
                    "type": "text",
                    "payload": "{\"button\": \"6\"}",
                    "label": "Сервер 3",
                },
                "color": `primary`,
            },
            ],
            [
            {
                "action":{
                    "type": "text",
                    "payload": "{\"button\": \"6\"}",
                    "label": "Сервер 4",
                },
                "color": `primary`,
            },
            {
                "action":{
                    "type": "text",
                    "payload": "{\"button\": \"6\"}",
                    "label": "Сервер 5",
                },
                "color": `primary`,
            },
            {
                "action": {
                    "type": "text",
                    "payload": "{\"button\": \"6\"}",
                    "label": `Сервер 6` 
                },
                "color": `primary`
            }
            ],     
            [
            {
                "action": {
                    "type": "text",
                    "payload": "{\"button\": \"6\"}",
                    "label": `Сервер 7` 
                },
                "color": `primary`
            }
            ],
            [
            {
                "action": {
                    "type": "text",
                    "payload": "{\"button\": \"6\"}",
                    "label": `Назад` 
                },
                "color": `positive`
            }
            ],   
            ],
        })
    })

});


cmd.hear(/^(?:Арендовать)\s([0-9]+)$/i, async (message, bot) => {
     message.user.wantto = -999;
return bot(`подтвердите, что у Вас есть жильё или гостиница. Без этого, мы не сможем дать доступ к автомобилю. Так уж устроен проект.`,
     {
        keyboard:JSON.stringify(
        {
            "one_time": false,
            "buttons": [
            [
            {
                "action":{
                    "type": "text",
                    "payload": "{\"button\": \"6\"}",
                    "label": `Подтвердить ${message.args[1]}`,
                },
                "color": `negative`
            },
            ],
            [
            {
                "action":{
                    "type": "text",
                    "payload": "{\"button\": \"6\"}",
                    "label": "Назад",
                },
                "color": `primary`,
            },
            ],        
            ],
        })
    })
})

//во все команды воткнуть message.user.wantto = -999
//message.user.

cmd.hear(/^(?:30)\s(минут)$/i, async (message, bot) => {
    if (message.user.zakaz) return bot(`у Вас уже есть автомобиль, который Вы заказали. Ожидайте, когда Вам его одобрят, прежде чем сделать ещё один заказ.`)
if (message.user.wantto == -999) return bot(`Вы не выбрали автомобиль.`)
    let auto = autos.find(x => x.uid === Number(message.user.wantto))
    let user = users.find(x => x.uid === Number(auto.person_uid))
    message.user.wanttoTIME = '30 минут'; 
vk.api.messages.send({ user_id: user.id, message: `Вам пришёл заказ! 
Заказчик - [id${message.user.id}|${message.user.tag}].
Автомобиль: ${auto.name_auto} [${auto.uid}]. 
Время аренды: ${message.user.wanttoTIME}`})
let uzer = users.find(x => x.uid === 0)
vk.api.messages.send({ user_id: user.id, message: `[id${user.id}|${user.tag}]'у пришёл заказ.
Заказчик - [id${message.user.id}|${message.user.tag}].
Автомобиль: ${auto.name_auto}. 
Время аренды: ${message.user.wanttoTIME}.
Цена: ${auto.cost30m} [С учетом залога ${Number(auto.cost30m) + Number(auto.zalog)}]`})
message.user.wanttoLAST = message.user.wantto; message.user.wantto = -999; 
message.user.wanttoTIMELAST = message.user.wanttoTIME; message.user.wanttoTIME = -999; message.user.zakaz = true;
return bot(`заказ оформлен, чтобы отменить заказ введите команду "Отменить заказ"`,
{
        keyboard:JSON.stringify(
        {
            "one_time": false,
            "inline": false,
            "buttons": [
            [
            {
                "action":{
                    "type": "text",
                    "payload": "{\"button\": \"6\"}",
                    "label": `Спасибо!`,
                },
                "color": `positive`
            },
            ],
            [
            {
                "action":{
                    "type": "text",
                    "payload": "{\"button\": \"6\"}",
                    "label": `Отменить заказ!`,
                },
                "color": `negative`
            },
            ]     
            ],
        })
    })
})
cmd.hear(/^(?:1)\s(час)$/i, async (message, bot) => {
    if (message.user.zakaz) return bot(`у Вас уже есть автомобиль, который Вы заказали. Ожидайте, когда Вам его одобрят, прежде чем сделать ещё один заказ.`)
if (message.user.wantto == -999) return bot(`Вы не выбрали автомобиль.`)
    let auto = autos.find(x => x.uid === Number(message.user.wantto))
    let user = users.find(x => x.uid === Number(auto.person_uid))
    message.user.wanttoTIME = '1 час';
vk.api.messages.send({ user_id: user.id, message: `Вам пришёл заказ! 
Заказчик - [id${message.user.id}|${message.user.tag}].
Автомобиль: ${auto.name_auto}. 
Время аренды: ${message.user.wanttoTIME}`})
let uzer = users.find(x => x.uid === 0)
vk.api.messages.send({ user_id: user.id, message: `[id${user.id}|${user.tag}]'у пришёл заказ.
Заказчик - [id${message.user.id}|${message.user.tag}].
Автомобиль: ${auto.name_auto}. 
Время аренды: ${message.user.wanttoTIME}.
Цена: ${auto.cost1h} [С учетом залога ${Number(auto.cost1h) + Number(auto.zalog)}]`})
message.user.wanttoLAST = message.user.wantto; message.user.wantto = -999; 
message.user.wanttoTIMELAST = message.user.wanttoTIME; message.user.wanttoTIME = -999; message.user.zakaz = true;
return bot(`заказ оформлен, чтобы отменить заказ введите команду "Отменить заказ"`,
{
        keyboard:JSON.stringify(
        {
            "one_time": false,
            "inline": false,
            "buttons": [
            [
            {
                "action":{
                    "type": "text",
                    "payload": "{\"button\": \"6\"}",
                    "label": `Спасибо!`,
                },
                "color": `positive`
            },
            ],
            [
            {
                "action":{
                    "type": "text",
                    "payload": "{\"button\": \"6\"}",
                    "label": `Отменить заказ!`,
                },
                "color": `negative`
            },
            ]     
            ],
        })
    })
})
cmd.hear(/^(?:2)\s(часа)$/i, async (message, bot) => {
    if (message.user.zakaz) return bot(`у Вас уже есть автомобиль, который Вы заказали. Ожидайте, когда Вам его одобрят, прежде чем сделать ещё один заказ.`)
if (message.user.wantto == -999) return bot(`Вы не выбрали автомобиль.`)
    let auto = autos.find(x => x.uid === Number(message.user.wantto))
    let user = users.find(x => x.uid === Number(auto.person_uid))
    message.user.wanttoTIME = '2 часа';
vk.api.messages.send({ user_id: user.id, message: `Вам пришёл заказ! 
Заказчик - [id${message.user.id}|${message.user.tag}].
Автомобиль: ${auto.name_auto}. 
Время аренды: ${message.user.wanttoTIME}`})
let uzer = users.find(x => x.uid === 0)
vk.api.messages.send({ user_id: user.id, message: `[id${user.id}|${user.tag}]'у пришёл заказ.
Заказчик - [id${message.user.id}|${message.user.tag}].
Автомобиль: ${auto.name_auto}. 
Время аренды: ${message.user.wanttoTIME}.
Цена: ${auto.cost2h} [С учетом залога ${Number(auto.cost2h) + Number(auto.zalog)}]`})
message.user.wanttoLAST = message.user.wantto; message.user.wantto = -999; 
message.user.wanttoTIMELAST = message.user.wanttoTIME; message.user.wanttoTIME = -999; message.user.zakaz = true;
return bot(`заказ оформлен, чтобы отменить заказ введите команду "Отменить заказ"`,
{
        keyboard:JSON.stringify(
        {
            "one_time": false,
            "inline": false,
            "buttons": [
            [
            {
                "action":{
                    "type": "text",
                    "payload": "{\"button\": \"6\"}",
                    "label": `Спасибо!`,
                },
                "color": `positive`
            },
            ],
            [
            {
                "action":{
                    "type": "text",
                    "payload": "{\"button\": \"6\"}",
                    "label": `Отменить заказ!`,
                },
                "color": `negative`
            },
            ]     
            ],
        })
    })

})
cmd.hear(/^(?:1)\s(день)$/i, async (message, bot) => {
if (message.user.zakaz) return bot(`у Вас уже есть автомобиль, который Вы заказали. Ожидайте, когда Вам его одобрят, прежде чем сделать ещё один заказ.`)
if (message.user.wantto == -999) return bot(`Вы не выбрали автомобиль.`)
let auto = autos.find(x => x.uid === Number(message.user.wantto))
let user = users.find(x => x.uid === Number(auto.person_uid))
 message.user.wanttoTIME = '1 день';
vk.api.messages.send({ user_id: user.id, message: `Вам пришёл заказ! 
Заказчик - [id${message.user.id}|${message.user.tag}].
Автомобиль: ${auto.name_auto}. 
Время аренды: ${message.user.wanttoTIME}`})
let uzer = users.find(x => x.uid === 0)
vk.api.messages.send({ user_id: user.id, message: `[id${user.id}|${user.tag}]'у пришёл заказ.
Заказчик - [id${message.user.id}|${message.user.tag}].
Автомобиль: ${auto.name_auto}. 
Время аренды: ${message.user.wanttoTIME}.
Цена: ${auto.cost1d} [С учетом залога ${Number(auto.cost1d) + Number(auto.zalog)}]`})
message.user.wanttoLAST = message.user.wantto; message.user.wantto = -999; 
message.user.wanttoTIMELAST = message.user.wanttoTIME; message.user.wanttoTIME = -999; message.user.zakaz = true;
return bot(`заказ оформлен, чтобы отменить заказ введите команду "Отменить заказ"`,
{
        keyboard:JSON.stringify(
        {
            "one_time": false,
            "inline": false,
            "buttons": [
            [
            {
                "action":{
                    "type": "text",
                    "payload": "{\"button\": \"6\"}",
                    "label": `Спасибо!`,
                },
                "color": `positive`
            },
            ],
            [
            {
                "action":{
                    "type": "text",
                    "payload": "{\"button\": \"6\"}",
                    "label": `Отменить заказ!`,
                },
                "color": `negative`
            },
            ]     
            ],
        })
    })

})
cmd.hear(/^(?:1)\s(неделя)$/i, async (message, bot) => {
if (message.user.zakaz) return bot(`у Вас уже есть автомобиль, который Вы заказали. Ожидайте, когда Вам его одобрят, прежде чем сделать ещё один заказ.`)
if (message.user.wantto == -999) return bot(`Вы не выбрали автомобиль.`)
let auto = autos.find(x => x.uid === Number(message.user.wantto))
let user = users.find(x => x.uid === Number(auto.person_uid))
message.user.wanttoTIME = '1 неделя';
vk.api.messages.send({ user_id: user.id, message: `Вам пришёл заказ! 
Заказчик - [id${message.user.id}|${message.user.tag}].
Автомобиль: ${auto.name_auto}. 
Время аренды: ${message.user.wanttoTIME}`})
let uzer = users.find(x => x.uid === 0)
vk.api.messages.send({ user_id: user.id, message: `[id${user.id}|${user.tag}]'у пришёл заказ.
Заказчик - [id${message.user.id}|${message.user.tag}].
Автомобиль: ${auto.name_auto}. 
Время аренды: ${message.user.wanttoTIME}.
Цена: ${auto.cost1w} [С учетом залога ${Number(auto.cost1w) + Number(auto.zalog)}]`})
message.user.wanttoLAST = message.user.wantto; message.user.wantto = -999; 
message.user.wanttoTIMELAST = message.user.wanttoTIME; message.user.wanttoTIME = -999; message.user.zakaz = true;
return bot(`заказ оформлен, чтобы отменить заказ введите команду "Отменить заказ"`,
{
        keyboard:JSON.stringify(
        {
            "one_time": false,
            "inline": false,
            "buttons": [
            [
            {
                "action":{
                    "type": "text",
                    "payload": "{\"button\": \"6\"}",
                    "label": `Спасибо!`,
                },
                "color": `positive`
            },
            ],
            [
            {
                "action":{
                    "type": "text",
                    "payload": "{\"button\": \"6\"}",
                    "label": `Отменить заказ!`,
                },
                "color": `negative`
            },
            ]     
            ],
        })
    })
})

cmd.hear(/^(?:Отменить)\s(заказ|заказ!)$/i, async (message, bot) => {
    if (!message.user.zakaz) return bot(`у Вас нет активных заказов!`)
let auto = autos.find(x => x.uid === Number(message.user.wanttoLAST))
let user = users.find(x => x.uid === Number(auto.person_uid))
vk.api.messages.send({ user_id: user.id, message: `Заказ от [id${message.user.id}|${message.user.tag}] на автомобиль ${auto.name_auto} (время аренды: ${message.user.wanttoTIMELAST})
    был отменён!`})
message.user.zakaz = false; message.user.wanttoLAST = -999; message.user.wanttoTIMELAST = -999;
return bot(`Вы успешно отменили свой заказ!`,
 {
        keyboard:JSON.stringify(
        {
            "one_time": false,
            "buttons": [
            [
            {
                "action":{
                    "type": "text",
                    "payload": "{\"button\": \"6\"}",
                    "label": `Аренда`,
                },
                "color": `positive`
            },
            ],
            [
            {
                "action":{
                    "type": "text",
                    "payload": "{\"button\": \"6\"}",
                    "label": "О нас",
                },
                "color": `primary`,
            },
            {
                "action": {
                    "type": "text",
                    "payload": "{\"button\": \"6\"}",
                    "label": "Устроиться",
                },
                "color": `primary`,
            }
            ],     
            [
            {
                "action": {
                    "type": "text",
                    "payload": "{\"button\": \"6\"}",
                    "label": `Профиль` 
                },
                "color": `primary`
            }
            ],
            [
            {
                "action": {
                    "type": "text",
                    "payload": "{\"button\": \"6\"}",
                    "label": `${message.user.admin == true ? `Acomands` : `Недоступно`}` 
                },
                "color": `${message.user.admin == true ? `positive` : `negative`}`
            },
            {
                "action": {
                    "type": "text",
                    "payload": "{\"button\": \"6\"}",
                    "label": `${message.user.employee1 == true ? `СотрCommands` : message.user.employee2 == true ? `СотрCommands` : message.user.employee3 == true ? `СотрCommands` : 
                        message.user.employee4 == true ? `СотрCommands` : message.user.employee5 == true ? `СотрCommands` : message.user.employee6 == true ? `СотрCommands` : message.user.employee7 == true ? 
                        `СотрCommands` : `Недоступно`}` 
                },
                "color": `${message.user.employee1 == true ? `positive` : message.user.employee2 == true ? `positive` : message.user.employee3 == true ?`positive` : 
                        message.user.employee4 == true ? `positive` : message.user.employee5 == true ? `positive` : message.user.employee6 == true ? `positive` : message.user.employee7 == true ? 
                        `positive` : `negative`}` 
            }
            ],     
            ],
        })
    })
})

cmd.hear(/^(?:Подтвердить)\s([0-9]+)$/i, async (message, bot) => {
    let auto = autos.find(x => x.uid === Number(message.args[1]))
    message.user.wantto = message.args[1];
vk.api.messages.send({ user_id: message.user.id, message:`
    1. Залог: ${auto.zalog}
    2. 30 минут: ${auto.cost30m} [С учетом залога ${Number(auto.cost30m) + Number(auto.zalog)}]
    3. 1 час: ${auto.cost1h} [С учетом залога ${Number(auto.cost1h) + Number(auto.zalog)}]
    4. 2 часа: ${auto.cost2h} [С учетом залога ${Number(auto.cost2h) + Number(auto.zalog)}]
    5. 1 день: ${auto.cost1d} [С учетом залога ${Number(auto.cost1d) + Number(auto.zalog)}]
    6. 1 неделя: ${auto.cost1w} [С учетом залога ${Number(auto.cost1w) + Number(auto.zalog)}]
    Выберите время:`, keyboard:JSON.stringify(
        {
            "one_time": false,
            "buttons": [
            [
            {
                "action":{
                    "type": "text",
                    "payload": "{\"button\": \"6\"}",
                    "label": `30 минут`,
                },
                "color": `primary`
            },
            {
                "action":{
                    "type": "text",
                    "payload": "{\"button\": \"6\"}",
                    "label": "1 час",
                },
                "color": `primary`,
            },
            {
                "action":{
                    "type": "text",
                    "payload": "{\"button\": \"6\"}",
                    "label": "2 часа",
                },
                "color": `primary`,
            },
            ],
            [
            {
                "action":{
                    "type": "text",
                    "payload": "{\"button\": \"6\"}",
                    "label": "Весь день",
                },
                "color": `primary`,
            },
            {
                "action": {
                    "type": "text",
                    "payload": "{\"button\": \"6\"}",
                    "label": "Неделя",
                },
                "color": `primary`,
            },
            {
                "action": {
                    "type": "text",
                    "payload": "{\"button\": \"6\"}",
                    "label": `Назад` 
                },
                "color": `negative`
            }
            ],     
            ],
        })
})
})

cmd.hear(/^(?:Назад|понятно|спасибо!)$/i, async (message, bot) => {
    message.user.wantto = -999;
 return bot(`успешно!`,
    {
        keyboard:JSON.stringify(
        {
            "one_time": false,
            "buttons": [
            [
            {
                "action":{
                    "type": "text",
                    "payload": "{\"button\": \"6\"}",
                    "label": `Аренда`,
                },
                "color": `positive`
            },
            ],
            [
            {
                "action":{
                    "type": "text",
                    "payload": "{\"button\": \"6\"}",
                    "label": "О нас",
                },
                "color": `primary`,
            },
            {
                "action": {
                    "type": "text",
                    "payload": "{\"button\": \"6\"}",
                    "label": "Устроиться",
                },
                "color": `primary`,
            }
            ],     
            [
            {
                "action": {
                    "type": "text",
                    "payload": "{\"button\": \"6\"}",
                    "label": `Профиль` 
                },
                "color": `primary`
            }
            ],
            [
            {
                "action": {
                    "type": "text",
                    "payload": "{\"button\": \"6\"}",
                    "label": `${message.user.admin == true ? `Acomands` : `Недоступно`}` 
                },
                "color": `${message.user.admin == true ? `positive` : `negative`}`
            },
            {
                "action": {
                    "type": "text",
                    "payload": "{\"button\": \"6\"}",
                    "label": `${message.user.employee1 == true ? `СотрCommands` : message.user.employee2 == true ? `СотрCommands` : message.user.employee3 == true ? `СотрCommands` : 
                        message.user.employee4 == true ? `СотрCommands` : message.user.employee5 == true ? `СотрCommands` : message.user.employee6 == true ? `СотрCommands` : message.user.employee7 == true ? 
                        `СотрCommands` : `Недоступно`}` 
                },
                "color": `${message.user.employee1 == true ? `positive` : message.user.employee2 == true ? `positive` : message.user.employee3 == true ? `positive` : 
                        message.user.employee4 == true ? `positive` : message.user.employee5 == true ? `positive` : message.user.employee6 == true ? `positive` : message.user.employee7 == true ? 
                        `positive` : `negative`}` 
            }
            ],     
            ],
        })
    })

});

cmd.hear(/^(?:Сервер)\s([0-9]+)$/i, async (message, bot) => {
 message.user.wantto = -999;
if (message.args[1] == 1){
    let user = users.find(x=> ((x.uid == 0) && (x.admin == true)));
    var flag = false;
    if (user.empl1 == 0){return bot('сейчас нет свободных автомобилей') }
        var temp = -1;
        for (var i = 0; i < users.length; i++){
        let user = users.find(x=> ((x.employee1 === true) && (x.online === true) && (x.uid > temp)));
       if (user){
        flag = true;
        temp = user.uid;
vk.api.messages.send({ user_id: message.user.id, message: `Список доступных авто на данный момент на ${message.args[1]} сервере: `, 
        template: user.keyboard1
    }) 
}
}
if (flag == false) return bot('сейчас нет свободных автомобилей')
 if (flag) flag = false;

} 

if (message.args[1] == 2){
    let user = users.find(x=> ((x.uid == 0) && (x.admin == true)));
    var flag = false;
    if (user.empl2 == 0){ 
        return bot('сейчас нет свободных автомобилей') }
        var temp = -1;
        for (var i = 0; i < users.length; i++){
        let user = users.find(x=> ((x.employee2 === true) && (x.online === true) && (x.uid > temp)));
       if (user){
        temp = user.uid;
        flag = true;
vk.api.messages.send({ user_id: message.user.id, message: `Список доступных авто на данный момент на ${message.args[1]} сервере: `, 
        template: user.keyboard2
    }) 
}
}
if (flag == false) return bot('сейчас нет свободных автомобилей')
 if (flag) flag = false;
} 

if (message.args[1] == 3){
    let user = users.find(x=> ((x.uid == 0) && (x.admin == true)));
    var flag = false;
    if (user.empl3 == 0){ 
        return bot('сейчас нет свободных автомобилей') }
        var temp = -1;
        for (var i = 0; i < users.length; i++){
        let user = users.find(x=> ((x.employee3 === true) && (x.online === true) && (x.uid > temp)));
       if (user){
        flag = true;
        temp = user.uid;
vk.api.messages.send({ user_id: message.user.id, message: `Список доступных авто на данный момент на ${message.args[1]} сервере: `, 
        template: user.keyboard3
    }) 
}
}
if (flag == false) return bot('сейчас нет свободных автомобилей')
 if (flag) flag = false;
} 

if (message.args[1] == 4){
    let user = users.find(x=> ((x.uid == 0) && (x.admin == true)));
    var flag = false;
    if (user.empl4 == 0){ 
        return bot('сейчас нет свободных автомобилей') }
        var temp = -1;
        for (var i = 0; i < users.length; i++){
        let user = users.find(x=> ((x.employee4 === true) && (x.online === true) && (x.uid > temp)));
       if (user){
        flag = true;
        temp = user.uid;
vk.api.messages.send({ user_id: message.user.id, message: `Список доступных авто на данный момент на ${message.args[1]} сервере: `, 
        template: user.keyboard4
    }) 
}
}
if (flag == false) return bot('сейчас нет свободных автомобилей')
 if (flag) flag = false;
} 

if (message.args[1] == 5){
    let user = users.find(x=> ((x.uid == 0) && (x.admin == true)));
    var flag = false;
    if (user.empl5 == 0){ 
        return bot('сейчас нет свободных автомобилей') }
        var temp = -1;
        for (var i = 0; i < users.length; i++){
        let user = users.find(x=> ((x.employee5 === true) && (x.online === true) && (x.uid > temp)));
       if (user){
        flag = true;
        temp = user.uid;
vk.api.messages.send({ user_id: message.user.id, message: `Список доступных авто на данный момент на ${message.args[1]} сервере: `, 
        template: user.keyboard5
    }) 
}
}
if (flag == false) return bot('сейчас нет свободных автомобилей')
 if (flag) flag = false;
} 

if (message.args[1] == 6){
    let user = users.find(x=> ((x.uid == 0) && (x.admin == true)));
    var flag = false;
    if (user.empl6 == 0){ 
        return bot('сейчас нет свободных автомобилей') }
        var temp = -1;
        for (var i = 0; i < users.length; i++){
        let user = users.find(x=> ((x.employee6 === true) && (x.online === true) && (x.uid > temp)));
       if (user){
        flag = true;
        temp = user.uid;
vk.api.messages.send({ user_id: message.user.id, message: `Список доступных авто на данный момент на ${message.args[1]} сервере: `, 
        template: user.keyboard6
    }) 
}
}
if (flag == false) return bot('сейчас нет свободных автомобилей')
 if (flag) flag = false;
} 

if (message.args[1] == 7){
    let user = users.find(x=> ((x.uid == 0) && (x.admin == true)));
    var flag = false;
    if (user.empl7 == 0){ 
        return bot('сейчас нет свободных автомобилей') 
    } var temp = -1;
        for (var i = 0; i < users.length; i++){
        let user = users.find(x=> ((x.employee7 === true) && (x.online === true) && (x.uid > temp)));
       if (user){
        flag = true;
        temp = user.uid;
vk.api.messages.send({ user_id: message.user.id, message: `Список доступных авто на данный момент на ${message.args[1]} сервере: `, 
        template: user.keyboard7
    }) 
}
}
if (flag == false) return bot('сейчас нет свободных автомобилей')
 if (flag) flag = false;
} 


})

cmd.hear(/^(?:Нанять)\s([0-9]+)\s([0-9]+)$/i, async (message, bot) => {
    if (!message.user.admin) return bot(`команда только для админов`)
    let user = users.find(x=> x.uid === Number(message.args[1]))  
    if (!user) return bot (`неверный UID.`)
     vk.api.messages.send({ user_id: message.user.id, message: `Вы наняли сотрудника.`,
        keyboard:JSON.stringify(
        {
            "one_time": false,
            "buttons": [
            [
            {
                "action":{
                    "type": "text",
                    "payload": "{\"button\": \"6\"}",
                    "label": `Аренда`,
                },
                "color": `positive`
            },
            ],
            [
            {
                "action":{
                    "type": "text",
                    "payload": "{\"button\": \"6\"}",
                    "label": "О нас",
                },
                "color": `primary`,
            },
            {
                "action": {
                    "type": "text",
                    "payload": "{\"button\": \"6\"}",
                    "label": "Устроиться",
                },
                "color": `primary`,
            }
            ],     
            [
            {
                "action": {
                    "type": "text",
                    "payload": "{\"button\": \"6\"}",
                    "label": `Профиль` 
                },
                "color": `primary`
            }
            ],
            [
            {
                "action": {
                    "type": "text",
                    "payload": "{\"button\": \"6\"}",
                    "label": `${message.user.admin == true ? `Acomands` : `Недоступно`}` 
                },
                "color": `${message.user.admin == true ? `positive` : `negative`}`
            },
            {
                "action": {
                    "type": "text",
                    "payload": "{\"button\": \"6\"}",
                    "label": `${message.user.employee1 == true ? `СотрCommands` : message.user.employee2 == true ? `СотрCommands` : message.user.employee3 == true ? `СотрCommands` : 
                        message.user.employee4 == true ? `СотрCommands` : message.user.employee5 == true ? `СотрCommands` : message.user.employee6 == true ? `СотрCommands` : message.user.employee7 == true ? 
                        `СотрCommands` : `Недоступно`}` 
                },
                "color": `${message.user.employee1 == true ? `positive` : message.user.employee2 == true ? `positive` : message.user.employee3 == true ?`positive` : 
                        message.user.employee4 == true ? `positive` : message.user.employee5 == true ? `positive` : message.user.employee6 == true ? `positive` : message.user.employee7 == true ? 
                        `positive` : `negative`}` 
            }
            ],     
            ],
        })
    });
    if (message.args[2] == 1){ 
    let uzer = users.find(x=> x.uid === 0) 
    uzer.empl1++;
    user.employee1 = true;
    }
        if (message.args[2] == 2){ 
    let uzer = users.find(x=> x.uid === 0) 
    uzer.empl2++;
    user.employee2 = true;
    }
        if (message.args[2] == 3){ 
    let uzer = users.find(x=> x.uid === 0) 
    uzer.empl3++;
    user.employee3 = true;
    }
        if (message.args[2] == 4){ 
    let uzer = users.find(x=> x.uid === 0) 
    uzer.empl4++;
    user.employee4 = true;
    }
        if (message.args[2] == 5){ 
    let uzer = users.find(x=> x.uid === 0) 
    uzer.empl5++;
    user.employee5 = true;
    }
        if (message.args[2] == 6){ 
    let uzer = users.find(x=> x.uid === 0) 
    uzer.empl6++;
    user.employee6 = true;
    }
        if (message.args[2] == 7){ 
    let uzer = users.find(x=> x.uid === 0) 
    uzer.empl7++;
    user.employee7 = true;
    }
         vk.api.messages.send({ user_id: user.id, message: `Вас наняли на работу на ${message.args[2]} сервере.`,
        keyboard:JSON.stringify(
        {
            "one_time": false,
            "buttons": [
            [
            {
                "action":{
                    "type": "text",
                    "payload": "{\"button\": \"6\"}",
                    "label": `Аренда`,
                },
                "color": `positive`
            },
            ],
            [
            {
                "action":{
                    "type": "text",
                    "payload": "{\"button\": \"6\"}",
                    "label": "О нас",
                },
                "color": `primary`,
            },
            {
                "action": {
                    "type": "text",
                    "payload": "{\"button\": \"6\"}",
                    "label": "Устроиться",
                },
                "color": `primary`,
            }
            ],     
            [
            {
                "action": {
                    "type": "text",
                    "payload": "{\"button\": \"6\"}",
                    "label": `Профиль` 
                },
                "color": `primary`
            }
            ],
            [
            {
                "action": {
                    "type": "text",
                    "payload": "{\"button\": \"6\"}",
                    "label": `${user.admin == true ? `Acomands` : `Недоступно`}` 
                },
                "color": `${user.admin == true ? `positive` : `negative`}`
            },
            {
                "action": {
                    "type": "text",
                    "payload": "{\"button\": \"6\"}",
                    "label": `${user.employee1 == true ? `СотрCommands` : user.employee2 == true ? `СотрCommands` : user.employee3 == true ? `СотрCommands` : 
                       user.employee4 == true ? `СотрCommands` : user.employee5 == true ? `СотрCommands` : user.employee6 == true ? `СотрCommands` : user.employee7 == true ? 
                        `СотрCommands` : `Недоступно`}` 
                },
                "color": `${user.employee1 == true ? `positive` : user.employee2 == true ? `positive` : user.employee3 == true ?`positive` : 
                        user.employee4 == true ? `positive` : user.employee5 == true ? `positive` : user.employee6 == true ? `positive` : user.employee7 == true ? 
                        `positive` : `negative`}` 
            }
            ],     
            ],
        }) 
    })
});
cmd.hear(/^(?:Уволить)\s([0-9]+)\s([0-9]+)$/i, async (message, bot) => {
    if (!message.user.admin) return bot(`команда только для админов!`)
    let user = users.find(x=> x.uid === Number(message.args[1])) 
    if ((!user.employee1) && (!user.employee2) && (!user.employee3) && (!user.employee4) && (!user.employee5) &&
        (!user.employee6) && (!user.employee7)) return bot(`данный UID не является Вашим сотрудником.`)
     vk.api.messages.send({ user_id: message.user.id, message: `Вы уволили сотрудника.`,
      keyboard:JSON.stringify(
        {
            "one_time": false,
            "buttons": [
            [
            {
                "action":{
                    "type": "text",
                    "payload": "{\"button\": \"6\"}",
                    "label": `Аренда`,
                },
                "color": `positive`
            },
            ],
            [
            {
                "action":{
                    "type": "text",
                    "payload": "{\"button\": \"6\"}",
                    "label": "О нас",
                },
                "color": `primary`,
            },
            {
                "action": {
                    "type": "text",
                    "payload": "{\"button\": \"6\"}",
                    "label": "Устроиться",
                },
                "color": `primary`,
            }
            ],     
            [
            {
                "action": {
                    "type": "text",
                    "payload": "{\"button\": \"6\"}",
                    "label": `Профиль` 
                },
                "color": `primary`
            }
            ],
            [
            {
                "action": {
                    "type": "text",
                    "payload": "{\"button\": \"6\"}",
                    "label": `${message.user.admin == true ? `Acomands` : `Недоступно`}` 
                },
                "color": `${message.user.admin == true ? `positive` : `negative`}`
            },
            {
                "action": {
                    "type": "text",
                    "payload": "{\"button\": \"6\"}",
                    "label": `${message.user.employee1 == true ? `СотрCommands` : message.user.employee2 == true ? `СотрCommands` : message.user.employee3 == true ? `СотрCommands` : 
                        message.user.employee4 == true ? `СотрCommands` : message.user.employee5 == true ? `СотрCommands` : message.user.employee6 == true ? `СотрCommands` : message.user.employee7 == true ? 
                        `СотрCommands` : `Недоступно`}` 
                },
                "color": `${message.user.employee1 == true ? `positive` : message.user.employee2 == true ? `positive` : message.user.employee3 == true ?`positive` : 
                        message.user.employee4 == true ? `positive` : message.user.employee5 == true ? `positive` : message.user.employee6 == true ? `positive` : message.user.employee7 == true ? 
                        `positive` : `negative`}` 
            }
            ],     
            ],
        })
    });
     vk.api.messages.send({ user_id: user.id, message: `Вас уволили с работы на ${message.args[2]} сервере.`,
      keyboard:JSON.stringify(
        {
            "one_time": false,
            "buttons": [
            [
            {
                "action":{
                    "type": "text",
                    "payload": "{\"button\": \"6\"}",
                    "label": `Аренда`,
                },
                "color": `positive`
            },
            ],
            [
            {
                "action":{
                    "type": "text",
                    "payload": "{\"button\": \"6\"}",
                    "label": "О нас",
                },
                "color": `primary`,
            },
            {
                "action": {
                    "type": "text",
                    "payload": "{\"button\": \"6\"}",
                    "label": "Устроиться",
                },
                "color": `primary`,
            }
            ],     
            [
            {
                "action": {
                    "type": "text",
                    "payload": "{\"button\": \"6\"}",
                    "label": `Профиль` 
                },
                "color": `primary`
            }
            ],
            [
            {
                "action": {
                    "type": "text",
                    "payload": "{\"button\": \"6\"}",
                    "label": `${user.admin == true ? `Acomands` : `Недоступно`}` 
                },
                "color": `${user.admin == true ? `positive` : `negative`}`
            },
            {
                "action": {
                    "type": "text",
                    "payload": "{\"button\": \"6\"}",
                    "label": `${user.employee1 == true ? `СотрCommands` : user.employee2 == true ? `СотрCommands` : user.employee3 == true ? `СотрCommands` : 
                        user.employee4 == true ? `СотрCommands` : user.employee5 == true ? `СотрCommands` : user.employee6 == true ? `СотрCommands` : user.employee7 == true ? 
                        `СотрCommands` : `Недоступно`}` 
                },
                "color": `${user.employee1 == true ? `positive` : user.employee2 == true ? `positive` : user.employee3 == true ?`positive` : 
                        user.employee4 == true ? `positive` : user.employee5 == true ? `positive` : user.employee6 == true ? `positive` : user.employee7 == true ? 
                        `positive` : `negative`}` 
            }
            ],     
            ],
        })
    });
     if (message.args[2] == 1){
     user.employee1 = false;
     user.keyboard1 = false;
     let uzer = users.find(x=> x.uid === 0) 
     uzer.empl1--;
    }
         if (message.args[2] == 2){
     user.employee2 = false;
     user.keyboard2 = false;
     let uzer = users.find(x=> x.uid === 0) 
     uzer.empl2--;
    }
         if (message.args[2] == 3){
     user.employee3 = false;
     user.keyboard3 = false;
     let uzer = users.find(x=> x.uid === 0) 
     uzer.empl3--;
    }
         if (message.args[2] == 4){
     user.employee4 = false;
     user.keyboard4 = false;
     let uzer = users.find(x=> x.uid === 0) 
     uzer.empl4--;
    }
         if (message.args[2] == 5){
     user.employee5 = false;
     user.keyboard5 = false;
     let uzer = users.find(x=> x.uid === 0) 
     uzer.empl5--;
    }
         if (message.args[2] == 6){
     user.employee6 = false;
     user.keyboard6 = false;
     let uzer = users.find(x=> x.uid === 0) 
     uzer.empl6--;
    }
         if (message.args[2] == 7){
     user.employee7 = false;
     user.keyboard7 = false;
     let uzer = users.find(x=> x.uid === 0) 
     uzer.empl7--;
    }
});



cmd.hear(/^(?:онлайн|online)$/i, async (message, bot) => {
    if ((message.user.employee1 !== true) && (message.user.employee2 !== true) && (message.user.employee3 !== true) && (message.user.employee4 !== true) && (message.user.employee5 !== true) && (message.user.employee6 !== true) 
        && (message.user.employee7 !== true)) return bot (`команда лишь для сотрудников.`)
    message.user.online = true;
    return bot ('Вы авторизованы в системе. Ваши автомобили переданы в доступные автомобили.',
    {
        keyboard:JSON.stringify(
        {
            "one_time": false,
            "buttons": [
            [
            {
                "action":{
                    "type": "text",
                    "payload": "{\"button\": \"6\"}",
                    "label": `Аренда`,
                },
                "color": `positive`
            },
            ],
            [
            {
                "action":{
                    "type": "text",
                    "payload": "{\"button\": \"6\"}",
                    "label": "О нас",
                },
                "color": `primary`,
            },
            {
                "action": {
                    "type": "text",
                    "payload": "{\"button\": \"6\"}",
                    "label": "Устроиться",
                },
                "color": `primary`,
            }
            ],     
            [
            {
                "action": {
                    "type": "text",
                    "payload": "{\"button\": \"6\"}",
                    "label": `Профиль` 
                },
                "color": `primary`
            }
            ],
            [
            {
                "action": {
                    "type": "text",
                    "payload": "{\"button\": \"6\"}",
                    "label": `${message.user.admin == true ? `Acomands` : `Недоступно`}` 
                },
                "color": `${message.user.admin == true ? `positive` : `negative`}`
            },
            {
                "action": {
                    "type": "text",
                    "payload": "{\"button\": \"6\"}",
                    "label": `${message.user.employee1 == true ? `СотрCommands` : message.user.employee2 == true ? `СотрCommands` : message.user.employee3 == true ? `СотрCommands` : 
                        message.user.employee4 == true ? `СотрCommands` : message.user.employee5 == true ? `СотрCommands` : message.user.employee6 == true ? `СотрCommands` : message.user.employee7 == true ? 
                        `СотрCommands` : `Недоступно`}` 
                },
                "color": `${message.user.employee1 == true ? `positive` : message.user.employee2 == true ? `positive` : message.user.employee3 == true ? `positive` : 
                        message.user.employee4 == true ? `positive` : message.user.employee5 == true ? `positive` : message.user.employee6 == true ? `positive` : message.user.employee7 == true ? 
                        `positive` : `negative`}` 
            }
            ],     
            ],
        })
    })
});
cmd.hear(/^(?:офлайн|оффлайн|ofline|offline)$/i, async (message, bot) => {
    if ((message.user.employee1 !== true) && (message.user.employee2 !== true) && (message.user.employee3 !== true) && (message.user.employee4 !== true) && (message.user.employee5 !== true) && (message.user.employee6 !== true) 
        && (message.user.employee7 !== true) && (
        message.employee7 !== true)) return bot (`команда лишь для сотрудников.`)
    message.user.online = false;
    return bot ('Вы вышли. Ваши автомобили были удалены из базы.',
    {
        keyboard:JSON.stringify(
        {
            "one_time": false,
            "buttons": [
            [
            {
                "action":{
                    "type": "text",
                    "payload": "{\"button\": \"6\"}",
                    "label": `Аренда`,
                },
                "color": `positive`
            },
            ],
            [
            {
                "action":{
                    "type": "text",
                    "payload": "{\"button\": \"6\"}",
                    "label": "О нас",
                },
                "color": `primary`,
            },
            {
                "action": {
                    "type": "text",
                    "payload": "{\"button\": \"6\"}",
                    "label": "Устроиться",
                },
                "color": `primary`,
            }
            ],     
            [
            {
                "action": {
                    "type": "text",
                    "payload": "{\"button\": \"6\"}",
                    "label": `Профиль` 
                },
                "color": `primary`
            }
            ],
            [
            {
                "action": {
                    "type": "text",
                    "payload": "{\"button\": \"6\"}",
                    "label": `${message.user.admin == true ? `Acomands` : `Недоступно`}` 
                },
                "color": `${message.user.admin == true ? `positive` : `negative`}`
            },
            {
                "action": {
                    "type": "text",
                    "payload": "{\"button\": \"6\"}",
                    "label": `${message.user.employee1 == true ? `СотрCommands` : message.user.employee2 == true ? `СотрCommands` : message.user.employee3 == true ? `СотрCommands` : 
                        message.user.employee4 == true ? `СотрCommands` : message.user.employee5 == true ? `СотрCommands` : message.user.employee6 == true ? `СотрCommands` : message.user.employee7 == true ? 
                        `СотрCommands` : `Недоступно`}` 
                },
                "color": `${message.user.employee1 == true ? `positive` : message.user.employee2 == true ? `positive` : message.user.employee3 == true ? `positive` : 
                        message.user.employee4 == true ? `positive` : message.user.employee5 == true ? `positive` : message.user.employee6 == true ? `positive` : message.user.employee7 == true ? 
                        `positive` : `negative`}` 
            }
            ],     
            ],
        })
    })
});

cmd.hear(/^(?:СотрCommands|СотрComands)$/i, async (message, bot) => {
        if ((message.user.employee1 !== true) && (message.user.employee2 !== true) && (message.user.employee3 !== true) && (message.user.employee4 !== true) && (message.user.employee5 !== true) && (message.user.employee6 !== true) 
        && (message.user.employee7 !== true) && (
        message.employee7 !== true)) return bot (`команда лишь для сотрудников.`)
return bot(`Доступные команды:
    1. Онлайн - онлайн
    2. Оффлайн - оффлайн
    `,{
        keyboard:JSON.stringify(
        {
            "one_time": false,
            "inline": false,
            "buttons": [
            [
            {
                "action":{
                    "type": "text",
                    "payload": "{\"button\": \"6\"}",
                    "label": `Онлайн`,
                },
                "color": `positive`
            },
            {
                "action":{
                    "type": "text",
                    "payload": "{\"button\": \"6\"}",
                    "label": `Офлайн`,
                },
                "color": `negative`
            },
            ],   
            [
            {
                "action":{
                    "type": "text",
                    "payload": "{\"button\": \"6\"}",
                    "label": `Назад`,
                },
                "color": `primary`
            },
            ],   
            ],
        })
    })


});

cmd.hear(/^(?:Acomands|Акоманды|Aкоманды|Acommands|Аcommands)$/i, async (message, bot) => {
    if (message.user.admin !== true) return bot (`недоступно.`)
return bot(`Доступные команды:
    1. Сотрудники - посмотреть сотрудников, их UID и статус.
    2. Нанять UID [сервер] - нанять сотрудника по его UID с [1-7 сервера].
    3. Уволить UID [сервер] - уволить сотрудника по его UID с [1-7 сервера].
    3. reg [кол-во машин] [сервер] - регаем несколько авто на UID сотрудника на выбранном сервере (картинка автомобиля 221x136).
    4. Обновить [UID] [сервер] - обновить автомобили у UID.
    5. Удалить [id car] [сервер] - навсегда удалить автомобиль по его id с сервера.
    6. Забрали [id car] [сервер] - уводит автомобиль в неактив.
    7. Вернули [id car] [сервер] - возвращает автомобиль из неактива.
    Команды для главного администратора:
    1. Дать ADM [UID] - выдать админку.
    2. Забрать ADM [UID] - забрать админку.
    Специальные команды сотрудников:
    1. Онлайн - онлайн
    2. Оффлайн - оффлайн
    `,{
        keyboard:JSON.stringify(
        {
            "one_time": false,
            "inline": true,
            "buttons": [
            [
            {
                "action":{
                    "type": "text",
                    "payload": "{\"button\": \"6\"}",
                    "label": `Сотрудники`,
                },
                "color": `primary`
            },
            ],     
            ],
        })
    })


});


cmd.hear(/^(?:Сотрудники)$/i, async (message, bot) => {
    if(message.user.admin == true){
        let user = users.find(x=> (x.uid === 0))
        if ((user.empl1 == 0) && (user.empl2 == 0) && (user.empl3 == 0) && (user.empl4 == 0) && (user.empl5 == 0) && (user.empl6 == 0) && (user.empl7 == 0)) return bot(`у Вас ещё нет сотрудников`)
    await bot(`Нахожу информацию для вас по форме:\n
    [Server] - [Name] - [UID] - [Status]`)
    let flag = false; 
    temp = -3;
    for (var i = 0; i < users.length; i++){
        let user = users.find(x=> ((x.employee1 === true)||(x.employee2 === true)||(x.employee3 === true)||(x.employee4 === true)||(x.employee5 === true)||(x.employee6 === true)||(x.employee7 === true)) && (x.uid > temp))
        temp = user.uid;
        vk.api.messages.send({ user_id: message.user.id, message: `${user.employee1 == true ? '[1]' : user.employee2 == true ? '[2]' : user.employee3 == true ? '[3]' :
            user.employee4 == true ? '[4]' : user.employee5 == true ? '[5]' : user.employee6 == true ? '[6]' : '[7]'} - [id${message.user.id}|${message.user.tag}] - [${user.uid}] - [${user.online == false ? 'offline]' : 'online]'}`});
    }
} else return bot(`команда только для админов.`)
});

cmd.hear(/^(?:удалить)\s([0-9]+)\s([0-9]+)$/i, async (message, bot) => {
    if (!message.user.admin) return bot (`команда только для админов`)
    let auto = autos.find(x => x.uid === Number(message.args[1]))
    if (!auto) return bot ('такого id автомобиля нет, либо неправильный сервер')
    let user = users.find(x => x.uid === auto.person_uid); var del = Number(auto.uid)
    auto.full = true; user.registeredauto--; auto.now = true; autos.splice(del,1)
    return bot(`автомобиль [car id = ${message.args[1]}], закрепленный за сотрудником [UID = ${auto.person_uid}] был удален.
        Пожалуйста, введите команду "Обновить ${user.uid} ${message.args[2]}"`)
});

cmd.hear(/^(?:забрали)\s([0-9]+)\s([0-9]+)$/i, async (message, bot) => {
    if (!message.user.admin) return bot (`команда только для админов`)
    let auto = autos.find(x => x.uid === Number(message.args[1]))
    if (!auto) return bot ('такого id автомобиля нет, либо неправильный сервер')
    let user = users.find(x => x.uid === auto.person_uid)
    auto.now = false;
    return bot(`автомобиль [car id = ${message.args[1]}], закрепленный за сотрудником [UID = ${auto.person_uid}] убран в неактив.
        Пожалуйста, введите команду "Обновить ${user.uid} ${message.args[2]}"`)
});

cmd.hear(/^(?:вернули)\s([0-9]+)\s([0-9]+)$/i, async (message, bot) => {
    if (!message.user.admin) return bot (`команда только для админов`)
    let auto = autos.find(x => x.uid === Number(message.args[1]))
    if (!auto) return bot ('такого id автомобиля нет, либо неправильный сервер')
    let user = users.find(x => x.uid === auto.person_uid)
    auto.now = true;
    return bot(`автомобиль [car id = ${message.args[1]}], закрепленный за сотрудником [UID = ${auto.person_uid}] возвращён из неактива.
        Пожалуйста, введите команду "Обновить ${user.uid} ${message.args[2]}"`)
});

cmd.hear(/^(?:дать|give)\s(адм|ADM|админку|)\s([0-9]+)$/i, async (message, bot) => {
    if (message.user.uid !== 0) return bot(`команда только для главного администратора`)
    let user = users.find(x=> x.uid === Number(message.args[2])); 
    user.admin = true;
     vk.api.messages.send({ user_id: user.id, message: `Вам выдана роль администратора!`,
        keyboard:JSON.stringify(
        {
            "one_time": false,
            "buttons": [
            [
            {
                "action":{
                    "type": "text",
                    "payload": "{\"button\": \"6\"}",
                    "label": `Аренда`,
                },
                "color": `positive`
            },
            ],
            [
            {
                "action":{
                    "type": "text",
                    "payload": "{\"button\": \"6\"}",
                    "label": "О нас",
                },
                "color": `primary`,
            },
            {
                "action": {
                    "type": "text",
                    "payload": "{\"button\": \"6\"}",
                    "label": "Устроиться",
                },
                "color": `primary`,
            }
            ],     
            [
            {
                "action": {
                    "type": "text",
                    "payload": "{\"button\": \"6\"}",
                    "label": `Профиль` 
                },
                "color": `primary`
            }
            ],
            [
            {
                "action": {
                    "type": "text",
                    "payload": "{\"button\": \"6\"}",
                    "label": `${user.admin == true ? `Acomands` : `Недоступно`}` 
                },
                "color": `${user.admin == true ? `positive` : `negative`}`
            },
            {
                "action": {
                    "type": "text",
                    "payload": "{\"button\": \"6\"}",
                    "label": `${user.employee1 == true ? `СотрCommands` : user.employee2 == true ? `СотрCommands` : user.employee3 == true ? `СотрCommands` : 
                        user.employee4 == true ? `СотрCommands` : user.employee5 == true ? `СотрCommands` : user.employee6 == true ? `СотрCommands` : user.employee7 == true ? 
                        `СотрCommands` : `Недоступно`}` 
                },
                "color": `${user.employee1 == true ? `positive` : user.employee2 == true ? `positive` : user.employee3 == true ?`positive` : 
                        user.employee4 == true ? `positive` : user.employee5 == true ? `positive` : user.employee6 == true ? `positive` : user.employee7 == true ? 
                        `positive` : `negative`}` 
            }
            ],     
            ],
        }) 
    })
    return bot(`участнику ${user.uid} выдана админка!`, {
        keyboard:JSON.stringify(
        {
            "one_time": false,
            "buttons": [
            [
            {
                "action":{
                    "type": "text",
                    "payload": "{\"button\": \"6\"}",
                    "label": `Аренда`,
                },
                "color": `positive`
            },
            ],
            [
            {
                "action":{
                    "type": "text",
                    "payload": "{\"button\": \"6\"}",
                    "label": "О нас",
                },
                "color": `primary`,
            },
            {
                "action": {
                    "type": "text",
                    "payload": "{\"button\": \"6\"}",
                    "label": "Устроиться",
                },
                "color": `primary`,
            }
            ],     
            [
            {
                "action": {
                    "type": "text",
                    "payload": "{\"button\": \"6\"}",
                    "label": `Профиль` 
                },
                "color": `primary`
            }
            ],
            [
            {
                "action": {
                    "type": "text",
                    "payload": "{\"button\": \"6\"}",
                    "label": `${message.user.admin == true ? `Acomands` : `Недоступно`}` 
                },
                "color": `${message.user.admin == true ? `positive` : `negative`}`
            },
            {
                "action": {
                    "type": "text",
                    "payload": "{\"button\": \"6\"}",
                    "label": `${message.user.employee1 == true ? `СотрCommands` : message.user.employee2 == true ? `СотрCommands` : message.user.employee3 == true ? `СотрCommands` : 
                        message.user.employee4 == true ? `СотрCommands` : message.user.employee5 == true ? `СотрCommands` : message.user.employee6 == true ? `СотрCommands` : message.user.employee7 == true ? 
                        `СотрCommands` : `Недоступно`}` 
                },
                "color": `${message.user.employee1 == true ? `positive` : message.user.employee2 == true ? `positive` : message.user.employee3 == true ?`positive` : 
                        message.user.employee4 == true ? `positive` : message.user.employee5 == true ? `positive` : message.user.employee6 == true ? `positive` : message.user.employee7 == true ? 
                        `positive` : `negative`}` 
            }
            ],     
            ],
        }) 
    })
});
cmd.hear(/^(?:забрать)\s(адм|ADM|админку|)\s([0-9]+)$/i, async (message, bot) => {
    if (message.user.uid !== 0) return bot(`команда только для главного администратора`)
    let user = users.find(x=> x.uid === Number(message.args[2]));
    user.admin = false; 
    return bot(`у участника ${user.uid} забрана админка!`)
});


cmd.hear(/^(?:Обновить)\s([0-9]+)\s([0-9]+)$/i, async (message, bot) => {
if (!message.user.admin) return bot(`команда только для админов`)
let user = users.find(x=> x.uid === Number(message.args[1])); 
var temp = -1;
let num = 1; var kbd3 = []; var ij = 0;
for (var i = 0; i < autos.length; i++){ 
           let auto = autos.find(x => ((x.person_uid === user.uid) && (x.uid > temp)) )
           temp = Number(auto.uid);
        if (auto.now == false) continue
 var kbd2 = 
       {
                "photo_id": `${auto.photo_id}`,
                "title": `${auto.name_auto}`,
                "description": `${auto.now == true ? `${auto.photo_disc}` : 'Данный автомобиль взят в аренду'}`,
                "action": {
                    "type": "open_photo"
                },
                "buttons": [{
                    "action": {
                        "type": "text",
                        "label": `${auto.now == true ? `Арендовать ${auto.uid}` : `Забрано [${auto.uid}]`}`,
                        "payload": "{}"
                    }, 
                    "color": `${auto.now == true ? `positive` : `negative`}`
                }]
            }

            kbd3[ij] = kbd2;
            ij++;
} 
temp = -1;
for (var i = 0; i < autos.length; i++){ 
           let auto = autos.find(x => ((x.person_uid === user.uid) && (x.uid > temp)) )
           temp = Number(auto.uid);
        if (auto.now) continue;
 var kbd2 = 
       {
                "photo_id": `${auto.photo_id}`,
                "title": `${auto.name_auto}`,
                "description": `${auto.now == true ? `${auto.photo_disc}` : 'Данный автомобиль взят в аренду'}`,
                "action": {
                    "type": "open_photo"
                },
                "buttons": [{
                    "action": {
                        "type": "text",
                        "label": `${auto.now == true ? `Арендовать ${auto.uid}` : `Забрано [${auto.uid}]`}`,
                        "payload": "{}"
                    }, 
                    "color": `${auto.now == true ? `positive` : `negative`}`
                }]
            }

            kbd3[ij] = kbd2;
} 
ij = 0;
 var usedform =JSON.stringify( 
{
            "type": "carousel",
            "elements": kbd3
        }
)

if (message.args[2] == 1){
 user.keyboard1 = usedform
await bot(`товары сотрудника ${message.args[1]} на ${message.args[2]} сервере`,
{
template: user.keyboard1
})
}
if (message.args[2] == 2){
 user.keyboard2 = usedform
await bot(`товары сотрудника ${message.args[1]} на ${message.args[2]} сервере`,
{
template: user.keyboard2
})
}
if (message.args[2] == 3){
 user.keyboard3 = usedform
await bot(`товары сотрудника ${message.args[1]} на ${message.args[2]} сервере`,
{
template: user.keyboard3
})
}
if (message.args[2] == 4){
 user.keyboard4 = usedform
await bot(`товары сотрудника ${message.args[1]} на ${message.args[2]} сервере`,
{
template: user.keyboard4
})
}
if (message.args[2] == 5){
 user.keyboard5 = usedform
await bot(`товары сотрудника ${message.args[1]} на ${message.args[2]} сервере`,
{
template: user.keyboard5
})
}
if (message.args[2] == 6){
 user.keyboard6 = usedform
await bot(`товары сотрудника ${message.args[1]} на ${message.args[2]} сервере`,
{
template: user.keyboard6
})
}
if (message.args[2] == 7){
 user.keyboard7 = usedform
await bot(`товары сотрудника ${message.args[1]} на ${message.args[2]} сервере`,
{
template: user.keyboard7
})
}

});
cmd.hear(/^(?:reg)\s([0-9]+)\s([0-9]+)$/i, async (message, bot) => {
    if (message.user.admin !== true) return bot(`команда только для админов`)
    if (message.args[1] > 10) return bot('на одного пользователя можно завести не больше чем 10 машин')
        if (message.args[1] <= 0) return bot('нельзя зарегистрировать менее чем 1 машину')
            if ((message.args[2] < 1) || (message.args[2] > 7)) return bot(`неверный сервер.`)
                let frm = users.find (x=> x.uid === Number(message.args[2]));
       /*    if (frm.employee1 !== true){return bot(`данный UID не является сотрудником`)} 
            if (frm.employee2 !== true){return bot(`данный UID не является сотрудником`)} 
                if (frm.employee3 !== true){return bot(`данный UID не является сотрудником`)} 
                    if (frm.employee4 !== true){return bot(`данный UID не является сотрудником`)} 
                        if (frm.employee5 !== true){return bot(`данный UID не является сотрудником`)} 
                            if (frm.employee6 !== true){return bot(`данный UID не является сотрудником`)} 
                                if (frm.employee7 !== true){return bot(`данный UID не является сотрудником`)} */
            message.user.admreg = true;
await bot(`это форма регистрации автомобиля для сотрудника по UID! 
    Заполните следующую форму, после которой будет обновлена база данных:
    1. [UID сотрудника] 
    2. [photo_id] 
    3. [Название автомобиля] 
    4. [Цена залога]
    5. [Цена за 30 минут]
    6. [Цена за 1 час]
    7. [Цена за 2 часа]
    8. [Цена за 1 день]
    9. [Цена за 1 неделю]
    Такую форму Вам нужно заполнить ${message.args[1]} раз(а)`)
var num = Number(message.args[1]); var n = 1;  var check = message.args[2];
    cmd.hear(/^(.*)\n(.*)\n(.*)\n(.*)\n(.*)\n(.*)\n(.*)\n(.*)\n(.*)+/i, async (message, bot) => {
            if (message.args[1].slice(0, 2) == '1.') {message.args[1] = message.args[1].slice(3)}
                if (message.args[2].slice(0, 2) == '2.') {message.args[2] = message.args[2].slice(2)}
                    if (message.args[3].slice(0, 2) == '3.') {message.args[3] = message.args[3].slice(2)}
                        if (message.args[4].slice(0, 2) == '4.') {message.args[4] = message.args[4].slice(2)}
                            if (message.args[5].slice(0, 2) == '5.') {message.args[5] = message.args[5].slice(2)}
                                if (message.args[6].slice(0, 2) == '6.') {message.args[6] = message.args[6].slice(2)}
                                    if (message.args[7].slice(0, 2) == '7.') {message.args[7] = message.args[7].slice(2)}
                                        if (message.args[8].slice(0, 2) == '8.') {message.args[8] = message.args[8].slice(2)}
                                            if (message.args[9].slice(0, 2) == '9.') {message.args[9] = message.args[9].slice(2)}
              if (message.args[1].slice(0, 3) == '1. ') {message.args[1] = message.args[1].slice(3)}
                if (message.args[2].slice(0, 3) == '2. ') {message.args[2] = message.args[2].slice(2)}
                    if (message.args[3].slice(0, 3) == '3. ') {message.args[3] = message.args[3].slice(2)}
                        if (message.args[4].slice(0, 3) == '4. ') {message.args[4] = message.args[4].slice(2)}
                            if (message.args[5].slice(0, 3) == '5. ') {message.args[5] = message.args[5].slice(2)}
                                if (message.args[6].slice(0, 3) == '6. ') {message.args[6] = message.args[6].slice(2)}
                                    if (message.args[7].slice(0, 3) == '7. ') {message.args[7] = message.args[7].slice(2)}
                                        if (message.args[8].slice(0, 3) == '8. ') {message.args[8] = message.args[8].slice(2)}
                                            if (message.args[9].slice(0, 3) == '9. ') {message.args[9] = message.args[9].slice(2)}
    if (message.user.admreg !== true) return bot(`не понимаю Вас. Попробуйте с команды reg начать.`)
        if (num == 0){return bot(`все автомобили зарегистрированы.`)}
        let user = users.find(x=> x.uid === Number(message.args[1]));
        if ((user.employee1 !== true) && (check == 1)){return bot(`данный UID не является сотрудником на ${check} сервере`)} 
            if ((user.employee2 !== true) && (check == 2)){return bot(`данный UID не является сотрудником на ${check} сервере`)} 
                if ((user.employee3 !== true) && (check == 3)){return bot(`данный UID не является сотрудником на ${check} сервере`)} 
                    if ((user.employee4 !== true) && (check == 4)){return bot(`данный UID не является сотрудником на ${check} сервере`)} 
                        if ((user.employee5 !== true) && (check== 5)){return bot(`данный UID не является сотрудником на ${check} сервере`)} 
                            if ((user.employee6 !== true) && (check == 6)){return bot(`данный UID не является сотрудником на ${check} сервере`)} 
                                if ((user.employee7 !== true) && (check == 7)){return bot(`данный UID не является сотрудником на ${check} сервере`)} 
        var id = user.uid;
        if ((Number(user.registeredauto) + num) > 10) return bot('на одного пользователя можно завести не больше чем 10 машин')
            if (message.args[1].slice(-1) == ' ') {message.args[1] = message.args[1].slice(0,message.args[1].length-1)}
                if (message.args[2].slice(-1) == ' ') {message.args[2] = message.args[2].slice(0, message.args[2].length-1)}
                    if (message.args[3].slice(-1) == ' ') {message.args[3] = message.args[3].slice(0, message.args[3].length-1)}
                        if (message.args[4].slice(-1) == ' ') {message.args[4] = message.args[4].slice(0, message.args[4].length-1)}
                            if (message.args[5].slice(-1) == ' ') {message.args[5] = message.args[5].slice(0, message.args[5].length-1)}
                                if (message.args[6].slice(-1) == ' ') {message.args[6] = message.args[6].slice(0, message.args[6].length-1)}
                                    if (message.args[7].slice(-1) == ' ') {message.args[7] = message.args[7].slice(0, message.args[7].length-1)}
                                        if (message.args[8].slice(-1) == ' ') {message.args[8] = message.args[8].slice(0, message.args[8].length-1)}
                                            if (message.args[9].slice(-1) == ' ') {message.args[9] = message.args[9].slice(0, message.args[9].length-1)}
        await bot(`Вы ввели:
        1. UID - [${message.args[1]}], 
        2. photo_id - [${message.args[2]}], 
        3. название авто - [${message.args[3]}], 
        4. залог - [${message.args[4]}],
        5. Цена 30м - [${message.args[5]}],
        6. Цена 1ч - [${message.args[6]}],
        7. Цена 2ч - [${message.args[7]}],
        8. Цена 1 день - [${message.args[8]}],
        9. Цена 1 неделя - [${message.args[9]}],
        описание - [залог ${message.args[4]}, 30мин ${message.args[5]}, 1ч ${message.args[6]}, 2ч ${message.args[7]}, 1д ${message.args[8]}, 1нед ${message.args[9]}]`)
       if (num!==0) await bot (`автомобиль №${n} зарегистрирован. Осталось [${num-1}] автомобилей`)
        num--; n++; user.registeredauto++;
        if (num == 0){
            message.user.admreg = false;
            await bot(`последний автомобиль был зарегистрирован.\n
                Используйте команду "Обновить ${id} ${check}" чтобы обновить автомобили в списке товаров!
                Если вдруг какой-то автомобиль введён неправильно или используется некорректно, введите команду "Удалить [car id]"`)
            autos.push({
            person_uid: id,
            uid: autos.length,
            photo_id: `${message.args[2]}`,
            name_auto: `${message.args[3]}`,
            photo_disc: `залог ${message.args[4]}, 30мин ${message.args[5]}, 1ч ${message.args[6]}, 2ч ${message.args[7]}, 1д ${message.args[8]}, 1нед ${message.args[9]}`,
            zalog: `${message.args[4]}`,
            cost30m: `${message.args[5]}`,
            cost1h: `${message.args[6]}`,
            cost2h: `${message.args[7]}`,
            cost1d: `${message.args[8]}`,
            cost1w: `${message.args[9]}`,
            full: false,
            now: true
        }); 
            return;
        }
        if (num == 0) return;
        autos.push({
            person_uid: id,
            uid: autos.length,
            photo_id: `${message.args[2]}`,
            name_auto: `${message.args[3]}`,
            photo_disc: `залог ${message.args[4]}, 30мин ${message.args[5]}, 1ч ${message.args[6]}, 2ч ${message.args[7]}, 1д ${message.args[8]}, 1нед ${message.args[9]}`,
            zalog: `${message.args[4]}`,
            cost30m: `${message.args[5]}`,
            cost1h: `${message.args[6]}`,
            cost2h: `${message.args[7]}`,
            cost1d: `${message.args[8]}`,
            cost1w: `${message.args[9]}`,
            full: false,
            now: true
        }); 
    }); 

});
