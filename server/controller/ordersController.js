const ordersdb = require('../model/orders')


exports.createOrder = (req, res) => {
    const { orderBy, productId, totalPrice, quantity, status } = req.body;

    const order = new ordersdb({
        orderBy,
        productId,
        quantity,
        totalPrice,
        status
    })

    try {
        order.save()
            .then(data => {
                res.status(200).send(data);
            })
            .catch(error => {
                res.status(400).json({ message: error.message || "some thing went wrong" })
            })
    } catch (error) {
        console.log(error);
    }
}


// get all orders of single user 
exports.getAllOrdersUser = (req, res) => {
    let id = req.params.id;

    try {
        ordersdb.find({ orderBy: id })
            .then(data => {
                res.status(200).send(data);
            })
            .catch(error => {
                res.status(400).json({ message: error.message || "Something went wrong" })
            })
    } catch (error) {
        res.status(500).json({ message: error.message || "Internal server error" })
    }
}



