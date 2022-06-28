const express = require('express');
const path = require('path');
const hbs = require('hbs');
const request = require('request');
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//Application initialization
const app = new express();
const port = process.env.PORT || 3000;

//Defining paths for express configuration
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
const publicDirectoryPath = path.join(__dirname,'../public')

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)



//Setting up routes of pages
app.get('',(req,res)=>{
    res.render('index',{
        name:'Amritpal Singh'
    })
})

app.get('/index',(req,res)=>{
    res.render('index',{
        name:'Amritpal Singh'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        helpmessage:'For any help, please contact +91-7696925915 or email us at Singh.amritstar@gmail.com'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        aboutmessage:'This is me - Amritpal Singh and below is my profile picture'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address) {
        return res.send({
            error: 'Please enter valid location'
        })
    } 

    geocode(req.query.address, (error, {latitude,longitude,location}={}) => {
        if (error) {
            return res.send({error})
        }

    
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({error})
                }
            
            res.send({
                forecast: forecastData,
                address: req.query.address,
                location 
            })
        })
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        errormessage:'Unable to locate information regarding help'
    })
})

app.get('/about/*',(req,res)=>{
    res.render('404',{
        errormessage:'Unable to locate information regarding about page'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        errormessage:'404 Error, URL not found'
    })
})

app.listen(port,()=>{
    console.log(`Listening over port ${port}`)
})