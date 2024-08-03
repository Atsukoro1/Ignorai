import { createStoreDirectories, saveApiToken } from "./fileSystem";

type Options = {
  model: string;
};

export const entry = (token: string, option: Options) => {
  createStoreDirectories();
  saveApiToken(token);

  console.log("Configuration saved succesfully!");
};
