/**
 * Simply AppDevs imports
 */
import { } from '@simplyappdevs/nodejs-prompt';

/**
 * App imports
 */
import {ExampleModule} from './typedefs';

/**
 * Example entrypoint
 */
const execExample = async (): Promise<void> => {

  return Promise.resolve();
};

/**
 * Single prompt module
 */
const ExSinglePromptMod: ExampleModule = {
  name: 'Single Prompt',
  shortcut: 'S',
  desc: 'Demonstrate single prompt',
  fn: execExample
};

// export
export default ExSinglePromptMod;