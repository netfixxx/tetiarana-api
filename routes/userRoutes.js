const express = require('express');
const router = express.Router();
const userDao = require('../dao/userDao');

router.get('/', async (req, res) =>{
    try {
        const users = await userDao.getUsers();
        res.status(200).json(users);
    }catch(error){
        res.status(500).json({error: error.message });
    }
});

router.post('/', async (req, res)=>{
    const { name , email , password } = req.body;
    try {
        const newUsers = await userDao.createUsers(name , email , password);
        res.status(201).json(newUsers);
    }catch (error) {
        res.status(500).json({ error: error.meesage });
    }
})

router.put('/:id', async(req, res) => {
    const id = parseInt(req.params.id);
    const { name, email, password } = req.body;
    try {
        const updateUser = await userDao.updateUser(id,name,email,password);
        res.status(200).json(updateUser);
    }catch{
        res.status(500).json({ error: err.message });
    }
});

router.delete('/:id', async(req, res) => {
    const id = parseInt(req.params.id);
    try {
        await userDao.deleteUser(id);
        res.status(204).send();
    }catch (error) {
        res.status(500).json({ error: err.message })
    }
});

module.exports = router;