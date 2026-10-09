package com.sena.smartservices.conexion;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

// Clase encargada de establecer la conexión entre la aplicación Java y MySQL.
public class Conexion {

    // Dirección de la base de datos: servidor, puerto y nombre de la base.
    private static final String URL = "jdbc:mysql://localhost:3306/smartservices_db";
    private static final String USER = "root";

    // La contraseña NO se escribe en el código (el repositorio es público).
    // Se lee de la variable de entorno DB_PASSWORD configurada en cada computador.
    private static final String PASSWORD = System.getenv("DB_PASSWORD");

    public static Connection conectar() {
        Connection conexion = null;

        // Aviso claro si la variable de entorno no está configurada.
        if (PASSWORD == null) {
            System.err.println("Error: no se encontró la variable de entorno DB_PASSWORD.");
        }

        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            conexion = DriverManager.getConnection(URL, USER, PASSWORD);
            System.out.println("¡Conexión exitosa a la base de datos SmartServices!");
        } catch (ClassNotFoundException e) {
            System.err.println("Error: Driver JDBC no encontrado. " + e.getMessage());
        } catch (SQLException e) {
            System.err.println("Error al conectar con la base de datos: " + e.getMessage());
        }
        return conexion;
    }
}