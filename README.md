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


## Prerequisites

In order to run this project, you will need to have the following installed on your computer:
- nodejs
- yarn | npm

## Installation

To install the application, follow these steps:

1.  Clone the repository to your local machine:

 
```bash
git clone https://github.com/hramos/needs-attention
```

2. Navigate to the project directory in your terminal.

 
```bash
  cd needs-attention
```
3. Run `yarn` to install the necessary packages.

 
```bash
  yarn
```

## usage

To start the application, run yarn build. This will start the application.

```bash
yarn build
```

## Contributing

Contributions to this project are welcome. 
If you encounter any issues or have suggestions for improvement, please open an issue on the GitHub repository.

Before contributing, please review the contribution guidelines at contribution.md file
