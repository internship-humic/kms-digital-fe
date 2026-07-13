"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import {
  Bold,
  Italic,
  Strikethrough,
  List,
  ListOrdered,
  Heading2,
  ImageIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface TiptapEditorProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

const MenuBar = ({ editor }: { editor: any }) => {
  if (!editor) return null;

  const addImage = () => {
    const url = window.prompt("Masukkan URL Gambar:");
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-1 border-b border-border-input/30 p-2 bg-gray-50/50 rounded-t-xl">
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`h-8 w-8 p-0 ${editor.isActive("bold") ? "bg-primary-light/50 text-btn-primary" : "text-icon-muted"}`}
      >
        <Bold size={16} />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`h-8 w-8 p-0 ${editor.isActive("italic") ? "bg-primary-light/50 text-btn-primary" : "text-icon-muted"}`}
      >
        <Italic size={16} />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={`h-8 w-8 p-0 ${editor.isActive("strike") ? "bg-primary-light/50 text-btn-primary" : "text-icon-muted"}`}
      >
        <Strikethrough size={16} />
      </Button>

      <div className="w-[1px] h-4 bg-border-input/40 mx-1" />

      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`h-8 w-8 p-0 ${editor.isActive("heading", { level: 2 }) ? "bg-primary-light/50 text-btn-primary" : "text-icon-muted"}`}
      >
        <Heading2 size={16} />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`h-8 w-8 p-0 ${editor.isActive("bulletList") ? "bg-primary-light/50 text-btn-primary" : "text-icon-muted"}`}
      >
        <List size={16} />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`h-8 w-8 p-0 ${editor.isActive("orderedList") ? "bg-primary-light/50 text-btn-primary" : "text-icon-muted"}`}
      >
        <ListOrdered size={16} />
      </Button>

      <div className="w-[1px] h-4 bg-border-input/40 mx-1" />

      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={addImage}
        className="h-8 w-8 p-0 text-icon-muted hover:text-btn-primary"
      >
        <ImageIcon size={16} />
      </Button>
    </div>
  );
};

export default function TiptapEditor({
  value,
  onChange,
  error,
}: TiptapEditorProps) {
  let initialContent = "";
  try {
    const parsed = JSON.parse(value);
    initialContent = parsed;
  } catch {
    initialContent = value;
  }

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({
        inline: true,
        allowBase64: true,
      }),
      Link.configure({
        openOnClick: false,
      }),
    ],
    content: initialContent || {
      type: "doc",
      content: [
        {
          type: "paragraph",
        },
      ],
    },
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose-base max-w-none focus:outline-none min-h-[250px] p-4 text-text-main",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(JSON.stringify(editor.getJSON()));
    },
  });

  return (
    <div
      className={`w-full rounded-xl border flex flex-col bg-white overflow-hidden ${
        error
          ? "border-danger focus-within:ring-2 focus-within:ring-danger/20"
          : "border-border-input/60 focus-within:ring-2 focus-within:ring-btn-primary/20 focus-within:border-btn-primary"
      }`}
    >
      <MenuBar editor={editor} />
      <div className="flex-1 overflow-y-auto max-h-[500px]">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
