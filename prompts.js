const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

class Prompts {
    constructor(promptsFile, usersFile) {
        this.promptsFile = promptsFile;
        this.usersFile = usersFile;
        this.prompts = this.loadData(this.promptsFile);
        this.users = this.loadData(this.usersFile);
    }

    loadData(file) {
        return JSON.parse(fs.readFileSync(file, 'utf8'));
    }

    saveData(file, data) {
        fs.writeFileSync(file, JSON.stringify(data, null, 2));
    }

    create(prompt) {
        const newPrompt = {
            _id: {"$oid":uuidv4()},
            ...prompt
        };
        this.prompts.push(newPrompt);
        this.saveData(this.promptsFile, this.prompts);
        console.log("creation is completed")
        return newPrompt;
    }

    get(promptId, username) {
        const prompt = this.prompts.find(p => p._id.$oid === promptId);
        if (!prompt) return null;

        // Check if the prompt is public or belongs to the user
        if (prompt.visibility === 'public' || prompt.actor.username === username) {
            return prompt;
        }

        // Check for custom visibility and sharedAccess
        if (prompt.visibility === 'custom' && prompt.sharedAccess.includes(username)) {
            return prompt;
        }

        return null;
    }

    getAll(username) {
        return this.prompts.filter(prompt => {
            return prompt.visibility === 'public' ||
                   prompt.actor.username === username ||
                   (prompt.visibility === 'custom' && prompt.sharedAccess.includes(username));
        });
    }

    update(promptId, updatedPrompt, username) {
        const promptIndex = this.prompts.findIndex(p => p._id.$oid === promptId);
        if (promptIndex === -1 || this.prompts[promptIndex].actor.username !== username) {
            return null;
        }

        this.prompts[promptIndex] = { ...this.prompts[promptIndex], ...updatedPrompt };
        this.saveData(this.promptsFile, this.prompts);
        return this.prompts[promptIndex];
    }

    delete(promptId, username) {
        const promptIndex = this.prompts.findIndex(p => p._id.$oid === promptId);
        if (promptIndex === -1 || this.prompts[promptIndex].actor.username !== username) {
            return false;
        }

        this.prompts.splice(promptIndex, 1);
        this.saveData(this.promptsFile, this.prompts);
        return true;
    }

    share(promptId, username, sharedWithUsername) {
        const promptIndex = this.prompts.findIndex(p => p._id.$oid === promptId);
        if (promptIndex === -1 || this.prompts[promptIndex].actor.username !== username) {
            return false;
        }

        if (!this.prompts[promptIndex].sharedAccess.includes(sharedWithUsername)) {
            this.prompts[promptIndex].sharedAccess.push(sharedWithUsername);
            this.saveData(this.promptsFile, this.prompts);
        }
        return true;
    }
}

module.exports = Prompts;
