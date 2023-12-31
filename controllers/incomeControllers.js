const { model } = require('mongoose');
const Income = require('../model/income');
const User = require('../model/user');


const incomecontroller = {
    dataEntry: async (request, response) => {
        try {
            const { date, salary, rentIncome, incentive, others, rent, glossary, utilies, transport, loan } = request.body;
            const userId = request.userId;
            const user = await User.findById(userId);
            const income = new Income({
                date,
                salary,
                rentIncome,
                incentive,
                others,
                rent,
                glossary,
                loan,
                transport,
                utilies,
                userId
            });
            const newdata = await income.save();
            user.data = user.data.concat(newdata._id);

            await user.save();

            response.json({ message: "data saved successfully" });
        } catch (error) {
            console.log("error in save incone data :", error);
            response.status(404).json({ error: "error in save income data" });
        }
    },
    graph: async (request, response) => {
        try {
            const userId = request.userId;
            const graph = await Income.find({ userId }).populate('userId');
            response.send(graph);
        } catch (error) {
            console.log('Error in graph', error);
            response.status(404).json({ message: "Error in graph" })
        }
    },
    income: async (request, response) => {
        try {
            const id = request.params.id;
            const income = await Income.findById(id);
            response.json(income)
        } catch (error) {
            console.log("Error in income :", error)
        }
    },
    dataEdit: async (request, response) => {
        try {
            const { _id, salary, incentive, others, rentIncome, rent, utilies, loan, transport, glossary } = request.body;
            const income = await Income.findByIdAndUpdate(
                _id,
                { salary, incentive, others, rentIncome, rent, glossary, transport, loan, utilies });
            await income.save();
            response.json({ message: "data updated successfully" })

        } catch (error) {
            console.log("Error in updated data :", error);
            response.status(404).json({ error: "Error in updating data" })
        }
    },
    datadelete: async (request, response) => {
        try {
            const userId = request.userId;
            const id = request.params.id;
            const user = await User.findById(userId);
            if (user.data.includes(id)) {
                user.data = user.data.filter((postid) => postid != id)
            }
            await user.save();
            const income = await Income.findByIdAndDelete(id);
            response.json({ message: "data deleted successfully" })

        } catch (error) {
            console.log("Error in updated data :", error);
            response.status(404).json({ error: "Error in Deleting data" })
        }
    }
}
module.exports = incomecontroller;