package com.housing.config;

import org.glassfish.jersey.server.ResourceConfig;
import javax.ws.rs.ApplicationPath;

@ApplicationPath("/api")
public class JerseyConfig extends ResourceConfig {
    public JerseyConfig() {
        packages("com.housing.resources");
        
        // Register Jackson for JSON processing
        register(org.glassfish.jersey.jackson.JacksonFeature.class);
        
        // Enable CORS
        register(new CORSFilter());
        
        // Enable all HTTP methods
        property("jersey.config.server.provider.classnames", 
                "org.glassfish.jersey.jackson.JacksonFeature");
    }
}

class CORSFilter implements javax.ws.rs.container.ContainerResponseFilter {
    @Override
    public void filter(javax.ws.rs.container.ContainerRequestContext requestContext,
                      javax.ws.rs.container.ContainerResponseContext responseContext) {
        responseContext.getHeaders().add("Access-Control-Allow-Origin", "http://localhost:5174");
        responseContext.getHeaders().add("Access-Control-Allow-Headers", 
            "Origin, Content-Type, Accept, Authorization, X-Requested-With");
        responseContext.getHeaders().add("Access-Control-Allow-Methods", 
            "GET, POST, PUT, DELETE, OPTIONS, HEAD");
        responseContext.getHeaders().add("Access-Control-Allow-Credentials", "true");
        
        // Handle preflight
        if (requestContext.getMethod().equals("OPTIONS")) {
            responseContext.setStatus(200);
            return;
        }
    }
}