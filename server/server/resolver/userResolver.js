const { User } = require('../model/user'); 

const userResolvers = {
  Query: {
    getUserByUserName: async (_, { userName }) => {
      try {
        const user = await User.findOne({ userName });
        if (!user) {
          throw new Error(`User with userName "${userName}" not found`);
        }
        return user;
      } catch (error) {
        throw new Error(`Error fetching user: ${error.message}`);
      }
    },
  },

  Mutation: {
    createUser: async (_, { userName }) => {
      try {
        const user = new User({ userName });
        await user.save();
        return user;
      } catch (error) {
        throw new Error(`Error creating user: ${error.message}`);
      }
    },
    deleteUser: async (_, { userId }) => {
      try {
        const deletedUser = await User.findByIdAndRemove(userId);
        if (!deletedUser) {
          throw new Error(`User with ID "${userId}" not found`);
        }
        return deletedUser;
      } catch (error) {
        throw new Error(`Error deleting user: ${error.message}`);
      }
    },
  },
};

module.exports = userResolvers;
