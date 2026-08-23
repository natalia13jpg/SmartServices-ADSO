package com.sena.smartservices.vista;

import com.sena.smartservices.dao.UsuarioDAO;
import com.sena.smartservices.modelo.Usuario;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        UsuarioDAO dao = new UsuarioDAO();

        // 1. Probar Actualización (UPDATE) del primer usuario
        List<Usuario> lista = dao.listar();
        if (!lista.isEmpty()) {
            Usuario usuarioModificar = lista.get(0);
            usuarioModificar.setTelefono("3111112233"); // Nuevo teléfono
           usuarioModificar.setRol("Administrador");

            if (dao.actualizar(usuarioModificar)) {
                System.out.println("¡Usuario actualizado correctamente!");
            }
        }

        // 2. Mostrar lista en consola para verificar los cambios
        System.out.println("\n=== USUARIOS DESPUÉS DE ACTUALIZAR ===");
        for (Usuario u : dao.listar()) {
            System.out.println("ID: " + u.getIdUsuario() + 
                               " | Nombre: " + u.getNombre() + " " + u.getApellido() + 
                               " | Teléfono: " + u.getTelefono() + 
                               " | Rol: " + u.getRol());
        }
    }
}