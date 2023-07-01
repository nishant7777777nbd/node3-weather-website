const path = require('path')
const express= require('express')
const hbs =require('hbs')
const geocode= require('./utils/geocode')
const forecast = require('./utils/forecast')

const app=express()

require("dotenv").config({
    path : path.join(__dirname, "../", "/.env")
})

//define paths for express config
const publicDirectoryPath=path.join(__dirname,'../public')

//  const viewsPath= path.join(__dirname,'../templates')
 const viewsPath= path.join(__dirname,'../templates/views')
const partialsPath= path.join(__dirname,'../templates/partials')

//setup handlebars engine and views location

  app.set('view engine', 'hbs')
  
 app.set('views', path.join(__dirname, '../views'));
  app.set('views',viewsPath)

  
  hbs.registerPartials(partialsPath)

  
  //setup static directory to serve


app.use(express.static(publicDirectoryPath))

app.get('/',(req, res) => {
    res.render('index',{
    title: 'Weather',
    name: 'Nishant'
    })
})

app.get('/about',(req,res) => {
    res.render('about',{
        title: 'About me',
        name : 'Nishant'
    })
})

app.get('/help',(req,res) => {
    res.render('help',{
        helpText: 'YOU want some help?',
       title: 'Help',
       name: 'Nishant'
    })
})

    app.get('/weather',(req,res) => {
        if(!req.query.address){
            return res.send({
                error:'You must provide an address'
            })
        }

        geocode(req.query.address,(error, {latitude,longitude,location}={}) =>{
            if(error){
                return res.send({error })
            }

            forecast(latitude,longitude,(error, forecastData) => {
                if(error){
                    return res.send({error})
                }
                res.send({
                    forecast : forecastData,
                    location,
                    address: req.query.address
                })
            })

        })
      
        
         })

app.get('/products',(req,res) => {
    if(!req.query.search){ 
        return res.send({
            error: 'You must provide a search term'

        })


    }
    console.log(req.query.search)
    res.send({
        products:[]

    })
 

})

app.get('/help/*',(req,res) => {
    res.render('404',{
       title: '404',
       name: 'Nishant',
       errorMessage: 'help article not found' 
    })


})

        app.get('*',(req,res) => {
            res.render('404',{
                title: '404',
                name: 'Nishant',
                errorMessage: 'page not found'
            })
        })

app.listen(process.env.PORT, ()=> {
    console.log('server is up on port '+process.env.PORT)
})