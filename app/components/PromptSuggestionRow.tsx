import PromptSuggestionButton from "./PromptSuggestionButton";

const PromptSuggestionRow = ({onPromptClick}) => {

    const prompts = [
        "I need help my item hasn't arrived."
    ];

    return (
        <div className="prompt-suggestion-row">
            {prompts.map((prompt, index) => <PromptSuggestionButton
                key={`suggestion-${index}`}
                text={prompt}
                onClick={() => onPromptClick(prompt)}
            />)}
        </div>
    )
}

export default PromptSuggestionRow