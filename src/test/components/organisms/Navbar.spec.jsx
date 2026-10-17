// src/test/components/organisms/Navbar.spec.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, useLocation } from 'react-router-dom';
import NavBar from '../../../components/organisms/Navbar';
import { AuthProvider } from '../../../context/AuthContext';
import { ProductsProvider } from '../../../context/ProductsContext';
import { CarritoProvider } from '../../../context/CarritoContext';

// Muestra en pantalla la ruta actual, para comprobar a dónde navegó la Navbar
const UbicacionActual = () => {
  const location = useLocation();
  return <div data-testid="ubicacion">{location.pathname + location.search}</div>;
};

// La Navbar necesita Router + los 3 contextos, así que los envolvemos aquí
const renderNavbar = () =>
  render(
    <MemoryRouter initialEntries={['/']}>
      <AuthProvider>
        <ProductsProvider>
          <CarritoProvider>
            <NavBar />
            <UbicacionActual />
          </CarritoProvider>
        </ProductsProvider>
      </AuthProvider>
    </MemoryRouter>
  );

describe('Navbar (organism)', () => {
  // El carrito y la sesión se guardan en localStorage: lo limpiamos antes y después de cada prueba
  beforeEach(() => localStorage.clear());
  afterEach(() => localStorage.clear());

  // Prueba 1: muestra el logo y los links del menú
  it('muestra el logo y los links del menú', () => {
    renderNavbar();

    expect(screen.getByAltText('SwamperTCG')).toBeTruthy();
    expect(screen.getByText('Inicio')).toBeTruthy();
    expect(screen.getByText('Catálogo')).toBeTruthy();
    expect(screen.getByText('¿Quienes somos?')).toBeTruthy();
  });

  // Prueba 2: al buscar una carta, navega a /products?q=lo-que-escribiste
  it('navega al catálogo con el texto buscado', () => {
    renderNavbar();

    fireEvent.change(screen.getByLabelText('Buscar carta'), { target: { value: 'pikachu' } });
    fireEvent.click(screen.getByText('Buscar'));

    expect(screen.getByTestId('ubicacion').textContent).toBe('/products?q=pikachu');
  });

  // Prueba 3: el globito rojo del carrito suma las cantidades
  it('muestra en el carrito el total de productos', () => {
    // dejamos un carrito guardado: 2 unidades del producto 1 y 3 del producto 2 = 5
    localStorage.setItem(
      'swamper_carrito',
      JSON.stringify([{ id: 1, cantidad: 2 }, { id: 2, cantidad: 3 }])
    );
    renderNavbar();

    expect(screen.getByText('5')).toBeTruthy();
  });
});
