import React, { useState, useEffect } from 'react';

import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'

import ReactTooltip from "react-tooltip";

import './styles/global.css';
import './styles/master.css';

export default function App() {
  const [text, setText] = useState('');

  useEffect(() => {
    const localStorageText = localStorage.getItem('@markdown-app/text');

    if (localStorageText) {
      setText(localStorageText);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('@markdown-app/text', text);
  }, [text]);

  function handleCopyTextToClipboard() {
    navigator.clipboard.writeText(text);

    alert('Copied!');
  }

  return (
    <div className="container">
      <ReactTooltip id="copyTip" place="bottom" effect="solid">
        Click here to copy the text!
      </ReactTooltip>

      <textarea
        placeholder="Enter here your markdown text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="input-area"
      />

      <button
        data-tip data-for="copyTip"
        className="copy-button"
        type="button"
        onClick={handleCopyTextToClipboard}
      >
        Copy
      </button>

      <ReactMarkdown
        plugins={[gfm]}
        className="markdown-container"
        children={text}
      />
    </div>
  );
}
