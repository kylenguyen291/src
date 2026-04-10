import Quartz
import CoreFoundation
import os
import sys

def pdf_to_images(pdf_url, out_dir):
    url = CoreFoundation.CFURLCreateFromFileSystemRepresentation(None, pdf_url.encode('utf-8'), len(pdf_url), False)
    doc = Quartz.CGPDFDocumentCreateWithURL(url)
    pages = Quartz.CGPDFDocumentGetNumberOfPages(doc)
    os.makedirs(out_dir, exist_ok=True)
    for i in range(1, pages + 1):
        page = Quartz.CGPDFDocumentGetPage(doc, i)
        rect = Quartz.CGPDFPageGetBoxRect(page, Quartz.kCGPDFMediaBox)
        width, height = int(Quartz.CGRectGetWidth(rect)), int(Quartz.CGRectGetHeight(rect))
        url_out = CoreFoundation.CFURLCreateFromFileSystemRepresentation(None, f"{out_dir}/slide_{i}.png".encode('utf-8'), len(f"{out_dir}/slide_{i}.png"), False)
        dest = Quartz.CGImageDestinationCreateWithURL(url_out, 'public.png', 1, None)
        colorSpace = Quartz.CGColorSpaceCreateDeviceRGB()
        # kCGImageAlphaPremultipliedLast = 1
        context = Quartz.CGBitmapContextCreate(None, width, height, 8, width * 4, colorSpace, 1)
        Quartz.CGContextSetRGBFillColor(context, 1, 1, 1, 1)
        Quartz.CGContextFillRect(context, rect)
        Quartz.CGContextDrawPDFPage(context, page)
        image = Quartz.CGBitmapContextCreateImage(context)
        Quartz.CGImageDestinationAddImage(dest, image, None)
        Quartz.CGImageDestinationFinalize(dest)
        print(f"Exported page {i}")

pdf_to_images("/Users/kylenguyen291/Work/portfolio/src/apps/web/lib/public/Project 1.pdf", "/Users/kylenguyen291/Work/portfolio/src/apps/web/public/images/slides")
