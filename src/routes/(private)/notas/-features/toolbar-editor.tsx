import { Editor } from "@tiptap/react";
import { Bold, Italic, Heading1, List } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
    editor: Editor;
}

export function EditorToolbar({ editor }: Props) {
    if (!editor) return null;

    return (
        <div className="flex gap-1 bg-muted border-t border-b border-muted-foreground/20 py-2">
            <Button
                size="icon-sm"
                variant={editor.isActive("bold") ? "default" : "ghost"}
                onClick={() => editor.chain().focus().toggleBold().run()}
            >
                <Bold size={16} />
            </Button>

            <Button
                size="icon-sm"
                variant={editor.isActive("italic") ? "default" : "ghost"}
                onClick={() => editor.chain().focus().toggleItalic().run()}
            >
                <Italic size={16} />
            </Button>

            <Button
                size="icon-sm"
                variant={
                    editor.isActive("heading", { level: 1 })
                        ? "default"
                        : "ghost"
                }
                onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 1 }).run()
                }
            >
                <Heading1 size={16} />
            </Button>

            <Button
                size="icon-sm"
                variant={editor.isActive("bulletList") ? "default" : "ghost"}
                onClick={() => editor.chain().focus().toggleBulletList().run()}
            >
                <List size={16} />
            </Button>
        </div>
    );
}
