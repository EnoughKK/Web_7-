let puppeteer = require('puppeteer');
const fs = require('fs');

async function crawling() {
    let browser = await puppeteer.launch();
    let page = await browser.newPage();
    await page.goto("https://place.map.kakao.com/8601238");
    await page.waitFor('h2.tit_location');
    let ehList = await page.$$("#mArticle");
    let menu = await page.$$("span.loss_word");
    menu.forEach(async menu => {
        let text = await (await menu.getProperty("innerText")).jsonValue();
        console.log(await text);
    })

    for(let eh of ehList){
        let title = await eh.$eval('h2.tit_location', function(el){
            return el.innerText
        })
        let eval = await eh.$eval('span.color_b', function(el){
            return el.innerText.replace(/\n/g, "");
        })
        let address = await eh.$eval('.txt_address', function(el){
            return el.innerText
        })
        let contact = await eh.$eval('span.txt_contact', function(el){
            return el.innerText
        })
        /*let menu = await eh.$$eval('span.loss_word', function(el){
            return el.innerText
        })*/
        let imageURL = await eh.$eval('.link_photo', function(el){
            return window.getComputedStyle(el).backgroundImage.match(/url\("(.*)"/)[1]
        })

        console.log(title, eval, address, contact, imageURL);
    }
    browser.close();
}

crawling();
