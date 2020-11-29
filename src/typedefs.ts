/**
 * ExampleModule definition
 */
export interface ExampleModule {
  name: string;     // name of the example
  shortcut: string; // shortcut for the example
  desc: string;     // description of the example
  fn: () => Promise<void>;   // function to execute
}