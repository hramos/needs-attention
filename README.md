# Label Issues that Need Attention When Author Responds

Applies a label whenever the original author of an issue adds a comment to an issue that needed their response.

## How It Works

If the original author of an issue adds a comment on their issue, and that issue has a 'Needs Author Feedback' label, this action will remove the label and apply a 'Needs Attention' label.

## Inputs

### `response-required-label`

The name of the label that indicates an issue that needs a response from the author. Default `"Needs Author Feedback"`.

### `needs-attention-label`

The name of the label that indicates an issue that needs attention. Default `"Needs Attention"`.

### `repo-token`

**Required.** The `GITHUB_TOKEN` for the repository being acted on.

## Outputs

### `results`

A string description of any actions taken.

## Example usage

```
name: Issue Needs Attention
# This workflow is triggered on issue comments.
on:
  issue_comment:
    types: created

jobs:
  applyNeedsAttentionLabel:
    name: Apply Needs Attention Label
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Apply Needs Attention Label
        uses: hramos/needs-attention@v1
        with:
          repo-token: ${{ secrets.GITHUB_TOKEN }}
```

Configuring labels:

```
uses: hramos/needs-attention@v1
with:
    repo-token: ${{ secrets.GITHUB_TOKEN }}
    response-required-label: 'Needs Author Feedback'
    needs-attention-label: 'Needs Attention'
```
