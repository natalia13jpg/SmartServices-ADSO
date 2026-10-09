package com.sena.smartservices;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

// Clase principal: es el punto de entrada de la aplicación Spring Boot.
// @SpringBootApplication arranca el servidor y busca los controladores
// del proyecto dentro de este paquete y sus subpaquetes.
@SpringBootApplication
public class SmartServicesApplication {

    public static void main(String[] args) {
        SpringApplication.run(SmartServicesApplication.class, args);
    }
}