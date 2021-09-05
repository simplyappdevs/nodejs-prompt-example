/**
 * Simply AppDevs imports
 */
import {prompter, PromptInput, PromptResult} from '@simplyappdevs/nodejs-prompt';

/**
 * App imports
 */
import {ExampleModule} from './typedefs';
import singlePrompt01 from './ex-single-prompt-01';
import singlePrompt02 from './ex-single-prompt-02';
import singlePrompt03 from './ex-single-prompt-03';
import singlePrompt04 from './ex-single-prompt-04';
import singlePrompt05 from './ex-single-prompt-05';
import singlePrompt06 from './ex-single-prompt-06';
import singlePrompt07 from './ex-single-prompt-07';
import multiPrompt01 from './ex-multi-prompt-01';
import multiPrompt02 from './ex-multi-prompt-02';
import multiPrompt03 from './ex-multi-prompt-03';
import listPrompt01 from './ex-list-prompt-01';
import listPrompt02 from './ex-list-prompt-02';

/**
 * App entrypoint
 */
(function () {
  // examples
  const examples: Map<string, ExampleModule> = new Map();

  examples.set(singlePrompt01.shortcut.toUpperCase(), singlePrompt01);
  examples.set(singlePrompt02.shortcut.toUpperCase(), singlePrompt02);
  examples.set(singlePrompt03.shortcut.toUpperCase(), singlePrompt03);
  examples.set(singlePrompt04.shortcut.toUpperCase(), singlePrompt04);
  examples.set(singlePrompt05.shortcut.toUpperCase(), singlePrompt05);
  examples.set(singlePrompt06.shortcut.toUpperCase(), singlePrompt06);
  examples.set(singlePrompt07.shortcut.toUpperCase(), singlePrompt07);
  examples.set(multiPrompt01.shortcut.toUpperCase(), multiPrompt01);
  examples.set(multiPrompt02.shortcut.toUpperCase(), multiPrompt02);
  examples.set(multiPrompt03.shortcut.toUpperCase(), multiPrompt03);
  examples.set(listPrompt01.shortcut.toUpperCase(), listPrompt01);
  examples.set(listPrompt02.shortcut.toUpperCase(), listPrompt02);

  // build prompt
  const promptsCfg: PromptInput = {
    id: 'mainprompt',
    allowEmptyValue: false,
    defaultValue: '',
    endIfEmpty: false,
    prompt: 'Select example to run',
    valueToEndPrompt: '',
    promptList: [],
    promptListTitle: '\x1B[4mExamples\t\t\t\x1B[24m'
  };

  let id = 0;

  examples.forEach((ex: ExampleModule, key: string) => {
    promptsCfg.promptList!.push({
      id: id++,
      key: ex.shortcut,
      text: ex.name
    });
  });

  // exit selection
  promptsCfg.promptList!.push({
    id: id++,
    key: 'X',
    text: 'Exit'
  });

  // async function for promise chaining
  const runDemo = async (selected: string | null): Promise<void> => {
    // determine if menu was selected
    let getNext: boolean = selected !== null ? false : true;

    // run if selected
    if (selected) {
      const demo = examples.get(selected.toUpperCase());

      if (demo) {
        // display description
        console.log('[MAIN] Running example:');
        console.log(demo.desc);
        console.log('');

        // run demo
        try {
          await demo.fn();
        } catch (err) {
          // rethrowing this exception so that it will go back into
          // catch chain
          throw err;
        }

        getNext = true;
      }
    }

    if (getNext) {
      return prompter.prompt(promptsCfg).then((res: PromptResult) => {
        if (res.enteredValue === 'X') {
          // exit demo
          Promise.resolve();
          return;
        } else {
          // prompt for next demo
          return runDemo(res.enteredValue).catch((err) => {
            // this catch is the chain if the "await" catch above throws an error
            console.log(`[DEMO ERROR] ${err.message}`);
          });
        }
      }).catch((err) => {
        // whenever we consume prompter, we should trap REJECT because Node soon will deprecate unhandled promise rejection
        // and will just terminate the process with error code > 0
        // this is the catch for main menu
        throw err;
      });
    } else {
      // end recursion
      Promise.resolve();
    }
  };

  // run demo
  runDemo(null).catch((err: Error) => {
    console.log(`[MAIN] Error running demo: ${err.message}`);
  });
})();