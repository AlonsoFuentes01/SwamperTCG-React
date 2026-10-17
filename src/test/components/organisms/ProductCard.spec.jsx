// src/test/components/organisms/ProductCard.spec.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import ProductCard from '../../../components/organisms/ProductCard';

const mockProduct = {
  id: 1,
  name: 'Producto Test',
  description: 'Descripción test',
  price: 10000,
  image: 'test.jpg',
};

// ProductCard usa useNavigate, así que lo dejamos dentro de un Router.
// La ruta /products/:id muestra un texto para saber si navegó bien.
const renderCard = () =>
  render(
    <MemoryRouter initialEntries={['/']}>
      <Routes>
        <Route path="/" element={<ProductCard product={mockProduct} />} />
        <Route path="/products/:id" element={<div>Pantalla de detalle</div>} />
      </Routes>
    </MemoryRouter>
  );

describe('ProductCard (organism)', () => {
  // Prueba 1: muestra nombre, descripción e imagen de la carta
  it('muestra el nombre, la descripción y la imagen', () => {
    renderCard();

    expect(screen.getByText('Producto Test')).toBeTruthy();
    expect(screen.getByText('Descripción test')).toBeTruthy();
    const img = screen.getByRole('img', { name: 'Producto Test' });
    expect(img.getAttribute('src')).toBe('test.jpg');
  });

  // Prueba 2: el precio sale con formato chileno
  it('muestra el precio con formato chileno', () => {
    renderCard();

    expect(screen.getByText('$10.000')).toBeTruthy();
  });

  // Prueba 3: al hacer click en "Ver detalles" va a /products/1
  it('navega al detalle al hacer click en "Ver detalles"', () => {
    renderCard();

    fireEvent.click(screen.getByText('Ver detalles'));

    expect(screen.getByText('Pantalla de detalle')).toBeTruthy();
  });
});
