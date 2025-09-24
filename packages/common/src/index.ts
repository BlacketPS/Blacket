import sharp from 'sharp';
import * as fs from 'fs';
import * as path from 'path';

export async function blookifyImage(imageBuffer: Buffer): Promise<Buffer> {
    const BLOOK_MASK_IMAGE_PATH = path.resolve(__dirname, './assets/blook-mask.png');
    const BLOOK_OVERLAY_IMAGE_PATH = path.resolve(__dirname, './assets/blook-overlay.png');

    const BLOOK_MASK_IMAGE = await fs.promises.readFile(BLOOK_MASK_IMAGE_PATH);
    const BLOOK_OVERLAY_IMAGE = await fs.promises.readFile(BLOOK_OVERLAY_IMAGE_PATH);

    const mask = await sharp(BLOOK_MASK_IMAGE)
        .png()
        .toBuffer();

    const overlay = await sharp(BLOOK_OVERLAY_IMAGE)
        .png()
        .toBuffer();

    const image = await sharp(imageBuffer)
        .ensureAlpha()
        .flatten({ background: { r: 255, g: 255, b: 255 } })
        .resize(300, 300, { fit: 'fill' })
        .png()
        .toBuffer();

    const compositeImage = await sharp({
        create: {
            width: 300,
            height: 345,
            channels: 4,
            background: { r: 0, g: 0, b: 0, alpha: 0 }
        }
    })
        .composite([{ input: image, top: 45, left: 0 }])
        .png()
        .toBuffer();

    const maskedImage = await sharp(compositeImage)
        .composite([{ input: mask, blend: 'dest-out' }])
        .png()
        .toBuffer();

    return await sharp(maskedImage)
        .composite([{ input: overlay, blend: 'multiply' }])
        .webp({ quality: 90 })
        .toBuffer();
}

export async function bannerifyImage(imageBuffer: Buffer): Promise<Buffer> {
    const BANNER_MASK_IMAGE_PATH = path.resolve(__dirname, './assets/banner-mask.png');
    const BANNER_OVERLAY_IMAGE_PATH = path.resolve(__dirname, './assets/banner-overlay.png');

    const BANNER_MASK_IMAGE = await fs.promises.readFile(BANNER_MASK_IMAGE_PATH);
    const BANNER_OVERLAY_IMAGE = await fs.promises.readFile(BANNER_OVERLAY_IMAGE_PATH);

    const mask = await sharp(BANNER_MASK_IMAGE)
        .png()
        .toBuffer();

    const overlay = await sharp(BANNER_OVERLAY_IMAGE)
        .png()
        .toBuffer();

    const image = await sharp(imageBuffer)
        .ensureAlpha()
        .flatten({ background: { r: 255, g: 255, b: 255 } })
        .resize(700, 155, { fit: 'fill' })
        .png()
        .toBuffer();

    const maskedImage = await sharp(image)
        .composite([{ input: mask, blend: 'dest-out' }])
        .png()
        .toBuffer();

    return await sharp(maskedImage)
        .composite([{ input: overlay, blend: 'multiply' }])
        .webp({ quality: 90 })
        .toBuffer();
}
