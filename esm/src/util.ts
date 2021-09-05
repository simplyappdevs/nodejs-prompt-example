/**
 * Simply AppDevs Imports
 */
import {PromptInput} from '@simplyappdevs/nodejs-prompt';

/**
 * Displays help text based on prompt configuration
 * @param promptCfg Prompt configuration
 */
const displayPromptBehaviors = (promptCfg: PromptInput) => {
  console.log(`\x1B[4mBehavior\x1B[24m`);
  console.log(`${promptCfg.allowEmptyValue ? '\u2705' : '\u274c'} allowEmptyValue:\tKeep asking if user did not enter anything`);
  console.log(`${promptCfg.defaultValue !== '' ? '\u2705' : '\u274c'} defaultValue:\tUse this value [${promptCfg.defaultValue}] if user did not enter anything`);
  console.log(`${promptCfg.endIfEmpty ? '\u2705' : '\u274c'} endIfEmpty:\t\tEnd prompt if user did not enter anything`);
  console.log(`${promptCfg.promptList && promptCfg.promptList.length > 0 ? '\u2705' : '\u274c'} promptList[]:\tContains one or more prompt items`);
};

// exports
export {displayPromptBehaviors};

/**
  // color codes: https://www.lihaoyi.com/post/BuildyourownCommandLinewithANSIescapecodes.html
  // colors: https://blog.bitsrc.io/coloring-your-terminal-using-nodejs-eb647d4af2a2
  // ascii codes: https://www.ascii-code.com/
 */