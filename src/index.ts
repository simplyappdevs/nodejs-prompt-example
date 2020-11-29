/**
 * Simply AppDevs imports
 */
import {prompter, PromptInput, PromptResult} from '@simplyappdevs/nodejs-prompt';

/**
 * App imports
 */
import {ExampleModule} from './typedefs';
import ExSinglePromptMod, {default as ExSinglePrompt} from './ex-single-prompt';

/**
 * App entrypoint
 */
(function () {
  // examples
  const examples: Map<string, ExampleModule> = new Map();

  examples.set(ExSinglePromptMod.name, ExSinglePromptMod);

  // build prompt
  const promptsCfg: PromptInput = {
    id: 'mainprompt',
    allowEmptyValue: false,
    defaultValue: '',
    endIfEmpty: false,
    prompt: 'Select example to run',
    valueToEndPrompt: '',
    promptList: [],
    promptListTitle: 'Examples'
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
      const demo = examples.get(selected!);

      if (demo) {
        // display description
        console.log('[MAIN] Running example:');
        console.log(demo.desc);
        console.log('');

        // run demo
        await demo.fn();

        getNext = true;
      }
    }

    if (getNext) {
      prompter.prompt(promptsCfg).then((res: PromptResult) => {
        if (res.enteredValue === 'X') {
          Promise.resolve();
        } else {
          return runDemo(res.enteredValue);
        }
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