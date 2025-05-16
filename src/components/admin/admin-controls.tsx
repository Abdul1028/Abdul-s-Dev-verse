'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner'; // Assuming you use sonner for toasts, adjust if not

export default function AdminControls() {
  const [isLoading, setIsLoading] = useState(false);

  const handleRevalidateBlog = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/admin/revalidate-blog-manual', {
        method: 'POST',
      });
      const data = await response.json();

      if (response.ok) {
        toast.success(data.message || 'Blog revalidation triggered successfully!');
      } else {
        toast.error(data.message || 'Failed to trigger blog revalidation.');
      }
    } catch (error) {
      console.error('Error revalidating blog:', error);
      toast.error('An error occurred while revalidating the blog.');
    }
    setIsLoading(false);
  };

  return (
    <div className="p-4 border rounded-lg shadow-sm">
      <p className="mb-3 text-sm text-muted-foreground">
        Manually trigger a revalidation of all blog posts. This will fetch the latest content from GitHub.
      </p>
      <Button onClick={handleRevalidateBlog} disabled={isLoading}>
        {isLoading ? 'Revalidating...' : 'Revalidate Blog Posts'}
      </Button>
    </div>
  );
} 