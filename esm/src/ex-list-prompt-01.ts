/**
 * Simply AppDevs imports
 */
import {prompter, PromptInput, PromptResult} from '@simplyappdevs/nodejs-prompt';

/**
 * App imports
 */
import {ExampleModule} from './typedefs';
import {displayPromptBehaviors} from './util';

/**
 * Example entrypoint
 */
const execExample = async (): Promise<void> => {
  // prompt config
  const promptCfg: PromptInput = {
    id: 'singleprompt',
    allowEmptyValue: false,
    defaultValue: '',
    endIfEmpty: false,
    prompt: 'What is your favorite anime?',
    valueToEndPrompt: '',
    promptListTitle: 'Animes',
    promptList: [
      {id: 1, key: 'B', text: 'Bleach'},
      {id: 2, key: 'N', text: 'Naruto'},
      {id: 3, key: 'D', text: 'Death Note'},
    ]
  };

  // description
  console.clear();
  console.log(`\x1B[4mPrompt Config\x1B[24m`);
  console.log(`${JSON.stringify(promptCfg, null, 2)}`);
  console.log('');
  displayPromptBehaviors(promptCfg);

  // prompt user
  return prompter.prompt(promptCfg).then((res: PromptResult) => {
    // user entered value is as-is how the user typed it in
    // also, this value can be the defaultValue if it is specified and user did not enter anything
    // case-sensitivity or insensitivy must be explicitly handled from this point on for the entered value
    console.log('');
    console.log(`User input: \u001b[44;1m\xAB\u001b[0m${res.enteredValue}\u001b[44;1m\xBB\u001b[0m`);
  }).catch((err) => {
    // whenever we consume prompter, we should trap REJECT because Node soon will deprecate unhandled promise rejection
    // and will just terminate the process with error code > 0
    // throw err; /* if we want error to bubble up on catch chain */

    // because this prompt is wrapped by another prompt (index.ts)
    // we should re-throw error for unknown exception
    if (err.message !== 'User did not enter value') {
      throw err;
    } else {
      console.log('');
      console.log(`[S01 Error] ${err.message}`);
    }
  });
};

/**
 * Single prompt module
 */
const listPrompt01: ExampleModule = {
  name: 'List Prompt 01',
  shortcut: 'L01',
  desc: 'Demonstrate list prompt',
  fn: execExample
};

// export
export default listPrompt01;