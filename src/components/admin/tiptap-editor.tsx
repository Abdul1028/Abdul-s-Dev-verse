'use client';

import {
  useEditor, 
  EditorContent, 
  type Editor // Import Editor type for better typing
} from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import LinkExtension from '@tiptap/extension-link'; // Renamed to avoid conflict with React/Next Link
import ImageExtension from '@tiptap/extension-image'; // Renamed for clarity
import {
  Bold, Italic, Strikethrough, Heading1, Heading2, Heading3, 
  List, ListOrdered, Quote, Link2, Image as ImageIcon, Minus
} from 'lucide-react';
import { useCallback } from 'react';
import { Button } from '@/components/ui/button';

interface TiptapEditorProps {
  content: string;
  onChange: (newContent: string) => void;
}

// Define a type for the MenuBar editor prop
interface MenuBarProps {
  editor: Editor | null;
}

const MenuBar = ({ editor }: MenuBarProps) => {
  if (!editor) {
    return null;
  }

  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);
    if (url === null) return; // User cancelled
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  }, [editor]);

  const addImage = useCallback(() => {
    const url = window.prompt('Enter image URL');
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  // Helper for standard toggle buttons
  const commonButtonProps = (actionName: string, actionValue?: any, activeCheckName?: string) => {
    const effectiveActiveCheckName = activeCheckName || actionName;
    return {
      variant: "ghost" as "ghost",
      size: "icon" as "icon",
      onClick: () => (editor.chain().focus() as any)[actionName](actionValue).run(),
      disabled: !(editor.can() as any).chain().focus()[actionName](actionValue).run(),
      className: editor.isActive(effectiveActiveCheckName, actionValue) ? 'bg-muted' : '',
    };
  };

  return (
    <div className="flex flex-wrap items-center gap-1 p-2 border border-input bg-transparent rounded-t-md">
      <Button {...commonButtonProps('toggleBold')} title="Bold">
        <Bold className="h-4 w-4" />
      </Button>
      <Button {...commonButtonProps('toggleItalic')} title="Italic">
        <Italic className="h-4 w-4" />
      </Button>
      <Button {...commonButtonProps('toggleStrike')} title="Strikethrough">
        <Strikethrough className="h-4 w-4" />
      </Button>
      <Button {...commonButtonProps('toggleHeading', { level: 1 }, 'heading')} title="Heading 1">
        <Heading1 className="h-4 w-4" />
      </Button>
      <Button {...commonButtonProps('toggleHeading', { level: 2 }, 'heading')} title="Heading 2">
        <Heading2 className="h-4 w-4" />
      </Button>
      <Button {...commonButtonProps('toggleHeading', { level: 3 }, 'heading')} title="Heading 3">
        <Heading3 className="h-4 w-4" />
      </Button>
      <Button {...commonButtonProps('toggleBulletList', undefined, 'bulletList')} title="Bullet List">
        <List className="h-4 w-4" />
      </Button>
      <Button {...commonButtonProps('toggleOrderedList', undefined, 'orderedList')} title="Ordered List">
        <ListOrdered className="h-4 w-4" />
      </Button>
      <Button {...commonButtonProps('toggleBlockquote', undefined, 'blockquote')} title="Blockquote">
        <Quote className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="icon" onClick={setLink} title="Set Link"  className={editor.isActive('link') ? 'bg-muted' : ''}>
        <Link2 className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="icon" onClick={addImage} title="Add Image">
        <ImageIcon className="h-4 w-4" />
      </Button>
      <Button {...commonButtonProps('setHorizontalRule')} title="Horizontal Rule">
        <Minus className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default function TiptapEditor({ content, onChange }: TiptapEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3, 4] },
        hardBreak: false,
        bulletList: {}, 
        orderedList: {},
        blockquote: {},
      }),
      LinkExtension.configure({
        openOnClick: false,
        autolink: true,
        linkOnPaste: true,
        HTMLAttributes: { // Add attributes for styling or identification if needed
          class: 'editor-link',
        },
      }),
      ImageExtension.configure({
        inline: false,
      }),
    ],
    content: content,
    editorProps: {
      attributes: {
        class: 'prose dark:prose-invert prose-sm sm:prose-base focus:outline-none p-4 border border-input bg-transparent rounded-b-md min-h-[250px]',
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  return (
    <div>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
} 