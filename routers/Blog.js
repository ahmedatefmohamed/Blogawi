const express = require('express');

const { create, getAll, getById, getByTitle, getByTag, getByAuthor, editById, deleteById } 
= require('../controllers/Blog');

const router = express();

// const multer = require('multer');
// const path = require('path');
// const storage = multer.diskStorage({​​​​​
//     destination: function (req, file, cb) {​​​​​
//         cb(null, 'static/');
//     }​​​​​,
//     filename: function (req, file, cb) {​​​​​
//         cb(null, file.originalname + '-' + Date.now() + path.extname(file.originalname));
//     }​​​​​
// }​​​​​);

// router.post('/', async (req, res, next) => {​​​​​
//     // console.log(req.user);
//    const upload = multer({​​​​​ storage: storage }​​​​​).single("photo");
//     upload(req, res, function (err) {​​​​​
//         // console.log(req.user);
//         const {​​​​​ body, user: {​​​​​ id }​​​​​ }​​​​​ = req;
//         if (req.file != undefined)
//             body.photo = req.file.path;
//         create({​​​​​ ...body, author: id }​​​​​).then(blog => res.json(blog)).catch(e => next(e));
//     }​​​​​);
// }​​​​​);

router.post('/', async (req, res, next)=> {
    const { body, user: { id } } = req;
    try {
        const blog = await create({...body, author: id });
        res.json(blog); //RETURN PROMISE
    } catch (err) {
        //SEND TO ERROR HANDELLER
        next(err);
    }
}),

router.get('/', async (req, res, next)=> {
    const { user: {id} } = req;
    try {
        const blogs = await getAll({ author: id });
        res.json(blogs); //RETURN PROMISE
    } catch (err) {
        //SEND TO ERROR HANDELLER
        next(err);
    }
}),

router.get('/:id', async (req, res, next)=> {
    const { params: {id} } = req;
    try {
        const blog = await getById(id);
        res.json(blog); //RETURN PROMISE
    } catch (err) {
        //SEND TO ERROR HANDELLER
        next(err);
    }
}),

router.get('/:title', async (req, res, next) => {
    const { params: {title} } = req;
    try {
        const blog = await getByTitle({title});
        res.json(blog); //RETURN PROMISE
    } catch (err) {
        //SEND TO ERROR HANDELLER
        next(err);
    }
});

router.get('/:tag', async (req, res, next) => {
    const { params: {tag} } = req;
    try {
        const blog = await getByTag({ tag });
        res.json(blog); //RETURN PROMISE
    } catch (err) {
        //SEND TO ERROR HANDELLER
        next(err);
    }
});

router.get('/:author', async (req, res, next)=> {
    const { params: {author} } = req;
    try {
        const blogs = await getByAuthor({ author });
        res.json(blogs); //RETURN PROMISE
    } catch (err) {
        //SEND TO ERROR HANDELLER
        next(err);
    }
}),

router.get('/new', async (req, res, next) => {
    try {
        const blog = await getNew();
        res.json(blog);
    } catch (e) {
        next(e);
    }
});

router.patch('/:id', async (req, res, next)=> {
    const {params: {id}, body } = req;
    try {
        const blog = await editById(id, body);
        res.json(blog); //RETURN PROMISE
    } catch (err) {
        //SEND TO ERROR HANDELLER
        next(err);
    }
}),

router.delete('/:id', async (req, res, next)=> {
    const { params: { id } } = req;
    try {
        const blog = await deleteById(id);
        res.json(blog); //RETURN PROMISE
    } catch (err) {
        //SEND TO ERROR HANDELLER
        next(err);
    }
});

module.exports= router;