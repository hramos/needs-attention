"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
const github = __importStar(require("@actions/github"));
/**
 * Check if the issue is marked as needing attention, and this comment's
 * author is the original issue author.
 */
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const octokit = github.getOctokit(core.getInput('token'), { required: true });
            const context = github.context;
            const { owner, repo } = context.repo;
            const { issue, comment } = context.payload;
            const labels = issue === null || issue === void 0 ? void 0 : issue.labels;
            const issue_number = Number(issue === null || issue === void 0 ? void 0 : issue.number);
            const responseRequiredLabel = core.getInput('response-required-label');
            const needsAttentionLabel = core.getInput('needs-attention-label');
            const perform = core.getInput('perform');
            const isMarked = labels
                .map(label => label.name)
                .includes(responseRequiredLabel);
            if (isMarked && (issue === null || issue === void 0 ? void 0 : issue.user.login) === (comment === null || comment === void 0 ? void 0 : comment.user.login)) {
                if (perform) {
                    console.log(`[Actions:needs-attention]: ${owner}/${repo}#${issue_number} needs attention`);
                    yield octokit.rest.issues.removeLabel({
                        owner,
                        repo,
                        issue_number,
                        name: responseRequiredLabel,
                    });
                    yield octokit.rest.issues.addLabels({
                        owner,
                        repo,
                        issue_number,
                        labels: [needsAttentionLabel],
                    });
                    core.setOutput('result', `${owner}/${repo}#${issue_number} marked as needing attention`);
                }
                else {
                    console.log(`[Actions:needs-attention]: ${owner}/${repo}#${issue_number} would have been flagged as needing attention (dry-run)`);
                    core.setOutput('result', 'dry-run');
                }
            }
            else {
                core.setOutput('result', `${owner}/${repo}#${issue_number} does not need attention`);
            }
        }
        catch (error) {
            if (error instanceof Error)
                core.setFailed(error.message);
        }
    });
}
run();
