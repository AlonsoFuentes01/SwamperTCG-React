// src/test/components/atoms/Image.spec.jsx
import { render, screen } from '@testing-library/react';
import Image from '../../../components/atoms/Image';

describe('Image (atom)', () => {
  // Prueba 1: usa el src y el alt que le pasamos
  it('renderiza la imagen con su src y su alt', () => {
    render(<Image src="carta.jpg" alt="Carta de Darkrai" />);

    const img = screen.getByRole('img', { name: 'Carta de Darkrai' });
    expect(img.getAttribute('src')).toBe('carta.jpg');
  });

  // Prueba 2: aplica la clase CSS que le pasamos
  it('aplica el className recibido', () => {
    render(<Image src="carta.jpg" alt="Carta" className="card-img-top" />);

    expect(screen.getByRole('img')).toHaveClass('card-img-top');
  });

  // Prueba 3: aplica los estilos en línea que le pasamos
  it('aplica el style recibido', () => {
    render(<Image src="carta.jpg" alt="Carta" style={{ width: '100px' }} />);

    expect(screen.getByRole('img').style.width).toBe('100px');
  });
});
