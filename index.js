const express =require('express')
const uuid = require('uuid') 
const member = require('./Members')
const app = express()


app.use(express.json())

app.get("/showAllUser",(req,res) =>{
    res.status(200).json(members)
})
app.get("/showUser/:uid",(req,res) =>{
    const id = req.params.uid

    const user = members.filter(member => member.id === parseInt(id))
    user.length !==0 ? res.status(200).json(user) : res.status(200).json({msg:"User Not Found"})
})
app.post("/addUser/",(req,res) =>{
const {name,email} = req.body
members.push({id:uuid.v4(),name,email})
req.status(200).json(members)
})


app.delete("/deleteUser/:uid",(req,res) =>{
    const id = parseInt(req.params.uid)
    const found = members.some(member => member.id === id)
    if(found){
    const results = members.filter(member => member.id !== id)
    res.status(200).json(results)
    }else{
        res.status(400).json({msg:`No member found with the id of ${id}`})
    }
})

app.put("/updateUser/:id",(req,res) =>{
    const found = members.some(member => member.id === parseInt(req.params.id))
    if(found){
const updMember = req.body
members.forEach(member =>{
    if (member.id === parseInt(req.params.id)){
    member.name = updMember.name
    member.email = updMember.email
    }
})
res.status(200).json(members)
console.log(members)
    }else{
        res.status(400).json({msg:`No member found with the id of ${id}`})
    }
})
        
const PORT = 2000
app.listen(PORT,()=>console.log(`server is running at ${PORT}`))











