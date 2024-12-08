package com.housing.resources;

import java.util.List;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import com.housing.model.Property;
import com.housing.dao.PropertyDAO;

@Path("/properties")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class PropertyResource {
    private final PropertyDAO propertyDAO;
    
    public PropertyResource() {
        this.propertyDAO = new PropertyDAO();
    }

    private Response.ResponseBuilder addCorsHeaders(Response.ResponseBuilder responseBuilder) {
        return responseBuilder
            .header("Access-Control-Allow-Origin", "http://localhost:5173")
            .header("Access-Control-Allow-Headers", "origin, content-type, accept, authorization")
            .header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, HEAD")
            .header("Access-Control-Allow-Credentials", "true");
    }

    @OPTIONS
    @Path("{path : .*}")
    public Response options() {
        return addCorsHeaders(Response.ok("")).build();
    }

    @GET
    public Response getAllProperties() {
        try {
            System.out.println("Getting all properties");
            List<Property> properties = propertyDAO.getAllProperties();
            return addCorsHeaders(Response.ok(properties)).build();
        } catch (Exception e) {
            System.out.println("Error getting all properties: " + e.getMessage());
            e.printStackTrace();
            return addCorsHeaders(Response.serverError()
                         .entity("Error fetching properties: " + e.getMessage()))
                         .build();
        }
    }

    @GET
    @Path("/{id}")
    public Response getProperty(@PathParam("id") int id) {
        try {
            System.out.println("Getting property with ID: " + id);
            Property property = propertyDAO.getProperty(id);
            if (property != null) {
                return addCorsHeaders(Response.ok(property)).build();
            }
            return addCorsHeaders(Response.status(Response.Status.NOT_FOUND)
                         .entity("Property not found with ID: " + id))
                         .build();
        } catch (Exception e) {
            System.out.println("Error getting property: " + e.getMessage());
            e.printStackTrace();
            return addCorsHeaders(Response.serverError()
                         .entity("Error fetching property: " + e.getMessage()))
                         .build();
        }
    }

    @POST
    public Response createProperty(Property property) {
        try {
            System.out.println("Creating new property: " + property.getTitle());
            Property created = propertyDAO.createProperty(property);
            return addCorsHeaders(Response.status(Response.Status.CREATED)
                         .entity(created))
                         .build();
        } catch (Exception e) {
            System.out.println("Error creating property: " + e.getMessage());
            e.printStackTrace();
            return addCorsHeaders(Response.serverError()
                         .entity("Error creating property: " + e.getMessage()))
                         .build();
        }
    }

    @PUT
    @Path("/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response updateProperty(@PathParam("id") int id, Property property) {
        try {
            System.out.println("Updating property with ID: " + id);
            Property updated = propertyDAO.updateProperty(id, property);
            if (updated != null) {
                return addCorsHeaders(Response.ok(updated)).build();
            }
            return addCorsHeaders(Response.status(Response.Status.NOT_FOUND)
                         .entity("Property not found with ID: " + id))
                         .build();
        } catch (Exception e) {
            System.out.println("Error updating property: " + e.getMessage());
            e.printStackTrace();
            return addCorsHeaders(Response.serverError()
                         .entity("Error updating property: " + e.getMessage()))
                         .build();
        }
    }

    @DELETE
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response deleteProperty(@PathParam("id") int id) {
        try {
            System.out.println("Deleting property with ID: " + id);
            boolean deleted = propertyDAO.deleteProperty(id);
            if (deleted) {
                return addCorsHeaders(Response.ok()
                             .entity("Property successfully deleted"))
                             .build();
            }
            return addCorsHeaders(Response.status(Response.Status.NOT_FOUND)
                         .entity("Property not found with ID: " + id))
                         .build();
        } catch (Exception e) {
            System.out.println("Error deleting property: " + e.getMessage());
            e.printStackTrace();
            return addCorsHeaders(Response.serverError()
                         .entity("Error deleting property: " + e.getMessage()))
                         .build();
        }
    }

    @GET
    @Path("search")
    @Produces(MediaType.APPLICATION_JSON)
    public Response searchProperties(
            @QueryParam("minPrice") Double minPrice,
            @QueryParam("maxPrice") Double maxPrice,
            @QueryParam("neighborhood") String neighborhood,
            @QueryParam("minRooms") Integer minRooms) {
        try {
            System.out.println("Searching properties with parameters:");
            System.out.println("minPrice: " + minPrice);
            System.out.println("maxPrice: " + maxPrice);
            System.out.println("neighborhood: " + neighborhood);
            System.out.println("minRooms: " + minRooms);

            List<Property> properties = propertyDAO.searchProperties(
                minPrice, maxPrice, neighborhood, minRooms);
            
            return addCorsHeaders(Response.ok(properties)).build();
        } catch (Exception e) {
            System.out.println("Error searching properties: " + e.getMessage());
            e.printStackTrace();
            return addCorsHeaders(Response.serverError()
                         .entity("Error searching properties: " + e.getMessage()))
                         .build();
        }
    }
}