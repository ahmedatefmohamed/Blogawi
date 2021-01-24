const express = require('express');
const router = express.Router();

const { create, getAll, getById, getByTitle, getByTag, getByAuthor, editById, deleteById } 
= require('../controllers/Blog');

router.POST('/', async (req, res, next)=> {
    const { body, user: { id } } = req;
    try {
        const blog = await create({ ...body, userId: id });
        res.json(blog); //RETURN PROMISE
    } catch (err) {
        //SEND TO ERROR HANDELLER
        next(err);
    }
}),

router.GET('/', async (req, res, next)=> {
    const { user: {id} } = req;
    try {
        const blogs = await getAll({ userId: id });
        res.json(blogs); //RETURN PROMISE
    } catch (err) {
        //SEND TO ERROR HANDELLER
        next(err);
    }
}),

router.GET('/:id', async (req, res, next)=> {
    const { params: {id} } = req;
    try {
        const blog = await getById(id);
        res.json(blog); //RETURN PROMISE
    } catch (err) {
        //SEND TO ERROR HANDELLER
        next(err);
    }
}),

router.GET('/:title', async (req, res, next) => {
    const { params: {title} } = req;
    try {
        const blog = await getByTitle(title);
        res.json(blog); //RETURN PROMISE
    } catch (err) {
        //SEND TO ERROR HANDELLER
        next(err);
    }
});

router.GET('/:tag', async (req, res, next) => {
    const { params: {tag} } = req;
    try {
        const blog = await getByTag(tag);
        res.json(blog); //RETURN PROMISE
    } catch (err) {
        //SEND TO ERROR HANDELLER
        next(err);
    }
});

router.GET('/', async (req, res, next)=> {
    const { user: {id} } = req;
    try {
        const blogs = await getByAuthor({ userId: id });
        res.json(blogs); //RETURN PROMISE
    } catch (err) {
        //SEND TO ERROR HANDELLER
        next(err);
    }
}),

router.Patch('/:id', async (req, res, next)=> {
    const {params: {id}, body } = req;
    try {
        const blog = await editById(id, ...body);
        res.json(blog); //RETURN PROMISE
    } catch (err) {
        //SEND TO ERROR HANDELLER
        next(err);
    }
}),

router.Delete('/:id', async (req, res, next)=> {
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