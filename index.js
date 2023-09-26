const express = require('express')
const { check } = require('./auth.middleware')
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))

let initialRecipe = [
    {
      name: 'Spaghetti Carbonara',
      description: 'A classic Italian pasta dish.',
      preparationTime: '15 minutes',
      cookingTime: 15,
      imageUrl: 'https://hips.hearstapps.com/hmg-prod/images/carbonara-index-6476367f40c39.jpg?crop=0.888888888888889xw:1xh;center,top&resize=1200:*',
      country: "India",
      veg: true,
      id: 1
    }
]
// GET Route
app.get('/',(req,res)=>{
    res.send('welcome to the recipe api.')
})

// Recipe Listing

app.get('/recipe/all',(req,res)=>{
    res.send(initialRecipe)
})

app.get('/index',(req,res)=>{
    res.sendFile(__dirname + '/index.html')
})

//  Recipe Form

app.get('/add',(req,res)=>{
    res.sendFile(__dirname + '/recipe.html')
})

app.post('/add',(req,res)=>{
    initialRecipe.push(req.body)
    res.send(initialRecipe)
})

// POST Route 

app.post('/recipe/add',check,(req,res)=>{
    let postdata={
        name:req.body.name,
        description:req.body.description,
        preparationTime:req.body.preparationTime,
        cookingTime:req.body.cookingTime,
        imageUrl:req.body.imageUrl,
        country:req.body.country,
        veg:req.body.veg,
        id:initialRecipe.length+1
    }

    initialRecipe.push(postdata)
    res.send(initialRecipe)
})

// PATCH Route

app.patch('/recipe/update/:id',(req,res)=>{
    let {id} = req.params

    let match = initialRecipe.findIndex((ele)=> ele.id == id)
    if(match == -1){
        res.send('data not founs')
    }
    else{
        initialRecipe[match].name = req.body.name;
        initialRecipe[match].description = req.body.description ;
        initialRecipe[match].preparationTime = req.body.preparationTime ;
        initialRecipe[match].cookingTime = req.body.cookingTime ;
        initialRecipe[match].imageUrl = req.body.imageUrl ;
        initialRecipe[match].country = req.body.country ;
        initialRecipe[match].veg = req.body.veg;
    }
    res.status(200).send(initialRecipe)

})

// DELETE Route 

app.delete('/recipe/delete/:id',(req,res)=>{
    let {id} = req.params

    let index = initialRecipe.findIndex((ele) => ele.id == id)
    let dlt = initialRecipe.splice(index,1)[0]
        
    res.send(initialRecipe)
})

// Query Params Filter

app.get('/recipe/filter',(req,res)=>{
    let {veg} =req.query
    let {cookingTime} = req.query
    let {country} = req.query
    
    
    if(cookingTime == 'lth'){
        let lth = initialRecipe.sort((a,b) => a.cookingTime - b.cookingTime)
        res.send(lth)
    }
    else if(cookingTime == 'htl'){
        let htl = initialRecipe.sort((a,b)=> b.cookingTime - a.cookingTime)
        res.send(htl)
    }
    
    let countryfil = initialRecipe.filter(ele => ele.country == country)
    let food = initialRecipe.filter((ele)=>ele.veg.toString() == veg)
    res.send(countryfil)      
    res.send(food)
})

app.listen(8090,()=>{
    console.log('server running : 8090');
})