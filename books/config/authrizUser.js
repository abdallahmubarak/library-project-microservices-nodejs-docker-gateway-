const {auth} = require('../../user')

module.exports = async (req,res,next) => {
    
    const isAuthorized = await auth(req);

    if(isAuthorized){
        return next();
    }
    return res.status(403).json({message: 'Not Authorized'})
}