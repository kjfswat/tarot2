import React, { useState } from 'react';
import { Share2, Download, Link, Twitter } from 'lucide-react';
import html2canvas from 'html2canvas';

interface ReadingShareProps {
  spreadRef: React.RefObject<HTMLDivElement>;
  reading: {
    spread: string;
    cards: Array<{ name: string; position: string }>;
    interpretation: string;
  };
}

export function ReadingShare({ spreadRef, reading }: ReadingShareProps) {
  const [shareUrl, setShareUrl] = useState('');
  const [showShareOptions, setShowShareOptions] = useState(false);

  const generateShareableImage = async () => {
    if (!spreadRef.current) return;
    
    const canvas = await html2canvas(spreadRef.current);
    return canvas.toDataURL('image/png');
  };

  const generateShareableUrl = () => {
    const readingData = encodeURIComponent(JSON.stringify(reading));
    const url = `${window.location.origin}/shared-reading/${readingData}`;
    setShareUrl(url);
    return url;
  };

  const shareToTwitter = async () => {
    const url = generateShareableUrl();
    const text = `Check out my tarot reading: ${reading.spread} spread`;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`);
  };

  const copyShareableLink = async () => {
    const url = generateShareableUrl();
    await navigator.clipboard.writeText(url);
    // Show success message
  };

  const downloadImage = async () => {
    const imageData = await generateShareableImage();
    if (!imageData) return;

    const link = document.createElement('a');
    link.download = `tarot-reading-${Date.now()}.png`;
    link.href = imageData;
    link.click();
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowShareOptions(!showShareOptions)}
        className="p-2 rounded-full bg-purple-800/50 text-amber-400 hover:bg-purple-700/50 transition-colors"
      >
        <Share2 className="w-5 h-5" />
      </button>

      {showShareOptions && (
        <div className="absolute right-0 mt-2 w-48 bg-purple-800 rounded-lg shadow-lg overflow-hidden">
          <button
            onClick={copyShareableLink}
            className="w-full px-4 py-2 flex items-center gap-2 hover:bg-purple-700/50 text-purple-100"
          >
            <Link className="w-4 h-4" />
            Copy Link
          </button>
          <button
            onClick={downloadImage}
            className="w-full px-4 py-2 flex items-center gap-2 hover:bg-purple-700/50 text-purple-100"
          >
            <Download className="w-4 h-4" />
            Download Image
          </button>
          <button
            onClick={shareToTwitter}
            className="w-full px-4 py-2 flex items-center gap-2 hover:bg-purple-700/50 text-purple-100"
          >
            <Twitter className="w-4 h-4" />
            Share on Twitter
          </button>
        </div>
      )}
    </div>
  );
}