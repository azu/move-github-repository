// MIT © 2017 azu
"use strict";
const fs = require("fs");
const path = require("path");
const assert = require("assert");
const shell = require("shelljs");
if (!shell.which("git")) {
    shell.echo("Sorry, this script requires git");
    shell.exit(1);
}
const fetch = require("node-fetch");
const getRemoteOriginUrl = require("git-remote-origin-url");
const fromUrl = require("hosted-git-info").fromUrl;
/**
 * @returns {Promise.<{ owner: string?, repo: string?}>}
 */
const getRepositoryInfo = () => {
    return getRemoteOriginUrl()
        .then(url => {
            return fromUrl(url);
        })
        .then(result => {
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
        shell.echo("Error:" + command);
        shell.exit(1);
    }
}

function touchREADME(README) {
    const README_PATH = path.join(process.cwd(), "README.md");
    fs.writeFileSync(README_PATH, README, "utf-8");
    run(`git add "${README_PATH}"`);
}

function createMovedBranchAndPush(message, branch) {
    run(`git checkout --orphan "${branch}"`);
    run(`git rm -rf "*"`);
    run(`git clean -fx`);
    touchREADME(message);
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
        const pass = function(response) {
            if (!response.ok) {
                return Promise.reject(new Error(response.statusText));
            }
            return Promise.resolve(response);
        };
        return fetch(`https://api.github.com/repos/${owner}/${repo}`, {
            method: "POST",
            headers: {
                Authorization: "token " + GH_TOKEN
            },
            body: JSON.stringify({
                description,
                homepage,
                archived: true,
                default_branch: branch
            })
        })
            .then(pass)
            .then(res => res.json());
    });
};
