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
            response.json({ message: "error in save income data" });
        }
    },
    graph: async (request, response) => {
        try {
            const userId = request.userId;
            const graph = await Income.find({ userId }).populate('userId');
            response.send(graph);
        } catch (error) {
            console.log('Error in graph', error);
            response.json({ message: "Error in graph" })
        }
    },
    dataEdit: async (request, response) => {
        try {
            const { _id, salary, date, incentive, others, rentIncome, rent, utilies, loan, transport, glossary } = request.body;
            const income = await Income.findByIdAndUpdate(
                _id,
                { salary, incentive, others, rentIncome, date, rent, glossary, transport, loan, utilies });
            await income.save();
            response.json({ message: "data updated successfully" })

        } catch (error) {
            console.log("Error in updated data :", error);
            response.json({ error: "Error in updating data" })
        }
    }
}
module.exports = incomecontroller;