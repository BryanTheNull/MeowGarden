// Cargar datos a la tabla
document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/productos')
        .then(response => response.json())
        .then(data => {
            console.log('Datos recibidos:', data);   // Verificar datos recividos del controlador
            const productosList = document.getElementById('productos-list');
            productosList.innerHTML = '';
            if(data.length === 0){
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td colspan="7" style="text-align: center;">No hay productos para mostrar</td>
                `;
                productosList.appendChild(row);
            } else {
                data.forEach(producto => {
                    const row = document.createElement('tr');
                    row.innerHTML = ` 
                        <td>${producto.Nombre}</td>
                        <td>${producto.Descripcion}</td>
                        <td>${producto.Codigo_Producto}</td>
                        <td>${producto.Precio}</td>
                        <td>${producto.Stock}</td>
                        <td><img src="${producto.Imagen}" alt="Imagen del Producto" style="width: 25px; height: 25px;"></td>
                        <td>
                            <button onclick="editarProducto(${producto.id})">Editar</button>
                            <button onclick="eliminarProducto(${producto.id})">Eliminar</button>
                    `;
                    productosList.appendChild(row);
                });
            }
        })
        .catch(error =>{
            console.error('Error al obtener productos:', error);
        });

        
        // Obtener referencias al modal y botones
        const modal = document.getElementById('modal-modificar');
        const closeModal = document.getElementById('close');

        // Realizar modificacion de producto
        window.editarProducto = function(id) {
            
        }
    
        window.eliminarProducto = function(id) {
            console.log('Eliminar producto con ID:', id);
        }
});