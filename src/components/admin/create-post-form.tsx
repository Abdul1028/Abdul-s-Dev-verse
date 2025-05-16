'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

// Helper function to generate a slug (you might want a more robust one)
const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .trim()
    .replace(/[\s\W-]+/g, '-') // Replace spaces, non-word chars, and hyphens with a single hyphen
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
};

export default function CreatePostForm() {
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [summary, setSummary] = useState('');
  const [author, setAuthor] = useState('Abdul1028'); // Default author
  const [mdxContent, setMdxContent] = useState('# Your H1 Title Here\n\nStart writing your blog post content in Markdown/MDX format.\n\n- Use lists\n- **Bold text**\n- [Links](https://example.com)\n');
  const [isLoading, setIsLoading] = useState(false);

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    setSlug(generateSlug(newTitle));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    if (!title || !slug || !summary || !mdxContent) {
      toast.error('Please fill in all fields: Title, Summary, and Content.');
      setIsLoading(false);
      return;
    }

    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format

    const fileContent = `---
title: '${title.replace(/'/g, "\''")}'
date: '${today}'
author: '${author.replace(/'/g, "\''")}'
summary: '${summary.replace(/'/g, "\''")}'
slug: '${slug}'
---

${mdxContent}
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
      
      // Optionally reset form
      // setTitle('');
      // setSlug('');
      // setSummary('');
      // setMdxContent('# Your H1 Title Here\n\n...');

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
        <Textarea 
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
        <Textarea 
          id="mdxContent" 
          value={mdxContent} 
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setMdxContent(e.target.value)} 
          placeholder="Write your blog post using Markdown/MDX..."
          rows={15}
          className="font-mono text-sm"
          required
        />
        <p className="text-xs text-muted-foreground mt-1">
          Supports Markdown including headings, bold, italics, links, lists, etc. 
        </p>
      </div>

      <Button type="submit" disabled={isLoading}>
        {isLoading ? 'Generating File...' : 'Generate .mdx File for Download'}
      </Button>
    </form>
  );
} 