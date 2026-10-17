// src/test/components/molecules/FormField.spec.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import FormField from '../../../components/molecules/FormField';

describe('FormField (molecule)', () => {
  // Prueba 1: el label queda unido al input y muestra el valor
  it('renderiza el label y el input con su valor', () => {
    render(<FormField label="Nombre" name="name" value="Juan" onChange={() => {}} />);

    const input = screen.getByLabelText('Nombre');
    expect(input.value).toBe('Juan');
  });

  // Prueba 2: al escribir se ejecuta onChange
  it('ejecuta onChange al escribir', () => {
    const onChange = jasmine.createSpy('onChange');
    render(<FormField label="Nombre" name="name" value="" onChange={onChange} />);

    fireEvent.change(screen.getByLabelText('Nombre'), { target: { value: 'Ana' } });

    expect(onChange).toHaveBeenCalled();
  });

  // Prueba 3: si fue tocado y tiene error, se marca inválido y muestra el mensaje
  it('muestra el error y marca el campo inválido cuando fue tocado', () => {
    render(
      <FormField
        label="Nombre"
        name="name"
        value=""
        onChange={() => {}}
        touched={true}
        error="El nombre es obligatorio."
      />
    );

    expect(screen.getByLabelText('Nombre')).toHaveClass('is-invalid');
    expect(screen.getByText('El nombre es obligatorio.')).toBeTruthy();
  });
});
