import React, {Component} from 'react';

class Navegacion extends Component {
    mostrarAnterior = () => { //para mostrar el botón Anterior cuando se esté en cualquier página que no sea la #1
        //destructuring
        const {pagina} = this.props;
        if (pagina === 1) return null;
        return (
            <button onClick={this.props.paginaAnterior} type="button" className="btn btn-info mr-1">Anterior &larr;</button>
        );
    }

    mostrarSiguiente = () => { //para mostrar el botón Anterior cuando se esté en cualquier página que no sea la última
        //destructuring
        const {pagina, totalPaginas} = this.props;
        if (pagina === totalPaginas) return null;
        return (
            <button onClick={this.props.paginaSiguiente} type="button" className="btn btn-info">Siguiente &rarr;</button>
        );
    }

    render() {
        return ( 
            <div className="py-5"> 
                {this.mostrarAnterior()}
                {this.mostrarSiguiente()}
            </div>
         ); //py-5 = clase de bootstrap que agrega padding arriba y abajo
    } 
}
 
export default Navegacion;