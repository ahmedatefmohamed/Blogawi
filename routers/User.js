const express = require('express');
const router = express();

const { register, login, getAll, getById, putOne, updateOne, deleteById } = require('../controllers/User');

router.post('/', async (req, res, next)=> {
    const { body } = req;
    try {
        const user = await register(body);
        res.json(user); //RETURN PROMISE
    } catch (err) {
        //SEND TO ERROR HANDELLER
        next(err);
    }
}),

router.post('/login', async (req, res, next)=> {
    const { body } = req;
    try {
        const user = await login(body);
        res.json(user); //RETURN PROMISE
    } catch (err) {
        //SEND TO ERROR HANDELLER
        next(err);
    }
}),

router.get('/', async (req, res, next)=> {
    try {
        const users = await getAll();
        res.json(users); //RETURN PROMISE
    } catch (err) {
        //SEND TO ERROR HANDELLER
        next(err);
    }
}),

router.get('/:id', async (req, res, next)=> {
    const { params: {id}, body } = req;
    try {
        const user = await getById(id, body);
        res.json(user); //RETURN PROMISE
    } catch (err) {
        //SEND TO ERROR HANDELLER
        next(err);
    }
}),

router.put('/:id', async (req, res, next)=> {
    const { params: {id}, body } = req;
    try {
        const user = await putOne(id, body);
        res.json(user); //RETURN PROMISE
    } catch (err) {
        //SEND TO ERROR HANDELLER
        next(err);
    }
}),

  router.patch('/:id', async (req, res, next) => {
    const { params: {id}, body } = req;
    try{
    const user =await updateOne(id, body);
    res.json(user); //RETURN PROMISE
    }catch(err){
        //SEND TO ERROR HANDELLER
        next(err);
    }
  });

router.delete('/:id', async (req, res, next)=> {
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