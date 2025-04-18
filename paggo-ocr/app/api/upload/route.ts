import { NextResponse } from 'next/server';
import fs from 'fs/promises';

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get('file');

  if (!file || typeof file === 'string') {
    return NextResponse.json({ success: false, message: 'Arquivo inválido' }, { status: 400 });
  }

  // Aqui você poderia salvar no disco, S3, ou processar via OCR, etc.
  console.log('Arquivo recebido:', (file as Blob).type, (file as File).name);

  return NextResponse.json({ success: true, message: 'Arquivo recebido com sucesso!' });
}



