const PORT = 8000;
const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');
const cors = require('cors')

const app = express();

const url = 'https://www.europ-assistance.cz'

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

        $('.group', html).each(function() {
            const title = $(this).find('h3').text()
            const url = 'https://www.europ-assistance.cz'+$(this).attr('href')
            const description = $(this).find('.text-ea-gray600').text()
            const imageUrl = $(this).find('img').attr('src')
            articles.push({
               title,
                url,
                description,
                imageUrl
            })
        })
        console.log(articles)
        res.json(articles)
    }).catch(err => console.log(err))
})




app.listen(PORT, () => console.log(`server running on PORT ${PORT}`)); 