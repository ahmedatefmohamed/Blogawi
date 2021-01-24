const express = require('express');
const router = express.Router();

const { create, getAll, getById, getByTitle, getByTag, getByAuthor, editById, deleteById } 
= require('../controllers/Blog');

router.post('/', async (req, res, next)=> {
    const { body } = req;
    try {
        const blog = await create(...body);
        res.json(blog); //RETURN PROMISE
    } catch (err) {
        //SEND TO ERROR HANDELLER
        next(err);
    }
}),

router.get('/', async (req, res, next)=> {
    const { user: {id} } = req;
    try {
        const blogs = await getAll({ userId: id });
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
        const blog = await getByTitle(title);
        res.json(blog); //RETURN PROMISE
    } catch (err) {
        //SEND TO ERROR HANDELLER
        next(err);
    }
});

router.get('/:tag', async (req, res, next) => {
    const { params: {tag} } = req;
    try {
        const blog = await getByTag(tag);
        res.json(blog); //RETURN PROMISE
    } catch (err) {
        //SEND TO ERROR HANDELLER
        next(err);
    }
});

router.get('/', async (req, res, next)=> {
    const { user: {id} } = req;
    try {
        const blogs = await getByAuthor({ userId: id });
        res.json(blogs); //RETURN PROMISE
    } catch (err) {
        //SEND TO ERROR HANDELLER
        next(err);
    }
}),

router.patch('/:id', async (req, res, next)=> {
    const {params: {id}, body } = req;
    try {
        const blog = await editById(id, ...body);
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