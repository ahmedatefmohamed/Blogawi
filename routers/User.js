const express = require(express);
const router = express.Router();

const { register, login, getAll, getById, putOne, updateOne, deleteById } = require('../controllers/User');

router.POST('/', async (req, res, next)=> {
    const { body } = req;
    try {
        const user = await register(body);
        res.json(user); //RETURN PROMISE
    } catch (err) {
        //SEND TO ERROR HANDELLER
        next(err);
    }
}),

router.POST('/login', async (req, res, next)=> {
    const { body } = req;
    try {
        const user = await login(body);
        res.json(user); //RETURN PROMISE
    } catch (err) {
        //SEND TO ERROR HANDELLER
        next(err);
    }
}),

router.GET('/', async (req, res, next)=> {
    try {
        const users = await getAll();
        res.json(users); //RETURN PROMISE
    } catch (err) {
        //SEND TO ERROR HANDELLER
        next(err);
    }
}),

router.GET('/:id', async (req, res, next)=> {
    const { params: {id} } = req;
    try {
        const user = await getById(id);
        res.json(user); //RETURN PROMISE
    } catch (err) {
        //SEND TO ERROR HANDELLER
        next(err);
    }
}),

router.Put('/:id', async (req, res, next)=> {
    const { body, params: {id} } = req;
    try {
        const user = await putOne(...body, id);
        res.json(user); //RETURN PROMISE
    } catch (err) {
        //SEND TO ERROR HANDELLER
        next(err);
    }
}),

  router.patch('/:id', async (req, res, next) => {
    const { body, params: {id} } = req;
    try{
    const user =await updateOne(...body, id);
    res.json(user); //RETURN PROMISE
    }catch(err){
        //SEND TO ERROR HANDELLER
        next(err);
    }
  });

router.Delete('/:id', async (req, res, next)=> {
    const {params: {id} } = req;
    try {
        const user = await deleteById(id);
        res.json(user); //RETURN PROMISE
    } catch (err) {
        //SEND TO ERROR HANDELLER
        next(err);
    }
});
router.get('/logout', (req, res, next) => {
    if(req.session.user) {
        delete req.session.user;
    }
    res.redirect('/login');    
});

router.post('/follow', async (req, res, next) => {
    const { follower, following, action } = req.body;
    try {
        switch(action) {
            case 'follow':
                await Promise.all([ 
                    User.findByIdAndUpdate(follower, { $push: { following: following }}),
                    User.findByIdAndUpdate(following, { $push: { followers: follower }})
                
                ]);
            break;

            case 'unfollow':
                await Promise.all([ 
                    User.findByIdAndUpdate(follower, { $pull: { following: following }}),
                    User.findByIdAndUpdate(following, { $pull: { followers: follower }})
                
                ]); 
            break;

            default:
                break;
        }

        res.json({ done: true });
        
    } catch(err) {
        res.json({ done: false });
    }
});

module.exports= router;