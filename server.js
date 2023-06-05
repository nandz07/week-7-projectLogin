let products = [
    {
      name: "balck forest",
      catagory: "birthday cake",
      price: 599,
      img:"//cdn.shopify.com/s/files/1/0665/6648/8296/products/BlackForestCake_2.jpg?v=1676363127&width=480"
    },
    {
      name: "white forest",
      catagory: "function cake",
      price: 999,
      img:"/assets/white.jpg"
    },
    {
      name: "balck berry",
      catagory: "birthday cake",
      price: 399,
      img:"https://static.toiimg.com/thumb/52654012.cms?imgsize=542604&width=800&height=800"
    },
    {
      name: "red walvet",
      catagory: "party cake",
      price: 799,
      img:"/assets/red.jpg"
    }
  ]
const express=require('express')
const app=express()

const path=require('path')

const session=require("express-session")
const {v4:uuidv4}=require("uuid")

const nocache = require('nocache');  
// domain.com/path/dashboard
// domain.com/path/dashboard/search?key=user

// function sum(a,b,callback){
//     let s=a+b
//     callback(s)
// }
// sum(10,20,(sum)=>{
//     console.log(sum);
// })

// function sum(a,b){
//     new Promise()
//     r=a+b
// }
// sum(10,20)

app.use(nocache());

app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.set('view engine','ejs')

//load static assets
app.use('/static',express.static(path.join(__dirname,'public')))
app.use('/assets',express.static(path.join(__dirname,'public/assets')))

app.use(session({
    secret:uuidv4(),
    resave:false,
    saveUninitialized:true
}))
const port=process.env.PORT||3000


const credential={
    email:"user@gmail.com",
    password:"user123"
}

app.get('/',(req,res)=>{
    if(req.session.logedIn){
        res.redirect('/dashboard')
    }else{
        res.render('base',{titl:"Login System"})
    }
})

app.post('/login',(req,res)=>{
    if(req.body.email==credential.email && req.body.password == credential.password){
        req.session.user=req.body.email
        req.session.logedIn=true
        res.redirect('/dashboard')
    }else{
        // res.end("invalid user name")
        res.redirect('/')
    }
})

app.get('/dashboard',(req,res)=>{
    if(req.session.user){
        res.render('dashboard',{user:req.session.user,products})
    }else{
        res.redirect('/')
    }
})
app.get('/logout',(req,res)=>{
    req.session.destroy(function(err){
        if(err){
            console.log(err);
            res.send('Error')
        }else{
            res.redirect('/')
        }
    })
})


app.listen(port,()=>{console.log("http://localhost:3000");})
