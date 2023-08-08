import { getQRUrl } from 'shared/utils';
import QRCode from 'qrcode';

export const generateQRImage = async (QRToken) => await QRCode.toDataURL(getQRUrl(QRToken));
