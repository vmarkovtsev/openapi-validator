const { Spectral } = require('@stoplight/spectral-core');

// this module provides a reusable function that sets up spectral
// with the given ruleset, runs the tool, then returns the results.

// 'ruleName' is the name of the rule. this would be the key in a ruleset file
// 'rule' is the actual rule object
// 'doc' is the API definition, in programmatic JSON format, to validate

module.exports = async (ruleName, rule, doc) => {
  const spectral = new Spectral();

  // define a custom 'compute fingerprint' function that ensures
  // validation ids are always unique. otherwise, rules with the same
  // code and path with overwrite each other
  let ruleId = 0;
  spectral._computeFingerprint = () => {
    ruleId++;
    return ruleId;
  };

  spectral.setRuleset({
    rules: {
      [ruleName]: rule
    }
  });

  return spectral.run(doc);
};
