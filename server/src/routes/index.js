const routes = (app)=>{
    app.get('/', (req,res)=>{
        res.json({message: "first route"})
    })
}

export default routes