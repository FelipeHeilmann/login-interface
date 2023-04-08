export function validadeFiels(req,res, next){
    const {first_name,last_name, email, password, confirm_pass} = req.body
    if(!first_name && last_name && !email && !password){
        return res.status(500).json({message: "the fields cant be empty"})
    }
    if(password !== confirm_pass){
        return res.status(500).json({message: "the password doest match"})
    }
    next()
}
