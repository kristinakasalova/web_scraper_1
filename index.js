const PORT = 8000;
const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');
const cors = require('cors')

const app = express();

const url = 'https://www.theguardian.com/europe'

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
        const articles = []

        $('.dcr-lv2v9o', html).each(function() {
            const title = $(this).attr('aria-label')
            const url = 'https://www.theguardian.com    '+$(this).attr('href')
            articles.push({
               title,
                url
            })
        })
        console.log(articles)
        res.json(articles)
    }).catch(err => console.log(err))
})




app.listen(PORT, () => console.log(`server running on PORT ${PORT}`)); 