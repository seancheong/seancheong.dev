import { cn } from '@/lib/utils';
import * as React from 'react';

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        'border-secondary-foreground/30 placeholder:text-muted-foreground focus-visible:ring-ring flex min-h-[60px] w-full rounded-[8px] border bg-transparent px-3 py-2 text-sm shadow-xs focus-visible:ring-1 focus-visible:outline-hidden disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = 'Textarea';

export { Textarea };
