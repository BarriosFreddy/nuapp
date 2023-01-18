export const generateAuthKeyPair = (module: string, privilege: string) =>
  module.concat(':').concat(privilege);
