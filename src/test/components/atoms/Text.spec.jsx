// src/test/components/atoms/Text.spec.jsx
import { render, screen } from '@testing-library/react';
import Text from '../../../components/atoms/Text';

describe('Text (atom)', () => {
  // Prueba 1: si no le decimos la variante, usa <p>
  it('renderiza un <p> por defecto', () => {
    render(<Text>Hola mundo</Text>);

    expect(screen.getByText('Hola mundo').tagName).toBe('P');
  });

  // Prueba 2: con variant="h1" renderiza un título h1
  it('renderiza la etiqueta indicada en variant', () => {
    render(<Text variant="h1">Mi título</Text>);

    expect(screen.getByRole('heading', { level: 1, name: 'Mi título' })).toBeTruthy();
  });

  // Prueba 3: aplica la clase CSS que le pasamos
  it('aplica el className recibido', () => {
    render(<Text className="fw-bold">Texto en negrita</Text>);

    expect(screen.getByText('Texto en negrita')).toHaveClass('fw-bold');
  });
});
