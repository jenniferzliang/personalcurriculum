import { useMemo } from 'react';
import { marked } from 'marked';

// Renders a curriculum's stored Markdown syllabus. The content is the
// user's own local document (or a bundled seed), so rendering it as HTML
// carries no third-party risk in this localStorage-only app.
export default function SyllabusView({ markdown }: { markdown: string }) {
  const html = useMemo(() => marked.parse(markdown, { async: false }), [markdown]);
  return <div className="syllabus-content" dangerouslySetInnerHTML={{ __html: html }} />;
}
