const PORT = 8000;
const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');
const cors = require('cors')
const fs = require('fs');
const convert = require('xml-js');

const app = express();

const url = 'https://www.europ-assistance.cz'
const stringifiedData = [];


app.use(cors())
app.get('/', function(req, res){
    res.json('This is my webscraper')
})

app.get('/results', (req,res) => {
    axios(url)
    .then(response  => {
        const html = response.data
        //console.log(html)
        const $ = cheerio.load(html)
        let articles = []

        $('.group', html).each(function() {
            const title = $(this).find('h3').text()
            const url = 'https://www.europ-assistance.cz'+$(this).attr('href')
            const description = $(this).find('.text-ea-gray600').text().trim()
            const imageUrl = $(this).find('img').attr('src')
            articles.push({
               title,
                url,
                description,
                imageUrl
            })
        })
        //console.log(articles)
        res.json(articles)
        data = JSON.stringify(articles, null, 2);
        fs.writeFile('articles.json', data,finished);
        function finished (err) {
            console.log('problem')
        }
    }).catch(err => console.log(err))
})





app.get('/articles.xml', (req,res) => {
    
    const json = require('fs').readFileSync('articles.json', 'utf8');
    const options = {compact: true, ignoreComment: true, spaces: 4};
    const result = convert.json2xml(json, options);
   console.log(result)
   res.send(result)

})


app.listen(PORT, () => console.log(`server running on PORT ${PORT}`)); 