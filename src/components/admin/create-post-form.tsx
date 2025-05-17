'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea'; // Re-added for Summary field
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import TiptapEditor from './tiptap-editor';
import TurndownService from 'turndown';

// Initialize Turndown service
const turndownService = new TurndownService({ 
  headingStyle: 'atx', // Use # for headings
  hr: '---', // Use --- for horizontal rules
  bulletListMarker: '-', // Use - for bullet lists
  codeBlockStyle: 'fenced', // Use ``` for code blocks
});
// Add a rule for images to keep them as basic Markdown images
turndownService.addRule('userImage', {
  filter: 'img',
  replacement: function (content: string, node: any) { // Typed 'content' parameter
    const alt = node.alt || '';
    const src = node.getAttribute('src') || '';
    const title = node.title || '';
    const titlePart = title ? ` "${title}"` : '';
    return src ? `![${alt}](${src}${titlePart})` : '';
  }
});


// Helper function to generate a slug
const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .trim()
    .replace(/[\s\W-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

export default function CreatePostForm() {
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [summary, setSummary] = useState('');
  const [author, setAuthor] = useState('Abdul1028');
  // Initial content for Tiptap is now HTML or Markdown that Tiptap can parse
  const [editorHtmlContent, setEditorHtmlContent] = useState('<p>Start writing your blog post content...</p>');
  const [isLoading, setIsLoading] = useState(false);

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    setSlug(generateSlug(newTitle));
  };

  const handleEditorContentChange = (htmlContent: string) => {
    setEditorHtmlContent(htmlContent);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    if (!title || !slug || !summary || !editorHtmlContent) {
      toast.error('Please fill in all fields: Title, Summary, and Content.');
      setIsLoading(false);
      return;
    }

    const today = new Date().toISOString().split('T')[0];
    const markdownContent = turndownService.turndown(editorHtmlContent);

    const fileContent = `---
title: '${title.replace(/'/g, "\''")}'
date: '${today}'
author: '${author.replace(/'/g, "\''")}'
summary: '${summary.replace(/'/g, "\''")}'
slug: '${slug}'
---

${markdownContent}
`;

    try {
      const blob = new Blob([fileContent], { type: 'text/markdown;charset=utf-8' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `${slug}.mdx`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);
      toast.success(`MDX file "${slug}.mdx" generated and download started!`);
    } catch (error) {
      console.error("Error generating file:", error);
      toast.error("Failed to generate MDX file.");
    }
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-4 border rounded-lg shadow-sm">
      <div>
        <Label htmlFor="postTitle">Post Title</Label>
        <Input 
          id="postTitle" 
          type="text" 
          value={title} 
          onChange={handleTitleChange} 
          placeholder="Enter post title"
          required 
        />
        {slug && <p className="text-xs text-muted-foreground mt-1">Generated slug: {slug}.mdx</p>}
      </div>

      <div>
        <Label htmlFor="postSummary">Summary</Label>
        <Textarea // This should now work
          id="postSummary" 
          value={summary} 
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setSummary(e.target.value)} 
          placeholder="A brief summary of the post for the list page"
          rows={3}
          required
        />
      </div>
      
      <div>
        <Label htmlFor="postAuthor">Author</Label>
        <Input 
          id="postAuthor" 
          type="text" 
          value={author} 
          onChange={(e: ChangeEvent<HTMLInputElement>) => setAuthor(e.target.value)} 
          placeholder="Author name"
          required 
        />
      </div>

      <div>
        <Label htmlFor="mdxContent">MDX Content</Label>
        <TiptapEditor 
          content={editorHtmlContent} 
          onChange={handleEditorContentChange} 
        />
        <p className="text-xs text-muted-foreground mt-1">
          Use the toolbar to format your content. Images will be inserted using their URLs.
        </p>
      </div>

      <Button type="submit" disabled={isLoading}>
        {isLoading ? 'Generating File...' : 'Generate .mdx File for Download'}
      </Button>
    </form>
  );
} 