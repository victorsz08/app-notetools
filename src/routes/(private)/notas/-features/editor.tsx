import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { EditorToolbar } from "./toolbar-editor";

interface EditorProps {
    content: string;
    onChange: (value: string) => void;
}

export function TextEditor({ content, onChange }: EditorProps) {
    const editor = useEditor({
        extensions: [StarterKit],
        content,
        onUpdate({ editor }) {
            onChange(editor.getHTML());
        },
    });

    if (!editor) return null;

    return (
        <div className="rounded-md bg-card h-[80vh]">
            <EditorToolbar editor={editor} />
            <EditorContent
                editor={editor}
                className="flex-1 p-3 overflow-y-auto"
            />
        </div>
    );
}
