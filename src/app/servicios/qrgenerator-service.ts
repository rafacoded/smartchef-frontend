import { Injectable } from '@angular/core';
import QRCode from 'qrcode';

@Injectable({ providedIn: 'root' })
export class QrGeneratorService {
  async toDataUrl(text: string): Promise<string> {
    return QRCode.toDataURL(text, { errorCorrectionLevel: 'M', margin: 1, width: 260 });
  }

}
