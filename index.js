const core = require('@actions/core');
const github = require('@actions/github');

const myToken = core.getInput('repo-token');
const octokit = new github.GitHub(myToken);

async function run() {
    try {
        const {owner, repo} = github.context.repo;
        const issue = github.context.payload.issue;
        const labels = issue.labels;
        const issue_number = issue.number;
        const comment = github.context.payload.comment;

        const responseRequiredLabel = core.getInput('response-required-label');
        const needsAttentionLabel = core.getInput('needs-attention-label');
        const perform = core.getInput('perform');

        const isMarked = labels.map(label => label.name).includes(responseRequiredLabel)

        if (isMarked && issue.user.login === comment.user.login) {
            if (perform) {
                console.log(`${owner}/${repo}#${issue_number} needs attention`);
                await octokit.issues.removeLabel({owner, repo, issue_number, name: responseRequiredLabel})
                await octokit.issues.addLabels({owner, repo, issue_number, labels: [needsAttentionLabel]})
                core.setOutput("result", `${owner}/${repo}#${issue_number} marked as needing attention`);
            } else {
                console.log(`${owner}/${repo}#${issue_number} would have been flagged as needing attention (dry-run)`);
                core.setOutput("result", `dry-run`);
            }
        } else {
            core.setOutput("result", `${owner}/${repo}#${issue_number} does not need attention`);
        }
    } catch (error) {
        core.setFailed(error.message);
    }
}

run();
