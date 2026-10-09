package com.sena.smartservices.controlador;

import com.sena.smartservices.dao.UsuarioDAO;
import com.sena.smartservices.modelo.Usuario;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

// Controlador REST: recibe las solicitudes HTTP que llegan desde fuera de la
// aplicación (por ejemplo, desde Postman) y devuelve una respuesta.
@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {

    // El DAO es quien realmente consulta la base de datos MySQL.
    private final UsuarioDAO usuarioDAO = new UsuarioDAO();

    // REGISTRO: POST /api/usuarios/registro
    // Recibe los datos del usuario y lo guarda en la base de datos.
    @PostMapping("/registro")
    public ResponseEntity<String> registrar(
            @RequestParam String nombre,
            @RequestParam String apellido,
            @RequestParam String usuario,      // el usuario es el correo
            @RequestParam String contrasena,
            @RequestParam(defaultValue = "") String telefono) {

        // Todo usuario nuevo se registra como Cliente y activo.
        Usuario nuevo = new Usuario(nombre, apellido, usuario, telefono,
                contrasena, "Cliente", true);

        if (usuarioDAO.registrar(nuevo)) {
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body("Usuario registrado satisfactoriamente");
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body("Error: no se pudo registrar el usuario (el correo ya existe o hay datos inválidos)");
    }

    // INICIO DE SESIÓN: POST /api/usuarios/login
    // Recibe usuario y contraseña y verifica que coincidan con los de la base de datos.
    @PostMapping("/login")
    public ResponseEntity<String> login(
            @RequestParam String usuario,
            @RequestParam String contrasena) {

        if (usuarioDAO.iniciarSesion(usuario, contrasena)) {
            return ResponseEntity.ok("Autenticación satisfactoria");
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body("Error en la autenticación: usuario o contraseña incorrectos");
    }
}