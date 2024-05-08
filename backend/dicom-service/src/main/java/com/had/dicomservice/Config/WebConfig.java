package com.had.dicomservice.Config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/dicom-files/**")
                .addResourceLocations("classpath:/dicom-files/");

        registry.addResourceHandler("/dicom-json/**")
                .addResourceLocations("classpath:/dicom-json/");
    }
}
