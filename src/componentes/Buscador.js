import React, { Component } from 'react';

class Buscador extends Component {
    //creando el ref para leer el formulario
    busquedaRef = React.createRef();

    obtenerDatos = (e) => {
        e.preventDefault();

        //leyendo la palabra que se escribió
        const termino = this.busquedaRef.current.value;
        //console.log(termino);
        //pasando los datos al componente padre (App.js)
        this.props.datosBusqueda(termino);

    }
    render() { 
        return ( 
            <form onSubmit={this.obtenerDatos}>
                <div className="row">
                    <div className="form-group col-md-8">
                        <input ref={this.busquedaRef} className="form-control form-control-lg" type="text" placeholder="Busca tu imagen, por ej. Fútbol" />
                    </div>
                    <div className="form-group col-md-4">
                        <input type="submit" className="btn btn-lg btn-danger btn-block" value="Buscar..."/>
                    </div>
                </div>
            </form>
            
         );
    }
}
 
export default Buscador;