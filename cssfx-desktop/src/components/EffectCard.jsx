import React, { useState } from 'react';
import { Copy, Heart, Check, Star } from 'lucide-react';

export default function EffectCard({ effect, isFavorite, onToggleFavorite }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const code = `<style>\n${effect.css}\n</style>\n${effect.html}`;
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border/60 bg-card/60 p-5 backdrop-blur-md transition-all duration-300 hover:border-violet-500/40 hover:shadow-xl hover:shadow-violet-500/10 hover:-translate-y-1">
      {/* Dynamic CSS Injection for Preview */}
      <style>{effect.css}</style>

      {/* Header Info */}
      <div className="flex items-center justify-between gap-2 mb-4">
        <div>
          <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/80">
            {effect.category}
          </span>
          <h3 className="text-sm font-medium text-foreground tracking-tight">
            {effect.title}
          </h3>
        </div>

        <button
          onClick={() => onToggleFavorite(effect.id)}
          className={`p-1.5 rounded-lg border transition-all ${
            isFavorite
              ? 'border-rose-500/40 bg-rose-500/10 text-rose-500'
              : 'border-border/40 bg-background/40 text-muted-foreground hover:text-foreground'
          }`}
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Live Preview Arena */}
      <div className="relative flex h-36 w-full items-center justify-center rounded-xl border border-border/40 bg-background/50 p-4 overflow-hidden">
        <div dangerouslySetInnerHTML={{ __html: effect.html }} />
      </div>

      {/* Description & Action Footer */}
      <div className="mt-4 flex items-center justify-between pt-3 border-t border-border/40">
        <p className="text-xs text-muted-foreground line-clamp-1 max-w-[70%]">
          {effect.description}
        </p>

        <button
          onClick={handleCopy}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
            copied
              ? 'bg-emerald-600 text-white'
              : 'bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20'
          }`}
        >
          {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? 'Copied' : 'Copy'}</span>
        </button>
      </div>
    </div>
  );
}