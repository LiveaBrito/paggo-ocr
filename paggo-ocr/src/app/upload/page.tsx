'use client';

import { useState } from 'react';

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] ?? null;
    setFile(selectedFile);

    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleUpload = async () => {
    console.log('clicado');
    if (!file) {
      console.log('Nenhum arquivo selecionado');
      return;
    }
  
    const formData = new FormData();
    formData.append('file', file);
  
    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
  
      const data = await res.json();
      console.log('Resposta da API:', data);
  
      if (res.ok) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch (err) {
      console.error('Erro na requisição:', err);
      setStatus('error');
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-3xl font-semibold mb-4 text-blue-800">Upload de Documento</h1>

      <input
        type="file"
        accept="image/*,.pdf"
        onChange={handleFileChange}
        className="mb-4 block w-full py-3 px-4 border border-gray-300 rounded-md bg-blue-100 text-blue-800 hover:bg-blue-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />

      {preview && (
        <div className="mb-4">
          <h2 className="text-lg font-medium mb-2 text-blue-700">Pré-visualização:</h2>
          <img src={preview} alt="Preview" className="max-w-full h-auto rounded border" />
        </div>
      )}

      <button
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50 focus:ring-2 focus:ring-blue-500"
        onClick={handleUpload}
        disabled={status === 'uploading' || !file}
      >
        {status === 'uploading' ? 'Enviando...' : 'Enviar Documento'}
      </button>

      {status === 'success' && (
        <p className="text-green-600 mt-4">Upload feito com sucesso!</p>
      )}
      {status === 'error' && (
        <p className="text-orange-600 mt-4">Erro no envio do arquivo.</p>
      )}
    </div>
  );
}
