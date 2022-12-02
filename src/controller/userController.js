const userModel = require('../models/userModel');

const loginUser = async function (req, res) {
    try {

        const requestBody = req.body;
        if (!isValidRequestBody(requestBody)) {
            res.status(400).send({ status: false, msg: 'Invalid requeat, please provide login details' })
            return
        }

        // Exatract params
        const { email, password } = requestBody;

        //validation starts 

        if (!isValid(email)) {
            res.status(400).send({ status: false, msg: 'Email is required' })
            return
        }

        if (!isValid(password)) {
            res.status(400).send({ status: false, msg: 'Password is required' })
            return
        }

        const findUser = await userModel.findOne({ email, password });

        if (!findUser) {
            res.status(401).send({ status: false, msg: 'Invalid login credentials' })
            return
        }

        const genToken = jwt.sign({
            userId: findUser._id.toString()
        }, "trainerGoes online");
        res.header('x-api-key', genToken)
        res.status(200).send({ status: true, msg: 'User Login Successfull', userId:findUser._id,data: genToken });

    } catch (error) {
        console.log(error)
        res.status(500).send({ msg: error.message })
    }


}