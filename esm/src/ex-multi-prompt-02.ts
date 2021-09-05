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
  const promptCfg1: PromptInput = {
    id: 'multiprompt1',
    allowEmptyValue: false,
    defaultValue: '',
    endIfEmpty: false,
    prompt: 'First Name?:',
    valueToEndPrompt: ''
  };

  const promptCfg2: PromptInput = {
    id: 'multiprompt2',
    allowEmptyValue: true,
    defaultValue: '',
    endIfEmpty: false,
    prompt: 'Middle Name?:',
    valueToEndPrompt: ''
  };

  const promptCfg3: PromptInput = {
    id: 'multiprompt3',
    allowEmptyValue: false,
    defaultValue: '',
    endIfEmpty: false,
    prompt: 'Last Name?:',
    valueToEndPrompt: ''
  };

  // description
  console.clear();
  console.log(`\x1B[4mPrompt Config\x1B[24m`);
  console.log(`${JSON.stringify(promptCfg1, null, 2)}`);
  console.log('');
  displayPromptBehaviors(promptCfg1);

  console.log(`${JSON.stringify(promptCfg2, null, 2)}`);
  console.log('');
  displayPromptBehaviors(promptCfg2);

  console.log(`${JSON.stringify(promptCfg3, null, 2)}`);
  console.log('');
  displayPromptBehaviors(promptCfg3);

  // prompt user
  return prompter.prompts([promptCfg1, promptCfg2, promptCfg3]).then((res: PromptResult[]) => {
    // user entered value is as-is how the user typed it in
    // also, this value can be the defaultValue if it is specified and user did not enter anything
    // case-sensitivity or insensitivy must be explicitly handled from this point on for the entered value
    console.log('');
    res.forEach((val: PromptResult, ind: number) => {
      console.log(`${val.prompt}: \u001b[44;1m\xAB\u001b[0m${val.enteredValue}\u001b[44;1m\xBB\u001b[0m`);
    });
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
      console.log(`[M02 Error] ${err.message}`);
    }
  });
};

/**
 * Single prompt module
 */
const multiPrompt02: ExampleModule = {
  name: 'Multi Prompt 02',
  shortcut: 'M02',
  desc: 'Demonstrate multi prompt',
  fn: execExample
};

// export
export default multiPrompt02;