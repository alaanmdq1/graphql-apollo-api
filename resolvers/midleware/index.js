const {skip} = require('graphql-resolvers')
const Task = require('../../database/models/task')
const {isValidObjectId} = require('../../database/util')

module.exports.isAuthenticated = (_, __, {email}) => {
    if(!email) {
        throw new Error('Acces denied! please login to continue')
    }
    return skip
}

module.exports.isTaskOwner = async (_, {id}, {loggedInUserId}) => {
    try {
        if (!isValidObjectId(id)) {
            throw new Error('Invalid task id')
        }
        const task = await Task.findById(id)
    if (!task) {
        throw new Error('Task not found')
    } else if (task.user.toString() !== loggedInUserId) {
        throw new Error('Not authorized as task owner')
    }
    return skip
    } catch(error) {
        console.log(error)
        throw error
    }
}