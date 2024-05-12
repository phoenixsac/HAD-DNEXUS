package com.had.dicomservice.Controller;

import com.had.dicomservice.Dto.AnnotatedEntity;
import com.had.dicomservice.Dto.DicomMetadataRequestBody;
import com.had.dicomservice.Dto.SaveDicomRequestBody;
//import com.had.dicomservice.Service.DicomFrameExtractorService;
import com.had.dicomservice.Entity.ConsultationDicom;
import com.had.dicomservice.Repository.ConsultationDicomRepository;
import com.had.dicomservice.Service.DicomService;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.ResourceUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;
import org.json.JSONObject;


import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.concurrent.*;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;

@RestController
@RequestMapping("/dicom")
public class DicomController {
    @Autowired
    private DicomService dicomService;

    @Autowired
    private ConsultationDicomRepository consultationDicomRepository;

    @Autowired
    private  ResourceLoader resourceLoader;

    private String URL = "http://localhost:9191/";

    public String DICOM_FILE_STORE_PATH = "C:/Users/sn172/Desktop/Projects/GitHubProjects/HAD-DNEXUS/backend/dicom-service/src/main/resources/dicom-files";







    private static final Logger logger = LoggerFactory.getLogger(DicomController.class);
    private static final String BASE_URL = "dicomweb:http://localhost:8080";

    private static final String DICOM_FOLDER_PATH = "C:/Users/sn172/Desktop/Projects/GitHubProjects/dic2/dicom-service/src/main/resources/dicom-files/LIDC-IDRI-0001/01-01-2000-30178/3000566.000000-03192/"; // Change this to the actual path of your DICOM files


    public String STUDY_FOLDER_PATH = "C:/Users/sn172/Desktop/Projects/GitHubProjects/HAD-DNEXUS/backend/dicom-service/src/main/resources/dicom-files/";
    public String DICOM_SERVER_URL = "http://localhost:9191/dicom-files/";
    public String OUT_JSON_PATH = "C:/Users/sn172/Desktop/Projects/GitHubProjects/HAD-DNEXUS/backend/dicom-service/src/main/resources/dicom-json/";


    @PostMapping("/upload")
    public ResponseEntity<String> uploadDirectory(@RequestParam("directory") List<MultipartFile> directories,@RequestParam("consultationId") String consultationId,
                                                  @RequestParam("remarks") String remarks) throws InterruptedException, ExecutionException {

        String directoryUid = generateUid(8);

        // Create a directory with the generated UID
        String directoryPath = createDirectory(directoryUid, DICOM_FILE_STORE_PATH);
        logger.info("Directory uid created: ",directoryPath);

        // Store consultationId, remarks, and generated UID in the consultation_dicom table
        ConsultationDicom consultationDicom = new ConsultationDicom();
        consultationDicom.setConsultationId(Long.valueOf(consultationId));
        consultationDicom.setRemarks(remarks);
        consultationDicom.setDicomFileUid(directoryUid);
        ConsultationDicom newConsultationDicom = consultationDicomRepository.save(consultationDicom);
        logger.info("ConsultationDicom : ",consultationDicom.getConsultationId(),consultationDicom.getDicomFileUid());
        logger.info("New ConsultationDicom : ",newConsultationDicom.getConsultationId(),newConsultationDicom.getDicomFileUid());

        logger.info("Directories are being saved and DICOM metadata extraction process is scheduled.");

        CompletableFuture<Void> saveDirectoriesFuture = CompletableFuture.runAsync(() -> {
            dicomService.saveDirectories(directories, directoryPath);
        });

        try {
            saveDirectoriesFuture.get();
        } catch (ExecutionException e) {
            Throwable cause = e.getCause();
            logger.error("Error saving directories: {}", cause.getMessage());
            return ResponseEntity.internalServerError().body("Error saving directories: " + cause.getMessage());
        }

        Runnable triggerScriptTask = () -> {
            try {
                String studyFolderPath = STUDY_FOLDER_PATH + directoryUid;
                logger.info("Study Folder Path: {}", studyFolderPath);

                String dicomServerUrl = DICOM_SERVER_URL + directoryUid + "/";
                logger.info("DICOM Server URL: {}", dicomServerUrl);


                String outputJsonFilePath = OUT_JSON_PATH + directoryUid + ".json";
                logger.info("Output JSON File Path: {}", outputJsonFilePath);

                DicomMetadataRequestBody metadataRequestBody = new DicomMetadataRequestBody(studyFolderPath, dicomServerUrl, outputJsonFilePath);

                RestTemplate restTemplate = new RestTemplate();
                restTemplate.postForObject("http://localhost:5003/api/execute-script", metadataRequestBody, String.class);
            } catch (Exception e) {
                logger.error("Error triggering script: {}", e.getMessage());
                e.printStackTrace();
            }
        };

        new Thread(() -> {
            try {
                Thread.sleep(20000);
                triggerScriptTask.run();
            } catch (InterruptedException e) {
                logger.error("Thread interrupted: {}", e.getMessage());
                e.printStackTrace();
            }
        }).start();

        return ResponseEntity.ok("Directories are being saved and DICOM metadata extraction process is scheduled.");

    }


    private String generateUid(int length) {
        String uid = UUID.randomUUID().toString().replace("-", "").substring(0, length);
        return uid;
    }


    private String createDirectory(String directoryUid, String baseDir) {
        // Get the base directory from the method parameter
        String baseDirectory = baseDir;
        // Replace any backslashes with forward slashes to ensure consistency
        baseDirectory = baseDirectory.replace("\\", "/");
        // Concatenate the directoryUid to the base directory using File.separator for platform independence
        String directoryPath = baseDirectory + "/" + directoryUid;
        // Replace any backslashes with forward slashes in the resulting path
        directoryPath = directoryPath.replace("\\", "/");
        // Create a Path object from the directoryPath
        Path path = Paths.get(directoryPath);
        try {
            // Create directories recursively if they don't exist
            Files.createDirectories(path);
        } catch (IOException e) {
            e.printStackTrace();
        }
        // Return the path of the created directory
        return directoryPath;
    }




    @GetMapping("/dicom/{filename}")
    public ResponseEntity<byte[]> getDicomFile(@PathVariable String filename) throws IOException {
        // Construct the full path to the DICOM file
        String fullPath = DICOM_FOLDER_PATH + filename;
        Path filePath = Paths.get(fullPath);

        if (!Files.exists(filePath)) {
            return ResponseEntity.notFound().build(); // Return 404 if file not found
        }

        // Read the DICOM file
        byte[] data = Files.readAllBytes(filePath);

        // Determine media type based on file extension
        MediaType mediaType = MediaType.parseMediaType("application/dicom");

        return ResponseEntity.ok()
                .contentType(mediaType)
                .body(data);
    }


//    @PostMapping("/dicom/img-upload")
//    public ResponseEntity<String> uploadImage(@RequestParam("file") MultipartFile file, @RequestBody AnnotatedEntity annotatedEntity) {
//        try {
//            // Log user details
//            logger.info("Annotated Entity Type: {}", annotatedEntity.getUserType());
//            logger.info("Actor ID: {}", annotatedEntity.getActorId());
//
//            String fileName = dicomService.saveImage(file);
//            return ResponseEntity.ok().body("Image uploaded successfully. File name: " + fileName);
//        } catch (Exception e) {
//            logger.error("Failed to upload image", e);
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload image: " + e.getMessage());
//        }
//    }

    @PostMapping("/dicom/img-upload")
    public ResponseEntity<String> uploadImage(@RequestParam("file") MultipartFile file) {
        try {
            String fileName = dicomService.saveImage(file);
            return ResponseEntity.ok().body("Image uploaded successfully. File name: " + fileName);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload image: " + e.getMessage());
        }
    }

//    @PostMapping("/dicom/save-annotation-json")
//    public ResponseEntity<String> saveAnnotationJson(@RequestBody String measurementJson) {
//        try {
//            dicomService.saveAnnotationJson(measurementJson);
//            return ResponseEntity.ok("Annotation JSON saved successfully");
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to save Annotation JSON");
//        }
//    }

//    @GetMapping("/dicom/get-measurement")
//    public String getSampleJson() {
//        try {
//            // Load the sample JSON file
//            String content = new String(Files.readAllBytes(Paths.get(ResourceUtils.getFile("classpath:annotations/data.json").toURI())));
//
//            // Parse JSON string to JSONObject
//            JSONObject jsonObject = new JSONObject(content);
//
//            // Return JSON string
//            return jsonObject.toString();
//        } catch (Exception e) {
//            e.printStackTrace();
//            return "Error occurred while processing the request";
//        }
//    }

    @GetMapping("/dicom/images")
    public ResponseEntity<List<Resource>> getAllImages() {
        try {
            List<Resource> imageResources = new ArrayList<>();

            // Load the directory containing images
            Resource directoryResource = resourceLoader.getResource("classpath:/images/");

            // Check if the directory exists
            if (!directoryResource.exists() || !directoryResource.getFile().isDirectory()) {
                return ResponseEntity.notFound().build();
            }

            // Iterate over files in the directory and add image resources to the list
            File[] files = directoryResource.getFile().listFiles();
            if (files != null) {
                for (File file : files) {
                    if (file.isFile()) {
                        Resource imageResource = resourceLoader.getResource("classpath:/images/" + file.getName());
                        imageResources.add(imageResource);
                    }
                }
            }

            // Return the list of image resources
            return ResponseEntity.ok()
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(imageResources);
        } catch (Exception e) {
            // Handle any errors
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}





