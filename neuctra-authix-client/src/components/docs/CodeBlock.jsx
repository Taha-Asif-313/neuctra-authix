import React, { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { nightOwl } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Copy, Check, Zap, Code, FileCode } from "lucide-react";

const CodeBlock = ({ 
  code, 
  language = "javascript", 
  showLineNumbers = true,
  className = "",
  tabs = null, // Array of { name: string, code: string, language: string }
  activeTab: externalActiveTab,
  onTabChange
}) => {
  const [copied, setCopied] = useState(false);
  const [internalActiveTab, setInternalActiveTab] = useState(0);

  // Use external tab control if provided, otherwise internal state
  const activeTab = externalActiveTab !== undefined ? externalActiveTab : internalActiveTab;
  
  const setActiveTab = (index) => {
    if (onTabChange) {
      onTabChange(index);
    } else {
      setInternalActiveTab(index);
    }
  };

  const currentCode = tabs ? tabs[activeTab]?.code : code;
  const currentLanguage = tabs ? tabs[activeTab]?.language : language;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(currentCode.trim());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const getLanguageIcon = (lang) => {
    const icons = {
      javascript: "JS",
      typescript: "TS",
      react: "⚛️",
      vue: "🟢",
      python: "🐍",
      html: "🌐",
      css: "🎨",
      shell: "💻",
      json: "📋"
    };
    return icons[lang] || "📄";
  };

  return (
    <div className={`relative group rounded-xl overflow-hidden border border-gray-800 bg-gray-900/50 backdrop-blur-sm ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between bg-gradient-to-r from-gray-900 to-gray-800 border-b border-gray-800">
        {/* Tabs or Language Display */}
        <div className="flex items-center min-w-0 flex-1">
          <div className="flex gap-1.5 px-4 py-3 border-r border-gray-800">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          
          {tabs ? (
            <div className="flex space-x-1 px-2">
              {tabs.map((tab, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={`flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    activeTab === index
                      ? "bg-[#00c420]/10 text-[#00c420] border border-[#00c420]/20"
                      : "text-gray-400 hover:text-gray-300 hover:bg-gray-800/50"
                  }`}
                >
                  <FileCode size={14} />
                  {tab.name}
                </button>
              ))}
            </div>
          ) : (
            <div className="flex items-center gap-2 px-4 py-3">
              <Code size={16} className="text-[#00c420]" />
              <span className="text-sm font-medium text-gray-400">
                {getLanguageIcon(currentLanguage)} {currentLanguage.toUpperCase()}
              </span>
            </div>
          )}
        </div>
        
        {/* Copy Button */}
        <div className="flex items-center gap-2 px-4 py-3 border-l border-gray-800">
          <Zap size={14} className="text-[#00c420]" />
          <button
            onClick={copyToClipboard}
            className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg bg-gray-800 hover:bg-gray-700 border border-gray-700 text-gray-300 hover:text-white transition-all duration-200 group/copy"
          >
            {copied ? (
              <>
                <Check size={14} className="text-[#00c420]" />
                <span className="text-[#00c420]">Copied!</span>
              </>
            ) : (
              <>
                <Copy size={14} />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Code Content */}
      <div className="relative">
        <SyntaxHighlighter
          language={currentLanguage}
          style={nightOwl}
          showLineNumbers={showLineNumbers}
          wrapLines={true}
          customStyle={{
            margin: 0,
            padding: "20px 16px",
            fontSize: "14px",
            lineHeight: "1.5",
            background: "transparent",
            border: "none",
          }}
          lineNumberStyle={{
            minWidth: "3em",
            paddingRight: "1em",
            textAlign: "right",
            color: "#6B7280",
            userSelect: "none",
          }}
          codeTagProps={{
            style: {
              fontFamily: '"Fira Code", "Monaco", "Cascadia Code", monospace',
              fontWeight: 400,
            }
          }}
        >
          {currentCode.trim()}
        </SyntaxHighlighter>

        {/* Gradient overlay for modern effect */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-transparent via-transparent to-gray-900/20 opacity-50"></div>
      </div>

      {/* Hover effect */}
      <div className="absolute inset-0 pointer-events-none border-2 border-transparent group-hover:border-[#00c420]/20 rounded-xl transition-all duration-300"></div>
    </div>
  );
};

// Usage Examples:

// 1. Basic single code block
// <CodeBlock code={jsCode} language="javascript" />

// 2. With React/Vue tabs
// <CodeBlock 
//   tabs={[
//     { name: "React", code: reactCode, language: "jsx" },
//     { name: "Vue", code: vueCode, language: "vue" }
//   ]}
// />

// 3. Controlled component with external state
// const [activeTab, setActiveTab] = useState(0);
// <CodeBlock 
//   tabs={tabsConfig}
//   activeTab={activeTab}
//   onTabChange={setActiveTab}
// />

export default CodeBlock;