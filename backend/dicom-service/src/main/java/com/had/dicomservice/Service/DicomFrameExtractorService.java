package com.had.dicomservice.Service;//package com.had.dicomservice.Service;//package com.had.dicomservice.Service;//package com.had.dicomservice.Service;
//////import org.dcm4che3.data.Attributes;
//////import org.dcm4che3.data.Tag;
//////import org.dcm4che3.imageio.plugins.dcm.DicomImageReadParam;
//////import org.dcm4che3.io.DicomInputStream;
//////
//////import javax.imageio.ImageIO;
//////import java.awt.image.BufferedImage;
//////import java.io.File;
//////import java.io.IOException;
//////
//////public class DicomFrameExtractor {
//////
//////    public static void extractFrames(String filePath, String outputDirectory) throws IOException {
//////        try (DicomInputStream dis = new DicomInputStream(new File(filePath))) {
//////            Attributes attrs = dis.readDataset(-1, -1);
//////            int numberOfFrames = attrs.getInt(org.dcm4che3.data.Tag.NumberOfFrames, 1);
//////
//////            for (int i = 0; i < numberOfFrames; i++) {
//////                DicomImageReadParam param = new DicomImageReadParam();
//////                param.setWindowCenter((float) attrs.getDouble(Tag.WindowCenter, 0));
//////                param.setWindowWidth((float) attrs.getDouble(Tag.WindowWidth, 0));
//////                param.setAutoWindowing(true);
//////                param.setPresentationState(attrs);
//////                BufferedImage image = ImageIO.read(dis.createImageInputStream(i));
//////
//////                // Construct the output file path
//////                String outputFilePath = outputDirectory + File.separator + "frame_" + i + ".png";
//////
//////                // Save the image as a file
//////                File outputImageFile = new File(outputFilePath);
//////                ImageIO.write(image, "png", outputImageFile);
//////            }
//////        }
//////    }
//////
//////    public static void main(String[] args) throws IOException {
//////        String dicomFilePath = "path/to/your/dicom/file.dcm";
//////        String outputDirectory = "path/to/output/directory";
//////        extractFrames(dicomFilePath, outputDirectory);
//////    }
//////}
////
////import org.dcm4che3.data.Attributes;
////import org.dcm4che3.data.Tag;
////import org.dcm4che3.io.DicomInputStream;
////
////import javax.imageio.ImageIO;
////import java.awt.image.BufferedImage;
////import java.awt.image.DataBufferUShort;
////import java.io.File;
////import java.io.IOException;
////import java.nio.ByteBuffer;
////import java.nio.ByteOrder;
////
////public class DicomFrameExtractorService {
////
////    public static void extractFrames(String filePath, String outputDirectory) throws IOException {
////        try (DicomInputStream dis = new DicomInputStream(new File(filePath))) {
////            Attributes attrs = dis.readDataset(-1, Tag.PixelData);
////
////            int numberOfFrames = attrs.getInt(Tag.NumberOfFrames, 1);
////            int bitsAllocated = attrs.getInt(Tag.BitsAllocated, 8);
////            int rows = attrs.getInt(Tag.Rows, 1);
////            int columns = attrs.getInt(Tag.Columns, 1);
////            int bytesPerPixel = bitsAllocated / 8;
////
////            byte[] pixelData = attrs.getBytes(Tag.PixelData);
////
////            for (int i = 0; i < numberOfFrames; i++) {
////                int frameOffset = i * rows * columns * bytesPerPixel;
////
////                // Extract frame data
////                short[] framePixels = new short[rows * columns];
////                ByteBuffer byteBuffer = ByteBuffer.wrap(pixelData, frameOffset, rows * columns * bytesPerPixel);
////                byteBuffer.order(ByteOrder.LITTLE_ENDIAN); // Assuming little-endian byte order
////                for (int j = 0; j < rows * columns; j++) {
////                    if (bitsAllocated == 8) {
////                        framePixels[j] = (short) (byteBuffer.get() & 0xFF);
////                    } else if (bitsAllocated == 16) {
////                        framePixels[j] = byteBuffer.getShort();
////                    }
////                }
////
////                // Create BufferedImage from pixel array
////                BufferedImage image = new BufferedImage(columns, rows, BufferedImage.TYPE_USHORT_GRAY);
////                DataBufferUShort buffer = new DataBufferUShort(framePixels, framePixels.length);
////                image.getRaster().setDataElements(0, 0, columns, rows, buffer);
////
////                // Save the image as a file
////                String outputFilePath = outputDirectory + File.separator + "frame_" + i + ".png";
////                File outputImageFile = new File(outputFilePath);
////                ImageIO.write(image, "png", outputImageFile);
////            }
////        }
////    }
////
////
////}
//
//import org.dcm4che3.data.Attributes;
//import org.dcm4che3.data.Tag;
//import org.dcm4che3.io.DicomInputStream;
//
//import javax.imageio.ImageIO;
//import java.awt.image.BufferedImage;
//import java.io.ByteArrayInputStream;
//import java.io.File;
//import java.io.IOException;
//
//public class DicomFrameExtractorService {
//
//    public static void extractFrames(String filePath, String outputDirectory) throws IOException {
//        try (DicomInputStream dis = new DicomInputStream(new File(filePath))) {
//            Attributes attrs = dis.readDataset(-1, Tag.PixelData);
//
//            int numberOfFrames = attrs.getInt(Tag.NumberOfFrames, 1);
//            int rows = attrs.getInt(Tag.Rows, 1);
//            int columns = attrs.getInt(Tag.Columns, 1);
//            int bitsAllocated = attrs.getInt(Tag.BitsAllocated, 8);
//            int bytesPerPixel = bitsAllocated / 8;
//
//            byte[] pixelData = attrs.getBytes(Tag.PixelData);
//
//            for (int i = 0; i < numberOfFrames; i++) {
//                int frameOffset = i * rows * columns * bytesPerPixel;
//
//                // Extract frame data
//                BufferedImage image = new BufferedImage(columns, rows, BufferedImage.TYPE_USHORT_GRAY);
//                byte[] frameData = new byte[rows * columns * bytesPerPixel];
//                System.arraycopy(pixelData, frameOffset, frameData, 0, rows * columns * bytesPerPixel);
//                ByteArrayInputStream bais = new ByteArrayInputStream(frameData);
//                image = ImageIO.read(bais);
//
//                // Save the image as a file
//                String outputFilePath = outputDirectory + File.separator + "frame_" + i + ".png";
//                File outputImageFile = new File(outputFilePath);
//                ImageIO.write(image, "png", outputImageFile);
//            }
//        }
//    }
//
//}
//
