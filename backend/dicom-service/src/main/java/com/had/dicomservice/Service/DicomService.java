package com.had.dicomservice.Service;

import com.had.dicomservice.Controller.DicomController;

import org.dcm4che3.data.Attributes;
import org.dcm4che3.data.Tag;
import org.dcm4che3.io.DicomInputStream;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.image.*;
import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Random;
import java.util.UUID;

@Service
public class DicomService {
//    @Autowired
//    private DicomRepository dicomRepository;

    private static final String UPLOAD_DIR = "src/main/resources/images/";

    private static final String DICOM_UPLOAD_DIR = "C:\\Users\\sn172\\Desktop\\Projects\\GitHubProjects\\HAD-DNEXUS\\backend\\dicom-service\\src\\main\\resources\\dicom-files";

    private static final Logger logger = LoggerFactory.getLogger(DicomController.class);




    public String saveDirectories(List<MultipartFile> directories, String dirPath) {
        try {

//            Path baseDirectory = Paths.get(DICOM_UPLOAD_DIR);
            Path baseDirectory = Paths.get(dirPath);
            logger.info("Base directory name: {}", baseDirectory.getFileName());

            // Check if the base directory exists, if not, create it
            if (!Files.exists(baseDirectory)) {
                Files.createDirectories(baseDirectory);
                logger.info("Base directory created: {}", baseDirectory);
            }

//            Path uploadDirectory = Paths.get(dirPath);
//            logger.info("Upload directory: {}", uploadDirectory);
//
//            if (!Files.exists(uploadDirectory)) {
//                Files.createDirectories(uploadDirectory);
//                logger.info("Upload directory created: {}", uploadDirectory);
//            }

            // Create the directory specified by dirPath inside baseDirectory
//            Path uniqueUploadDirectory = Paths.get(baseDirectory.toString(), dirPath);
//            logger.info("Upload directory name: {}", uniqueUploadDirectory.getFileName());

            // Create the directory structure up to the last folder name
//            if (!Files.exists(uniqueUploadDirectory)) {
//                Files.createDirectories(uniqueUploadDirectory);
//                logger.info("Upload directory created: {}", uniqueUploadDirectory);
//            }

            for (MultipartFile directory : directories) {
                // Get the parent directory of the uploaded file
                Path uploadDirectory = Paths.get(baseDirectory.toString(), directory.getOriginalFilename()).getParent();
                logger.info("Upload directory name: {}", uploadDirectory.getFileName());

                // Create the directory structure up to the last folder name
                if (uploadDirectory != null) {
                    Files.createDirectories(uploadDirectory);
                    logger.info("Upload directory created: {}", uploadDirectory);
                } else {
                    logger.error("Error: Could not determine the upload directory for file: {}", directory.getOriginalFilename());
                    continue; // Skip to the next file
                }

                String originalFilename = directory.getOriginalFilename();
                logger.info("Original filename: {}", originalFilename);

                // Extract just the file name without the directory structure
                Path originalPath = Paths.get(originalFilename);
                String fileName = originalPath.getFileName().toString();
                logger.info("Extracted filename: {}", fileName);

                // Create the path to save the file
                Path filePath = Paths.get(uploadDirectory.toString(), fileName);
                logger.info("Final file path: {}", filePath);

                directory.transferTo(filePath.toFile());
                logger.info("File saved successfully: {}", filePath);
            }

            return "Directories saved successfully!";
        } catch (IOException e) {
            logger.error("Error saving directories: {}", e.getMessage(), e);
            return "Error saving directories: " + e.getMessage();
        }
    }







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

    public void extractFrames(String filePath, String outputDirectory) throws IOException {
        try (DicomInputStream dis = new DicomInputStream(new File(filePath))) {
            Attributes attrs = dis.readDataset();

            int numberOfFrames = attrs.getInt(Tag.NumberOfFrames, 1);
            int rows = attrs.getInt(Tag.Rows, 1);
            int columns = attrs.getInt(Tag.Columns, 1);
            int bitsAllocated = attrs.getInt(Tag.BitsAllocated, 8);
            int bytesPerPixel = bitsAllocated / 8;

            byte[] pixelData = attrs.getBytes(Tag.PixelData);

            for (int i = 0; i < numberOfFrames; i++) {
                int frameOffset = i * rows * columns * bytesPerPixel;

                // Extract frame data
                BufferedImage image = new BufferedImage(columns, rows, BufferedImage.TYPE_USHORT_GRAY);
                byte[] frameData = new byte[rows * columns * bytesPerPixel];
                System.arraycopy(pixelData, frameOffset, frameData, 0, rows * columns * bytesPerPixel);
                ByteArrayInputStream bais = new ByteArrayInputStream(frameData);
                image = ImageIO.read(bais);

                // Save the image as a file
                String outputFilePath = outputDirectory + File.separator + "frame_" + i + ".png";
                File outputImageFile = new File(outputFilePath);
                ImageIO.write(image, "png", outputImageFile);
            }
        }
    }

    public String saveImage(MultipartFile file) throws IOException {
        if (file.isEmpty()) {
            throw new IllegalArgumentException("File is empty");
        }

        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
        String fileExtension = fileName.substring(fileName.lastIndexOf("."));
        String newFileName = UUID.randomUUID().toString() + fileExtension;

        File uploadDir = new File(UPLOAD_DIR);
        if (!uploadDir.exists()) {
            uploadDir.mkdirs();
        }

        File destFile = new File(uploadDir.getAbsolutePath() + File.separator + newFileName);
        try (FileOutputStream fos = new FileOutputStream(destFile)) {
            fos.write(file.getBytes());
        } catch (IOException e) {
            throw new IOException("Failed to save file", e);
        }

        return newFileName;
    }

    public String saveAnnotationJson(String measurementJson) throws IOException {

        String folderPath = "src/main/resources/annotations"; // Assuming "annotations" folder is directly inside resources
        String fileName = generateRandomId(8) + ".json";
        String filePath = folderPath + "/" + fileName;

        try (FileWriter fileWriter = new FileWriter(filePath)) {
            fileWriter.write(measurementJson);
        }
        return fileName;
    }

    private String generateRandomId(int length) {
        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        StringBuilder randomId = new StringBuilder();

        Random random = new Random();
        for (int i = 0; i < length; i++) {
            randomId.append(characters.charAt(random.nextInt(characters.length())));
        }

        return randomId.toString();
    }
}
