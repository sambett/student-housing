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
    }
}

class CORSFilter implements javax.ws.rs.container.ContainerResponseFilter {
    @Override
    public void filter(javax.ws.rs.container.ContainerRequestContext requestContext,
                      javax.ws.rs.container.ContainerResponseContext responseContext) {
        // Update port to 5173
        responseContext.getHeaders().add("Access-Control-Allow-Origin", "http://localhost:5173");
        responseContext.getHeaders().add("Access-Control-Allow-Headers", 
            "origin, content-type, accept, authorization");
        responseContext.getHeaders().add("Access-Control-Allow-Methods", 
            "GET, POST, PUT, DELETE, OPTIONS, HEAD");
        responseContext.getHeaders().add("Access-Control-Allow-Credentials", "true");
        
        // Handle preflight requests
        if (requestContext.getMethod().equalsIgnoreCase("OPTIONS")) {
            responseContext.setStatus(200);
        }
    }
}