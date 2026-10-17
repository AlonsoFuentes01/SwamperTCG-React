// src/test/components/molecules/CardBody.spec.jsx
import { render, screen } from '@testing-library/react';
import CardBody from '../../../components/molecules/CardBody';

const props = {
  title: 'Darkrai',
  description: 'Edición: SV 151',
  price: 15000,
  idioma: 'Español',
  estado: 'NM',
  stock: 5,
};

describe('CardBody (molecule)', () => {
  // Prueba 1: el título sale como h5 y la descripción como texto
  it('muestra el título y la descripción', () => {
    render(<CardBody {...props} />);

    expect(screen.getByRole('heading', { level: 5, name: 'Darkrai' })).toBeTruthy();
    expect(screen.getByText('Edición: SV 151')).toBeTruthy();
  });

  // Prueba 2: el precio sale con formato chileno (15000 -> $15.000)
  it('muestra el precio con formato chileno', () => {
    render(<CardBody {...props} />);

    expect(screen.getByText('$15.000')).toBeTruthy();
  });

  // Prueba 3: idioma, estado y stock están en el HTML pero escondidos
  it('tiene idioma, estado y stock ocultos', () => {
    render(<CardBody {...props} />);

    const idioma = screen.getByText('Idioma: Español');
    expect(idioma).toBeTruthy();
    expect(screen.getByText('Estado: NM')).toBeTruthy();
    expect(screen.getByText('Stock: 5')).toBeTruthy();
    // el <div> que los contiene tiene display: none
    expect(idioma.parentElement.style.display).toBe('none');
  });
});
