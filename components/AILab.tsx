import React, { useState } from 'react';
import { Image as ImageIcon, Video, Wand2, Lock } from 'lucide-react';
import { ensureApiKey, generateImage, generateVideo, editImage } from '../services/geminiService';
import { ImageSize } from '../types';

enum AITool {
  GENERATOR = 'generator',
  VIDEO = 'video',
  EDITOR = 'editor'
}

export default function AILab() {
  const [activeTool, setActiveTool] = useState<AITool>(AITool.GENERATOR);
  const [apiKeyReady, setApiKeyReady] = useState(false);

  const checkKey = async () => {
    try {
      const ready = await ensureApiKey();
      setApiKeyReady(ready);
      return ready;
    } catch (e) {
      console.error("API Key selection failed", e);
      return false;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-4">
          Abdullah's AI Laboratory
        </h1>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Explore the cutting edge of Generative AI. Create stunning images, animate them into videos, or edit existing photos using Google's latest Gemini models.
        </p>
      </div>

      {/* Tool Selector */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        <button
          onClick={() => setActiveTool(AITool.GENERATOR)}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all transform hover:scale-105 ${
            activeTool === AITool.GENERATOR
              ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/30'
              : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
          }`}
        >
          <ImageIcon className="w-5 h-5" />
          <span>Imagine (Pro)</span>
        </button>
        <button
          onClick={() => setActiveTool(AITool.VIDEO)}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all transform hover:scale-105 ${
            activeTool === AITool.VIDEO
              ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg shadow-purple-500/30'
              : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
          }`}
        >
          <Video className="w-5 h-5" />
          <span>Veo Video</span>
        </button>
        <button
          onClick={() => setActiveTool(AITool.EDITOR)}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all transform hover:scale-105 ${
            activeTool === AITool.EDITOR
              ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-orange-500/30'
              : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
          }`}
        >
          <Wand2 className="w-5 h-5" />
          <span>Magic Edit</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden min-h-[500px]">
        {!apiKeyReady ? (
           <div className="h-full flex flex-col items-center justify-center py-20 px-4">
             <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-6">
                <Lock className="w-8 h-8 text-slate-400" />
             </div>
             <h2 className="text-2xl font-bold text-slate-800 mb-2">Access Required</h2>
             <p className="text-slate-500 mb-8 text-center max-w-md">
               To use these advanced AI models (Veo & Gemini Pro), you need to connect your Google AI Studio API key.
             </p>
             <button 
                onClick={checkKey}
                className="px-8 py-3 bg-slate-900 text-white rounded-lg font-semibold hover:bg-slate-800 transition-colors shadow-lg hover:shadow-xl"
             >
               Connect API Key
             </button>
             <p className="mt-4 text-xs text-slate-400">
               <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noopener noreferrer" className="underline hover:text-slate-600">
                 Learn more about billing
               </a>
             </p>
           </div>
        ) : (
          <div className="p-6 md:p-10">
            {activeTool === AITool.GENERATOR && <ImageGenerator />}
            {activeTool === AITool.VIDEO && <VideoGenerator />}
            {activeTool === AITool.EDITOR && <ImageEditor />}
          </div>
        )}
      </div>
    </div>
  );
}

function ImageGenerator() {
  const [prompt, setPrompt] = useState('');
  const [size, setSize] = useState<ImageSize>('1K');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt) return;
    setLoading(true);
    setError(null);
    try {
      const img = await generateImage(prompt, size);
      setResult(img);
    } catch (e: any) {
      setError(e.message || "Generation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
      <div className="space-y-6">
        <div>
          <h3 className="text-2xl font-bold text-slate-800 mb-2">Nano Banana Pro Generator</h3>
          <p className="text-slate-500">Generate high-fidelity images using Gemini 3 Pro.</p>
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-700">Prompt</label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="A futuristic city made of crystal..."
            className="w-full h-32 p-4 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-700">Resolution</label>
          <div className="flex gap-4">
            {(['1K', '2K', '4K'] as ImageSize[]).map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                className={`flex-1 py-2 rounded-lg border text-sm font-medium transition-all ${
                  size === s 
                    ? 'border-blue-500 bg-blue-50 text-blue-700' 
                    : 'border-slate-200 text-slate-600 hover:border-slate-300'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleGenerate}
          disabled={loading || !prompt}
          className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex justify-center items-center gap-2"
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <ImageIcon className="w-5 h-5" />
              Generate Image
            </>
          )}
        </button>
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>

      <div className="bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-center min-h-[400px]">
        {result ? (
          <img src={result} alt="Generated" className="max-w-full max-h-[500px] rounded-lg shadow-lg" />
        ) : (
          <div className="text-center text-slate-400">
            <ImageIcon className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>Your creation will appear here</p>
          </div>
        )}
      </div>
    </div>
  );
}

function VideoGenerator() {
  const [image, setImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [ratio, setRatio] = useState<'16:9' | '9:16'>('16:9');
  const [loading, setLoading] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = async () => {
    if (!image) return;
    setLoading(true);
    setError(null);
    try {
      const url = await generateVideo(image, prompt, ratio);
      setVideoUrl(url);
    } catch (e: any) {
      setError(e.message || "Video generation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
      <div className="space-y-6">
        <div>
          <h3 className="text-2xl font-bold text-slate-800 mb-2">Veo Animate</h3>
          <p className="text-slate-500">Bring your images to life with Veo 3.1 video generation.</p>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-700">Source Image</label>
          <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:bg-slate-50 transition-colors cursor-pointer relative">
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            {image ? (
              <img src={image} alt="Source" className="max-h-32 mx-auto rounded shadow-sm" />
            ) : (
              <div className="text-slate-500">
                <p className="font-medium">Click to upload an image</p>
                <p className="text-xs mt-1">PNG, JPG up to 5MB</p>
              </div>
            )}
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-700">Prompt (Optional)</label>
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe the motion (e.g., 'Panning shot', 'Water flowing')"
            className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-700">Aspect Ratio</label>
          <div className="flex gap-4">
            <button
              onClick={() => setRatio('16:9')}
              className={`flex-1 py-2 rounded-lg border text-sm font-medium transition-all ${
                ratio === '16:9' ? 'border-purple-500 bg-purple-50 text-purple-700' : 'border-slate-200'
              }`}
            >
              Landscape (16:9)
            </button>
            <button
              onClick={() => setRatio('9:16')}
              className={`flex-1 py-2 rounded-lg border text-sm font-medium transition-all ${
                ratio === '9:16' ? 'border-purple-500 bg-purple-50 text-purple-700' : 'border-slate-200'
              }`}
            >
              Portrait (9:16)
            </button>
          </div>
        </div>

        <button
          onClick={handleGenerate}
          disabled={loading || !image}
          className="w-full py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex justify-center items-center gap-2"
        >
          {loading ? (
             <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Generating Video...
            </>
          ) : (
             <>
              <Video className="w-5 h-5" />
              Generate Video
            </>
          )}
        </button>
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>

      <div className="bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-center min-h-[400px]">
        {videoUrl ? (
          <video src={videoUrl} controls autoPlay loop className="max-w-full max-h-[500px] rounded-lg shadow-lg" />
        ) : (
          <div className="text-center text-slate-400">
            <Video className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>Your video will appear here</p>
            {loading && <p className="text-sm mt-2 text-purple-500 animate-pulse">This may take a few minutes...</p>}
          </div>
        )}
      </div>
    </div>
  );
}

function ImageEditor() {
  const [image, setImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = async () => {
    if (!image || !prompt) return;
    setLoading(true);
    setError(null);
    try {
      const img = await editImage(image, prompt);
      setResult(img);
    } catch (e: any) {
      setError(e.message || "Editing failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
      <div className="space-y-6">
        <div>
          <h3 className="text-2xl font-bold text-slate-800 mb-2">Magic Editor</h3>
          <p className="text-slate-500">Edit images with natural language instructions using Gemini Flash.</p>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-700">Source Image</label>
          <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:bg-slate-50 transition-colors cursor-pointer relative">
             <input 
              type="file" 
              accept="image/*" 
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            {image ? (
              <img src={image} alt="Source" className="max-h-32 mx-auto rounded shadow-sm" />
            ) : (
              <div className="text-slate-500">
                <p className="font-medium">Click to upload an image</p>
                <p className="text-xs mt-1">PNG, JPG up to 5MB</p>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-700">Instruction</label>
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., 'Add a red hat', 'Make it a sketch'"
            className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          />
        </div>

        <button
          onClick={handleGenerate}
          disabled={loading || !image || !prompt}
          className="w-full py-3 bg-amber-600 text-white rounded-lg font-semibold hover:bg-amber-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex justify-center items-center gap-2"
        >
          {loading ? (
             <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Editing...
            </>
          ) : (
             <>
              <Wand2 className="w-5 h-5" />
              Apply Magic
            </>
          )}
        </button>
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>

      <div className="bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-center min-h-[400px]">
        {result ? (
          <img src={result} alt="Edited" className="max-w-full max-h-[500px] rounded-lg shadow-lg" />
        ) : (
          <div className="text-center text-slate-400">
            <Wand2 className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>Edited image will appear here</p>
          </div>
        )}
      </div>
    </div>
  );
}
