// MIT © 2017 azu
"use strict";
const fs = require("fs");
const path = require("path");
const assert = require("assert");
const shell = require('shelljs');
if (!shell.which('git')) {
    shell.echo('Sorry, this script requires git');
    shell.exit(1);
}
const GitHubApi = require("github");
const getRemoteOriginUrl = require("git-remote-origin-url");
const fromUrl = require("hosted-git-info").fromUrl;
/**
 * @returns {Promise.<{ owner: string?, repo: string?}>}
 */
const getRepositoryInfo = () => {
    return getRemoteOriginUrl().then(url => {
        return fromUrl(url);
    }).then(result => {
        if (!result) {
            return {
                owner: null,
                repo: null
            };
        }
        return {
            owner: result.user,
            repo: result.project
        };
    });
};

function run(command) {
    if (shell.exec(command).code !== 0) {
        shell.echo('Error:' + command);
        shell.exit(1);
    }
}
function touchREADME(README) {
    const README_PATH = path.join(process.cwd(), "README.md");
    fs.writeFileSync(README_PATH, README, "utf-8");
}
function createMovedBranchAndPush(message, branch) {
    run(`git checkout --orphan "${branch}"`);
    run(`git rm -rf *`);
    touchREADME(message);
    run("git add .");
    run(`git commit -m "301 Moved Permanently"`);
    run(`git push -u origin "${branch}"`);
}
module.exports = function({ description, homepage, GH_TOKEN = process.env.GH_TOKEN }) {
    assert(description, "--description needed");
    assert(homepage, "--homepage needed");
    assert(GH_TOKEN, "GH_TOKEN env needed");
    const branch = "301_moved_permanently";
    return getRepositoryInfo().then(({ owner, repo }) => {
        if (!owner || !repo) {
            console.warn("Not found owner or repo in the current dir");
            return;
        }
        const message = `# This repository has moved to:\n## <${homepage}>`;
        createMovedBranchAndPush(message, branch);


        const github = new GitHubApi({
            debug: process.env.NODE_ENV === "development",
            timeout: 5000
        });
        github.authenticate({
            type: "token",
            token: GH_TOKEN,
        });
        return github.repos.edit({
            owner,
            repo,
            name: repo,
            description,
            homepage,
            default_branch: branch
        });
    });
};