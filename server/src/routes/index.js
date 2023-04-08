import user from './userRoutes.js'
const routes = (app)=>{
    app.use(user)
    app.get('/', (req,res)=>{
        res.json({message: "first route"})
    })
}

export default routes