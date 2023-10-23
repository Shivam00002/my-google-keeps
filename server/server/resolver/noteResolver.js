const { Note } = require("../model/note"); 


const resolvers = {
  Query: {
    getNotesByUserName: async (_, { userName, pin, limit, offset }) => {
      try {
        const query = { userName };
        if (pin !== undefined) {
          query.pin = pin;
        }

        let notesQuery = Note.find(query);

        if (limit) {
          notesQuery = notesQuery.limit(limit);
        }

        if (offset) {
          notesQuery = notesQuery.skip(offset);
        }

        const notes = await notesQuery.exec();
        return notes;
      } catch (error) {
        throw new Error('Failed to fetch notes by userName');
      }
    },
  },
  Mutation: {
    createNote: async (_, args) => {
      try {
        const newNote = await Note.create(args);
        return newNote;
      } catch (error) {
        throw new Error('Failed to create a new note');
      }
    },
    updateNote: async (_, { _id, ...updateData }) => {
      try {
        const existingNote = await Note.findById(_id);
        if (!existingNote) {
          throw new Error('Note not found');
        }
        Object.assign(existingNote, updateData);
        const updatedNote = await existingNote.save();
        return updatedNote;
      } catch (error) {
        throw new Error('Failed to update the note');
      }
    },
    deleteNote: async (_, { _id }) => {
      try {
        const deletedNote = await Note.findByIdAndDelete(_id);
        return deletedNote;
      } catch (error) {
        throw new Error('Failed to delete the note');
      }
    },
  },
};

module.exports = resolvers;
