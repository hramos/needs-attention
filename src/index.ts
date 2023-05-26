import * as core from '@actions/core'
import * as github from '@actions/github'

/**
 * Check if the issue is marked as needing attention, and this comment's
 * author is the original issue author.
*/
async function run() {
  try {
    const octokit = github.getOctokit(core.getInput('token'), {required: true});
    const context = github.context;
    const {owner, repo} = context.repo;
    const {issue, comment} = context.payload;
    const labels = issue?.labels;
    const issue_number: number = issue?.number as number;

    const responseRequiredLabel = core.getInput('response-required-label');
    const needsAttentionLabel = core.getInput('needs-attention-label');
    const perform = core.getInput('perform');

    const isMarked = labels
      .map(label => label.name)
      .includes(responseRequiredLabel);

    if (isMarked && issue?.user.login === comment?.user.login) {
      if (perform) {
        console.log(`[Actions:needs-attention]: ${owner}/${repo}#${issue_number} needs attention`);
        await octokit.rest.issues.removeLabel({
          owner,
          repo,
          issue_number,
          name: responseRequiredLabel,
        });
        await octokit.rest.issues.addLabels({
          owner,
          repo,
          issue_number,
          labels: [needsAttentionLabel],
        });
        core.setOutput(
          'result',
          `${owner}/${repo}#${issue_number} marked as needing attention`,
        );
      } else {
        console.log(
          `[Actions:needs-attention]: ${owner}/${repo}#${issue_number} would have been flagged as needing attention (dry-run)`,
        );
        core.setOutput('result', 'dry-run');
      }
    } else {
      core.setOutput(
        'result',
        `${owner}/${repo}#${issue_number} does not need attention`,
      );
    }
  } catch (error: any) {
    core.setFailed(error.message);
  }
}

run();
