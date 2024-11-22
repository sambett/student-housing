package com.housing.dao;

import com.housing.model.Property;
import com.housing.config.DatabaseConfig;
import java.sql.*;
import java.util.*;

public class PropertyDAO {
    
    public List<Property> getAllProperties() throws SQLException {
        List<Property> properties = new ArrayList<>();
        String sql = "SELECT * FROM properties";
        
        try (Connection conn = DatabaseConfig.getConnection();
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery(sql)) {
            
            while (rs.next()) {
                Property property = new Property();
                property.setId(rs.getInt("id"));
                property.setTitle(rs.getString("title"));
                property.setDescription(rs.getString("description"));
                property.setPrice(rs.getDouble("price"));
                property.setRooms(rs.getInt("rooms"));
                property.setAddress(rs.getString("address"));
                property.setNeighborhood(rs.getString("neighborhood"));
                property.setContactPhone(rs.getString("contact_phone"));
                properties.add(property);
            }
        }
        return properties;
    }

    public Property getProperty(int id) throws SQLException {  // Changed to int
        String sql = "SELECT * FROM properties WHERE id = ?";
        
        try (Connection conn = DatabaseConfig.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            stmt.setInt(1, id);  // Changed to setInt
            ResultSet rs = stmt.executeQuery();
            
            if (rs.next()) {
                Property property = new Property();
                property.setId(rs.getInt("id"));
                property.setTitle(rs.getString("title"));
                property.setDescription(rs.getString("description"));
                property.setPrice(rs.getDouble("price"));
                property.setRooms(rs.getInt("rooms"));
                property.setAddress(rs.getString("address"));
                property.setNeighborhood(rs.getString("neighborhood"));
                property.setContactPhone(rs.getString("contact_phone"));
                return property;
            }
        }
        return null;
    }

    public Property createProperty(Property property) throws SQLException {
        String sql = "INSERT INTO properties (title, description, price, rooms, address, neighborhood, contact_phone) " +
                    "VALUES (?, ?, ?, ?, ?, ?, ?)";
        
        try (Connection conn = DatabaseConfig.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {
            
            stmt.setString(1, property.getTitle());
            stmt.setString(2, property.getDescription());
            stmt.setDouble(3, property.getPrice());
            stmt.setInt(4, property.getRooms());
            stmt.setString(5, property.getAddress());
            stmt.setString(6, property.getNeighborhood());
            stmt.setString(7, property.getContactPhone());
            
            stmt.executeUpdate();
            
            ResultSet rs = stmt.getGeneratedKeys();
            if (rs.next()) {
                property.setId(rs.getInt(1));
            }
            return property;
        }
    }

    public boolean deleteProperty(int id) throws SQLException {  // Changed to int
        String sql = "DELETE FROM properties WHERE id = ?";
        
        try (Connection conn = DatabaseConfig.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            stmt.setInt(1, id);  // Changed to setInt
            int rowsAffected = stmt.executeUpdate();
            return rowsAffected > 0;
        }
    }
    
    public Property updateProperty(int id, Property property) throws SQLException {  // Changed to int
        String sql = "UPDATE properties SET title = ?, description = ?, price = ?, " +
                    "rooms = ?, address = ?, neighborhood = ?, contact_phone = ? " +
                    "WHERE id = ?";
        
        try (Connection conn = DatabaseConfig.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            stmt.setString(1, property.getTitle());
            stmt.setString(2, property.getDescription());
            stmt.setDouble(3, property.getPrice());
            stmt.setInt(4, property.getRooms());
            stmt.setString(5, property.getAddress());
            stmt.setString(6, property.getNeighborhood());
            stmt.setString(7, property.getContactPhone());
            stmt.setInt(8, id);  // Changed to setInt
            
            int rowsAffected = stmt.executeUpdate();
            if (rowsAffected > 0) {
                property.setId(id);
                return property;
            }
            return null;
        }
    }
    
    public List<Property> searchProperties(Double minPrice, Double maxPrice, 
                                         String neighborhood, Integer minRooms) throws SQLException {
        StringBuilder sql = new StringBuilder("SELECT * FROM properties WHERE 1=1");
        List<Object> params = new ArrayList<>();
        
        if (minPrice != null) {
            sql.append(" AND price >= ?");
            params.add(minPrice);
        }
        if (maxPrice != null) {
            sql.append(" AND price <= ?");
            params.add(maxPrice);
        }
        if (neighborhood != null && !neighborhood.trim().isEmpty()) {
            sql.append(" AND neighborhood LIKE ?");
            params.add("%" + neighborhood + "%");
        }
        if (minRooms != null) {
            sql.append(" AND rooms >= ?");
            params.add(minRooms);
        }
        
        try (Connection conn = DatabaseConfig.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql.toString())) {
            
            for (int i = 0; i < params.size(); i++) {
                stmt.setObject(i + 1, params.get(i));
            }
            
            ResultSet rs = stmt.executeQuery();
            List<Property> properties = new ArrayList<>();
            while (rs.next()) {
                Property property = new Property();
                property.setId(rs.getInt("id"));
                property.setTitle(rs.getString("title"));
                property.setDescription(rs.getString("description"));
                property.setPrice(rs.getDouble("price"));
                property.setRooms(rs.getInt("rooms"));
                property.setAddress(rs.getString("address"));
                property.setNeighborhood(rs.getString("neighborhood"));
                property.setContactPhone(rs.getString("contact_phone"));
                properties.add(property);
            }
            return properties;
        }
    }
}