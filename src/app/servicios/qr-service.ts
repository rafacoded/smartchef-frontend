import { Injectable } from '@angular/core';
import { Html5Qrcode } from 'html5-qrcode';

@Injectable({ providedIn: 'root' })
export class QrService {

  private scanner?: Html5Qrcode;

  async escanearQR(elementId: string): Promise<string> {

    this.scanner = new Html5Qrcode(elementId);

    const cameras = await Html5Qrcode.getCameras();
    if (!cameras?.length) throw new Error('No hay cámara disponible');

    const cameraId = cameras[0].id;

    return new Promise<string>(async (resolve, reject) => {
      try {
        await this.scanner!.start(
          cameraId,
          { fps: 10, qrbox: 250 },
          async (decodedText) => {
            await this.stop();
            resolve(decodedText);
          },
          () => {}
        );
      } catch (e) {
        reject(e);
      }
    });
  }

  async stop() {
    if (!this.scanner) return;
    try {
      await this.scanner.stop();
      await this.scanner.clear();
    } finally {
      this.scanner = undefined;
    }
  }
}
