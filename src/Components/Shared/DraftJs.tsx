import * as React from "react";
import { Editor, EditorState, ContentState } from "draft-js";
import "draft-js/dist/Draft.css";
import * as Guard from "../../Helpers/Guard.ts";

export interface DraftEditorProps {
    content: string;
    onChange?: (text: string) => void;
}

const DraftEditor = ({ content, onChange }: DraftEditorProps) => {
    const [editorState, setEditorState] = React.useState(
        EditorState.createWithContent(ContentState.createFromText(content))
    );

    const onEditorChange = (state: EditorState) => {
        setEditorState(state);
        if (Guard.isNotNullOrUndefined(onChange)) {
            onChange(state.getCurrentContent().getPlainText());
        }

    }

    return (
        <div style={{ border: "1px solid #ccc", padding: "10px", minHeight: "100px" }}>
            <Editor editorState={editorState} onChange={onEditorChange} />
        </div>
    );
};

export default DraftEditor;
