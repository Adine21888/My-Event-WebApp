import express from 'express';
import { User } from '../models/userModel.js';

const router = express.Router();


//Route to create new user
router.post('', async (request, response) => {
    try {
        if(
            !request.body.regNo || 
            !request.body.name
        ) {
            return response.status(400).send({
                message: 'Send all required fields : regNo, name',
            })
        }
        const newUser = {
            regNo: request.body.regNo,
            name: request.body.name,
        }
        const user = await User.create(newUser);
        return response.status(201).send(user);

    }catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message})
    }
});


//route to get all users from database
router.get('', async (request, response) =>{
    try {
        const users = await User.find({});

        return response.status(200).json({
            count: users.length,
            data: users
        });
    } catch (error){
        console.log(error.message);
        response.status(500).send({message: error.message });
    }
})


//route to get ONE user from database by id
router.get('/:id', async (request, response) =>{
    try {

        const { id } = request.params;

        const user = await User.findById(id);

        return response.status(200).json(user);

    } catch (error){
        console.log(error.message);
        response.status(500).send({message: error.message });
    }
})


//Route for update a user
router.put('/:id', async (request, response) => {
    try {
        if(
            !request.body.regNo || 
            !request.body.name
        ) {
            return response.status(400).send({
                message: 'Send all required fields : regNo, name',
            });
        }

        const { id } = request.params;

        const result = await User.findByIdAndUpdate(id, request.body);

        if (!result){
            return response.status(404).json({ message: 'Not Updated!' });
        }

        return response.status(200).send({message: 'Updated Successfully'})

    }catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message });
    }
});

//Route to delete a user
router.delete('/:id', async(request, response) => {
    try{
        const { id } = request.params;

        const result = await User.findByIdAndDelete(id);

        if(!result) {
            return response.status(404).json({message: 'User not found!'});
        }
        return response.status(200).send({message: 'User is deleted Successfully.'})

        
    }catch (error){
        console.log(error.message);
        response.status(500).send({message: error.message });
    }
});

export default router;