// src/test/components/templates/ProtectedRoute.spec.jsx
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from '../../../components/templates/ProtectedRoute';
import { AuthProvider } from '../../../context/AuthContext';

// Armamos 3 "páginas" de mentira: inicio, login y una ruta protegida.
// "session" es el usuario que tiene la sesión iniciada (o null si no hay nadie).
const renderRuta = ({ session = null, adminOnly = false } = {}) => {
  if (session) localStorage.setItem('swamper_session', JSON.stringify(session));

  return render(
    <MemoryRouter initialEntries={['/privado']}>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<div>Pantalla de inicio</div>} />
          <Route path="/login" element={<div>Pantalla de login</div>} />
          <Route
            path="/privado"
            element={
              <ProtectedRoute adminOnly={adminOnly}>
                <div>Contenido privado</div>
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </MemoryRouter>
  );
};

describe('ProtectedRoute (template)', () => {
  // La sesión se guarda en localStorage: lo limpiamos antes y después de cada prueba
  beforeEach(() => localStorage.clear());
  afterEach(() => localStorage.clear());

  // Prueba 1: sin sesión, lo manda al login
  it('redirige al login si no hay sesión', () => {
    renderRuta();

    expect(screen.getByText('Pantalla de login')).toBeTruthy();
    expect(screen.queryByText('Contenido privado')).toBeNull();
  });

  // Prueba 2: con sesión, muestra el contenido
  it('muestra el contenido si hay sesión iniciada', () => {
    renderRuta({ session: { id: '1', name: 'Ana', email: 'ana@gmail.com', role: 'user' } });

    expect(screen.getByText('Contenido privado')).toBeTruthy();
  });

  // Prueba 3: ruta solo para admin, pero entra un usuario normal -> lo manda al inicio
  it('manda al inicio a un usuario normal en una ruta de admin', () => {
    renderRuta({
      session: { id: '1', name: 'Ana', email: 'ana@gmail.com', role: 'user' },
      adminOnly: true,
    });

    expect(screen.getByText('Pantalla de inicio')).toBeTruthy();
    expect(screen.queryByText('Contenido privado')).toBeNull();
  });
});
