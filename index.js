const prompts = require('./prompts.json');
const Prompts = require('./prompts');
const promptsFile = './prompts.json';
const usersFile = './users.json';

const promptsManager = new Prompts(promptsFile, usersFile);

// Example usage:

// Create a new prompt
const newPrompt = promptsManager.create({
    prompt: 'What is AI?',
    label: 'Technology',
    visibility: 'public',
    sharedAccess: [],
    description: 'A question about AI',
    type: 'question',
    subtype: 'general',
    actor: { username: 'john_doe' }
});
console.log('New Prompt:', newPrompt);

// Get a specific prompt
// const prompt = promptsManager.get(newPrompt._id.$oid, 'john_doe');
// console.log('Get Prompt:', prompt);

const prompt = promptsManager.get('64b68116671a5a71e86e9de9', 'davidlee');
console.log('Get Prompt:', prompt);

// Get all prompts for a user
const allPrompts = promptsManager.getAll('john_doe');
console.log('All Prompts:', allPrompts);

// Update a prompt
const updatedPrompt = promptsManager.update(newPrompt._id.$oid, { description: 'Updated description' }, 'john_doe');
console.log('Updated Prompt:', updatedPrompt);

// const updatedSpecificPrompt = promptsManager.update("64b51308916fea7090b6efdf",{sharedAccess:[]},"sarahwilson");
// console.log("Updated specific Prompt:",updatedSpecificPrompt)

// Delete a prompt
const deleteResult = promptsManager.delete(newPrompt._id.$oid, 'john_doe');
console.log('Delete Prompt:', deleteResult);

//trying to delete a specific prompt
// const deleteRes = promptsManager.delete("64b51308916fea7090b6efdf","sarahwilson");
// console.log("already existing prompt deletion: ",deleteRes)

// Share a prompt
const shareResult = promptsManager.share(newPrompt._id.$oid, 'john_doe', 'jane_doe');
console.log('Share Prompt:', shareResult);

//trying to share a specific prompt
// const shareRes = promptsManager.share("668241862d18558c8762aa6b", 'johndoe', 'jamesgarcia');
// console.log('Share Prompt:', shareResult);


// print prompts
// console.log(prompts)



// Write your code here...

/**
 * Task: 
 *   - Here is the json file which contains number of prompts with structure
 * 
 *  @Prompts:
 *  - _id: ObjectId
 *  - prompt: <prompt>
 *  - label: <label>
 *  - visibility: [public, private, custom],
 *  - sharedAccess: [],
 *  - description: "",
 *  - type: '',
 *  - subtype: '',
 *  - actor: { username: '' }
 * 
 *  @Users:
 *    - username: 
 *    - email: 
 *    - password:
 *    - firstName: 
 *    - lastName: 
 *    - email: 
 * 
 *  @Description:
 *    - import both JSON files prompts.json user.json
 *    - write a class Prompts which takes prompts schema as input
 *    - create methods for create, update, get, getAll, delete, share prompts
 *    - prompts can only be access with the username.
 *    - You can only see the prompts that are either public or their they are created by you
 *    - Implement the logic for sharedAccess where visibility is custom, and other user can see those prompts if they are in sharedAccess list
 */