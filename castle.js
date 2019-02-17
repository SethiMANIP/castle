const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const writeStream = fs.createWriteStream('relais.csv');
//writeStream.write(Resto\n);
var Hotels = [];

request('https://www.relaischateaux.com/us/site-map/etablissements', function (error, response, html) {
        if (!error && response.statusCode == 200) {
            var $ = cheerio.load(html);
            const hotels = $('#countryF');
        //const france = hotels.next().html();
        //console.log(france);
        const list = hotels.next().first().children().next();
        //console.log(list.html());
        list.children().children().each(function(i, element){
            var a = $(this);
            var title = a.text();
            var url = a.attr('href');
            var str = title.replace(/\s\s+/g, " ")
            // Our parsed meta data object
            var metadata = {
                title: str,
                url: url
            }
            Hotels.push(metadata);
            //console.log(metadata);
            //writeStream.write(${metadata.title}\n);
        })
		console.log(Hotels);
		
    }})