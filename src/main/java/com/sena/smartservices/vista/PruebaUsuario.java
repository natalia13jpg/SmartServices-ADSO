package com.sena.smartservices.vista;

import com.sena.smartservices.dao.UsuarioDAO;
import com.sena.smartservices.modelo.Usuario;

// Clase de prueba: registra un usuario y comprueba el inicio de sesión
// con una contraseña correcta y con una incorrecta.
public class PruebaUsuario {
    public static void main(String[] args) {
        UsuarioDAO dao = new UsuarioDAO();

        // 1. Registrar un usuario de prueba
        Usuario nuevo = new Usuario("Usuario", "Prueba", "prueba@correo.com",
                "3001234567", "123456", "Cliente", true);
        if (dao.registrar(nuevo)) {
            System.out.println("Registro exitoso");
        } else {
            System.out.println("No se pudo registrar (¿el correo ya existe?)");
        }

        // 2. Iniciar sesión con la contraseña correcta
        boolean correcto = dao.iniciarSesion("prueba@correo.com", "123456");
        System.out.println(correcto ? "Autenticación satisfactoria" : "Error en la autenticación");

        // 3. Iniciar sesión con una contraseña incorrecta
        boolean incorrecto = dao.iniciarSesion("prueba@correo.com", "clave_incorrecta");
        System.out.println(incorrecto ? "Autenticación satisfactoria" : "Error en la autenticación");
    }
}