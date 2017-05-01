#!/usr/bin/env node
'use strict';
const meow = require('meow');
const moveGitHub = require("../lib/move-github-repository");
const cli = meow(`
    Usage
      $ GH_TOKEN=xxx move-github-repository --description "[[MOVED]]" --homepage http://example.com/new

    Options
      --description  Description repository
      --homepage     New URL
      
    Env
      GH_TOKEN=xxx move-github-repository --description "[[MOVED]]" --homepage http://example.com/new

    Examples
      $ GH_TOKEN=xxx move-github-repository --description "[[MOVED]]" --homepage http://example.com/new
`, {
    alias: {
        d: 'description',
        h: 'homepage'
    }
});
/*
 {
 input: ['unicorns'],
 flags: {rainbow: true},
 ...
 }
 */

moveGitHub(cli.flags);